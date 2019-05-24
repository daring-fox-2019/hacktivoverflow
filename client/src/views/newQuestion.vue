<template>
  <div>
    <h1>New Question</h1>
    <v-container>
      <v-card>
        <v-card-text>
          <v-form ref="newform">
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  autofocus
                  label="Title"
                  v-model="newQuestion.title"
                  :rules="requiredRule"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  :rules="requiredRule"
                  name="description"
                  label="Description"
                  v-model="newQuestion.description"
                  auto-grow
                ></v-textarea>
              </v-flex>
              <v-flex xs12>
                <div class="mb-2">
                  <label for="tags">Tags</label>
                </div>
                <div>
                  <input-tag v-model="newQuestion.tags"></input-tag>
                </div>
              </v-flex>
              <v-flex xs12 class="mt-2">
                <v-btn @click.prevent="createQuestion">Submit</v-btn>
              </v-flex>
            </v-layout>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import inputTag from 'vue-input-tag'
import formTemplate from '../components/form.vue'


export default {
  components: {
    inputTag,
    formTemplate
  },
  data() {
    return {
      newQuestion: {
        title: "",
        description: "",
        tags: []
      },
      requiredRule: [v => !!v || "Field required"]
    };
  },
  methods: {
    createQuestion() {
      axios({
        method: 'post',
        url: 'http://34.87.71.136/questions',
        headers: {
          token: localStorage.token
        },
        data: this.newQuestion
      })
        .then(({ data }) => {
          swal.fire('Success!', 'Question created.', 'success')
          this.$router.push('/')
          // this.$emit('update-questions')
        })
        .catch(err => {
          console.log({ err })
          err.origin = 'newquestion.vue - create question'
          this.$emit('error', err)
        })
    }
  }
};
</script>

<style>
  @import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>