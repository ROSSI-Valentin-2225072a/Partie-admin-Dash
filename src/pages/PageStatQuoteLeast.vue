<template>
  <v-container class="d-flex justify-center align-center fill-height">
    <v-card class="quote-card pa-8" flat>
      <div class="quote-text custom-font">
        “{{ quote.text }}”
      </div>

      <v-row class="mt-10" justify="space-around">
        <v-col cols="6" class="text-center">
          <div class="info-label">Dernier affichage :</div>
          <div class="info-value pink-box">Il y a <span class="bold-number">1</span> jour</div>
        </v-col>
        <v-col cols="6" class="text-center">
          <div class="info-label">Occurrence :</div>
          <div class="info-value pink-box"><span class="bold-number">32</span></div>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const quote = ref({
  text: "Le savoir est une arme."
})
</script>

<style scoped>
/* ✅ Import local pour ce composant uniquement */

.quote-card {
  background: transparent;
  border: 2px solid #ec4899;
  border-radius: 16px;
  max-width: 700px;
  text-align: center;
}

.quote-text {
  font-size: 1.8rem;
  font-style: italic;
  color: white;
  line-height: 1.5;
}

/* ✅ Police ciblée uniquement sur la citation */
.custom-font {
  font-family: 'Plus Jakarta Sans', sans-serif;
}

.info-label {
  font-size: 1rem;
  color: white;
  margin-bottom: 4px;
}

.pink-box {
  display: inline-block;
  padding: 6px 12px;
  border: 2px solid #ec4899;
  border-radius: 12px;
  font-size: 1rem;
  color: white;
  margin-top: 4px;
}

.bold-number {
  font-weight: bold;
  font-size: 1.2rem;
}
</style>
