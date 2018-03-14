import angular from 'angular';
import HelloWorld from './hello-world.component';
import focus from '@/directives/focus.directive';

export default angular
    .module('app.components.hello-world', [focus])
    .component('helloWorld', HelloWorld)
    .name;
