<template>
  <div class="page-evenement">

    <v-btn class="add-event-btn">

    </v-btn>
    <v-card class="filters-card">

    </v-card>
    <v-card class="calendar-preview">

    </v-card>

    <div class="events-main">

      <div v-if="showAddForm" class="form-card">

      </div>

      <div v-else class="events-display">

      </div>
    </div>

  </div>
</template>

<script>
import { ref } from "vue";

const showAddForm = ref(false)

</script>

<style scoped>
.page-evenement {
  min-height: 100vh;
  width: 100%;
}

.content-container {
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  gap: 25px;
  height: calc(100vh - 40px);
  max-width: 1400px;
}

/* Sidebar */
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

.plus-icon {
  margin-right: 8px;
  font-size: 18px;
}

.filters-card,
.calendar-preview {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.filters-card h3 {
  color: #673ab7;
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 16px;
  font-weight: 600;
}

.filter-group {
  margin-bottom: 15px;
}

.filter-group label {
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

/* Calendar */
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
.form-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin: 15px;
  overflow: hidden;
}

.form-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #673ab7;
  color: white;
}

.form-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
}

.form-content {
  padding: 20px;
}

.form-group {
  margin-bottom: 18px;
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 18px;
}

.form-group.half {
  width: 50%;
}

.form-group.two-thirds {
  width: 66.66%;
}

.form-group.one-third {
  width: 33.33%;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
  font-size: 14px;
}

.form-group input[type="text"],
.form-group input[type="date"],
.form-group input[type="time"],
.form-group textarea {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #673ab7;
  outline: none;
  box-shadow: 0 0 0 2px rgba(103, 58, 183, 0.1);
}

.event-type-options {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.event-type-option {
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #ddd;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 14px;
  transition: all 0.2s;
}

.event-type-option:hover {
  background-color: #f5f5f5;
}

.event-type-option.active {
  background-color: #ede7f6;
  border-color: #673ab7;
}

.color-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 8px;
}

.dot-vie {
  background-color: #2196f3;
}

.dot-conference {
  background-color: #ff9800;
}

.dot-interne {
  background-color: #4caf50;
}

.dot-pedagogique {
  background-color: #e91e63;
}

.upload-area {
  border: 2px dashed #ddd;
  border-radius: 6px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 109px; /* Match textarea height */
}

.upload-area:hover {
  border-color: #673ab7;
  background-color: #f9f5ff;
}

.upload-icon {
  font-size: 24px;
  margin-bottom: 10px;
  color: #888;
}

.upload-btn {
  background-color: #f0f0f0;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.upload-btn:hover {
  background-color: #e0e0e0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  padding: 15px 20px;
  background-color: #f5f5f5;
  border-top: 1px solid #eee;
  gap: 10px;
}

.btn-cancel {
  padding: 10px 16px;
  border: 1px solid #ddd;
  background-color: white;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-cancel:hover {
  background-color: #f5f5f5;
}

.btn-save {
  padding: 10px 20px;
  background-color: #673ab7;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-save:hover {
  background-color: #7e57c2;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

/* Affichage des événements */
.events-display {
  padding: 15px;
}

.events-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.events-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

.events-controls {
  display: flex;
  align-items: center;
  gap: 15px;
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

.events-view-controls {
  display: flex;
  gap: 5px;
}

.view-btn {
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.view-btn:hover {
  background-color: #e0e0e0;
}

.view-btn.active {
  background-color: #673ab7;
  color: white;
}

.view-icon {
  font-size: 18px;
}

/* Vue Grille */
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.event-card {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  position: relative;
  transition: all 0.25s ease;
  display: flex;
}

.event-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

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