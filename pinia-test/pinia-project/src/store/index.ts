/*
此文件一般只做三件事：
1. 定义状态容器；
2. 修改容器中的 state；
3. 仓库中的 action 的使用
*/

import { defineStore } from 'pinia'
// ? Store 的互相调用
import { anotherStore } from './anotherState'

// 导出状态容器
export const mainStore = defineStore('main', {
  // state 属性用于储存全局状态
  state: () => {
    return {
      helloWorld: 'From Pinia: Hello World!',
      count: 0,
      phone: 13655558888
    }
  },
  // getters 属性用于监视状态的变化，具有缓存功能
  getters: {
    phoneHidden(state) {
      console.log('getters 具有缓存特性')
      return state.phone.toString().replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')
    }
  },
  // actions 属性用于修改全局状态数据
  actions: {
    changeState() {
      this.count++
      this.helloWorld = this.helloWorld === 'From Pinia: Hello World!' ? 'Hello world changed!' : 'From Pinia: Hello World!'
    },
    getListOutside() {
      console.log(anotherStore().list)
    }
  }
})