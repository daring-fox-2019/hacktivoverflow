import Vue from 'vue';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import VueSweetalert2 from 'vue-sweetalert2';
import wysiwyg from 'vue-wysiwyg';
import App from './App.vue';
import router from './router';
import store from './store';


Vue.use(VueSweetalert2);
Vue.use(wysiwyg, {

}); // config is optional. more below
Vue.use(require('vue-moment'));

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
