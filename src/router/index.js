import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

Vue.use(Router);

const router = new Router({
  routes: [
    require('./token'),
    require('./home'),
    require('./report'),
    require('./project'),
  ]
});

router.beforeEach((to, from, next) => {
  if (!store.state.token && to.name !== 'token') {
    next({name: 'token'});
  } else {
    next();
  }
});

export default router;
