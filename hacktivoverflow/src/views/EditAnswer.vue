<template>
  <div class="container grey--text text--darken-3">
    <span class="title ml-3 mr-5 grey--text text--darken-3">
      Edit
      <span class="font-weight-light accent--text">Answer</span>
    </span>
    <v-form @submit.prevent="updateAnswer">
      <div class="container">
        <VueEditor
          id="editor"
          useCustomImageHandler
          @imageAdded="handleImageAdded"
          v-model="answer.body"
        />
        <div class="right mt-3">
          <v-btn type="submit" flat class="grey--text text--darken-3">
            <v-icon class="mr-2">send</v-icon>
            <span>update your question</span>
          </v-btn>
        </div>
      </div>
    </v-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";
export default {
  data() {
    return {
      editorData: "",
      title: ""
    };
  },
  components: {
    VueEditor
  },
  methods: {
    updateAnswer() {
      this.$store.dispatch("updateAnswer",{answer: this.answer, questionId: this.$route.params.questionId});
      this.$router.push("/questions/" + this.$route.params.questionId);
    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData();
      formData.append("image", file);
      this.$store.dispatch("uploadImage", formData).then(url => {
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      });
    }
  },
  created() {
    this.$store.dispatch("getOneAnswer", {
      questionId: this.$route.params.questionId,
      answerId: this.$route.params.answerId
    });
  },
  computed: {
    answer() {
      return this.$store.state.answer;
    }
  }
};
</script>

