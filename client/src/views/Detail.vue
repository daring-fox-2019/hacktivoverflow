<template>
<div>
    <div class="container mt-5 bg-light p-5">
        <div style="text-align:center">
            <h3>{{ question.title }}</h3>
            <hr>
        </div>
        <div class="row">
        <div class="col-1 d-flex flex-column align-items-center">
            <a v-on:click.prevent = "upVotes(question.id)" href="#" target="_blank" rel="noopener noreferrer"> <h2><i class="fas fa-chevron-up"></i></h2></a>
            <h1> {{ question.point }} </h1>
            <a v-on:click.prevent = "downVotes(question.id)" href="#" target="_blank" rel="noopener noreferrer"> <h2><i class="fas fa-chevron-down"></i></h2></a>
        </div>
        <div class="col-11 d-flex" v-html= "question.description" />
        </div>
        <div class="row d-flex justify-content-start" >
			<i class="far fa-question-circle"></i>
            <small style="color:grey;">Asked by {{ question.username }}</small>
        </div>
		<div class="row d-flex justify-content-end">
			<a v-on:click.prevent= "updateQuestion(question.id)" href="#">edit</a>
			<a v-on:click.prevent= "removeQuestion(question.id)" href="#" class="ml-2">delete</a>
		</div>
    </div>
    <div class="container mt-5 bg-light p-5">
        <h4> Answer</h4>
        <hr>
		<div class="mt-5 row" v-for = "(answer,index) in answers" :key= 'index'>
			<div class="col-1 d-flex flex-column align-items-center">
				<a v-on:click.prevent = "upVotesAnswer(answer._id)" href="#" target="_blank" rel="noopener noreferrer"> <h2><i class="fas fa-chevron-up"></i></h2></a>
				<h1> {{ answer.upVotes.length - answer.downVotes.length }} </h1>
				<a v-on:click.prevent = "downVotesAnswer(answer._id)" href="#" target="_blank" rel="noopener noreferrer"> <h2><i class="fas fa-chevron-down"></i></h2></a>
			</div>
			<div class="col-11">
				<p v-html= "answer.description"> {{ answer.description }} </p>
				<div class="d-flex justify-content-start">
					<small style="color:grey;"> <i class="fas fa-comment"></i> Answered	 by {{ answer.username }}</small>			
				</div>
				<div class="row d-flex justify-content-end">
					<a  v-on:click.prevent= "updateAnswer(answer._id)" href="#">edit </a>
				</div>
				<hr size = "10">
			</div>
		</div>
    </div>
    <div id= "answer" class="container mt-5 bg-light p-5" style="height:450px">
        <h4>Your Answer</h4>    
        <hr>    
		<wysiwyg v-model= "answer.newAnswer" />
        <ul>
			<li><a v-on:click.prevent = "postAnswer" href="#" class="round green">{{ button.name }}<span class="round">{{ button.name }} Answer as <b>{{ user.username }}</b> </span></a></li>
		</ul> 
    </div>

</div>
</template>

<script>
import axios from '@/api/server.js'

