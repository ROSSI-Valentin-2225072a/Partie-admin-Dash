<template>
  <div class="meteo-box" v-if="loaded">
    <h2 class="meteo-title">Météo</h2>
    <div class="meteo-content">
      <div class="meteo-time">{{ heure }}</div>
      <div class="meteo-temp">{{ meteo.temp_c }}°C</div>
      <div class="meteo-desc">{{ meteo.condition.text }}</div>
    </div>
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
  width: 350px;
  background-color: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #2f2769;
  font-weight: bold;
}

.meteo-title {
  font-size: 2rem;
  font-weight: 600;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  text-align: center;
  margin-bottom: 1.2rem;

  background: linear-gradient(135deg, #ed6962, #ffb1b1, #d6a1f2, #9059a0);
  background-size: 400% 400%;
  animation: gradientBG 20s ease infinite;
}

/* Animation pour le dégradé */
@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.meteo-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
}

.meteo-time {
  font-size: 26px;
  margin-bottom: 15px;
}

.meteo-temp {
  font-size: 26px;
  margin-bottom: 10px;
}

.meteo-desc {
  font-size: 20px;
}
</style>
