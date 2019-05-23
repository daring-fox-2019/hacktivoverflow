<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created: function () {
    if (localStorage.getItem('hacktivOverflow_auth')) {
      let auth = JSON.parse(localStorage.getItem('hacktivOverflow_auth'))
      this.$store.commit('auth/SET_TOKEN', {
        token: auth.jwtToken
      })
      this.$store.dispatch('auth/getUser', auth.user._id)
    }
  }
}
</script>

<style scoped>

</style>
