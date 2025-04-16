import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEventStore = defineStore('photo', () => {
  const nextEvent = ref(null)

  function setNextEvent(event) {
    nextEvent.value = event
  }

  return { nextEvent, setNextEvent }
}, {
  persist: true
})
