<template>
  <div>
    <div id="login" class="container mt-3">
        <div class="row" style="justify-content:center">
            <div class="col-md-4">
                <h3>Login</h3>
                <form v-on:submit.prevent="login">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Email address</label>
                      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="email">
                    </div>
                    <div class="form-group">
                      <label for="exampleInputPassword1">Password</label>
                      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="password">
                    </div>
                    <div id="localsign">
                        <button type="submit" class="btn btn-dark btn-sm">login</button>
                    </div>
                    <br>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    login() {
      const { email, password } = this;
      this.$store.dispatch("login", { email, password });
    }
  }
};
</script>

<style scoped>
</style>