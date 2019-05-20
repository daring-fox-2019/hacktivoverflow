<template>
    <v-container fluid pa-0>
        <v-layout row>
            <v-flex class="stats">
                <v-layout column>
                    <v-flex>
                        <v-btn flat icon color="gray lighten-3" @click="upvote">
                            <v-icon size="34px">arrow_drop_up</v-icon>
                        </v-btn>
                    </v-flex>
                    <v-flex class="vote">
                        {{totalVote}}
                    </v-flex>
                    <v-flex>
                        <v-btn flat icon color="gray lighten-3" @click="downvote">
                            <v-icon size="34px">arrow_drop_down</v-icon>
                        </v-btn>
                    </v-flex>
                </v-layout>
            </v-flex>
            <v-flex class="content">
                <v-layout column>
                    <v-flex class="itemContent">
                        {{entity.content}}
                    </v-flex>
                    <v-flex class="itemAuthor">
                        <v-layout row justify-space-between>
                            <v-flex>
                                posted by: {{entity.author.firstname +' '+ entity.author.lastname}}, at {{createdAt}}
                            </v-flex>
                            <v-flex>
                                <v-btn flat icon color="gray lighten-3" v-if="validAuthor" @click="$emit('edit', entity._id)">
                                    <v-icon size="26px">edit</v-icon>
                                </v-btn>
                                <v-btn flat icon color="gray lighten-3" v-if="validAuthor" @click="$emit('delete', entity._id)">
                                    <v-icon size="26px">delete</v-icon>
                                </v-btn>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                </v-layout>
            </v-flex>
        </v-layout>
    </v-container>    
</template>

<script>
import moment from 'moment'

export default {
    name: 'ItemDetail',
    props: ['entity'],
    computed: {
        totalVote() {
            let up = this.$props.entity.upvote.length === null ? 0 : this.$props.entity.upvote.length
            let down = this.$props.entity.downvote.length === null ? 0 : this.$props.entity.downvote.length

            return (up - down)
        },
        createdAt() {
            return this.$props.entity.created_at ? moment(this.$props.entity.created_at).format('MMMM Do YYYY, h:mm:ss a') : ''
        },
        validAuthor() {
            if(this.$store.state.user._id) {
                if(this.$store.state.user._id.toString() === this.$props.entity.author._id.toString())
                {
                    return true
                }
            }
            return false
        },
    },
    methods: {
        upvote() {
            this.$emit('upvote', this.$props.entity._id)
        },
        downvote() {
            this.$emit('downvote', this.$props.entity._id)
        },
    },
}
</script>

<style scoped>
.stats {
    max-width: 52px;
}
.content {
    width: auto;
    margin-left: 30px;
}

.itemContent {
    font-size: 20px;
    height: auto;
    min-height: 100px;
}
.itemAuthor {
    max-height: 20px;
    color: gray;
}
.author {
    float: right;
    max-height: 35px;
}
.vote {
    color: lightgray;
    font-size: 40px;
    text-align: center;
}

.manageBtn {
    max-width: 20px;
    max-height: 20px;
    font-size: 9px;
}

</style>
