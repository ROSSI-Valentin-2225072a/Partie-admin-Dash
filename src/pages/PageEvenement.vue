<template>
  <div class="page-evenement">
    <EventsSidebar
      :activeFilters="activeFilters"
      :tags="tags"
      :periodFilter="periodFilter"
      :periodOptions="periodOptions"
      :currentMonth="currentMonth"
      :currentYear="currentYear"
      :calendarDays="calendarDays()"
      :weekdays="weekdays"
      :events="events"
      @toggleFilter="toggleFilter"
      @changePeriod="changingPeriod"
      @prev-month="prevMonth"
      @nextMonth="nextMonth"
      @selectDay="selectDay"
      @show-add-form="showAddForm = true"
    />

    <div class="events-main">
      <EventForm
        v-if="showAddForm"
        :eventTypes="tags"
        @close="showAddForm = false"
        @add-event="addEvent"
      />

      <EventsDisplay
        v-else
        :events="events"
        :eventTypes="tags"
        :searchQuery="searchQuery"
        :viewMode="viewMode"
        :activeFilters="activeFilters"
        :periodFilter="periodFilter"
        :tags="tags"
        @update:searchQuery="searchQuery = $event"
        @update:viewMode="viewMode = $event"
        @selectEvent="selectEvent"
        @viewEvent="viewEvent"
        @editEvent="editEvent"
        @deleteEvent="deleteEvent"
        @saveEvent="saveEvent"
      />
    </div>
  </div>
</template>

<script setup>
import EventsSidebar from '@/components/events/EventsSidebar.vue'
import EventForm from '@/components/events/EventForm.vue'
import EventsDisplay from '@/components/events/EventsDisplay'
import {onMounted, ref} from "vue"

const url = "https://dashboardisis.alwaysdata.net/api/v1/dashboard/event"
const showAddForm = ref(false)
const events = ref([])
const searchQuery = ref('')
const viewMode = ref('grid')
const activeFilters = ref([])
const periodFilter = ref('all')
const selectedEvent = ref(null)
const periodOptions = [
    { label: 'Tous', value: 'all' },
    { label: 'Auj.', value: 'today' },
    { label: 'Semaine', value: 'week' },
    { label: 'Mois', value: 'month' }
  ]
const tags = ref([])
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const weekdays = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

const loadEvents = async() => {
  const fetchOptions = { method : 'GET' }

  const reponse = await fetch(url, fetchOptions)

  events.value = await reponse.json()

  events.value.sort((a, b) => new Date(a.dateEvent) - new Date(b.dateEvent));

  const typeList = events.value.map(
    (item) => item.type
  );

  typeList.forEach(event => {
    const tag = event.libelle.split(" ")[0]
      .toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const tagExists = tags.value.some(existingTag => existingTag.tag === tag);

    if (!tagExists) {
      tags.value.push({
        libelle: event.libelle,
        tag: tag
      });
    }
  })
}

function calendarDays() {
  const days = [];

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);

  const firstDayOfWeek = firstDay.getDay();
  const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
  for (let i = 0; i < startOffset; i++) {
    days.push("");
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    days.push(i);
  }

  return days;
}

function toggleFilter(filter) {
  if (activeFilters.value.includes(filter)) {
    activeFilters.value = activeFilters.value.filter(f => f !== filter)
  } else {
    activeFilters.value.push(filter)
  }
}

function prevMonth() {
  if (currentMonth.value === 0) {
    currentMonth.value = 11
    currentYear.value--
  } else {
    currentMonth.value--
  }
}

function nextMonth() {
  if (currentMonth.value === 11) {
    currentMonth.value = 0
    currentYear.value++
  } else {
    currentMonth.value++
  }
}

