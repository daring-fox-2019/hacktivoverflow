<template>
    <nav>
        <v-toolbar
        color="teal lighten-2"
        flat 
        app
        >
            <v-toolbar-side-icon class="orange--text" @click="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title class="text-uppercase orange--text">
            <span>hacktiv</span>
            <span class="font-weight-light">Overflow</span>
            </v-toolbar-title>
            <v-spacer>
            </v-spacer>
            <v-btn @click.prevent="addQuestion" flat class="orange--text"><v-icon>help</v-icon>Ask Question</v-btn>
            <router-link to="/login">
            <v-btn v-show="!isLogin" flat color="orange">
                <span>Sign In</span>
                <v-icon>person</v-icon>
            </v-btn>
            </router-link>
            <v-btn @click="signOut" v-show="isLogin" flat color="orange">
                <span>Sign Out</span>
                <v-icon>exit_to_app</v-icon>
            </v-btn>
        </v-toolbar>

         <v-navigation-drawer v-model="drawer" app class="orange lighten-2">
            <v-list>
                <v-list-tile v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-tile-action>
                        <v-icon class="white--text">{{link.icon}}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content class="white--text">{{link.text}}</v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>

    </nav>
</template>

<script>

export default {
    data(){
        return{
            drawer : false,
            isLogin : false,
            components : {

            },
            links : [
                {icon : 'dashboard', text: 'Home', route: '/'},
                {icon : 'people', text: 'Profile', route: '/profile'}
            ]
        }
    },
    methods : {
        signOut(){
            console.log('masuk signout');
            this.$swal(`goodbye ${localStorage.fullName}`,'','success')
            localStorage.removeItem('token')
            localStorage.removeItem('userId')
            localStorage.removeItem('fullName')
            this.$router.push('/login')
            this.$store.commit('signout')
        },
        addQuestion(){
            if(this.isLogin){
                this.$router.push('/addQuestion')
            }else{
                this.$swal('you need to login first', '', 'error')
            }
        }
    },
    mounted(){
        if(localStorage.token){
            this.isLogin = true
        }
    }
}
</script>
