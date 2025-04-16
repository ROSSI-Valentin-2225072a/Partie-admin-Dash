<template>
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
        :class="`event-border-${event.type.libelle}`"
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
        <v-btn icon density="compact" @click="$emit('selectEvent', event.id)">
            <v-icon>mdi-check</v-icon>
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
</template>

<script setup>
import { defineProps } from "vue"

const props = defineProps(["events", "eventTypes", "tags"])

function formatDateShort(date) {
    const d = new Date(date)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
}

function getEventTypeColor(libelle) {
  return props.tags.find(type => type.libelle === libelle)?.tag || 'default'
}

</script>

<style scoped>

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

</style>
