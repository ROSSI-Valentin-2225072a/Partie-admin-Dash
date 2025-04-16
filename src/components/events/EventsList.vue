<script setup>
import { defineProps, defineEmits, computed, onMounted, watch } from "vue"
import { useEventStore } from "@/stores/eventStore" // Importez votre store existant

const props = defineProps(["events", "eventTypes", "tags"])
const emit = defineEmits(['selectEvent', 'viewEvent', 'editEvent', 'deleteEvent'])

const eventStore = useEventStore()

const selectedNextEvent = computed(() => eventStore.nextEvent)

function isSelectedAsNext(event) {
  return selectedNextEvent.value && selectedNextEvent.value.id === event.id
}

function setAsNextEvent(event) {
  const dateEvent = new Date(event.dateEvent)

  if (dateEvent.getMonth() !== new Date().getMonth() || dateEvent.getFullYear() !== new Date().getFullYear()){
    window.alert("L'évènement n'est pas dans le mois en cours!")
  } else {
    if (isSelectedAsNext(event)) {
      eventStore.setNextEvent(null)
    } else {
      eventStore.setNextEvent(event)
    }
  }
}

function clearNextEvent() {
  eventStore.setNextEvent(null)
}

function formatDateShort(date) {
  const d = new Date(date)
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
}

function getEventTypeColor(libelle) {
  return props.tags.find(type => type.libelle === libelle)?.tag || 'default'
}

</script>

<template>
  <div>
    <div class="next-event-section" v-if="selectedNextEvent">
      <v-card class="next-event-card">
        <v-card-title class="d-flex justify-space-between align-center">
          <span>Événement à venir</span>
          <v-btn size="small" variant="text" density="compact" @click="clearNextEvent">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <div class="d-flex align-center mb-2">
            <v-chip
              size="x-small"
              class="event-type-badge small mr-2"
            >
              <v-avatar start :class="`dot-${getEventTypeColor(selectedNextEvent.type.libelle)}`"></v-avatar>
              {{ selectedNextEvent.type.libelle }}
            </v-chip>
            <span class="text-body-2">{{ formatDateShort(selectedNextEvent.dateEvent) }}</span>
          </div>
          <div class="text-h6">{{ selectedNextEvent.nomEvent }}</div>
          <div v-if="selectedNextEvent.lieu" class="text-body-2 mt-1">
            <v-icon size="small">mdi-map-marker</v-icon> {{ selectedNextEvent.lieu }}
          </div>
        </v-card-text>
      </v-card>
    </div>

    <v-table class="events-list">
      <thead>
      <tr>
        <th>Date</th>
        <th>Type</th>
        <th>Titre</th>
        <th>Lieu</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="event in events"
        :key="event.id"
        class="list-event-item"
        :class="[
          `event-border-${event.type.libelle}`,
          { 'next-event-highlight': isSelectedAsNext(event) }
        ]"
      >
        <td>{{ formatDateShort(event.dateEvent) }}</td>
        <td>
          <v-chip
            size="x-small"
            class="event-type-badge small"
          >
            <v-avatar start :class="`dot-${getEventTypeColor(event.type.libelle)}`"></v-avatar>
            {{ event.type.libelle }}
          </v-chip>
        </td>
        <td>{{ event.nomEvent }}</td>
        <td>{{ event.lieu || "–" }}</td>
        <td>
          <v-btn
            icon
            density="compact"
            color="amber"
            :variant="isSelectedAsNext(event) ? 'flat' : 'text'"
            @click="setAsNextEvent(event)"
            :title="isSelectedAsNext(event) ? 'Événement du mois sélectionné' : 'Définir comme événement du mois'"
          >
            <v-icon>{{ isSelectedAsNext(event) ? 'mdi-star' : 'mdi-star-outline' }}</v-icon>
          </v-btn>
          <v-btn icon density="compact" @click="$emit('viewEvent', event)">
            <v-icon>mdi-eye</v-icon>
          </v-btn>
          <v-btn icon density="compact" @click="$emit('editEvent', event)">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn icon density="compact" @click="$emit('deleteEvent', event.id)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </td>
      </tr>
      </tbody>
    </v-table>
  </div>
</template>

<style scoped>
.next-event-section {
  margin-bottom: 16px;
}

.next-event-card {
  border-left: 4px solid #2196f3;
  background-color: #f5f9ff;
}

.next-event-highlight {
  background-color: rgba(255, 193, 7, 0.1);
}

.dot-vie {
  background-color: #4caf50;
}
.dot-conference {
  background-color: #2196f3;
}
.dot-interne {
  background-color: #ff9800;
}
.dot-pedagogique {
  background-color: #9c27b0;
}

.v-avatar {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

/* Style pour la ligne d'événement sélectionné */
.next-event-highlight td {
  font-weight: 500;
}

/* Transition pour le surlignage des événements */
.list-event-item {
  transition: background-color 0.2s ease;
}

.event-border-vie {
  border-left: 3px solid #4caf50;
}
.event-border-conference {
  border-left: 3px solid #2196f3;
}
.event-border-interne {
  border-left: 3px solid #ff9800;
}
.event-border-pedagogique {
  border-left: 3px solid #9c27b0;
}
</style>
