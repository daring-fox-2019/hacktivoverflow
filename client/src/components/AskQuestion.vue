<template>
    <v-layout column class="content">
        <v-flex>
            <v-alert
                type="error"
                v-model="isError"
                dismissible
            >
            {{message}}
            </v-alert>
        </v-flex>
        <v-flex>
            <h1>Ask a Question</h1>
        </v-flex>
        <QuestionForm :type="'create'" v-on:submit="submitQuestion"></QuestionForm>
    </v-layout>
</template>

<script>
import backend from '@/api/http.js'
import QuestionForm from '@/components/QuestionForm.vue'

export default {
    name: 'AskQuestion',
    components: {
        QuestionForm,
    },
    data() {
        return {
            select: [],
            visibleTags: [],
            question: {
                title: '',
                content: '',
                tags: null,
                created_at: null,
            },
            tags: null,
            isError: false,
            message: '',
        }
    },
    created() {
        if(!this.$store.state.isLogin) {
            this.$router.push('/login')
        }
    },
    methods: {
        submitQuestion: function(evt) {
            backend
                .post(process.env.VUE_APP_SERVER_URL + '/questions', evt.question, 
                    { headers: { Authorization: localStorage.getItem('hackflow_token') } }
                )
                .then(({data}) => {
                    this.$router.push('/questions')
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
.content {
    max-width: 80%;
}
</style>
