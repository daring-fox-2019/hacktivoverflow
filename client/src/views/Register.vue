<template>
    <div class="card register-form">
        <h3 class="mb-3 text-center">Register</h3>
        <form @submit.prevent="register">
            <div class="form-group">
                <label for="username">Username</label>
                <input 
                    type="text" 
                    class="form-control" 
                    id="username"
                    v-model="form.username"
                    aria-describedby="emailHelp"
                    placeholder="Enter username"
                >
            </div>
            <div class="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input 
                    type="email" 
                    class="form-control" 
                    id="exampleInputEmail1"
                    v-model="form.email"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                >
                <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input 
                    type="password" 
                    class="form-control" 
                    id="exampleInputPassword1" 
                    v-model="form.password"                    
                    placeholder="Password"
                >
            </div>
            <button type="submit" class="btn btn-primary">Register</button>
            <router-link class="ml-3" to="/login">Already have an account?</router-link>
        </form>
    </div>
</template>

<script>
import myaxios from '@/api/axios'
import Swal from 'sweetalert2'

export default {
    data() {
        return {
            form: {
                username: '',
                email: '',
                password: ''
            }
        }
    },
    methods: {
        register() {
            myaxios
            .post('/users/register', this.form)
            .then(user=> {
                Swal.fire(
                    'Register Success!',
                    'Login to continue!',
                    'success'
                )
                this.form={}
            })
            .catch(err => {
                Swal.fire({
                    type: 'error',
                    title: `${err.response.data.msg.message}`,
                })
            })
        }
    },
}
</script>

<style>
.register-form {
    padding: 30px;
}
</style>
