// Revue components usage

// ? 创建实例
const app = Vue.createApp({
  data() {
    return {
      inputText: "",
      list: [],
      editing: null,
      editingText: '',
      show: 'all',
    }
  },
  methods: {
    // ? 改变显示的状态 
    changeShow(showStatus) {
      this.show = showStatus
    },
    // ? 删除
    deleteHandler(item) {
      // * 使用 item，直接返回一个新的数组
      this.list = this.list.filter((target) => {
        return target != item
      })
      // * 偷懒做法
      // ! 如果存在筛选功能，则不能使用 idx 来作为判别元素的依据
      // this.list.splice(idx, 1)
    },
    // ? 修改
    editHandler(item) {
      // 保存修改的项目所在
      this.editing = item
    },
    // ? 修改-确认
    completeHandler(value) {
      // 点击完成以后再确定修改对应子项的值
      this.editing.content = value
    },
    // ? 修改-取消
    cancelHandler() {
      this.editing = null
    },
    changeHandler(item, value) {
      item.status = value
    },
    inputHandler() {
      this.list.push({
        timestamp: new Date().getTime(),
        status: false,
        content: this.inputText
      })
      this.inputText = ''
    },
    inputHandler2(value) {
      this.list.push({
        timestamp: new Date().getTime(),
        status: false,
        content: value
      })
    }
  },
  computed: {
    filterList() {
      // all, incomplete, done
      if(this.show === 'all') {
        return this.list
      } else if (this.show === 'incomplete') {
        return this.list.filter(item => {
          return item.status === false
        })
      } else if (this.show === 'done') {
        return this.list.filter (item => {
          return item.status === true
        })
      } else {
        return []
      }
    }
  }
})

// * 组件1：筛选
app.component('filterComponent', {  // 定义组件名称
  // ! vue2 时注意，不能使用对象的形式，否则所有实例都会指向同一个内存地址
  data() {
    return {
      buttonList: [
        {text: '全部', value: 'all'},
        {text: '未完成', value: 'incomplete'},
        {text: '完成', value: 'done'},
      ],
    }
  },
  template: `
    <p>
      <button v-for="button of buttonList" :key="button.value" @click="$emit('showFilter',  button.value)">{{ button.text }}</button>
    </p>
  `
})

// * 组件2：输入
// ? 从外到内 - input 的数据交由父组件管理（决定是否要把数据给特定组件）
app.component('inputComponent', {
  props: ['modelValue'],
  emits: ['update:modelValue', 'customInput'],
  data() {
    return {
      compositionStatus: false,
    }
  },
  methods: {
    cstartHandler() {
      this.compositionStatus = true
    },
    cendHandler() {
      this.compositionStatus = false
    },
    // ? 添加
    inputHandler() {
      // ! 应对可能存在中文输入的情况
      if (this.compositionStatus === true || this.inputText === '') return false
      
      this.$emit('customInput')
    },
  },
  template: `
    <p>
      <input type="text"
      :value="modelValue" 
      @input="$emit('update:modelValue', $event.target.value)"
      @compositionstart="cstartHandler" 
      @compositionend="cendHandler" 
      @keyup.enter="inputHandler">
    </p>
  `
})

// ? 从内到外 - input 的数据交由子组件管理（父组件决定是否要展示子组件）
app.component('inputComponent2', {
  props: ['modelValue'],
  emits: ['update:modelValue', 'customInput'],
  data() {
    return {
      inputText: '',
      compositionStatus: false,
    }
  },
  methods: {
    cstartHandler() {
      this.compositionStatus = true
    },
    cendHandler() {
      this.compositionStatus = false
    },
    // ? 添加
    inputHandler() {
      // ! 应对可能存在中文输入的情况
      if (this.compositionStatus === true || this.inputText === '') return false
      
      this.$emit('customInput', this.inputText)
      this.inputText = ''
    },
  },
  template: `
    <p>
      <input type="text"
        v-model="inputText"
        @compositionstart="cstartHandler" 
        @compositionend="cendHandler" 
        @keyup.enter="inputHandler">
    </p>
  `
})

// * 组件3：列表
app.component('list-item-component', {
  data() {
    return {
      editingText: '',
    }
  },
  props: ['item', 'editing'],
  template: `
    <li>
      <template v-if="editing === item">
        <input type="text" v-model="editingText">
        <button @click="completeHandler">完成</button>
        <button @click="cancelHandler">取消</button>
      </template>
      <template v-else>
        <!-- ? 是否完成 -->
        <input type="checkbox" v-model="status">
        {{ item.content }}
        <button @click="editHandler(item)">修改</button>
        <button @click="deleteHandler(item)">删除</button>
      </template>
    </li>
  `,
  methods: {
    // ? 删除
    deleteHandler(item) {
      this.$emit('delete', item)
    },
    // ? 修改
    editHandler(item) {
      this.$emit('edit', item)
      // 先定义一个中间值缓存输入的修改内容
      this.editingText = item.content
    },
    // ? 修改-确认
    completeHandler() {

      this.$emit('complete', this.editingText)
      // 点击完成以后再确定修改对应子项的值
      // this.editing.content = this.editingText
      this.cancelHandler()
    },
    // ? 修改-取消
    cancelHandler() {
      this.editingText = ''
      this.$emit('cancel')
    },
  },
  computed: {
    status: {
      get() {
        return this.item.status
      },
      set(value) {
        // 修改时通知外面修改数据，而不是直接修改数据
        this.$emit('change', this.item, value)
      }
    }
  }
})


// ? 挂载的对应实例上
app.mount('#app')  