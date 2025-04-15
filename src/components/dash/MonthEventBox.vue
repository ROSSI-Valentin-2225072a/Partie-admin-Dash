<template>
  <div class="eventmonth-container">
    <h2 class="eventmonth-title">Événement du mois</h2>
    <span class="eventmonth-text">Événement du mois à venir</span>
  </div>
</template>

<script setup></script>

<style scoped>

.eventmonth-title {
  font-size: 2rem;
  font-weight: 600;
  font-family: 'Plus Jakarta Sans', sans-serif; /* Applique Jakarta Sans uniquement au titre */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  text-align: center;
  margin-bottom: 1.2rem;
}

.eventmonth-container {
  width: 700px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.eventmonth-text {
  color: #333;
  font-size: 1rem;
  font-weight: bold;
  opacity: 0.7;
}
</style>

