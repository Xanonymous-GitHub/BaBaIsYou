<template>
  <div class='bg-[#080808] h-full'>
    <div class='absolute bg-white h-full w-full opacity-70 animation-bg'
         :style="{backgroundImage:`url('${animationBg}')`}"
    />
    <header class='w-10/12 sm:w-9/12 lg:w-8/12 xl:w-7/12 2xl:w-6/12 h-auto relative header-img mx-auto'>
      <img :src='babaBackgroundUrl' alt='' loading='lazy' class='w-full'>
    </header>
    <div class='w-30 sm:w-40 relative top-15/100 mx-auto'>
      <router-link :to='{name: "Game"}'>
        <button type='button'
                class='my-10 py-1 px-2 sm:(py-2 px-4) flex justify-center items-center bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg '>
          Start
        </button>
      </router-link>
      <a href='https://babaiswiki.fandom.com/wiki/Baba_Is_You_Wiki' target='_blank' rel='noreferrer noopener'>
        <button type='button'
                class='my-10 py-1 px-2 sm:(py-2 px-4) flex justify-center items-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg '>
          Wiki
        </button>
      </a>
    </div>
    <footer class='bottom-5 absolute w-full select-none cursor-default'>
      <p class='text-white text-center font-extrabold'>
        Origin game by ARVI TEIKARI
      </p>
      <p class='text-white text-center font-extrabold'>
        Re-implemented by Xanonymous & Ricky
      </p>
    </footer>
  </div>
</template>

<script setup lang='ts'>
  import babaBackgroundUrl from '@/assets/images/BaBaIsYou.png'
  import animationBg from '@/assets/images/animation-bg.webp'
</script>

<style lang='scss' scoped>
  .header-img {
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    top: 5%;
  }

  .animation-bg {

  }
</style>