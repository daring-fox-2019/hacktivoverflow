<template>
  <div>
    <center>
      <h3 style="margin-top:5%">
        <i>ANSWERS</i>
      </h3>
    </center>
    <div v-for="(answer, index) in answers" :key="index" style="padding: 15px">
      <div class="card w-75" style="margin-left:12%;">
        <div class="card-body">
        <h6 class="headline mb-0" v-html="answer.answer"></h6>
        <h5>Total Vote : {{answer.upvotes.length - answer.downvotes.length}} </h5>
        <h5>Answered by: {{answer.UserId.first_name + ' ' + answer.UserId.last_name}}</h5>
        <a href="#" class="btn btn-primary ml-3" v-on:click="upvote(answer._id)">upvote</a>
        <a href="#" class="btn btn-danger ml-3" v-on:click="downvote(answer._id)">downvote</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["answers"],
  methods: {
    upvote(AnswerId) {
      let token = localStorage.getItem("token");
      this.$axios
        .patch(`/answers/upvote/${AnswerId}`, {}, { headers: { token } })
        .then(({ data }) => {
          const { message } = data;
          console.log(message);
          this.$emit("getUpdatedAnswers");
        })
        .catch(err => {
          const { message } = err.response.data;
          this.$swal("Error!", message, "error");
        });
    },
    downvote(AnswerId) {
      let token = localStorage.getItem("token");
      this.$axios
        .patch(`/answers/downvote/${AnswerId}`, {}, { headers: { token } })
        .then(({ data }) => {
          const { message } = data;
          console.log(message);
          this.$emit("getUpdatedAnswers");
        })
        .catch(err => {
          const { message } = err.response.data;
          this.$swal("Error!", message, "error");
        });
    }
  }
};
</script>

<style scoped>
.v-card__title--primary {
  padding-top: 0px !important;
  padding-bottom: 0px !important;
}
</style>
