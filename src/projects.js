'use strict';

export function reportExists(state, params) {
  const host = state[params.host];
  return host && params.owner in host && params.project in host[params.owner] && params.build in host[params.owner][params.project];
}
