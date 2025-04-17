<template>
  <v-app>
    <div v-if="!isDashboardPage" class="global-background">
      <img src="/Elements_Vectoriels.png" class="svg-deco top-right" alt="">
      <img src="/Elements_Vectoriels.png" class="svg-deco bottom-left" alt="">
    </div>

    <div
      v-if="showSplash && !isDashboardPage"
      class="splash-screen"
      tabindex="0"
    >
      <div class="logo-container">
        <img src="/logo-ISIS-horizontal-BLANC-HD.png" alt="Logo" class="splash-logo">
      </div>

      <div class="password-container">
        <v-text-field
          v-model="password"
          label="Mot de passe"
          type="password"
          variant="outlined"
          color="white"
          class="password-input"
          hide-details
          @keyup.enter="checkPassword"
        ></v-text-field>
        <v-btn
          color="white"
          class="mt-4"
          @click="checkPassword"
        >
          Valider
        </v-btn>
        <div v-if="passwordError" class="error-message mt-2">
          Mot de passe incorrect
        </div>
      </div>

      <div class="click-instruction">Entrez le mot de passe pour continuer</div>
    </div>

    <template v-if="isDashboardPage">
      <RouterView />
    </template>

    <template v-else-if="!showSplash">
      <v-app-bar app color="#9059a0" density="comfortable" class="menu-bar">
        <v-img src="/logoSblanc.png" alt="Logo" max-height="40" max-width="100"></v-img>

        <v-spacer></v-spacer>

        <template v-for="(item, index) in visibleMenuItems" :key="item.to">
          <v-btn
            :to="item.to"
            :class="{ 'active-link': $route.path === item.to }"
            class="menu-btn"
          >
            {{ item.label }}
          </v-btn>
        </template>

        <v-menu v-if="hiddenMenuItems.length" offset-y>
          <template v-slot:activator="{ props }">
            <v-btn v-bind="props" icon>
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="item in hiddenMenuItems"
              :key="item.to"
              :to="item.to"
            >
              <v-list-item-title>{{ item.label }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>

        <template v-if="isMobile">
          <v-btn icon @click="drawer = !drawer">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
      </v-app-bar>

      <v-btn
        id="menu-droite"
        icon
        @mouseover="doorOpen = true"
        @mouseleave="doorOpen = false"
        @click="goToDeconnect"
      >
        <v-icon>{{ doorOpen ? 'mdi-door-open' : 'mdi-door' }}</v-icon>
      </v-btn>

      <v-navigation-drawer v-model="drawer" temporary>
        <v-list>
          <v-list-item v-for="item in menuItems" :key="item.to" :to="item.to">
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <v-main>
        <v-container class="page">
          <RouterView />
        </v-container>
      </v-main>

      <v-footer color="#9059a0">
        <div>
          {{ new Date().getFullYear() }} — <strong>Revalox</strong>
        </div>
      </v-footer>
    </template>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watchEffect } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { sha256 } from "js-sha256";

const route = useRoute();
const router = useRouter();

const isDashboardPage = computed(() => {
  return route.path === '/PageDashboard';
});

const showSplash = ref(true);
const password = ref('');
const passwordError = ref(false);
const correctPassword = '5645234ea6e6e3cb737915480966c7cf80bf685ad01332bf5e194f1da84d3dc8';

function hash(string) {
  return sha256(string);
}

const checkPassword = () => {
  if (hash(password.value) === correctPassword) {
    showSplash.value = false;
    router.push('/');
    passwordError.value = false;
  } else {
    passwordError.value = true;
    // Effacer le mot de passe après 2 secondes
    setTimeout(() => {
      password.value = '';
      passwordError.value = false;
    }, 2000);
  }
};

watchEffect(() => {
  if (isDashboardPage.value) {
    showSplash.value = false;
  }
});

const menuItems = [
  { label: "Événement", to: "/PageEvenement" },
  { label: "Citations", to: "/PageCitations" },
  { label: "Photos", to: "/PagePhotos" },
  { label: "Anniversaires", to: "/PageAnniversaires" },
  { label: "Statistiques", to: "/PageStat" },
  { label: "Dashboard", to: "/PageDashboard" }
];

const drawer = ref(false);
const screenWidth = ref(window.innerWidth);
const maxVisibleButtons = ref(4); // Max boutons visibles avant "..."

const doorOpen = ref(false);
const toggleDoor = () => {
  doorOpen.value = !doorOpen.value;
};

const goToDeconnect = () => {
  location.reload();
};

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
  isMobile.value = screenWidth.value < 900;

  if (screenWidth.value > 1200) {
    maxVisibleButtons.value = 5;
  } else if (screenWidth.value > 900) {
    maxVisibleButtons.value = 4;
  } else if (screenWidth.value > 600) {
    maxVisibleButtons.value = 3;
  } else {
    maxVisibleButtons.value = 2;
  }
};

