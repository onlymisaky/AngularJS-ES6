function router($locationProvider, $stateProvider, $urlRouterProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(false);
    $urlRouterProvider.otherwise('/index');

    $stateProvider.state({
        name: '404',
        url: '/404',
        template:
            `<div>
                <h1 style="text-align: center;">404 NOT FOUND</h1>
            </div>`
    });
}

router.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

export default router;
