/* eslint-disable no-nested-ternary */
import { Loader } from '@scuf/common';
import React, { Suspense } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { checkAccess } from 'core/authentication/utility/checkAccess';
import { IRoute } from './config';
import { useAppShellFacade } from '+store/app-shell';
import { AppRoutes } from './app.route-names';
import { useUserProfile } from '+store/user-profile';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function RouteView(route: IRoute) {
  const { advancedBatchLicense } = useAppShellFacade();
  const {
    profile: { roles },
  } = useUserProfile();
  return (
    // <Suspense fallback={<Loader />}>
    <Route
      exact={route.exact}
      path={route.param ? `${route.path}/:${route.param}` : route.path}
      render={(props) =>
        route.isLicenseRequired && !advancedBatchLicense ? (
          <Redirect
            to={route.redirect || AppRoutes.ADVANCE_BATCH_LICENSE_INFO.path}
          />
        ) : route.private &&
          !checkAccess(
            roles.map((m) => m.roleId),
            route.permissions
          ) ? (
          <Redirect to={route.redirect || AppRoutes.UNAUTHORIZED_ACCESS.path} />
        ) : (
          route.component && (
            <route.component {...props} routes={route.routes} />
          )
        )
      }
    />
    // </Suspense>
  );
}
