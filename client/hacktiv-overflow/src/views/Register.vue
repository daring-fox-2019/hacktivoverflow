<template>
  <div class="container border p-5 animated fadeIn" style="margin-top:100px;max-width:40%;padding-bottom:100px">
    <b-form @submit.prevent="register" >
      <div class="row" >
        <div class="col">
          <b-form-group id="input-group-1" label="First Name:" label-for="input-1">
            <b-form-input
              id="input-1"
              type="text"
              required
              placeholder="Enter First Name"
              v-model="first_name"
            ></b-form-input>
          </b-form-group>
        </div>

        <div class="col">
          <b-form-group id="input-group-2" label="Last Name:" label-for="input-2">
            <b-form-input
              id="input-2"
              type="text"
              required
              placeholder="Enter Last Name"
              v-model="last_name"
            ></b-form-input>
          </b-form-group>
        </div>
      </div>
      <b-form-group
        id="form-email"
        label="Email address:"
        label-for="email"
        description="We'll never share your email with anyone else."
      >
        <b-form-input id="email" type="email" required placeholder="Enter email" v-model="email"></b-form-input>
      </b-form-group>

      <b-form-group id="form-passoword" label="Password:" label-for="password" >
        <b-form-input
          id="password"
          required
          type="password"
          placeholder="Enter password"
          v-model="password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary" block >
        <i class="fas fa-user-plus"></i> Sign Up
      </b-button>
    </b-form>
   
    <hr>
    <p >have an account ?</p>
    <router-link to="/login" >
      <b-button type="submit" variant="outline-primary" block size="sm">
        <i class="fas fa-torii-gate"></i> Login
      </b-button>
    </router-link>
    <router-link to="/">
      <b-button class="mt-2" type="button" variant="outline-secondary" block size="sm" >
        <i class="fas fa-arrow-left"></i> Back To Main Page
      </b-button>
    </router-link>
  </div>
</template>

<script>
import axios from '@/database/axios.js';

export default {
  data() {
    return {
      first_name: '',
      last_name: '',
      password: '',
      email: '',
    };
  },
  mounted() {
   
  },
  methods: {
    register() {
      axios
        .post('/users/register', {
          name: `${this.first_name} ${this.last_name}`,
          password: this.password,
          email: this.email,
        })
        .then(({ data }) => {
          this.$router.push('/login');
          this.$swal(';D', 'Register Success', 'success');
        })
        .catch((err) => {
          //console.log(err)
          this.$swal('Oppps...', `${err.response.data.message}`, 'error');
        });
    },
  },
};
</script>
