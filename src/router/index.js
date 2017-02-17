import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/token',
      name: 'token',
      component: require('../components/Token.vue')
    },
    {
      path: '/',
      name: 'home',
      component: require('../components/Home.vue')
    }
  ]
});

export default router;
