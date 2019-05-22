<template>
  <v-container
    style="width: 40%; background-color: white; border-radius: 5px; padding-left: 3rem; padding-right: 3rem; padding-bottom: 0.5rem; margin-top: 3%;"
  >
    <v-form v-model="valid" @submit.prevent="loginFormSubmit">
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
            v-model="password"
            :rules="passwordRules"
            label="Password"
            prepend-inner-icon="fas fa-lock"
            type="password"
            required
          >
            <template v-slot:progress>
              <v-progress-linear :value="progress" :color="color" height="7"></v-progress-linear>
            </template>
          </v-text-field>
        </v-flex>

      </v-layout>
      <v-btn block color="success" class="mt-3" type="submit">Log In</v-btn>
      <v-btn block color="error" class="mt-2" flat to="/">Cancel</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import axios from "@/api/axios";
import Swal from "sweetalert2";

export default {
  data: () => ({
    email: "",
    password: "",
    valid: false,
    emailRules: [v => !!v || "E-mail is required"],
    passwordRules: [ v => !!v || "Password is required"]
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
    loginFormSubmit(evt) {
      evt.preventDefault();

      const { email, password } = this;
      const userData = { email, password };

      axios({
        method: "POST",
        url: `/login`,
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
        })
        .catch(err => {
          // console.log(err.response);
          // console.log(err.response.data.message);

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
