<template>
    <div style="margin-top: 15px">
        <h3><strong> Answers ({{answers.answers.length}})</strong></h3>
        <div v-for="(answer,indexAns) in answers.answers" :key="indexAns" style="margin-top:40px;margin-bottom:40px">
            <div>
                <h4 style="margin-bottom: 25px">{{ answer.answer }}</h4>
                <div v-html="answer.description"></div>
            </div>
            <div v-if="answers.owner._id != user">
                <b-button variant="outline-success" @click="upvoteAn(answer._id)">uv: {{ answer.upvotes.length }}
                </b-button>
                <b-button variant="outline-danger" @click="downvoteAn(answer._id)">dv: {{ answer.downvotes.length }}
                </b-button>
            </div>
            <div v-if="answer.owner == user">
                <router-link :to="{ name: 'updateanswer', params: { id: answer._id }}">
                    <b-button variant="outline-success" @click="saveDataGlobalAnswer(answer)">Update</b-button>
                </router-link>
                <b-button variant="outline-danger" @click="deleteAnswer(answer._id)">Delete</b-button>
            </div>
            <hr>
            <hr>
        </div>
        <router-link :to="{ name: 'addanswer', params: { questionId: answers._id }}"><button>Add
                Answer</button></router-link>
    </div>
</template>

<script>
    import Swal from 'sweetalert2';
    import axios from '@/api/axios';
    export default {
        name: 'answer',
        props: ['answers'],
        data() {
            return {
                user: localStorage.id
            }
        },
        methods: {
            saveDataGlobalAnswer(answer) {
                this.$store.commit('simpenGlobalAns', answer)
            },
            upvoteAn(answerId) {
                axios
                    .patch('/answers/upvote/' + answerId, {}, {
                        headers: {
                            jwtoken: localStorage.jwtoken
                        }
                    })
                    .then(report => {
                        console.log(report)
                        this.onStart()
                        Swal.fire({
                            text: 'upvote success!',
                            type: 'success'
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        Swal.fire({
                            text: err.message,
                            type: 'error'
                        })
                    })
            },
            downvoteAn(answerId) {
                axios
                    .patch('/answers/downvote/' + answerId, {}, {
                        headers: {
                            jwtoken: localStorage.jwtoken
                        }
                    })
                    .then(report => {
                        console.log(report)
                        this.onStart()
                        Swal.fire({
                            text: 'downvote success!',
                            type: 'success'
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        Swal.fire({
                            text: err.message,
                            type: 'error'
                        })
                    })
            },
            deleteAnswer(answerId) {
                axios
                    .delete('/answers/delete/' + answerId, {
                        headers: {
                            jwtoken: localStorage.jwtoken
                        }
                    })
                    .then(report => {
                        console.log(report)
                        this.onStart()
                        Swal.fire({
                            text: 'delete success!',
                            type: 'success'
                        })

                    })
                    .catch(err => {
                        console.log(err)
                        Swal.fire({
                            text: 'delete error !-!',
                            type: 'error'
                        })

                    })
            },
            onStart(){
                this.$emit('terjadiPerubahan')
            }
        },
        created() {
            this.onStart()
        },
    }
</script>

<style>

</style>