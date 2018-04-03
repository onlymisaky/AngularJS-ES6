import angular from 'angular';

export default angular
    .module('app.directives.<% filename %>', [])
    .directive('<% fileName %>', function () {
        return {
            restrict: 'A',
            link($scope, $ele, $attr) {

            }
        }
    })
    .name;