export default {
    name : 'detail',
    components : {
    },
    data () {
        return {
			question : {
				id : '',
				title : '',
				description : '',
				username : '',
			},
			answer : {
				isUpdateAnswer : false,
				newAnswer : '',
				id : '',
				point : 0
			},
			answers : [],
			user : {
				username : ''
			},
			button : {
				name : 'Post'
			}
        }
    },
    methods : {
		upVotes (questionId) {
			if(!this.$store.state.isLogin) {
                this.$router.push('/login')
            }
			let token = localStorage.getItem('token')
			axios.post('/questions/' + questionId + '/upVotes',{} , { headers: { token } } )
			.then(data =>{
				this.fetchQuestion()
			})
			.catch(err =>{
				console.log(err)
			})
		},
		downVotes (questionId) {
			if(!this.$store.state.isLogin) {
                this.$router.push('/login')
            }
			let token = localStorage.getItem('token')
			axios.post('/questions/' + questionId + '/downVotes',{}, { headers : { token } } )
			.then(data =>{
				this.fetchQuestion()
			})
			.catch(err =>{
				console.log(err)
			})
		},
		upVotesAnswer (answerId) {
			if(!this.$store.state.isLogin) {
                this.$router.push('/login')
            }
			let token = localStorage.getItem('token')
			axios.post('/answers/' + answerId + '/upVotes',{} , { headers: { token } } )
			.then(data =>{
				this.fetchQuestion()
			})
			.catch(err =>{
				console.log(err)
			})
		},
		downVotesAnswer (answerId) {
			if(!this.$store.state.isLogin) {
                this.$router.push('/login')
            }
			let token = localStorage.getItem('token')
			axios.post('/answers/' + answerId + '/downVotes',{}, { headers : { token } } )
			.then(data =>{
				this.fetchQuestion()
			})
			.catch(err =>{
				console.log(err)
			})
		},
        fetchQuestion() {
            let questionId = this.$route.params.id
			let token = localStorage.getItem('token')
			let getQuestion = axios.get(`/questions/${questionId}`, { headers : { token }})
			let getAnswer = axios.get(`/question/${questionId}/answers`, { headers : { token }})
			Promise.all( [getQuestion, getAnswer])
            .then(( value ) =>{
				let { data } = value[0]
                this.question.id = data._id
                this.question.title = data.title
                this.question.description = data.description
                this.question.point = data.upVotes.length - data.downVotes.length
				this.question.username = data.username
				this.answers = value[1].data.data
				let dataAnswer = value[1].data.data[0]
                this.answer.point = dataAnswer.upVotes.length - dataAnswer.downVotes.length
				this.user.username = localStorage.getItem('username')
            })
            .catch(err =>{
                console.log(err.message)
            })
		},
		postAnswer () {
			if(!this.$store.state.isLogin) {
                this.$router.push('/login')
            }
			let check = localStorage.getItem('token')
			if(!check) {
				this.$router.push('/login')
			}
			let token = localStorage.getItem('token')
			let description = this.answer.newAnswer
			let questionId = this.$route.params.id
			if(!this.answer.isUpdateAnswer) {
				axios.post('/answers', { description,questionId },{ headers : { token }} )
				.then(({data}) =>{
					this.answer.newAnswer = ''
					this.fetchQuestion()
				})
				.catch(err =>{
					console.log(err)
				})
			}else {
				axios.put('/answers/'+this.answer.id,{ description }, { headers : { token }})
				.then(({data}) =>{
					this.answer.newAnswer = ''
					this.fetchQuestion()
				})
				.catch(err =>{
					console.log(err.response)
				})
			}
		},
		updateAnswer(answerId) {
			if(!this.$store.state.isLogin) {
				this.$router.push('/login')
			}
			let element = document.getElementById("answer")
			element.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
			let token = localStorage.getItem('token')
			this.button.name = 'Update'
			this.answer.isUpdateAnswer = true
			axios.get('answers/' + answerId,{ headers : { token } })
			.then(({ data }) =>{
				this.answer.newAnswer = data.description
				this.answer.id = data._id
			})
			.catch(err =>{
				console.log(err)
			})
		},
		removeQuestion(questionId) {
			if(!this.$store.state.isLogin) {
                this.$router.push('/login')
            }
			let token = localStorage.getItem('token')
			let deleteQuestion = axios.delete (`/questions/${questionId}`,{ headers : { token } })
			let deleteAnswer = axios.delete (`/answers/${questionId}`,{ headers : { token } })
			Promise.all([deleteQuestion,deleteAnswer])
			.then((value) =>{
				this.$router.push('/')
			})
			.catch (err =>{
				console.log(err.response)
			})
		},
		updateQuestion (questionId) {
			this.$router.push('/updatequestion/' + questionId)
		}
    },
    mounted () {
        this.fetchQuestion()
    }

}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
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
