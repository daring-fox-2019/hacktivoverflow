<template>
  <div class="home mt-3" style="text-align:center">
    <h1>Login</h1>
    <br /><br />
    <b-container>
      <form @submit.prevent="login">
        <b-row>
          <div class="label">
            <label for="Email">Email</label>
          </div>
          <div class="input">
            <input type="text" name="email" id="email" v-model="email" />
            <!-- placeholder="your email here.." -->
          </div>
        </b-row>
        <b-row>
          <div class="label">
            <label for="name">Password</label>
          </div>
          <div class="input">
            <input type="password" name="password" id="password" v-model="password" />
            <!-- placeholder="your password here.." -->
          </div>
        </b-row>
        <br />
        <b-row align-h="center">
          <button class="btn btn-secondary" type="submit">Login</button>
        </b-row>
      </form>
    </b-container>
  </div>
</template>

<style>
  .label {
    margin-left: 35%;
    margin-bottom: 20px;
  }

  .input {
    position: absolute;
    left: 50%;
  }
</style>

<script>
  // @ is an alias to /src
  import axios from "@/api/axios";
  import Swal from "sweetalert2";
  import {
    mapState,
    mapActions
  } from "vuex";

  export default {
    name: "login",
    data() {
      return {
        email: "qoyyima@studentenergy.org",
        password: "123"
      };
    },
    components: {},
    methods: {
      login() {
        axios
          .post("/users/login", {
            email: this.email,
            password: this.password
          })
          .then(data => {
            localStorage.setItem("jwtoken", data.data.jwtoken);
            localStorage.setItem("id", data.data.userId);
            localStorage.setItem("username", data.data.name);
            localStorage.setItem("pp", data.data.pp);
            Swal.fire({
              type: "success",
              text: "you have successfully logged in!"
            });
            this.$store.commit("login");
            this.$router.push({
              path: "/"
            });
          });
      }
    },
    computed: {
      ...mapState(["isLoggedIn"])
    }
  };
</script>