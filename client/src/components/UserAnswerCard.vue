<template>
  <div>
    <div v-for="(answer, index) in myAnswers" :key="index" style="padding: 15px">
      <!-- ANSWERS -->
      <div class="card w-75" style="margin-left:12%;">
        <div class="card-body">
        <h6 class="headline mb-0" v-html="answer.answer"></h6>
        <h5 class="card-title">{{new Date(answer.createdAt).toDateString()}}</h5>
        <h5>Total Vote : {{answer.upvotes.length - answer.downvotes.length}} </h5>
        <EditAnswerDialog v-bind:answerDetails="answer"/>
        <a href="#" class="btn btn-danger ml-3" v-on:click="deleteAnswer(answer._id)">Delete</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import EditAnswerDialog from "./EditAnswerDialog";

export default {
  computed: mapState(["myAnswers"]),
  components: {
    EditAnswerDialog
  },
  methods: {
    deleteAnswer(AnswerId) {
      this.$swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this reply!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          let token = localStorage.getItem("token");
          this.$axios
            .delete(`/answers/${AnswerId}`, {
              headers: { token }
            })
            .then(({ data }) => {
              this.$swal("Poof! Your reply has been deleted!", {
                icon: "success"
              });
              this.$store.dispatch("getUserAnswers");
              //   this.$store.dispatch("getUserQuestions");
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    }
  }
};
</script>

<style>
</style>
