<template>
  <main id="battle-layer" ref="battleLayer"
        class="
        h-screen
        flex
        justify-center
        align-middle
        bg-gray-900">

  </main>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue'
import gameConcrete from '../core'

export default defineComponent({
  name: "BattleLayer",
  setup() {
    const battleLayer = ref<HTMLElement>({} as HTMLElement)

    onMounted(() => {
      battleLayer.value.appendChild(
          gameConcrete
      )
    })

    return {
      battleLayer
    }
  }
})
</script>
