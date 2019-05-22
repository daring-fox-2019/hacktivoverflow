<template>
  <div class>
    <div class="container">
      <div class="col">
          <div class="col-sm-2">
            <Sidebar/>
          </div>
          <div class="col-sm-7">
            <div class="col-sm-12">

                <QuestionDetail />

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
import QuestionDetail from '@/components/QuestionDetail.vue';

export default {
  data() {
    return {
    };
  },
  components: {
    Sidebar,
    QuestionDetail,
    Quote,
  },
  methods: {
  },
};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";

</style>
