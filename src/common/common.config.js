/**
 * @param {import('angular').IQService} $q
 * @returns {import('angular').IHttpInterceptor}
 */
function httpInterceptorFactory($q) {
  return {

    request(config) {
      return config;
    },

    requestError(rejection) {
      return rejection;
    },

    response(resp) {
      return $q.resolve(resp);
    },

    responseError(rejection) {
      return rejection;
    },
  };
}

httpInterceptorFactory.$inject = ['$q'];

/**
 * @param {import('angular').IHttpProvider} $httpProvider
 */
export function commonConfig($httpProvider) {
  $httpProvider.interceptors.push(httpInterceptorFactory);
}

commonConfig.$inject = [
  '$httpProvider',
];
