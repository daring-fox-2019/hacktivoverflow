<template>
<div  class="container bg-light mt-5 p-5" >
    <form>
         <div class="form-group">
            <label for="exampleInputEmail1">Title</label>
            <input v-model= "newTitle" type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" >
            <br>
            <label for="exampleInputEmail1">Description</label>
            <wysiwyg v-model= "newDescription" />
        </div>
        <ul>
			<li><a href="#" class="round green">Update<span v-on:click.prevent = "update" class="round">Update Question as <b>{{user.username}}</b> </span></a></li>
		</ul> 
    </form>
</div>
</template>

<script>
import axios from '@/api/server.js'

export default {
    
        name : "updatequestion",
        data () {
            return {
                newDescription : '',
				newTitle : '',
				user : {
					username : ''
				}
            }
        },
        methods : {
            update () {
                let token = localStorage.getItem('token')
                let title = this.newTitle
                let description = this.newDescription
                axios.put('/questions/'+this.$route.params.id,{title,description}, { headers : {token}})
                .then(({data}) =>{
                    this.$router.push('/')
                })
                .catch(err => {
                    console.log(err.response)
                })
            }
		},
		mounted () {
            this.user.username = localStorage.getItem('username')
			let token = localStorage.getItem('token')
			axios.get(`/questions/${this.$route.params.id}`, {headers : {token}})
			.then(({data})=>{
				this.newDescription = data.description,
				this.newTitle = data.title
			})
			.catch(err =>{
				 console.log(err)
			})
		}
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
	* {
    margin: 0;
    padding: 0;
  	-moz-box-sizing: border-box;
		-o-box-sizing: border-box;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
	}

	ul {
		margin: 30px auto;
		text-align: center;
	}

	li {
		list-style: none;
		position: relative;
		display: inline-block;
		width: 100px;
		height: 100px;
	}

	@-moz-keyframes rotate {
		0% {transform: rotate(0deg);}
		100% {transform: rotate(-360deg);}
	}

	@-webkit-keyframes rotate {
		0% {transform: rotate(0deg);}
		100% {transform: rotate(-360deg);}
	}

	@-o-keyframes rotate {
		0% {transform: rotate(0deg);}
		100% {transform: rotate(-360deg);}
	}

	@keyframes rotate {
		0% {transform: rotate(0deg);}
		100% {transform: rotate(-360deg);}
	}

	.round {
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		padding-top: 30px;		
		text-decoration: none;		
		text-align: center;
		font-size: 25px;		
		text-shadow: 0 1px 0 rgba(255,255,255,.7);
		letter-spacing: -.065em;
		font-family: "Hammersmith One", sans-serif;		
		-webkit-transition: all .25s ease-in-out;
		-o-transition: all .25s ease-in-out;
		-moz-transition: all .25s ease-in-out;
		transition: all .25s ease-in-out;
		box-shadow: 2px 2px 7px rgba(0,0,0,.2);
		border-radius: 300px;
		z-index: 1;
		border-width: 4px;
		border-style: solid;
	}

	.round:hover {
		width: 130%;
		height: 130%;
		left: -15%;
		top: -15%;
		font-size: 33px;
		padding-top: 38px;
		-webkit-box-shadow: 5px 5px 10px rgba(0,0,0,.3);
		-o-box-shadow: 5px 5px 10px rgba(0,0,0,.3);
		-moz-box-shadow: 5px 5px 10px rgba(0,0,0,.3);
		box-shadow: 5px 5px 10px rgba(0,0,0,.3);
		z-index: 2;
		border-size: 10px;
		-webkit-transform: rotate(-360deg);
		-moz-transform: rotate(-360deg);
		-o-transform: rotate(-360deg);
		transform: rotate(-360deg);
	}

	a.green {
		background-color: rgba(1,151,171,1);
		color: rgba(0,63,71,1);
		border-color: rgba(0,63,71,.2);
	}

	a.green:hover {
		color: rgba(1,151,171,1);
	}

	.round span.round {
		display: block;
		opacity: 0;
		-webkit-transition: all .5s ease-in-out;
		-moz-transition: all .5s ease-in-out;
		-o-transition: all .5s ease-in-out;
		transition: all .5s ease-in-out;
		font-size: 1px;
		border: none;
		padding: 40% 20% 0 20%;
		color: #fff;
	}

	.round span:hover {
		opacity: .85;
		font-size: 16px;
		-webkit-text-shadow: 0 1px 1px rgba(0,0,0,.5);
		-moz-text-shadow: 0 1px 1px rgba(0,0,0,.5);
		-o-text-shadow: 0 1px 1px rgba(0,0,0,.5);
		text-shadow: 0 1px 1px rgba(0,0,0,.5);	
	}

	.green span {
		background: rgba(0,63,71,.7);		
	}
</style>
