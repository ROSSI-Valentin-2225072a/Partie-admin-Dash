<template>
  <div class="quote-box">
    <h2 class="quote-title">Citation du jour</h2>
    <div class="quote-container">
      <p class="quote-text">
        {{ quoteStore.nextQuote }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useQuoteStore } from "@/stores/quoteStore";
import { onMounted } from "vue";

const quoteStore = useQuoteStore();

onMounted(() => {
  console.log(quoteStore.nextQuote);
});
</script>

<style scoped>
.quote-box {
  width: 350px;
  background-color: white;
  border-radius: 10px;
  padding: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #2f2769;
  font-weight: bold;
}

.quote-title {
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

.quote-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
}

.quote-text {
  font-style: italic;
  font-size: 1.2rem;
  color: #2f2769;
  margin-bottom: 10px;
  line-height: 1.4;
}

</style>
