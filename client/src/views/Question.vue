<template>
  <div class="container" style="background-color: white; min-height: 100vh; padding-top: 40px;">
    <div class="container">
      <div class="row">
        <div class="col-1" style="text-align:center">
          <br>
          <i style="font-size: 30px;" class="fas fa-sort-up"></i>
          <h4>{{ currentQuestion.upvotes.length - currentQuestion.downvotes.length }}</h4>
          <i style="font-size: 30px;" class="fas fa-sort-down"></i>
        </div>
        <div class="col-11">
          <h1>{{ currentQuestion.title }}</h1>
          <br>
          <p>{{ currentQuestion.description}}</p>
          <br>
          <h5>Asked by: {{ currentQuestion.user.username}}</h5>
          <br>
          <div v-if="currentQuestion.user._id === user._id" class="row">
            <div
              style="background-color: #97DCDF;
  width: -moz-max-content;border-radius: 100%; padding: 10px;"
            >
              <a href="#">
                <i
                  style="text-align: center; width: 25px; font-size: 25px; color: #DF9A97"
                  class="fas fa-edit"
                ></i>
              </a>
            </div>&nbsp;&nbsp;&nbsp;&nbsp;
            <div
              style="background-color: #97DCDF;width: -moz-max-content;
              border-radius: 100%; padding: 10px;"
            >
              <a @click="deleteQuestion" href="#">
                <i
                  style="text-align: center; width: 25px; font-size: 25px; color: #DF9A97"
                  class="far fa-trash-alt"
                ></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['isLogin', 'currentQuestion', 'user']),
  },
  created() {
    this.getQuestion();
  },
  methods: {
    getQuestion() {
      this.$store.dispatch('getQuestion', this.$route.params.id);
    },
    deleteQuestion() {
      this.$store.dispatch('deleteQuestion', this.$route.params.id);
    },
  },
};
</script>
