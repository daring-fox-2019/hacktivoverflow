<template>
  <div class="columns is-centered has-background-light">
    <div class="column">
      <div class="has-text-centered mt100 mb56">
        <router-link
          class="is-size-3 has-text-weight-semibold has-text-grey"
          to="/"
        >hacktivOverflow</router-link>
      </div>
      <div class="card">
        <div class="card-content">
          <p
            class="has-text-danger mb8"
            v-if="errMessage"
          >{{errMessage}}</p>
          <form @submit.prevent="handleSubmit">
            <div class="field">
              <label class="label">Email</label>
              <input
                type="email"
                class="input"
                v-model="email"
                required
                autofocus
              />
            </div>
            <div class="field">
              <label class="label">Password</label>
              <input
                type="password"
                class="input"
                v-model="password"
                required
              />
            </div>
            <div class="field">
              <button
                type="submit"
                class="button is-fullwidth is-success mt24"
              >Login</button>
            </div>
          </form>
          <p class="has-text-centered mt16">
            Don't have an account?
            <router-link to="/">Register</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data: function () {
    return {
      errMessage: '',
      email: '',
      password: ''
    }
  },
  methods: {
    handleSubmit: function () {
      let payload = {
        email: this.email,
        password: this.password
      }

      this.$store
        .dispatch('auth/login', payload)
        .then(() => {
          this.$router.push('/')
        })
        .catch(({ response }) => {
          if (response.status === 400) {
            this.errMessage = response.data.message
          } else {
            console.log(response.data)
          }
        })
    }
  }
}
</script>

<style scoped>
.columns {
  min-height: 100vh;
}
.column {
  max-width: 320px;
}
.card {
  border-radius: 4px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05), 0 20px 48px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.1);
}
</style>
