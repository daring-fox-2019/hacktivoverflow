<template>
    <v-layout row wrap mt-5 text-xs-center>
      <loading :active.sync="$store.state.loading" 
        :can-cancel="true" 
        width="150"
        height="150"
        :is-full-page="fullPage"></loading>
      <v-flex v-if="!$store.state.loading" xs6 lg4 md4 offset-xs3 offset-md4 offset-lg4>
        <v-alert
          type="error"
          v-model="isError"
          dismissible
        >
          {{error}}
        </v-alert>
        <h1>Login</h1>
        <v-form ref="form" v-model="valid" @submit.prevent="login" lazy-validation>
          <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
          <v-text-field
            v-model="password"
            :counter="8"
            :rules="passwordRules"
            label="Password"
            required
            :append-icon="show ? 'visibility' : 'visibility_off'"
            :type="show ? 'text' : 'password'"
            name="pasword"
            @click:append="show = !show"
          ></v-text-field>
          <v-btn class="mb-3" color="success" type="submit">Login</v-btn>
          <v-layout row align-center>
            <v-divider lg3></v-divider>
            <strong class="mx-2">OR</strong>
            <v-divider lg3></v-divider>
          </v-layout>
          <button v-google-signin-button="clientId" type="button" class="google-signin-button"><i class="fab fa-google mr-2"></i>Google</button>
          <v-btn dark color="black button" :href="initGithub"><i class="fab fa-github mr-2"></i>Github</v-btn>
          <v-btn dark color="blue" :href="initLinkedIn"><i class="fab fa-linkedin mr-2"></i>LinkedIn</v-btn>
        </v-form>
      </v-flex>
    </v-layout>
</template>
<script>
import axios from 'axios'
import http from '@/api/http'
import GoogleSignInButton from 'vue-google-signin-button-directive'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {
  components: {
    Loading,
  },
  directives: {
    GoogleSignInButton,
  },
  computed: {
    errorMsg: function() {
      return this.error;
    },
    initGithub() {
      return `https://github.com/login/oauth/authorize?scope=user:email&client_id=${process.env.VUE_APP_GITHUB_CLIENT_ID}&redirect_uri=${process.env.VUE_APP_GITHUB_CALLBACK}&client_secret=${process.env.VUE_APP_GITHUB_SECRET}&state=yaya`;
    },
    initLinkedIn() {
      return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${process.env.VUE_APP_LINKEDIN_CLIENT_ID}&redirect_uri=${process.env.VUE_APP_LINKEDIN_REDIRECT_URI}&scope=r_liteprofile%20r_emailaddress%20w_member_social`
    }
  },
  data: () => ({
    fullPage: true,
    linkedInCode: '',
    githubCode: '',
    show: false,
    error: "",
    isError: false,
    clientId: process.env.GOOGLE_CLIENT_ID,
    valid: true,
    email: "",
    emailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => (v && v.length >= 8) || "Name must be at least 8 characters"
    ]
  }),
  mounted() {
    console.log(this.$route.params);
    if(this.$route.query.code && this.$route.query.state.includes('yaya')) {
      this.githubCode = this.$route.query.code;

      this.authGithub();
    }
    else {
      this.linkedInCode = this.$route.query.code;
    }
  },
  methods: {
    login() {
      axios.post(process.env.VUE_APP_SERVER_URL+'/auth/login',
      {
        email: this.email.toLowerCase(),
        password: this.password,
      })
      .then(({data}) => {
        console.log(data.access_token);
        localStorage.setItem('hackflow_token', data.access_token)
        this.$store.commit('setIsLogin', true)
        this.$store.commit('setUser', data.user)
        this.$router.push('/')
      })
      .catch((err) => {
        if(err.response) {
          err= err.response.data;
        }
        this.error = err;
        this.isError = true;
        console.log(this.error);
      });
    },
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
      }
    },
    OnGoogleAuthSuccess (idToken) {
      axios.post(process.env.VUE_APP_SERVER_URL+'/auth/google',
      {
        token: idToken,
      })
      .then(({data}) => {
        localStorage.setItem('hackflow_token', data)
        this.$store.commit('setIsLogin', true)
        this.$store.dispatch('getUser')
        this.$router.push('/')
      })
      .catch((err) => {
        this.error = err.response.data
        this.isError = true;
      });
    },
    OnGoogleAuthFail (error) {
      console.log(error)
    },
    authGithub() {
      this.$store.commit('setLoading', true);
      axios.post(process.env.VUE_APP_SERVER_URL+'/auth/github',
      {
        code: this.githubCode,
      })
        .then(({ data }) => {
          localStorage.setItem('hackflow_token', data.access_token)
          this.$store.commit('setIsLogin', true)
          this.$store.commit('setUser', data.user)
          this.$store.commit('setLoading', false);
          swal.fire('Great!', `Welcome, ${data.user.firstname}`, 'success')
          this.$router.push('/')
        })
        .catch(err => {
          if(err.response) {
              err = err.response.data;
          }
          if(err.message) {
            err = err.message
          }
          swal.fire('Oops!', err, 'error')
        })
    },
    authLinkedIn() {
      this.$store.commit('setLoading', true);
      http.get('/auth/linkedin/redirect/?code='+this.linkedinCode)
          .then(({data}) => {
            localStorage.setItem('hackflow_token', data.access_token)
            this.$store.commit('setUser', data.user)
            this.$store.commit('setIsLogin', true)
            this.$store.commit('setLoading', false);
            swal.fire('Great!', `Welcome, ${data.user.firstname}`, 'success')
            this.$router.push('/')
          })
          .catch((err) => {
            if(err.resposne) {
              err = err.response.data;
            }
            swal.fire('Oops!', err, 'error')
          })
    }
  },
};
</script>
<style scoped>
h1 {
    margin-bottom: 30px;
}

.container {
    height: 400px;
}

.google-signin-button {
  color: white;
  margin-top: 10px;
  background-color: red;
  height: 36px;
  font-size: 16px;
  border-radius: 2px;
  padding: 5px 20px 20px 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

</style>
