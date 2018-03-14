import angular from 'angular';

export default angular
    .module('app.directives.focus', [])
    .directive('focus', function () {
        return {
            restrict: 'A',
            link($scope, $ele, $attr) {
                console.log($scope, $ele, $attr);
                $ele[0].focus();
            }
        }
    })
    .name;

