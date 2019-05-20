<template>
<v-layout column class="content" mt-4>
        <v-flex>
            <v-alert
                type="error"
                v-model="isError"
                dismissible
            >
            {{message}}
            </v-alert>
        </v-flex>
        <v-flex mt-2>
            <v-layout column>
                <v-flex>
                    <h2>Your Answer</h2>
                </v-flex>
                <v-flex mt-3>
                    <v-textarea
                        box
                        height="250px"
                        v-model="answer.content"
                    ></v-textarea>
                </v-flex>
            </v-layout>
        </v-flex>
        <v-flex>
            <v-layout>
                <v-flex>
                    <v-btn color="primary" @click="submitAnswer">Submit</v-btn>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>    
</template>

<script>
import backend from '@/api/http.js'

export default {
    name: 'AnswerForm',
    data() {
        return {
            answer: {
                content: '',
                created_at: null,
                author: this.$store.state.user._id
            },
            isError: false,
            message: '',
        }
    },
    methods: {
        clearForm: function() {
            this.answer.content = ''
            this.answer.created_at = null
        },
        submitAnswer: function() {
            this.answer.created_at = new Date()
            backend
                .post(process.env.VUE_APP_SERVER_URL + '/answers/' + this.$store.state.question._id, this.answer, 
                    { headers: { Authorization: localStorage.getItem('hackflow_token') } }
                )
                .then(({data}) => {
                    this.$router.push('/questions/' + this.$store.state.question._id)
                    this.$emit('answerSubmitted')
                    this.clearForm()
                })
                .catch(err => {
                    this.error = err.response.data
                    this.isError = true;
                    console.log(this.error);
                })
        },
    }
}
</script>

<style scoped>
</style>
