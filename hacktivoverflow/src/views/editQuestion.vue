<template>
<v-container class="teal darken-2">
    <v-layout>
        <v-flex>
            <v-card class="pa-4">
                <v-card-title><h1>edit your question here</h1></v-card-title>
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
            title : '',
            description: '',
            id : this.$route.params.questionid
        }
    },
    computed: {
        isQuestions: function(){
            return this.$store.state.allQuestions
        }
    },
    methods: {
        edit(){
            // console.log(this.title,this.description)
            if(this.title !== '' && this.description !== '' ){
                let data = {
                    title : this.title,
                    description : this.description,
                    id : this.id
                }
                this.$store.dispatch('editQuestion',data)
                this.$swal('question updated','','success')
                this.$router.push('/')
            }else{
                this.$swal(`field can't be empty`, '', 'error')
            }
        }
    },
    created(){
        this.$store.dispatch('getQuestion')
        // console.log('ini id nya di edit',this.id);
        let data = {}
        // console.log('ini id yg mau di edit',this.id);
        // console.log('ini is questions',this.isQuestions);
        this.isQuestions.forEach(question => {
            // console.log('/////',question._id);
            if(question._id == this.id){
                console.log('found',question);
                data = question
            }
        });
        // console.log('kokok',data);
        this.title = data.title,
        this.description = data.description
    }
}
</script>
