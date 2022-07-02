import routes from './routes.js';
import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store/index';
Vue.use(VueRouter)
export const router = new VueRouter({
  mode: 'history',
  routes
})
router.beforeEach((to, from, next) => {
  let hasToken = store.state.token
  if (hasToken) {
    if (to == '/home') {
      next()
    }
  } else {
    next({
      name: "login"
    })
  }
})