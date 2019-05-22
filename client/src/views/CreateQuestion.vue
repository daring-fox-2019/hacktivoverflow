<template>
  <div>
    <div class="container">
    <h1>Ask Question</h1>
    <form v-on:submit.prevent="createQuestion">
    <div class="form-group">
    <label for="formGroupExampleInput">Title</label>
    <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input" v-model="title">
    </div>
    <div class="form-group">
    <ckeditor
            style="height:500px"
            :editor="editor"
            v-model="description"
            :rules="[rules.required]"
            counter
            hint="Be as specific as possible!"
          ></ckeditor>
    </div>
    <button type="submit" class="btn btn-dark">Submit</button>
    </form>
    </div>
  </div>
</template>

<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
export default {
  data: () => ({
    editor: ClassicEditor,
    title: "",
    description: "",
    rules: {
      required: value => !!value || "Required."
    }
  }),
  methods: {
    reset() {
      this.$refs.form.reset();
    },
    createQuestion() {
      const { title, description } = this;
      let token = localStorage.getItem("token");
      let UserId = localStorage.getItem("UserId");
      this.$axios
        .post(
          "/questions",
          { title, description, UserId },
          { headers: { token } }
        )
        .then(({ data }) => {
          const { message } = data;
          this.$swal("Success!", message, "success");
          this.$store.dispatch("createQuestion");
          this.$router.push("/dashboard");
        })
        .catch(err => {
          const { errors } = err.response.data;
          let errorMessages = [];
          for (let key in errors) errorMessages.push(errors[key].message);
          errorMessages = errorMessages.join("\n");
          this.$swal("Oops...", errorMessages, "error");
        });
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 60% !important;
  margin-top: 4%;
}
</style>