import { defineStore } from "pinia";

export const testStore = defineStore("test", {
  state: () => ({
    testMsg: "this is msg from test store, NOT the MAIN store",
  }),
  getters: {},
  actions: {},
});
