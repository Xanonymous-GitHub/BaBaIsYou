import { createApp } from 'vue'
import App from './App.vue'
import { router } from '@/router'
import './assets/scss/app.scss'
import 'virtual:windi.css'

/**
* @summary
 * Only import this for fun, hope I can use it in future.
* */
import 'uno.css'

createApp(App)
  .use(router)
  .mount('#app')
