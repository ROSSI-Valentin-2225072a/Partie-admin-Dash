<script setup>
import EventCard from './EventCard.vue'
import { defineProps, defineEmits, computed, onMounted, watch } from "vue"
import { useEventStore } from '@/stores/eventStore'

const props = defineProps(["events", "eventTypes", "tags"])
const emit = defineEmits(['selectEvent', 'viewEvent', 'editEvent', 'deleteEvent'])

const eventStore = useEventStore();

// Récupérer l'événement sélectionné comme prochain du store
const selectedNextEvent = computed(() => eventStore.nextEvent)

// Vérifier si un événement est sélectionné comme prochain
function isSelectedAsNext(event) {
  return selectedNextEvent.value && selectedNextEvent.value.id === event.id
}

// Définir un événement comme l'événement du mois
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

// Effacer l'événement du mois
function clearNextEvent() {
  eventStore.setNextEvent(null)
}

// Formatage de date
function formatDateShort(date) {
  const d = new Date(date)
  return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
}

// Récupérer la couleur du type d'événement
function getEventTypeColor(libelle) {
  return props.tags.find(type => type.libelle === libelle)?.tag || 'default'
}

// Rechercher et définir automatiquement l'événement du mois au montage
onMounted(() => {
  // Si aucun événement n'est déjà défini, on en cherche un
  if (!selectedNextEvent.value) {
    const currentMonthEvents = findCurrentMonthEvents();
    if (currentMonthEvents.length > 0) {
      // Sélectionner le premier événement du mois
      eventStore.setNextEvent(currentMonthEvents[0]);
    }
  }
});

// Trouver tous les événements du mois en cours
function findCurrentMonthEvents() {
  if (!props.events || props.events.length === 0) return [];

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  // Filtrer les événements du mois actuel
  const monthEvents = props.events.filter(event => {
    const eventDate = new Date(event.dateEvent);
    return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
  });

  // Trier par date
  return monthEvents.sort((a, b) => new Date(a.dateEvent) - new Date(b.dateEvent));
}
</script>

<template>
  <div>
    <!-- Section événement du mois -->
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

    <!-- Grille d'événements -->
    <v-row class="events-grid">
      <v-col
        v-for="event in events"
        :key="event.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
      >
        <EventCard
          :event="event"
          :eventTypes="eventTypes"
          :tags="tags"
          :isNextEvent="isSelectedAsNext(event)"
          @select="$emit('selectEvent', event.id)"
          @view="$emit('viewEvent', event)"
          @edit="$emit('editEvent', event)"
          @delete="$emit('deleteEvent', event.id)"
          @set-next="setAsNextEvent(event)"
        />
      </v-col>
    </v-row>
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
