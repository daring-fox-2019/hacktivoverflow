<template>
  <div class>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="container">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
          <button
            type="button"
            class="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#navigation"
          >
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <router-link class="navbar-brand text-uppercase" to="/">Hacktiv Overflow</router-link>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse row2" id="navigation">
          <ul class="nav navbar-nav navbar-right">
            <li>
              <router-link to="/login" v-if="!isLogin">Log In</router-link>
            </li>
            <li>
              <button
              @click.prevent="toRegister"
              type="button"
              class="btn btn-success navbar-btn btn-circle" v-if="!isLogin">Sign Up</button>
              <button
              v-if="isLogin"
              type="button"
              class="btn btn-danger navbar-btn btn-circle"
              @click.prevent="logout">Logout <i class="fas fa-sign-out-alt"></i></button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'isLogin',
    ]),
  },
  methods: {
    logout() {
      this.$store.commit('userLogout');
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('email');
      localStorage.removeItem('id');
      this.$router.push('/');
    },
    toRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
</style>
