<template>
    <v-card
      class="event-card"
      :class="`event-border-${event.type}`"
    >
      <div class="event-date-badge">
        <div class="event-day">{{ getDayNumber(event.date) }}</div>
        <div class="event-month">{{ getMonthShort(event.date) }}</div>
      </div>
  
      <v-card-text class="event-content">
        <div class="event-header">
          <v-chip
            :color="getEventTypeColor(event.type)"
            size="small"
            class="event-type-badge"
          >
            {{ getEventTypeName(event.type) }}
          </v-chip>
          <div class="event-time">{{ formatTime(event.time) }}</div>
        </div>
  
        <h3 class="event-title">{{ event.title }}</h3>
  
        <div class="event-location">
          <v-icon size="small">mdi-map-marker</v-icon>
          {{ event.location || "Non spécifié" }}
        </div>
      </v-card-text>
  
      <v-card-actions class="event-actions">
        <v-btn icon @click="$emit('view', event)" class="action-btn">
          <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-btn icon @click="$emit('edit', event)" class="action-btn">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon @click="$emit('delete', event.id)" class="action-btn">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
<script>

const props = defineProps(["event"])


function getDayNumber(date) {
    return new Date(date).getDate()
}

function getMonthShort(date) {
    const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
    return monthNames[new Date(date).getMonth()]
}

function formatTime(time) {
    return time || '00:00'
}

function getEventTypeName(type) {
    const types = {
        meeting: 'Réunion',
        training: 'Formation',
        conference: 'Conférence',
        other: 'Autre'
    }
    return types[type] || 'Autre'
}

function getEventTypeColor(type) {
    const colors = {
        meeting: 'blue',
        training: 'green',
        conference: 'purple',
        other: 'grey'
    }
    return colors[type] || 'grey'
}

  </script>