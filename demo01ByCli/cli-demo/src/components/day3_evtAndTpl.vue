<template>
  <div class="container">
    <h2>事件入门</h2>
    <p>{{ msg }}</p>
    <button @click="changeMsg">点击更改信息</button>

    <h2>v-bind 绑定 class</h2>
    <p :class="infoStyle">text in red.</p>
    <button @click="setClass">点击更改绑定样式</button>

    <h2>class 绑定多个动态属性</h2>
    <h3>使用对象绑定多个</h3>
    <p :class="{'danger': isActive, 'grow': isGrow}">text in red.</p>
    <h3>使用数组绑定多个</h3>
    <p :class="[dangerClass, growClass]">text in red.</p>
    <h3>v-for 与逻辑判断添加 class</h3>
    <p v-for="(item, idx) in itemList" :key="idx" :class="{'danger': item.indexOf('danger') != -1, 'pass': item.indexOf('pass') != -1, 'grow': item.indexOf('grow') != -1}">
      {{ idx }}: {{ item }}
    </p>

    <h2>获取事件与 DOM 操作</h2>
    <h3>$event 与 $event.srcElement - 获取事件及所在元素</h3>
    <button @click="evtFn($event)">点击获取事件以及所在元素</button>

    <h3>事件一次执行多个回调函数</h3>
    <button @click="changeMsg(), setClass()">同时更改绑定样式和更改信息</button>

    <h3>事件修饰符</h3>
    <p><a @click.prevent="" href="http:www.baidu.com" target="_blank">跳转链接（会被阻止）</a></p>

    <h3>按键修饰符</h3>
    <p>常用的按键的别名，不需要使用 keycode 进行获取。</p>
    <!-- 只有点击别名对应按键才会触发回调函数 -->
    <input type="text" @keyup.enter="enterDown($event)">
  </div>
</template>

<script>
  export default({
    data() {
      return {
        msg: 'hello vue',
        infoStyle: '',
        isActive: true,
        isGrow: true,
        dangerClass: 'danger',
        growClass: 'grow',
        
        itemList: [
          'danger text',
          'pass text',
          'grow text'
        ],
      }
    },
    methods: {
      changeMsg() {
        this.msg = this.msg === 'hello vue' ? 'new vue msg.' : 'hello vue'
      },
      setClass() {
        this.infoStyle = this.infoStyle === 'pass' ? 'danger' : 'pass'
      },
      // ! 获取事件参数时，如果为多个参数，$event 参数在最后
      evtFn(evt) {
        console.log(evt)
        console.log(evt.srcElement)
        evt.srcElement.textContent = '按钮被点击了';

        // ? 阻止默认行为
        // evt.preventDefault()
        // ? 停止冒泡
        // evt.stopPropagation()
      },
      enterDown(evt) {
        console.log('回车被点击了。')
        console.log(evt.code)
      }
    }
  })
</script>

<style src="../style.css">
</style>

<style scoped>
  .danger {
    color: red;
    text-decoration: underline;
    font-weight: bolder;
  }

  .pass {
    color: green;
  }

  .grow {
    font-size: 2rem;
  }
</style>