<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn flat color="black" dark v-on="on">EDIT</v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">Edit Answer</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <!-- ANSWER TEXT AREA -->
            <v-flex xs12>
              <!-- CKEDITOR -->
              <ckeditor
                style="height:500px"
                :editor="editor"
                v-model="answer"
                :rules="[rules.required]"
                counter
                hint="Be as specific as possible!"
              ></ckeditor>
              <!-- END OF CKEDITOR -->
            </v-flex>
            <!-- END OF ANSWER TEXT AREA -->
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
          v-on:click="editAnswer(answerDetails._id)"
        >Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  props: ["answerDetails"],
  data() {
    return {
      editor: ClassicEditor,
      answer: this.answerDetails.answer,
      dialog: false,
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    editAnswer(AnswerId) {
      const { answer } = this;
      let token = localStorage.getItem("token");
      this.$axios
        .patch(`/answers/${AnswerId}`, { answer }, { headers: { token } })
        .then(({ data }) => {
          const { message } = data;
          this.$swal("Success!", message, "success");
          this.$store.dispatch("getUserAnswers");
          this.$store.dispatch("getQuestions");
        })
        .catch(err => {
          conosle.log(err);
        });
    }
  }
};
</script>

<style>
</style>
