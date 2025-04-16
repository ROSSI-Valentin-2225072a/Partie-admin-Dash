<template>
<div class="events-header">
    <h2>Événements</h2>
    <div class="events-controls">
    <v-text-field
        :model-value="searchQuery"
        @update:model-value="$emit('update:searchQuery', $event)"
        placeholder="Rechercher..."
        prepend-inner-icon="mdi-magnify"
        density="compact"
        variant="outlined"
        class="search-box"
    ></v-text-field>

    <div class="events-view-controls">
        <v-btn-toggle
        :model-value="viewMode"
        @update:model-value="$emit('update:viewMode', $event)"
        mandatory
        >
        <v-btn :value="'grid'" variant="text">
            <v-icon>mdi-view-grid</v-icon>
        </v-btn>
        <v-btn :value="'list'" variant="text">
            <v-icon>mdi-view-list</v-icon>
        </v-btn>
        </v-btn-toggle>
    </div>
    </div>
</div>
</template>

<script setup>
import { defineProps, defineEmits } from "vue"

const props = defineProps({
    searchQuery: { type: String, default: '' },
    viewMode: { type: String, default: 'grid' }
})

const emit = defineEmits(['update:searchQuery', 'update:viewMode'])
</script>

<style scoped>

.events-header h2 {
  margin: 0;
  color: #333;
  font-size: 20px;
  padding: 8px;
}

</style>
