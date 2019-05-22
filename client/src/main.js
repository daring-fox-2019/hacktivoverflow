import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import axios from 'axios'
import App from './App.vue'
import {store} from './store/store'
import router from './router'
import Swal from 'sweetalert2'
// import './stylus/main.styl'
import CKEditor from '@ckeditor/ckeditor5-vue';

Vue.use( CKEditor );
Vue.use(Vuetify)

export default axios.create({
  // baseURL: `http://3.17.36.202`
  baseURL : `http://localhost:3000`
})

Vue.prototype.axios = axios.create({
  // baseURL: `http://3.17.36.202`
  baseURL : `http://localhost:3000`
})


new Vue({
  el: '#app',
  store : store,
  router: router,
  render: h => h(App)
})