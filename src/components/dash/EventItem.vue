<script setup>

const props = defineProps(["currentEvent"])

const nomEvent = props.currentEvent.nomEvent
const description = props.currentEvent.description
const lieu = props.currentEvent.lieu
const dateEvent = formatDate(props.currentEvent.dateEvent)

function formatDate(dateToFormat) {
  const day = dateToFormat.split("-")[2].split("T")[0]
  const month = dateToFormat.split("-")[1]
  const year = dateToFormat.split("-")[0]

  return `${day}-${month}-${year}`
}

</script>
<template>
  <div class="event-wrapper">
    <v-card class="event-card">
      <div class="event-header">
        <span class="event-date">{{ dateEvent }}</span>
      </div>
      <v-card-title>{{ nomEvent }}</v-card-title>
      <v-card-text>{{ description }}</v-card-text>
      <v-card-text>{{ lieu }}</v-card-text>
    </v-card>
  </div>
</template>


<style scoped>
.event-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
  width: 480px;
  margin-left: auto;
  margin-right: auto;
  height: 155px;
  overflow: hidden;
}

.event-card {
  flex: 1;
  padding: 12px;
  background-color: white;
  border-radius: 10px;
  border-left: 4px solid #2f2769;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: left;
  color: #2f2769;
  height: 100%;
}

.event-header {
  margin-bottom: 4px;
}

.event-date {
  background-color: #f3e8ff;
  color: #2f2769;
  padding: 2px 6px;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 6px;
  text-transform: uppercase;
}

.v-card-title {
  color: #2f2769;
  font-size: 1rem;
  font-weight: bold;
  margin-bottom: 4px;
  text-transform: uppercase;
}

.v-card-text {
  font-size: 0.85rem;
  opacity: 0.9;
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.v-card-text:last-child {
  font-style: italic;
  opacity: 0.7;
}

</style>