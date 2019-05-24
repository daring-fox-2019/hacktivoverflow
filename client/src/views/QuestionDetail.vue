<template>
    <div class="my-container__small">
        <Sidebar />

        <div>
            <div id="question" style="display: flex; width: 644px;">
                <div class="mr-5">
                    <div class="vote" @click="upvoteQuestion"><i class="fas fa-chevron-up"></i></div>
                    <div class="text-center">{{question.upvote.length - question.downvote.length}}</div>
                    <div class="vote" @click="downvoteQuestion"><i class="fas fa-chevron-down"></i></div>
                </div>

                <div style="width: 100%;">
                    <div>
                        <h4>{{question.title}}</h4>
                        <hr>
                    </div>
                    <div>
                        <p>{{question.description}}</p>
                    </div>

                    <ul class="tags">
                        <li :key="index" v-for="(tag, index) in question.tags">{{tag}}</li>
                    </ul>
                    <div class="created-by__container">
                        <div class="created-by">
                            <div><i class="far fa-user"></i> {{question.userId.username}}</div>
                            <div><small>{{question.createdAt | moment("dddd, MMMM Do")}}</small></div>
                        </div>

                    </div>
                </div>
            </div>
            
            <div id="all-answer">
                
                <div>
                    <h5>{{answers.length}} Answer</h5>
                    <hr>
                </div>
                <div :key="index" v-for="(answer,index) in answers" style="display: flex; width: 644px;">
                    <div class="mr-5">
                        <div class="vote" @click="upvoteAnswer(answer._id)"><i class="fas fa-chevron-up"></i></div>
                        <div class="text-center">{{answer.upvote.length - answer.downvote.length}}</div>
                        <div class="vote" @click="downvoteAnswer(answer._id)"><i class="fas fa-chevron-down"></i></div>
                    </div>
                    <div style="width: 100%;" class="mb-3">
                        <div class="mb-5" style="display: flex; justify-content: space-between;">
                            <div v-html="answer.description"></div>
                            <button v-if="answer.userId._id===loginUserId" class="btn btn-link" @click="showEditTextArea">Edit</button>
                        </div>
                        <div v-if="showEdit">
                            <h6>Edit Answer</h6>
                            <form @submit.prevent="submitEditAnswer(answer._id)">
                                <textarea v-model="editAnswer" name="" id="" cols="60" rows="10"></textarea>
                                <button type="submit" class="btn btn-primary">Edit</button>
                            </form>
                        </div>
                        <div class="created-by__container">
                            <div class="created-by">
                                <div><i class="far fa-user"></i> {{answer.userId.username}}</div>
                                <div><small>{{answer.createdAt | moment("dddd, MMMM Do")}}</small></div>
                            </div>
                        </div>
                        <div>
                            <hr>
                        </div>
                    </div>
                </div>
            </div>

            <AnswerForm 
                :question-id="question.userId._id"
                :login-user-id="loginUserId"
            />

        </div>
        
    </div>
</template>

<script>
import myaxios from '@/api/axios'
import Sidebar from '@/components/Sidebar.vue'
import AnswerForm from '@/components/AnswerForm.vue'

export default {
    components: {
        Sidebar,
        AnswerForm
    },
    data() {
        return {
            question:[],
            answers: [],
            username: '',
            editAnswer: '',
            showEdit: false
        }
    },
    methods: {
        getQuestion() {
            myaxios.defaults.headers.common['token'] = localStorage.token

            myaxios
            .get(`/questions/${this.$route.params.id}`)
            .then(({data}) => {
                this.question = data
            })
            .catch(err=> {
                console.log(err);
            })
        },
        fetchAnswer() {
            myaxios.defaults.headers.common['token'] = localStorage.token

            myaxios
            .get(`/answers/${this.$route.params.id}`)
            .then(({data}) => {
                this.answers = data
            })
            .catch(err=> {
                console.log(err);
            })
        },
        upvoteQuestion(){
            if(localStorage.token) {
                myaxios.defaults.headers.common['token'] = localStorage.token

                myaxios
                .patch(`questions/vote/${this.question._id}/upvote`)
                .then(({data})=>{
                    this.question = data

                })
                .catch(err=>{
                    console.log(err);
                })
            }else{
                this.$router.push('/login')
            }
        },
        downvoteQuestion(){
            if(localStorage.token) {
                myaxios.defaults.headers.common['token'] = localStorage.token

                myaxios
                .patch(`questions/vote/${this.question._id}/downvote`)
                .then(({data})=>{
                    this.question = data
                })
                .catch(err=>{
                    console.log(err);
                })     
            }else{
                this.$router.push('/login')
            }      
        },
        upvoteAnswer(id){
            if(localStorage.token) {
                myaxios.defaults.headers.common['token'] = localStorage.token

                myaxios
                .patch(`answers/vote/${id}/upvote`)
                .then(({data})=>{
                    this.answers = this.answers.map(answer => {
                        if(answer._id === data._id) {
                            return data
                        }else{
                            return answer
                        }
                    })
                })
                .catch(err=>{
                    console.log(err);
                })
            }else{
                this.$router.push('/login')
            }   
        },
        downvoteAnswer(id){
            if(localStorage.token) {
                myaxios.defaults.headers.common['token'] = localStorage.token

                myaxios
                .patch(`answers/vote/${id}/downvote`)
                .then(({data})=>{
                    this.answers = this.answers.map(answer => {
                        if(answer._id === data._id) {
                            return data
                        }else{
                            return answer
                        }
                    })
                })
                .catch(err=>{
                    console.log(err);
                })       
            }else{
                this.$router.push('/login')
            }      
        },
        showEditTextArea() {
            this.showEdit= !this.showEdit
        },
        submitEditAnswer(answerId) {
            myaxios.defaults.headers.common['token'] = localStorage.token

            myaxios
            .patch(`answers/${answerId}`,{description:this.editAnswer} )
            .then(({data})=>{
                this.answers = this.answers.map(answer => {
                    if(answer._id === data._id) {
                        this.showEdit=false
                        return data
                    }else{
                        return answer
                    }
                })
            })
            .catch(err=>{
                console.log(err);
            })  
        }
    },
    mounted() {
        this.getQuestion()
        this.fetchAnswer()
    },
    computed: {
        loginUserId() {
            return this.$store.getters.loginUserId
        }
    },
    watch: {
        loginUserId() {
            return this.$store.getters.loginUserId
        }
    }
}
</script>

<style>
.tags li{
    display: inline-block;

    background-color: #eee;
    border-radius: 3px;
    padding: 0px 9px;
    color: #616161;
    font-weight: 500;
    display: inline-block;
    font-size: 13px;
    line-height: 17px;
}
.tags li:not(:first-child) {
    margin-left: 7px;
}
.created-by__container {
    text-align: right;
}
.created-by {
    display: inline-block;
    background-color: #ccdef9;
    padding: 6px 14px;
    border-radius: 5px;
}
.created-by > div {
    font-size: 16px;
}
.vote:hover {
    cursor: pointer;
} 
</style>
