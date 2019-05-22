<template>
<v-card class="card">
    <v-layout row align-start fill-height>
        <v-flex class="statSection mainitemSection" align-self-center>
            <router-link v-bind:to="'/questions/' + question._id" class="link">
                <v-layout column class="stat">
                    <v-flex align-self-center class="statDigit">
                        {{numAnswers}}
                    </v-flex>
                    <v-flex align-self-center>
                        <span>Answers</span>
                    </v-flex>
                </v-layout>
            </router-link>
        </v-flex>
        <v-flex class="statSection mainitemSection" align-self-center>
            <router-link v-bind:to="'/questions/' + question._id" class="link">
                <v-layout column class="stat">
                    <v-flex align-self-center class="statDigit">
                        {{numVotes}}
                    </v-flex>
                    <v-flex align-self-center>
                        <span>Votes</span>
                    </v-flex>
                </v-layout>
            </router-link>
        </v-flex>
        <v-flex ml-3 class="questionSection mainitemSection">
            <v-layout column align-space-between >
                <v-flex class="questionTitle">
                    <router-link v-bind:to="'/questions/' + question._id" class="link titleLink">{{title}}</router-link>
                </v-flex>
                <v-flex xs4 sm3 md3 lg3 class="lowerStatDiv">
                    <v-layout row>
                        <v-layout row class="tagDiv">
                            <v-flex>
                                <v-chip small v-for="(tag,i) in question.tags" :key="i" color="blue lighten-4"><a class="tag" v-bind:href="'questions/tagged/' + tag.name">{{tag.name}}</a></v-chip>
                            </v-flex>
                        </v-layout>
                        <v-layout row class='authorDiv'>
                            <v-flex>
                                posted by {{cardName}}, at {{createdAt}}
                            </v-flex>
                        </v-layout>
                    </v-layout>
                </v-flex>
            </v-layout>
        </v-flex>
    </v-layout>
</v-card>
</template>

<script>
import moment from 'moment'

export default {
    props: ['question'],
    name: 'QuestionCard',
    computed: {
        cardName() {
            let name = ''
            if(this.question.author && this.question.author.firstname) {
                name = this.question.author.firstname
            }
            else if(this.question.author && this.question.author.lastname) {
                name = this.question.author.lastname
            }
            return name;
        },
        title(){
            return !this.question.title ? 'Click to see question' : this.question.title;
        },
        numAnswers() {
            let len = 0
            len = !this.question.answers ? 0 : this.question.answers.length
            return len
        },
        numVotes() {
            let len = 0
            len = !this.question.upvote ? 0 : this.question.upvote.length
            len += !this.question.downvote ? 0 : -(this.question.downvote.length)

            return len
        },
        createdAt() {
            // return this.$props.question.created_at
            return this.$props.question.created_at ? moment(this.$props.question.created_at).format('MMMM Do YYYY, h:mm:ss a') : ''
        }
    }
}
</script>

<style scoped>
.card {
    margin-bottom: 2px;
}

.mainitemSection {
    height: 100%;
}
.stat {
    max-width: 60px;
    width: 60px;
    color: gray;
}
.statSection {
    max-width: 70px;
}
.titleLink {
    color: orangered;
}
.titleLink:hover {
    color: orange;
}
.link {
    text-decoration: none;
}

.statDigit {
    font-size: 24px;
}

.tag {
    font-size: 10px;
    text-decoration: none;
}

.tagDiv {
    width: 100%;
}

.questionSection {
    width: auto;
}

.questionTitle {
    font-size: 24px;
    margin-bottom: 20px;
}
.lowerStatDiv {
    max-height: 60px;
}

.authorDiv {
    min-width: 100px;
    color: gray;
}
</style>
