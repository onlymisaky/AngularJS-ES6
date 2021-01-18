/**
 * @returns {import('angular').IDirective}
 */
export function autoFocus() {
  return {
    restrict: 'A',
    link($scope, $ele) {
      $ele[0].focus();
    },
  };
}
