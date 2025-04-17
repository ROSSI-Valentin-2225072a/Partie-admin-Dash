<template>
  <div class="chart-container">
    <apexchart width="800" height="500" :options="options" :series="series"></apexchart>
  </div>
</template>

<script setup>
import apexchart from "vue3-apexcharts";

// -- les series de données à afficher
const series = [
  {
    name: "Vie étudiante",
    data: [4, 5, 3, 5, 2, 1]
  },
  {
    name: "Conférence",
    data: [0, 1, 2, 1, 3, 0]
  },
  {
    name: "Interne",
    data: [5, 4, 2, 4, 6, 7]
  },
  {
    name: "Pédagogique",
    data: [2, 4, 1, 10, 4, 6]
  }
];

// -- les options du graphique
const options = {
  chart: {
    type: "bar", // type de graphique
    height: 700, // hauteur du graphique
    background: "white", // fond du graphique
    fontFamily: "'Poppins', sans-serif", // Police Poppins pour le graphique
  },
  plotOptions: {
    bar: {
      columnWidth: '60%', // Largeur des barres
      endingShape: 'rounded', // Forme arrondie des barres
    }
  },
  stroke: {
    show: true,
    curve: 'smooth', // type de ligne pour les barres
    width: 2,
  },
  markers: {
    size: 5, // taille des marqueurs à chaque point
  },
  xaxis: {
    categories: ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin"], // Mois
    title: {
      text: 'Mois', // Titre pour l'axe X
      style: {
        fontSize: '14px', // Taille du titre de l'axe X
        fontWeight: '600', // Poids du titre
        color: '#334155', // Couleur du titre
      }
    },
    labels: {
      rotate: -45, // Rotation des labels pour plus d'espace
      style: {
        fontSize: '14px', // Taille des labels
        fontWeight: '500', // Poids des labels
        color: '#64748B', // Couleur des labels
      }
    },
  },
  yaxis: {
    title: {
      text: 'Valeur', // Titre de l'axe Y
      style: {
        fontSize: '14px', // Taille du titre de l'axe Y
        fontWeight: '600', // Poids du titre
        color: '#334155', // Couleur du titre
      }
    },
    labels: {
      style: {
        fontSize: '14px', // Taille des labels de l'axe Y
        fontWeight: '500', // Poids des labels
        color: '#64748B', // Couleur des labels de l'axe Y
      }
    },
  },
  grid: {
    borderColor: '#e7e7e7', // Couleur des bordures de la grille
    strokeDashArray: 5, // Style des lignes de la grille
  },
  tooltip: {
    theme: 'dark', // Thème du tooltip
    style: {
      fontSize: '12px', // Taille de la police du tooltip
    },
  },
  legend: {
    position: 'top', // Position de la légende
    horizontalAlign: 'center', // Alignement horizontal
    floating: true, // Légende flottante
    offsetY: -30, // Décalage vertical de la légende
    fontSize: '14px', // Taille de la police de la légende
    fontWeight: '500', // Poids de la police de la légende
    colors: '#334155', // Couleur de la légende
  },
};

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

/* Style global pour le graphique */
.chart-container {
  width: 100%;               /* Prendre toute la largeur disponible */
  max-width: 900px;          /* Largeur maximale de 900px pour garder une cohérence */
  margin: 20px auto;         /* Espacement externe et centrer horizontalement */
  padding: 30px;             /* Espacement interne autour du graphique */
  background: #fff;          /* Fond blanc pour les graphiques */
  border-radius: 12px;       /* Bords arrondis pour un aspect moderne */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);  /* Ombre légère pour donner de la profondeur */
  display: flex;
  justify-content: center;   /* Centrer le graphique horizontalement */
  align-items: center;       /* Centrer verticalement */
  height: 600px;             /* Hauteur fixe pour les deux graphiques */
}

.chart-container .apexcharts-bar-series path {
  border-radius: 10px;  /* Pour des barres plus arrondies */
}


</style>
