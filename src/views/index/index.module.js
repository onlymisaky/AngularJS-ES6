import angular from 'angular';
import uiRouter from '@uirouter/angularjs';


import Index from './index.component';
import router from './index.router';

import Helloworld from '@/components/hello-world/hello-world.module';

export default angular
    .module('app.views.index', [uiRouter, Helloworld])
    .component('index', Index)
    .config(router)
    .name;
