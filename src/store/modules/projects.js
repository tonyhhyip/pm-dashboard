import {FETCH_PROJECT} from '../types';

const WARN_REASON = [
  'canceled',
  'no_tests',
];

function determineLevel(success, fail) {
  if (!fail) {
    return 'success';
  }

  if (success && success.build_num > fail.build_num) {
    return 'success';
  }

  const {outcome} = fail;

  if (WARN_REASON.indexOf(outcome) !== -1) {
    return 'warn';
  }

  return 'fail';
}

const state = {
  all: []
};

const mutations = {
  [FETCH_PROJECT](state, projects) {
    state.all = projects;
  }
};

const actions = {
  fetchProject({commit}, projects) {
    commit(FETCH_PROJECT, projects);
  }
};

const getters = {
  allProject(state) {
    return state.all;
  },
  projectOverview(state, getter) {
    return getter.allProject.map((project) => {
      const success = project.branches.master.last_success;
      const fail = project.branches.master.last_non_success;
      const status = determineLevel(success, fail);
      const result = status === 'success' ? success : fail;
      return {
        status,
        commit: result.vcs_revision.substr(0, 6),
        owner: project.username,
        icon: project.vcs_type,
        name: project.reponame,
      };
    });
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
