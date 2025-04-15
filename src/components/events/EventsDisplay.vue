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
      @viewEvent="$emit('viewEvent', $event)"
      @editEvent="$emit('editEvent', $event)"
      @deleteEvent="$emit('deleteEvent', $event)"
    />

    <EventsList
      v-else
      :events="filteredEvents"
      :eventTypes="eventTypes"
      @viewEvent="$emit('viewEvent', $event)"
      @editEvent="$emit('editEvent', $event)"
      @deleteEvent="$emit('deleteEvent', $event)"
    />
  </div>
</template>

<script setup>
import EventsHeader from './EventsHeader.vue'
import EventsGrid from './EventsGrid.vue'
import EventsList from './EventsList.vue'
import { ref, computed, defineProps, defineEmits } from "vue"

const props = defineProps([
  "events",
  "activeFilters",
  "periodFilter",
  "eventTypes"
])

const emit = defineEmits(['viewEvent', 'editEvent', 'deleteEvent'])

const searchQuery = ref('')
const viewMode = ref('grid')


const filteredEvents = computed(() => {

  if (!searchQuery.value.trim() && props.activeFilters.length === 0) return props.events;

  const termeLowerCase = searchQuery.value.toLowerCase().trim();

  const filteredBySearch =  props.events.filter((event) =>
    event.nomEvent.toLowerCase().includes(termeLowerCase)
  )

  console.log("filtered events", filteredBySearch)
  /*
  props.events.filter((event) =>
    filterByPeriod(event)
  )
   */
  let filteredByTag = filteredBySearch
  if (props.activeFilters.length !== 0) {
    filteredByTag = filteredBySearch.filter((event) =>
      props.activeFilters.includes(event.type.libelle)
    )
  }
  return filteredByTag
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

</script>

<style scoped>

.events-display {
  padding: 15px;
}

</style>
