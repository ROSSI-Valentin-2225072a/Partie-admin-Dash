<template>
    <h3>Detail d'un film</h3>
</template>
<script setup>
 import { reactive, onMounted } from "vue";
 import { Film } from "../film.js";

 const props = defineProps(["idFilm"])
 let data = reactive({film:null})

 const apiKey = "af1e1c8f8ad6efb5b326eabaffa38b8a"
 const url =
 "https://api.themoviedb.org/3/movie/" +
 props.idFilm +
 "?api_key=" +
 apiKey +
 "&language=fr-FR";
 
 const fetchOptions = {method : "GET"}

 function getDetail() {
    fetch(url, fetchOptions)
    .then((response) => {return response.json()})
    .then((dataJSON) => {
        console.log(dataJSON);
        data.film = new Film(dataJSON)
        console.log(data)
    })
    .catch((error) => {
        console.log(error)
    })
 }

 onMounted(() => {
   getDetail();
 });


</script>