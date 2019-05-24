import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import store from './store'
import VueSweetalert2 from 'vue-sweetalert2'
import BootstrapVue from 'bootstrap-vue'
// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VeeValidate from 'vee-validate'

Vue.use(VueSweetalert2)
Vue.use(BootstrapVue)
Vue.use(VeeValidate,{ events: 'input|blur' })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
