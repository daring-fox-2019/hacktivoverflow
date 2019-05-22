<template>
  <form class="form-register" @submit.prevent="handleSubmit">
    <div class="field has-addons">
      <p class="control">
        <label
          class="button is-medium is-static"
          for="email"
        >Email</label>
      </p>
      <p class="control is-expanded">
        <input
          type="email"
          id="email"
          class="input is-medium"
          placeholder="fulan@email.com"
          v-model="email"
          required
          autofocus
        />
      </p>
    </div>
    <div class="field has-addons mt20">
      <p class="control">
        <label
          class="button is-medium is-static"
          for="password"
        >Password</label>
      </p>
      <p class="control">
        <input
          type="password"
          id="password"
          class="input is-medium"
          placeholder="secretpassword"
          v-model="password"
          required
        />
      </p>
    </div>
    <div class="field mt20">
      <p class="control">
        <button
          type="submit"
          class="button is-outlined is-white is-medium"
        >Register</button>
      </p>
    </div>
  </form>
</template>

<script>
import Swal from 'sweetalert2'

import auth from '../api/auth.js'

export default {
  name: 'IndexHeadForm',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    handleSubmit: function () {
      auth
        .register({
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          this.$router.push('/login')
          Swal.fire({
            type: 'success',
            text: 'Your account is successfully created, you can login now using your account',
            timer: 2000
          })
        })
        .catch((err) => console.log(err))
    }
  }
}
</script>

<style scoped>
.form-register {
  max-width: 320px;
}
</style>
