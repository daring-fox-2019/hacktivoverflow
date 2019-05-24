<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">New Answer</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Give Your Answer</span>
        </v-card-title>
        <v-card-text>
<template>
  <v-form
    ref="form"
    lazy-validation
  >

    <wysiwyg v-model="text" placeholder="Description" />
  </v-form>
</template>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="error" @click="dialog = false">Close</v-btn>
          <v-btn @click.prevent="addDataAnswer" type="submit" color="success">Create</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>

export default {
  data: () => ({
    dialog: false,
    text: ''
  }),
  components: {

  },
  methods: {
    addDataAnswer () {
      this.$emit('add-data-answer', this.text)
      console.log('sampai create answer')
      this.text = ''
      this.dialog = false
    }

  }
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
