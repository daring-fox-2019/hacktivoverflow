<template>
  <div class="container grid-list-md text-xs-center fill-height">
    <v-layout row wrap>
      <v-flex xs10 lg6 md8 offset-xs1 offset-md2 offset-lg3>
        <h1>Register</h1>
        <v-form ref="form" v-model="valid" @submit.prevent="register" lazy-validation>
          <v-text-field v-model="firstname" label="First Name" :rules="nameRules" required></v-text-field>
          <v-text-field v-model="lastname" label="Last Name" required></v-text-field>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          <v-text-field
            v-model="password"
            :counter="8"
            :rules="passwordRules"
            label="Password"
            required
            :append-icon="showPass ? 'visibility' : 'visibility_off'"
            @click:append="showPass = !showPass"
            :type="showPass ? 'text' : 'password'"
          ></v-text-field>
          <v-btn color="success" type="submit">Submit</v-btn>
          <v-btn to="/">Back</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data: () => ({
    valid: true,
    showPass: false,
    firstname: "",
    lastname: "",
    nameRules: [v => !!v || "Please fill name. Any name is ok",],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 8) || "Name must be at least 8 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
  }),

  methods: {
    register() {
      axios.post(process.env.VUE_APP_SERVER_URL+'/auth/register',
      {
        email: this.email.toLowerCase(),
        firstname: this.firstname,
        lastname: this.lastname,
        password: this.password,
      })
      .then(({data}) => {
        console.log(this);
        swal.fire('Registration Success', 'Please login to the website!', 'success')
        this.$router.push('login')
      })
      .catch((err) => {
        console.log(err);
      });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
};
</script>

<style scoped>
h1 {
    margin-bottom: 30px;
}

</style>
