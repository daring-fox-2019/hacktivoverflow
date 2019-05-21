<template>
  <div>
    <b-container>
      <br />
      <b-row>
        <div class="label">
          <label for="question">Question</label>
        </div>
        <div class="input">
          <input v-model="question" type="text" name="question" id="question" placeholder="your question here.." />
        </div>
      </b-row>
      <b-row>
        <wysiwyg style="height:500px;width:100%;overflow:auto" id="editor" v-model="text"></wysiwyg>
      </b-row>
      <br /><br />
      <b-row>
        <div class="label">
          <label for="tags">Watch Tags</label>
        </div>
        <div>
          <vue-tags-input v-model="tag" :tags="watchTags" @tags-changed="newTags => tags = newTags" />
        </div>
        <!-- <div class="input">
          <input v-model="watchTags[0]" style="margin-bottom:10px" type="text" name="tags" id="tag1"
            placeholder="this question tag.." />
          <br />
          <input v-model="watchTags[1]" style="margin-bottom:10px" type="text" name="tags" id="tag2"
            placeholder="this question tag.." />
          <br />
          <input v-model="watchTags[2]" type="text" name="tags" id="tag3" placeholder="this question tag.." />
        </div> -->
      </b-row>
      <br /><br /><br /><br />
      <b-row align-h="center">
        <button type="click" @click="addquestion">Add Question</button>
      </b-row>
    </b-container>
  </div>
</template>

<script src="../components/wysiwyg/index.js"></script>
<script>
  import wysiwyg from "@/components/wysiwyg/index.js";
  import axios from "@/api/axios";
  import Swal from "sweetalert2";
  import VueTagsInput from '@johmun/vue-tags-input'

  export default {
    name: "addquestion",
    data() {
      return {
        question: "",
        text: "",
        watchTags: [],
        tag: '',
        tags: []
      };
    },
    components: {
      wysiwyg: vueWysiwyg.default.component,
      VueTagsInput
    },
    watch: {
      tags(){
        this.watchTags = this.tags.map(el=>el.text)
        console.log(this.watchTags)
      }
    },
    methods: {
      addquestion() {
        axios
          .post(
            "/questions/add", {
              question: this.question,
              description: this.text,
              watchTags: this.watchTags
            }, {
              headers: {
                jwtoken: localStorage.jwtoken
              }
            }
          )
          .then(data => {
            console.log(data);
            Swal.fire({
              type: "success",
              text: "You have successfully add new question!"
            });
            this.$router.push("question");
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