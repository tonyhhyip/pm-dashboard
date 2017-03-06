import {
  FETCH_PROJECT,
  FETCH_REPORT,
  FETCH_BUILD,
} from '../types';
import {reportExists, projectExists} from '../../projects';

const WARN_REASON = [
  'canceled',
  'no_tests',
];

const STATUS_ICON = {
  failed: {
    content: 'bug_report',
    theme: 'fail',
  },
  success: {
    content: 'done',
    theme: 'success'
  },
  fixed: {
    content: 'build',
    theme: 'success',
  },
  timedout: {
    content: 'alarm',
    theme: 'fail',
  },
  no_tests: {
    content: 'do_not_disturb_alt',
    theme: 'warn',
  },
};

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
  builds: {
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
  },
  [FETCH_BUILD](state, {host, owner, project, data}) {
    state.builds = Object.assign({}, state.builds, {
      [host]: {
        [owner]: {
          [project]: data,
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
  fetchBuild({commit}, build) {
    commit(FETCH_BUILD, build);
  }
};

const getters = {
  allProject(state) {
    return state.all;
  },
  projectOverview(state, getter) {
    return getter.allProject.map((project) => {
      if (!('master' in project.branches)) {
        return {};
      }
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
      const projectPage = {
        name: 'project',
        params: {
          host: project.vcs_type,
          owner: project.username,
          project: project.reponame,
        },
      };
      return {
        status,
        report,
        projectPage,
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
  },
  getBuild(state) {
    return function (host, owner, project) {
      if (projectExists(state.builds, {host, owner, project})) {
        const builds = state.builds[host][owner][project];
        return builds.map(build => {
          return {
            url: {
              name: 'report',
              params: {
                host,
                owner,
                project,
                build: build.build_num
              },
            },
            number: build.build_num,
            status: build.status in STATUS_ICON ? STATUS_ICON[build.status] : build.status,
            message: build.subject,
            author: build.author_name
          }
        });
      } else {
        return [];
      }
    }
  }
};

export default {
  state,
  mutations,
  actions,
  getters,
};
