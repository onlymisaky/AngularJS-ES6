import * as uiRouter from '@uirouter/angularjs';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

routeChange.$inject = ['$transitions'];

/**
 * @param {uiRouter.Transition} $transitions
 */
export function routeChange($transitions) {
  $transitions.onStart({}, transition => {
    NProgress.start();
  });

  $transitions.onFinish({}, transition => {
    NProgress.done();
  });
}

// https://ui-router.github.io/guide/ng1/migrate-to-1_0#state-change-events
// $stateChangeStart $stateChangeCancel $stateChangeSuccess $stateChangeError $stateNotFound
