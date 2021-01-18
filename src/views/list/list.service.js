/* eslint-disable global-require */
export class ListService {
  static $inject = ['HttpService'];

  /**
   *
   * @param {import('@/common/services/http.service')} HttpService
   */
  constructor(HttpService) {
    this.HttpService = HttpService;
  }

  getNewsList() {
    return this.HttpService
      .get('/4/news/latest')
      .then((response) => {
        if (response.status === 200) {
          return this.formatNewsList(response.data);
        }
        return this.formatNewsList(require('../../../mock/db.json'));
      })
      .catch(() => this.formatNewsList(require('../../../mock/db.json')));
  }

  /**
   * @private
   * @param {Array<any>} data
   */
  formatNewsList(data) {
    const idList = [];
    const list = [];
    [...data.top_stories, ...data.stories].forEach((item) => {
      if (!idList.includes(item.id)) {
        idList.push(item.id);
        // eslint-disable-next-line no-param-reassign
        item.image = item.image || item.images[0];
        list.push(item);
      }
    });
    return list;
  }
}
