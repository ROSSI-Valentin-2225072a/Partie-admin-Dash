<template>
<div class="events-header">
    <h2>Événements</h2>
    <div class="events-controls">
    <v-text-field
        v-model="searchQuery"
        placeholder="Rechercher..."
        prepend-inner-icon="mdi-magnify"
        density="compact"
        variant="outlined"
        class="search-box"
        @input="$emit('update:searchQuery', $event.target.value)"
    ></v-text-field>
    
    <div class="events-view-controls">
        <v-btn-toggle
        v-model="viewMode"
        mandatory
        @change="$emit('update:viewMode', $event)"
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
import { defineModel } from "vue"

const searchQuery = defineModel("searchQuery")
const viewMode = defineModel("viewMode")

</script>