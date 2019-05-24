<template>
  <div id="app">
    <div>
      <b-navbar toggleable="lg">
        <b-navbar-brand href="#">
          <b-link to="/home">HoverFlow</b-link>
        </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item to="/home">Home</b-nav-item>                                   
          </b-navbar-nav>
          <!-- Right aligned nav items -->

          <b-navbar-nav class="ml-auto">
            <b-nav-form class="p-2">
              <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
              <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
            </b-nav-form>

            <b-nav-form v-if="!user">
              <b-nav-item class='p-2'>Log-in: </b-nav-item>
              <b-form-input
                type="email"
                size="sm"
                class="mr-sm-2"
                placeholder="email"
                v-model="topForm.email"
              ></b-form-input>
              <b-form-input
                type="password"
                size="sm"
                class="mr-sm-2"
                placeholder="password"
                v-model="topForm.password"
              ></b-form-input>
              <b-button
                size="sm"
                class="my-2 my-sm-0"
                type="submit"
                @click.prevent="login(topForm)"
                variant="outline-primary"
              >login</b-button>
            </b-nav-form>

            <b-nav-form class="p-1">
              <b-button v-if="user" @click.prevent="signOut" variant="outline-secondary">Sign Out</b-button>
              <b-button v-else to="/register" variant="outline-secondary">register</b-button>              
            </b-nav-form>
            <b-nav-item v-if="user" to="/profile">My Profile</b-nav-item>            

            <!--       <b-nav-item-dropdown right v-show="user">
     
              <template slot="button-content">
                <em>or use</em>
              </template>
              <b-dropdown-item to="/profile">Profile</b-dropdown-item>
            </b-nav-item-dropdown>-->
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </div>
      <div>
        <b-button v-if="user" variant='primary' to="/ask">Ask Question</b-button>
        <h5 v-if='!user'>log in to ask a question</h5>
      </div>
        
      <router-view/>
    
    <p>{{topForm}}</p>
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from "vuex";
import backend from "@/api/api";
import swal from "sweetalert2";

export default {
  data() {
    return { topForm: {} };
  },
  computed: mapState(["user"]),
  methods: {
    ...mapMutations(["clearUser", "setUser"]),
    async login() {
      try {
        let response = await backend.post(`/auth/login`, this.topForm);
        if (response.status == 201) {
          swal.fire("logged in", "you are in the system", "success");
          this.setUser(response.data);
        }        
      } catch (error) {
        if (error.response) {
          if (error.response.data.message) {
            console.log(error.response.data);
            swal.fire(
              `server says: ${error.response.status}`,
              `${error.response.data.message}`,
              "question"
            );
          } else {
            console.log(error.response.data);
            swal.fire(
              `server says: ${error.response.status}`,
              `check the log`,
              "question"
            );
          }
        } else if (error.request) {
          swal.fire("Server Unreachable", "check your internet", "warning");
          console.log(error.request);
        } else {
          swal.fire("application error", "check log", "error");
          console.log(error);
        }
        this.clearUser();
      } finally {
        this.topForm = {};
        // this.$router.push("home");
      }
    },
    signOut() {
      swal.fire(`goodbye`, `you've been logged out from the system`, `success`);
      this.clearUser();
    }
  },
  mounted() {
    if (localStorage.getItem("token")) {
      backend
        .post(`/auth/verify`)
        .then(response => {
          console.log("from here?");
          this.$store.commit("setUser", response.data);
        })
        .catch(error => {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
          this.$store.commit("clearUser");
          localStorage.removeItem("token");
        });
    }
  }
};
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap-vue/dist/bootstrap-vue.css";
@import url("https://fonts.googleapis.com/css?family=Baloo+Bhai&display=swap");

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
