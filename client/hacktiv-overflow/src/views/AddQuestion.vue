<template>
  <div class="container d-flex justify-content-center" style="margin-top:140px">
    <div style="width:75%">
      <h4>Question Here...</h4>
      <hr>
      <div class="mb-2 mt-4">
        <b-form-input id="title" v-model="question.title" placeholder="Enter Title"></b-form-input>
      </div>
      <Editor :init-value="question.description" @getdata="getData" ref="editor"/>
      <div class="mt-2">
        <vue-tags-input
          v-model="tag"
          :tags="question.tags"
          @tags-changed="newTags => question.tags = newTags"
          style="max-width:none; width:100%"
        />
      </div>
      <div class="mt-5">
        <b-button variant="outline-primary" @click="submitQuestion" v-if="!question_id">
          submit question
          <i class="fab fa-telegram-plane"></i>
        </b-button>
        <b-button variant="outline-primary" @click="updateQuestion" v-if="question_id">
          edit question
          <i class="fab fa-telegram-plane"></i>
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
import Editor from "@/components/Editor";
import axios from "@/database/axios";
import VueTagsInput from "@johmun/vue-tags-input";

export default {
  name: "addquestion",
  data() {
    return {
      trigger: false,
      question: {
        description: "",
        title: null,
        tags: []
      },
      tag: "",
      question_id: this.$route.params.id
    };
  },
  components: {
    Editor,
    VueTagsInput
  },
  mounted() {
    if (this.$route.params.id) {
      this.getOneQuestion();
    }
  },
  methods: {
    getOneQuestion() {
      axios
        .get(`/questions/${this.question_id}`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          this.question.description = data.description;
          this.question.title = data.title;
          this.question.tags = data.tags;
        });
    },
    getData(data) {
      this.question.description = data;
    },
    updateQuestion() {
      this.$refs.editor.emitData()

      axios
        .patch(`/questions/${this.$route.params.id}`, this.question, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          this.$swal('Yay', 'update success', 'success')
          this.$store.commit('editQuestion', data)
        })
        .catch(err => {
          this.$swal('Ooops', `${err.response.data.message}`, 'error')
        });
    },
    submitQuestion() {
      this.$refs.editor.emitData()
      axios
        .post(`/questions`, this.question, {
          headers: { token: localStorage.getItem("token")}
        })
        .then(({ data }) => {
          this.question.description = ''
          this.question.title = ''
          this.question.tags = []
          this.$swal(":D", `Yay success add question`, "success");
          this.$router.push('/')
        })
        .catch(err => {
          this.$swal(":(", `${err.response.data.message}`, "error");
        });
    }
  }
};
</script>

