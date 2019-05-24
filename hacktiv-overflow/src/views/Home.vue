<template>
  <v-container>
    <v-layout align-start justify-center row fill-height>
      <div>
        <h3 class="display-2 font-weight-medium pa-2 ma-2">Hacktiv Overflow</h3>
      </div>
      <div class="pa-2 ma-2">
        <CreateQuestion v-on:add-data="createQuestion"/>
      </div>
    </v-layout>
    <v-layout v-show="!isDetail">
      <v-flex xs12>
        <HacktivCard
        v-on:deleted-data="deleteQuestion"
          v-on:update-data="updateQuestion"
          v-bind:iduser="idUser"
          class="pa-2"
          v-for="(question, index) in questions"
          :question="question"
          :key="index"
        />
      </v-flex>
    </v-layout>
    <v-layout>
      <v-flex xs12>
        <router-view v-on:refresh="fetchData" v-bind:detail="detail"></router-view>
        <!-- <Detail /> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HacktivCard from '@/components/HacktivCard.vue'
import CreateQuestion from '@/components/CreateQuestion.vue'
import Detail from '@/views/Detail.vue'
import overflow from '@/api/overflow.js'
import Swal from 'sweetalert2'
import { mapActions } from 'vuex'
export default {
  components: {
    HacktivCard,
    Detail,
    CreateQuestion
  },
  data () {
    return {
      questions: [],
      detail: [],
      isDetail: false,
      idUser: ''
    }
  },
  created () {
    this.fetchData()

    if (localStorage.token) {
      this.isLogin()
      overflow
        .get('/decode', {
          headers: {
            token: localStorage.token
          }
        })
        .then(({ data }) => {
          this.idUser = data.id
        })
        .catch(err => {
          Swal.fire({
            title: 'ERORR',
            text: `Something Wrong`,
            type: 'error',
            confirmButtonText: 'Cool'
          })
        })
    }
  },
  methods: {
    updateQuestion (newData, id) {
      console.log('update triger...', newData)
      overflow.put(`/${id}`, newData, { headers: {
        token: localStorage.token
      } })
        .then(({ data }) => {
          this.fetchData()
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteQuestion (id) {
      overflow.delete(`/${id}`, { headers: {
        token: localStorage.token
      } })
        .then(({ data }) => {
          this.fetchData()
        })
        .catch(err => {
          console.log(err)
        })
    },
    fetchData () {
      overflow.get('/')
        .then(({ data }) => {
          this.questions = []
          this.questions = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    backHome () {
      this.isDetail = false
    },
    createQuestion (state) {
      const { title, text } = state
      overflow
        .post('/', {
          title: state.title,
          description: state.text
        }, {
          headers: {
            token: localStorage.token
          }
        })
        .then(({ data }) => {
          console.log(data)
          this.fetchData()
        })
    },
    getOneQuestion (id) {
      overflow.get(`/${id}`)
        .then(({ data }) => {
          this.updateQuestion = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    isLogin () {
      this.$store.dispatch('isLogin')
    },
    ...mapActions(['isLogin'])
  }
}
</script>
