<template>
    <div class="my-container__small">
        <Sidebar />
        
        <div style="width: 644px;">
            <div class="heads">
                <h5 slot="header">My Questions</h5>
              <button @click="goToCreateQuestion" class="btn btn-primary">Ask Question</button>
            </div>
            <hr>
            <div v-if="myQuestion.length===0">
                <h5>You're not asking any question yet.</h5>
            </div>
            <div v-else>
                <QuestionList
                    :questions="myQuestion"
                    :manipulate="true"
                />
            </div>
        </div>
    </div>
</template>

<script>
import myaxios from '@/api/axios'
import QuestionList from '@/components/QuestionList.vue'
import Sidebar from '@/components/Sidebar.vue'

export default {
    name: 'my-questions',
    components: {
        QuestionList,
        Sidebar
    },
    data() {
        return {
            myQuestion:[]
        }
    },
    methods: {
        fetchMyQuestion() {
            myaxios.defaults.headers.common['token'] = localStorage.token

            myaxios
            .get('/questions/user')
            .then(({data}) => {
                this.myQuestion = data
                console.log(this.myQuestion);
            })
            .catch(err => {
                console.log(err);
            })
        },
        goToCreateQuestion() {
            if(localStorage.token) {
                this.$router.push('/question/ask')
            }else{
                this.$router.push('/login')
            }
        }
    },
    mounted() {
        this.fetchMyQuestion()
    },
}
</script>

<style scope>
.my-container__small {
  display: flex;
  justify-content: space-between;
}
</style>
