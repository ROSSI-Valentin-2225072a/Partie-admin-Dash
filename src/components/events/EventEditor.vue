<script setup>
import { ref, computed, defineProps, defineEmits, watch, onMounted } from 'vue';
import {blue} from "vuetify/util/colors";

const props = defineProps([
  'event',
  'visible',
  'eventTypes',
  'tags']);

const emit = defineEmits(['close', 'save']);

const show = ref(props.visible);
const editedEvent = ref({});
const eventDate = ref('');
const eventTime = ref('');
const selectedTags = ref([]);

const isNewEvent = computed(() => !props.event || !props.event.id);

function initializeForm() {
  if (props.event) {
    editedEvent.value = JSON.parse(JSON.stringify(props.event));

    if (!editedEvent.value.type) {
      editedEvent.value.type = { id: '', libelle: '', couleur: '' };
    }

    if (!editedEvent.value.tags) {
      editedEvent.value.tags = [];
    }

    selectedTags.value = editedEvent.value.tags.map(tag => tag.id);

    if (editedEvent.value.dateEvent) {
      const date = new Date(editedEvent.value.dateEvent);
      eventDate.value = formatDateForInput(date);
      eventTime.value = formatTimeForInput(date);
    } else {
      const now = new Date();
      eventDate.value = formatDateForInput(now);
      eventTime.value = formatTimeForInput(now);
    }
  } else {
    const now = new Date();
    editedEvent.value = {
      nomEvent: '',
      description: '',
      lieu: '',
      type: { libelle: '' },
    };

    eventDate.value = formatDateForInput(now);
    eventTime.value = formatTimeForInput(now);
    selectedTags.value = [];
  }
}

function formatDateForInput(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatTimeForInput(date) {
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function saveEvent() {
  const dateTimeString = `${eventDate.value}T${eventTime.value}:00`;
  editedEvent.value.dateEvent = new Date(dateTimeString).toISOString();

  const selectedType = props.eventTypes.find(type => type.libelle === editedEvent.value.type.libelle);
  if (selectedType) {
    editedEvent.value.type = { ...selectedType };
  }

  emit('save', editedEvent.value);
  show.value = false;
}

function cancelEdit() {
  show.value = false;
  emit('close');
}

watch(() => props.visible, (newValue) => {
  show.value = newValue;
  if (newValue) {
    initializeForm();
  }
});

watch(() => props.event, () => {
  if (show.value) {
    initializeForm();
  }
});

onMounted(() => {
  if (show.value) {
    initializeForm();
  }
});
</script>

<template>
  <div v-if="show" class="event-editor-overlay" @click.self="cancelEdit">
    <div class="event-editor-container">
      <div class="event-editor-header">
        <h2>{{ isNewEvent ? 'Créer un événement' : 'Modifier l\'événement' }}</h2>
        <button class="action-button close" @click="cancelEdit">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <div class="event-editor-content">
        <form @submit.prevent="saveEvent">
          <div class="form-group">
            <label for="eventName">Nom de l'événement*</label>
            <input
              id="eventName"
              v-model="editedEvent.nomEvent"
              type="text"
              required
              placeholder="Nom de l'événement"
            >
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="eventDate">Date*</label>
              <input
                id="eventDate"
                v-model="eventDate"
                type="date"
                required
              >
            </div>

          </div>

          <div class="form-group">
            <label for="eventType">Type d'événement*</label>
            <select
              id="eventType"
              v-model="editedEvent.type.libelle"
              required
            >
              <option
                v-for="type in eventTypes"
                :key="type.libelle"
                :value="type.libelle"
                :style="{ backgroundColor: blue }"
              >
                {{ type.libelle }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label for="eventlieu">Lieu</label>
            <input
              id="eventlieu"
              v-model="editedEvent.lieu"
              type="text"
              placeholder="Lieu de l'événement"
            >
          </div>

          <div class="form-group">
            <label for="eventDescription">Description</label>
            <textarea
              id="eventDescription"
              v-model="editedEvent.description"
              rows="4"
              placeholder="Description de l'événement"
            ></textarea>
          </div>

          <div class="form-actions">
            <button type="button" class="btn-secondary" @click="cancelEdit">Annuler</button>
            <button type="submit" class="btn-primary">
              {{ isNewEvent ? 'Créer' : 'Enregistrer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-editor-overlay {
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
}

.event-editor-container {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 650px;
  max-height: 85vh;
  overflow-y: auto;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.event-editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eaeaea;
}

.event-editor-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px 10px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: background-color 0.2s;
}

.action-button.close {
  color: #757575;
}

.action-button.close:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.event-editor-content {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-row {
  display: flex;
  gap: 15px;
}

.form-row .form-group {
  flex: 1;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
  color: #333;
}

input, select, textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  color: #333;
}

input:focus, select:focus, textarea:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.2);
}

.tags-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  min-height: 45px;
}

.tag-option {
  padding: 4px 10px;
  background-color: #f0f0f0;
  border-radius: 16px;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.tag-option.selected {
  background-color: #2196F3;
  color: white;
}

.tag-option:hover:not(.selected) {
  background-color: #e0e0e0;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn-primary, .btn-secondary {
  padding: 10px 16px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-primary {
  background-color: #2196F3;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #1976D2;
}

.btn-secondary {
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
}

.btn-secondary:hover {
  background-color: #e0e0e0;
}
</style>
