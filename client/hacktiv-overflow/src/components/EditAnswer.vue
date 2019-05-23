<template>
    <div class="mb-3 animated bounce">
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
        <div class="d-flex justify-content-end mt-2">
            <b-button size="sm" variant="secondary" class="mr-2" @click="editAnswer"> edit </b-button>
            <b-button size="sm" variant="outline-secondary" @click="cancelEdit"> cancel </b-button>
        </div>
    </div>
</template>

<script>
    import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
    import axios from '@/database/axios'

    export default {
        name: 'editor',
        data() {
            return {
                editor: ClassicEditor,
                editorData: '',
                editorConfig: {}
            };
        },
        mounted(){
            this.getOneAnswer()
        },
        methods: {
            getOneAnswer(){
                axios.get(`/answers/${this.$route.params.answer_id}`, {headers: { token : localStorage.getItem('token')}})
                .then(({data}) => {
                    this.editorData = data.description
                })
                .catch( err => {
                    console.log(err)
                })
            },
            editAnswer(){
                axios.patch(`/answers/${this.$route.params.answer_id}`, 
                    {description: this.editorData}, 
                    {headers: { token: localStorage.getItem('token')}
                })
                .then(({data}) => {
                    this.$router.push(`/question/${this.$route.params.id}`)
                })
                .catch( err => {
                    this.$swal('Oopps', `${err.response.data.message}`, 'error')
                })
            },
            cancelEdit(){
                this.$router.push(`/question/${this.$route.params.id}`)
            }
        }
    }
</script>