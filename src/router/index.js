function router($locationProvider, $stateProvider, $urlRouterProvider) {

    let isHtml5Mode = process.env.NODE_ENV === 'development';

    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(isHtml5Mode);
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
