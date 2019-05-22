<template>
  <div class="container" style="background-color: white; color: #BF360C;">
    <v-layout row wrap id="top-row">
      <div>
        <h1>{{ title }}</h1>
      </div>
      <div>
        <v-btn color="info" large to="questions/add">
          <i class="fas fa-plus mr-2"></i> Ask Question
        </v-btn>
      </div>
    </v-layout>
    <v-layout row wrap v-for="question in questions" :key="question._id" class="question-row">
      <v-flex>
        <div @click.prevent="changeLink(question._id)" style="cursor: pointer;">
          <h2>{{ question.title }}</h2>
          <div class="text-truncate-custom" v-html="question.description"></div>
        </div>
        <div >
          <v-layout row wrap>
            <v-flex shrink xs-4  v-for="(tag, index) in question.tags" :key="index">
              <v-btn color="info" small round flat outline style="margin-left: 0;">#{{ tag }}</v-btn>
            </v-flex>
          </v-layout>
        </div>
        <div class="py-3" style="display: flex; justify-content: space-between;">
          <div style="font-size: 80%; color: rgb(135, 75, 47);">0 answers</div>
          <div style="display: flex; flex-direction: column; align-items: flex-end;">
            <div>{{ question.userId.fullName }}</div>
            <div>{{ (new Date(question.createdAt)).toLocaleDateString() }}</div>
          </div>
        </div>
      </v-flex>
    </v-layout>
    <div
      class="text-truncate-custom"
    >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</div>
  </div>
</template>

<script>
export default {
  props: ["title", "questions"],
  methods: {
    changeLink(id) {
      this.$router.push(`/questions/${id}`);
    }
  }
};
</script>

<style scoped>
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
</style>
