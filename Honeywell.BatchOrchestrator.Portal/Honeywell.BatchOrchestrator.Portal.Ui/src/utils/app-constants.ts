import { SafetyItem } from 'app/workInstruction/models';

export const AppConstants = {
  BASE_URL: '/ProductionPortal',
  drawerWidth: 240,
  PAGE_SIZE: 50,
  ENTER_KEYCODE: 13,
  ENTER_KEY: 'Enter',
  LICENSE_REQUIRED_MESSAGE: 'Advanced Batch Point license is not enabled',
  EMPTY_GUID: '00000000-0000-0000-0000-000000000000',
  UNAUTHORIZED_MESSAGE: 'You do not have permission to perform this action',
  AUTHENTICATION_FAILED: 'Authentication failed',
  MAX_DECIMAL_DIGITS_ALLOWED: 2,
};
export const BATCHORCHESTRATOR = 'Production Portal';
export const FORMULASET = 'Formula Set';
export const FORMULASETS = 'Formula Sets';
export const FORMULA = 'Formula';
export const FORMULAS = 'Formulas';
export const IDENTIFICATION = 'Identification No.';

export const RESPONSE_MSG = {
  ECONNABORTED: 'ECONNABORTED',
  UNAUTHORIZED: 'UNAUTHORIZED',
  CONNECTION_OPENED: 'CONNECTION OPENED',
  UNAUTHENTICATED: 'UNAUTHENTICATED',
};
export const RESPONSE_CODE = {
  SUCCESS: 200,
  NO_CONTENT: 204,
  SUCCESSFUL: 299,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_DOWN: 503,
};

export const EWI_STATUS = {
  DRAFT: 1,
  MODIFIED: 2,
  UNDERREVIEW: 3,
  REWORK: 4,
  APPROVED: 5,
  RELEASED: 6,
  TOBEDELETED: 7,
  OBSOLETE: 8,
  BRANCHED: 9,
};

export const STATUS = {
  DRAFT: 'draft',
  MODIFIED: 'modified',
  UNDERREVIEW: 'under review',
  REWORK: 'rework',
  APPROVED: 'approved',
  RELEASED: 'released',
  TOBEDELETED: 'to be deleted',
  OBSOLETE: 'obselete',
  BRANCHED: 'branched',
};

export const DATEFORMATFORLASTEDITED = 'M MMMM YYYY HH:mm A';

export const EWI_SAVE = 'SAVE';
export const EWI_PUBLISH = 'PUBLISH';
export const EWI_DELETE = 'DELETE';
export const DUPLICATE_EWI_PREFIX = 'CURRENT - ';
export const NUMBER_OF_TAGS_LIMIT = 10; //
export const MAXIMUM_NUMBER_OF_TASK_LIMIT = 32; //
export const MINIMUM_NUMBER_OF_TASK_LIMIT = 1; //
export const MIN_TITLE_CHARACTER_LIMIT = 3;
export const MAX_CHARACTERS_FOR_TASK_NAME = 'Max 500 characters reached';
export const EMPTY_TASK_NAME = 'Task Name cannot be empty';
export const MAX_CHARACTERS_FOR_EWI_DESCRIPTION = 'Max 500 characters reached';
export const EWI_TITLE_SPECIAL_CHARACTERS_NUMBERS_VALIDATION =
  'Title should start with Alphanumeric characters';
export const MAX_CHARACTERS_FOR_EWI_TITLE = 'Max 40 characters reached';
export const EMPTY_EWI_TITLE = 'Please enter the title';
export const MAX_CHARACTER_LIMIT_FOR_TITLE = 40;
export const MAX_CHARACTER_LIMIT_FOR_DESCRIPTION = 500;
export const MAX_NUMBER_OF_TASKS = 'Max 32 tasks reached';
export const MAX_NUMBER_OF_TAGS = 'Max 10 tags reached';
export const DUPLICATE_TASK = 'This task is already added';
export const MANDATORY_APPROVER_COMMENTS = 'Approver comments are mandatory';
export const DUPLICATE_TITLE = 'Title already taken';
export const INSTRUCTIONS_LIMIT = 75;
export const UNSUPPORTED_DOC_TYPES = ['exe', 'dll', 'bat'];
export const UNSUPPORTED_DOC_MESSAGE = 'Unsupported file type';
export const MIN_TITLE_CHARACTER_MESSAGE =
  'Title should have atleast 3 characters';

export const SAFETY_ITEMS: SafetyItem[] = [
  {
    id: 1,
    name: 'Ear protection',
    iconClassName: 'ear-protection',
    isCustom: false,
    isChecked: false,
    isFocused: false,
  },
  {
    id: 2,
    name: 'Hard hat',
    iconClassName: 'hard-hat',
    isCustom: false,
    isChecked: false,
    isFocused: false,
  },
  {
    id: 3,
    name: 'Gloves',
    iconClassName: 'gloves',
    isCustom: false,
    isChecked: false,
    isFocused: false,
  },
  {
    id: 4,
    name: 'Ventilation',
    iconClassName: 'ventilation',
    isCustom: false,
    isChecked: false,
    isFocused: false,
  },
  {
    id: 5,
    name: 'Safety boots',
    iconClassName: 'safety-boots',
    isCustom: false,
    isChecked: false,
    isFocused: false,
  },
  {
    id: 6,
    name: 'Respirator',
    iconClassName: 'respirator',
    isCustom: false,
    isChecked: false,
    isFocused: false,
  },
  {
    id: 7,
    name: 'Overalls',
    iconClassName: 'overalls',
    isCustom: false,
    isChecked: false,
    isFocused: false,
  },
  {
    id: 8,
    name: 'Vest',
    iconClassName: 'vest',
    isCustom: false,
    isChecked: false,
    isFocused: false,
  },
  {
    id: 9,
    name: 'Eye protection',
    iconClassName: 'eye-protection',
    isCustom: false,
    isChecked: false,
    isFocused: false,
  },
];
export const API_FAILURE_MSG =
  'Something went wrong. Please try after some time.';
export const MAX_CHARACTERS_FOR_TAG_NAME = 'Max 40 characters reached';
export const NUMBER_OF_TAG_CHARACTERS_LIMIT = 40;

export const ERROR_MESSAGE_FOR_SAFETYNAME_DUPLICATE =
  'Safety name cannot be duplicated';
export const MAX_SAFETY_ITEMS_MESSAGE = 'Maximum of 15 items';
export const NUMBER_OF_MAX_SAFETY_ITEMS = 15;
export const ERROR_MESSAGE_FOR_SAFETYNAME_EMPTY = 'Safety name cannot be empty';
export const MIN_SUBTASK_MESSAGE =
  'Every task should have atleast one sub-task';
