<template>
  <div class="meteo-box" v-if="loaded">
    <div class="meteo-time">{{ heure }}</div>
    <div class="meteo-temp">{{ meteo.temp_c }}°C</div>
    <div class="meteo-desc">{{ meteo.condition.text }}</div>
  </div>
</template>
 
 <script setup>
 import { ref, onMounted, onUnmounted } from "vue";
 import axios from "axios";
 
 const meteo = ref({});
 const loaded = ref(false);
 const heure = ref("");
 let intervalleHeure;
 let intervalleMeteo;
 
 // Fonction pour mettre à jour l'heure
 const updateHeure = () => {
  heure.value = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
 };
 
 const API_KEY = "365b3df7c2db422983d90723251104";
 const VILLE = "Castres";
 
 const fetchMeteo = async () => {
  try {
    const res = await axios.get(`https://api.weatherapi.com/v1/current.json`, {
      params: {
        key: API_KEY,
        q: VILLE,
        lang: "fr",
      },
    });
    meteo.value = res.data.current;
    updateHeure();
    loaded.value = true;
  } catch (err) {
    console.error("Erreur lors de la récupération de la météo", err);
  }
 };
 
 onMounted(() => {
  fetchMeteo();
  intervalleHeure = setInterval(updateHeure, 1000);
  intervalleMeteo = setInterval(fetchMeteo, 3600000);
 });
 
 onUnmounted(() => {
  if (intervalleHeure) {
    clearInterval(intervalleHeure);
  }
  if (intervalleMeteo) {
    clearInterval(intervalleMeteo);
  }
 });
 </script>
 
 <style scoped>
 .meteo-box {
  width: 280px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #1a1a5e;
  font-weight: bold;
  text-align: center;
 }
 
 .meteo-time {
  font-size: 26px;
  margin-bottom: 15px;
 }
 
 .meteo-temp {
  font-size: 26px;
 }
 
 .meteo-desc {
  font-size: 20px;
 }
 </style>
 
 