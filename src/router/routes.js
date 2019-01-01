/** @type {Array<import('@uirouter/angularjs').Ng1StateDeclaration>} */
export const routes = [
  {
    name: 'index',
    url: '/index',
    component: 'index',
    lazyLoad(transition, state) {
      /** @type {import('oclazyload').ILazyLoad} */
      const $ocLazyLoad = transition.injector().get('$ocLazyLoad');
      $ocLazyLoad.load
      return import('@/views/index/index.module.js').then(ngModule => $ocLazyLoad.load({ name: ngModule.default }))
    }
  },
  {
    name: 'list',
    url: '/list',
    component: 'list',
    lazyLoad(transition, state) {
      /** @type {import('oclazyload').ILazyLoad} */
      const $ocLazyLoad = transition.injector().get('$ocLazyLoad');
      return import('@/views/list/list.module.js').then(ngModule => $ocLazyLoad.load({ name: ngModule.default }))
    }
  }
];
