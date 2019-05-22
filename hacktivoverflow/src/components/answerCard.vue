<template>

<v-card>
    <v-container fill-height>
        <v-layout row wrap align-center>
            <v-flex xs12 sm1>
                <div>
                    <v-btn @click.prevent="upvote(answer._id)" icon flat class="green--text mx-1 pa-1">
                    <v-icon>thumb_up</v-icon>
                    <span class="total">{{answer.upVotes.length}}</span>
                    </v-btn> 
                </div>
                <div>
                    <v-btn @click.prevent="downvote(answer._id)" icon class="red--text mx-1 pa-1">
                    <v-icon>thumb_down</v-icon>
                    <span class="total">{{answer.downVotes.length}}</span>
                    </v-btn>
                </div>
            </v-flex>
            <v-flex xs12 sm10>
            <h3>{{answer.title}}</h3>
            <p>
                {{answer.description}}
            </p>
            </v-flex>
            <!-- <h1>card content</h1>  -->
            <v-card-actions>
                <v-btn flat color="orange" @click.prevent="editAnswer(answer._id,answer.userId)">Edit</v-btn>
            </v-card-actions>
        </v-layout>
    </v-container>
</v-card>
</template>

<script>
import axios from 'axios'

export default {
    props: ['answer'],
    data(){
        return{
            profile : false
        }
    },
    methods : {
        reroute(){
            console.log('ke clickkkkkkkk');
        },
        editAnswer(id,userId){
            if(userId === localStorage.userId){
                console.log('ini id nya question',id);
                this.$router.push(`/editAnswer/${id}`)
            }else{
                console.log(`tidak berhak mengedit`);
                this.$swal('you are not authorized to edit this content', '', 'error')
            }
        },
        upvote(id){
            console.log('ini id',id);
            this.$store.dispatch('upvoteAnswer',id)
        },
        downvote(id){
            console.log('ini id',id);
            
            this.$store.dispatch('downvoteAnswer',id)
        }
    },
    created(){
        //  this.$store.dispatch('getQuestionAnswer')        
    }
}
</script>

<style>
.clickable{
    cursor : pointer
}
</style>

