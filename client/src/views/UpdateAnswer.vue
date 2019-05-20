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
        <button type="click" @click="updateanswer">Edit Answer</button>
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
  name: "updateanswer",
  data() {
    return {
      answer: "",
      text: "",
      answerData: {},
      answerId: ""
    };
  },
  components: {
    wysiwyg: vueWysiwyg.default.component
  },
  methods: {
    updateanswer() {
      axios
        .put(
          "/answers/update/" + this.answerId,
          {
            answer: this.answer,
            description: this.text
          },
          {
            headers: {
              jwtoken: localStorage.jwtoken
            }
          }
        )
        .then(data => {
          console.log(data);
          Swal.fire({
            type: "success",
            text: "You have successfully edit an answer!"
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
  },
  created() {
    this.answerData = this.$store.state.indivAnswerData;
    this.answerId = this.$store.state.indivAnswerData._id;
    this.answer = this.$store.state.indivAnswerData.answer;
    this.text = this.$store.state.indivAnswerData.description;
  }
};
</script>

<style src="../components/wysiwyg/style.css"></style>
