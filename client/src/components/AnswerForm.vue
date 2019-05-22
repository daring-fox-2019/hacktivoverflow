<template>
    <div id="answer">
        <div class="mt-5">
            <h5>Your Answer</h5>
            <hr>
        </div>
        <div v-if="loginUserId === questionId">
            <div>
                You can't answer your own question
            </div>
        </div>
        <div v-else-if="loginUserId===undefined">
            <div>
                Please login to answer
            </div>
        </div>
        <div v-else>
            <form @submit.prevent="submitAnswer">
                <div class="form-group">
                    <textarea 
                        placeholder=""
                        style="padding: 10px;"
                        cols="70" 
                        rows="10"
                        v-model="description"
                    ></textarea>
                </div>

                <button class="btn btn-primary">Submit Answer</button>
            </form>
        </div>
    </div>
</template>

<script>
import myaxios from '@/api/axios'

export default {
    props:['question-id', 'login-user-id'],
    data() {
        return {
            description: ''
        }
    },
    methods: {
        submitAnswer() {
            myaxios.defaults.headers.common['token'] = localStorage.token

            myaxios
            .post(`/answers/${this.$route.params.id}`, {description: this.description})
            .then(({data}) => {
                console.log(data);
                // this.answer.push(data)
            })
            .catch(err => {
                console.log(err);
            })
        },
        fetchAnswer() {
            myaxios
            .get('/answers')
            .then(({data}) => {
                // this.questions.push(data)
            })
            .catch(err => {
                console.log(err);
            })
        }
    },
}
</script>

<style>

</style>
