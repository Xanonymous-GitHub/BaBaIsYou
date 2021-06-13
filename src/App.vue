<template>
  <router-view v-slot='{ Component, route }'>
    <main :id='route.name'>
      <transition name='fade' mode='out-in'>
        <keep-alive>
          <component :is='Component' />
        </keep-alive>
      </transition>
    </main>
  </router-view>
</template>
