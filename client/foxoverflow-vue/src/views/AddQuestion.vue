<template>
  <v-container
    style="width: 55%; background-color: white; border-radius: 5px; padding-left: 3rem; padding-right: 3rem; padding-bottom: 0.5rem; margin-top: 3%;"
  >
    <v-form @submit.prevent="submitNewQuestion">
      <v-layout row wrap>
        <v-flex xs12 mb-3>
          <h4>Title:</h4>
          <v-text-field v-model="title" placeholder="" required style="margin: 0; padding: 0;"></v-text-field>
        </v-flex>

        <v-flex xs12 mb-4>
          <h4 class="mb-2">Tags:</h4>
          <tags-input
            element-id="tags"
            v-model="selectedTags"
            :typeahead="true"
          ></tags-input>
        </v-flex>

        <v-flex xs12>
          <h4 class="mb-2">Description:</h4>
          <wysiwyg v-model="description"/>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 class="my-2">
          <v-btn color="info" type="submit" style="margin-left: 0;">Submit Question</v-btn>
          <v-btn color="error" style="margin-left: 0;" flat to="/">Cancel</v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-container>
</template>

<script>
import axios from "@/api/axios";
import Swal from "sweetalert2";

export default {
  data: () => ({
    title: "",
    description: "",
    selectedTags: [],
  }),
  computed: {
    progress() {
      return Math.min(100, (this.description.length * 100) / 6);
    },
    color() {
      return ["error", "warning", "success"][Math.floor(this.progress / 40)];
    }
  },
  methods: {
    submitNewQuestion() {
      console.log("invoked");
      console.log(this.title);
      console.log(this.description);
      console.log(this.selectedTags);

      const { title, description, selectedTags } = this;
      const questionData = { 
        title, 
        description, 
        tags: selectedTags 
      };

      axios({
        method: "POST",
        url: `/questions`,
        data: questionData,
        headers: { token: localStorage.token }
      })
        .then(({ data }) => {
          console.log(data);

          // localStorage.userId = data.id;
          // localStorage.token = data.token;
          // localStorage.title = data.title;
          // localStorage.fullName = data.fullName;
          // localStorage.displayPicture = data.displayPicture;

          this.title = "";
          this.description = "";
          this.$store.commit("login");
          this.$store.commit("setFullName");
          this.$router.push("/");

          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "success",
            title: "Question posted"
          });
        })
        .catch(err => {
          // console.log(err.response);
          // console.log(err.response.data.message);

          const Toast = Swal.mixin({
            toast: true,
            position: "top",
            showConfirmButton: false,
            timer: 3000
          });

          Toast.fire({
            type: "error",
            title: err.response.data.message
          });
        });
    }
  }
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.v-messages__message {
  margin-top: 1rem;
}

.v-text-field .v-input__prepend-inner {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
