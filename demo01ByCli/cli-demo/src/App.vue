<template>
  <div>
    <!-- day2 数据绑定与遍历 -->
    <!-- <data-binding></data-binding> -->
    <!-- day3 事件与模板语法 -->
    <evt-and-tpl></evt-and-tpl> 
  </div>
</template>

<script>
// import dataBinding from './components/day2_dataBinding.vue'
import evtAndTpl from './components/day3_evtAndTpl.vue'
// ! 默认通过这个语句来暴露模块
export default {
  components: {
    // dataBinding,
    evtAndTpl,
  },
  // 定义页面数据
  data() {
    // return {
    //   msg: 'Hello world.',
    //   user: {
    //     name: 'John',
    //     age: '23',
    //   },
    //   imgSrc: 'https://via.placeholder.com/200',
    //   myHref: 'href',
    //   myLink: 'http://www.baidu.com',
    //   myList: ['a', 'b', 'c', 'd', 'e'],
    //   myObj: {
    //     name: 'loki',
    //     age: 30,
    //     sex: 'male'
    //   }
    // }
  }
}
</script>

<style>
  .container {
    width: 90vw;
    margin: 0 auto;
  }

  .container > h2:not(h2:first-child) {
    border-top: 1px solid lavender;
    margin-top: 2rem;
    padding-top: 2rem;
  }

  h2 {
    color: lightcoral;
    text-align: center;
  }

  h2 ~ h3 {
    color: red;
    text-align: center;
  }
</style>