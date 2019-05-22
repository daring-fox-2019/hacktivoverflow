<template>
<div class="container mt-5 p-3" style="width:100vh; background-color:#E3E2E2" >
	<div class="row">
	<div class="col-6">
		<img src="https://glpld.org/wp-content/uploads/2018/09/waving-person.gif" style="height:48vh">
	</div>
	<div class="col-6">
		<form v-on:submit.prevent = "login">
			<div class="form-group">
				<label for="exampleInputEmail1">Email address</label>
				<input v-model= "user.email" type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
			</div>
			<div class="form-group">
				<label for="exampleInputPassword1">Password</label>
				<input v-model= "user.password" type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
			</div>
			<p> Don't have an account ?
				<a v-on:click.prevent = "register" href="#">Register</a>
			</p>
			<button type="submit" class="btn btn-primary" style="width:100%">Login</button>
		</form>
	</div>
	</div>
</div>
</template>

<script>
import axios from '@/api/server.js'

export default {
	name : 'login',
	data () {
		return {
			user : {
				email : '',
				password : ''
			}
		}
	},
	methods : {
		register () {
			this.$router.push('/register')
		},
		login () {
			axios.post('/user/login',{
				email : this.user.email,
				password : this.user.password
			})
			.then(({ data }) =>{
				localStorage.setItem('token',data.token)
				localStorage.setItem('username',data.username)
				this.$store.commit ('login')
				this.$router.push('/')
			})
			.catch(err =>{
				console.log(err)
			})
		}	
	}
}
</script>

<style>
	.container {
		-webkit-box-shadow: 2px 2px 300px -49px rgba(0,0,0,0.75);
		-moz-box-shadow: 2px 2px 300px -49px rgba(0,0,0,0.75);
		box-shadow: 2px 2px 300px -49px rgba(0,0,0,0.75);
	}

</style>
