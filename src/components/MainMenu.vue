<template>
  <div class='bg-gray-900 opacity-95 w-full h-full fixed z-30'>
    <WinText v-if='mode===MenuType.WIN' class='w-full relative' />
    <p v-if='mode===MenuType.RESTART' class='my-30 w-full text-white font-extrabold text-xl md:text-3xl text-center'>
      ARE YOU SURE YOU WANT TO RESTART?
    </p>
    <div class='w-70 sm:w-60 relative mx-auto'>
      <button
        v-show='mode!==MenuType.WIN' ref='resumeButton'
        class='opacity-100 my-10 py-1 px-2 sm:(py-2 px-4) flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg '
        type='button'
        @click.prevent.stop='emit("resume")'>
        {{ mode !== MenuType.RESTART ? 'RESUME' : 'No' }}
      </button>
      <button
        class='opacity-100 my-10 py-1 px-2 sm:(py-2 px-4) flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg '
        type='button'
        @click.prevent.stop='emit("restart")'>
        {{ mode !== MenuType.RESTART ? 'RESTART' : 'Yes' }}
      </button>
      <button
        v-show='mode!==MenuType.RESTART'
        class='opacity-100 my-10 py-1 px-2 sm:(py-2 px-4) flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg '
        type='button'
        @click.prevent.stop='emit("toMenu")'>
        RETURN TO MENU
      </button>
      <button
        v-show='mode!==MenuType.RESTART'
        class='opacity-100 my-10 py-1 px-2 sm:(py-2 px-4) flex justify-center items-center bg-green-500 hover:bg-green-600 focus:ring-green-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg '
        type='button'
        @click.prevent.stop='emit("toHome")'>
        RETURN TO HOME
      </button>
    </div>
  </div>
</template>

<script lang='ts' setup>
  import type { PropType } from 'vue'
  import { defineAsyncComponent, ref } from 'vue'
  import { MenuType } from '@/types'
  import { tryOnMounted } from '@vueuse/core'

  const WinText = defineAsyncComponent(() => import('@/components/WinText.vue'))

  const emit = defineEmits(['resume', 'restart', 'toMenu', 'toHome'])

  const props = defineProps({
    mode: {
      type: String as PropType<MenuType>,
      required: false,
      default: MenuType.GENERAL
    }
  })

  const resumeButton = ref<HTMLButtonElement>({} as HTMLButtonElement)

  tryOnMounted(() => {
    if (props.mode !== MenuType.WIN) {
      resumeButton.value.focus()
    }
  })
</script>
