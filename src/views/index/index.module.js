import angular from 'angular';

import { index } from './index.component';
import { helloAngular } from './components/hello-angular/hello-angular.component';

export default angular
  .module('app.views.index', [])
  .component({ index, helloAngular })
  .name;
