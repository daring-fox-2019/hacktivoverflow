<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn flat color="black" dark v-on="on">EDIT</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Thread</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <!-- TITLE -->
            <v-flex xs12>
              <v-text-field label="Title" v-model="title" :rules="[rules.required]"></v-text-field>
            </v-flex>
            <!-- END OF TITLE -->

            <!-- DESCRIPTION -->
            <v-flex xs12>
              <ckeditor
                style="height:500px"
                :editor="editor"
                v-model="description"
                :rules="[rules.required]"
                counter
                hint="Be as specific as possible!"
              ></ckeditor>
            </v-flex>
            <!-- END OF DESCRIPTION -->
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
        <v-btn
          color="blue darken-1"
          flat
          @click="dialog = false"
          v-on:click="editQuestion(questionDetails._id)"
        >Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  props: ["questionDetails"],
  data() {
    return {
      editor: ClassicEditor,
      title: this.questionDetails.title,
      description: this.questionDetails.description,
      dialog: false,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    editQuestion(QuestionId) {
      const { title, description } = this;
      let token = localStorage.getItem("token");
      this.$axios
        .patch(
          `/questions/${QuestionId}`,
          { title, description },
          { headers: { token } }
        )
        .then(({ data }) => {
          const { message } = data;
          this.$swal("Success!", message, "success");
          this.$store.dispatch("getUserQuestions");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
</style>
