import {SET_TOKEN} from './types';

export default {
  saveToken({commit}, token) {
    commit(SET_TOKEN, token);
  }
};