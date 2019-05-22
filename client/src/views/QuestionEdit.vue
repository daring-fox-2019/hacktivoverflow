<template>
  <div class>
    <div class="container">
      <div class="col">
          <div class="col-sm-2">
            <Sidebar/>
          </div>
          <div class="col-sm-7">
            <div class="col-sm-12">
                <form @submit.prevent="updateQuestion">
                    <div class="form-group">
                        <label class="float-left" for="title">Title</label>
                        <input
                        v-model="title"
                        type="text"
                        class="form-control"
                        id="title"
                        placeholder="Title">
                    </div>
                    <wysiwyg v-model="myHTML" />
                    <div class="row">
                    <div class="d-flex justify-content-end">
                        <button class="btn btn-danger">
                            Discard
                        </button>
                        <button
                        class="btn btn-primary">
                            Edit Your Question
                        </button>
                    </div>
                    </div>
                </form>
            </div>
          </div>
          <div class="col-sm-3">
            <Quote/>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import ServerApi from '@/api/serverApi';
import Sidebar from '@/components/Sidebar.vue';
import Quote from '@/components/Quote.vue';

export default {
  data() {
    return {
      myHTML: '',
      title: '',
    };
  },
  components: {
    Sidebar,
    Quote,
  },
  methods: {
    updateQuestion() {
      ServerApi
        .put(`/questions/${this.$router.params.id}`, {
          title: this.title,
          description: this.myHTML,
          author: localStorage.getItem('id'),
        },{
          headers: {
            token: localStorage.getItem('token')
          },
        })
        .then((newAsk) => {
          this.$router.push('/')
        })
        .catch((err) => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: `${err.response.data}`,
          });
        });
    },
  },
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

</style>
