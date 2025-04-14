<template>
  <v-card class="form-card">
    <v-card-title>
      Ajouter un événement
      <v-btn icon @click="$emit('close')" class="close-btn">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card-title>
    
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <v-text-field
          v-model="event.nomEvent"
          label="Titre"
          required
          :rules="titleRules"
        ></v-text-field>
        
        <v-select
          v-model="event.type.libelle"
          :items="eventTypes"
          item-title="libelle"
          item-value="libelle"
          label="Type d'événement"
          required
        ></v-select>
        
        <v-row>
          <v-col cols="6">
            <v-date-picker
              v-model="event.dateEvent"
              label="Date"
              required
            ></v-date-picker>
          </v-col>
        </v-row>
        
        <v-text-field
          v-model="event.lieu"
          label="Lieu"
        ></v-text-field>
        
        <v-textarea
          v-model="event.description"
          label="Description"
          rows="3"
        ></v-textarea>
      </v-form>
    </v-card-text>
    
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        text
        @click="$emit('close')"
      >
        Annuler
      </v-btn>
      <v-btn
        color="primary"
        :disabled="!valid"
        @click="submitForm"
      >
        Enregistrer
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref, defineProps } from "vue";

const props = defineProps(["eventTypes"])
const emit = defineEmits(['close', 'add-event']);

const form = ref(null)
const valid = ref(false)

const event = ref({
    nomEvent: '',
    type: {libelle: ''},
    dateEvent: new Date().toISOString().substr(0, 10),
    lieu: '',
    description: ''
  })

const titleRules = [
    v => !!v || 'Le titre est requis',
    v => v.length <= 100 || 'Le titre doit contenir moins de 100 caractères'
  ]

  function submitForm() {
  if (form.value && form.value.validate()) {
    const newEvent = {
      ...event.value,
    };
    emit('add-event', newEvent);
  }
}

</script>