<template>
  <v-container fluid>
    <v-row>
      <!-- Barre d'application avec menu -->
      <v-app-bar app>
        <template v-slot:prepend>
          <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        </template>
      </v-app-bar>

      <!-- Menu latéral gauche -->
      <v-navigation-drawer v-model="drawer" app>
        <v-card class="pa-4" elevation="2">
          <v-list nav dense>
            <!-- Bouton "Événement" -->
            <v-list-group v-model="eventOpen" prepend-icon="mdi-calendar">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" title="Evenement" />
              </template>
              <v-list-item title="Diagramme circulaire" @click="pageActive = 'eventcirc'" />
              <v-list-item title="Diagramme en bas tongs" @click="pageActive = 'eventbaton'" />
            </v-list-group> 

            <!-- Bouton "Photo" avec sous-menus -->
            <v-list-group v-model="photoOpen" prepend-icon="mdi-camera">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" title="Photo" />
              </template>
              <v-list-item title="La plus affichée" @click="pageActive = 'photoMost'" />
              <v-list-item title="La moins affichée" @click="pageActive = 'photoLeast'" />
            </v-list-group>

            <!-- Bouton "Citation" -->
            <v-list-group v-model="quoteOpen" prepend-icon="mdi-format-quote-close">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props" title="Citation" />
              </template>
              <v-list-item title="La plus affichée" @click="pageActive = 'quoteMost'" />
              <v-list-item title="La moins affichée" @click="pageActive = 'quoteLeast'" />
            </v-list-group>
          </v-list>
        </v-card>
      </v-navigation-drawer>

      <!-- Contenu principal -->
      <v-col cols="12" md="9">
        <PageStatPhotoMost v-if="pageActive === 'photoMost'" />
        <PageStatPhotoLeast v-if="pageActive === 'photoLeast'" />
        <PageStatEventCirc v-if="pageActive === 'eventcirc'" />
        <PageStatEventBaton v-if="pageActive === 'eventbaton'" />
        <PageStatCitation v-if="pageActive === 'citation'" />
        <PageStatQuoteMost v-if="pageActive === 'quoteMost'" />
        <PageStatQuoteLeast v-if="pageActive === 'quoteLeast'" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref } from 'vue';
import PageStatPhotoMost from './PageStatPhotoMost.vue';
import PageStatPhotoLeast from './PageStatPhotoLeast.vue';
import PageStatEventCirc from './PageStatEventCirc.vue';
import PageStatEventBaton from './PageStatEventBaton.vue';
import PageStatCitation from './PageStatCitation.vue';
import PageStatQuoteMost from './PageStatQuoteMost.vue'; // Importer les composants
import PageStatQuoteLeast from './PageStatQuoteLeast.vue';

const drawer = ref(false);
const pageActive = ref(null); // Page par défaut null
const photoOpen = ref(false); // Gère l'ouverture du sous-menu photo
const eventOpen = ref(false);
const quoteOpen = ref(false);
</script>

<style scoped>
/* Vous pouvez ajouter des styles spécifiques à cette page ici */
</style>
