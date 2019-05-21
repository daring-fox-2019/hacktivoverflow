<template>
  <div style="background-color: #97dcdf">
    <!-- Logo and name -->
    <div class="container">
      <header class="navbar" style="padding: 5px;">
        <ul>
          <li>
            <!-- <a href="#"> -->
            <img src="../assets/tanyatanya.gif">
            <!-- </a> -->
          </li>
          <a href="#" style="color: #df9a97" @click="goHome">
            <li style="font-weight: bold; font-size: 20px">Tanya! Jawab?</li>
          </a>
        </ul>

        <!-- Login Form -->
        <div
          class="modal fade"
          id="loginForm"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label class="col-form-label">Email:</label>
                    <input
                      v-model="loginForm.email"
                      type="email"
                      class="form-control"
                      placeholder="Input email address"
                      required
                    >
                  </div>
                  <div class="form-group">
                    <label class="col-form-label">Password:</label>
                    <input
                      v-model="loginForm.password"
                      type="password"
                      class="form-control"
                      placeholder="Input password"
                      required
                    >
                  </div>
                  <div class="modal-footer">
                    <button
                      @click="submitLogin"
                      type="submit"
                      class="btn btn-primary"
                      data-dismiss="modal"
                    >Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- Login Form -->

        <!-- Register Form -->
        <div
          class="modal fade"
          id="registerForm"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Register</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form>
                  <div class="form-group">
                    <label class="col-form-label">Username:</label>
                    <input
                      v-model="registerForm.username"
                      type="text"
                      class="form-control"
                      placeholder="Input Username"
                      required
                    >
                  </div>
                  <div class="form-group">
                    <label class="col-form-label">Email:</label>
                    <input
                      v-model="registerForm.email"
                      type="email"
                      class="form-control"
                      placeholder="Input email address"
                      required
                    >
                  </div>
                  <div class="form-group">
                    <label class="col-form-label">Password:</label>
                    <input
                      v-model="registerForm.password"
                      type="password"
                      class="form-control"
                      placeholder="Input password"
                      required
                    >
                  </div>
                  <div class="modal-footer">
                    <button
                      @click="submitRegister"
                      type="submit"
                      class="btn btn-primary"
                      data-dismiss="modal"
                    >Register</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <!-- Register Form -->

        <!-- Far Right buttons --->
        <ul>
          <li v-if="isLogin">
            <a href="#" @click="askQuestion">
              <i class="fas fa-feather-alt"></i>
            </a>
            <a href="#" @click="myProfile">
              <i class="fas fa-user"></i>
            </a>
            <a href="#" @click="signOut">
              <i class="fas fa-sign-out-alt"></i>
            </a>
          </li>
          <li v-else>
            <a href="#" data-toggle="modal" data-target="#loginForm">
              <i class="fas fa-sign-in-alt"></i>
            </a>
            <a href="#" data-toggle="modal" data-target="#registerForm">
              <i class="fas fa-user-plus"></i>
            </a>
          </li>
        </ul>
      </header>
    </div>

    <!-- <div class="alert alert-success" role="alert">
      Login success
    </div>

    <div class="alert alert-success" role="alert">
      Bye!
    </div>

    <div class="alert alert-danger" role="alert">
      Login failed
    </div>-->
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      loginForm: {
        email: '',
        password: '',
      },
      registerForm: {
        username: '',
        email: '',
        password: '',
      },
    };
  },
  methods: {
    signOut() {
      this.$store.commit('logout');
    },
    submitLogin() {
      this.$store.dispatch('submitLogin', this.loginForm);
    },
    submitRegister() {
      this.$store.dispatch('submitRegister', this.registerForm);
    },
    goHome() {
      this.$router.push('/');
    },
    myProfile() {
      this.$router.push('/myProfile');
    },
    askQuestion() {
      this.$router.push('/askQuestion');
    },
  },
  computed: {
    ...mapState(['isLogin', 'user']),
  },
};
</script>

<style>
header {
  background-color: #97dcdf;
}

.navbar {
  padding: 0;
}

header ul li img {
  height: 37.5px;
  width: 50px;
  transform: scaleX(-1);
}

header ul {
  color: #d2d1ff;
  list-style: none;
  padding: 0;
  margin: 0;
}

header ul li {
  display: inline-block;
}

header ul li i {
  font-size: 25px;
  color: #df9a97;
  padding: 10px;
}
</style>
