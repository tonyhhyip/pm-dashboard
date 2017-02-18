import url from './url';
import headers from './header';

const fetch = window.fetch;

export default function (request, options) {
  return fetch(
    url(request),
    options ?
      Object.assign({}, {headers: headers(options.headers)}, options || {}) :
      {
        headers: {
          Accept: 'application/json'
        }
      }
  );
};