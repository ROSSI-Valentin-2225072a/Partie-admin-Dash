<template>
  <div class="events-display">
    <EventsHeader
      :searchQuery="searchQuery"
      :viewMode="viewMode"
      @update:search-query="$emit('update:search-query', $event)"
      @update:view-mode="$emit('update:view-mode', $event)"
    />
    
    <EventsGrid
      v-if="viewMode === 'grid'"
      :events="filteredEvents"
      @view-event="$emit('view-event', $event)"
      @edit-event="$emit('edit-event', $event)"
      @delete-event="$emit('delete-event', $event)"
    />
    
    <EventsList
      v-else
      :events="filteredEvents"
      @view-event="$emit('view-event', $event)"
      @edit-event="$emit('edit-event', $event)"
      @delete-event="$emit('delete-event', $event)"
    />
  </div>
</template>

<script>
import EventsHeader from './EventsHeader.vue'
import EventsGrid from './EventsGrid.vue'
import EventsList from './EventsList.vue'

const props = defineProps([
  "events",
  "searchQuery",
  "viewMode",
  "activeFilters",
  "periodFilter"
])

function filteredEvents() {
  return this.events.filter(event => {

    const matchesSearch = this.searchQuery === '' || 
      event.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      (event.location && event.location.toLowerCase().includes(this.searchQuery.toLowerCase()))

    const matchesType = this.activeFilters.length === 0 || 
      this.activeFilters.includes(this.getEventTypeName(event.type))

    const matchesPeriod = this.filterByPeriod(event)

    return matchesSearch && matchesType && matchesPeriod
  })
}

function getEventTypeName(typeValue) {
  const eventTypes = {
    meeting: 'Réunion',
    training: 'Formation',
    conference: 'Conférence',
    other: 'Autre'
  }
  return eventTypes[typeValue] || 'Autre'
}

function filterByPeriod(event) {
  if (this.periodFilter === 'all') return true

  const today = new Date()
  const eventDate = new Date(event.date)
  
  if (this.periodFilter === 'today') {
    return eventDate.toDateString() === today.toDateString()
  }
  
  if (this.periodFilter === 'week') {
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay() + 1)
    startOfWeek.setHours(0, 0, 0, 0)
    
    const endOfWeek = new Date(startOfWeek)
    endOfWeek.setDate(startOfWeek.getDate() + 6)
    endOfWeek.setHours(23, 59, 59, 999)
    
    return eventDate >= startOfWeek && eventDate <= endOfWeek
  }
  
  if (this.periodFilter === 'month') {
    return eventDate.getMonth() === today.getMonth() && 
            eventDate.getFullYear() === today.getFullYear()
  }
  
  return true
}

</script>