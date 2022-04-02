<template>
  <div>
    <p>ref: {{ msg }}</p>
    
    <p>shallowRef: {{ shallowMsg }}</p>

    <p>
      <button @click="changeMsg">Change</button>
      <button @click="changeShallowMsg">Change</button>
    </p>
  </div>

</template>

<script lang="ts" setup>
import { ref, shallowRef, triggerRef } from 'vue'

const msg = ref<string>('hello vue')
const shallowMsg = shallowRef<any>({
  name: 'loki'
})

let changeMsg = () => {
  msg.value = 'new vue'
}

let changeShallowMsg = () => {
  //  ? ref 对象的更新也会触发 shallowRef 的更新
  msg.value = 'modified in func'
  shallowMsg.value.name = 'pinky'
  // ? 强制触发 shallowRef 更新
  // triggerRef(shallowMsg)
}

</script>

<style scoped>

</style>