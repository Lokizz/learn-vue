export default {
  template: `
    <div>This is Home page imported from component</div>
  `,
  computed: {
    username() {
      return this.$route.params.username
    },
  },
  methods: {
    goToDashboard() {
      if (isAuthenticated) {
        this.$router.push('/dashboard')
      } else {
        this.$router.push('/login')
      }
    }
  },
  mounted() {
    console.log('Mounted')
    console.log(`this: ${this}`)
    console.log(`Router: ${this.$router}`)    
    console.log(`Route: ${this.$route}`)    
  }
}