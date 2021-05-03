import { lazyLoad } from 'utils/loadable';
import { RoleValues } from 'core/authentication/models/user-role';
import { IRoute } from './config';
import { AppRoutes } from './app.route-names';

export const routes: IRoute[] = [
  {
    path: AppRoutes.DEFAULT.path,
    exact: true,
    component: lazyLoad(
      () => import('app/formula'),
      (pages) => pages.BoMainPage
    ),
  },
  {
    path: AppRoutes.FORMULA.path,
    exact: true,
    component: lazyLoad(
      () => import('app/formula'),
      (pages) => pages.BoMainPage
    ),
  },
  {
    path: AppRoutes.ADD_FORMULASET.path,
    component: lazyLoad(
      () => import('app/formula'),
      (pages) => pages.CreateFormulaSetIndex
    ),
    state: { fromNavigationMenu: true },
  },
  {
    path: AppRoutes.VIEW_FORMULASET.path,
    component: lazyLoad(
      () => import('app/formula'),
      (pages) => pages.ViewFormulaSetIndex
    ),
    state: { fromNavigationMenu: true },
  },
  {
    path: AppRoutes.VIEW_FORMULA.path,
    component: lazyLoad(
      () => import('app/formula'),
      (module) => module.ViewFormulaIndex
    ),
    private: false,
  },

  // {
  //   path: AppRoutes.CREATE_FORMULASET.path,
  //   exact: true,
  //   component: lazyLoad(
  //     () => import('app/formula'),
  //     (pages) => pages.RecipePopupWrapper
  //   ),
  // },
  {
    path: AppRoutes.CREATE_PRODUCT.path,
    exact: true,
    component: lazyLoad(
      () => import('app/formula'),
      (pages) => pages.CreateFormulaIndex
    ),
  },
  {
    path: AppRoutes.VIEW_APPROVALS.path,
    component: lazyLoad(
      () => import('app/formula'),
      (module) => module.Approvals
    ),
    exact: true,
    private: false,
  },
  {
    path: AppRoutes.IMPORT_EXPORT.path,
    component: lazyLoad(
      () => import('app/importExport'),
      (module) => module.ImportExport
    ),
    exact: true,
    private: false,
  },
  {
    path: AppRoutes.APPLICATION_SETTINGS.path,
    component: lazyLoad(
      () => import('app/application-settings'),
      (module) => module.ApplicationSettings
    ),
    exact: true,
    private: false,
  },
  {
    path: AppRoutes.ROLES_CONFIG.path,
    component: lazyLoad(
      () => import('app/role-management'),
      (module) => module.AbpmRoleManager
    ),
    exact: true,
    private: false,
  },
  {
    path: AppRoutes.EXPERION_MODIFIED_PARAMETER.path,
    component: lazyLoad(
      () => import('app/formula'),
      (module) => module.ExperionModifiedParameterList
    ),
    exact: true,
    private: false,
  },
  {
    path: AppRoutes.EXPERION_APPLY_CHANGES.path,
    component: lazyLoad(
      () => import('app/formula'),
      (module) => module.ExperionModification
    ),
    exact: true,
    private: false,
  },
  {
    path: AppRoutes.CREATE_BATCH.path,
    exact: true,
    component: lazyLoad(
      () => import('app/formula'),
      (pages) => pages.CreateBatch
    ),
    state: { fromNavigationMenu: true },
  },
  {
    path: AppRoutes.CAMPAIGN_DASHBOARD.path,
    component: lazyLoad(
      () => import('app/campaign'),
      (module) => module.CampaignDashboard
    ),
    exact: true,
    private: false,
    isLicenseRequired: true,
    redirect: AppRoutes.ADVANCE_BATCH_LICENSE_INFO.path,
  },
  {
    path: AppRoutes.CAMPAIGN_DETAILS.path,
    component: lazyLoad(
      () => import('app/campaign'),
      (module) => module.CampaignDetail
    ),
    param: AppRoutes.CAMPAIGN_DETAILS.param,
    private: false,
  },
  {
    path: AppRoutes.WorkInstruction.path,
    component: lazyLoad(
      () => import('app/workInstruction'),
      (pages) => pages.WILayout
    ),
    exact: true,
    private: false,
  },
  {
    path: AppRoutes.AUDIT_TRAIL.path,
    component: lazyLoad(
      () => import('app/formula'),
      (module) => module.AuditTrail
    ),
    exact: true,
    private: false,
  },
  {
    path: '/sample',
    component: lazyLoad(
      () => import('app/sample/Sample'),
      (module) => module.SamplePage
    ),
    exact: true,
    private: false,
  },
  {
    path: AppRoutes.DEV_DOCS.path,
    component: lazyLoad(
      () => import('app/dev-doc'),
      (module) => module.Buttons
    ),
    exact: true,
    private: false,
  },
  {
    path: AppRoutes.DEV_DOCS_HELPERS.path,
    component: lazyLoad(
      () => import('app/dev-doc'),
      (module) => module.Helpers
    ),
    exact: true,
    private: false,
  },
  {
    path: AppRoutes.ADVANCE_BATCH_LICENSE_INFO.path,
    component: lazyLoad(
      () => import('core/app-shell'),
      (module) => module.AdvancedBatchLiceseDetails
    ),
  },
  {
    path: AppRoutes.UNAUTHORIZED_ACCESS.path,
    component: lazyLoad(
      () => import('core/app-shell'),
      (module) => module.UnAuthorizedAccess
    ),
  },
];
