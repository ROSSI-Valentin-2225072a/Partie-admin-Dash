<script setup>
import { useEventStore } from "@/stores/eventStore";
import EventItem from "@/components/dash/EventItem.vue";
import { onMounted } from "vue";

const eventStore = useEventStore();

onMounted(() => {
  console.log(eventStore.nextEvent);
});
</script>

<template>
  <div class="eventmonth-box">
    <h2 class="eventmonth-title">Événement du mois</h2>

    <EventItem v-if="eventStore.nextEvent" :currentEvent="eventStore.nextEvent" />

    <div class="no-event-message" v-else>
      Aucun événement prévu ce mois-ci.
    </div>
  </div>
</template>

<style scoped>
.eventmonth-box {
  width: 750px;
  background-color: white;
  border-radius: 10px;
  padding: 16px;
  text-align: center;
  color: #2f2769;
  font-weight: bold;
}

.eventmonth-title {
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

.no-event-message {
  font-size: 0.9rem;
  line-height: 1.4;
  margin-top: 20px;
}

</style>
