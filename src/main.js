import Vue from 'vue';
import VueMaterial from 'vue-material';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueMaterial);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
