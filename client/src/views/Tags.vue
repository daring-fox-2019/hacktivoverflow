<template>
    <b-container>
        <div style="margin-bottom: 40px">
            <h3 style="margin-top:10px; margin-bottomL20px; text-align:left">Your Watch Tags</h3>
            <h6>Here are some tags you are currently watching:</h6>
            <div>
                <span v-for="(tag,index) in userData.watchTags" :key="index"
                    @contextmenu.prevent="removeFromWatchTags(tag)">
                    <tag :tag="tag"></tag>
                </span>
            </div>
            <h6 style="color:red;margin-top:10px"><small><i>* You can remove unwanted tag by right-clicking the
                        tag</i></small></h6>
        </div>
        <div>
            <h3 style="margin-top:10px; margin-bottomL20px; text-align:left">Tags</h3>
            <h6>This is a list of all tags existed in Snap Overflow:</h6>
            <div>
                <span v-for="(tag,index) in allTags" :key="index" @contextmenu.prevent="addIntoWatchTags(tag[0])">
                    <tag :tag="tag[0]"></tag>
                </span>
            </div>
            <h6 style="color:red;margin-top:10px"><small><i>* You can add any tag by right-clicking the tag</i></small>
            </h6>
        </div>
        <h6 style="position:fixed; right:20px;bottom:20px;color:red;margin-top:10px"><small><i>** Go directly into group of relevant tag by clicking into one of it</i></small></h6>
    </b-container>
</template>

<script>
    import {
        mapState
    } from 'vuex'
    import axios from '@/api/axios'
    import tag from '@/components/tag'

    export default {
        name: 'tags',
        components: {
            tag
        },
        data() {
            return {
                userData: {},
                allTags: []
            }
        },
        computed: {
            ...mapState([
                'isLoggedIn',
            ]),
        },
        methods: {
            addIntoWatchTags(tag) {
                axios
                    .patch('users/addtag/' + tag, {}, {
                        headers: {
                            jwtoken: localStorage.jwtoken
                        }
                    })
                    .then(data => {
                        console.log('joew')
                        this.onStart()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            removeFromWatchTags(tag) {
                axios
                    .patch('users/removetag/' + tag, {}, {
                        headers: {
                            jwtoken: localStorage.jwtoken
                        }
                    })
                    .then(data => {
                        this.onStart()
                    })
                    .catch(err => {
                        console.log(err)
                    })
            },
            onStart() {
                axios
                    .get('users', {
                        headers: {
                            jwtoken: localStorage.jwtoken
                        }
                    })
                    .then(({
                        data
                    }) => {
                        this.userData = data
                    })
                    .catch(err => {
                        console.log(err)
                    })
                axios
                    .get('questions/tags', {
                        headers: {
                            jwtoken: localStorage.jwtoken
                        }
                    })
                    .then(({
                        data
                    }) => {
                        this.allTags = data
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        },
        created() {
            this.onStart()
        }
    }
</script>

<style>

</style>