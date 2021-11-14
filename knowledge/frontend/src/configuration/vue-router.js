import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/pages/home/Home.vue'
import Admin from '@/pages/admin/Admin.vue'
import SignUp from '@/pages/authentication/SignUp.vue'
import Login from '@/pages/authentication/Login.vue'
import ArticlesByCategory from '@/pages/articles/ArticlesByCategory.vue'
import ArticleById from '@/pages/articles/ArticleById.vue'
import RequiresAuth from '@/guards/RequiresAuth'
import RequiresAdmin from '@/guards/RequiresAdmin'
import UnavailableAfterAuth from '@/guards/UnavailableAfterAuth'
import CloseMenuOnSmallDevices from '@/guards/CloseMenuOnSmallDevices'

Vue.use(VueRouter)

const routes = {
  mode: 'history',
  routes: [{
    name: 'home',
    path: '/',
    component: Home,
    beforeEnter: RequiresAuth
  }, {
    name: 'signUp',
    path: '/signUp',
    component: SignUp,
    beforeEnter: UnavailableAfterAuth
  }, {
    name: 'login',
    path: '/login',
    component: Login,
    beforeEnter: UnavailableAfterAuth
  }, {
    name: 'admin',
    path: '/admin',
    component: Admin,
    beforeEnter: RequiresAdmin
  }, {
    name: 'articlesByCategory',
    path: '/categories/:id/articles',
    component: ArticlesByCategory,
    beforeEnter: RequiresAuth
  }, {
    name: 'articleById',
    path: '/articles/:id',
    component: ArticleById,
    beforeEnter: RequiresAuth
  }]
}

const router = new VueRouter(routes)
router.afterEach(CloseMenuOnSmallDevices)

export default router