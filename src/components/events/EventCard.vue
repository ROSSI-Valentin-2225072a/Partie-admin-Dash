<template>
    <v-card
      class="event-card"
      :class="`event-border-${event.type.libelle}`"
    >
      <div class="event-date-badge">
        <div class="event-day">{{ getDayNumber(event.dateEvent) }}</div>
        <div class="event-month">{{ getMonthShort(event.dateEvent) }}</div>
      </div>

      <v-card-text class="event-content">
        <div class="event-header">
          <v-chip
            :color="getEventTypeColor(event.type.libelle)"
            size="small"
            class="event-type-badge"
          >
            {{ event.type.libelle }}
          </v-chip>
        </div>

        <h3 class="event-title">{{ event.nomEvent }}</h3>

        <div class="event-location">
          <v-icon size="small">mdi-map-marker</v-icon>
          {{ event.lieu || "Non spécifié" }}
        </div>
      </v-card-text>

      <v-card-actions class="event-actions">
        <v-btn icon @click="$emit('select', event)" class="action-btn">
          <v-icon>mdi-check</v-icon>
        </v-btn>
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

<script setup>
import { defineProps } from "vue"

const props = defineProps(["event", "eventTypes"])


function getDayNumber(date) {
    return new Date(date).getDate()
}

function getMonthShort(date) {
    const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
    return monthNames[new Date(date).getMonth()]
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

<style scoped>

.event-card {
  display: flex;
  flex-direction: column;
  position: relative;
  padding-left: 60px;
  margin: 1rem 0;
  border-left: 5px solid transparent;
  transition: box-shadow 0.2s ease, transform 0.2s ease;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  background-color: white;
  justify-content: space-between;
  min-height: 250px;
}

.event-card:hover {
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.event-date-badge {
  position: absolute;
  left: 16px;
  top: 16px;
  width: 40px;
  height: 40px;
  background-color: #f3f4f6;
  border-radius: 8px;
  text-align: center;
  font-weight: bold;
  line-height: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.85rem;
}

.event-day {
  font-size: 1.1rem;
}

.event-month {
  font-size: 0.75rem;
  color: #555;
}

.event-content {
  padding-left: 0;
}

.event-header {
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.event-type-badge {
  text-transform: capitalize;
  font-weight: 500;
}

.event-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
  color: #1f2937;
}

.event-location {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #6b7280;
  font-size: 0.95rem;
}

.event-actions {
  display: flex;
  justify-content: flex-end;
  padding: 0.5rem 1rem;
  gap: 8px;
}

.action-btn {
  color: #4b5563;
  transition: color 0.2s;
}

.action-btn:hover {
  color: #1f2937;
}

</style>
