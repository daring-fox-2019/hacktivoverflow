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
      this.$store.commit('auth/SET_AUTH', {
        user: auth.user,
        token: auth.jwtToken
      })
    }
  }
}
</script>

<style scoped>

</style>
