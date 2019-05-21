<template>
  <div class="container" style="background-color: white; min-height: 100vh; padding-top: 40px;">
    <div>
      <form @submit.prevent="createQuestion">
        <label>Title:</label>
        <div class="input-group">
          <input v-model="questionForm.title" type="text" class="form-control">
        </div>
        <br>
        <label>Description:</label>
        <wysiwyg v-model="questionForm.description"/>
        <br>
        <button type="submit" class="btn btn-warning">Submit question</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questionForm: {
        title: '',
        description: '',
      },
    };
  },
  methods: {
    createQuestion() {
      this.$store.dispatch('createQuestion', this.questionForm);
    },
  },
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
