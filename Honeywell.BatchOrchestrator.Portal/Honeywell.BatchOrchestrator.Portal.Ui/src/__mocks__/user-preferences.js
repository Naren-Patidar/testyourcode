export const mockCurrentUsersPermissionsResponse = {
  permissions: [
    { description: 'Change language', id: 1, key: 'CHANGE_LANGUAGE' },
    { description: 'Switch color schema', id: 2, key: 'CHANGE_COLOR_THEME' },
    { description: 'Show overview N/S', id: 3, key: 'SEE_OVERVIEW' },
    { description: 'Show stand view', id: 4, key: 'SEE_STAND_VIEW' },
    { description: 'E-Stop activate', id: 5, key: 'SET_ESTOP' },
    { description: 'E-Stop release', id: 6, key: 'RELEASE_ESTOP' },
    {
      description: 'Set process state to parked (tower control)',
      id: 7,
      key: 'SET_PARKED_IN_ATC_MODE',
    },
    {
      description: 'Set process state to free  (tower control)',
      id: 8,
      key: 'SET_FREE_IN_ATC_MODE',
    },
    {
      description: 'Activate Stand DGS (APRON)',
      id: 11,
      key: 'ACTIVATE_DOCKING_IN_ATC_MODE',
    },
    {
      description: 'Deactivate Stand DGS (APRON)',
      id: 12,
      key: 'DEACTIVATE_DOCKING_IN_ATC_MODE',
    },
    {
      description: 'Add new flight to stand (ATC)',
      id: 15,
      key: 'ADD_NEW_FLIGHT_TO_ATC_STAND',
    },
    {
      description: 'Edit flight (ATC)',
      id: 17,
      key: 'EDIT_FLIGHT_OF_ATC_STAND',
    },
    {
      description: 'Edit flight (Maintenance)',
      id: 18,
      key: 'EDIT_FLIGHT_IN_MAINTENANCE',
    },
    { description: 'Show free text', id: 19, key: 'SEE_FREE_TEXT_VIEW' },
    {
      description: 'Edit free text scenario',
      id: 20,
      key: 'EDIT_FREE_TEXT_SCENARIO',
    },
    {
      description: 'Publish free text scenario (APRON)',
      id: 21,
      key: 'PUBLISH_FREE_TEXT_SCENARIO_IN_ATC_MODE',
    },
    { description: 'Show message list', id: 23, key: 'SEE_MESSAGE_LOG' },
    { description: 'Show message details', id: 24, key: 'SEE_MESSAGE_DETAILS' },
    {
      description: 'Show flightlist icon',
      id: 25,
      key: 'SEE_FLIGHT_PLAN_LIST',
    },
    { description: 'Disable screen', id: 80, key: 'DISABLE_SCREEN' },
  ],
};
