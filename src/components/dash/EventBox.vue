<script setup>
import { onMounted, ref } from "vue"
import EventItem from "./EventItem..vue";

const url = "https://dashboardisis.alwaysdata.net/api/v1/dashboard/event"
const listEvents = ref([])

function chargerEvents() {
    const fetchOptions = {method : 'GET'}

    fetch(url, fetchOptions)
    .then((response) => response.json())
    .then((dataJSON) => {
        const results = dataJSON;
        results.map((currentEvent) => {
          if(eventIsInTimeFrame(currentEvent.dateEvent)){
            listEvents.value.push(currentEvent)
          }
        })
    }).catch((error) => {
        console.error("Erreur lors de la récupération des évènements : ", error);
    });


    listEvents.value.filter((currentEvent) => currentEvent.getMonth() == currentMonth)
}

function eventIsInTimeFrame(dateToCompare) {
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()

  const eventYear = parseInt(dateToCompare.split("T")[0].split("-")[0])
  const eventMonth = parseInt(dateToCompare.split("T")[0].split("-")[1])

  return (currentYear === eventYear) && (currentMonth === eventMonth - 1)
}

onMounted(() => {
    chargerEvents();
})

</script>
<template>
<div class="event-scroll-wrapper">
  <div class="event-scroll-content" ref="scrollContainer">
    <v-row dense>
      <v-col v-for="evenement in listEvents" :key="evenement.id">
        <EventItem :currentEvent="evenement"/>
      </v-col>
    </v-row>
    </div>
    </div>
</template>

<style scoped>

.v-container {
  max-height: 400px;
  max-width: 700px;
  overflow-y: auto;
  background: transparent;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.v-row {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.event-scroll-wrapper {
  height: 400px;
  overflow: hidden;
  position: relative;
}

.event-scroll-content {
  display: flex;
  flex-direction: column;
  animation: scroll-yoyo 12s ease-in-out infinite alternate;
}

/* L’animation fait défiler puis remonte */
@keyframes scroll-yoyo {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(-100% + 400px)); /* tout le contenu - la fenêtre visible */
  }
}


</style>