<template>
    <div class="">
        <h3 class="mb-3 text-center">Ask Question</h3>
        <form @submit.prevent="submitQuestion">
            <div class="form-group">
                <label for="questionTitle">Title</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="questionTitle"
                    v-model="question.title"
                    placeholder="Enter title"
                    required
                >
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="questionDescription">Question</label>
                <textarea 
                    placeholder="What's your question?"
                    id="questionDescription"
                    v-model.trim="question.description"
                    style="padding: 10px; display:block;"
                    cols="70" 
                    rows="10"
                ></textarea>
            </div>

            <h6>Tags</h6>
            <div class="input-group mb-3" style="width: 20em;">
                <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Tags" 
                    aria-label="tags" 
                    aria-describedby="button-addon2"
                    v-model.trim="tagValue"
                >
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button"
                    @click.prevent="clickAddTags" 
                    id="button-addon2">Add</button>
                </div>
            </div>

            <div v-show="this.question.tags!==undefined">
                <span 
                    v-for="(tag, index) in this.question.tags"
                    class="tag"
                    :key="index"
                >{{tag}} <span class="remove-tag" @click="removeTag(tag)" style="display:inline-block; margin-right: 3px;">x</span>
                </span>
            </div>

            <div class="pull-right">
                <button type="submit" class="btn btn-primary">Submit</button>
            </div>
        </form>
    </div>
</template>

<script>
import myaxios from '@/api/axios'

export default {
    data() {
        return {
            question: {
                title: '',
                description: '',
                tags: []
            },
            tagValue: ''
        }
    },
    methods: {
        clickAddTags() {
            if(this.question.tags===undefined) {
                this.question.tags=[]
            }

            if(this.tagValue.trim()) {
                this.question.tags.push( this.tagValue )
            }
            this.tagValue=""
        },
        removeTag(tagName) {
            this.tagValue='reactive-force biar update tags nya jalan :D'
            this.tagValue=''
            this.question.tags = this.question.tags.filter(tag => {
                if(tag!==tagName) {
                    return tag
                }
            })
        },
        submitQuestion() {
            this.$store.dispatch('addNewQuestion', this.question)
            this.$router.push('/')
        }
    },
}   
</script>

<style scope>
    .tag {
        background-color: #616161;
        border-radius: 3px;
        padding: 2px 10px;
        color: #eee;
        font-weight: 500;
        display: inline-block;
    }
    .remove-tag {
        font-weight: 600;
        margin-right: 3px;
    }
    .remove-tag:hover {
        cursor: pointer;
    }
</style>
