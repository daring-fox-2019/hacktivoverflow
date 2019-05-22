<template>
  <b-container fluid>
    <b-container>
      <b-row>
        <b-col cols="2" class="pr-0">
          <!-- left navbar -->
          <LeftNav/>
        </b-col>
        <!-- middle -->
        <b-col class="px-0 d-flex flex-column border-left col-7">
          <div class="d-flex py-3 justify-content-between border-bottom">
            <div class="px-3"
              style="font-size:30px;">{{question.question}}</div>
            <b-button variant="outline-primary"
              class="p-1 align-self-end"
              style="font-size: 15px;"
              @click="askNewQuestion">Ask another Question</b-button>
          </div>
          <!-- answer detail card -->
          <DetailQuestion :question="question"/>
            <div class="border-bottom mt-4 px-3"
              style="font-size:20px;">Answer Below</div>
          <DetailAnswer
            v-for="answer in answers"
            :key="answer._id"
            :answer="answer"/>

          <!-- write answer below -->
          <div class="mt-4 px-3" style="font-size:20px;" > 
            Write Your Answer
          </div>
          <div  class="pl-3">
            <div>
              <wysiwyg v-model="text"/>

            </div>
            <div style="font-size:16px;" class="py-2">{{'Preview'}}</div>
            <div class="border p-2" style="min-height: 35px;" v-html="text"></div>
          </div>
          <div class="px-3">
            <b-button
              class="pl-1 py-1 mt-3"
              variant="outline-primary"
              size="sm"
              @click.prevent="postAnswer">Post Answer</b-button>

          </div>
          <div style="height: 80px;">

          </div>
        </b-col>
        <!-- right -->
        <b-col cols="3" class="pl-0">
          <b-container>
            <b-row>
              <b-col>
                <WatchedTags/>
              </b-col>
            </b-row>
          </b-container>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
import LeftNav from '@/components/LeftNav.vue';
import WatchedTags from '@/components/WatchedTags.vue';
import DetailQuestion from '@/components/DetailQuestion.vue';
import DetailAnswer from '@/components/DetailAnswer.vue';
import Tag from '@/components/Tag.vue';

export default {
  name: 'detail',
  components: {
    LeftNav,
    WatchedTags,
    Tag,
    DetailQuestion,
    DetailAnswer,
  },
  data() {
    return {
      text: '',
    };
  },
  created() {
    this.fetchQuestionDetail();
  },
  methods: {
    fetchQuestionDetail() {
      this.$store.dispatch('fetchQuestionDetail', this.$route.params.id);
      this.$store.dispatch('fetchQuestionAnswers', this.$route.params.id);
    },
    askNewQuestion() {
      this.$router.push('/ask');
      // console.log('masuk function')
    },
    postAnswer() {
      // console.log('question_id--', this.$route.params.id)
      const answer_obj = {
        question: this.$route.params.id,
        answer: this.text,
      };
      console.log(answer_obj);
      this.$store.dispatch('postAnswer', answer_obj);
    },
  },
  watch: {
    $route() {
      this.fetchQuestionDetail();
    },
  },
  computed: {
    question() {
      return this.$store.state.questionDetail.question;
    },
    answers() {
      return this.$store.state.questionDetail.answers;
    },
  },
};
</script>

<style>
</style>
