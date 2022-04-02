<template>
  <div>
    reactive: {{ msg }}
    reactive: {{ obj }}
  </div>
</template>

<script lang="ts" setup>
import { reactive, readonly } from 'vue'

let msg = reactive<O>({
  list: []
})

let obj = reactive<any>({
})

type O = {
  list: number[]
}

// ? 异步操作中的直接赋值无法响应更新
setTimeout(() => {
  msg.list = [1,2,3,4]
  obj = {
    name: 'loki'
  }
},0)

let obj1 = {
  name: 'john',
  age: 30
}

let copy = readonly(obj1)
// ? 无法修改
// copy.name = 'new john'
</script>

<style scoped>

</style>