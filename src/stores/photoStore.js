import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePhotoStore = defineStore('photo', () => {
  const nextPhoto = ref(null)

  function setNextPhoto(photo) {
    nextPhoto.value = photo
  }

  return { nextPhoto, setNextPhoto }
}, {
  persist: true
})
