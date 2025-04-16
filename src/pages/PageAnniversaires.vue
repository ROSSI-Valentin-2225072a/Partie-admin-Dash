<template>
  <v-container class="py-10 d-flex justify-start">
    <v-row>
      <!-- Carte Liste des anniversaires -->
      <v-col cols="12" md="6">
        <v-card class="birthday-card pa-4" elevation="10" max-width="4000" rounded="xl">
          <v-btn color="#9059a0" class="mb-4 add-btn" block @click="ajouterAnniversaire = true">
            <v-icon left>mdi-plus-circle</v-icon>
            Ajouter un anniversaire
          </v-btn>

          <v-list dense class="birthday-list">
            <v-list-item v-for="(personne, index) in anniversaires" :key="personne.id" class="birthday-item">
              <v-row class="align-center justify-space-between" no-gutters style="width: 100%;">
                <v-col cols="8">
                  <div class="text-left font-weight-bold person-name">{{ personne.firstName }} {{ personne.lastName }}</div>
                  <div class="text-left person-date">{{ new Date(personne.birthday).toLocaleDateString('fr-FR') }}</div>
                </v-col>
                <v-col cols="4" class="text-right d-flex justify-end">
                  <v-btn icon variant="text" @click="modifier(index)" class="hover-rotate action-btn">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn icon variant="text" @click="supprimer(index)" class="action-btn">
                    <v-icon :color="hoveredTrash === index ? 'red' : 'black'"
                            @mouseover="hoveredTrash = index"
                            @mouseleave="hoveredTrash = null">
                      {{ hoveredTrash === index ? 'mdi-delete-empty' : 'mdi-delete' }}
                    </v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-list-item>

            <v-list-item v-if="anniversaires.length === 0" class="empty-list">
              <div class="text-center pa-4 empty-message">
                <v-icon large color="#9059a0">mdi-cake-variant</v-icon>
                <div class="mt-2">Aucun anniversaire enregistré</div>
              </div>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>

      <!-- Formulaire d'ajout ou de modification -->
      <v-col cols="12" md="6">
        <v-card v-if="ajouterAnniversaire || modifierAnniversaire" class="pa-4 form-box" elevation="10" rounded="xl">
          <h2 class="form-title mb-4">
            {{ ajouterAnniversaire ? 'Ajouter un anniversaire' : 'Modifier un anniversaire' }}
          </h2>

          <v-form ref="formRef" v-model="formValide">
            <v-text-field
              label="Nom de la personne"
              v-model="nouveauNom"
              :rules="nomRules"
              prepend-icon="mdi-account"
              variant="outlined"
              required
              class="input-field"
            ></v-text-field>

            <v-text-field
              label="Prénom de la personne"
              v-model="nouveauPrenom"
              :rules="nomRules"
              prepend-icon="mdi-account"
              variant="outlined"
              required
              class="input-field"
            ></v-text-field>

            <v-text-field
              class="date-field input-field"
              label="Date"
              v-model="nouvelleDate"
              type="date"
              :rules="dateRules"
              prepend-icon="mdi-calendar"
              variant="outlined"
              hint="Format: JJ/MM/AAAA"
              persistent-hint
              required
            ></v-text-field>

            <div class="form-actions">
              <v-btn class="ok-btn" @click="ajouterAnniversaire ? ajouter() : modifierConfirm()">
                <v-icon left>{{ ajouterAnniversaire ? 'mdi-check-circle' : 'mdi-content-save' }}</v-icon>
                {{ ajouterAnniversaire ? 'Ajouter' : 'Enregistrer' }}
              </v-btn>
              <v-btn class="cancel-btn" @click="annulerModification">
                <v-icon left>mdi-close-circle</v-icon>
                Annuler
              </v-btn>
            </div>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const url = "https://dashboardisis.alwaysdata.net/api/v1/dashboard/person"

const anniversaires = ref([])
const ajouterAnniversaire = ref(false)
const modifierAnniversaire = ref(false)
const indexModifier = ref(null)
const nouveauNom = ref("")
const nouveauPrenom = ref("")

const nouvelleDate = ref("")
const hoveredTrash = ref(null)

const formRef = ref(null)
const formValide = ref(false)

const currentYear = new Date().getFullYear()

const nomRules = [
  (v) => !!v || 'Veuillez remplir ce champ',
  (v) => v.length >= 3 || 'Le nom doit contenir au moins 3 caractères'
]

const dateRules = [
  (v) => !!v || 'Veuillez remplir ce champ',
  (v) => {
    if (!v) return true
    const [year] = v.split('-')
    const yearNum = parseInt(year)
    return (yearNum >= 1920 && yearNum <= currentYear) || `L'année doit être correcte`
  }
]

const getAllPersons = async () => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    anniversaires.value = data
  } catch (error) {
    console.error("Erreur lors du chargement:", error)
  }
}

function ajouter() {
  formRef.value?.validate()
  if (formValide.value) {
    const [year, month, day] = nouvelleDate.value.split('-')
    const requestBody = {
      firstName: nouveauPrenom.value,
      lastName: nouveauNom.value,
      birthday: `${year}-${month}-${day}`
    }

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    }).then(() => {
      getAllPersons()
      resetForm()
    }).catch(err => console.error("Erreur ajout:", err))
  }
}

function modifier(index) {
  indexModifier.value = index
  const personne = anniversaires.value[index]

  nouveauNom.value = personne.firstName
  nouveauPrenom.value = personne.lastName
  nouvelleDate.value = personne.birthday
  modifierAnniversaire.value = true
  ajouterAnniversaire.value = false
}

