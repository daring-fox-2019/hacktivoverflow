<template>
  <div id="app">
    <Navbar />
    <div class="container my-container">
      <router-view/>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import QuestionDetail from '@/views/QuestionDetail'
import Sidebar from '@/components/Sidebar.vue'

export default {
  components: {
    Navbar,
    Footer,
    QuestionDetail,
    Sidebar
  },
  created() {
      this.$store.dispatch('getQuestion')
      this.checkLogin()
  },
  methods: {
    checkLogin() {
      if(localStorage.token) {
        this.$store.dispatch('setLoggedInUser')
        this.$store.state.isLogin = true
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.my-container {
  max-width: 850px;
  min-height: 100vh;
}
</style>
