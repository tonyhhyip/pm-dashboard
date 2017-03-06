'use strict';

module.exports = function (url) {
  const token = localStorage.getItem('api-token');
  const uri = new URL(url, 'https://circleci.com/api/v1.1/').toString();
  return `${uri}${uri.indexOf('?') !== -1 ? '&' : '?'}circle-token=${token}`;
};