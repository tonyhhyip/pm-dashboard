'use strict';

export function reportExists(state, params) {
  const host = state[params.host];
  if (!(params.owner in host)) {
    return false;
  }
}
