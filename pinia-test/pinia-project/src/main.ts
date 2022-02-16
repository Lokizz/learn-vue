import { createApp } from 'vue'
import App from './App.vue'
// 导入 Pinia 
import { createPinia } from 'pinia'

// 创建 pinia 实例
const pinia = createPinia()
const app = createApp(App)
// 挂载到 Vue 实例上
app.use(pinia)
app.mount('#app')
