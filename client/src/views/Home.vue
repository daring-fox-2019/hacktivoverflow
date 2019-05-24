<template>
<QuestionHome></QuestionHome>
</template>

<script>
import QuestionHome from '@/views/QuestionHome.vue'

export default {
    components: { 
        QuestionHome,
    },
    mounted() {
        this.$store.dispatch('getUser');
    }
}
</script>
<style scoped>

</style>

