    <template>
    <v-container>
        <router-link to="/">
        <v-icon large>fas fa-long-arrow-alt-left</v-icon>
      </router-link>
        <v-flex xs12 >
  <v-form
    ref="form"
  >
    <v-text-field
      label="Email"
      required
    ></v-text-field>

    <v-text-field
      label="Password"
      required
    ></v-text-field>
    <v-btn
      color="warning"
    >
      Reset Validation
    </v-btn>
  </v-form>
  </v-flex>
    </v-container>
</template>

<script>
export default {
    props: ['signin']
    
}
</script>

