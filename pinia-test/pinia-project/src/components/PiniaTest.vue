<script lang="ts" setup> 
  // 导入并获得 store 实例
  import { mainStore } from '../store/index'
  const store = mainStore()
</script>

<template>
  <h2 class="">{{ store.helloWorld }}</h2>
</template>

<style></style>