<template>
<div class="events-header">
    <h2>Événements</h2>
    <div class="events-controls">
    <v-text-field
        v-model="localSearchQuery"
        placeholder="Rechercher..."
        prepend-inner-icon="mdi-magnify"
        density="compact"
        variant="outlined"
        class="search-box"
    ></v-text-field>
    
    <div class="events-view-controls">
        <v-btn-toggle
        v-model="localViewMode"
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
  
<script>
import { localSearchQuery } from '@/localSearchQuery'
import { localViewMode } from '@/localViewMode';

const props = defineProps(["searchQuery", "viewMode"])

</script>