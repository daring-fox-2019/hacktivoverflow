<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{ teks }} form</v-toolbar-title>
            
          </v-toolbar>
          <v-card-text>
            <v-form @submit.prevent="$emit('submitted',email,password)">
              <slot></slot>
              <v-text-field v-model="email" :rules="emailRules" prepend-icon="email" name="email" label="Email" type="email"></v-text-field>
              <v-text-field
                v-model="password"
                :rules="passwordRules"
                prepend-icon="lock"
                name="password"
                label="Password"
                type="password"
              ></v-text-field>
            <v-btn type="submit" color="primary">{{ teks }}</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data(){
    return {
      valid: false,
      email:'',
      password:'',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Password is required',
        v => v.length >= 8 || 'Password must be more than equal 8 characters'
      ],
    }
  },
  props: ['teks'],
  methods: {
    
  }
}
</script>
