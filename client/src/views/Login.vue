<template>
    <div class="card login-form">
        <h3 class="mb-3 text-center">Login</h3>
        <form @submit.prevent="login">
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
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">Check me out</label>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
</template>

<script>
import myaxios from '@/api/axios'

export default {
    data() {
        return {
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods: {
        login() {
            myaxios
            .post('/users/login', this.form)
                .then(({ data }) => {
                    localStorage.token = data.token
                    this.$store.commit('setLogin', true)
                    this.$store.commit('setUser', data)
                    this.$router.push('/')
                })
                .catch(error => {
                    console.log(error);
                })
        }
    },
}
</script>

<style>
.login-form {
    padding: 30px;
}
</style>
