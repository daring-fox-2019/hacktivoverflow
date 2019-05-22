<template>
  <div class="col-sm-12 border">
    <div class="well">
      <p>{{ answer.content}}</p>
      <small>answered : {{ answer.author.name }}</small>
      <br>
      <button type="button" class="btn btn-default btn-sm">
        <span class="glyphicon glyphicon-thumbs-down"></span> Dislike
      </button>
      <button type="button" class="btn btn-default btn-sm">
        <span class="glyphicon glyphicon-thumbs-up"></span> Like
      </button>
      <td>
        <button
          @click.prevent="updateAnswer(answer._id)"
          type="button"
          class="update btn btn-warning btn-sm"
        >
          <span class="glyphicon glyphicon-pencil"></span>
        </button>
      </td>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import ServerApi from '@/api/serverApi';

export default {
  props: ["answer"],
  methods: {
    deleteAnswer(id) {
      this.$emit('deleteAnswer', id)
    }
  },
};
</script>