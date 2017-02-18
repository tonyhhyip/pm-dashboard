'use strict';

module.exports = function (url) {
  const token = localStorage.getItem('api-token');
  const uri = new URL(url, 'https://circleci.com/api/v1.1/');
  return uri.toString() + '?circle-token=' + token;
};