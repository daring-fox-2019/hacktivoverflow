<template>
  <v-container grid-list-xl text-xs-center>
    <form>
      <v-layout row wrap>
        <v-flex mt-4 xs12 offset-xs5 offset-md2 offset-lg3>
          <v-flex xs12>
            <!-- <v-text-field v-model="title" :counter="10" label="Title" required></v-text-field> -->
            <ckeditor :editor="editor" v-model="description"></ckeditor>
          </v-flex>
        </v-flex>
      </v-layout>
      <div id="buttonpost">
          <v-btn @click="editAnswer">Edit Answer</v-btn>
      </div>
    </form>
  </v-container>
</template>



<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      title: "",
      description: "",
      editor: ClassicEditor,
      fill: ""
    };
  },
  created() {
    console.log(this.$route.params.id);
    this.getOneAnswer();
    
  },
  methods: {
    editAnswer(id) {
      this.axios.patch(`/answers/edit/${this.$route.params.id}`, 
      {
          description : this.description
      },
      { headers: { token: localStorage.getItem("token") }} )
      .then(({data}) => {
        // console.log('berhasil edit', data);

         Swal.fire({
          type: 'success',
          title: 'Edited',
         })

         this.$router.push({to : '/questions'})
      })
      .catch(err => {
        console.log(err.response);
          Swal.fire({
          type: 'error',
          title: 'Oops something is wrong',
          text: err.response.data.message
         })
      })
    },
    getOneAnswer() { 
      this.axios
        .get(`answers/${this.$route.params.id}`,{ headers: { token: localStorage.getItem("token") } })
        .then(({ data }) => {
          this.description = data.description;
        //   console.log( "dapet asdadadasdasgak??", data);
        })
        .catch(err => {
        Swal.fire({
          type: 'error',
          title: 'Oops something is wrong',
          text: err.response.data.message
         })
        //   console.log(err.response, "errornya apa? di get one q!");
        });
    }
  }
};
</script>

<style>
#buttonpost {
  display: flex;
  justify-content: flex-end;
}
</style>
