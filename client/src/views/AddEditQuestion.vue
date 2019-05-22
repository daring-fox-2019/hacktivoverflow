<template>
  <div>
    <v-layout>
      <v-flex mt-5 mx-5 justify-center>
        <v-card class="elevation-12">
          <v-toolbar dark color="dark">
            <v-toolbar-title>{{ statusAction}} Question</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field name="title" v-model="question.title" label="Title" type="text"></v-text-field>
              <wysiwyg v-model="question.description" style="height:300px; text-align: left; overflow: scroll;"/>
              <v-flex>
                <vue-tags-input
                  v-model="tag"
                  :tags="question.tags"
                  @tags-changed="newTags => question.tags = newTags"
                />
              </v-flex>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="success" @click="addQuestion" v-if="statusAction==='Add'">Send</v-btn>
            <div v-else>
              <v-btn color="red" @click="back">Back</v-btn>
              <v-btn color="success" @click="editQuestion">Send</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";
import VueTagsInput from "@johmun/vue-tags-input";

export default {
  components: {
    VueTagsInput
  },
  data() {
    return {
      question: {
        title: "",
        description: "",
        tags: []
      },
      statusAction: "Add",
      tag: ""
    };
  },
  watch: {},
  created() {
    if (this.$route.params.id) {
      this.statusAction = "Edit";
    }
    this.fetchData();
  },
  methods: {
    fetchData() {
      axios
        .get(`http://35.198.235.228/questions/${this.$route.params.id}`)
        .then(({ data }) => {
          this.question.title = data.title;
          this.question.description = data.description;
          this.question.tags = data.tags;
        })
        .catch(err => {
          console.log(err);
        });
    },
    addQuestion() {
      let tag = [];
      this.question.tags.forEach(element => {
        tag.push(element.text);
      });
      this.question.tags = tag;

      axios
        .post("http://35.198.235.228/questions", this.question, {
          headers: { token: localStorage.token }
        })
        .then(() => {
          this.reset();
          this.$store.dispatch("loadQuestion");
          console.log("SUCCESS");
        })
        .catch(err => {
          console.log(err);
        });
    },
    editQuestion() {
      axios
        .put(
          `http://35.198.235.228/questions/${this.$route.params.id}`,
          this.question,
          {
            headers: { token: localStorage.token }
          }
        )
        .then(() => {
          this.reset();
          this.$router.push(`/questions/${this.$route.params.id}`);
          console.log("SUCCESS");
        })
        .catch(err => {
          console.log(err);
        });
    },
    back() {
      this.$router.push(`/questions/${this.$route.params.id}`);
    },
    reset() {
      this.question.title = "";
      this.question.description = "";
      this.question.tags = [];
    }
  }
};
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

.detailProduct {
  margin-left: 30px;
}

#list {
  padding: 10px;
  height: 100vh;
  overflow: scroll;
  margin-right: 5px;
}

#detail {
  display: fixed;
}

#formEdit {
  text-align: center;
  justify-content: center;
  align-content: center;
  display: flex;
}

.vue-tags-input {
  max-width: none;
  width: 100%;
}
</style>
