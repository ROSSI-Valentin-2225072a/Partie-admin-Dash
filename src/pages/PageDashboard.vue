<template>
  <div class="app-background">
    <img
      src="/logo-ISIS-horizontal-BLANC-HD.png"
      alt="Logo ISIS"
      class="logo"
    />
    <div class="quote-container">
      <Quote />
    </div>
    <div class="meteo-container">
      <Meteo />
    </div>
    <div class="birthday-container">
      <Birthday />
    </div>
    <div class="photo-container">
      <Photo />
    </div>
    <EventBox/>
  </div>
</template>
  
<script setup>
import Quote from "@/components/dash/Quote.vue";
import Meteo from "@/components/dash/Meteo.vue";
import Photo from "@/components/dash/Photo.vue";
import EventBox from "@/components/dash/EventBox.vue";
import Birthday from "@/components/dash/Birthday.vue";
</script>
  
<style scoped>
.app-background {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #ed6962, #ffb1b1, #d6a1f2, #9059a0);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 20px;
  overflow: hidden; /* empêche le scroll */
}

.logo {
  width: 350px;
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

.quote-container {
  position: absolute;
  bottom: 70px;
  right: 70px;
}

.meteo-container {
  position: absolute;
  top: 250px;
  left: 60px;
}

.photo-container {
  position: absolute;
  top: 1000px;
  left: 60px;
}

.birthday-container {
  position: absolute;
  top: 50px;
  right: 70px;
}

</style>
