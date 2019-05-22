<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-md-offset-3">
        <div class="account-box">
          <div class="">
            <h2>Create your Hacktiv Overflow account. It’s free and only takes a minute.</h2>
          </div>
          <form
          @submit.prevent="register"
          class="form-signin"
          >
            <div class="form-group or-box">
              <input
                v-model="name"
                type="text"
                class="form-control"
                placeholder="Name"
                required
                autofocus
              >
            </div>
            <div class="form-group">
              <input
                v-model="email"
                type="email"
                class="form-control"
                placeholder="Email"
                required
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
            <div class="form-group">
              <input
                v-model="confirmpassword"
                type="password"
                class="form-control"
                placeholder="Confirm Password"
                required
              >
            </div>
          <div class="or-box row-block">
            <div class="row">
              <div class="col-md-12 row-block">
                <button
                  type="submit"
                  class="btn btn-primary btn-block"
                >Submit</button>
              </div>
            </div>
          </div>
          <div class="">
            <h5>Already have an account? <router-link to="/login">Log in</router-link></h5>
          </div>

        </form>
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
      name: '',
      email: '',
      password: '',
      confirmpassword: '',
    };
  },
  methods: {
    register() {
      console.log('register');
      if (this.password !== this.confirmpassword) {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Password and confirm password does not match!',
        });
      } else {
        ServerApi
          .post('/users/register', {
            name: this.name,
            email: this.email,
            password: this.password,
          })
          .then(() => {
            Swal.fire({
              position: 'center',
              type: 'success',
              title: 'Registration Successful! Please Login!',
              showConfirmButton: false,
              timer: 2500,
            });
            this.name = '';
            this.email = '';
            this.password = '';
            this.confirmpassword = '';
            this.$router.push('/login');
          })
          .catch((err) => {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: `${err.response.data}`,
            });
          });
      }
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

.forgotLnk {
  margin-top: 10px;
  display: block;
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
</style>
