import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import './plugins'
import store from './store'
import FlashMessage from '@/components/FlashMessage'
/**
 * Importa o bootstrap
 */
import jquery from 'jquery'
import 'bootstrap/scss/bootstrap.scss'
window.$ = jquery
import './assets/sass/layout.scss'
Vue.component('flash-message',FlashMessage)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
