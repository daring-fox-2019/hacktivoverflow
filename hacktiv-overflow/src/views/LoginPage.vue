<template>
  <Login v-on:sign="login"/>
</template>

<script>
import Login from '@/components/Login.vue'
import overflow from '@/api/overflow'
import { mapActions } from 'vuex'
export default {
  components: {
    Login
  },
  data () {
    return {

    }
  },
  methods: {
    login (result) {
      const { email, password } = result
      overflow
        .post('/login', {
          email,
          password
        })
        .then(({ data }) => {
          console.log(data)
          localStorage.setItem('token', data.token)
          this.isLogin()
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    },
    isLogin () {
      this.$store.dispatch('isLogin')
    },
    ...mapActions(['isLogin'])
  }
}
</script>
