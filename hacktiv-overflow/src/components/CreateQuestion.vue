<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">New Question</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Ask Your Question</span>
        </v-card-title>
        <v-card-text>
<template>
  <v-form

    ref="form"
    lazy-validation
  >
    <v-text-field
      label="Title"
      v-model="input.title"
      required
    ></v-text-field>

    <wysiwyg placeholder="Description" v-model="input.text" />
  </v-form>
</template>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog = false">Close</v-btn>
          <v-btn @click="addData" color="success">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

export default {
  data: () => ({
    dialog: false,
    text: '',
    input: {
      title: '',
      text: ''
    }
  }),
  components: {

  },
  methods: {
    addData () {
      this.$emit('add-data', this.input)
      this.input = {
        title: '',
        text: ''
      }
      this.dialog = false
    }

  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
