import { defineStore } from "pinia";
// * 调用其他 store 文件
import { testStore } from "./test";

export const mainStore = defineStore("main", {
  state: () => ({
    msg: "Pinia Message: Hello!",
    count: 0,
    callCount: 0,
    externalMsg: "",
  }),
  getters: {
    // * 具有缓存属性
    cachedDate() {
      this.callCount++;
      return new Date();
    },
  },
  actions: {
    // ! 调用 testStore 的数据
    testData() {
      this.externalMsg = testStore().testMsg;
    },
    changeCount() {
      console.log("fired");
      this.count += 2;
      this.msg = "使用了 action 中的方法进行了修改 count+2";
    },
  },
});
