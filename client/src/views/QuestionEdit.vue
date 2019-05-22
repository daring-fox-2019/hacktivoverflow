<template>
    <QuestionForm>
        <h3 
            :name="form-title"
            :question="question"
            class="mb-3 text-center"
        >Edit Question</h3>        
    </QuestionForm>
</template>

<script>
import myaxios from '@/api/axios'
import QuestionForm from '@/components/QuestionForm'

export default {
    name: 'question-create',
    data() {
        return {
            question: {
                title: '',
                description: '',
                tags: []
            }
        }
    },
    components: {
        QuestionForm
    },
    methods: {
        
    },
    
}
</script>