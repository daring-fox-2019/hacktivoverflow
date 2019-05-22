<template>
  <div class="container grey--text text--darken-3">
    <span class="title ml-3 mr-5 grey--text text--darken-3">
      New
      <span class="font-weight-light accent--text">Question</span>
    </span>
    <v-form @submit.prevent="submitQuestion">
      <div class="container">
        <v-text-field v-model="title" label="your question goes here" required light single-line></v-text-field>
        <VueEditor
          id="editor"
          useCustomImageHandler
          @imageAdded="handleImageAdded"
          v-model="editorData"
        />
        <div class="right mt-3">
          <v-btn type="submit" flat class="grey--text text--darken-3">
            <v-icon class="mr-2">send</v-icon>
            <span>submit your question</span>
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
      editorData: "describe your problem here",
      title: ""
    };
  },
  components: {
    VueEditor
  },
  methods: {
    submitQuestion() {
      let newQuestion = {
        title: this.title,
        body: this.editorData
      };
      this.$store.dispatch("submitQuestion", newQuestion);
      this.$router.push("/");
    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      let formData = new FormData();
      formData.append("image", file);
      this.$store.dispatch("uploadImage", formData).then(url => {
        Editor.insertEmbed(cursorLocation, "image", url);
        resetUploader();
      });
    }
  }
};
</script>

