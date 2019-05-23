import Vue from 'vue'
import CKEditor from '@ckeditor/ckeditor5-vue'

import App from './App.vue'

import './assets/css/bootswatch.css'
import './assets/css/margin.css'
import './assets/css/padding.css'

import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(CKEditor)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
