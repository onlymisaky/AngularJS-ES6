// 用 ocLazyLoad 按需加载组件

let routes = [
    {
        name: 'list',
        url: '/list',
        component: 'list',
        resolve: {
            ZhihuNewsBox: ['$ocLazyLoad', $ocLazyLoad => import('@/components/zhihu-news-box/zhihu-news-box.module')
                .then(module => {
                    if (module.default) {
                        $ocLazyLoad.load({ name: module.default });
                        return module.default;
                    }
                    $ocLazyLoad.load({ name: module });
                    return module;
                })
                .catch(err => { console.log(err); })]
        }
    }
];

function router($stateProvider) {
    for (const route of routes) {
        $stateProvider.state(route);
    }
}

router.$inject = ['$stateProvider'];

export default router;
