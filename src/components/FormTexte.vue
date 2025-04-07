<script setup>
import {ref} from "vue";

const libelle = ref("");

</script>

<template>
    <v-container>
    <v-form @submit.prevent="$emit('recherche', libelle); libelle = ''">
    <v-text-field v-model="libelle" label="Critère de recherche"
    variant="outlined" dense></v-text-field>
    <v-btn type="submit" color="primary">Rechercher</v-btn>
    </v-form>
    </v-container>
   </template>
   

<style scoped>

</style>