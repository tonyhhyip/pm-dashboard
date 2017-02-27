import Vue from 'vue';
import VueMaterial from 'vue-material';
import App from './App.vue';
import router from './router';
import store from './store';
import fetch from './fetch';

Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
  primary: 'purple'
});

Vue.material.registerTheme({
  success: {
    primary: 'green'
  },
  fail: {
    primary: 'red'
  },
  warn: {
    primary: 'orange'
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
