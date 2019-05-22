<template>
    <nav class="navbar navbar-expand-lg" style="background-color:#C5E3F7">
        <div class="col-3">
            <a v-on:click.prevent="home" class="navbar-brand" href="#"> <img src="https://cdn1.iconfinder.com/data/icons/media-57/48/layers-512.png" style="height:50px"> Hacktiv OVerflow</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>
        <div class="col-6">
            <div class="row d-flex justify-content-center">
                <form class="form-inline my-2 my-lg-0">
                <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" style="width:400px">
                </form>
            </div>
        </div>
        <div class="col-3">
            <div class="row d-flex justify-content-center">
                <a v-on:click.prevent = "inputQuestion" href="#" class="action-button shadow animate blue">New Question</a>
                <a v-on:click.prevent = "login" href="#" class="action-button shadow animate red">Login</a>
            </div>
        </div>
</nav>
</template>

<script>
export default {
    name : "navbar",
    methods : {
        home () {
            this.$router.push('/')
        },
        login () {
            this.$router.push('/login')
        },
        inputQuestion () {
            if(this.$store.state.isLogin) {
                this.$router.push('/inputquestion')
            }else {
                this.$router.push('/login')
            }
        }
    }
}
</script>

<style>
    .navbar-brand {
        font-family: "Great Vibes", cursive;
        font-size: 30px;
        color: black;
    }
    .animate {
        transition: all 0.1s;
        -webkit-transition: all 0.1s;
    }
    .action-button {
        position: relative;
        padding: 5px 20px;
        margin: 0px 10px 10px 0px;
        float: left;
        border-radius: 10px;
        font-family: 'Pacifico', cursive;
        font-size: 25px;
        color: #FFF;
        text-decoration: none;	
    }
    .red {
        background-color: #E74C3C;
        border-bottom: 5px solid #BD3E31;
        text-shadow: 0px -2px #BD3E31;
    }
    .blue {
        background-color: #3498DB;
        border-bottom: 5px solid #2980B9;
        text-shadow: 0px -2px #2980B9;
    }
    
    .action-button:active {
        transform: translate(0px,5px);
        -webkit-transform: translate(0px,5px);
        border-bottom: 1px solid;
    }
</style>
