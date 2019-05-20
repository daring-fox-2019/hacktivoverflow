<template>
    <v-layout row wrap mt-5 text-xs-center>
      <v-flex xs6 lg4 md4 offset-xs3 offset-md4 offset-lg4>
        <v-alert
          type="error"
          v-model="isError"
          dismissible
        >
          {{error}}
        </v-alert>
        <h1>Login</h1>
        <v-form ref="form" v-model="valid" @submit.prevent="login" lazy-validation>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          <v-text-field
            v-model="password"
            :counter="8"
            :rules="passwordRules"
            label="Password"
            required
            :append-icon="show ? 'visibility' : 'visibility_off'"
            :type="show ? 'text' : 'password'"
            name="pasword"
            @click:append="show = !show"
          ></v-text-field>
          <v-btn class="mb-3" color="success" type="submit">Login</v-btn>
          <v-layout row align-center>
            <v-divider lg3></v-divider>
            <strong class="mx-2">OR</strong>
            <v-divider lg3></v-divider>
          </v-layout>
          <button v-google-signin-button="clientId" class="google-signin-button">Google</button>
        </v-form>
      </v-flex>
    </v-layout>
</template>
<script>
import http from '@/api/http';

export default {
  directives: {
    GoogleSignInButton,
  },
  computed: {
    errorMsg: function() {
      return this.error;
    }
  },
  data: () => ({
    show: false,
    error: "",
    isError: false,
    googleSignInParams: {
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID
    },
    valid: true,
    email: "",
    emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 8) || "Name must be at least 8 characters"
    ]
  }),
  methods: {
    login() {
      console.log('--------'+process.env);
      http.post(process.env.VUE_APP_SERVER_URL+'/auth/login',
      {
        email: this.email.toLowerCase(),
        password: this.password,
      })
      .then(({data}) => {
        console.log(data);
        localStorage.setItem('hackflow_token', data)
        this.$store.commit('setIsLogin', true)
        this.$store.dispatch('getUser')
        this.$router.push('/')
      })
      .catch((err) => {
        this.error = err.response.data
        this.isError = true;
        console.log(this.error);
      });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    onSignInSuccess (idToken) {
      http.post('/auth/google',
      {
        token: idToken,
      })
      .then(({data}) => {
        localStorage.setItem('hackflow_token', data)
        this.$store.commit('setIsLogin', true)
        this.$store.dispatch('getUser')
        swal.fire('Success', `Welcome back!`, 'error')
        this.$router.push('/')
      })
      .catch((err) => {
        this.error = err.response.data
        this.isError = true;
      });
    },
    onSignInError (error) {
      swal.fire('Error', error, 'error')
    }
  },
};
</script>
<style scoped>
h1 {
    margin-bottom: 30px;
}

.container {
    height: 400px;
}

.google-signin-button {
  color: white;
  margin-top: 10px;
  background-color: red;
  height: 36px;
  font-size: 16px;
  border-radius: 2px;
  padding: 5px 20px 20px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

</style>
