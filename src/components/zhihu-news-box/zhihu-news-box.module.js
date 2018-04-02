import angular from 'angular';

import ZhihuNewsBox from './zhihu-news-box.component';

export default angular
    .module('app.components.zhihu-news-box', [])
    .component('zhihuNewsBox', ZhihuNewsBox)
    .name;
