<template>
    <v-layout column mt-5 class="list">
        <QuestionCard class="card" v-for="(question, i) in $store.state.questions" :key="i" :question="question"></QuestionCard>
    </v-layout>
</template>

<script>
import QuestionCard from '@/components/QuestionCard.vue'

export default {
    name: 'QuestionsList',
    components: {
        QuestionCard,
    },
    created() {
        this.$store.dispatch('getQuestions')
        console.log(this.$store.state.questions);
    }
}
</script>

<style scoped>
.card {
    padding: 10px;
    border-bottom: 1px solid rgb(230, 230, 230);
}
</style>
