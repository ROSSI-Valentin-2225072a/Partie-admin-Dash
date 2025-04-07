<template>
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-card-title class="text-h5">Les Citations les plus affichées</v-card-title>
            <v-card-text>
              <!-- Votre contenu spécifique ici, par exemple un tableau ou une liste -->
              <v-list>
                <v-list-item v-for="(quote, index) in quotes" :key="index">
                  <v-list-item-content>
                    <v-list-item-title>{{ quote.text }}</v-list-item-title>
                    <v-list-item-subtitle>- {{ quote.author }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
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
    { text: "La vie est belle.", author: "Auteur 1" },
    { text: "L'amour est éternel.", author: "Auteur 2" },
    { text: "Le savoir est une arme.", author: "Auteur 3" },
  ]);
  </script>
  
  <style scoped>
  /* Vous pouvez ajouter des styles spécifiques à cette page ici */
  </style>
  