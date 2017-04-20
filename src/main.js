import Vue from 'vue'
import VueResource from 'vue-resource'
import Router from 'vue-router'

import App from './App'
import routes from './routes'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(ElementUI)

Vue.use(VueResource)
Vue.use(Router)
Vue.config.debug = true

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
