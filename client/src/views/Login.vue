<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="account-box">
          <div class="logo">
            <h1>Hacktiv OverFlow</h1>
          </div>
          <form class="form-signin" @submit.prevent="login">
            <div class="form-group">
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Email"
                required
                autofocus
              >
            </div>
            <div class="form-group">
              <input
                v-model="password"
                type="password"
                class="form-control"
                placeholder="Password"
                required
              >
            </div>
            <label class="checkbox">
              <input type="checkbox" value="remember-me">
              Keep me signed in
            </label>
            <button
            class="btn btn-lg btn-block purple-bg"
            type="submit"
            >Sign In</button>
          </form>
          <a>I can't access my account</a>
          <div class="or-box">
            <span class="or">OR</span>
            <div class="row">
              <div class="col-md-6 row-block">
                <a class="btn btn-facebook btn-block">Facebook</a>
              </div>
              <div class="col-md-6 row-block">
                <a class="btn btn-google btn-block">Google</a>
              </div>
            </div>
          </div>
          <div class="or-box row-block">
            <div class="row">
              <div class="col-md-12 row-block">
                <button
                  @click.prevent="toRegister"
                  class="btn btn-primary btn-block"
                >Create New Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import ServerApi from '@/api/serverApi';
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'isLogin',
    ]),
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      ServerApi
        .post('/users/login', {
          email: this.email,
          password: this.password,
        })
        .then((user) => {
          console.log(user);
          this.email = '';
          this.password = '';
          localStorage.setItem('token', user.data.token);
          localStorage.setItem('name', user.data.name);
          localStorage.setItem('email', user.data.email);
          localStorage.setItem('id', user.data.id);
          this.$store.commit('userLogin');
          Swal.fire({
            position: 'center',
            type: 'success',
            title: `welcome ${user.data.name}`,
            showConfirmButton: false,
            timer: 1500,
          });
          this.$router.push('/');
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response.data}`,
          });
        });
    },
    toRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
.account-box {
  border: 2px solid rgba(153, 153, 153, 0.75);
  border-radius: 2px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  -khtml-border-radius: 2px;
  -o-border-radius: 2px;
  z-index: 3;
  font-size: 13px !important;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  background-color: #ffffff;
  padding: 20px;
}

.logo {
  width: 70%;
  height: 30px;
  text-align: center;
  margin: 10px 0px 27px 40px;
  background-position: 0px -4px;
  /* position: relative; */
}

.forgotLnk {
  margin-top: 10px;
  display: block;
}

.purple-bg {
  background-color: #6e329d;
  color: #fff;
}
.or-box {
  position: relative;
  border-top: 1px solid #dfdfdf;
  padding-top: 20px;
  margin-top: 20px;
}
.or {
  color: #666666;
  background-color: #ffffff;
  position: absolute;
  text-align: center;
  top: -8px;
  width: 40px;
  left: 90px;
}
.account-box .btn:hover {
  color: #fff;
}
.btn-facebook {
  background-color: #3f639e;
  color: #fff;
  font-weight: bold;
}
.btn-google {
  background-color: #454545;
  color: #fff;
  font-weight: bold;
}
</style>
