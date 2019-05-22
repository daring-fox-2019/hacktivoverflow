<template>
    <div class="container pb-2" style="border-bottom:solid #eeeeee 1px">
        <div class="row d-flex justify-content-between align-items-center" style="align-items:center !important">
            <div>
                <h4>All Questions </h4>
            </div>
            <div>
                <router-link to="/add-question">
                    <b-button variant="primary"> <i class="far fa-question-circle"></i> Ask Question </b-button>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'askquestion'
}
</script>

