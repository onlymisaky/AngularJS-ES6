export class HttpService {

  baseUrl = process.env.NODE_ENV === 'production' ? '' : 'api';

  static $inject = ['$http'];

  /**
   * @param {angular.IHttpService} $http 
   * @param {angular.IHttpProvider} $httpProvider
   * @param {angular.IHttpInterceptor} $httpInterceptor
   */
  constructor($http) {
    this.$http = $http;
  }

  /**
   * @param {string} url 
   * @param {angular.IRequestShortcutConfig} config 
   */
  get(url, config = {}) {
    return this.$http.get(this.baseUrl + url, config);
  }

  /**
 * @param {string} url 
 * @param {any} data
 * @param {angular.IRequestShortcutConfig} config 
 * @returns 
 */
  post(url, data, config = {}) {
    return this.$http.post(this.baseUrl + url, data, config);
  }

  /**
   * @param {string} url 
   * @param {angular.IRequestShortcutConfig} config 
   */
  delete(url, config = {}) {
    return this.$http.delete(this.baseUrl + url, config);
  }

  /**
   * @param {string} url 
   * @param {any} data
   * @param {angular.IRequestShortcutConfig} config 
   */
  put(url, data, config = {}) {
    return this.$http.put(this.baseUrl + url, data, config);
  }

  /**
   * @param {string} url 
   * @param {any} data
   * @param {angular.IRequestShortcutConfig} config 
   */
  patch(url, data, config = {}) {
    return this.$http.patch(this.baseUrl + url, data, config);
  }
}
