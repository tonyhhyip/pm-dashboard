'use strict';

module.exports = {
  path: '/report/:host/:owner/:project/:build',
  name: 'report',
  component: require('../components/Report.vue'),
};
