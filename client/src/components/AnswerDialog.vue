<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn flat color="black" v-on="on">Answer</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Answer Form</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <ckeditor
                style="height:500px"
                :editor="editor"
                v-model="answer"
                :rules="[rules.required]"
                counter
                hint="Be as specific as possible!"
              ></ckeditor>
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
            v-on:click="createAnswer"
          >Submit!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  props: ["QuestionId"],
  data: () => ({
    editor: ClassicEditor,
    dialog: false,
    answer: "",
    rules: {
      required: value => !!value || "Required."
    }
  }),
  methods: {
    createAnswer() {
      const { QuestionId, answer } = this;
      let token = localStorage.getItem("token");
      this.$axios
        .post(`/answers`, { answer, QuestionId }, { headers: { token } })
        .then(({ data }) => {
          const { message, createdAnswer } = data;
          this.$swal("Success!", message, "success");
          this.$emit("createAnswer");
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
