import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import User from '../views/User.vue'
import Edit from '../views/Edit.vue'
import MyFollow from '../views/MyFollow.vue'
import MyComments from '../views/MyComments.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', name:'login', component: Login },
    { path: '/register', name:'register', component: Register },
    { path: '/user', name:'user', component: User },
    { path: '/edit', name:'edit', component: Edit },
    { path: '/my-follow', component: MyFollow },
    { path: '/my-comments', component: MyComments },
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const authUrl = ['/user', '/edit']
  if (authUrl.includes(to.path)) {
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else (
    next()
  )
})
export default router