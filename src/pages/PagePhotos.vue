<template>
  <div class="photos-page">
    <!-- Mode Manuel / Automatique -->
    <v-card class="photo-mode" elevation="3">
      <h3 class="mode-title">Mode de gestion</h3>
      <v-radio-group
        v-model="mode"
        column
        @change="handleModeChange"
        class="mode-selection"
      >
        <v-radio label="Mode manuel" value="manuel" color="#9059a0" />
        <v-radio label="Mode automatique" value="auto" color="#9059a0" />
      </v-radio-group>

      <div class="mode-info">
        <v-icon :color="mode === 'manuel' ? '#9059a0' : '#888'" class="mode-icon">
          {{ mode === "manuel" ? "mdi-hand" : "mdi-robot" }}
        </v-icon>
        <p class="mode-description">
          {{
            mode === "manuel"
              ? "Sélectionnez manuellement la photo du jour"
              : "Rotation automatique des photos"
          }}
        </p>
      </div>
    </v-card>

    <!-- Galerie et sélection -->
    <v-card class="photo-panel" elevation="3">
      <div class="top-bar">
        <v-btn
          class="upload-btn"
          @click="ouvrirDialogPhoto"
          :disabled="mode === 'auto'"
          elevation="1"
          :color="mode === 'manuel' ? '#9059a0' : 'grey'"
        >
          <v-icon left>mdi-upload</v-icon>
          <span class="upload-text">Ajouter</span>
        </v-btn>

        <v-text-field
          v-model="recherche"
          label="Rechercher une image"
          prepend-icon="mdi-magnify"
          class="photo-search"
          clearable
          hide-details
          outlined
          dense
          :disabled="mode === 'auto'"
          :class="{ 'disabled-field': mode === 'auto' }"
        ></v-text-field>

        <v-select
          v-if="mode === 'manuel'"
          v-model="photoJourIndex"
          :items="photoSelectionItems"
          item-title="titre"
          item-value="index"
          label="Photo du jour"
          class="photo-select"
          density="comfortable"
          variant="outlined"
          bg-color="white"
          color="#9059a0"
          clearable
        />
      </div>

      <div class="gallery-container">
        <h3 class="gallery-title">
          Galerie d'images
          <span class="counter">({{ filtrerPhotos.length }} cadres)</span>
        </h3>

        <v-row class="photo-grid">
          <v-col
            v-for="(photo, index) in filtrerPhotos"
            :key="index"
            cols="6"
            sm="4"
            md="3"
            lg="2"
          >
            <v-card
              :class="[
                'photo-card',
                { selected: mode === 'manuel' && photoJourIndex === index, locked: mode === 'auto' }
              ]"
              @click="mode === 'manuel' && selectPhoto(index)"
              :style="{ cursor: mode === 'auto' ? 'not-allowed' : 'pointer' }"
              elevation="2"
            >
              <img class="image" :src="'data:image/jpeg;base64,' + photo.photoBase64" alt="Photo" />
              <v-card-subtitle class="photo-caption">
                {{ photo.photoName }}
              </v-card-subtitle>

              <div v-if="mode === 'manuel' && photoJourIndex === index" class="selected-badge">
                <v-icon color="white" size="small">mdi-star</v-icon>
                <span>Photo du jour</span>
              </div>

              <div v-if="mode === 'auto'" class="lock-overlay">
                <v-icon class="lock-icon" color="white" size="24px">mdi-lock</v-icon>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </v-card>

    <!-- Pop-up pour ajouter une nouvelle photo avec validation -->
    <v-dialog v-model="dialogPhoto" persistent max-width="500px" transition="dialog-bottom-transition">
      <v-card class="dialog-card">
        <v-card-title class="dialog-header">Ajouter une photo</v-card-title>
        <v-card-text class="dialog-content">
          <v-form ref="form">
            <v-file-input
              v-model="nouvellePhoto.fichier"
              label="Choisir une image"
              accept="image/*"
              prepend-icon="mdi-image"
              :rules="[rules.required]"
              class="dialog-input"
            ></v-file-input>
            <v-text-field
              v-model="nouvellePhoto.photoName"
              label="Nom de la photo"
              prepend-icon="mdi-text"
              :rules="[rules.requiredChamp]"
              class="dialog-input"
            ></v-text-field>
            <v-text-field
              v-model="nouvellePhoto.description"
              label="Description de la photo"
              prepend-icon="mdi-text"
              :rules="[rules.requiredChamp]"
              class="dialog-input"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions class="dialog-actions">
          <v-spacer></v-spacer>
          <v-btn text color="red" @click="fermerDialogPhoto">Annuler</v-btn>
          <v-btn text color="green" @click="validerAjoutPhoto">Valider</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';

