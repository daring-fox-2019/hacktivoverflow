<template>
  <div style="margin-top:2.7vh;" class="text-xs-center">
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn flat color="black" dark v-on="on">Login</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Login</v-card-title>
        <v-card-actions>
          <v-container grid-list-md text-xs-center>
            <v-form v-model="valid">
              <v-layout row>
                <v-flex>
                  <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
                </v-flex>
              </v-layout>

              <v-layout row>
              <v-flex>
                <v-text-field
                  v-model="password"
                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                   :rules="passwordRules"
                  :type="show1 ? 'text' : 'password'"
                  name="password"
                  label="Password"
                  counter
                  @click:append="show1 = !show1"
                ></v-text-field>
              </v-flex>
              </v-layout>

              <v-btn @click="login" d-flex depressed small>Login</v-btn>
            </v-form>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({
    password: "",
    email : '',
    dialog: false,
    valid: false,
    show1: false,
    show2: true,
    show3: false,
    show4: false,
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length >= 6 || "Password must be more than 6 characters"
    ],
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ]
  }),
  methods: {
      login() {
        // console.log(this.password, this.email, 'INI ADA GA YA KALO DI KLIK?');   
          this.$store.dispatch('login', {email : this.email, password : this.password})
      }
  },
};
</script>

<style>
</style>
