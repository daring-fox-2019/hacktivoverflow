<template>
  <v-container fluid grid-list-sm>
    <v-layout align-start justify-start column fill-height>
      <v-flex xs-12 style="width:100%">
        <div class="title">Title</div>
        <v-text-field v-model="title" color="cyan darken" placeholder="Start typing..." loading>
          <template v-slot:progress>
            <v-progress-linear :title="progress" :color="color" height="7"></v-progress-linear>
          </template>
        </v-text-field>
      </v-flex>
      <v-flex xs-12>
        <ckeditor :editor="editor" v-model="question" :config="editorConfig"></ckeditor>
        <v-layout row wrap align-center justify-start class="my-4">
          <v-flex xs6 md4>
            <!-- <v-text-field v-model="tags" label="Input Tags"></v-text-field> -->
            <v-combobox
              v-model="tags"
              :items="allTags"
              :label="`input tags`"
             
              multiple
              hide-no-data
              dense
              small-chips
            >
              <template v-slot:no-data>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      Press
                      <kbd>enter</kbd> to create a new one
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-combobox>
          </v-flex>
 
        </v-layout>
        <v-btn v-if="editMode" depressed small color="primary" @click.prevent="editQuestion">Submit</v-btn>
        <v-btn v-else depressed small color="primary" @click.prevent="setQuestion">Submit</v-btn>
        <v-btn depressed small color="primary" @click="clear">Clear</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { mapActions } from "vuex";
import axios from "axios";
const baseURL = "http://localhost:3000";
export default {
  name: "ckEditor",
  components: {},
  created() {
    if (this.$route.params.id) {
      axios
        .get(`${baseURL}/questions/${this.$route.params.id}`)
        .then(({ data }) => {
          console.log(data);
          this.title = data.title;
          this.question = data.description;
          data.tags.forEach(tag => {
            this.tags.push(tag.tagName);
          });
          this.editMode = this.$store.state.editMode;
        })
        .catch(err => {
          console.log(err);
        });
      this.fetchTags()
    } else {
      this.fetchTags()
      console.log("editMode false");
    }
  },
  data() {
    return {
      title: "",
      editor: ClassicEditor,
      question: "Input Your Question Here...",
      editorConfig: {
        width: 900,
        esize_minWidth: 900
      },
      tags: [],
      allTags: [],
      editMode: false
    };
  },
  methods: {
    clear() {
      (this.question = ""), (this.title = "");
    },
    fetchTags() {
      axios
        .get(`${baseURL}/tags`, {
          headers: { token: localStorage.getItem("token") }
        })
        .then(({ data }) => {
          data.forEach(tag => {
            this.allTags.push(tag.tagName);
          });
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    setQuestion() {
      let newQuestion = {
        title: this.title,
        description: this.question,
        user: localStorage.getItem("id"),
        tags: this.tags
      };
      this.createQuestion(newQuestion);
    },
    ...mapActions(["createQuestion"]),
    editQuestion() {
      let questionId = this.$route.params.id;
      let newData = {
        title: this.title,
        description: this.question,
        tags: this.tags
      };
      axios
        .patch(`${baseURL}/questions/${questionId}`, newData, {
          headers: {
            token: localStorage.getItem("token")
          }
        })
        .then(({ data }) => {
          console.log(data);
          this.$swal("Yeap", data.message, "success");
          this.$router.push("/questions/myList");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {
    progress() {
      return Math.min(100, this.title.length * 10);
    },
    color() {
      return ["error", "warning", "success"][Math.floor(this.progress / 40)];
    }
  }
};
</script>

<style>
</style>
