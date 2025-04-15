<template>
  <div class="quote-box">
    <p class="quote-text">
      {{ quoteStore.nextQuote }}
    </p>
  </div>
</template>

<script setup>

import { useQuoteStore } from "@/stores/quoteStore";

const quoteStore = useQuoteStore();

</script>

<style scoped>
.quote-box {
  background-color: white;
  color: #2f2769;
  border-radius: 10px;
  padding: 16px 24px;
  width: 350px;
  height: 200px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.quote-text {
  font-style: italic;
  font-size: 1.2rem;
  color: #2f2769;
  margin-bottom: 10px;
}

.quote-author {
  text-align: right;
  font-weight: bold;
  color: #2f2769;
}
</style>
