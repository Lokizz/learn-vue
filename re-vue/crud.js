Vue.createApp({
  data() {
    return {
      input: '',
      editInput: '',
      todoList: [],
      cls: false,
    }
  },
  methods: {
    inputHandler() {
      this.todoList.push({
        content: this.input,
        timeStamp: new Date().getTime(),
        isEditing: false
      })
      this.input = ''
    },
    csHandler(evt) {
      this.cls = true
    },
    ceHandler(evt) {
      this.cls = false
      console.log(evt.data)
    },
    addHandler() {
      this.todoList.push({
        content: this.input,
        timeStamp: new Date().getTime(),
        isEditing: false
      })
      this.input = ''
    },
    editHandler(todo) {
      todo.isEditing = true
    },
    deleteHandler(timeStamp) {
      if (!confirm('确认删除这个项目吗？')) return

      this.todoList.forEach((todo, index) => {
        if (todo.timeStamp === timeStamp) {
          this.todoList.splice(index, 1)
        }
      })
    },
    confirmHandler(todo) {
      todo.content = this.editInput
      this.editInput = ''
      todo.isEditing = false
    },
    cancelHandler(todo) {
      todo.isEditing = false
    }
  },
  computed: {
    
  },
  mounted() {
  }
}).mount('#app')