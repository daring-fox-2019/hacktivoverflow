<template>
  <div class="container" style="padding: 100px">
    <div class="row d-flex justify-content-center">
      <h1>Welcome</h1>
      <div class='mb-2 mx-2'>
        <swapping-squares-spinner :animation-duration="1000" :size="65" color="#428bca"/>
      </div>
    </div>
    <div class="row d-flex justify-content-center pt-5">
      <b-form @submit.prevent="login">
        <b-form-group
          id="email-label"
          label="Email address:"
          label-for="user-email"
          description="We'll never share your email with anyone else."
        >
          <b-form-input
            id="user-email"
            type="email"
            v-model="userLogin.email"
            required
            placeholder="Enter email"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          id="password-label"
          label="Password:"
          label-for="password-input"
          description="We'll never share your password with anyone else."
        >
          <b-form-input
            id="password-input"
            type="password"
            v-model="userLogin.password"
            required
            placeholder="Enter password"
          ></b-form-input>
        </b-form-group>
        <div class="d-flex justify-content-between">
          <b-button class="mt-3" type="submit" variant="success">Login</b-button>
          <router-link to="/register">
            <b-button class="mt-3" variant="primary">Register</b-button>
          </router-link>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { SwappingSquaresSpinner } from "epic-spinners";
export default {
  name: "Login",
  data() {
    return {
      userLogin: {
        email: "",
        password: ""
      }
    };
  },
  components: {
    SwappingSquaresSpinner
  },
  methods: {
    login() {
      this.$store.dispatch("login", this.userLogin);
    }
  },
  computed: { ...mapState(["status"]) },
  watch: {
    status(val) {
      if (val === "error") {
        this.$swal("Oopss..", "Invalid email/password", "error");
        this.$store.dispatch("resetStatus");
        this.userLogin.password = "";
      } else if (val === "success") {
        this.$router.push({ path: "/" });
        this.$swal("Success", "You have successfully logged in!", "success");
        this.$store.dispatch("resetStatus");
        this.userLogin.password = "";
      }
    }
  }
};
</script>

<style scoped>
</style>
