let routes = [
    {
        name: 'list',
        url: '/list',
        component: 'list'
    }
];

function router($stateProvider, ) {
    for (const route of routes) {
        $stateProvider.state(route);
    }
}

router.$inject = ['$stateProvider',];

export default router;

