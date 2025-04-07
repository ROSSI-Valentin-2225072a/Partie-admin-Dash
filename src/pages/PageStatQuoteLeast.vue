<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card class="elevation-12 rounded-lg">
            <v-card-title class="headline text-center pt-4">
              <v-icon class="mr-2">mdi-format-quote-close</v-icon>
              <span>Les Citations les moins affichées</span>
            </v-card-title>
  
            <v-card-text>
              <!-- Ajout d'une animation sur la liste des citations -->
              <v-list two-line>
                <v-list-item-group v-if="quotes.length > 0">
                  <v-list-item
                    v-for="(quote, index) in quotes"
                    :key="index"
                    class="mb-4"
                    v-bind="quoteStyles"
                  >
                    <v-list-item-content>
                      <v-list-item-title class="text-h6">{{ quote.text }}</v-list-item-title>
                      <v-list-item-subtitle class="text-subtitle-1">{{ quote.author }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-list-item-group>
  
                <!-- Message si aucune citation -->
                <v-alert
                  v-if="quotes.length === 0"
                  type="info"
                  elevation="2"
                  class="mt-5"
                  dense
                  icon="mdi-information"
                >
                  Aucune citation disponible pour le moment !
                </v-alert>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const quotes = ref([
    { text: "La vie est un défi à relever, un bonheur à mériter.", author: "Mère Teresa" },
    { text: "L'avenir appartient à ceux qui croient à la beauté de leurs rêves.", author: "Eleanor Roosevelt" },
    { text: "Le plus grand secret pour le bonheur, c’est d’être bien avec soi-même.", author: "Bernard Werber" },
  ]);
  
  const quoteStyles = {
    style: 'background-color: #f1f1f1; border-radius: 8px; transition: background-color 0.3s ease;',
  };
  
  </script>
  
  <style scoped>
  /* Style global pour le composant */
  .elevation-12 {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }
  
  .rounded-lg {
    border-radius: 12px;
  }
  
  .text-center {
    text-align: center;
  }
  
  .pt-4 {
    padding-top: 16px;
  }
  
  .text-h6 {
    font-size: 1.2rem;
    color: #424242;
  }
  
  .text-subtitle-1 {
    color: #757575;
    font-style: italic;
  }
  
  .v-list-item {
    transition: transform 0.2s ease;
  }
  
  .v-list-item:hover {
    transform: scale(1.05);
    background-color: #e0e0e0;
  }
  
  .v-alert {
    text-align: center;
    font-size: 1rem;
    color: #757575;
    padding: 16px;
  }
  
  .v-card-title {
    background: #f8f8f8;
    border-bottom: 2px solid #eeeeee;
  }
  
  .v-icon {
    color: #9c27b0;
    font-size: 28px;
  }
  
  .v-card {
    background: #ffffff;
    padding: 24px;
  }
  </style>
  