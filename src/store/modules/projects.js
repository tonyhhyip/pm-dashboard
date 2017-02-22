import {FETCH_PROJECT} from '../types';

function determineLevel(success, fail) {
  if (!success) {
    return 'fail';
  }

  if (!fail) {
    return 'success';
  }

  if (success.build_num > fail.build_num) {
    return 'success';
  }

  const {outcome} = fail;

  if (outcome === 'canceled') {
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
      const master = project.branches.master;
      const status = determineLevel(master.last_success, master.last_non_success);
      const commit = status === 'success' ? master.last_success.vcs_revision : master.last_non_success.vcs_revision;
      return {
        status,
        icon: project.vcs_type,
        name: project.reponame,
        commit: commit.substr(0, 6),
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
