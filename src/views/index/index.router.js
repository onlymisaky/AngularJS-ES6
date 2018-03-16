let routes = [
    {
        name: 'index',
        url: '/index',
        component: 'index',
        resolve: {
            helloworld: ['$ocLazyLoad', $ocLazyLoad => import('@/components/hello-world/hello-world.module')
                .then(module => {
                    if (module.default) {
                        $ocLazyLoad.load({ name: module.default });
                        return module.default;
                    }
                    $ocLazyLoad.load({ name: module });
                    return module;
                })]
        }
    },
    {
        name: 'test',
        url: '/test',
        template: `<div>test</div>`
    }
];

function router($stateProvider, ) {
    for (const route of routes) {
        $stateProvider.state(route);
    }
}

router.$inject = ['$stateProvider',];

export default router;
