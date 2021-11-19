import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

/**
 * Importa o bootstrap
 */

import 'bootstrap/scss/bootstrap.scss'

import './assets/sass/layout.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
