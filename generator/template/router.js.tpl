let routes = [
    {
        name: '<% filename %>',
        url: '/<% filename %>',
        component: '<% fileName %>'
    }
];

function router($stateProvider) {
    for (const route of routes) {
        $stateProvider.state(route);
    }
}

router.$inject = ['$stateProvider'];

export default router;
