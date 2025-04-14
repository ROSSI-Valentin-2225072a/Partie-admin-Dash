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
  return `${monthNames[props.currentMonth]} ${props.currentYear}`
}

function isWeekend(dayIndex) {
  return dayIndex === 5 || dayIndex === 6
}

function hasEventOnDay(day) {
  if (!day) return false;
  const formattedDate = `${this.currentYear}-${String(
    this.currentMonth + 1
  ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return this.events.some((event) => event.date === formattedDate);
}

function isCurrentDay(day) {
  const today = new Date()
  return day === today.getDate() && 
          this.currentMonth === today.getMonth() && 
          this.currentYear === today.getFullYear()
}

function getEventIndicators(day) {
  if (!day) return [];
  const formattedDate = `${this.currentYear}-${String(
    this.currentMonth + 1
  ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return [
    ...new Set(
      this.events
        .filter((event) => event.date === formattedDate)
        .map((event) => event.type)
    ),
  ];
}
</script>

<style scoped>

.calendar-preview {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #673ab7;
  color: white;
  padding: 10px;
  border-radius: 8px 8px 0 0;
  font-weight: 500;
}

.calendar-nav-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0 5px;
  font-size: 14px;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 0 0 8px 8px;
}

.weekday {
  text-align: center;
  padding: 8px 0;
  font-size: 12px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #eee;
  font-weight: 500;
}

.day {
  text-align: center;
  padding: 8px 0;
  font-size: 13px;
  position: relative;
  cursor: pointer;
}

.day:hover:not(.empty) {
  background-color: #f0f0f0;
}

.day.empty {
  background-color: #f9f9f9;
  cursor: default;
}

.day.weekend {
  color: #aaa;
}

.day.current {
  background-color: #e8eaf6;
  font-weight: 700;
  color: #3f51b5;
}

.day.has-event {
  font-weight: 600;
}

.event-indicators {
  position: absolute;
  bottom: 2px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 2px;
}

.event-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

</style>