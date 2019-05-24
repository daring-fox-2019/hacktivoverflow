<template>
  <div
    class="container"
    style="background-color: white; color: rgb(139, 24, 8); border-radius: 5px;"
  >
    <v-layout row wrap id="top-row">
      <div>
        <h1>{{ title }}</h1>
      </div>
      <div>
        <v-btn color="info" large to="questions/add" style="margin-right: 0;">
          <i class="fas fa-plus mr-2"></i> Ask Question
        </v-btn>
      </div>
    </v-layout>
    <v-layout
      row
      wrap
      v-for="question in filteredQuestions"
      :key="question._id"
      class="question-row"
    >
      <v-flex>
        <div @click.prevent="changeLink(question._id)" class="question-link">
          <h2>{{ question.title }}</h2>
          <div class="text-truncate-custom" v-html="question.description"></div>
        </div>
        <div>
          <v-layout row wrap>
            <v-flex shrink v-for="(tag, index) in question.tags" :key="index">
              <v-btn
                color="info"
                small
                round
                flat
                outline
                style="margin-left: 0;"
                @click="changeKeyword(tag)"
              >#{{ tag }}</v-btn>
            </v-flex>
          </v-layout>
        </div>
        <div class="py-3" style="display: flex; justify-content: space-between;">
          <div
            style="font-size: 80%; color: rgb(135, 75, 47);"
          >{{ question.answers.length }} answers</div>
          <div style="display: flex; flex-direction: column; align-items: flex-end;">
            <div>{{ question.userId.fullName }}</div>
            <div>{{ (new Date(question.createdAt)).toLocaleDateString() }}</div>
          </div>
        </div>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import axios from "@/api/axios";

export default {
  props: ["title", "keyword"],
  data() {
    return {
      filteredQuestions: []
    };
  },
  created() {
    this.getFilteredQuestions();
  },
  computed: {},
  watch: {
    keyword() {
      this.filteredQuestions = this.$store.state.allQuestions.filter(
        question => {
          return (
            question.title
              .toLowerCase()
              .includes(this.$store.state.keyword.toLowerCase()) ||
            question.userId.fullName
              .toLowerCase()
              .includes(this.$store.state.keyword.toLowerCase()) ||
            question.tags.join("").includes(this.$store.state.keyword)
          );
        }
      );
      // console.log(this.filteredQuestions);
    },
  },
  methods: {
    filterQuestions() {
      this.filteredQuestions = this.$store.state.allQuestions.filter(
        question => {
          return (
            question.title
              .toLowerCase()
              .includes(this.$store.state.keyword.toLowerCase()) ||
            question.userId.fullName
              .toLowerCase()
              .includes(this.$store.state.keyword.toLowerCase()) ||
            question.tags.join("").includes(this.$store.state.keyword)
          );
        }
      );
    },
    changeLink(id) {
      this.$router.push(`/questions/${id}`);
    },
    changeKeyword(value) {
      this.$store.commit("updateKeyword", value);
    },
    getFilteredQuestions(context) {
      axios({
        method: "GET",
        url: `/questions`
      })
        .then(({ data }) => {
          console.log(data);
          this.filteredQuestions = data;
          this.filterQuestions();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {}
};
</script>

<style>
.text-truncate-custom {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
#top-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid rgba(191, 54, 12, 0.342);
  box-shadow: 0px 4px 7px -7px rgba(0, 0, 0, 0.75);
}

.question-row {
  border-bottom: 1px solid rgba(191, 54, 12, 0.2);
  margin-bottom: 1rem;
  margin-top: 1rem;
}

.question-link {
  cursor: pointer;
}

.question-link:hover {
  filter: brightness(0.6);
}
</style>
