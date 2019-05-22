<template>
  <div>
    <div id="register" class="container mt-3">
    <div class="row" style="justify-content:center">
      <div class="col-md-4">
        <h3>Register</h3>
        <form v-on:submit.prevent="register">
          <div class="form-group">
            <label for="exampleFirstName">First name</label>
            <input
              type="text"
              class="form-control"
              id="exampleFirstName"
              placeholder="first name"
              v-model="first_name"
            >
          </div>
          <div class="form-group">
            <label for="exampleLastName">Last name</label>
            <input
              type="text"
              class="form-control"
              id="exampleLastName"
              placeholder="last name"
              v-model="last_name"
            >
          </div>
          <div class="form-group">
            <label for="exampleInputEmail">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleInputEmail2"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              v-model="email"
            >
            <small
              id="emailHelp"
              class="form-text text-muted"
            >We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword2"
              placeholder="Password"
              v-model="password"
            >
          </div>
          <button type="submit" class="btn btn-dark btn-sm">Register</button>
        </form>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  }),

  methods: {
    register() {
      const { first_name, last_name, email, password } = this;
      this.$axios
        .post(`/users/signUp`, {
          first_name,
          last_name,
          email,
          password
        })
        .then(({ data }) => {
          this.$swal(data.message, "Welcome aboard!", "success");
          this.first_name = "";
          this.last_name = "";
          this.email = "";
          this.password = "";
          this.$router.push("/login");
        })
        .catch(err => {
          const { errors } = err.response.data;
          let errorMessages = [];
          for (let key in errors) errorMessages.push(errors[key].message);
          errorMessages = errorMessages.join("\n");
          this.$swal("Oops...", errorMessages, "error");
          this.first_name = "";
          this.last_name = "";
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>

<style scoped>

</style>