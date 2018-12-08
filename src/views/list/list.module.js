import angular from 'angular';

import { list } from './list.component';
import { newsPanel } from './components/news-panel/news-panel.component';
import { ListService } from './list.service';

export default angular
  .module('app.views.list', [])
  .component({ list })
  .component({ newsPanel })
  .service({ ListService })
  .name;
