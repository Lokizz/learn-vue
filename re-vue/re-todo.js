// * Re Todo List Demo

// ? 创建实例
const app = Vue.createApp({
  data() {
    return {
      list: [
        {
          content: 'one',
          timestamp: new Date().getTime(),
          status: false
        },
        {
          content: 'two',
          timestamp: new Date().getTime(),
          status: true
        },
        {
          content: 'third',
          timestamp: new Date().getTime(),
          status: false
        }
      ],
      show: 'all',
      editing: null,
    }
  },
  methods: {
    inputHandler(value) {
      this.list.push({
        content: value,
        timestamp: new Date().getTime(),
        status: false
      })
    },
    changeShow(value) {
      this.show = value
    },
    // 接受子组件的指定的子项以及对应的完成状态
    changeHandler(item, value) {
      item.status = value
    },
    editHandler(item) {
      this.editing = item
    },
    deleteHandler(item) {
      this.list = this.list.filter(target => {
        return target != item
      })

    },
    completeHandler(value) {
      this.editing.content = value
    },
    cancelHandler() {
      this.editing = null
    }
  },
  computed: {
    filteredList() {
      if (this.show === 'all') {
        return this.list
      } else if (this.show === 'incomplete') {
        return this.list.filter(item => item.status === false)
      } else {
        return this.list.filter(item => item.status === true)
      }
    }
  },
})

// ? 创建组件
// ? 组件1：输入组件
app.component('inputComponent', {
  emits: ['customInput'],
  data() {
    return {
      inputText: '',
    }
  },
  // 定义模块模版
  template: `
    <p>
      <input 
        v-model="inputText" 
        @keyup.enter="inputHandler"
        @compositionstart="csHandler" 
        @compositionend="ceHandler"
      />
    </p>
  `,
  methods: {
    inputHandler() {
      // 如果正在使用输入法，或者输入为空时，不捕获 Enter 事件
      if (this.composition || this.inputText === '') return false

      // 通过 vue 内置的 $emit 方法提交数据到父组件
      this.$emit('customInput', this.inputText)
      // 清空输入内容
      this.inputText = ''
    },

    csHandler() {
      // 为 true 时，说明正在使用输入法
      this.compositionStatus = true
    },

    ceHandler() {
      // 为 false 时，说明已经退出输入发的使用
      this.compositionStatus = false
    }
  }
})

// ? 组件2：筛选组件
app.component('filterComponent', {
  emits: ['showFilter'],
  data() {
    return {
      buttonList: [
        {text: '全部', value: 'all'},
        {text: '未完成', value: 'incomplete'},
        {text: '完成', value: 'done'},
      ]
    }
  },
  template: `
    <p>
      <button 
        v-for="button of buttonList" :key="button.value"
        @click="$emit('showFilter', button.value)"
      >{{ button.text }}</button>
    </p>
  `,
})

// ? 组件3：列表渲染组件
app.component('listItemComponent', {
  props: ['item', 'editing'],
  emits: ['change', 'edit', 'delete', 'complete', 'cancel'],
  data() {
    return {
      editingText: ''
    }
  },
  methods: {
    editHandler(item) {
      console.log('component edit fired')
      console.log(this.editing === this.item)
      this.$emit('edit', item)
      this.editingText = item.content
    },
    deleteHandler(item) {
      let isConfirmed = confirm("Are you sure you want to delete?")
      if (isConfirmed) {
        this.$emit('delete', item)
      }
    },
    completeHandler() {
      this.$emit('complete', this.editingText)
      this.cancelHandler()
    },
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

      // 通知父组件进行更改，而非直接更改
      set(value) {
        this.$emit('change', this.item, value)
      }
    }
  },
  template: `
    <li>
      <template v-if="editing === item">
        <input 
          type="text" 
          v-model="editingText" 
        >
        <button @click="completeHandler">确认</button>  
        <button @click="cancelHandler">取消</button>  
      </template>
      <template v-else>
        <input 
          type="checkbox"
          v-model="status"
        >
        {{ item.content }}
        <button @click="editHandler(item)">修改</button>
        <button @click="deleteHandler(item)">删除</button>
      </template>
    </li>
  `
})

// ? 挂载实例
app.mount('#app')