<template>
  <div class="container text-justify">
    <b-form @submit.prevent="onSubmit" @reset="onReset">
      <b-form-group
        v-if="isQuestion"
        id="input-title"
        label="Your question title:"
        label-for="title"
      >
        <b-form-input id="title" v-model="form.title" required placeholder="Enter title"></b-form-input>
      </b-form-group>

      <ckeditor :editor="editor" v-model="form.content" :config="editorConfig"></ckeditor>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>

    <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import server from "@/api/api";
import swal from "sweetalert2";

export default {
  data() {
    return {
      form: {},
      isQuestion: true,
      editor: ClassicEditor,

      // editorData: "<p>Rich-text editor content.</p>",
      editorConfig: {
        // The configuration of the rich-text editor.
      }
    };
  },

  mouted() {    
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.registerNewQuestion(this.form);
    },
    onReset(evt) {
      evt.preventDefault();
      this.form = {};
      this.show = false;
    },
    async registerNewQuestion(newQuestion) {
      console.log(`registering and later log  the new user in`);
      try {
        let response = await server.post(`/question`, newQuestion);
        if (response.status == 201) {
          swal.fire(
            "question posted",
            "generous people are going to answer it...",
            "success"
          );
          this.$store.commit("addQuestion", response.data);
        }
      } catch (error) {
        if (error.response) {
          if (error.response.data.message) {
            console.log(error.response.data);
            swal.fire(
              `server says: ${error.response.status}`,
              `${error.response.data.message}`,
              "question"
            );
          } else {
            console.log(error.response.data);
            swal.fire(
              `server says: ${error.response.status}`,
              `check the log`,
              "question"
            );
          }
        } else if (error.request) {
          swal.fire("Server Unreachable", "check your internet", "warning");
          console.log(error.request);
        } else {
          swal.fire("application error", "check log", "error");
          console.log(error);
        }
      } finally {
        this.$router.replace("home");
      }
    }
  }
};
</script>