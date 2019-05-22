<template>
  <v-layout row>
    <v-dialog v-model="dialog" max-width="400px">
      <template v-slot:activator="{ on }">
        <v-btn class="accent" v-on="on">Sign In</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <v-flex text-xs-center class="mt-3">
            <span class="title accent--text">
              Hacktiv
              <span class="font-weight-light white--text">Overflow</span>
            </span>
            <p class="headline accent--text" v-if="register">Register</p>
            <p class="headline accent--text" v-if="!register">Sign In</p>
          </v-flex>
        </v-card-title>
        <v-card-text class="pt-0">
          <v-container grid-list-md>
            <form @submit.prevent="signInOrRegister" class="accent--text">
              <v-layout wrap>
                <v-flex xs12 v-if="register">
                  <v-text-field class="accent--text" label="Name" required v-model="name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field class="accent--text" label="Email*" required v-model="email"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    class="accent--text"
                    label="Password*"
                    type="password"
                    required
                    v-model="password"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12 text-xs-center>
                  <v-btn type="submit" v-if="register" flat class="accent--text">Register</v-btn>
                  <v-btn type="submit" v-if="!register" flat class="accent--text">Sign In</v-btn>
                </v-flex>
                <v-flex xs12 text-xs-center>
                  <a
                    @click="register=true"
                    class="white--text"
                    v-if="!register"
                  >Don't have an account yet?</a>
                  <a @click="register=false" class="white--text" v-if="register">Sign in instead</a>
                </v-flex>
              </v-layout>
            </form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    register: false,
    name: "",
    email: "",
    password: ""
  }),
  methods: {
    signInOrRegister() {
      if (this.register) {
        this.registerUser();
      } else {
        this.signInUser();
      }
    },
    signInUser() {
      this.$store.dispatch("signin", {
        email: this.email,
        password: this.password
      });
      this.dialog = false;
    },
    registerUser() {
      let newUser = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      this.$store.dispatch("register", newUser);
      this.dialog = false;
    }
  }
};
</script>

