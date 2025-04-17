<template>
  <div class="app-background">
    <div class="left-column">
      <div class="logo-container">
        <img src="/logo-ISIS-horizontal-BLANC-HD.png" alt="Logo ISIS" class="logo" />
      </div>

      <div class="meteo-container">
        <Meteo />
      </div>

      <div class="photo-container">
        <Photo />
      </div>
    </div>

    <div class="center-column">
      <div class="events-wrapper">
        <EventBox />
        <div class="spacer"></div>
        <div class="month-event-container">
          <MonthEventBox />
        </div>
      </div>
    </div>

    <div class="right-column">
      <div class="birthday-container">
        <Birthday />
      </div>

      <div class="quote-container">
        <Quote />
      </div>
    </div>
  </div>
</template>

<script setup>
import Quote from "@/components/dash/Quote.vue";
import Meteo from "@/components/dash/Meteo.vue";
import Photo from "@/components/dash/Photo.vue";
import EventBox from "@/components/dash/EventBox.vue";
import Birthday from "@/components/dash/Birthday.vue";
import MonthEventBox from "@/components/dash/MonthEventBox.vue";
</script>

<style scoped>
.app-background {
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #ed6962, #ffb1b1, #d6a1f2, #9059a0);
  background-size: 400% 400%;
  animation: gradientBG 20s ease infinite;
  display: flex;
  padding: 0;
  margin: 0;
  overflow: hidden;
  position: relative;
}

.left-column {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.center-column {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}

.right-column {
  width: 25%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.logo-container {
  margin-bottom: 20px;
}

.logo {
  width: 240px;
}

.meteo-container {
  margin-top: 50px;
  flex-grow: 1;
}

.photo-container {
  margin-top: auto;
  margin-bottom: 40px;
}

.events-wrapper {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.spacer {
  flex-grow: 1;
}

.month-event-container {
  margin-bottom: 40px;
}

.birthday-container {
  margin-top: 20px;
}

.quote-container {
  margin-top: auto;
  margin-bottom: 40px;
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
</style>
