import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = true
Vue.prototype.$api_website = (Vue.config.productionTip) ? 'https://5ast.com/power' : 'http://127.0.0.1:8080/pos-api'
Vue.prototype.$api_host = (Vue.config.productionTip) ? 'https://5ast.com/power/api/v1' : 'http://127.0.0.1:8080/pos-api/api/v1'
Vue.prototype.$api_key = "IsIwnQR3Fm7qGyGN8D8wDjj4I9ZA5eCr1GnIpZCKqIKetfMofwyUOASv1KM8"

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
