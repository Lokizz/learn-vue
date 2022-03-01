// Revue todo list demo
// ? 创建实例
Vue.createApp({
  data() {
    return {
      inputText: "",
      list: [],
      compositionStatus: false,
      editing: null,
      editingText: '',
      show: 'all',
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
      
      this.list.push({
        content: this.inputText,
        status: false,
        timestamp: new Date().getTime(),
      })
      // 清除输入文本
      this.inputText = ''
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
      console.log('editHandler is fired.')
      // 保存修改的项目所在
      this.editing = item
      // 先定义一个中间值缓存输入的修改内容
      this.editingText = item.content
    },
    completeHandler() {
      // 点击完成以后再确定修改对应子项的值
      this.editing.content = this.editingText
      this.cancelHandler()
    },
    cancelHandler() {
      this.editingText = ''
      this.editing = null
    },
    // ? 改变显示的状态 
    changeShow(showStatus) {
      this.show = showStatus
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
}).mount('#app')  // ? 挂载的对应实例上