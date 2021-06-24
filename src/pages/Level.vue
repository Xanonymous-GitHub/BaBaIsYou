<template>
  <div class='flex
        h-full
        justify-center
        relative
        bg-gray-900'>
    <div class='card-container w-4/5 relative mx-auto my-auto'>
      <button v-for='(level, i) of levels' :key='i' type='button'
              class='w-25 h-10 py-1 px-2 sm:(py-2 px-4) flex justify-center items-center bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg'
              @click.stop.prevent='startGame(level)'>
        {{ level.name }}
      </button>
    </div>
  </div>
</template>

<script setup lang='ts'>
  import { useRouter } from 'vue-router'
  import levels from '@/assets/levels'
  import type { Level } from '@/assets/levels'
  import { useGlobalState } from '@/store'

  const router = useRouter()
  const globalState = useGlobalState()

  const startGame = async (level: Level) => {
    globalState.value.currentLevel = level
    await router.push({ name: 'Game' })
  }
</script>

<style lang='scss' scoped>
  .card-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 6.5rem), 1fr));
    grid-template-rows: auto;
    justify-items: center;
    gap: 1.5rem;
    padding: 1.5rem;
  }
</style>