<template>
    <div class="login">
        <v-container>
            <v-layout>
                <v-flex class="sm8 offset-sm2">
                <v-card 
                flat class="teal darken-2"
                height="550"
                justify-center
                >
                <v-layout justify-center>
                    <v-flex sm10>
                        <v-card class=" mt-5 pa-4">
                            <v-card-title>
                                <h1>login here</h1>
                            </v-card-title>
                            <v-form ref="form">
                                <v-text-field
                                v-model="email"
                                label="E-mail"
                                required
                                ></v-text-field>

                                <v-text-field
                                v-model="password"
                                label="password"
                                type="password"
                                required
                                ></v-text-field>

                                <v-btn
                                color="warning"
                                @click="login"
                                >
                                Login
                                </v-btn>
                            </v-form>
                        </v-card>
                        <v-layout justify-center mt-5>
                            <div class="white--text">
                                <v-layout justify-center>
                                    <h4>dont have any account?</h4>
                                </v-layout>
                                <v-layout justify-center>
                                    <router-link to="/register">
                                        <v-btn color="info">register</v-btn>
                                    </router-link>
                                </v-layout>
                                <v-layout justify-center>
                                    <router-link to="/">
                                        <v-btn color="info">back to Homepage</v-btn>
                                    </router-link>
                                </v-layout>
                            </div>
                        </v-layout>
                    </v-flex>
                </v-layout>
                </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            email : '',
            password: ''
        }
    },
    computed: {
        isLogin : function(){
            return this.$store.state.isLogin
        }
    },
    watch: {
        isLogin(){
            if(this.isLogin === true){
                this.$swal('Login Success' , `welcome ${localStorage.fullName}`,'success')          
                this.$router.push('/')
            }else{
                this.$swal('username/password salah', '', 'error')
            }
        }
    },
    methods : {
        login(){
            // console.log(this.email,this.password)
            console.log('login trigerred');
            let data = {
                email : this.email,
                password : this.password
            }
            this.$store.dispatch('login',data)
        }
    },
    mounted(){
        console.log('in mounted',this.isLogin);
        if(this.isLogin){
            console.log('already logged in');
        }
    }
}
</script>