// Variables et état
const mode = ref('manuel');
const photoJourIndex = ref(null);
const photos = ref([]);
const recherche = ref('');
const dialogPhoto = ref(false); // Contrôle la visibilité du dialog
const nouvellePhoto = ref({
  fichier: null,
  photoName: '',
  description: ''
});
const form = ref(null);

// Règles de validation
const rules = {
  required: value => !!value || 'Veuillez remplir ce champ',
  // Pour le champ description, on accepte uniquement s'il y a au moins un caractère non-espace
  requiredChamp: value => (value && value.trim().length > 0) || 'Veuillez remplir ce champ'
};

const url = 'https://dashboardisis.alwaysdata.net/api/v1/dashboard/photo';

const chargerPhoto = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    photos.value = data;
    console.log(photos.value);
  } catch (error) {
    console.error('Erreur lors du chargement des photos :', error);
  }
};

const ouvrirDialogPhoto = () => {
  dialogPhoto.value = true;
};

const fermerDialogPhoto = () => {
  nouvellePhoto.value.fichier = null;
  nouvellePhoto.value.description = '';
  nouvellePhoto.value.photoName;dialogPhoto.value = false;
};

const validerAjoutPhoto = async() => {
  
  console.log(nouvellePhoto)

  if (!form.value.validate()) {
    return;
  }
  
  console.log('Nouvelle photo sélectionnée :', nouvellePhoto.value.fichier);
  console.log('Description :', nouvellePhoto.value.description);
  console.log('Nom :', nouvellePhoto.value.photoName)

  try {
    const fichierImage = nouvellePhoto.value.fichier;
    
    // Convertir l'image en base64
    const base64Image = await convertirImageEnBase64(fichierImage);

    
    const requestBody = {
      photoBase64: base64Image.split(',')[1],
      description: nouvellePhoto.value.description,
      photoName: nouvellePhoto.value.photoName
    }

    // Ajouter à l'API
    await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody)
    });
    
    // Recharger les photos et fermer le dialogue
    chargerPhoto();
    fermerDialogPhoto();
  } catch (err) {
    console.error("Erreur ajout:", err);
  }
};

// Fonction pour convertir une image en base64
const convertirImageEnBase64 = (fichier) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      // Le résultat est une chaîne en base64 avec le préfixe "data:image/jpeg;base64,"
      // Vous pouvez soit conserver ce préfixe, soit l'enlever selon vos besoins
      resolve(reader.result);
    };
    
    reader.onerror = (error) => {
      reject(error);
    };
    
    reader.readAsDataURL(fichier);
  });
};
const filtrerPhotos = computed(() => {
  if (!recherche.value) return photos.value;
  const termeLowerCase = recherche.value.toLowerCase().trim();
  return photos.value.filter(photo =>
    photo.description.toLowerCase().includes(termeLowerCase)
  );
});

const photoSelectionItems = computed(() =>
  photos.value.map((photo, index) => ({
    titre: photo.photoName,
    index: index
  }))
);

const selectPhoto = (index) => {
  if (mode.value !== 'manuel') return;
  const photo = filtrerPhotos.value[index];
  const realIndex = photos.value.findIndex(
    p => p.description.split(' ')[0] === photo.description.split(' ')[0]
  );
  photoJourIndex.value = photoJourIndex.value === realIndex ? null : realIndex;
};

