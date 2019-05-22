<template>
  <div class="home my-container__small">
      <Sidebar />
      <div style="width: 644px;">
        <div class="heads">
          <h5 slot="header">All Questions</h5>
          <button @click="goToCreateQuestion()" class="btn btn-primary">Ask Question</button>
        </div>
        <QuestionList
          :questions="stateQuestion"
        />
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
import QuestionList from '@/components/QuestionList.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
  name: 'home',
  components: {
    QuestionList,
    Sidebar
  },
  methods: {
    goToCreateQuestion() {
      if(localStorage.token) {
        this.$router.push('/question/ask')
      }else{
        this.$router.push('/login')
      }
    }
  },
  computed: {
    stateQuestion() {
      return this.$store.state.questions
    }
  },
  watch: {
    stateQuestion() {
      return this.$store.state.questions
    }
  },
}
</script>

<style>
.my-container__small {
  display: flex;
  justify-content: space-between;
}
.heads {
  display: flex;
  justify-content: space-between;
}
</style>

