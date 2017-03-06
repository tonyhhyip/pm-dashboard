import {SET_TOKEN, CLEAR_PROJECT} from './types';

export default {
  saveToken({commit}, token) {
    commit(SET_TOKEN, token);
  },
  logout({commit}) {
    commit(SET_TOKEN, null);
    commit(CLEAR_PROJECT);
    localStorage.clear();
  }
};