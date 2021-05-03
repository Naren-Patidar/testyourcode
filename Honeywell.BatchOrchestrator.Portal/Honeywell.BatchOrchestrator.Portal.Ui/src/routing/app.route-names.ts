export const AppRoutes = {
  DEFAULT: { name: '', path: '/' },
  HOME: { name: 'Formula Management', path: '/' },
  WorkInstruction: { name: 'Work Instruction', path: '/workInstruction' },
  ROLES_CONFIG: {
    name: 'Role Management',
    path: '/rolesconfig',
  },
  DEV_DOCS: { name: 'Dev Docs', path: '/dev/docs/buttons' },
  DEV_DOCS_BUTTONS: { name: 'Buttons', path: '/dev/docs/buttons' },
  DEV_DOCS_HELPERS: { name: 'Helpers', path: '/dev/docs/helpers' },

  CREATE_BATCH: { name: 'Create batch', path: '/create-batch' },

  VIEW_APPROVALS: { name: 'Approvals', path: '/approvals' },
  EXPERION_MODIFIED_PARAMETER: {
    name: 'Modify paramters',
    path: '/formulas/ModifiedParameters',
  },
  EXPERION_APPLY_CHANGES: {
    name: 'Apply experion changes',
    path: '/formulas/ApplyChanges',
  },
  APPLICATION_SETTINGS: {
    name: 'Application Settings',
    path: '/application-settings',
  },

  CAMPAIGN_DASHBOARD: {
    name: 'Campaign Dashboard',
    path: '/campaign',
  },
  CAMPAIGN_DETAILS: {
    name: 'Campaign Details',
    path: '/campaign/details',
    param: 'id',
  },
  AUDIT_TRAIL: {
    name: 'Audit trail',
    path: '/auditTrail',
  },
  FORMULA: { name: 'Formula Management', path: '/formulas' },
  ADD_FORMULASET: {
    name: 'Add formula set',
    path: '/formulas/addFormulaSet',
  },
  CREATE_FORMULASET: {
    name: 'Create formula set',
    path: '/formulas/createFormulaSet',
  },
  CREATE_PRODUCT: { name: 'Create Product', path: '/formulas/createProduct' },
  VIEW_FORMULASET: {
    name: 'View formula set',
    path: '/formulas/viewFormulaSet',
  },
  VIEW_FORMULA: { name: 'View formula', path: '/formulas/viewFormula' },
  ADVANCE_BATCH_LICENSE_INFO: {
    name: 'AdvanceBatch license',
    path: '/AdvanceBatchLicense',
  },
  IMPORT_EXPORT: { name: 'Import / Export', path: '/importExport' },
  UNAUTHORIZED_ACCESS: { name: 'Unauthorized', path: '/unauthorized' },
};
