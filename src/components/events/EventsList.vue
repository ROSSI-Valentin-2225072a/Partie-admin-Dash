<template>
<v-table class="events-list">
    <thead>
    <tr>
        <th>Date</th>
        <th>Heure</th>
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
        :class="`event-border-${event.type}`"
    >
        <td>{{ formatDateShort(event.date) }}</td>
        <td>{{ formatTime(event.time) }}</td>
        <td>
        <v-chip
            :color="getEventTypeColor(event.type)"
            size="x-small"
            class="event-type-badge small"
        >
            {{ getEventTypeName(event.type) }}
        </v-chip>
        </td>
        <td>{{ event.title }}</td>
        <td>{{ event.location || "–" }}</td>
        <td>
        <v-btn icon density="compact" @click="$emit('view-event', event)">
            <v-icon>mdi-eye</v-icon>
        </v-btn>
        <v-btn icon density="compact" @click="$emit('edit-event', event)">
            <v-icon>mdi-pencil</v-icon>
        </v-btn>
        <v-btn icon density="compact" @click="$emit('delete-event', event.id)">
            <v-icon>mdi-delete</v-icon>
        </v-btn>
        </td>
    </tr>
    </tbody>
    Z</v-table>
</template>

<script setup>
const props = defineProps(["events"])

function formatDateShort(date) {
    const d = new Date(date)
    return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
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