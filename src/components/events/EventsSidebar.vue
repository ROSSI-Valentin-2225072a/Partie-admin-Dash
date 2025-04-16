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
        @update:modelValue="$emit('changePeriod', $event)"
    >
        <v-btn
        v-for="period in periodOptions"
        :key="period.value"
        :value="period.value"
        class="period-btn">
        {{ period.label }}
        </v-btn>
    </v-btn-toggle>
    </v-card>

    <CalendarPreview
    :currentMonth="currentMonth"
    :currentYear="currentYear"
    :calendarDays="calendarDays"
    :weekdays="weekdays"
    :events="events"
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
  "weekdays",
  "events"
]);
</script>

<style scoped>

.events-sidebar {
  width: 300px;
  height: 100%;
  overflow-y: auto;
  padding: 20px 10px 20px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Style pour le bouton d'ajout d'événement */
.add-event-btn {
  background-color: #673ab7 ;
  color: #fff ;
  font-weight: 600;
  border-radius: 8px;
  padding: 12px 16px;
  width: 100%;
  box-shadow: 0 4px 10px rgba(103, 58, 183, 0.25);
  transition: background-color 0.2s, transform 0.2s, box-shadow 0.2s;
}

.add-event-btn:hover {
  background-color: #7e57c2 ;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(103, 58, 183, 0.3);
}

/* Style pour la carte de filtres */
.filters-card {
  flex-shrink: 0;
  background-color: #fafafa;
  padding: 16px;
  border-radius: 10px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
}

.v-card-title {
  font-size: 18px;
  font-weight: 700;
  color: #673ab7;
  margin-bottom: 10px;
}

.v-card-subtitle {
  font-size: 14px;
  font-weight: 600;
  color: #555;
  margin-top: 12px;
  margin-bottom: 8px;
}

/* Style pour les options de filtre */
.filter-options {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.v-chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  font-size: 13px;
  font-weight: 500;
  border-radius: 6px;
  background-color: #f5f5f5;
  cursor: pointer;
  transition: all 0.2s ease;
}

.v-chip:hover {
  background-color: #ede7f6;
}

.v-chip.active {
  background-color: #ede7f6;
  border: 1px solid #673ab7;
  color: #673ab7;
}

.v-avatar {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 4px;
}

/* Couleurs pour les points des événements */
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
  display: grid ;
  grid-template-columns: 1fr 1fr ;
  gap: 8px ;
  margin-bottom: 12px ;
  border: none ;
  background: transparent ;
  flex-wrap: wrap ;
}

.period-buttons .v-btn {
  height: 32px ;
  min-width: 0 ;
  padding: 0 8px ;
  font-size: 12px ;
  border-radius: 6px ;
  background-color: #f5f5f5 ;
  color: #333 ;
  text-transform: none ;
  box-shadow: none ;
  font-weight: normal ;
  margin: 0 ;
}

.period-buttons .v-btn:hover {
  background-color: #ede7f6 ;
}

.period-buttons .v-btn--active {
  background-color: #ede7f6 ;
  border: 1px solid #673ab7 ;
  font-weight: 600 ;
  color: #673ab7 ;
}

/* Styles pour les petits écrans */
@media (max-width: 320px) {
  .events-sidebar {
    width: 100%;
    padding: 15px 8px;
  }

  .period-buttons {
    grid-template-columns: 1fr ;
  }
}
</style>
