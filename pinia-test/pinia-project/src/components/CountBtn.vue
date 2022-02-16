<script lang="ts" setup>
  // ! 获取 mainStore 实例
  import { mainStore } from "../store/index"
  const store = mainStore()
  
  function clickHandler() {
    store.count++
  }

  // ? 批量修改多个状态数据
  // 方法一：使用 $patch 方法
  const clickByPatch = () => {
    store.$patch({
      count: store.count + 2,
      helloWorld: store.helloWorld === 'From Pinia: Hello World!' ? 'Hello world changed!' : 'From Pinia: Hello World!'
    })
  }

  // 方法二：使用 $patch 加函数方法 - 可添加业务逻辑
  const clickByPatchMethod = () => {
    store.$patch(state => {
      state.count++
      state.helloWorld = 'Hello world changed!'
    })
  }

  // 方法三：使用 actions 定义具体方法 - 适用更复杂的业务场景
  const clickByActions = () => {
    store.changeState()
  }

  // ? 测试 getters 
  const changePhone = () => {
    store.phone = 12344445555
  }

  // ? 测试 Store 的互相调用
  const getList = () => {
    store.getListOutside()
  }
</script>

<template>
  <div>
    <h2>{{ store.helloWorld }}</h2>
    <p>{{ store.count }}</p>
    <button @click="clickHandler">修改状态数据（1）</button>
    <button @click="clickByPatch">批量修改状态数据（2-$patch）</button>
    <button @click="clickByPatchMethod">修改状态数据（3-$patch+func）</button>
    <button @click="clickByActions">修改状态数据（4-actions）</button>
    <hr>
    <h2>监测电话号码</h2>
    <p>{{ store.phoneHidden }}</p>
    <button @click="changePhone">改变电话</button>
    <hr>
    <h2>Store 的互相调用</h2>
    <button @click="getList">获取其他状态容器的数据</button>
  </div>
</template>

<style></style>
