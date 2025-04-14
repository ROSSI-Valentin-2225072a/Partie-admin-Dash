<template>
  <div class="events-display">
    <EventsHeader
      v-model:searchQuery="searchQuery"
      v-model:viewMode="viewMode"
    />
    
    <EventsGrid
      v-if="viewMode === 'grid'"
      :events="filteredEvents"
      :eventTypes="eventTypes"
      @view-event="$emit('view-event', $event)"
      @edit-event="$emit('edit-event', $event)"
      @delete-event="$emit('delete-event', $event)"
    />
    
    <EventsList
      v-else
      :events="filteredEvents"
      :eventTypes="eventTypes"
      @view-event="$emit('view-event', $event)"
      @edit-event="$emit('edit-event', $event)"
      @delete-event="$emit('delete-event', $event)"
    />
  </div>
</template>

<script setup>
import EventsHeader from './EventsHeader.vue'
import EventsGrid from './EventsGrid.vue'
import EventsList from './EventsList.vue'
import { ref, computed, defineProps, defineEmits, watch } from "vue"

const props = defineProps([
  "events",
  "activeFilters",
  "periodFilter",
  "eventTypes"
])

const emit = defineEmits(['view-event', 'edit-event', 'delete-event'])

const searchQuery = ref('')
const viewMode = ref('grid')


const filteredEvents = computed(() => {
  if (!searchQuery.value.trim()) return props.events;

  const termeLowerCase = searchQuery.value.toLowerCase().trim();

  console.log(termeLowerCase)
  return props.events.filter((event) =>
    event.nomEvent.toLowerCase().includes(termeLowerCase)
  );
})

function filterByPeriod(event) {
  if (props.periodFilter === 'all') return true
  const today = new Date()
  const eventDate = new Date(event.date)
  if (props.periodFilter === 'today') {
    return eventDate.toDateString() === today.toDateString()
  }
  if (props.periodFilter === 'week') {
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay() + 1)
    startOfWeek.setHours(0, 0, 0, 0)
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)
    return eventDate >= startOfWeek && eventDate <= endOfWeek
  }
  if (props.periodFilter === 'month') {
    return eventDate.getMonth() === today.getMonth() &&
           eventDate.getFullYear() === today.getFullYear()
  }
  return true
}

// Pour déboguer
watch(searchQuery, (newValue) => {
  console.log("La valeur de searchQuery a changé:", newValue)
})
</script>