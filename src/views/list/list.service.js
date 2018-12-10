import { HttpService } from '@/common/services/http.service';

export class ListService {

  static $inject = ['HttpService'];

  /**
   * 
   * @param {HttpService} HttpService 
   */
  constructor(HttpService) {
    this.HttpService = HttpService;
  }

  getNewsList() {
    return this.HttpService
      .get('/4/news/latest')
      .then(response => {
        if (response.status === 200) {
          return this.formatNewsList(response.data);
        }
        return this.formatNewsList(require('./../../../mock/db.json'));
      })
      .catch(err => this.formatNewsList(require('./../../../mock/db.json')))
  }

  /**
   * @private
   * @param {Array<any>} data 
   */
  formatNewsList(data) {
    const idList = [];
    const list = [];
    [...data.top_stories, ...data.stories].forEach(v => {
      if (!idList.includes(v.id)) {
        idList.push(v.id);
        v.image = v.image || v.images[0];
        list.push(v);
      }
    });
    return list;
  }

}
