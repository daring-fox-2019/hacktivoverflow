<template>
<div class="card" style="width: 450px; margin: auto">
  <h5 class="card-header bg-info white-text text-center py-4">
    <strong>Sign in</strong>
  </h5>
  <div class="card-body px-lg-5 pt-0">
    <form class="text-center" style="color: #757575;">
      <div class="md-form">
        <input type="email" v-model="email" class="form-control">
        <label for="materialLoginFormEmail">E-mail</label>
      </div>
      <div class="md-form">
        <input type="password" v-model="password" class="form-control">
        <label for="materialLoginFormPassword">Password</label>
      </div>
      <button class="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit" @click.prevent="login">Sign in</button>
      <p>Not a member?
        <router-link to="/register">
          <a>Register</a>
        </router-link>
      </p>
    </form>
  </div>
</div>
</template>

<script>
import backend from '@/api/backend.js'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },

  methods: {
    login() {
      backend
        .post('/users/login', {
          email: this.email,
          password: this.password
        })
        .then(({ data }) => {
          console.log(data);
          localStorage.setItem('token', data.token)
          localStorage.setItem('userLogin', data.user.email)
          this.$store.commit('successLogin')
          this.email = ''
          this.password = ''
         
          this.$router.replace('/')
        })
        .catch(err => {
          Swal.fire({
            position: 'center',
            type: 'error',
            title: err.response.data.error,
            showConfirmButton: false,
            timer: 1500
          })
        })
    }
  }
}
</script>
