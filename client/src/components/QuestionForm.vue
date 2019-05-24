<template>
  <v-layout column mb-4>
    <v-flex>
      <v-flex>
        <h3>Title</h3>
      </v-flex>
      <v-flex>
        <v-text-field
          placeholder="What's your programming question? Be specific"
          v-model="localQuestion.title"
        ></v-text-field>
      </v-flex>
    </v-flex>
    <v-flex>
      <v-layout column>
        <v-flex>
          <h3>Body</h3>
        </v-flex>
        <!-- Question Textarea -->
        <v-flex>
          <!-- <v-textarea
                        box
                        height="250px"
                        v-model="localQuestion.content"
          ></v-textarea>-->
          <markdown-editor v-model="localQuestion.content" ref="markdownEditor" preview-class="markdown-body"></markdown-editor>
        </v-flex>
        <h3>Preview</h3>
        <v-flex class="preview" mt-3 v-html="output">
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex mt-5>
      <v-layout column>
        <v-flex>
          <h3>Tags</h3>
        </v-flex>
        <v-flex>
          <v-combobox v-model="select" :items="visibleTags" multiple chips></v-combobox>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-flex>
      <v-layout>
        <v-flex>
          <v-btn color="primary" @click="doSubmit">{{submitText}}</v-btn>
          <v-btn color="grey" dark ml-3 @click="doCancel">Cancel</v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
import backend from "@/api/http.js";
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import hljs from 'highlight.js';

export default {
  name: "QuestionForm",
  props: ["question", "type"],
  components: {
      markdownEditor
    },
  data() {
    return {
      output: '',
      select: [],
      visibleTags: [],
      localQuestion: {
        title: "",
        content: "",
        tags: null,
        created_at: null
      },
      tags: []
    };
  },
  mounted() {
    this.getTags();
    this.localQuestion = { ...this.$props.question };
  },
  watch: {
    "localQuestion.content": function(newval, oldval) {
      console.log(newval);
      this.output = this.simplemde.markdown(newval)
    },
  },
  computed: {
    submitText() {
      let type = this.$props.type.toLowerCase();

      if (type === "edit") {
        return "Update";
      } else {
        return "Submit";
      }
    },
    simplemde: function() {
        return this.$refs.markdownEditor.simplemde
    },
  },
  methods: {
    doSubmit() {
      let type = this.$props.type.toLowerCase();
      this.localQuestion.tags = this.select.map(x => {
        let found = this.tags.find(t => x.toLowerCase() == t.name);
        return found._id;
      });
      this.localQuestion.created_at = new Date();
      this.$props.question = this.localQuestion;
      this.$props.question.content = this.output;

      this.$emit("submit", { type: type, question: this.localQuestion });
    },
    doCancel() {
      let type = this.$props.type.toLowerCase();

      if (type === "edit") {
        this.$emit("cancel");
      } else {
        this.$router.push("/questions");
      }
    },
    getTags: function() {
      return backend
        .get(process.env.VUE_APP_SERVER_URL + "/tags")
        .then(({ data }) => {
          this.tags = data;
          this.visibleTags = data.map(x => x.name);

          this.localQuestion.tags.forEach(x => {
            this.tags.forEach(t => {
              if (t._id.toString() === x.toString()) {
                this.select.push(t.name);
              }
            });
          });
        })
        .catch(err => {});
    },
  }
};
</script>

<style scoped>
@import '~simplemde/dist/simplemde.min.css';
@import '~github-markdown-css';
@import '~highlight.js/styles/atom-one-dark.css';

.preview {
  background: rgba(231, 230, 230, 0.521);
}
</style>
