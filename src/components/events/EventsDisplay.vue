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
      :tags="tags"
      @selectEvent="$emit('selectEvent', $event)"
      @viewEvent="$emit('viewEvent', $event)"
      @editEvent="$emit('editEvent', $event)"
      @deleteEvent="$emit('deleteEvent', $event)"
    />

    <EventsList
      v-else
      :events="filteredEvents"
      :eventTypes="eventTypes"
      :tags="tags"
      @selectEvent="$emit('selectEvent', $event)"
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
import {computed, defineEmits, defineProps, ref} from "vue"

const props = defineProps([
  "events",
  "activeFilters",
  "periodFilter",
  "eventTypes",
  "tags"
])

const emit = defineEmits(['viewEvent', 'editEvent', 'deleteEvent'])

const searchQuery = ref('')
const viewMode = ref('grid')


const filteredEvents = computed(() => {

  if (!searchQuery.value.trim() && props.activeFilters.length === 0 && props.periodFilter === "all") return props.events;

  const termeLowerCase = searchQuery.value.toLowerCase().trim();

  const filteredByPeriod = props.events.filter((event) =>
    filterByPeriod(event)
  )

  const filteredBySearch =  filteredByPeriod.filter((event) =>
    event.nomEvent.toLowerCase().includes(termeLowerCase)
  )

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
  const eventDate = new Date(event.dateEvent)
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
