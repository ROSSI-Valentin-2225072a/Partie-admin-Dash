<template>
  <v-container fluid>
    <v-row>
      <!-- Menu latéral gauche -->
      <v-navigation-drawer permanent app>
        <v-card class="pa-4" elevation="2">
          <v-list nav dense>
            <!-- Groupe "Événement" -->
            <v-list-group v-model="eventOpen" prepend-icon="mdi-calendar">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props">
                  <v-list-item-title>Événement</v-list-item-title>
                </v-list-item>
              </template>
              <v-list-item
                @click="pageActive = 'eventcirc'"
                :class="{ 'active-item': pageActive === 'eventcirc' }"
              >
                <v-list-item-icon v-if="pageActive === 'eventcirc'">
                  <v-icon color="green">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Diagramme circulaire</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                @click="pageActive = 'eventbaton'"
                :class="{ 'active-item': pageActive === 'eventbaton' }"
              >
                <v-list-item-icon v-if="pageActive === 'eventbaton'">
                  <v-icon color="green">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>Diagramme bâton</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>

            <!-- Groupe "Photo" -->
            <v-list-group v-model="photoOpen" prepend-icon="mdi-camera">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props">
                  <v-list-item-title>Photo</v-list-item-title>
                </v-list-item>
              </template>
              <v-list-item
                @click="pageActive = 'photoMost'"
                :class="{ 'active-item': pageActive === 'photoMost' }"
              >
                <v-list-item-icon v-if="pageActive === 'photoMost'">
                  <v-icon color="green">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>La plus affichée</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                @click="pageActive = 'photoLeast'"
                :class="{ 'active-item': pageActive === 'photoLeast' }"
              >
                <v-list-item-icon v-if="pageActive === 'photoLeast'">
                  <v-icon color="green">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>La moins affichée</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>

            <!-- Groupe "Citation" -->
            <v-list-group v-model="quoteOpen" prepend-icon="mdi-format-quote-close">
              <template v-slot:activator="{ props }">
                <v-list-item v-bind="props">
                  <v-list-item-title>Citation</v-list-item-title>
                </v-list-item>
              </template>
              <v-list-item
                @click="pageActive = 'quoteMost'"
                :class="{ 'active-item': pageActive === 'quoteMost' }"
              >
                <v-list-item-icon v-if="pageActive === 'quoteMost'">
                  <v-icon color="green">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>La plus affichée</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-list-item
                @click="pageActive = 'quoteLeast'"
                :class="{ 'active-item': pageActive === 'quoteLeast' }"
              >
                <v-list-item-icon v-if="pageActive === 'quoteLeast'">
                  <v-icon color="green">mdi-check</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>La moins affichée</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
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
        <PageStatQuoteMost v-if="pageActive === 'quoteMost'" />
        <PageStatQuoteLeast v-if="pageActive === 'quoteLeast'" />
      </v-col>
    </v-row>
  </v-container>

  <!-- Contenu dynamique selon la page active -->
  <component :is="pageActive" />
</template>

<script setup>
import { ref } from 'vue';
import PageStatPhotoMost from './PageStatPhotoMost.vue';
import PageStatPhotoLeast from './PageStatPhotoLeast.vue';
import PageStatEventCirc from './PageStatEventCirc.vue';
import PageStatEventBaton from './PageStatEventBaton.vue';
import PageStatQuoteMost from './PageStatQuoteMost.vue';
import PageStatQuoteLeast from './PageStatQuoteLeast.vue';

const eventOpen = ref(true); // Le groupe "Événement" est ouvert par défaut
const photoOpen = ref(false);
const quoteOpen = ref(false);

const pageActive = ref('eventcirc'); // Page "Diagramme circulaire" est active par défaut

</script>

<style scoped>
.active-item {
  background-color: #f0e6f5; /* Fond différent pour l'élément sélectionné */
  border-left: 4px solid #9059a0;
}
</style>
