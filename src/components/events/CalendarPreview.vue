<template>
  <div class="calendar-preview">
    <div class="calendar-header">
      <v-btn icon @click="$emit('prev-month')">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <span>{{ getCurrentMonthYear() }}</span>
      <v-btn icon @click="$emit('next-month')">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </div>
    
    <div class="calendar-grid">
      <div class="weekday" v-for="day in weekdays" :key="day">
        {{ day }}
      </div>
      <div
        v-for="(day, index) in calendarDays"
        :key="index"
        :class="[
          'day',
          {
            empty: !day,
            weekend: day && isWeekend(index % 7),
            'has-event': day && hasEventOnDay(day),
            current: day && isCurrentDay(day),
          },
        ]"
        @click="day && $emit('select-day', day)"
      >
        {{ day }}
        <div
          v-if="day && getEventIndicators(day).length > 0"
          class="event-indicators"
        >
          <span
            v-for="(type, i) in getEventIndicators(day)"
            :key="i"
            class="event-dot"
            :class="`dot-${type}`"
          ></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps([
  "currentMonth",
  "currentYear",
  "calendarDays",
  "weekdays"
])

function getCurrentMonthYear() {
  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ]
  return `${monthNames[this.currentMonth]} ${this.currentYear}`
}

function isWeekend(dayIndex) {
  return dayIndex === 5 || dayIndex === 6
}

function hasEventOnDay(day) {
  // Implement event checking logic
  return false
}

function isCurrentDay(day) {
  const today = new Date()
  return day === today.getDate() && 
          this.currentMonth === today.getMonth() && 
          this.currentYear === today.getFullYear()
}

function getEventIndicators(day) {
  // Return array of event types for the day
  return []
}
</script>