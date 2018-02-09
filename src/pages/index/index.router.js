let routes = [
    {
        name: 'index',
        url: '/index',
        component: 'index'
    },
    {
        name: 'test',
        url: '/test',
        template: `<div>test</div>`
    }
];


function router($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/index');

    for (const route of routes) {
        $stateProvider.state(route);
    }

}

router.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

export default router;

