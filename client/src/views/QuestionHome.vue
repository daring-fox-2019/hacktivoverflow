<template>
<v-layout row>
    <v-layout column class="questions">
        <v-flex xs6 sm2 md2 lg2>
            <v-btn dark class="orange darken-4" to="/questions/ask">Ask a question</v-btn>
        </v-flex>
        <QuestionsList></QuestionsList>
   </v-layout>
   <WatchedTags v-if="$store.state.isLogin" class="watchedPanel"></WatchedTags>
</v-layout>
</template>

<script>
import QuestionsList from '@/components/QuestionsList.vue'
import WatchedTags from '@/components/WatchedTags.vue'

export default {
    name: 'QuestionHome',
    components: {
        QuestionsList,
        WatchedTags,
    }
}
</script>

<style scoped>
.questions {
    width: auto;
    max-width: 70%;
}
.watchedPanel {
    width: 30%;
    margin-top: 96px;
    margin-left: 10px;
}
</style>
