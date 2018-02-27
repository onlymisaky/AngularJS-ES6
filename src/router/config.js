let routes = [
    {
        name: '404',
        url: '/404',
        template: `<div><h1 style="text-align: center;">404 NOT FOUND</h1></div>`
    }
];

let isHtml5Mode = process.env.NODE_ENV === 'development';

const config = ($locationProvider, $stateProvider, $urlRouterProvider) => {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(isHtml5Mode);
    $urlRouterProvider.otherwise('/404');

    for (let route of routes) {
        $stateProvider.state(route);
    }
}
config.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

export default config;
