<template>
    <div>
        <div @click="upvoteQuestion"><i class="fas fa-chevron-up"></i></div>
        <div class="text-center">{{question.upvote.length - question.downvote.length}}</div>
        <div @click="downvoteQuestion"><i class="fas fa-chevron-down"></i></div>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
