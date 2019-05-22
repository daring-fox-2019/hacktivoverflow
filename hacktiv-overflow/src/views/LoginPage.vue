<template>
  <Login :signin="signin"/>
</template>

<script>
import Login from "@/components/Login.vue";
import overflow from "@/api/overflow";
export default {
  components: {
    Login
  },
  data() {
    return {
      signin: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      const { email, password } = this.signin;
      overflow
        .post("/login", {
          email,
          password
        })
        .then(({ data }) => {
          localStorage.setItem("token", data.token)
          this.$router.push('/')
        })
        .catch(err=>{
            console.log(err)
        })
    },
    isLogin() {
      this.$store.commit('isLogin')
    }
  }
};
</script>