onMounted(() => {
  window.addEventListener('resize', updateScreenWidth);
  updateScreenWidth();
});

onUnmounted(() => {
  window.removeEventListener('resize', updateScreenWidth);
});

const visibleMenuItems = computed(() => menuItems.slice(0, maxVisibleButtons.value));
const hiddenMenuItems = computed(() => menuItems.slice(maxVisibleButtons.value));

const isMobile = ref(false);
</script>

<style scoped>
/* Styles pour l'arrière-plan global */
.global-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0; /* Assure que le fond est derrière tous les autres éléments */
  pointer-events: none; /* Permet aux clics de passer à travers */
}

/* Styles pour l'écran de démarrage */
.splash-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #ed6962, #9059a0);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  outline: none; /* Supprime le contour de focus */
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 0 20px;
  margin-bottom: 40px;
}

.splash-logo {
  width: 80%;
  max-width: 600px;
  height: auto;
  animation: fadeIn 1.5s ease-in-out;
}

.password-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 300px;
  margin-bottom: 20px;
  animation: fadeIn 2s ease-in-out 0.5s forwards;
}

.password-input {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
}

.password-input :deep(.v-field__field) {
  color: white !important;
}

.password-input :deep(.v-label) {
  color: rgba(255, 255, 255, 0.8) !important;
}

.error-message {
  color: #ff5252;
  font-size: 0.9rem;
  font-weight: bold;
}

.click-instruction {
  color: white;
  margin-top: 10px;
  font-size: 1.2rem;
  opacity: 0;
  animation: fadeIn 2s ease-in-out 1s forwards;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Positionnement de la porte */
#menu-droite {
  position: fixed;
  top: 70px;
  right: 40px;
  z-index: 10;
}

/* Fond dégradé global */
body, .v-application {
  background: linear-gradient(135deg, #ed6962, #9059a0) !important;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Style pour les éléments SVG */
.svg-deco {
  position: fixed;
  width: 300px;
  height: auto;
  opacity: 0.5;
  pointer-events: none;
}

/* Positionnement des éléments vectoriels */
.top-right {
  top: -50px;
  right: -120px;
  transform: rotate(270deg) scale(1.5);
}

.bottom-left {
  bottom: -30px;
  left: -130px;
  transform: rotate(-90deg) scale(1.5);
}

/* Conteneur des pages */
.page {
  background: transparent !important;
  border-radius: 10px;
  padding: 20px;
  box-shadow: none;
  max-width: 90%;
  margin: 20px auto;
  position: relative;
  z-index: 1; /* Assure que le contenu est au-dessus du fond */
}

/* Ajustements du layout */
.v-main {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
}

/* Positionnement du logo fixe */
.v-app-bar img {
  position: fixed;
  top: 10px;
  left: 20px;
  z-index: 10;
  max-height: 40px;
  max-width: 100px;
}

/* Style de la barre de navigation */
.v-app-bar {
  height: 55px !important;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 2; /* Assure que la barre de menu est au-dessus du fond */
}

.menu-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

/* Boutons du menu */
.v-app-bar .v-btn {
  font-size: 1.1rem;
  font-weight: 700;
  padding: 10px 20px;
  margin: 0 10px;
}

.active-link {
  font-weight: 700;
  color: white !important;
}

.menu-btn {
  font-size: 1.1rem;
  font-weight: 700;
  padding: 8px 12px;
  transition: all 0.3s ease-in-out;
  flex-grow: 1;
  min-width: 120px;
}

@media (max-width: 1024px) {
  .menu-btn {
    font-size: 1rem;
    padding: 6px 10px;
    min-width: 90px;
  }

  .splash-logo {
    width: 90%;
    max-width: 500px;
  }
}

@media (max-width: 768px) {
  .menu-btn {
    font-size: 0.9rem;
    padding: 5px 8px;
    min-width: 70px;
  }

  .splash-logo {
    width: 95%;
    max-width: 400px;
  }

  .password-container {
    max-width: 250px;
  }
}

@media (max-width: 600px) {
  .menu-btn {
    font-size: 0.8rem;
    padding: 4px 6px;
    min-width: 60px;
  }

  .splash-logo {
    width: 100%;
    max-width: 320px;
  }

  .password-container {
    max-width: 200px;
  }
}

.active-link {
  font-size: 1.2rem !important;
  font-weight: 700;
  color: white !important;
}

.v-menu {
  margin-left: 10px;
}

/* S'assurer que le footer est au-dessus du fond */
.v-footer {
  position: relative;
  z-index: 2;
}

/* S'assurer que le navigation drawer est au-dessus du fond */
.v-navigation-drawer {
  z-index: 3;
}
</style>
