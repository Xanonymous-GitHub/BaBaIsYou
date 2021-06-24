import { createGlobalState, useSessionStorage } from '@vueuse/core'
import type { Level } from '@/assets/levels'

export interface GlobalStorage {
  currentLevel: Level
}

const globalStorage: GlobalStorage = {
  currentLevel: {
    name: '',
    setupFileName: ''
  }
}

export const useGlobalState = createGlobalState(
  () => useSessionStorage('Babaisyou-storage', globalStorage)
)