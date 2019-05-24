<template>
<v-container class="teal darken-2">
    <v-layout>
        <v-flex>
            <v-card class="pa-4">
                <v-card-title><h1>write your question here</h1></v-card-title>
                <form>
                    <v-text-field
                    v-model="title"
                    label="Title"
                    v-validate="'required'"
                    :counter="0"
                    :error-messages="errors.collect('title')"
                    data-vv-name="title"
                    required
                    ></v-text-field>
                    <v-textarea
                    v-model="description"
                    label="description"
                    v-validate="'required'"
                    :counter="0"
                    :error-messages="errors.collect('description')"
                    data-vv-name="description"
                    required
                    ></v-textarea>
                    <v-btn flat class="teal--text" @click="submit">submit</v-btn>
                    <router-link to="/">
                    <v-btn flat class="teal--text">cancel</v-btn>
                    </router-link>
                </form>
            </v-card>
        </v-flex>
    </v-layout>
</v-container>
  
</template>

<script>
import axios from 'axios'
import swal from 'sweetalert2'

export default {
    data(){
        return{
            title : '',
            description: ''
        }
    },
    methods: {
        submit(){
            // console.log(this.title,this.description)
            if(this.title !== '' && this.description !== '' ){
                axios({
                    method: 'post',
                    url : "http://localhost:3000/questions",
                    data: {
                        title : this.title,
                        description : this.description
                    },
                    headers : {
                        token : localStorage.token
                    }
                })
                .then(question =>{
                    console.log('result create',question);
                    this.title = '',
                    this.description = ''
                    this.$swal('question successfully posted', '', 'success')
                    this.$router.push("/")
                })
                .catch(err =>{
                    this.$swal('opps something gone wrong', '', 'error')
                    console.log(err);
                })
            }else{
                this.$swal(`field can't be empty`, '', 'error')
            }
        }
    }
}
</script>
