<template>
  <div class="photo-container">
    <img class="image" :src="'data:image/jpeg;base64,' + photoStore.nextPhoto.photoBase64" alt="Photo" />
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import { usePhotoStore } from "@/stores/photoStore";

const photoStore = usePhotoStore()

onMounted(() => {
  console.log(photoStore.nextPhoto);
})
//

</script>

<style scoped>
.photo-container {
width: 280px;
height: 200px;
background-color: white;
border-radius: 10px;
box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
display: flex;
align-items: center;
justify-content: center;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
