import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  theme: {
    "primary": "#212121",
    "secondary": "#e6e8e6",
    "accent": "#FF9100",
    "error": "#d32f2f",
    "info": "#536dfe",
    "success": "#00bfa5",
    "warning": "#ff9800",
  }
})