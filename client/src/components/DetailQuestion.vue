<template>
  <b-container fluid class>
    <b-row class="border-bottom" v-if="question">
      <!-- left side - vote -->
      <b-col cols="1" class="pr-0 text-center mt-3">
        <div>
          <a href="#" @click="upvoteQuestion(question._id)">
            <i class="fas fa-caret-up fa-2x"></i>
          </a>
        </div>
        <div>{{totalLike}}</div>
        <div>
          <a href="#" @click="downvoteQuestion(question._id)">
            <i class="fas fa-caret-down fa-2x"></i>
          </a>
        </div>
      </b-col>
      <!-- right side -->
      <b-col cols="11" class="pr-0 mt-3">
        <div v-html="question.description||'explanation here'"></div>
        <div class="mt-3">
          <Tag v-for="tag in question.tags" :key="tag._id" :tag="tag.text"/>
        </div>

        <!-- edit question and user -->
        <div class="row justify-content-between" style="font-size:12px; color:grey;">
          <div class="pl-3 mt-3">
            <router-link
              v-show="user_id == question.user._id"
              :to="'/questions/edit/' + question._id"
            >Edit Question</router-link>
            <a
              href="#"
              @click="deleteThisQuestion"
              class="ml-2"
              v-show="user_id == question.user._id"
              style="color:red;"
            >Delete This Question</a>
          </div>
          <div
            class="d-flex justify-content-end px-3 align-items-end"
          >asked {{ question.createdAt | moment("from")}}, by {{ question.user.name ||'User info'}}</div>
        </div>
        <!-- comment stars here -->
        <!-- <div>{{'Comments here'}}</div>
        <div
          class="border-top p-1"
          v-for="(test, index) in 5"
          :key="index"
          style="font-size:12px;"
        >test</div> -->
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import server from "@/api/server";
import Tag from "@/components/Tag.vue";

export default {
  props: ["question"],
  name: "detail-question",
  data() {
    return {};
  },
  components: {
    Tag
  },
  computed: {
    totalLike() {
      return (
        Number(this.question.upvotes.length) -
        Number(this.question.downvotes.length)
      );
    },
    user_id() {
      return localStorage._id;
    }
  },
  methods: {
    upvoteQuestion(id) {
      console.log(id);
      this.$store.dispatch("upvoteQuestion", id);
    },
    downvoteQuestion(id) {
      console.log(id);
      this.$store.dispatch("downvoteQuestion", id);
    },
    deleteThisQuestion() {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        server
          .delete("/questions/" + this.question._id, {
            headers: { token: localStorage.token }
          })
          .then(({ data }) => {
            if (result.value) {
              this.$swal("Deleted!", "Your file has been deleted.", "success");
            }
            console.log("successfully deleted the question");
            this.$router.push("/questions");
          })
          .catch(err => {
            console.log(err.response.data);
          });
      });
    }
  }
};
</script>

<style>
</style>
