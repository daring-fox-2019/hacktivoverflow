<template>
  <div>
    <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout row>
            <h3 class="ml-4">You are currently viewing thread for :</h3>
          </v-layout>
          <v-layout row>
            <h1 class="mb-3 ml-4 display-2 font-weight-medium">{{oneQuestionDetails.title}}</h1>
          </v-layout>
          <QuestionCard :q="oneQuestionDetails"></QuestionCard>
          <v-spacer></v-spacer>
          <AnswerCard
            v-for="(ans, index) in answersOnThisQuestion"
            :ans="ans"
            :key="index"
          ></AnswerCard>
          <br>
          <br>
          <ckeditor :editor="editor" v-model="fill"></ckeditor>
            <v-btn style="display:flex; " justify-end align-end @click="postAnswer">Answer</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import QuestionCard from "../components/QuestionCard";
import AnswerCard from "../components/AnswerCard";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapState, mapActions } from "vuex";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      editor: ClassicEditor,
      fill: "",
      answers: []
    };
  },
  components: {
    QuestionCard,
    AnswerCard
  },
  created() {
    // console.log('kebuatttttt dudududu');
  },
  methods: {
    ...mapActions(["getDetailsOnThisQuestion", "getListAnswersOnThisQuestion"]),
    getDetailsOnQuestion() {
      this.getDetailsOnThisQuestion(this.$route.params.id);
      // this.$store.dispatch('getDetailsOnThisQuestion', this.$route.params.id)
      // this.axios
      //   .get(`/questions/${this.$route.params.id}`)
      //   .then(({ data }) => {
      //     this.q = data;
      //     console.log(data, "/????");
      //   })
      //   .catch(err => {
      //     console.log(err.response, "apa erooor?????");
      //   });
    },
    getAnswersOnThisQuestion() {
      this.getListAnswersOnThisQuestion(this.$route.params.id);

      // this.$store.dispatch('getListAnswersOnThisQuestion', this.$route.params.id)

      //   console.log('kalo disini masu ga');
      // this.axios
      //   .get(`/answers/question/${this.$route.params.id}`)
      //   .then(({ data }) => {
      //       this.answers = data
      //     console.log("ini jawaban kalo ada", data);
      //   })
      //   .catch(err => {
      //     console.log(err.response);
      //   });
    },
    postAnswer() {
      this.axios
        .post(
          `/answers`,
          {
            description: this.fill,
            userId: localStorage.getItem("id"),
            questionId: this.$route.params.id
          },
          {
            headers: { token: localStorage.getItem("token") }
          }
        )
        .then(({ data }) => {
          Swal.fire({
            type: "success",
            title: "You post an answer"
          });
          // console.log('sukes ke jawab!!');
          this.getDetailsOnQuestion();
          this.getAnswersOnThisQuestion();
          this.fill = "";
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Something is wrong.."
          });
          // console.log(err.response, 'gagal jawab!!');
        });
    }
  },
  created() {
    this.getDetailsOnQuestion();
    this.getAnswersOnThisQuestion();
    // console.log("masuk sini bosq");
  },
  computed: {
    ...mapState(["oneQuestionDetails", "answersOnThisQuestion"])
  }
};
</script>

<style>
.ck-editor__editable_inline {
  min-height: 250px;
}
</style>
