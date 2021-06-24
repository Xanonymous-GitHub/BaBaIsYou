<template>
  <div class='bg-gray-900 opacity-95 w-full h-full fixed z-30'>
    <div class='w-70 sm:w-60 relative top-15/100 mx-auto'>
      <button ref='resumeButton' type='button'
              class='opacity-100 my-10 py-1 px-2 sm:(py-2 px-4) flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg '
              @click.prevent.stop='emit("resume")'>
        RESUME
      </button>
      <button ref='restartButton' type='button'
              class='opacity-100 my-10 py-1 px-2 sm:(py-2 px-4) flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg '
              @click.prevent.stop='emit("restart")'>
        RESTART
      </button>
      <button ref='toMenuButton' type='button'
              class='opacity-100 my-10 py-1 px-2 sm:(py-2 px-4) flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg '
              @click.prevent.stop='emit("toMenu")'>
        RETURN TO MENU
      </button>
      <button ref='toHomeButton' type='button'
              class='opacity-100 my-10 py-1 px-2 sm:(py-2 px-4) flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg '
              @click.prevent.stop='emit("toHome")'>
        RETURN TO HOME
      </button>
    </div>
  </div>
</template>

<script setup lang='ts'>
  import { defineEmit, ref } from 'vue'
  import { tryOnMounted } from '@vueuse/core'

  const emit = defineEmit(['resume', 'restart', 'toMenu', 'toHome'])

  const resumeButton = ref<HTMLButtonElement>({} as HTMLButtonElement)

  const restartButton = ref<HTMLButtonElement>({} as HTMLButtonElement)

  const toMenuButton = ref<HTMLButtonElement>({} as HTMLButtonElement)

  const toHomeButton = ref<HTMLButtonElement>({} as HTMLButtonElement)

  tryOnMounted(() => {
    resumeButton.value.focus()
  })
</script>