<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="green" dark v-on="on">Update</v-btn>
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

    <wysiwyg placeholder="Description" v-model="input.description" />
  </v-form>
</template>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog = false">Close</v-btn>
          <v-btn  color="success" @click="updated">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import overflow from '@/api/overflow'
export default {
  props: ['updatequestion'],
  data: () => ({
    dialog: false,
    text: '',
    input: {}
  }),
  components: {

  },
  methods: {
    updated () {
      this.$emit('update', this.input)
      this.input = {}
      this.dialog = false
    }
  },
  created () {
    this.input = { ...this.updatequestion }
  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
