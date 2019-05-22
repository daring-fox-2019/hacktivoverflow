<template>
  <v-container grid-list-md fluid>
    <!-- LEFT-->
    <v-layout row wrap align-start justify-start class="card-layout">
      <v-flex xs1 class="mt-4 pt-3">
        <div class="body-2">{{question.upvotes.length + question.downvotes.length}}</div>
        <span class="body-1">Votes</span>
      </v-flex>
      <v-flex xs1 class="mt-4 pt-3">
        <div class="body-2">{{question.answers.length}}</div>
        <span class="body-1">Answers</span>
      </v-flex>
      <v-flex xs10 class="title pl-4">
        <div class="headline text-truncate mb-2">
          <router-link
            style="text-decoration:none;"
            :to="{ name: 'oneQuestion', params: { questionId: question._id }}"
          >{{question.title}}</router-link>
        </div>
        <v-layout row wrap justify-end class="mt-4 mr-3">
          <span class="caption font-weight-regular font-italic mt-2">author : {{question.user.name}}</span>
        </v-layout>
        <v-layout row wrap justify-end class="mt-2 mr-3">
          <span
            class="caption font-weight-regular font-italic"
          >created at : {{new Date(question.createdAt).toUTCString()}}</span>
        </v-layout>
        <v-layout xs1 style="font-size: 8px;" class="mt-2">
          <v-badge color="orange" class="mx-4">
            <template v-slot:badge>
              <v-icon dark small>fas fa-tags</v-icon>
            </template>
          </v-badge>
          <div class="text-xs-center caption" v-for="(tag, index) in question.tags" :key="index">
            <v-chip small class="caption" style="font-size: 10px;">{{tag.tagName}}</v-chip>
          </div>
        </v-layout>
      </v-flex>
      <v-layout row wrap justify-center class="mt-4">
        <slot></slot>
      </v-layout>
    </v-layout>

    <!-- </v-layout> -->
  </v-container>
</template>

<script>
export default {
  name: "QuestionCard",
  props: ["search", "filtered", "question"],
  methods: {
    getEdit(id) {
      this.$emit("get-edit", id);
    },
    getDelete(id) {
      this.$emit("get-delete", id);
    }
  }
};
</script>

<style>

</style>
