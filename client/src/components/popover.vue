<template>
  <v-menu
    transition="slide-x-transition"
    :close-on-content-click="false"
    v-model="menu"
    bottom
    left
  >
    <template v-slot:activator="{ on }">
      <v-btn v-on="on">Login</v-btn>
    </template>
    <v-card width="300">
      <v-card-text>
        <v-form lazy-validation ref="form">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field label="Email" v-model="loginForm.email" :rules="requiredRule" required></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field
                label="Password"
                type="password"
                v-model="loginForm.password"
                :rules="requiredRule"
                required
              ></v-text-field>
            </v-flex>
            <v-flex style="display: flex; justify-content: space-between;">
              <v-btn color="error" @click="emptyForm">Cancel</v-btn>
              <v-btn @click.prevent="validate" color="primary" :loading="isLoading">Submit</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
        <v-divider class="my-2"></v-divider>
        <div >Don't have account? Register!</div>
        <v-btn color="success" to="/register">Register</v-btn>
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
import { mapState } from 'vuex'
import swal from 'sweetalert'

export default {
  name: "popover",
  data() {
    return {
      menu: false,
      validInput: true,
      isLoading: false,
      loginForm: {
        email: "",
        password: ""
      },
      requiredRule: [v => !!v || "Field required"],
    };
  },
  methods: {
    validate() {
      if (this.$refs.form.validate() && this.validInput) {
        this.snackbar = true;
        this.isLoading = true
        this.login()
      } else {
        swal("Invalid Input");
      }
    },
    emptyForm() {
      this.menu = false;
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
    },
    login() {
      axios({
        method: 'post',
        url: 'http://34.87.71.136/users/login',
        data: this.loginForm
      })
        .then(({ data }) => {
          let { token, name, email, id } = data
          localStorage.setItem('token', token)
          localStorage.setItem('name', name)
          localStorage.setItem('email', email)
          localStorage.setItem('id', id)
          swal('Logged in!', `Welcome, ${data.name}`)
          this.isLoading = false
          this.$store.dispatch('login', data)
          this.$router.push('/')
          this.emptyForm()
          this.$emit('fetch-profile')
        })
        .catch(err => {
          this.isLoading = false
          this.$emit('error', err)
        })
    },
  },
  computed: {
    ...mapState(['isLoggedIn']),
  },
  watch: {
    isLoggedIn() {

    }
  }
};
</script>

<style>
</style>
