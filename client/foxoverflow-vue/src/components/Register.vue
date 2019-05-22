<template>
  <v-form v-model="valid" @submit.prevent="registerFormSubmit">
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          prepend-inner-icon="far fa-envelope"
          required
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <v-text-field
          v-model="fullName"
          :rules="nameRules"
          label="Full Name"
          prepend-inner-icon="fas fa-user"
          required
        ></v-text-field>
      </v-flex>

      <v-flex xs12>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          label="Password"
          prepend-inner-icon="fas fa-lock"
          type="password"
          loading
          required
        >
          <template v-slot:progress>
            <v-progress-linear :value="progress" :color="color" height="7"></v-progress-linear>
          </template>
        </v-text-field>
      </v-flex>
    </v-layout>
    <v-btn block color="success" class="mt-3" type="submit">Register</v-btn>
    <v-btn block color="error" class="mt-2" flat to="/">Cancel</v-btn>
  </v-form>
</template>

<script>
import axios from "@/api/axios";
import Swal from "sweetalert2";

export default {
  data: () => ({
    email: "",
    fullName: "",
    password: "",
    valid: false,
    nameRules: [v => !!v || "Name is required"],
    emailRules: [v => !!v || "E-mail is required"],
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length >= 6 || "Minimum password length is 6 characters"
    ]
  }),
  computed: {
    progress() {
      return Math.min(100, (this.password.length * 100) / 6);
    },
    color() {
      return ["error", "warning", "success"][Math.floor(this.progress / 40)];
    }
  },
  methods: {
    registerFormSubmit(evt) {
      evt.preventDefault();

      const { email, fullName, password } = this;
      const userData = { email, fullName, password };

      axios({
        method: "POST",
        url: `/register`,
        data: userData
      })
        .then(({ data }) => {
          console.log(data);

          localStorage.userId = data.id;
          localStorage.token = data.token;
          localStorage.email = data.email;
          localStorage.fullName = data.fullName;
          localStorage.displayPicture = data.displayPicture;

          this.email = "";
          this.fullName = "";
          this.password = "";
          this.$store.commit("login");
          this.$store.commit("setFullName");
          this.$router.push("/");

          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "success",
            title: "Register successful"
          });
        })
        .catch(err => {
          console.log(err.response);
          console.log(err.response.data.message);

          this.email = "";
          this.fullName = "";
          this.password = "";

          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    }
  }
};
</script>

<style>
.v-messages__message {
  margin-top: 1rem;
}

.v-text-field .v-input__prepend-inner {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
