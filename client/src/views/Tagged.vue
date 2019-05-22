<template>
  <div>
    <v-layout align-center>
      <h1 class="mr-4">Tagged: {{ tagName }}</h1>
      <!-- <v-spacer></v-spacer> -->
      <small @click.prevent="saveTag(tagName)" style="background-color: #1976d2; cursor: pointer; color: white; padding: 3px; border-radius: 2px;">save this tag</small>
    </v-layout>
    <v-layout>
      <v-flex>
        <cards class="ma-1" v-for="(item, index) in taggedQuestions" :key="index" :item="item"></cards>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import cards from '../components/cards.vue'

export default {
  components: {
    cards
  },
  data() {
    return {
      tagName: this.$route.params.tag,
      taggedQuestions: []
    }
  },
  methods: {
    fetchQuery(tag) {
      axios({
        method: 'get',
        url: `http://localhost:3000/questions/tag?tag=${tag}`
      })
        .then(({ data }) => {
          // console.log({ data })
          this.taggedQuestions = []
          this.taggedQuestions = data
        })
        .catch(err => {
          console.log({ err })
          err.origin = 'tagged.vue - fetchQuery'
          this.$emit('error', err)
        })
    },
    saveTag(tag) {
      // swal.fire(tag)
      axios({
        method: 'put',
        url: `http://localhost:3000/users/${localStorage.id}`,
        headers: {
          token: localStorage.token
        },
        data: {
          tags: tag
        }
      })
        .then(({ data }) => {
          swal.fire('Success!', `Added ${tag} to saved tags.`, 'success')
          this.$router.push('/')
        })
        .catch(err => {
          console.log({ err })
          err.origin = 'tagged.vue - fetchQuery'
          this.$emit('error', err)
        })
    },
  },
  created() {
    this.fetchQuery(this.tagName)
  },
  watch: {
    $route() {
      this.fetchQuery(this.$route.params.tag)
    }
  }
};
</script>
<style>
</style>
