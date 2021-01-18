export class HttpService {
  baseUrl = process.env.NODE_ENV === 'production' ? '' : 'api';

  static $inject = ['$http'];

  /**
   * @param {import('angular').IHttpService} $http
   */
  constructor($http) {
    this.$http = $http;
  }

  /**
   * @param {string} url
   * @param {import('angular').IRequestShortcutConfig} config
   */
  get(url, config = {}) {
    return this.$http.get(this.baseUrl + url, config);
  }

  /**
 * @param {string} url
 * @param {any} data
 * @param {import('angular').IRequestShortcutConfig} config
 * @returns
 */
  post(url, data, config = {}) {
    return this.$http.post(this.baseUrl + url, data, config);
  }

  /**
   * @param {string} url
   * @param {import('angular').IRequestShortcutConfig} config
   */
  delete(url, config = {}) {
    return this.$http.delete(this.baseUrl + url, config);
  }

  /**
   * @param {string} url
   * @param {any} data
   * @param {import('angular').IRequestShortcutConfig} config
   */
  put(url, data, config = {}) {
    return this.$http.put(this.baseUrl + url, data, config);
  }

  /**
   * @param {string} url
   * @param {any} data
   * @param {import('angular').IRequestShortcutConfig} config
   */
  patch(url, data, config = {}) {
    return this.$http.patch(this.baseUrl + url, data, config);
  }
}
