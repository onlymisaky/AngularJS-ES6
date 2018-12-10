import angular from 'angular';

import { commonModule } from '@/common/common.module';
import { routerModule } from '@/router/router.module';

import '@/assets/styles/main.scss';

angular.module('app', [
  commonModule,
  routerModule
]);

angular.element(document).ready(() => {
  angular.bootstrap(document, ['app']);
});