const handleModeChange = newMode => {
  if (newMode === 'auto') {
    photoJourIndex.value = null;
  }
};

watch(
  mode,
  newMode => {
    if (newMode === 'auto') {
      photoJourIndex.value = null;
    }
  },
  { immediate: true }
);

// Charger les photos depuis l'API
onMounted(async () => {
  await chargerPhoto();
});
</script>

<style scoped>
.photos-page {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 30px;
  padding: 20px 40px;
  background-color: transparent;
  min-height: 100vh;
}

/* Styles existants */
.photo-mode {
  background-color: white;
  border-radius: 16px;
  padding: 25px;
  height: fit-content;
  border-left: 4px solid #9059a0;
  transition: box-shadow 0.3s ease;
}
.photo-mode:hover {
  box-shadow: 0 8px 16px rgba(144, 89, 160, 0.15) !important;
}
.mode-title {
  color: #9059a0;
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #f0e6f5;
}
.mode-selection {
  margin-bottom: 20px;
}
.mode-info {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
  padding: 12px;
  background-color: #f8f5fc;
  border-radius: 8px;
}
.mode-icon {
  font-size: 28px;
}
.mode-description {
  font-size: 0.9rem;
  color: #555;
  margin: 0;
}

/* Panneau photo */
.photo-panel {
  background-color: white;
  border-radius: 16px;
  padding: 25px 30px;
  display: flex;
  flex-direction: column;
  border-left: 4px solid #9059a0;
  transition: box-shadow 0.3s ease;
}
.photo-panel:hover {
  box-shadow: 0 8px 16px rgba(144, 89, 160, 0.15) !important;
}
.top-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 24px;
  align-items: center;
}
.upload-btn {
  border-radius: 8px;
  height: 42px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease, background-color 0.2s ease;
  font-weight: 500;
}
.upload-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(144, 89, 160, 0.2) !important;
}
.upload-text {
  margin-left: 6px;
  font-size: 0.9rem;
}
.photo-select {
  min-width: 260px;
  flex-grow: 1;
}
.photo-search {
  max-width: 280px;
  flex-grow: 1;
}
.gallery-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.gallery-title {
  color: #333;
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #f0e6f5;
}
.counter {
  font-size: 0.9rem;
  color: #666;
  font-weight: 400;
}
.photo-grid {
  flex-grow: 1;
  overflow-y: auto;
}
.photo-card {
  border-radius: 12px;
  transition: all 0.3s ease;
  position: relative;
  height: 200px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.photo-card:not(.locked):hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1) !important;
}
.photo-card.selected {
  border: 2px solid #9059a0;
  box-shadow: 0 6px 20px rgba(144, 89, 160, 0.35) !important;
}
.photo-card.locked {
  opacity: 0.85;
}
.photo-caption {
  font-size: 0.9rem;
  text-align: center;
  padding: 10px 8px 0;
  background-color: #f9f9f9;
  color: #333;
  border-top: 1px solid #eee;
  margin: 0;
}
.image {
  width: 100%;
  height: 130px;
  object-fit: cover;
}
.lock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}
.lock-icon {
  filter: drop-shadow(0 0 3px rgba(0, 0, 0, 0.5));
}
.selected-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #9059a0;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  gap: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* Styles pour le dialog et sa validation */
.dialog-card {
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}
.dialog-header {
  background: linear-gradient(45deg, #9059a0, #c29bd4);
  color: #fff;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
.dialog-content {
  padding: 20px;
}
.dialog-input {
  margin-bottom: 15px;
}
.dialog-actions {
  padding: 8px 16px;
}

/* Responsive */
@media (max-width: 960px) {
  .photos-page {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 15px;
  }
  .top-bar {
    flex-direction: column;
    align-items: stretch;
  }
  .photo-search,
  .photo-select {
    max-width: none;
    width: 100%;
  }
  .upload-btn {
    width: 100%;
  }
}
</style>
