<template>
  <router-view v-slot='{ Component, route }'>
    <main :id='route.name' class='h-full bg-white'>
      <component :is='Component' />
    </main>
  </router-view>
</template>
