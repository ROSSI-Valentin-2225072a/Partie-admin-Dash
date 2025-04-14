<template>
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
          @view="$emit('view-event', event)"
          @edit="$emit('edit-event', event)"
          @delete="$emit('delete-event', event.id)"
        />
      </v-col>
    </v-row>
  </template>
  
  <script setup>
  import EventCard from './EventCard.vue'
  import { defineProps } from "vue"

  const props = defineProps(["events"])

  </script>