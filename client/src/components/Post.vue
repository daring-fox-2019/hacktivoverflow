<template>
  <v-card>
    <v-layout v-show="!editing" row wrap>
      <v-layout align-center justify-center column xs1>
        <v-btn icon>
          <v-icon color="grey">arrow_drop_up</v-icon>
        </v-btn>
        <span>{{ content.upvotes.length - content.downvotes.length }}</span>
        <v-btn icon>
          <v-icon color="grey">arrow_drop_down</v-icon>
        </v-btn>
      </v-layout>
      <v-flex xs11>
        <v-card-title primary-title class="display-1 font-weight-black">{{ content.title }}</v-card-title>
        <v-card-text v-html="content.description" class="subheading">{{ content.description }}</v-card-text>
        <v-btn @click="editing = !editing" color="success" icon class="ml-auto">
          Edit
          <v-icon color="grey" right>border_color</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <PostForm v-show="editing"/>
  </v-card>
</template>
<script>
import PostForm from "@/components/PostForm";

export default {
  components: {
    PostForm
  },
  data(){
    return {
      editing: false
    }
  },
  props: ["content"]
};
</script>
