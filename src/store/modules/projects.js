import {
  FETCH_PROJECT,
  FETCH_REPORT,
} from '../types';
import {reportExists} from '../../projects';

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
  all: [],
  reports: {
    bitbucket: {},
    github: {},
  },
};

const mutations = {
  [FETCH_PROJECT](state, projects) {
    state.all = projects;
  },
  [FETCH_REPORT](state, {host, owner, project, build, data}) {
    state.reports = Object.assign({}, state.reports, {
      [host]: {
        [owner]: {
          [project]: {
            [build]: data,
          }
        }
      }
    });
  }
};

const actions = {
  fetchProject({commit}, projects) {
    commit(FETCH_PROJECT, projects);
  },
  fetchReport({commit}, report) {
    commit(FETCH_REPORT, report);
  },
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
      const report = {
        name: 'report',
        params: {
          host: project.vcs_type,
          owner: project.username,
          project: project.reponame,
          build: result.build_num,
        },
      };
      return {
        status,
        report,
        commit: result.vcs_revision.substr(0, 6),
        icon: project.vcs_type,
        name: project.reponame,
        build: result.build_num,
        url: project.vcs_url,
        owner: project.username,
      };
    });
  },
  getProject(state, getter) {
    const projects = getter.projectOverview;
    return function (owner, name) {
      const results = projects.filter(project => project.name === name && project.owner === owner);
      return results.length > 0 ? results[0] : null;
    };
  },
  getReport(state) {
    return function (host, owner, project, build) {
      if (reportExists(state.reports, {host, owner, project, build})) {
        const pages = state.reports[host][owner][project][build];
        const homePages = pages.filter(report => report.path.endsWith('index.html'));
        const min = homePages.reduce((min, report) => {
          const depth = report.pretty_path.split('/').length;
          return depth < min ? depth : min;
        }, Infinity);
        return homePages.filter(report => report.pretty_path.split('/').length === min);
      } else {
        return [];
      }
    };
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};
