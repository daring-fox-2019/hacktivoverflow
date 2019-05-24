<template>
<v-container class="teal darken-2">
    <v-layout>
        <v-flex>
            <v-card class="pa-4">
                <v-card-title><h1>edit your Answer here</h1></v-card-title>
                <form>
                    <v-textarea
                    v-model="answer"
                    label="Answer"
                    v-validate="'required'"
                    :counter="0"
                    :error-messages="errors.collect('answer')"
                    data-vv-name="answer"
                    required
                    ></v-textarea>
                    <v-btn flat class="teal--text" @click.prevent="edit">edit</v-btn>
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
            answer : '',
            questionId : this.$route.params.questionid,
            answerId : this.$route.params.answerid
        }
    },
    computed: {
        editAnswer: function(){
            return this.$store.state.answer
        }
    },
    watch : {
        editAnswer(){
            if(this.editAnswer !== null){
                console.log('ini watch',this.editAnswer);
                
                this.answer = this.editAnswer.description
            }
        }
    },
    methods: {
        edit(){
            // console.log(this.title,this.description)
            if(this.answer !== '' ){
                let data = {
                    answer : this.answer,
                    id : this.answerId
                }
                console.log('ini data sebelum dispatch',data);
                
                this.$store.dispatch('editAnswer',data)
                this.$swal('question updated','','success')
                this.$router.push(`/questionDetail/${this.questionId}`)
            }else{
                this.$swal(`field can't be empty`, '', 'error')
            }
        }
    },
    created(){
        // this.$store.dispatch('getQuestion')
        this.$store.dispatch('getAnswer',this.answerId)
    }
}
</script>
