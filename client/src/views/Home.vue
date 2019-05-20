<template>
   <v-layout column>
        <v-flex xs6 sm2 md2 lg2>
            <v-btn dark class="orange darken-4" to="/questions/ask">Ask a question</v-btn>
        </v-flex>
        <QuestionsList></QuestionsList>
   </v-layout>
</template>

<script>
import QuestionsList from '@/components/QuestionsList.vue'
export default {
    components: { QuestionsList }
}
</script>
