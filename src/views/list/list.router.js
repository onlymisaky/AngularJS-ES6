let routes = [
    {
        name: 'list',
        url: '/list',
        component: 'list',
        // resolve: {
        //     helloworld: ['$ocLazyLoad', $ocLazyLoad => import('@/components/hello-world/hello-world.module')
        //         .then(module => {
        //             if (module.default) {
        //                 $ocLazyLoad.load({ name: module.default });
        //                 return module.default;
        //             }
        //             $ocLazyLoad.load({ name: module });
        //             return module;
        //         })]
        // }
    }
];

function router($stateProvider) {
    for (const route of routes) {
        $stateProvider.state(route);
    }
}

router.$inject = ['$stateProvider'];

export default router;

