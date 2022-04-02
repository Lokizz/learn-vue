// * 1. 定义路由组件（或从其他文件导入）
const Home = {
  data() {
    return {
      test: 'test content'
    }
  }, 
  template: `<div>Home</div>`,
  mounted() {
  console.log('Mounted')
  // console.log(`Router: ${this.$router}`)    
  // console.log(`Route: ${this.$route}`)    
  }
}
const About = { template: `<div>This is About</div>`}

// * 2. 定义一些路由
// 每个路由都需要映射到一个组件
const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/about',
    component: About
  }
]

// * 3. 创建路由实例并传递 `routes` 配置
const router = VueRouter.createRouter({  // 创建路由实例
  // * 4. 内部提供了 history 模式的实现
  // 创建一个 hash 历史记录 => URL 后面添加 #
  history: VueRouter.createWebHashHistory(),
  // 应用上面的设置
  routes
})

// * 5. 创建并挂载根实例
const app = Vue.createApp({})
// 确保 _use_ 路由实例使整个应用支持路由
app.use(router)

app.mount('#app')