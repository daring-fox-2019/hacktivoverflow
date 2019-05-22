<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row>
      <h1 class="ml-4 display-2 font-weight-medium text-uppercase">dashboard</h1>
    </v-layout>
    <v-layout row>
      <h3 class="ml-4">List of questions you've asked :</h3>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <QuestionCard v-for="(q, index) in myQuestionsList" :q="q" :key="index"></QuestionCard>
        <!-- {{myQuestionsList}} -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import QuestionCard from "@/components/QuestionCard.vue";
import Swal from "sweetalert2";

export default {
  components: { QuestionCard },
  data: () => ({}),
  created() {
    // console.log('haaaa',this.$store.state.myQuestionsList);
  },
  mounted() {
    this.$store.dispatch("getMyQuestions");
  },
  methods: {
    deleteMyQuestion() {
      // console.log('ada id ga', id, '/////');
      //   Swal.fire({
      //       title: 'Are you sure?',
      //       text: "You won't be able to revert this!",
      //       type: 'warning',
      //       showCancelButton: true,
      //       confirmButtonColor: '#3085d6',
      //       cancelButtonColor: '#d33',
      //       confirmButtonText: 'Yes, delete it!'
      //     })
      //     .then((result) => {
      //       if (result.value) {
      //         this.axios.delete(`/questions/delete/${id}`, {
      //             headers: {
      //               token: localStorage.getItem("token")
      //             }
      //           })
      //           .then((deleted) => {
      //             Swal.fire(
      //               'Deleted!',
      //               'Your question has been deleted.',
      //               'success'
      //               )
      //             this.$store.dispatch('getMyQuestions');
      //           })
      //       }
      //     })
      //     .catch(err => {
      //       Swal.fire({
      //         type: 'error',
      //         title: 'Oops...',
      //         text: 'Something went wrong!'
      //       })
      //     })
    },
    showMyEditForm() {
      this.$router.push(`/edit-question/${id}`);
    }
  },
  computed: {
    ...mapState(["myQuestionsList"])
  }
};
</script>

<style scope>
</style>
