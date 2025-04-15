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
        @click="$emit('toggleFilter', type.libelle)"
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
        @change="$emit('changePeriod', $event)"
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
    @prevMonth="$emit('prevMonth')"
    @nextMonth="$emit('nextMonth')"
    @selectDay="$emit('selectDay', $event)"
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

<style scoped>

.events-sidebar {
  width: 300px;
  flex-shrink: 0;
  overflow-y: auto;
  height: 100%;
  padding-right: 5px;
}

.add-event-btn {
  background-color: #673ab7;
  color: white;
  border: none;
  padding: 12px 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 20px;
  box-shadow: 0 4px 10px rgba(103, 58, 183, 0.25);
  transition: all 0.2s ease;
}

.add-event-btn:hover {
  background-color: #7e57c2;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(103, 58, 183, 0.3);
}

.filters-card,


.filters-card h3 {
  color: #673ab7;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 600;
}

.filter-card label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
  font-size: 14px;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-chip {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  border-radius: 6px;
  background-color: #f5f5f5;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.filter-chip:hover {
  background-color: #ede7f6;
}

.filter-chip.active {
  background-color: #ede7f6;
  border-color: #673ab7;
  font-weight: 500;
}

.filter-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
}

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

.period-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.period-btn {
  flex: 1;
  min-width: 80px;
  text-align: center;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  background-color: #f5f5f5;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.period-btn:hover {
  background-color: #ede7f6;
}

.period-btn.active {
  background-color: #ede7f6;
  border-color: #673ab7;
  font-weight: 500;
  color: #673ab7;
}


</style>
