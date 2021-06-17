<template>
  <router-view v-slot='{ Component, route }'>
    <main :id='route.name' class='h-full bg-white'>
      <transition name='fade' mode='out-in'>
        <component :is='Component' />
      </transition>
    </main>
  </router-view>
</template>
