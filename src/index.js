import Vue from 'vue'
import Bootstrap from 'bootstrap-vue'
import router from './router'
import App from './App'

Vue.use(Bootstrap)

const render = h => h(App)

new Vue({
  router,
  render,
}).$mount('#app')
