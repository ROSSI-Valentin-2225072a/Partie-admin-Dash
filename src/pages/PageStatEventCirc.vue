<template>
  <v-container>
    <h2 class="text-h5 mb-4">Répartition des types d'événements</h2>

    <!-- Sélecteur de période -->
    <v-row>
      <v-col cols="12" md="6">
        <v-select
          v-model="selectedPeriod"
          :items="periods"
          label="Choisir une période"
        />
      </v-col>
    </v-row>

    <!-- Affichage du graphique -->
    <v-row>
      <v-col cols="12" md="8">
        <DoughnutChart :data="chartData" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Doughnut } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale
} from 'chart.js'

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)

// Données simulées pour les événements par mois
const eventStats = {
  Janvier: { Pédagogique: 5, 'Vie étudiante': 3, Conférence: 2, Interne: 4 },
  Février: { Pédagogique: 2, 'Vie étudiante': 6, Conférence: 1, Interne: 5 },
  Mars: { Pédagogique: 8, 'Vie étudiante': 4, Conférence: 3, Interne: 7 },
  Avril: { Pédagogique: 6, 'Vie étudiante': 5, Conférence: 2, Interne: 6 }
}

// Périodes disponibles pour la sélection
const periods = ['Janvier', 'Février', 'Mars', 'Avril']

// La période sélectionnée
const selectedPeriod = ref('Janvier')

// Computed pour récupérer les données du graphique en fonction de la période sélectionnée
const chartData = computed(() => {
  const data = eventStats[selectedPeriod.value]
  return {
    labels: Object.keys(data), // Les types d'événements
    datasets: [
      {
        label: 'Événements',
        data: Object.values(data), // Le nombre d'événements pour chaque type
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#F7FF33'], // Couleurs des segments
        hoverOffset: 4
      }
    ]
  }
})
</script>

<style scoped>
/* Style optionnel pour ajuster l'apparence du graphique */
.v-container {
  padding: 16px;
}

.v-row {
  margin-top: 16px;
}
</style>
