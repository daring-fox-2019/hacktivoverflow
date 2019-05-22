<template>
  <v-container grid-list-md>
    <form>
      <v-layout row>
        <h1 class="ml-2 display-1 font-weight-medium text-uppercase">POST QUESTION</h1>
      </v-layout>
      <v-layout row>
        <p class="ml-2 mt-2">The title is the first thing potential answerers will see, and if your title isn't interesting, they won't read the rest. So make it count<br>
          In the body of your question, start by expanding on the summary you put in the title. Explain how you encountered the problem you're trying to solve, and any difficulties that have prevented you from solving it yourself. The first paragraph in your question is the second thing most readers will see, so make it as engaging and informative as possible.
        </p> 
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-flex xs12>
            <v-text-field v-model="title" :counter="10" label="Title" required></v-text-field>
            <ckeditor :editor="editor" v-model="description"></ckeditor>
          </v-flex>
        </v-flex>
      </v-layout>

      <v-container grid-list-xs>
        <v-layout>
          <v-flex xs6>
            <v-combobox
              v-model="value"
              :items="items"
              :search-input.sync="search"
              hide-selected
              hint="Press enter upon adding"
              label="Add some tags"
              multiple
              persistent-hint
              small-chips
            >
              <template v-slot:no-data>
                <v-list-tile>
                  <v-list-tile-content>
                    <v-list-tile-title>
                      No results matching "
                      <strong>{{ search }}</strong>". Press
                      <kbd>enter</kbd> to create a new one
                    </v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
            </v-combobox>
          </v-flex>

          <v-flex xs6>
            <section id="buttonpost">
              <section v-if="this.$route.name == 'ask'">
                <v-btn @click="postQuestion">Post Question</v-btn>
              </section>
              <section v-else-if="this.$route.name == 'edit-question'">
                <v-btn @click="editQuestion">Edit Question</v-btn>
              </section>
            </section>
          </v-flex>
        </v-layout>
      </v-container>
    </form>
  </v-container>
</template>



<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      items: [],
      value: [],
      mode: "",
      title: "",
      description: "",
      editor: ClassicEditor,
      fill: "",
      search: ""
    };
  },
  created() {
    console.log(this.$route.name, "==", "edit-question");
    this.getTags();
    if (this.$route.name == "edit-question") {
    this.getOneQuestion();
      this.mode == "edit";
      console.log("nyari question");
    }
  },
  methods: {
    getTags() {
      this.axios
        .get(`/tags`, { headers: { token: localStorage.getItem("token") } })
        .then(({ data }) => {
          for (let i = 0; i < data.length; i++) {
            this.items.push(data[i].name);
          }
        })
        .catch(err => {
          Swal.fire({
            type: "error",
            text: `${err.response}!`
          });
        });
    },
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1);
      this.chips = [...this.chips];
    },
    postQuestion() {
      this.axios
        .post(
          `/questions`,
          {
            title: this.title,
            description: this.description,
            tags: this.value
          },
          { headers: { token: localStorage.getItem("token") } }
        )
        .then(({ data }) => {
          Swal.fire({
            type: "sucesss",
            text: "Posted!"
          });
          // console.log(data, "kebuat gak?");
          this.$router.push({ name: "dashboard" });
        })
        .catch(err => {
          Swal.fire({
            type: "sucesss",
            text: `${err.response}!`
          });
          console.log(err.err.response);
        });
    },
    getOneQuestion() {
      this.axios
        .get(`/questions/${this.$route.params.id}`)
        .then(({ data }) => {
          this.title = data.title;
          this.description = data.description;
          data.tags.forEach(tg => {
            this.value.push(tg.name);
          });
          console.log(data, "dapet gak??");
        })
        .catch(err => {
          console.log(err, "errornya apa? di get one q!");
        });
    },
    editQuestion() {
      this.axios
        .patch(
          `/questions/edit/${this.$route.params.id}`,
          {
            title: this.title,
            description: this.description,
            tags: this.value
          },
          {
            headers: { token: localStorage.getItem("token") }
          }
        )
        .then(({ data }) => {
          this.$router.push(`/dashboard`);
        })
        .catch(err => {
          console.log(err, "errornya apa? di editt one q!");
        });
    }
  }
};
</script>

<style>

</style>
