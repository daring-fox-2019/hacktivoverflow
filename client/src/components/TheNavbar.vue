<template>
  <div class="navbar has-background-white is-light">
    <div class="container is-fluid">
      <div class="navbar-brand">
        <router-link
          class="navbar-item"
          to="/"
        >hacktivOverflow</router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="field has-addons">
              <div class="control">
                <input
                  class="input"
                  type="text"
                  placeholder="Search questions"
                  :value="searchQuery"
                  @input="onInputQuery"
                  @keyup.enter="$store.dispatch('question/search')"
                  required
                />
              </div>
              <div class="control">
                <button
                  class="button is-primary"
                  @click="handleClickSearch"
                >Go</button>
              </div>
            </div>
          </div>
          <template v-if="$store.getters['auth/isLogin']">
            <div class="navbar-item">
              <router-link
                class="button is-primary"
                to="/questions/new"
              >Ask Question</router-link>
            </div>
            <div class="navbar-item">
              <a
                class="is-primary"
                href="#"
                @click.prevent="handleClickLogout"
              >Logout</a>
            </div>
          </template>
          <template v-else>
            <div class="navbar-item">
              <router-link
                class="is-primary"
                to="/login"
              >Login</router-link>
            </div>
            <div class="navbar-item">
              <router-link
                class="button is-primary"
                to="/"
              >Register</router-link>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheNavbar',
  computed: {
    searchQuery: (vm) => vm.$store.state.question.searchQuery
  },
  methods: {
    handleClickLogout: function () {
      this.$store.commit('auth/CLEAR_AUTH')
      this.$router.push('/')
    },
    handleClickSearch: function () {
      this.$store.dispatch('question/search')
    },
    onInputQuery: function (e) {
      this.$store.commit('question/SET_QUERY', e.target.value)
    }
  }
}
</script>

<style>

</style>
