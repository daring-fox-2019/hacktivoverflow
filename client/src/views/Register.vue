<template>
  <div class="home mt-3" style="text-align:center">
    <h1>Register</h1>
    <br /><br />
    <b-container>
      <form @submit.prevent="register">
        <b-row>
          <div class="label">
            <label for="name">Name</label>
          </div>
          <div class="input">
            <input  style="width:300px" v-model="name" type="text" name="name" id="name" placeholder="your name here.." />
          </div>
        </b-row>
        <b-row>
          <div class="label">
            <label for="Email">Email</label>
          </div>
          <div class="input">
            <input  style="width:300px" v-model="email" type="text" name="email" id="email" placeholder="your email here.." />
          </div>
        </b-row>
        <b-row>
          <div class="label">
            <label for="name">Password</label>
          </div>
          <div class="input">
            <input style="width:300px"  v-model="password" type="password" name="password" id="password"
              placeholder="your password here.." />
          </div>
        </b-row>
        <b-row>
          <div class="label">
            <label for="tags">Watch Tags</label>
          </div>
          <div class="input">
            <input  style="width:300px; margin-bottom:10px" v-model="watchTags[0]"  type="text" name="tags" id="tag1"
              placeholder="your favourite tags here.." />
            <br />
            <input style="width:300px; margin-bottom:10px"  v-model="watchTags[1]" type="text" name="tags" id="tag2"
              placeholder="your favourite tags here.." />
            <br />
            <input  style="width:300px" v-model="watchTags[2]" type="text" name="tags" id="tag3" placeholder="your favourite tags here.." />
          </div>
        </b-row>
        <br /><br /><br /><br />
        <b-row align-h="center">
          <button class="btn btn-secondary" type="click" @click="register">Register</button>
        </b-row>
      </form>
    </b-container>
  </div>
</template>

<style>
  .label {
    margin-left: 30%;
    margin-bottom: 20px;
  }

  .input {
    position: absolute;
    left: 50%;
  }
</style>

<script>
  import axios from "@/api/axios";
  import Swal from "sweetalert2";

  export default {
    name: "register",
    data() {
      return {
        name: "",
        email: "",
        password: "",
        pp: "",
        watchTags: []
      };
    },
    methods: {
      register() {
        axios
          .post("/users/register", {
            name: this.name,
            email: this.email,
            password: this.password,
            watchTags: this.watchTags,
            pp: this.pp
          })
          .then(data => {
            Swal.fire({
              type: "success",
              text: "You have successfully registered, please login to continue!"
            });
            this.$router.push("login");
          })
          .catch(err => {
            console.log(err)
            Swal.fire({
              type: "error",
              title: "Error!",
              text: err.message
            });
          });
      }
    },
    components: {}
  };
</script>