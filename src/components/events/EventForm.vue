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
          v-model="event.title"
          label="Titre"
          required
          :rules="titleRules"
        ></v-text-field>
        
        <v-select
          v-model="event.type"
          :items="eventTypes"
          item-title="libelle"
          item-value="tag"
          label="Type d'événement"
          required
        ></v-select>
        
        <v-row>
          <v-col cols="6">
            <v-date-picker
              v-model="event.date"
              label="Date"
              required
            ></v-date-picker>
          </v-col>
          <v-col cols="6">
            <v-time-picker
              v-model="event.time"
              format="24hr"
              label="Heure"
            ></v-time-picker>
          </v-col>
        </v-row>
        
        <v-text-field
          v-model="event.location"
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

<script>
import { ref } from "vue";

const valid = ref(false)

const event = ref({
    nomEvent: '',
    type: '',
    dateEvent: new Date().toISOString().substr(0, 10),
    lieu: '',
    description: ''
  })

const titleRules = [
    v => !!v || 'Le titre est requis',
    v => v.length <= 100 || 'Le titre doit contenir moins de 100 caractères'
  ]

const eventTypes = [
    { libelle: 'Réunion', tag: 'meeting' },
    { libelle: 'Formation', tag: 'training' },
    { libelle: 'Conférence', tag: 'conference' },
    { libelle: 'Autre', tag: 'other' }
  ]

function submitForm() {
  if (this.$refs.form.validate()) {
    const newEvent = {
      ...this.event,
      id: Date.now()
    }
    this.$emit('add-event', newEvent)
  }
}

</script>