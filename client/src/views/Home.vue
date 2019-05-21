<template>
    <div class="container-fluid">
        <b-row>
            <b-col cols="2"></b-col>
            <b-col cols="1"
                style="border-right: 1px solid rgb(200,200,200); margin-top:10px ; height:inherit;width: 12%; overflow:auto;">
                <ul style="list-style:none;padding-left:0px; color:rgb(125,125,125)">
                    <li style="margin-bottom:5px">
                        <router-link :to="{path: 'topquestions', name:'topquestions'}"><small>Top Questions</small>
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{path: 'tags', name:'tags'}"><small>Tags</small></router-link>
                    </li>
                </ul>
            </b-col>
            <b-col cols=6>
                <div v-if="$route.path == '/' || $route.path == '/#' || $route.path == '/#/'">
                    <h2 
                        style="margin-top:10px">
                        Welcome To Snap Overflow
                    </h2>
                    <br>
                    <h6> Feel free to explore this micro-scale Stack Overflow!</h6>
                </div>
                <router-view></router-view>

            </b-col>

        </b-row>
    </div>

</template>

<script>
    export default {
        name: "home",

    }
</script>

<style>

</style>