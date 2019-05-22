<template>
  <div>
    <b-container>
      <br />
      <b-row class="mb-3">
        <b-col cols="2">
          <label for="answer" style="margin-left:-15px;">Answer Title</label>
        </b-col>
        <b-col cols="9">
          <input v-model="answer" type="text" name="answer" id="answer" style="width: 500px"
            placeholder="your answer here.." />
        </b-col>
      </b-row>
      <b-row>
        <wysiwyg style="height:500px;width:100%;overflow:auto" id="editor" v-model="text"></wysiwyg>
      </b-row>
      <br />
      <b-row align-h="center">
        <button class="btn btn-secondary" type="click" @click="updateanswer">Edit Answer</button>
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
            "/answers/update/" + this.answerId, {
              answer: this.answer,
              description: this.text
            }, {
              headers: {
                jwtoken: localStorage.jwtoken
              }
            }
          )
          .then(data => {
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