import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

/**
 * @param {import('@uirouter/angularjs').Transition} $transitions
 */
export function routeChange($transitions) {
  $transitions.onStart({}, () => {
    NProgress.start();
  });

  $transitions.onFinish({}, () => {
    NProgress.done();
  });
}

routeChange.$inject = ['$transitions'];

// https://ui-router.github.io/guide/ng1/migrate-to-1_0#state-change-events
// $stateChangeStart $stateChangeCancel $stateChangeSuccess $stateChangeError $stateNotFound