function modifierConfirm() {
  const personne = anniversaires.value[indexModifier.value]

  formRef.value?.validate()
  if (formValide.value) {
    const [year, month, day] = nouvelleDate.value.split('-')
    const requestBody = {
      firstName: nouveauNom.value,
      lastName: nouveauPrenom.value,
      birthday: `${year}-${month}-${day}`
    }

    fetch(`${url}/id=${personne.personId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    }).then(() => {
      getAllPersons()
      resetForm()
    }).catch(err => console.error("Erreur modification:", err))
  }
}

function supprimer(index) {
  const personne = anniversaires.value[index]
  const confirmation = window.confirm("Supprimer " + personne.firstName + " " + personne.lastName + " ?")
  if (confirmation) {
    fetch(`${url}/id=${personne.personId}`, {
      method: 'DELETE'
    }).then(() => {
      getAllPersons()
    }).catch(err => console.error("Erreur suppression:", err))
  }
}

function annulerModification() {
  resetForm()
}

function resetForm() {
  nouveauNom.value = ""
  nouveauPrenom.value = ""
  nouvelleDate.value = ""
  ajouterAnniversaire.value = false
  modifierAnniversaire.value = false
  indexModifier.value = null
}

onMounted(() => {
  getAllPersons()
})
</script>

<style scoped>
/* Card styles */
.birthday-card {
  background-color: #f8f5fc;
  border-left: 4px solid #9059a0;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  border-radius: 16px;
  overflow: hidden;
}

.birthday-card:hover {
  box-shadow: 0 8px 20px rgba(144, 89, 160, 0.25) !important;
  transform: translateY(-3px);
}

/* Button styles */
.add-btn {
  border-radius: 12px;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.5px;
  transition: transform 0.3s, background-color 0.3s;
  box-shadow: 0 3px 10px rgba(144, 89, 160, 0.35);
  font-size: 1.05rem;
  padding: 12px 0;
}

.add-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(144, 89, 160, 0.5);
  background-color: #9f6bae !important;
}

/* List item styles */
.birthday-list {
  border-radius: 12px;
  overflow: hidden;
  background-color: #fbfafd;
  box-shadow: inset 0 0 6px rgba(144, 89, 160, 0.1);
}

.birthday-item {
  border-bottom: 1px solid #ebdeef;
  padding: 16px 12px;
  transition: all 0.3s ease;
  margin-bottom: 4px;
  border-radius: 8px;
}

.birthday-item:hover {
  background-color: #f1e8f5;
  transform: translateX(4px);
  box-shadow: -3px 0 0 #9059a0;
}

.birthday-item:last-child {
  border-bottom: none;
}

.person-name {
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.3px;
  transition: color 0.2s;
}

.birthday-item:hover .person-name {
  color: #9059a0;
}

.person-date {
  color: #666;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  margin-top: 4px;
}

.person-date::before {
  content: "";
  display: inline-block;
  width: 8px;
  height: 8px;
  background-color: #9059a0;
  border-radius: 50%;
  margin-right: 8px;
  opacity: 0.6;
}

/* Empty state */
.empty-message {
  color: #666;
  font-style: italic;
  padding: 30px 0;
}

.empty-message .v-icon {
  opacity: 0.7;
  font-size: 48px;
  margin-bottom: 12px;
}

/* Action buttons */
.action-btn {
  opacity: 0.7;
  margin: 0 4px;
  transition: all 0.3s ease;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.6);
}

.action-btn:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
}

.hover-rotate .v-icon {
  transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.hover-rotate:hover .v-icon {
  transform: rotate(-30deg) scale(1.2);
  color: #9059a0;
}

/* Form styles */
.form-box {
  background-color: #f8f5fc;
  border-left: 4px solid #9059a0;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
  border-radius: 16px;
  animation: slideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.form-box:hover {
  box-shadow: 0 8px 20px rgba(144, 89, 160, 0.25) !important;
}

.form-title {
  color: #9059a0;
  font-weight: 600;
  border-bottom: 2px solid #e9d9f2;
  padding-bottom: 14px;
  font-size: 1.4rem;
  text-align: center;
  letter-spacing: 0.5px;
}

.input-field {
  margin-bottom: 20px;
  border-radius: 8px;
}

.input-field :deep(.v-field__outline__start),
.input-field :deep(.v-field__outline__end),
.input-field :deep(.v-field__outline__notch) {
  border-color: #d4b6e0 !important;
}

.input-field:hover :deep(.v-field__outline__start),
.input-field:hover :deep(.v-field__outline__end),
.input-field:hover :deep(.v-field__outline__notch) {
  border-color: #9059a0 !important;
}

.form-actions {
  margin-top: 28px;
  display: flex;
  gap: 20px;
  justify-content: center;
}

.ok-btn {
  background-color: #4CAF50;
  color: white;
  font-weight: bold;
  padding: 10px 28px;
  border-radius: 12px;
  text-transform: none;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(76, 175, 80, 0.3);
  font-size: 1rem;
}

.ok-btn:hover {
  background-color: #43a047;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(76, 175, 80, 0.4);
}

.cancel-btn {
  background-color: #c62828;
  color: white;
  font-weight: bold;
  padding: 10px 28px;
  border-radius: 12px;
  text-transform: none;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  box-shadow: 0 3px 10px rgba(198, 40, 40, 0.3);
  font-size: 1rem;
}

.cancel-btn:hover {
  background-color: #b71c1c;
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(198, 40, 40, 0.4);
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .form-actions {
    flex-direction: column;
  }

  .ok-btn, .cancel-btn {
    width: 100%;
    margin-bottom: 10px;
  }

  .birthday-item {
    padding: 14px 10px;
  }

  .person-name {
    font-size: 1rem;
  }

  .form-title {
    font-size: 1.3rem;
  }
}
</style>
