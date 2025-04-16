<script setup>
import EventsHeader from './EventsHeader.vue'
import EventsGrid from './EventsGrid.vue'
import EventsList from './EventsList.vue'
import EventViewer from './EventViewer.vue'
import EventEditor from './EventEditor.vue'
import {computed, defineEmits, defineProps, ref} from "vue"

const props = defineProps([
  "events",
  "activeFilters",
  "periodFilter",
  "eventTypes",
  "tags"
])

const emit = defineEmits(['selectEvent', 'viewEvent', 'editEvent', 'deleteEvent', 'saveEvent'])

const searchQuery = ref('')
const viewMode = ref('grid')

const selectedEvent = ref(null)
const isViewerVisible = ref(false)

const editingEvent = ref(null)
const isEditorVisible = ref(false)

function handleViewEvent(event) {
  selectedEvent.value = event
  isViewerVisible.value = true
  emit('viewEvent', event)
}

function closeEventViewer() {
  isViewerVisible.value = false
  setTimeout(() => {
    selectedEvent.value = null
  }, 300)
}

function handleEditEvent(event) {
  if (isViewerVisible.value) {
    closeEventViewer()
  }

  editingEvent.value = event
  isEditorVisible.value = true
  emit('editEvent', event)
}

function closeEventEditor() {
  isEditorVisible.value = false
  setTimeout(() => {
    editingEvent.value = null
  }, 300)
}

function saveEvent(event) {
  closeEventEditor()
  emit('saveEvent', event)
}

function handleDeleteEvent(event) {
  closeEventViewer()
  emit('deleteEvent', event)
}

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
      @viewEvent="handleViewEvent"
      @editEvent="handleEditEvent"
      @deleteEvent="$emit('deleteEvent', $event)"
    />

    <EventsList
      v-else
      :events="filteredEvents"
      :eventTypes="eventTypes"
      :tags="tags"
      @selectEvent="$emit('selectEvent', $event)"
      @viewEvent="handleViewEvent"
      @editEvent="handleEditEvent"
      @deleteEvent="$emit('deleteEvent', $event)"
    />

    <EventViewer
      v-if="selectedEvent"
      :event="selectedEvent"
      :visible="isViewerVisible"
      @close="closeEventViewer"
      @editEvent="handleEditEvent"
      @deleteEvent="handleDeleteEvent"
    />

    <EventEditor
      :event="editingEvent"
      :visible="isEditorVisible"
      :eventTypes="eventTypes"
      :tags="tags"
      @close="closeEventEditor"
      @save="saveEvent"
    />
  </div>
</template>

<style scoped>
.events-display {
  padding: 15px;
  position: relative;
}
</style>
