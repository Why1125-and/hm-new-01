import Vue from 'vue'
import App from './App.vue'
import router from './router'

import 'lib-flexible'
import './styles/base.less'
import './styles/iconfont.css'

import { Field,Toast,Cell, CellGroup,Dialog,Radio,RadioGroup,Uploader,List,Tab,Tabs,PullRefresh,Sticky } from 'vant'
Vue.use(Field)
Vue.use(Toast)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Uploader)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)
Vue.use(Sticky)


import axios from 'axios'
axios.defaults.baseURL='http://localhost:3000'
Vue.prototype.$axios = axios

import moment from 'moment'
Vue.filter('data', function (val, farmat = 'YYYY-MM-DD') {
  return moment(val).format(farmat)
})


import HmHeader from './components/HmHeader.vue'
import HmLogo from './components/HmLogo'
import HmButton from './components/HmButton'
import HmPost from './components/HmPost'

Vue.component('hm-header', HmHeader)
Vue.component('hm-logo', HmLogo)
Vue.component('hm-button', HmButton)
Vue.component('hm-post', HmPost)

Vue.config.productionTip = false

// 请求拦截器
axios.interceptors.request.use(config => {
  let token =  localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

// 响应拦截器
axios.interceptors.response.use(res => {
  const { statusCode, message } = res.data
  
  if (statusCode === 401 && message === '用户信息验证失败') {
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')

    router.push('/login')
  }
  return res
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
