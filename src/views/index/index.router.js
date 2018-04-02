let routes = [
    {
        name: 'index',
        url: '/index',
        component: 'index',
    }
];

function router($stateProvider, ) {
    for (const route of routes) {
        $stateProvider.state(route);
    }
}

router.$inject = ['$stateProvider'];

export default router;
