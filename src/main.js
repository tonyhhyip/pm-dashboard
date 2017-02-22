import Vue from 'vue';
import VueMaterial from 'vue-material';
import App from './App.vue';
import router from './router';
import store from './store';

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

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
