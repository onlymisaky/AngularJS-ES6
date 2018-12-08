autoFocus.$inject = [];

/**
 * @returns {angular.IDirective}
 */
export function autoFocus() {
  return {
    restrict: 'A',
    link($scope, $ele, $attr) {
      $ele[0].focus();
    }
  }
}

