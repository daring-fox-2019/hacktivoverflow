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
                <v-flex class="preview" mt-3 v-html="output">
                </v-flex>
                <v-flex mt-3>
                    <!-- <v-textarea
                        box
                        height="250px"
                        v-model="answer.content"
                    ></v-textarea> -->
                    <markdown-editor v-model="answer.content" ref="markdownEditor" preview-class="markdown-body"></markdown-editor>
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
import markdownEditor from 'vue-simplemde/src/markdown-editor'
import hljs from 'highlight.js';

export default {
    name: 'AnswerForm',
    components: {
      markdownEditor
    },
    data() {
        return {
            output: '',
            answer: {
                content: '',
                created_at: null,
                author: this.$store.state.user._id
            },
            isError: false,
            message: '',
        }
    },
    watch: {
        "answer.content": function(newval, oldval) {
            this.output = this.simplemde.markdown(newval)
        },
    },
    computed: {
        simplemde: function() {
            return this.$refs.markdownEditor.simplemde
        },
    },
    methods: {
        clearForm: function() {
            this.answer.content = ''
            this.answer.created_at = null
        },
        submitAnswer: function() {
            this.answer.created_at = new Date()
            this.answer.content = this.output;
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
@import '~simplemde/dist/simplemde.min.css';
@import '~github-markdown-css';
@import '~highlight.js/styles/atom-one-dark.css';

.preview {
background: rgba(231, 230, 230, 0.521);
}
</style>
