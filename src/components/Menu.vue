<template>
  <div class='bg-gray-900 opacity-95 w-full h-full fixed z-30'>
    <WinText v-if='mode===MenuType.WIN' class='w-full relative' />
    <div class='w-70 sm:w-60 relative mx-auto'>
      <button ref='resumeButton' type='button' v-if='mode===MenuType.GENERAL'
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
  import type { PropType } from 'vue'
  import { defineAsyncComponent, defineEmit, defineProps, ref } from 'vue'
  import { MenuType } from '@/types'
  import { tryOnMounted } from '@vueuse/core'

  const WinText = defineAsyncComponent(() => import('@/components/WinText.vue'))

  const emit = defineEmit(['resume', 'restart', 'toMenu', 'toHome'])

  const props = defineProps({
    mode: {
      type: String as PropType<MenuType>,
      required: false,
      default: MenuType.GENERAL
    }
  })

  const resumeButton = ref<HTMLButtonElement>({} as HTMLButtonElement)

  tryOnMounted(() => {
    if (props.mode === MenuType.GENERAL) {
      resumeButton.value.focus()
    }
  })
</script>