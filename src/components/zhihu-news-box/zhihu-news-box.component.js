import './zhihu-news-box.scss';
import template from './zhihu-news-box.html';
import controller from './zhihu-news-box.controller';

export default {
    controller,
    template,
    bindings: {
        news: '<'
    }
}; 
