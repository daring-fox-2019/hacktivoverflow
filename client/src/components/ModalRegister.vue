<template>
  <div style="margin-top:2.7vh;" class="text-xs-center">
    <v-dialog v-model="dialog" width="500" height="800">
      <template v-slot:activator="{ on }">
        <v-btn flat color="black" dark v-on="on">Register</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>Register</v-card-title>
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

              <v-layout row>
                <v-flex>
                  <v-flex>
                    <v-select
                      v-model="value"
                      :items="items"
                      attach
                      chips
                      label="Preferred Discussion"
                      multiple
                    ></v-select>
                  </v-flex>
                </v-flex>
              </v-layout>
              <v-btn @click="register" d-flex depressed small>Register</v-btn>
            </v-form>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  data: () => ({
    dialog: false,
    valid: false,
    show1: false,
    show2: true,
    show3: false,
    show4: false,

    password: "",
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length >= 6 || "Password must be more than 6 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    items: [],
    value: []
  }),
  created() {
    this.getTags()
  },
  methods: {
    register() {

      this.axios
        .post("users/register", {
          email: this.email,
          tags: this.value,
          password: this.password
        })
        .then(({ data }) => {
          Swal.fire({
          type: 'success',
          title: 'Registered! After loggin in, you may see us in the forum',
         })
          this.dialog = false
        })
        .catch(err => {
          Swal.fire({
          type: 'error',
          title: 'Something is wrong!',
         })
        });
    },
     getTags() {
      this.axios.get(`/tags`, { headers: { token: localStorage.getItem("token") } })
      .then(({data}) => {
       for (let i = 0; i < data.length; i++) {
         this.items.push(data[i].name)       
       }
      })
      .catch(err => {
         Swal.fire({
            type: "error",
            text: `${err.response}!`
          });
      })
    },
  }
};
</script>

<style>
</style>
