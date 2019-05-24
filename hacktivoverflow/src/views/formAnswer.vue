<template>
<v-container class="teal darken-2">
    <v-layout>
        <v-flex>
            <v-card class="pa-4">
                <v-card-title><h1>write your Answer here</h1></v-card-title>
                <form>
                    <v-textarea
                    v-model="answer"
                    label="Answer"
                    v-validate="'required'"
                    :counter="0"
                    :error-messages="errors.collect('description')"
                    data-vv-name="answer"
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
            answer : ''
        }
    },
    methods: {
        submit(){
            let questionId = this.$route.params.questionid
            console.log('question id di form answer',questionId);
            
            // console.log(this.title,this.description)
            if(this.title !== '' && this.description !== '' ){
                let data = {
                    questionId : questionId,
                    answer : this.answer
                }
               this.$store.dispatch('createAnswer',data)
               this.$swal('successfully post answer','','success')
               this.$router.push('/')
            }else{
                this.$swal(`field can't be empty`, '', 'error')
            }
        }
    }
}
</script>
