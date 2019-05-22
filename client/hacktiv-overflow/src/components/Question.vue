<template>
  <div class="container border mt-2">
    <div class="row">
      <div class="col-3 px-3 py-1">
        <div class="row ml-2">
          <div
            class="d-flex justify-content-center align-items-center p-3"
            style="text-align:center"
          >
            <div>
              <p style="text-align:center;color:grey">
                <span>{{ question.upvotes.length - question.downvotes.length }}</span>
                <br>
                <span style="font-size:12px">votes</span>
              </p>
            </div>
          </div>
          <div
            class="d-flex justify-content-center align-items-center p-3"
            style="text-align:center"
          >
            <div>
              <p style="text-align:center;color:grey">
                <span>{{ question.answers.length }}</span>
                <br>
                <span style="font-size:12px">answers</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-9 px-3 py-3">
        <router-link :to="`/question/${question._id}`">
          <p style="font-size:22px;color: #00b894">{{ question.title }}</p>
        </router-link>
        <br>
        <b-button
          size="sm"
          variant="outline-primary"
          v-for="(tag,i) in question.tags"
          :key="i"
          :class="i != 0 ? 'm-1' : ''"
          @click="searchTag(tag.text)"
        >{{ tag.text }}</b-button>

        <b-button size="sm" variant="primary" class="m-1" @click="searchTag()">All</b-button>
        <br>
        
        <div class="d-flex justify-content-end" v-if="cekOwner">
          <b-button size="sm" variant="secondary" class="mr-2" @click.prevent="toEdit(question._id)">edit</b-button>
          <b-button
            size="sm"
            variant="outline-secondary"
            @click.prevent="deleteQuestion(question._id)"
          >delete</b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/database/axios'

export default {
  props: ["question"],
  computed: {
    cekOwner(){
      return localStorage.getItem('id') == this.question.user_id._id
    }
  },
  methods: {
    toEdit(id) {
      this.$router.push(`/edit-question/${id}`);
    },
    searchTag(tag) {
      this.$store.dispatch("searchByTag", tag);
    },
    deleteQuestion(id) {
      axios.delete(`/questions/${id}`, { headers: {token : localStorage.getItem('token')}})
      .then(({data}) =>{
        this.$store.commit('deleteQuestion', data)
        this.$swal(':D', 'questions delete success', 'success')
      })
      .catch( err => {
        this.$swal(':D', `${err.response.data.message}`, 'error')
      })
    }
  }
};
</script>


<style scoped>
p {
  display: inline;
  word-break: break-all;
}
.btn-sm,
.btn-group-sm > .btn {
  padding: 0.2rem 0.4rem;
  font-size: 0.7rem;
  line-height: 1.5;
}
</style>
