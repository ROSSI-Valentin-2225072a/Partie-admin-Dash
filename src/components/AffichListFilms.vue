<script setup>
import { onMounted, reactive, watch } from "vue";
import { Film } from "../film.js";

const apiKey = "af1e1c8f8ad6efb5b326eabaffa38b8a";
const url =
  "https://api.themoviedb.org/3/search/movie?api_key=" +
  apiKey +
  "&language=fr-FR&page=1&query=";

const listeFilms = reactive([]);
const props = defineProps(["critere"]);

function getFilms() {
  const fetchOptions = { method: "GET" };
  fetch(url + props.critere, fetchOptions)
    .then((response) => {
      return response.json();
    })
    .then((dataJSON) => {
      console.log(`url utilisée : ${url + props.critere}`);
      const results = dataJSON.results;
      listeFilms.splice(0, listeFilms.length);
      results.map((film) => listeFilms.push(new Film(film)));
    })
    .catch((error) => {
      console.log(error);
    });
}

watch(props, (newcritere) => {
  console.log(newcritere);
  getFilms();
});
</script>

<template>
  <v-row dense>
    <v-col
      v-for="film in listeFilms"
      :key="film.id"
      cols="12"
      sm="6"
      md="3"
      lg="2"
      xl="2"
    >
      <router-link :to="'/PageDetail/' + film.id">
        <v-card color="primary">
          <v-img
            :src="'https://image.tmdb.org/t/p/w500/' + film.affiche"
            height="200px"
            cover
          ></v-img>
          <v-card-title>
            {{ film.titre }}
          </v-card-title>
        </v-card>
      </router-link>
    </v-col>
  </v-row>
</template>
<style scoped>
.films-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.film-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
}
.image {
  width: 100px;
  height: 150px;
}
</style>
