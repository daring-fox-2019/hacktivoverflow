<template>
    <div id="accordion">
        <div class="card">
            <div class="card-header" id="headingOne">
                <h5 class="mb-0">
                    <button class="btn btn-link" data-toggle="collapse" :data-target="'#'+answers._id"
                        aria-expanded="true" aria-controls="collapseOne">
                        <h5><strong> Answers ({{answers.answers.length}})</strong></h5>
                    </button>
                </h5>
            </div>

            <div :id="answers._id" class="collapse hide" aria-labelledby="headingOne" data-parent="#accordion">
                <div class="card-body">
                    <div style="margin-top: 15px">
                        <div v-for="(answer,indexAns) in answers.answers" :key="indexAns"
                            style="margin-top:40px;margin-bottom:40px">
                            <div>
                                <h4 style="margin-bottom: 25px">{{ answer.answer }}</h4>
                                <div v-html="answer.description"></div>
                            </div>
                            <br>
                            <div class="ml-3" v-if="answers.owner._id != user">
                                <b-row>
                                    <b-button class="mb-2" variant="outline-success" @click="upvoteAn(answer._id)">
                                        <i class="fas fa-angle-up"> {{ answer.upvotes.length }}</i>
                                    </b-button>
                                </b-row>
                                <b-row>
                                    <b-button variant="outline-danger" @click="downvoteAn(answer._id)">
                                        <i class="fas fa-angle-down"> {{ answer.downvotes.length }}</i>
                                    </b-button>
                                </b-row>
                            </div>
                            <br>
                            <div v-if="answer.owner == user">
                                <router-link :to="{ name: 'updateanswer', params: { id: answer._id }}">
                                    <b-button class="mr-2" variant="success" @click="saveDataGlobalAnswer(answer)">Update
                                    </b-button>
                                </router-link>
                                <b-button variant="warning" @click="deleteAnswer(answer._id)">Delete</b-button>
                            </div>
                            <hr>
                            <hr>
                        </div>
                        <router-link :to="{ name: 'addanswer', params: { questionId: answers._id }}"><button>Add
                                Answer</button></router-link>
                    </div>
                </div>
            </div>
        </div>
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
                        this.onStart()
                        
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
                        this.onStart()
                        
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
            onStart() {
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