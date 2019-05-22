<template>
    <div>
        <form v-on:submit.prevent="sendLogin">
            <div class="form-group">
                <p style="font-size: 1.4rem;">Sign in</p>
            </div>
            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control" aria-describedby="emailHelp"
                    placeholder="Enter email" v-model="email">
                <small id="emailHelp" class="form-text text-muted"></small>
            </div>
            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control" 
                    placeholder="Password" v-model="password">
            </div>
            <button type="submit" class="btn btn-secondary btn-sm">Login</button><br>
            <div style="margin-top: 1rem;" class="alert alert-primary" role="alert" v-show="alert">
                {{alert}}
            </div>
        </form>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      email: "",
      password: "",
      alert: "",
    }
  },
  methods: {
    sendLogin() {
        axios({
            method: 'post',
            url: this.$store.state.serverAddress + "users/login",
            data: {
                email: this.email,
                password: this.password,
            }
        })
        .then(({ data }) => {
            localStorage.setItem("token", data.token);
            this.alert = "Success"
            this.$store.state.loggedIn = true;
            setTimeout(() => {
                this.alert = "";
                this.$store.state.showForm = 0;
            }, 1200);
        })
        .catch(err => {
            console.log(err)
            this.alert = "Failed"
            setTimeout(() => {
                this.alert = "";
            }, 2000);
        })
    },
  }
}
</script>

<style scoped>
* {
  font-size: 0.9rem;
}
form {
  min-width: 22rem;
  max-width: 38rem;
  padding: 0.8rem;
  background-color: #303131;
  box-shadow: 0 0 1.8rem black;
}

input {
  color: #dddddd;
  background-color: #464646;
  border: none;
}
</style>
