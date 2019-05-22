<template>
    <div>
        <ul class="list-group mt-4">
            <li 
                class="list-group-item"
                v-for="question in questions"
                :key="question._id"
            >
            <div class="response">
                <div class="response__answer">
                    <div>7</div>
                    <div class="desc">Answer</div>
                </div>
                <div class="response__answer">
                    <div>
                        <i class="far fa-laugh"></i>
                    </div>
                    <span class="desc">Upvote</span>
                </div>
                <div class="response__answer">
                    <div>
                        <i class="far fa-frown"></i>
                    </div>
                    <span class="desc">Downvote</span>
                </div>
            </div>
            <div class="title">
                <div class="content">
                    <router-link :to="`/question/${question._id}`" >
                        <div class="header">{{question.title}}</div>
                    </router-link>
                    <div class="manipulate" v-if="manipulate">
                        <div class="edit" @click="editQuestion(question._id)">Edit</div>
                        <div class="delete" @click="deleteQuestion(question._id)">Delete</div>
                    </div>
                </div>
                <div class="tags-container">
                    <ul class="tags">
                        <li  v-for="(tag, index) in question.tags" :key="index">{{tag}}</li>
                    </ul>
                    <div class="author">
                        by {{question.userId.username}}
                    </div>
                </div>
            </div>
            </li>
        </ul>
    </div>
</template>

<script>
import myaxios from '@/api/axios'
import Swal from 'sweetalert2'

export default {
    props: ['questions', 'manipulate'],
    methods: {
        editQuestion(id) {
            this.$router.push(`/question/edit/${id}`)
        },
        deleteQuestion(id) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.value) {
                    this.$store.dispatch('deleteQuestion', id)
                    this.$router.push('/')
                }
            })
        }
    },
}
</script>

<style scope>
.response {
    display: flex;
    width: 173px;
    justify-content: space-between;
}
.title {
    text-align: left;
    width: 25em;
    margin-left: 29px;
}
.header {
    font-size: 1.1em;
    font-weight: 600;
    color: #616161;
}
.list-group li {
    display: flex;
    justify-content: space-between;
}
.response__answer {
    color: #616161;

    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 43px;
}
.response__answer > .desc {
    font-size: 12px;
}
.tags-container {
    display: flex;
    justify-content: space-between;
    width: 25em;
}
.tags {
    padding: 0px;
    text-align: left;
}
.tags li {
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
.author {
    font-size: 13px;
    color: #616161;
}
.content {
    display: flex;
    justify-content: space-between;
}
.manipulate {
    display: flex;
    width: 5.5em;
    justify-content: space-between;
    font-size: 15px;
}
.manipulate .edit {
    color: #8f97ff;
}
.manipulate .edit:hover {
    color: #5c64c0;
    cursor: pointer;
}
.manipulate .delete {
    color: #f85d5d;
}
.manipulate .delete:hover {
    color: #ed1616;
    cursor: pointer;
}
</style>
