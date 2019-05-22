<template>
  <b-container fluid>
    <b-container>
      <b-row>
        <b-col cols="2" class="pr-0">
          <!-- left navbar -->
          <LeftNav/>
        </b-col>
        <b-col class="px-0 d-flex flex-column border-left">
          <div class="d-flex justify-content-between py-3 pl-3">
            <div style="font-size: 30px;">Top Questions</div>
            <!-- this is divider -->

            <div>
              <b-button variant="outline-primary" size="sm" class="mr-2" to="/ask">Ask a Question</b-button>
            </div>
          </div>
          <div class="px-2">
            <div class="border-bottom"></div>
          </div>
          <div>
            <QuestionListCard
              v-for="question in questionsList"
              :key="question._id"
              :question="question"
            />
          </div>
        </b-col>
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
import LeftNav from "@/components/LeftNav.vue";
import QuestionListCard from "@/components/QuestionListCard.vue";
import WatchedTags from "@/components/WatchedTags.vue";

export default {
  name: "question",
  components: {
    LeftNav,
    QuestionListCard,
    WatchedTags
  },
  created() {
    this.fetchQuestionList();
  },
  methods: {
    fetchQuestionList() {
      this.$store.dispatch("fetchQuestionList");
    }
  },
  computed: {
    questionsList() {
      return this.$store.state.questionsList;
    }
  }
};
</script>

<style>
</style>
