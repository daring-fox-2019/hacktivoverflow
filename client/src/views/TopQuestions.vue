<template>
    <b-container>
        <h3 style="margin-top:10px; text-align:left">Top Questions</h3>
        <br>
        <table class="table table-light table-striped table-bordered table-hover">
            <tbody>
                <tr v-for="(question,index) in topQuestionList.data" :key="index">
                    <td class="align-middle" style="width:5%; text-align:center">
                        {{ question.upvotes.length - question.downvotes.length }}
                        <p><small>votes</small></p>
                    </td>
                    <td class="align-middle" style="width:5%; text-align:center">
                        {{ question.answers.length }}
                        <p><small>answers</small></p>
                    </td>
                    <td class="align-middle" style="width:5%; text-align:center">
                        {{question.views}}
                        <p><small>activities</small></p>
                    </td>
                    <td>
                        <b-row class="align-middle"
                            style="margin-left:10px;border-bottom: 1px solid white;padding-bottom:8px">
                            {{ question.question }}
                        </b-row>
                        <b-row class="align-middle p-0" style="margin-left:10px; margin-top:8px">
                            <span style="pointer:cursor" v-for="(tag,index) in question.watchTags" :key="index">
                                <tag :tag="tag[0]"></tag>
                            </span>
                        </b-row>
                    </td>
                </tr>
            </tbody>
        </table>
    </b-container>
</template>

<script>
    import axios from '@/api/axios'
    import tag from '@/components/tag.vue'
    export default {
        name: 'topquestions',
        data() {
            return {
                topQuestionList: []
            }
        },
        components: {
            tag
        },
        computed: {

        },
        methods: {
            comWatchtags(tags) {
                return JSON.stringify({
                    ...tags
                })
            },
            onStart() {
                axios
                    .get("/questions/top10list", {
                        headers: {
                            jwtoken: localStorage.jwtoken
                        }
                    })
                    .then(questionList => {
                        this.topQuestionList = questionList;
                        questionList.data.sort((a,b) => (a.views < b.views)? 1: -1)
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