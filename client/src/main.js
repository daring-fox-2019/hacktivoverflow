import wysiwyg from 'vue-wysiwyg';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/index';

Vue.use(wysiwyg, {}); // config is optional. more below
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  wysiwyg,
  render: h => h(App),
}).$mount('#app');
