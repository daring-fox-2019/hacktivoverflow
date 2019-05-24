<template>
  <div class="home text-justify">
    <div class="container">
      
      <div class="page-header text-capitalize p-2">
        <strong>{{topic.title}}</strong>
      </div>
      <div class="p-2" v-html="topic.content"></div>
      <div class="p-2 text-right">---asked by {{asker}} {{askedDaysAgo}}</div>
      <!-- <div>{{(topic.by.name)}}</div> -->
      <div class="p-2 text-left">
        <b-button size="sm" variant="outline-secondary">add comment...</b-button>
      </div>
      <hr>
      <section v-if="topic.answers">
        <h3>{{topic.answers.length}} Answer{{(topic.answers.length>1)?'s':''}}</h3>
        <div v-if="topic.answers.length > 0" class="p-2 container">        
          <Answer v-for="answer in topic.answers" :key="answer._id" :initAnswer="answer"/>
        </div>
        <div class="p-2 container">
          <h3>Add your answer...</h3>
          <Answer :initAnswer="{}"/>
        </div>
      </section>
    </div>
    <p>current store topic:</p>
    <p>{{topic}}</p>
    <p>current store user:</p>
    <p>{{user}}</p>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import backend from "@/api/api";
import moment from "moment";
import swal from "sweetalert2";
import Answer from "@/components/Answer";
import Comment from "@/components/Comment";

const dayHandler = d => (d == 1 ? "yesterday" : `${d} days ago`);

export default {
  name: "home",
  components: {
    Answer,
    Comment
  },
  mounted() {
    if (this.$route.params.id) {
      this.fetchTopic(this.$route.params.id);
    } else this.$router.replace("/home");
  },
  computed: {
    askedDaysAgo: function() {
      if (moment(this.topic.created_at).isSame(moment(), "day")) {
        return "today";
      } else {
        return dayHandler(
          moment().diff(moment(this.topic.created_at), "days") + 1
        );
      }
    },
    editedDaysAgo: function() {
      if (moment(this.topic.updated_at).isSame(moment(), "day")) {
        return "today";
      } else {
        return dayHandler(
          moment().diff(moment(this.topic.edited_at), "days") + 1
        );
      }
    },
    asker: function() {
      if (!this.topic.by) return "...";
      if (this.user && this.topic.by._id == this.user._id) {
        return `you`;
      } else {
        return this.topic.by.name;
      }
    },
    ...mapState(["user", "topic"])
  },
  methods: {
    ...mapMutations(["setTopic", "clearTopic"]),
    fetchTopic(id) {
      return backend
        .get(`topic/${id}`)
        .then(response => {
          this.setTopic(response.data);
        })
        .catch(error => {
          console.log(error);
          this.clearTopic();
          swal.fire("error", "cannot get specified Topic", "error");
          this.$router.replace("/home");
        });
      // try {
      //   let response = await backend.get(`topic/${id}`);
      //   console.log(`~~~~~~~~~~~`);
      //   console.log(response.data);
      //   if (response.status == 200) {
      //     this.setTopic(response.data);
      //   }
      // } catch (error) {
      //   console.log(error);
      //   this.clearTopic();
      //   swal.fire("error", "cannot get specified Topic", "error");
      //   this.$router.replace("/home");
      // }
    }
  }
};
</script>
