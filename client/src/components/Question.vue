<template>
  <div class="col-sm-12">
    <div class="row">
      <div class="col-sm-12">
        <div class="panel panel-default text-left">
          <div class="panel-body col-sm-1">
            <h2 class="text-center">0</h2>
            <div class="or-box">
              <small>vote</small>
            </div>
          </div>
          <div class="panel-body col-sm-1 border">
            <h2 class="text-center">0</h2>
            <div class="or-box">
              <small>answer</small>
            </div>
          </div>
          <div class="panel-body col-sm-1">
            <h2 class="text-center">0</h2>
            <div class="or-box">
              <small>views</small>
            </div>
          </div>
          <div class="smallanel-body col-sm-9">
            <router-link :to="'/question/' + question._id">
              <h2>{{ question.title }}</h2>
            </router-link>
            <small class="float-right">author: {{ question.author.name }}</small><br>
            <small class="float-right">{{ question.createdAt }}</small>
            <td><button
            @click.prevent="updateQuestion(question._id)"
            type="button"
            class="update btn btn-warning btn-sm">
            <span class="glyphicon glyphicon-pencil"></span>
            </button></td>
            <td><button
            @click.prevent="deleteQuestion(question._id)"
            type="button"
            class="delete btn btn-danger btn-sm">
            <span class="glyphicon glyphicon-trash"></span></button></td>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import ServerApi from '@/api/serverApi';
export default {
  props: ['question'],
  methods: {
    deleteQuestion(id) {
      this.$emit('deleteQuestion', id)
    },
  },
};
</script>
