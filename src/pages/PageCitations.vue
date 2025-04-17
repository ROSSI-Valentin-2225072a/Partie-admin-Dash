<template>
  <v-container class="ma-5 d-flex">
    <!-- Sélecteur de mode -->
    <v-card class="citation-mode" elevation="3">
      <h3 class="mode-title">Mode de gestion</h3>
      <v-radio-group
        v-model="mode"
        column
        class="mode-selection"
      >
        <v-radio
          label="Mode manuel"
          value="manuel"
          color="#9059a0"
        />
        <v-radio
          label="Mode automatique"
          value="auto"
          color="#9059a0"
        />
      </v-radio-group>

      <div class="mode-info">
        <v-icon :color="mode === 'manuel' ? '#9059a0' : '#888'" class="mode-icon">
          {{ mode === 'manuel' ? 'mdi-hand' : 'mdi-robot' }}
        </v-icon>
        <p class="mode-description">
          {{
            mode === 'manuel'
              ? 'Sélectionnez manuellement la citation du jour'
              : 'Rotation automatique des citations'
          }}
        </p>
      </div>
    </v-card>

    <v-card
      class="pa-4 citation-container flex-grow-1 position-relative"
      elevation="5"
    >
      <h2 class="mb-3 purple-text">Citations</h2>

      <v-text-field
        v-model="recherche"
        label="Rechercher une citation"
        prepend-icon="mdi-magnify"
        class="search-field mb-3"
        clearable
        hide-details
        outlined
        dense
        :disabled="mode === 'auto'"
        :class="{ 'disabled-field': mode === 'auto' }"
      ></v-text-field>

      <v-text-field
        v-model="nouvelleCitation"
        label="Ajouter une citation"
        append-icon="mdi-plus"
        class="input-citation mb-3"
        @click:append="ajouterCitation"
        @keyup.enter="ajouterCitation"
        clearable
        outlined
        :disabled="mode === 'auto'"
        :class="{ 'disabled-field': mode === 'auto' }"
      ></v-text-field>

      <div class="custom-divider mb-3"></div>

      <v-list dense class="citation-list">
        <v-list-item
          v-for="(citation, index) in citationsFiltrees"
          :key="index"
          class="citation-item mb-2"
          :class="{ grise: mode === 'auto' }"
          @click="cliquerCitation(index)"
        >
          <div class="citation-content">
            <template v-if="editionIndex === getIndexReel(index)">
              <v-text-field
                v-model="citationEditee"
                dense
                hide-details
                class="flex-grow-1 mr-2"
                @keyup.enter="confirmerEdition"
                @keyup.esc="annulerEdition"
                ref="editField"
                autofocus
              />
            </template>
            <template v-else>
              <span
                class="citation-texte"
                :class="{ selectable: mode === 'manuel' }"
              >
                {{ citation }}
              </span>
            </template>

            <div class="actions" v-if="mode === 'manuel'">
              <v-checkbox
                v-model="selectedCitation"
                :value="getIndexReel(index)"
                class="select-checkbox"
                @change="selectUnique(index)"
                hide-details
                density="compact"
              ></v-checkbox>

              <!-- Bouton d'édition (crayon) avec effet de rotation -->
              <v-btn
                icon
                variant="text"
                @click.stop="activerEdition(index)"
                @mouseover="hoveredEdit = index"
                @mouseleave="hoveredEdit = null"
                class="edit-btn hover-rotate"
              >
                <v-icon
                  :color="hoveredEdit === index ? '#9059a0' : 'grey darken-1'"
                >
                  {{
                    hoveredEdit === index ? "mdi-pencil" : "mdi-pencil-outline"
                  }}
                </v-icon>
              </v-btn>

              <v-btn
                icon
                variant="text"
                @click.stop="supprimerCitation(index)"
                @mouseover="hoveredTrash = index"
                @mouseleave="hoveredTrash = null"
                class="delete-btn"
              >
                <v-icon
                  :color="hoveredTrash === index ? 'red' : 'grey darken-1'"
                >
                  {{
                    hoveredTrash === index ? "mdi-delete-empty" : "mdi-delete"
                  }}
                </v-icon>
              </v-btn>
            </div>

            <v-icon v-if="mode === 'auto'" color="#9059a0">mdi-lock</v-icon>
          </div>
        </v-list-item>

        <v-alert
          v-if="citationsFiltrees.length === 0"
          type="info"
          class="mt-2"
          dense
          outlined
        >
          Aucune citation ne correspond à votre recherche.
        </v-alert>
      </v-list>

      <!-- Cadenas visuel en mode automatique -->
      <div v-if="mode === 'auto'" class="auto-overlay">
        <v-icon size="80" color="white">mdi-lock</v-icon>
      </div>
    </v-card>
  </v-container>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useQuoteStore } from "@/stores/quoteStore";

