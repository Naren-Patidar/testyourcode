import React from 'react';
import { Redirect, Switch } from 'react-router-dom';
import { RouteView } from './RouteView';
import { IRoute } from './config';

interface IProps {
  routes: IRoute[];
}

export const Router: React.FC<IProps> = ({ routes }) => {
  return (
    <Switch>
      {routes &&
        routes.map((route: IRoute) =>
          route.routes && route.routes.length > 0 ? (
            <Router key={route.path} routes={route.routes} />
          ) : (
            <RouteView key={route.path} {...route} />
          )
        )}
      <Redirect to="/" />
    </Switch>
  );
};
