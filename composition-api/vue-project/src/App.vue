<template>
  <div class="container">
    <!-- ? 模板中获取 ref 对象的值无需使用 value 属性 -->
    <p>Name: {{ name }}</p>
    <p>
      Age: 
      <button @click="changeAge(-1)">-</button>
      {{ age }} 
      <button @click="changeAge(1)">+</button>
    </p>
    
    <p>
      Year: 
      <button @click="changeYear(-1)">-</button>
      {{ year }} 
      <button @click="changeYear(1)">+</button>
    </p>
  </div>
</template>

<script setup>
import { ref, computed, reactive, toRefs } from 'vue'

// // * 1. 使用 `ref` 设置一个响应式对象
// // 需要 .value 获取具体的值
// const name = ref('loki')
// const age = ref(30)
// // * 2. 使用 `computed` 定义一个计算属性
// const year = computed({  // ? 如果需要可以属性同时可读写，需要传入对象
//   get: () => 2022 - age.value,
//   // year 的值被修改的时候同步修改 age 的值
//   set: val => age.value = 2022 - val
// })

function changeAge(val) {
  age.value += val
}
function changeYear(val) {
  year.value += val
}

// * 3. reactive 响应式对象
const data = reactive({
  name: 'loki',
  age: 18,
  year: computed({  // 可直接在内部定义计算属性
    get: () => {
      return 2022 - data.age  // 获取对象内的其他属性值
    },
    set: val => {
      data.age = 2022 - val
    }
  })
})

const { name, age, year } = toRefs(data)
</script>


<style>

</style>
