import {SET_TOKEN} from './types';

export default {
  [SET_TOKEN](state, token) {
    state.token = token;
  }
}