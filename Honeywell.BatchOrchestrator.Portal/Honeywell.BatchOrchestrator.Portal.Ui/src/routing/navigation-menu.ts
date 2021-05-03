import { RoleValues } from 'core/authentication/models/user-role';
import { AppRoutes } from './app.route-names';

interface NavigationItem {
  desc: string;
  name: string;
  icon: string;
  route: string;
  permissions?: number[];
  state?: any;
  licenseRequired?: boolean;
}
interface NavigationGroup {
  header: string;
  permissions?: number[];
  children: NavigationItem[];
}
export const NavigationItems: NavigationGroup[] = [
  {
    header: 'Production Portal',
    children: [
      {
        desc: AppRoutes.FORMULA.name,
        name: AppRoutes.FORMULA.name,
        icon: 'device-management',
        route: AppRoutes.FORMULA.path,
      },
      {
        desc: 'Create Batch',
        name: 'CreateBatch',
        icon: '',
        route: AppRoutes.CREATE_BATCH.path,
        state: { fromNavigationMenu: true },
      },
      {
        desc: AppRoutes.CAMPAIGN_DASHBOARD.name,
        name: 'CampaignDashboard',
        icon: '',
        route: AppRoutes.CAMPAIGN_DASHBOARD.path,
        licenseRequired: true,
      },
      {
        desc: AppRoutes.WorkInstruction.name,
        name: 'WorkInstruction',
        icon: '',
        route: AppRoutes.WorkInstruction.path,
        licenseRequired: true,
      },
      {
        desc: AppRoutes.VIEW_APPROVALS.name,
        name: AppRoutes.VIEW_APPROVALS.name,
        icon: '',
        route: AppRoutes.VIEW_APPROVALS.path,
      },
      {
        desc: AppRoutes.AUDIT_TRAIL.name,
        name: 'AuditTrail',
        icon: '',
        route: AppRoutes.AUDIT_TRAIL.path,
      },
      {
        desc: AppRoutes.IMPORT_EXPORT.name,
        name: 'ImportExport',
        icon: '',
        route: AppRoutes.IMPORT_EXPORT.path,
      },
    ],
  },
  {
    header: 'Settings',
    children: [
      {
        desc: AppRoutes.ROLES_CONFIG.name,
        name: 'Userprofilemanagement',
        icon: '',
        route: AppRoutes.ROLES_CONFIG.path,
      },
      {
        desc: 'Application settings',
        name: 'Applicationsettings',
        icon: '',
        route: AppRoutes.APPLICATION_SETTINGS.path,
      },
    ],
  },
] as NavigationGroup[];
