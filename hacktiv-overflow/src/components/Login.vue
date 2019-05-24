    <template>
  <v-container>
    <v-flex xs12 md6 offset-sm3>
      <h1 class="text-md-center">
        LOGIN PAGE
      </h1>
      <v-form @submit.prevent="login" ref="form">
        <v-text-field v-model="signin.email" label="Email" required></v-text-field>
        <v-text-field
        v-model="signin.password"
          label="Password"
          :append-icon="show1 ? 'visibility' : 'visibility_off'"
          :type="show1 ? 'text' : 'password'"
          counter
          @click:append="show1 = !show1"
        ></v-text-field>
        <v-layout align-center justify-center column>
        <v-btn type="submit" color="warning">Submit</v-btn>
         <router-link to="/register">
     Don't Have Any Account? Register here
    </router-link>
        </v-layout>
      </v-form>

    </v-flex>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      show1: true,
      signin: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      this.$emit('sign', this.signin)
      this.signin = {
        email: '',
        password: ''

      }
    }
  }
}
</script>
