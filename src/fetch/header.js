'use strict';

export default function (headers) {
  if (headers instanceof Headers) {
    headers.set('Accept', 'application/json');
  } else if (!!headers && typeof headers === 'object') {
    return Object.assign({} , {
      Accept: 'application/json'
    }, headers);
  } else {
    return {
      Accept: 'application/json'
    };
  }
};