const quoteStore = useQuoteStore();
const mode = ref("manuel");
const selectedCitation = ref(null);
const hoveredTrash = ref(null);
const hoveredEdit = ref(null);
const recherche = ref("");
const editionIndex = ref(null);
const citationEditee = ref("");
const editField = ref(null);

const citations = ref([]);
const citationsData = ref([]); // Pour stocker les données complètes avec IDs
const nouvelleCitation = ref("");
const apiUrl = "https://dashboardisis.alwaysdata.net/api/v1/dashboard/quote";
const errorMessage = ref(""); // Pour stocker les messages d'erreur

// Chargement des citations depuis l'API
const chargerCitations = async () => {
  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      citationsData.value = data; // Garder les données complètes avec IDs
      citations.value = data.map(
        (item) => item.content || item.quote || item.text || item.toString()
      );
      errorMessage.value = ""; // Réinitialiser le message d'erreur
    } else {
      console.error(
        "Erreur lors du chargement des citations:",
        response.statusText
      );
      errorMessage.value = "Erreur lors du chargement des citations";
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des citations:", error);
    errorMessage.value = "Erreur lors de la récupération des citations";
    // Charger des citations par défaut en cas d'erreur
    citations.value = [
      "La météo est à l'image de la vie : parfois orageuse, parfois ensoleillée.",
      "Fais de ta vie un rêve, et d'un rêve, une réalité.",
      "La famille, c'est là où la vie commence et où l'amour ne finit jamais.",
      "Choisissez un travail que vous aimez et vous n'aurez pas à travailler un seul jour.",
      "La vie, c'est 10 % ce qui nous arrive et 90 % la façon dont on y réagit.",
    ];
  }
};

const citationsFiltrees = computed(() => {
  if (!recherche.value.trim()) return citations.value;
  const termeLowerCase = recherche.value.toLowerCase().trim();
  return citations.value.filter((citation) =>
    citation.toLowerCase().includes(termeLowerCase)
  );
});

const getIndexReel = (index) => {
  return citations.value.indexOf(citationsFiltrees.value[index]);
};

const getCitationId = (index) => {
  const realIndex = getIndexReel(index)
  return citationsData.value[realIndex].quoteId
};

const ajouterCitation = async () => {
  if (nouvelleCitation.value.trim() && mode.value === "manuel") {
    try {
      errorMessage.value = ""; // Réinitialiser le message d'erreur

      // Ajouter à l'API
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body:  nouvelleCitation.value.trim(),
      });

      if (response.ok) {
        // Récupérer les données mises à jour
        await chargerCitations();
        nouvelleCitation.value = "";
      } else {
        console.error(
          "Erreur lors de l'ajout de la citation:",
          response.statusText
        );
        errorMessage.value = "Erreur lors de l'ajout de la citation";
        alert("Erreur lors de l'ajout de la citation");

        // En mode local (lorsque l'API échoue mais que l'application doit continuer)
        citations.value.push(nouvelleCitation.value.trim());
        nouvelleCitation.value = "";
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la citation:", error);
      errorMessage.value = "Erreur lors de l'ajout de la citation";
      alert("Erreur lors de l'ajout de la citation");

      // En cas d'erreur, ajouter localement quand même
      citations.value.push(nouvelleCitation.value.trim());
      nouvelleCitation.value = "";
    }
  }
};

const supprimerCitation = async (index) => {
  if (mode.value === "manuel") {
    const citationReelle = getIndexReel(index);
    if (citationReelle !== -1) {
      const confirmation = window.confirm(
        "Êtes-vous sûr de vouloir supprimer cette citation ?"
      );
      if (confirmation) {
        try {
          errorMessage.value = ""; // Réinitialiser le message d'erreur

          // Récupérer l'ID de la citation
          const citationId = getCitationId(index);

          // Supprimer de l'API
          const response = await fetch(`${apiUrl}/id=${citationId}`, {
            method: "DELETE",
          });

          if (response.ok || response.status === 404) {
            // Récupérer les données mises à jour
            await chargerCitations();
            if (selectedCitation.value === citationReelle) {
              selectedCitation.value = null;
            }
          } else {
            console.error(
              "Erreur lors de la suppression de la citation:",
              response.statusText
            );
            errorMessage.value = "Erreur lors de la suppression de la citation";
            alert("Erreur lors de la suppression de la citation");

            // En cas d'échec API, supprimer localement quand même
            if (selectedCitation.value === citationReelle) {
              selectedCitation.value = null;
            }
            citations.value.splice(citationReelle, 1);
          }
        } catch (error) {
          console.error("Erreur lors de la suppression de la citation:", error);
          errorMessage.value = "Erreur lors de la suppression de la citation";
          alert("Erreur lors de la suppression de la citation");

          // En cas d'erreur, supprimer localement quand même
          if (selectedCitation.value === citationReelle) {
            selectedCitation.value = null;
          }
          citations.value.splice(citationReelle, 1);
        }
      }
    }
  }
};

