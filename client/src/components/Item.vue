<template>
  <div class="ui basic segment">
    <div class="ui right floated icon teal buttons" style="padding: 2rem;">
      <button class="ui button" @click="vote('upvote')">
        <i class="thumbs up icon"></i>
      </button>
      <div class="ui button disabled" style="background-color: teal;">{{ votes }}</div>
      <button class="ui button" @click="vote('downvote')">
        <i class="thumbs down icon"></i>
      </button>
    </div>
    <h1 class="ui header" id="tl" v-if="type == 'questions'">{{ item.title }}</h1>
    <div class="ui divider"></div>
    <div v-html="item.content" style="margin-bottom: 1rem;"></div>
    <div class="ui tags" v-if="type == 'questions'">
      <div
        class="ui small teal label tag"
        v-for="(tag, index) in item.tags"
        :key="index"
        @click="searchByTag(tag)"
      >{{ tag }}</div>
    </div>
    <div class="ui left floated icon buttons" v-if="owner" style="margin-top: 1rem">
      <button class="ui basic button" @click="edit">
        <i class="edit icon"></i>
      </button>
      <button class="ui basic button" @click="remove">
        <i class="trash icon"></i>
      </button>
    </div>
    <h4><i>{{ item.owner.name }}</i></h4>
  </div>
</template>

<script>
export default {
  name: "Item",
  props: {
    item: Object,
    type: String
  },
  computed: {
    votes() {
      return this.item.upvotes.length - this.item.downvotes.length;
    },
    owner() {
      return this.item.owner.email == localStorage.getItem("email");
    }
  },
  methods: {
    vote(type) {
      this.$emit("vote", {
        route: this.type,
        type: type,
        id: this.item._id
      });
    },
    searchByTag(tag) {
      this.$router.push("/");
      this.$store.dispatch("filterQ", "/questions?tags=" + tag);
    },
    edit() {
      if (this.type == "questions") {
        this.$router.push("/edit-question");
      } else if (this.type == "answers") {
        this.$emit('edit-answer', this.item)
      }
    },
    remove() {
      if (this.type == "questions") {
        this.$store.dispatch("removeQ");
        this.$router.push("/");
      } else if (this.type == "answers") {
        this.$emit('remove-a', this.item._id)
      }
    }
  }
};
</script>

<style>
</style>
