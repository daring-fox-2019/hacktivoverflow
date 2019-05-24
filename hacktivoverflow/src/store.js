import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        isLogin : '',
        myquestionList : [],
        myanswerList : [],
        allQuestions : [],
        allAnswers : [],
        question : null,
        answer: null
    },
    mutations : {
        setIsLogin(state, data){
            state.isLogin = data
            console.log('is login', state.isLogin); 
        },
        setmyQuestions(state,data){
            state.myquestionList = data
            console.log('isi question',state.questionList)
        },
        setmyAnswers(state,data){
            state.myanswerList = data
            console.log('isi answer',state.answerList)
        },
        setAllQuestions(state,data){
            state.allQuestions = data
        },
        setAllAnswers(state,data){
            state.allAnswers = data
        }
        ,
        signout(state){
            console.log('trigerred logout di store');
            state.isLogin = ''
            state.myquestionList = []
            state.myanswerList = []
        },
        setQuestion(state,data){
            state.question = data
        },
        setAnswer(state,data){
            console.log('mau set answer',data);
            
            state.answer = data
        }
    },
    actions: {
        login(context,data){
            // console.log('ini data store',data);
            axios({
                method : 'post',
                url : "http://localhost:3000/login",
                data : data
            })
            .then(({data}) =>{
                console.log('ini data di setelah login',data);
                context.commit('setIsLogin',true)
                localStorage.setItem('token',data.token),
                localStorage.setItem('userId',data.id),
                localStorage.setItem('fullName',`${data.firstName} ${data.lastName}`)
                // this.state.questionList = data.questionList
                // this.state.answerList = data.answerList
            })
            .catch(err =>{
                console.log(err);
            })
        },
        getmyQuestion(context,data){
            console.log("masuk");
            
            axios({
                method: 'get',
                url : `http://localhost:3000/questions/profile/${localStorage.userId}`,
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data})=>{
                context.commit('setmyQuestions',data),{}
            })
            .catch(err =>{
                console.log(err);
            })
        },
        getmyAnswer(context,data){
            axios({
                method: 'get',
                url : `http://localhost:3000/answers/${localStorage.userId}`,
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data})=>{
                context.commit('setmyAnswers',data)
            })
            .catch(err =>{
                console.log(err)
            })
        },
        getQuestion(context,data){
            axios({
                method : 'get',
                url : 'http://localhost:3000/questions'
            })
            .then(({data})=>{
                context.commit('setAllQuestions',data)
            })
            .catch(err =>{
                console.log(err);
            })
        },
        getAnswer(context,data){
            axios({
                method : 'get',
                url : 'http://localhost:3000/answers'
            })
            .then(({data})=>{
                context.commit('setAllAnswers',data)
            })
            .catch(err =>{
                console.log(err);
            })
        },
        editQuestion(context,data){
            axios({
                method : 'patch',
                url : `http://localhost:3000/questions/${data.id}`,
                data : {
                    title : data.title,
                    description : data.description
                },
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data}) =>{
                this.dispatch('getQuestion')
            })
            .catch(err =>{
                console.log(err);
            })
        },
        upvoteQuestion(context,data){
            console.log('ini data client',data);
            
            axios({
                method : 'patch',
                url : `http://localhost:3000/questions/${data}/upvote`,
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data})=>{
                this.dispatch('getQuestion')
            })
            .catch(err =>{
                console.log(err);
            })
        },
        downvoteQuestion(context,data){
            console.log('ini data client',data);
            
            axios({
                method : 'patch',
                url : `http://localhost:3000/questions/${data}/downvote`,
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data})=>{
                this.dispatch('getQuestion')
                
            })
            .catch(err =>{
                console.log(err);
            })
        },
        createAnswer(context,data){
            console.log('ini data create answer',data,data.answer);
            
            axios({
                method : 'post',
                url : `http://localhost:3000/answers/${data.questionId}`,
                data: {
                    description : data.answer
                },
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data})=>{
                console.log(data);
                
                this.dispatch('getQuestion')
                this.dispatch('getAnswer')
            })
            .catch(err =>{
                console.log(err);
            })
        },
        getQuestionAnswer(context,data){
            console.log('masuk question answer',data);
            axios({
                method: 'get',
                url : `http://localhost:3000/answers/${data}/answer`,
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data})=>{
                console.log('ini data di question answer',data);
                
                context.commit('setQuestion',data)
            })
            .catch(err =>[
                console.log(err)
            ])
        },
        upvoteAnswer(context,data){
            let dataParam = data
            console.log('ini data client',data);
            axios({
                method : 'patch',
                url : `http://localhost:3000/answers/${dataParam.answerId}/upvote`,
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data})=>{
                this.dispatch('getQuestionAnswer',dataParam.questionId)
            })
            .catch(err =>{
                console.log(err);
            })
        },
        downvoteAnswer(context,data){
            console.log('ini data client',data);
            let dataParam = data
            axios({
                method : 'patch',
                url : `http://localhost:3000/answers/${dataParam.answerId}/downvote`,
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data})=>{
                this.dispatch('getQuestionAnswer',dataParam.questionId)
            })
            .catch(err =>{
                console.log(err);
            })
        },
        getOneAnswer(context,data){
            axios({
                method : 'get',
                url : `http://localhost:3000/answers/${data}`,
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data})=>{
                console.log('data di get one answer',data);
                
                context.commit('setAnswer',data)
            })
            .catch(err =>{
                console.log(err);
            })
        },
        editAnswer(context,data){
            console.log('masuk edit answer',data);
            
            axios({
                method : 'patch',
                url : `http://localhost:3000/answers/${data.id}`,
                data : {
                    description : data.answer
                },
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data})=>{
                console.log('berhasil di update',data);
            })
            .catch(err =>{
                console.log(err);
            })
        }
    }
})