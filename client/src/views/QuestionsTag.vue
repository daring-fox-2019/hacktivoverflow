<template>
  <v-container grid-list-xl text-xs-center>
    <h1 class="mt-4" v-if="this.$route.name == 'question-tag'">Browse through {{this.$route.params.tag}} tag</h1>

     <v-layout row wrap> 
      <v-flex v-if="this.$route.name == 'question-tag'" mt-4 xs12>
       
        <QuestionCard v-for="(q, index) in foundtag " :q="q" :key="index"></QuestionCard>
      </v-flex>
    </v-layout> 
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import QuestionCard from "@/components/QuestionCard.vue";
import Swal from 'sweetalert2'

export default {
  components: { QuestionCard },
  data: () => ({
    title: "",
    descriptions: "",
    foundtag : []
  }),
  created() {
      this.getQTags()
  },
  methods: {
      getQTags() {
          this.axios.post(`/questions/tag`, 
          {
              tag : this.$route.params.tag
          }, 
          {
              headers : {token: localStorage.getItem('token')}
          })
          .then(({data}) => {
                // console.log(data, '???')
                this.foundtag = data
                this.$router.push({ name: 'question-tag', params: { tag: this.$route.params.tag }})
          })
          .catch(err => {
              Swal.fire({
                type: 'error',
                title: 'Oops...',
                text: 'Something went wrong!'
            })
          })
      }
  },
  
};
</script>

<style scope>
</style>