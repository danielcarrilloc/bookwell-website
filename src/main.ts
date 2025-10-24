import { createApp } from 'vue'
import { MotionPlugin } from '@vueuse/motion'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import './style.css' // optional, if you add global styles

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(MotionPlugin)
app.mount('#app')