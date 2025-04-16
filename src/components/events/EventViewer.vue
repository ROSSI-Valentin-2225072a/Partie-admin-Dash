<script setup>
import { ref, defineProps, defineEmits, watch } from 'vue';
import {blue} from "vuetify/util/colors";

const props = defineProps(["event", "visible"]);

const emit = defineEmits(['close', 'editEvent', 'deleteEvent']);

const show = ref(props.visible);

watch(() => props.visible, (newValue) => {
  show.value = newValue;
});

function closeViewer() {
  show.value = false;
  emit('close');
}

function formatDate(dateString) {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return new Date(dateString).toLocaleDateString('fr-FR', options);
}
</script>

<template>
  <div v-if="show" class="event-viewer-overlay" @click.self="closeViewer">
    <div class="event-viewer-container">
      <div class="event-viewer-header">
        <h2>{{ event.nomEvent }}</h2>
        <div class="event-viewer-actions">
          <button class="action-button edit" @click="$emit('editEvent', event)">
            <i class="fas fa-edit"></i> Modifier
          </button>
          <button class="action-button delete" @click="$emit('deleteEvent', event)">
            <i class="fas fa-trash"></i> Supprimer
          </button>
          <button class="action-button close" @click="closeViewer">
            <i class="fas fa-times"></i>
          </button>
        </div>
      </div>

      <div class="event-viewer-content">
        <div class="event-info">
          <div class="info-item">
            <span class="label">Date:</span>
            <span class="value">{{ formatDate(event.dateEvent) }}</span>
          </div>
          <div class="info-item">
            <span class="label">Type:</span>
            <span class="value">
              <span class="event-type-badge" :style="{ backgroundColor: blue }">
                {{ event.type.libelle }}
              </span>
            </span>
          </div>
          <div v-if="event.tags && event.tags.length > 0" class="info-item">
            <span class="label">Tags:</span>
            <div class="tags-container">
              <span v-for="tag in event.tags" :key="tag.id" class="tag-badge">
                {{ tag.libelle }}
              </span>
            </div>
          </div>
        </div>

        <div class="event-description">
          <h3>Description</h3>
          <p>{{ event.description || 'Aucune description disponible' }}</p>
        </div>

        <div v-if="event.lieu" class="event-location">
          <h3>Lieu</h3>
          <p>{{ event.lieu }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.event-viewer-overlay {
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

.event-viewer-container {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
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

.event-viewer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eaeaea;
}

.event-viewer-header h2 {
  margin: 0;
  font-size: 1.5rem;
  color: #333;
}

.event-viewer-actions {
  display: flex;
  gap: 10px;
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

.action-button.edit {
  color: #2196F3;
}

.action-button.edit:hover {
  background-color: rgba(33, 150, 243, 0.1);
}

.action-button.delete {
  color: #F44336;
}

.action-button.delete:hover {
  background-color: rgba(244, 67, 54, 0.1);
}

.action-button.close {
  color: #757575;
}

.action-button.close:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.event-viewer-content {
  padding: 20px;
}

.event-info {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.info-item {
  display: flex;
  align-items: center;
}

.label {
  font-weight: 600;
  min-width: 80px;
  color: #555;
}

.value {
  color: #333;
}

.event-type-badge {
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.tag-badge {
  display: inline-block;
  padding: 3px 8px;
  background-color: #e0e0e0;
  border-radius: 12px;
  font-size: 0.8rem;
  color: #333;
}

.event-description, .event-location {
  margin-top: 15px;
}

.event-description h3, .event-location h3 {
  margin-top: 0;
  margin-bottom: 8px;
  font-size: 1.1rem;
  color: #333;
}

.event-description p, .event-location p {
  margin: 0;
  color: #555;
  line-height: 1.5;
}
</style>
