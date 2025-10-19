import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './app.vue'
import './assets/styles/tailwind.css'

// 创建 Vue 应用实例
const app = createApp(App)
const pinia = createPinia()
app.use(pinia)

// 挂载应用到 DOM
app.mount('#app')