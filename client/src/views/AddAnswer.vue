<template>
  <div>
    <b-container>
      <br />
      <b-row>
        <div class="label">
          <label for="answer">Answer Title</label>
        </div>
        <div class="input">
          <input
            v-model="answer"
            type="text"
            name="answer"
            id="answer"
            placeholder="your answer here.."
          />
        </div>
      </b-row>
      <b-row>
        <wysiwyg
          style="height:500px;width:100%;overflow:auto"
          id="editor"
          v-model="text"
        ></wysiwyg>
      </b-row>
      <br /><br />
      <br /><br /><br /><br />
      <b-row align-h="center">
        <button type="click" @click="addanswer">Add Answer</button>
      </b-row>
    </b-container>
  </div>
</template>

<script src="../components/wysiwyg/index.js"></script>
<script>
import wysiwyg from "@/components/wysiwyg/index.js";
import axios from "@/api/axios";
import Swal from "sweetalert2";

export default {
  name: "addanswer",
  data() {
    return {
      answer: "",
      text: ""
    };
  },
  components: {
    wysiwyg: vueWysiwyg.default.component
  },
  methods: {
    addanswer() {
      axios
        .post(
          "/answers/add",
          {
            answer: this.answer,
            question: this.question,
            description: this.text,
            questionId: this.$route.params.questionId
          },
          {
            headers: { jwtoken: localStorage.jwtoken }
          }
        )
        .then(data => {
          console.log(data);
          Swal.fire({
            type: "success",
            text: "You have successfully add an answer!"
          });
          this.$router.go(-1);
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            title: "Error!",
            text: err.message
          });
        });
    }
  }
};
</script>

<style src="../components/wysiwyg/style.css"></style>
