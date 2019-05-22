<template>
    <div class="register">
        <v-container>
            <v-layout>
                <v-flex class="sm8 offset-sm2">
                <v-card 
                flat class="teal darken-2"
                height="670"
                justify-center
                >
                <v-layout justify-center>
                    <v-flex sm10>
                        <v-card class=" mt-5 pa-4">
                            <v-card-title>
                                <h1>Register here</h1>
                                </v-card-title>
                                <v-form>

                                    <v-text-field
                                    v-model="firstName"
                                    label="First Name"
                                    required
                                    ></v-text-field>

                                    <v-text-field
                                    v-model="lastName"
                                    label="Last Name"
                                    required
                                    ></v-text-field>

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
                                    @click="register"
                                    >
                                    register
                                    </v-btn>
                                </v-form>
                            </v-card>
                            <v-layout justify-center mt-5>
                                <div class="white--text">
                                    <h4>already have an account?</h4>
                                    <v-layout justify-center>
                                        <router-link to="/login">
                                        <v-btn color="info">login</v-btn>
                                        </router-link>
                                    </v-layout>
                                        <router-link to="/">
                                            <v-btn color="info">back to Hompage</v-btn>
                                        </router-link>
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
import axios from  'axios'
import swal from 'vue-sweetalert2'

export default {
    data(){
        return{
            firstName :'',
            lastName: '',
            email: '',
            password: ''
        }
    },
    methods : {
        register(){
            // console.log(this.firstName,this.lastName,this.email,this.password)
            let user;
            axios({
                method: 'post',
                url: 'http://localhost:3000/register',
                data : {
                    firstName : this.firstName,
                    lastName : this.lastName,
                    email: this.email,
                    password: this.password
                }
            })
            .then(({data}) =>{
                this.firstName ='',
                this.lastName = '',
                this.email = '',
                this.password = ''
                console.log('successfull registry');
                this.$swal('user successfully registered','','success')
                this.$router.push('/login')
            })
            .catch(err =>{
                console.log(err);
            })
        }
    }
}
</script>
