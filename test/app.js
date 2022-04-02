const app = Vue.createApp({
  data(){
    return {

    }
  }
})

app.component('todoButton', {
  template: `
    <li>
      <slot></slot>
    </li>
  `
})

app.mount('#app')