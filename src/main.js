import 'babel-polyfill';
import Vue from 'vue';
import VueMaterial from 'vue-material';
import { sync } from 'vuex-router-sync';
import App from './App.vue';
import router from './router';
import store from './store';
import fetch from './fetch';

sync(store, router);

Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
  primary: 'deep-purple'
});

Vue.material.registerTheme({
  success: {
    primary: 'green',
    accent: 'white',
  },
  fail: {
    primary: 'red',
    accent: 'white',
  },
  warn: {
    primary: 'orange',
    accent: 'white',
  },
});

if (!store.state.projects.all.length) {
  fetch('projects')
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(response);
      }
    })
    .then(data => store.dispatch('fetchProject', data))
    .catch(() => {
      localStorage.removeItem('api-token');
      router.replace({name: 'token'});
    });
}

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
