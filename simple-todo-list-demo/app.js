// ? 挂载实例
Vue.createApp({
  data() {
    return {
      todoList: [],
      newInput: '',
      isEditing: false,
      editInput: ''
    }
  },
  methods: {
    // ? Add item
    addHandler() {
      this.todoList.push({
        content: this.newInput,
        // 作为唯一性判断的依据
        timeStamp: new Date().getTime(),
        isDone: false
      }),
      this.newInput = ''
    },

    // ? Change item
    changeHandler(timeStamp) {
      this.isEditing = true
      
    },

    // ? Cancel change
    cancelHandler() {

    },

    // ? Delete item
    deleteHandler(timeStamp) {
      if (confirm('确认要删除这项纪录吗？')) {
        this.todoList.forEach((todo, index) => {
          if(todo.timeStamp === timeStamp) {
            this.todoList.splice(index, 1)
          }
        })
      }
    }
  },
  computed: {

  },
  mount() {
    console.log('mounted')
  }
}).mount('#app')