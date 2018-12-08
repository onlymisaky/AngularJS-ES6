import * as uiRouter from '@uirouter/angularjs';

/** @type {Array<uiRouter.Ng1StateDeclaration>} */
export const routes = [
  {
    name: 'index',
    url: '/index',
    component: 'index',
    lazyLoad(transition, state) {
      /** @type {oc.ILazyLoad} */
      const $ocLazyLoad = transition.injector().get('$ocLazyLoad');
      return import('@/views/index/index.module.js').then(ngModule => $ocLazyLoad.load({ name: ngModule.default }))
    }
  },
  {
    name: 'list',
    url: '/list',
    component: 'list',
    lazyLoad(transition, state) {
      /** @type {oc.ILazyLoad} */
      const $ocLazyLoad = transition.injector().get('$ocLazyLoad');
      return import('@/views/list/list.module.js').then(ngModule => $ocLazyLoad.load({ name: ngModule.default }))
    }
  }
];
