import { ComponentType, ReactNode } from 'react';

export interface IRoute {
  // Path, like in basic prop
  path: string;
  param?: string;
  // Exact, like in basic prop
  exact?: boolean;
  // Preloader for lazy loading
  fallback?: NonNullable<ReactNode> | null;
  // Lazy Loaded component
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: ComponentType<any>;
  // Sub routes
  routes?: IRoute[];
  // Redirect path
  redirect?: string;
  // If router is private, this is going to be true
  private?: boolean;
  // If router is private, this is going to be mandatory
  permissions?: number[];
  state?: any;
  isLicenseRequired?: boolean;
}
