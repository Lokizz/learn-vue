<template>
  <div class="container">
    <h2>绑定数据</h2>
    <p>{{ msg }}</p>
    <p>绑定对象：<br>{{ user.name }} -- {{ user.age }}</p>

    <h2>绑定属性</h2>
    <h3>普通属性绑定</h3>
    <img :src="imgSrc" alt="via.placeholder.com">
    <h3>动态属性绑定</h3>
    <!-- 动态属性值为静态数据时需要添加一对引号 -->
    <a :[myHref]="'http://www.baidu.com'">跳转到百度</a>

    <h2>遍历</h2>
    <h3>遍历数组</h3>
    <h3>v-for 在 Vue3 规定必须带有 :key 属性绑定，且可以嵌套遍历。</h3>
    <ul>
      <li v-for="(item, idx) in myList" :key="idx">Item{{ item }}</li>
    </ul>
    <h3>遍历对象</h3>
    <ul>
      <li v-for="(val, key) in myObj" :key="key">{{ val }}: {{ key }}</li>
    </ul>
  </div>
</template>

<script>
export default({
  data(){
    return {
      msg: 'Hello world.',
      user: {
        name: 'John',
        age: '23',
      },
      imgSrc: 'https://via.placeholder.com/200',
      myHref: 'href',
      myLink: 'http://www.baidu.com',
      myList: ['a', 'b', 'c', 'd', 'e'],
      myObj: {
        name: 'loki',
        age: 30,
        sex: 'male'
      }
    }
  }
})
</script>

<style src="../style.css">
</style>