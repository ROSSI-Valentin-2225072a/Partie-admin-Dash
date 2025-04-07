<!-- App.vue -->
<template>
  <v-app>
    <!-- Fond global avec éléments vectoriels -->
    <div class="global-background">
      <img src="/Elements_Vectoriels.png" class="svg-deco top-right" alt="">
      <img src="/Elements_Vectoriels.png" class="svg-deco bottom-left" alt="">
      
    </div>

    
    <!-- Écran de démarrage -->
    <div 
      v-if="showSplash" 
      class="splash-screen" 
      @click="handleSplashClick"
      @keydown="handleSplashClick"
      tabindex="0"
    >
      <div class="logo-container">
        <img src="/logo-ISIS-horizontal-BLANC-HD.png" alt="Logo" class="splash-logo">
      </div>
      <div class="click-instruction">Cliquez ou appuyez sur n'importe quelle touche pour continuer</div>
    </div>

    <!-- Application principale (votre code existant) -->
    <template v-else>
      <!-- Barre de navigation -->
      <v-app-bar app color="#9059a0" density="comfortable" class="menu-bar">
        <!-- Logo -->
        <v-img src="/logoSblanc.png" alt="Logo" max-height="40" max-width="100"></v-img>

        <v-spacer></v-spacer>

        <!-- Boutons du menu (uniquement visibles pour desktop et mobile) -->
        <template v-for="(item, index) in visibleMenuItems" :key="item.to">
          <v-btn 
            :to="item.to" 
            :class="{ 'active-link': $route.path === item.to }"
            class="menu-btn"
          >
            {{ item.label }}
          </v-btn>
        </template>

        <!-- Menu déroulant pour les éléments cachés -->
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

        <!-- Menu hamburger en mode mobile -->
        <template v-if="isMobile">
          <v-btn icon @click="drawer = !drawer">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
      </v-app-bar>

      <!-- Icône de la porte en haut à droite -->
      <v-btn
        id="menu-droite"
        icon
        @mouseover="doorOpen = true"
        @mouseleave="doorOpen = false"
        @click="goToDeconnect"
      >
        <v-icon>{{ doorOpen ? 'mdi-door-open' : 'mdi-door' }}</v-icon>
      </v-btn>

      <!-- Menu latéral mobile -->
      <v-navigation-drawer v-model="drawer" temporary>
        <v-list>
          <v-list-item v-for="item in menuItems" :key="item.to" :to="item.to">
            <v-list-item-title>{{ item.label }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

      <!-- Contenu principal -->
      <v-main>
        <v-container class="page">
          <RouterView />
        </v-container>
      </v-main>

      <!-- Footer -->
      <v-footer color="#9059a0">
        <div>
          {{ new Date().getFullYear() }} — <strong>Revalox</strong>
        </div>
      </v-footer>
    </template>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();


// État pour l'écran de démarrage
const showSplash = ref(true);

const handleSplashClick = () => {
  showSplash.value = false;
  // Rediriger vers la page d'événements
  router.push('/');
};

const menuItems = [
  { label: "Événement", to: "/PageEvenement" },
  { label: "Citations", to: "/PageCitations" },
  { label: "Photos", to: "/PagePhotos" },
  { label: "Anniversaires", to: "/PageAnniversaires" },
  { label: "Statistiques", to: "/PageStat" }
];

const drawer = ref(false);
const screenWidth = ref(window.innerWidth);
const maxVisibleButtons = ref(4); // Max boutons visibles avant "..."

const doorOpen = ref(false);
const toggleDoor = () => {
  doorOpen.value = !doorOpen.value;
};

const goToDeconnect = () => {
  window.location.href = '/PageDeconnect';
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
  
  // Ajouter un événement global pour le clic de souris
  window.addEventListener('click', handleSplashClick, { once: true });
  
  // Ajouter un événement global pour n'importe quelle touche
  window.addEventListener('keydown', (e) => {
    if (showSplash.value) {
      handleSplashClick();
    }
  }, { once: true });
  
  // Focus sur l'élément splash pour capturer les événements clavier
  if (showSplash.value) {
    document.querySelector('.splash-screen')?.focus();
  }
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
  cursor: pointer;
  outline: none; /* Supprime le contour de focus */
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 800px;
  padding: 0 20px;
}

.splash-logo {
  width: 80%;
  max-width: 600px;
  height: auto;
  animation: fadeIn 1.5s ease-in-out;
}

.click-instruction {
  color: white;
  margin-top: 30px;
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