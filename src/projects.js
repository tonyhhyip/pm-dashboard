'use strict';

export function projectExists(state, params) {
  const host = state[params.host];
  return host && params.owner in host && params.project in host[params.owner];
}

export function reportExists(state, params) {
  const host = state[params.host];
  return projectExists(state, params) && params.build in host[params.owner][params.project];
}
