<template>
  <v-app dark>
    <toolbar @error="error"></toolbar>

    <v-content>
      <v-container>
        <v-layout>
          <sidebar @error="error"></sidebar>
          <v-flex xs9>
            <div>
              <v-container>
                <router-view :questions="questions" @error="error" @update-questions="fetchBoth"></router-view>
              </v-container>
            </div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-container>
    </v-container>
  </v-app>
</template>

<script>
import toolbar from "./components/toolbar.vue";
import sidebar from "./components/sidebar.vue"

export default {
  name: "App",
  components: {
    toolbar, sidebar
  },
  data() {
    return {
      questions: [],
      answers: []
    };
  },
  methods: {
    error(err) {
      console.log({ err, origin: err.origin })
      let { response } = err
      if(response) {
        let { status, statusText, data } = response
        swal.fire(`Error ${status}: ${statusText}`, data.message, 'error')
      } else {
        let eror = err.message || err
        swal.fire(eror)
      }
    },
    fetchBoth() {
      this.fetchQuestions()
      this.fetchAnswers()
    },
    fetchQuestions() {
      axios({
        method: 'get',
        url: 'http://34.87.71.136/questions'
      })
        .then(({ data }) => {
          // console.log({ data })
          data.forEach(item => {
            item.createdAt = new Date(item.createdAt).toDateString();
          });
          this.questions = data
        })
        .catch(err => {
          err.origin = 'fetchQuestion'
          this.error(err)
        })
    },
    fetchAnswers() {
      axios({
        method: 'get',
        url: 'http://34.87.71.136/answers'
      })
        .then(({ data }) => {
          // console.log({ data })
          data.forEach(item => {
            item.createdAt = new Date(item.createdAt).toDateString();
          });
          this.answers = data
        })
        .catch(err => {
          err.origin = 'fetchAnswers'
          this.error(err)
        })
    },
    checkLog() {
      
    }
  },
  created() {
    this.fetchBoth()
    this.$store.commit('checkLog')
  }
};
</script>

<style>
.test-border {
  border: 1px solid red;
}
.plain {
  color: white;
  text-decoration: none;
}
</style>