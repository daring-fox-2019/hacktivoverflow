import Vue from 'vue';
import Vuetify from 'vuetify';
import swal from 'sweetalert';
import App from './App.vue';
import router from './router';
import store from './store';
import 'vuetify/dist/vuetify.min.css';
import wysiwyg from "vue-wysiwyg";


Vue.use(wysiwyg, {});
Vue.use(Vuetify);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  swal,
  render: h => h(App),
}).$mount('#app');
