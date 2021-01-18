/** @type {Array<import('@uirouter/angularjs').Ng1StateDeclaration>} */
export const routes = [
  {
    name: 'index',
    url: '/index',
    component: 'index',
    lazyLoad(transition) {
      /** @type {import('oclazyload').ILazyLoad} */
      const $ocLazyLoad = transition.injector().get('$ocLazyLoad');
      return import('@/views/index/index.module.js').then((ngModule) => $ocLazyLoad.load({ name: ngModule.default }));
    },
  },
  {
    name: 'list',
    url: '/list',
    component: 'list',
    lazyLoad(transition) {
      /** @type {import('oclazyload').ILazyLoad} */
      const $ocLazyLoad = transition.injector().get('$ocLazyLoad');
      return import('@/views/list/list.module.js').then((ngModule) => $ocLazyLoad.load({ name: ngModule.default }));
    },
  },
];
