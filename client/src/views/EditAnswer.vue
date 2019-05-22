<template>
  <div>
    <div class="container" style="background-color: white; min-height: 100vh; padding-top: 40px;">
      <div>
        <form>
          <label>Description:</label>
          <wysiwyg v-model="description"/>
          <br>
          <button @click.prevent="editAnswer" type="submit" class="btn btn-warning">Edit Answer</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import myServer from '@/api/myServer';

export default {
  data() {
    return {
      description: '',
    };
  },
  created() {
    this.getAnswer();
  },
  methods: {
    getAnswer() {
      myServer
        .get(`/answer/${this.$route.params.id}`)
        .then(({ data }) => {
          console.log(data);
          this.description = data.description;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editAnswer() {
      myServer
        .patch(`/answer/${this.$route.params.id}`, this.description)
        .then(({ data }) => {
          console.log(data.question._id);
          this.$router.push(`/question/${data.question._id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
