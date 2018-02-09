import angular from 'angular';
import HelloWorld from './hello-world.component';

export default angular
    .module('app.components.hello-world', [])
    .component('helloWorld', HelloWorld)
    .name;
