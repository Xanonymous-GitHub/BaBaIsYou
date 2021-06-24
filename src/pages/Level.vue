<template>
  <div class='flex
        animate-bg
        h-full
        justify-center
        relative
        flex-col
        bg-gray-900'>
    <div class='card-container w-4/5 relative mx-auto my-auto'>
      <button v-for='(level, i) of levels' :key='i' type='button'
              class='w-25 h-10 py-1 px-2 sm:(py-2 px-4) flex justify-center items-center bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg'
              @click.stop.prevent='startGame(level)'>
        {{ level.name }}
      </button>
    </div>
    <button type='button'
            class='relative mx-auto my-10 w-45 h-10 py-1 px-2 sm:(py-2 px-4) flex justify-center items-center bg-white hover:bg-gray-400 text-black transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg'
            @click.stop.prevent='router.push({ name: "Home" })'>
      Back To Home
    </button>
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

  .animate-bg {
    --s: 25vmin;
    --p: calc(var(--s) / 2);
    --c1: #374151;
    --c2: black;
    --c3: #111827;
    --bg: var(--c3);
    --d: 5000ms;
    --e: cubic-bezier(0.76, 0, 0.24, 1);

    background-color: var(--bg);
    background-image: linear-gradient(45deg, var(--c1) 25%, transparent 25%),
    linear-gradient(-45deg, var(--c1) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, var(--c2) 75%),
    linear-gradient(-45deg, transparent 75%, var(--c2) 75%);
    background-size: var(--s) var(--s);
    background-position: calc(var(--p) * 1) calc(var(--p) * 0),
    calc(var(--p) * -1) calc(var(--p) * 1),
    calc(var(--p) * 1) calc(var(--p) * -1),
    calc(var(--p) * -1) calc(var(--p) * 0);
    animation: color var(--d) var(--e) infinite,
    position var(--d) var(--e) infinite;

    @keyframes color {
      0%, 25% {
        --bg: var(--c3);
      }
      26%, 50% {
        --bg: var(--c1);
      }
      51%, 75% {
        --bg: var(--c3);
      }
      76%, 100% {
        --bg: var(--c2);
      }
    }

    @keyframes position {
      0% {
        background-position: calc(var(--p) * 1) calc(var(--p) * 0),
        calc(var(--p) * -1) calc(var(--p) * 1),
        calc(var(--p) * 1) calc(var(--p) * -1),
        calc(var(--p) * -1) calc(var(--p) * 0);
      }
      25% {
        background-position: calc(var(--p) * 1) calc(var(--p) * 4),
        calc(var(--p) * -1) calc(var(--p) * 5),
        calc(var(--p) * 1) calc(var(--p) * 3),
        calc(var(--p) * -1) calc(var(--p) * 4);
      }
      50% {
        background-position: calc(var(--p) * 3) calc(var(--p) * 8),
        calc(var(--p) * -3) calc(var(--p) * 9),
        calc(var(--p) * 2) calc(var(--p) * 7),
        calc(var(--p) * -2) calc(var(--p) * 8);
      }
      75% {
        background-position: calc(var(--p) * 3) calc(var(--p) * 12),
        calc(var(--p) * -3) calc(var(--p) * 13),
        calc(var(--p) * 2) calc(var(--p) * 11),
        calc(var(--p) * -2) calc(var(--p) * 12);
      }
      100% {
        background-position: calc(var(--p) * 5) calc(var(--p) * 16),
        calc(var(--p) * -5) calc(var(--p) * 17),
        calc(var(--p) * 5) calc(var(--p) * 15),
        calc(var(--p) * -5) calc(var(--p) * 16);
      }
    }

    @media (prefers-reduced-motion) {
      animation: none;
    }
  }
</style>