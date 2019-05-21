<template>
  <div class="container" style="background-color: white; min-height: 100vh; padding-top: 40px;">
    <div>
      <form>
        <label>Title:</label>
        <div class="input-group">
          <input v-model="questionForm.title" type="text" class="form-control">
        </div>
        <br>
        <label>Description:</label>
        <wysiwyg v-model="questionForm.description"/>
        <br>
        <button @click="createQuestion" v-if="!this.$route.params.id" type="submit" class="btn btn-warning">Submit question</button>
        <button @click="editQuestion" v-if="this.$route.params.id" type="submit" class="btn btn-warning">Edit question</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import myServer from '@/api/myServer';

export default {
  data() {
    return {
      questionForm: {
        title: '',
        description: '',
      },
    };
  },
  computed: {
    ...mapState(['currentQuestion']),
  },
  methods: {
    createQuestion() {
      this.$store.dispatch('createQuestion', this.questionForm);
    },
    editQuestion() {
      this.$store.dispatch('editQuestion', [this.$route.params.id, this.questionForm]);
    },
    getQuestion() {
      if (this.$route.params.id) {
        myServer
          .get(`/question/${this.$route.params.id}`)
          .then(({ data }) => {
            this.questionForm.title = data.title;
            this.questionForm.description = data.description;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  created() {
    this.getQuestion();
  },
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
