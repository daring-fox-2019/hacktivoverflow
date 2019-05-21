<template>
  <div>
    <v-layout>
      <v-flex mt-5 mx-5 justify-center>
        <v-card class="elevation-12">
          <v-toolbar dark color="dark">
            <v-toolbar-title>Add Question</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field name="title" v-model="question.title" label="Title" type="text"></v-text-field>
              <v-textarea
                name="description"
                label="Description"
                hint="Description question"
                v-model="question.description"
              ></v-textarea>
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
            <v-btn color="success" @click="addQuestion">Send</v-btn>
            <!-- <v-btn color="red" @click="edit">Cancel</v-btn> -->
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
      tag: ""
    };
  },
  watch: {},
  created() {},
  methods: {
    fetchData() {
      axios
        .get(`http://localhost:3000/products/${this.$route.params.id}`)
        .then(({ data }) => {
          this.product = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateTags() {
      this.$nextTick(() => {
        this.select.push(...this.search.split(","));
        this.$nextTick(() => {
          this.search = "";
        });
      });
    },
    addQuestion() {
      console.log(localStorage.token);

      axios
        .post("http://localhost:3000/questions", this.question, {
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
    reset() {
      this.question.title = "";
      this.question.description = "";
      this.question.tags = [];
    }
  }
};
</script>

<style scoped>
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
