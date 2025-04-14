<template>
<div class="events-sidebar">
    <v-btn
    color="primary"
    class="add-event-btn"
    prepend-icon="mdi-plus"
    @click="$emit('show-add-form')"
    >
    Ajouter un événement
    </v-btn>

    <v-card class="filters-card">
    <v-card-title>Filtres</v-card-title>
    
    <v-card-subtitle>Type d'événement</v-card-subtitle>
    <div class="filter-options">
        <v-chip
        v-for="type in tags"
        :key="type.libelle"
        :class="{ active: activeFilters.includes(type.libelle) }"
        @click="$emit('toggle-filter', type.libelle)"
        >
        <v-avatar start :class="`dot-${type.tag}`"></v-avatar>
        {{ type.libelle }}
        </v-chip>
    </div>

    <v-card-subtitle>Période</v-card-subtitle>
    <v-btn-toggle
        :value="periodFilter"
        mandatory
        class="period-buttons"
        @change="$emit('change-period', $event)"
    >
        <v-btn
        v-for="period in periodOptions"
        :key="period.value"
        :value="period.value"
        >
        {{ period.label }}
        </v-btn>
    </v-btn-toggle>
    </v-card>

    <CalendarPreview
    :currentMonth="currentMonth"
    :currentYear="currentYear"
    :calendarDays="calendarDays"
    :weekdays="weekdays"
    @prev-month="$emit('prev-month')"
    @next-month="$emit('next-month')"
    @select-day="$emit('select-day', $event)"
    />
</div>
</template>

<script setup>
import CalendarPreview from './CalendarPreview.vue'
import { defineProps } from "vue"

const props = defineProps([
    "activeFilters",
    "tags",
    "periodFilter",
    "periodOptions",
    "currentMonth",
    "currentYear",
    "calendarDays",
    "weekdays" 
]);

</script>