const selectUnique = (index) => {
  selectedCitation.value = citations.value[getIndexReel(index)];
  quoteStore.setNextPhoto(selectedCitation.value)
  console.log(quoteStore.nextQuote)
};

const cliquerCitation = (index) => {
  if (mode.value === "manuel") {
    selectedCitation.value = citations.value[getIndexReel(index)];
  }
};

const activerEdition = (index) => {
  if (mode.value !== "manuel") return;
  const citationReelle = getIndexReel(index);
  editionIndex.value = citationReelle;
  citationEditee.value = citations.value[citationReelle];
};

const confirmerEdition = () => {
  if (editionIndex.value !== null && citationEditee.value.trim()) {
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir modifier cette citation ?"
    );
    if (confirmation) {
      validerEdition();
    } else {
      annulerEdition();
    }
  }
};

const validerEdition = async () => {
  if (editionIndex.value !== null && citationEditee.value.trim()) {
    try {
      errorMessage.value = ""; // Réinitialiser le message d'erreur

      const citationId = getCitationId(editionIndex.value)

      // Mettre à jour dans l'API
      const response = await fetch(`${apiUrl}/id=${citationId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: citationEditee.value,
      });
      if (response.ok) {
        // Récupérer les données mises à jour
        await chargerCitations();
      } else {
        console.error(
          "Erreur lors de la mise à jour de la citation:",
          response.statusText
        );
        errorMessage.value = "Erreur lors de la mise à jour de la citation";
        alert("Erreur lors de la mise à jour de la citation");

        // Mettre à jour localement en cas d'erreur API
        citations.value[editionIndex.value] = citationEditee.value.trim();
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la citation:", error);
      errorMessage.value = "Erreur lors de la mise à jour de la citation";
      alert("Erreur lors de la mise à jour de la citation");

      // Mettre à jour localement en cas d'erreur
      citations.value[editionIndex.value] = citationEditee.value.trim();
    }

    editionIndex.value = null;
    citationEditee.value = "";
  }
};

const annulerEdition = () => {
  editionIndex.value = null;
  citationEditee.value = "";
};

const selectRandomCitation = () => {
  if (citations.value.length > 0) {
    const randomIndex = Math.floor(Math.random() * citations.value.length);
    selectedCitation.value = getIndexReel(randomIndex);
    quoteStore.setNextPhoto(citations.value[selectedCitation.value])

    console.log(quoteStore.nextQuote)
  }
};

// Surveiller les changements de mode
watch(mode, (newMode) => {
  if (newMode === "auto") {
    chargerCitations();
    selectRandomCitation();
  }
});

onMounted(() => {
  chargerCitations();
});
</script>

<style scoped>
.d-flex {
  display: flex;
  gap: 20px;
}

.mode-title {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.citation-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  flex-grow: 1;
  position: relative;
}

.purple-text {
  color: #9059a0;
  font-weight: 500;
}

.input-citation,
.search-field {
  background: #f3f3f3;
  border-radius: 8px;
}

.disabled-field {
  opacity: 0.7;
  background-color: rgba(144, 89, 160, 0.1) !important;
}

.custom-divider {
  height: 1px;
  background-color: rgba(0, 0, 0, 0.12);
  width: 100%;
}

.citation-list {
  max-height: 60vh;
  overflow-y: auto;
}

.citation-item {
  padding: 10px;
  border-radius: 8px;
  transition: background-color 0.2s ease;
  margin-bottom: 5px;
  border: 1px solid #f0f0f0;
  cursor: pointer;
  position: relative;
}

.citation-item:hover {
  background-color: #f9f5fc;
}

.citation-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.citation-texte {
  font-weight: 500;
  color: #333;
  flex: 1;
}

.selectable {
  cursor: pointer;
  user-select: text;
  padding: 2px 4px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.selectable:hover {
  background-color: rgba(144, 89, 160, 0.1);
}

.actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.select-checkbox {
  margin: 0;
  padding: 0;
}

.delete-btn,
.edit-btn {
  min-width: unset;
  padding: 0;
  box-shadow: none;
  background-color: transparent;
  transition: all 0.2s ease;
}

.delete-btn:hover,
.edit-btn:hover {
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 50%;
}

/* Effet de rotation pour l'icône du stylo */
.hover-rotate .v-icon {
  transition: transform 0.3s ease;
}

.hover-rotate:hover .v-icon {
  transform: rotate(-30deg);
}

.grise {
  opacity: 0.5;
  pointer-events: none;
}

.auto-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(144, 89, 160, 0.6);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
  pointer-events: none;
}

.citation-mode {
  background-color: white;
  border-radius: 16px;
  padding: 25px;
  height: fit-content;
  border-left: 4px solid #9059a0;
  transition: box-shadow 0.3s ease;
}
.citation-mode:hover {
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

</style>
