import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useQuoteStore = defineStore('quote', () => {
  const nextQuote = ref(null)

  function setNextPhoto(photo) {
    nextQuote.value = photo
  }

  return { nextQuote, setNextPhoto }
}, {
  persist: true
})
