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
      @changePeriod="periodFilter = $event"
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
        @update:searchQuery="searchQuery = $event"
        @update:viewMode="viewMode = $event"
        @viewEvent="viewEvent"
        @editEvent="editEvent"
        @deleteEvent="deleteEvent"
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
    { label: 'Aujourd\'hui', value: 'today' },
    { label: 'Cette semaine', value: 'week' },
    { label: 'Ce mois', value: 'month' }
  ]
const tags = ref([])
const currentMonth = ref(new Date().getMonth())
const currentYear = ref(new Date().getFullYear())
const weekdays = ['L', 'M', 'M', 'J', 'V', 'S', 'D']

const loadEvents = async() => {
  const fetchOptions = { method : 'GET' }

  const reponse = await fetch(url, fetchOptions)

  events.value = await reponse.json()

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

function viewEvent(event) {
  selectedEvent.value = event
}

function editEvent(event) {
  console.log(event)
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

.events-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
}

.events-header h2 {
  margin: 0;
  color: #333;
  font-size: 20px;
}

/* Colonne principale */
.events-main {
  flex: 1;
  background-color: #f9f9fb;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  overflow-y: auto;
  height: 100%;
}

/* Formulaire d'ajout/modification */


/* Affichage des événements */


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

/* Vue Grille */


.event-border-vie {
  border-left: 4px solid #2196f3;
}

.event-border-conference {
  border-left: 4px solid #ff9800;
}

.event-border-interne {
  border-left: 4px solid #4caf50;
}

.event-border-pedagogique {
  border-left: 4px solid #e91e63;
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

.event-day {
  font-size: 22px;
  font-weight: 700;
  line-height: 1;
}

.event-month {
  font-size: 13px;
  text-transform: uppercase;
  margin-top: 4px;
}

.event-content {
  padding: 15px;
  flex: 1;
}

.event-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
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

.list-event-title {
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-event-location {
  font-size: 13px;
  color: #666;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.list-event-actions {
  display: flex;
  gap: 5px;
  justify-content: flex-end;
}

.action-btn-small {
  background: none;
  border: none;
  width: 28px;
  height: 28px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.action-btn-small:hover {
  background-color: #f5f5f5;
}

/* Détail d'un événement */
.event-detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.event-detail-card {
  background-color: white;
  border-radius: 12px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

.detail-header {
  padding: 20px;
  color: white;
  position: relative;
}

.detail-header h2 {
  margin: 0;
  font-size: 20px;
  padding-right: 30px;
}

.event-header-vie {
  background-color: #2196f3;
}

.event-header-conference {
  background-color: #ff9800;
}

.event-header-interne {
  background-color: #4caf50;
}

.event-header-pedagogique {
  background-color: #e91e63;
}

.detail-content {
  padding: 20px;
}

.detail-meta {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
}

.detail-date-time,
.detail-location,
.detail-type {
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  font-size: 14px;
}

.detail-meta div:last-child {
  margin-bottom: 0;
}

.detail-icon {
  margin-right: 10px;
  width: 20px;
  text-align: center;
}

.detail-description h3 {
  font-size: 16px;
  margin-top: 0;
  margin-bottom: 10px;
  color: #555;
}

.detail-description p {
  font-size: 14px;
  line-height: 1.6;
  color: #666;
}

.detail-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn-edit {
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}

.btn-delete {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}

.btn-close {
  background-color: #757575;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
}

/* Animation du formulaire */
@keyframes formShow {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.form-card {
  animation: formShow 0.3s ease-out forwards;
}

/* Responsive */
@media screen and (max-width: 900px) {
  .events-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  .list-event-item {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto auto;
    gap: 8px 15px;
  }

  .list-event-date,
  .list-event-time {
    grid-row: 1;
  }

  .list-event-type {
    grid-row: 1;
    grid-column: 3;
  }

  .list-event-title {
    grid-row: 2;
    grid-column: 1 / span 2;
  }

  .list-event-location {
    grid-row: 2;
    grid-column: 3;
  }

  .list-event-actions {
    grid-row: 3;
    grid-column: 1 / span 3;
    justify-content: flex-end;
    margin-top: 8px;
  }
}

@media screen and (max-width: 768px) {
  .content-container {
    flex-direction: column;
    height: auto;
  }

  .events-sidebar {
    width: 100%;
    height: auto;
    padding-right: 0;
  }

  .events-main {
    height: auto;
  }

  .form-row {
    flex-direction: column;
    gap: 10px;
  }

  .form-group.half,
  .form-group.two-thirds,
  .form-group.one-third {
    width: 100%;
  }

  .events-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }

  .events-controls {
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
  }

  .search-box {
    width: 100%;
  }

  .search-box input {
    width: 100%;
  }
}
</style>
