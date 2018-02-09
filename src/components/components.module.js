import angular from 'angular';

import HelloWorld from './hello-world/hello-world.module';

let requires = [
    HelloWorld
];

export default angular
    .module('app.components', requires)
    .name;


