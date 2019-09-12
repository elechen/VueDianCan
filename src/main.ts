import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
import weui from 'weui.js'
import * as define from './define'

Vue.config.productionTip = false

router.beforeEach(
  (to, from, next) => {
    if (to.name === 'login' || to.name === 'about') {
      next()
    } else {
      const token = localStorage.getItem('token')
      if (token !== null) {
        const url = `${define.API_HOST}/login`
        const data = { token }
        axios.post(url, data, { timeout: 3000 })
          .then((response) => {
            if (response.data.code === 0) {
              next()
            } else {
              next('/login')
            }
          })
      } else {
        weui.toast('请先登录')
        next('/login')
      }
    }
  }
)

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app')
