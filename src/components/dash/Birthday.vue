<template>
  <div class="birthday-box">
    <h2 class="birthday-title">Anniversaires</h2>

    <div class="calendar-row">
      <div v-for="(day, index) in days" :key="index" class="day-cell">
        {{ day }}
        <span v-if="birthdayDays.includes(index)" class="emoji">🎉</span>
      </div>
    </div>

    <div class="birthday-message">
      Aujourd’hui, <span class="date">{{ formattedDate }}</span>,
      <template v-if="todayBirthday">
        c’est l’anniversaire de :<br />
        <span class="name">{{ todayBirthday.name }}</span> 🎉
      </template>
      <template v-else>
        pas d’anniversaire.
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"

const days = ["L", "Ma", "Me", "J", "V", "S", "D"]

//  À remplacer par l'appel à l’API plus tard
const birthdays = ref([
  {
    name: "Manon FLEURANCEAU",
    date: "2025-04-11"
  },
  {
    name: "Tom Anderson",
    date: "2025-04-12"
  }
])

const today = new Date()
const todayBirthday = ref(null)
const birthdayDays = ref([])

// Format FR (ex : 11 avril)
const formattedDate = today.toLocaleDateString("fr-FR", {
  day: "2-digit",
  month: "long"
})

onMounted(() => {
  birthdays.value.forEach((person) => {
    const bDate = new Date(person.date)

    if (
      bDate.getDate() === today.getDate() &&
      bDate.getMonth() === today.getMonth()
    ) {
      todayBirthday.value = person
    }

    // Détection de jours avec anniversaires ce mois-ci
    if (
      bDate.getMonth() === today.getMonth() &&
      bDate.getFullYear() === today.getFullYear()
    ) {
      const weekday = new Date(bDate).getDay()
      birthdayDays.value.push((weekday + 6) % 7) // shift Sunday to end
    }
  })
})
</script>

<style scoped>
.birthday-box {
  width: 350px;
  background-color: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #2f2769;
  font-weight: bold;
}

.birthday-title {
  font-size: 2rem;
  font-weight: 600;
  font-family: 'Plus Jakarta Sans', sans-serif; /* Applique Jakarta Sans uniquement au titre */
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  text-align: center;
  margin-bottom: 1.2rem;

  background: linear-gradient(135deg, #ed6962, #ffb1b1, #d6a1f2, #9059a0);
  background-size: 400% 400%;
  animation: gradientBG 20s ease infinite;
}

/* Animation pour le dégradé */
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

.calendar-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
}

.day-cell {
  width: 40px;
  height: 90px;
  font-size: 0.9rem;
  background: #f3e8ff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.emoji {
  position: absolute;
  bottom: -10px;
  font-size: 0.8rem;
}

.birthday-message {
  font-size: 0.9rem;
  line-height: 1.4;
}

.name {
  color: #2f2769;
  font-weight: 800;
}

.date {
  font-weight: 600;
}
</style>