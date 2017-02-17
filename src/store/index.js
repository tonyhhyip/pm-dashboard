import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const token = localStorage.getItem('api-token');

export default new Vuex.Store({
  state: {
    token
  },
  mutation: {
    setToken(state, token) {
      state.token = token;
    }
  }
});