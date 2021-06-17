<template>
  <router-view v-slot='{ Component, route }'>
    <main :id='route.name' class='h-full bg-white'>
      <transition name='fade' mode='out-in'>
        <keep-alive>
          <component :is='Component' />
        </keep-alive>
      </transition>
    </main>
  </router-view>
</template>