function selectDay(day) {
  const formattedDate = `${currentYear.value}-${String(
    currentMonth.value + 1
  ).padStart(2, "0")}-${String(day).padStart(2, "0")}`;

  const eventsOnDay = events.value.filter(
    (event) => event.dateEvent === formattedDate
  );
  if (eventsOnDay.length === 1) {
    viewEvent(eventsOnDay[0]);
  } else if (eventsOnDay.length > 1) {
    periodFilter.value = "all";
    searchQuery.value = formattedDate;
  } else {
    showAddForm.value = true;
    /*
    formData.value.date = formattedDate;
    isEditing.value = false;
     */
  }
}

function addEvent(event) {
  const fetchOptions = {
    method: "POST",
    headers: {
          "Content-Type": "application/json",
        },
    body: JSON.stringify(event)
  }

  fetch(url, fetchOptions)
  location.reload()
}

function selectEvent(event) {
  
}

function viewEvent(event) {
  selectedEvent.value = event
}

function editEvent(event) {
  console.log(event)
}

function saveEvent(event) {
  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(event)
  }
  console.log(event.id)
  try {
    fetch(url + `/id=${event.id}`, fetchOptions)
    location.reload()
  } catch (error) {
    console.error("An error occured while saving : ", error)
  }
}

function deleteEvent(eventId) {
  const fetchOptions = {
    method : 'DELETE'
  }

  const confirmation = window.confirm(
    "Êtes-vous sûr de vouloir supprimer cet évènement ?"
  );
  if (confirmation) {
    try {
      fetch(url + `/id=${eventId}`, fetchOptions)

      loadEvents()
      location.reload()
    } catch(error) {
      console.error("An error occured while deleting : ", error)
    }
  }
}

function changingPeriod(period) {
  periodFilter.value = period
}

onMounted(async () => {
  await loadEvents();
});
</script>

<style scoped>
.page-evenement {
  min-height: 100vh;
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  gap: 25px;
  height: calc(100vh - 40px);
  max-width: 1400px;
}

/* Main content */
.events-main {
  flex: 1;
  overflow-y: auto;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
}

.events-main {
  flex: 1;
  background-color: #f9f9fb;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  height: 100%;
}

.events-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}



.search-box input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  width: 200px;
  transition: all 0.2s;
}

.search-box input:focus {
  border-color: #673ab7;
  outline: none;
  box-shadow: 0 0 0 2px rgba(103, 58, 183, 0.1);
}

.event-date-badge {
  background-color: #f5f5f5;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  text-align: center;
}

.event-content {
  padding: 15px;
  flex: 1;
}

.event-type-badge {
  font-size: 11px;
  padding: 4px 8px;
  border-radius: 20px;
  font-weight: 500;
  color: white;
}

.event-type-vie {
  background-color: #2196f3;
}

.event-type-conference {
  background-color: #ff9800;
}

.event-type-interne {
  background-color: #4caf50;
}

.event-type-pedagogique {
  background-color: #e91e63;
}

.event-time {
  font-size: 12px;
  color: #777;
}

.event-title {
  margin: 8px 0;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
}

.event-location {
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #555;
  margin-bottom: 10px;
}

.location-icon {
  font-size: 13px;
  margin-right: 5px;
}

.event-actions {
  display: flex;
  justify-content: flex-end;
  gap: 5px;
  margin-top: auto;
}

.action-btn {
  background: none;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn:hover {
  background-color: #f5f5f5;
}

.view-btn:hover {
  color: #673ab7;
}

.edit-btn:hover {
  color: #2196f3;
}

.delete-btn:hover {
  color: #f44336;
}

.action-icon {
  font-size: 16px;
}

/* Vue Liste */
.events-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.list-event-item {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 12px 15px;
  display: grid;
  grid-template-columns: 100px 80px 120px 1fr 120px 100px;
  align-items: center;
  gap: 10px;
  transition: all 0.2s;
}

.list-event-item:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateX(5px);
}

.list-event-date {
  font-weight: 500;
  font-size: 14px;
}

.list-event-time {
  font-size: 13px;
  color: #666;
}

.event-type-badge.small {
  font-size: 10px;
  padding: 3px 6px;
}

</style>
