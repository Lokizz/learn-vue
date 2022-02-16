import { defineStore } from 'pinia'

export const anotherStore = defineStore('oneMoreStore', {
  state: () => {
    return {
      list: [
        'Loki',
        'Pinky',
        'Eric',
        'Abby'
      ]
    }
  }
})