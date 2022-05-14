<script setup>
import { ref } from "vue";
import { mainStore } from "../store/index";
import { storeToRefs } from "pinia";

const store = mainStore();
const { count } = storeToRefs(store);
// * $patch + 对象
const onObjClick = () => {
  store.$patch({
    count: (store.count += 3),
    msg: "使用了 $patch + 函数进行修改 count+3",
  });
};
// * $patch + 函数
const onFunClick = () => {
  store.$patch((state) => {
    state.count += 4;
    state.msg = "使用了 $patch + 函数进行修改 count+4";
  });
};
// * store.action
const onActionClick = () => {
  console.log("fired");
  store.test();
  store.changeCount();
};
// * 调用 testStore 的数据
const fetchStoreClick = () => {
  store.testData()
}
</script>

<template>
  <h1>{{ store.msg }}</h1>
  <p>{{ count }}</p>
  <p>
    <button @click.stop="onActionClick">使用 store.action 修改 +2</button>
    <button @click.stop="onObjClick">使用 $patch + 对象修改 +3</button>
    <button @click.stop="onFunClick">使用 $patch + 函数修改 +4</button>
  </p>
  <p>store.cachedDate 的执行结果0：{{ store.cachedDate }}</p>
  <p>store.cachedDate 的执行结果1：{{ store.cachedDate }}</p>
  <p>store.cachedDate 的执行结果2：{{ store.cachedDate }}</p>
  <p>store.cachedDate 的执行结果3：{{ store.cachedDate }}</p>
  <p>store.getters 调用的次数：{{ store.callCount }}</p>

  <h3>调用其他 store 文件的数据</h3>
  <p>{{ store.externalMsg }}</p>
  <button @click="fetchStoreClick">
    调用 testStore 的数据
  </button>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
