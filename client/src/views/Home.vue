<template>
    <div>
        <b-container>
            <h3 style="margin-top:40px; text-align:left">Top Questions</h3>
            <br><br>
            <table class="table table-light table-hover">
                <tr v-for="(question,index) in topQuestionList.data" :key="index">
                    <td style="width:5%">
                        {{ question.upvotes.length - question.downvotes.length }}
                        <p><small>votes</small></p>
                    </td>
                    <td style="width:5%">
                        {{ question.answers.length }}
                        <p><small>answers</small></p>
                    </td>
                    <td style="width:5%">
                        {{question.views}}0
                        <p><small>views</small></p>
                    </td>
                    <td>
                        <b-row style="margin-left:20px">
                            {{ question.question }}
                        </b-row>
                        <b-row style="margin-left:20px">
                            {{ comWatchtags(question.watchTags) }}
                        </b-row>
                    </td>
                </tr>
            </table>
        </b-container>
    </div>

</template>

<script>
    import axios from '@/api/axios'
    export default {
        name: "home",
        data() {
            return {
                topQuestionList: []
            }
        },
        computed: {

        },
        methods: {
            comWatchtags(tags) {
                return JSON.stringify({...tags})
            },
            onStart() {
                axios
                    .get("/questions/list", {
                        headers: {
                            jwtoken: localStorage.jwtoken
                        }
                    })
                    .then(questionList => {
                        this.topQuestionList = questionList;
                    })
                    .catch(err => {
                        console.log(err);
                    });
            },
        },
        created() {
            this.onStart()
        }
    }
</script>

<style>

</style>