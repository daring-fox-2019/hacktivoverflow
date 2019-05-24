<template>
  <v-container>
    <v-flex xs12 md6 offset-sm3>
      <h1 class="text-md-center">Register Page</h1>
      <v-form @submit.prevent="register" ref="form">
        <v-text-field v-model="input.name" label="Nama" required></v-text-field>
        <v-text-field v-model="input.email" :rules="emailRules" label="Email" required></v-text-field>
        <v-text-field
          v-model="input.password"
          label="Password"
          :append-icon="show1 ? 'visibility' : 'visibility_off'"
          :type="show1 ? 'text' : 'password'"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>

        <v-btn type="submit" color="warning">Submit</v-btn>
      </v-form>
    </v-flex>
  </v-container>
</template>

<script>
import overflow from '@/api/overflow.js'
import Swal from 'sweetalert2'
export default {
  data () {
    return {
      show1: true,
      input: {
        name: '',
        email: '',
        password: ''
      },
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ]
    }
  },
  methods: {
    register () {
      overflow
        .post('/signup', {
          name: this.input.name,
          email: this.input.email,
          password: this.input.password
        })
        .then(({ data }) => {
          Swal.fire({
            type: 'success',
            title: 'Welcome',
            text: `${data.msg}`
          })
          this.$router.push('/login')
        })
        .catch(err => {
          console.log(err.response.data)
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response.data}`
          })
        })
    }
  }
}
</script>
