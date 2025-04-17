<template>
  <div class="photo-box">
    <h2 class="photo-title">Photo du jour</h2>
    <div class="photo-container">
      <img
        class="image"
        :src="'data:image/jpeg;base64,' + photoStore.nextPhoto.photoBase64"
        alt="Photo"
      />
    </div>
  </div>
</template>

<script setup>
import { usePhotoStore } from "@/stores/photoStore";
import { onMounted } from "vue";

const photoStore = usePhotoStore();

onMounted(() => {
  console.log(photoStore.nextPhoto);
});
</script>

<style scoped>
.photo-box {
  width: 350px;
  background-color: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #2f2769;
  font-weight: bold;
}

.photo-title {
  font-size: 2rem;
  font-weight: 600;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  text-align: center;
  margin-bottom: 1.2rem;

  background: linear-gradient(135deg, #ed6962, #ffb1b1, #d6a1f2, #9059a0);
  background-size: 400% 400%;
  animation: gradientBG 20s ease infinite;
}

@keyframes gradientBG {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.photo-container {
  width: 280px;
  height: 140px;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
