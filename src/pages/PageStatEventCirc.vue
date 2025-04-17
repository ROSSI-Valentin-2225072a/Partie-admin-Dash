<template>
  <div class="wrapper">
    <!-- Conteneur du graphique -->
    <div class="chart-container">
      <apexchart
        width="600"
        height="400"
        :options="chartOptions"
        :series="chartSeries"
      ></apexchart>
    </div>

    <!-- Sélecteur d'année à droite -->
    <div class="year-selector">
      <v-select
        v-model="selectedYear"
        :items="yearOptions"
        label="Sélectionnez l'année"
        outlined
        dense
      ></v-select>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import apexchart from 'vue3-apexcharts';

// Liste des années disponibles
const yearOptions = [2020, 2021, 2022, 2023, 2024];
const selectedYear = ref(2020);

// Exemple de données par année pour le graphique
const pieDataByYear = {
  2020: [44, 13, 55, 43],
  2021: [50, 10, 60, 35],
  2022: [40, 20, 45, 35],
  2023: [30, 25, 50, 45],
  2024: [20, 30, 40, 50],
};

// Libellés fixes pour chaque catégorie
const labels = ["Vie étudiante", "Conférence", "Interne", "Pédagogique"];

// Série du graphique qui change en fonction de l'année sélectionnée
const chartSeries = computed(() => {
  return pieDataByYear[selectedYear.value] || [];
});

// Options de base du graphique
const options = {
  chart: {
    type: "pie",
    toolbar: {
      show: true,
      tools: {
        zoom: true,
        download: true,
        fullscreen: true,
      },
      export: {
        csv: {
          filename: 'graphique-repartition-categories',
          delimiter: ',',
        }
      }
    },
    fontFamily: "'Poppins', sans-serif",
  },
  labels: labels,
  colors: ["red", "blue", "yellow", "green"],
  responsive: [{
    breakpoint: 1000,
    options: {
      chart: {
        width: "100%",
      },
    },
  }],
  title: {
    text: "Répartition par catégorie - " + selectedYear.value,
    align: "center",
    style: {
      fontSize: '20px',
      fontWeight: '600',
      color: '#334155',
    }
  },
  tooltip: {
    theme: 'dark',
    style: {
      fontSize: '12px',
    },
    x: {
      show: true
    },
    y: {
      formatter: function(val) {
        return val.toFixed(0);
      }
    }
  },
};

// Options réactives qui mettent à jour le titre en fonction de l'année sélectionnée
const chartOptions = computed(() => {
  return {
    ...options,
    title: {
      ...options.title,
      text: "Répartition par catégorie - " + selectedYear.value,
    },
  };
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Wrapper englobant le graphique et le sélecteur d'année */
.wrapper {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  padding: 20px;
}

/* Conteneur du graphique */
.chart-container {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
}

/* Style optionnel pour arrondir les barres si d'autres graphiques sont utilisés */
.chart-container .apexcharts-bar-series path {
  border-radius: 10px;
}

/* Conteneur du sélecteur d'année */
.year-selector {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

/* Largeur définie pour le v-select */
.year-selector .v-select {
  width: 200px;
}
</style>
