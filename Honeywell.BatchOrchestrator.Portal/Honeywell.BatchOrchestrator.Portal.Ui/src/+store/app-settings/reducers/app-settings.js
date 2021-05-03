import * as actionTypes from '../actions/types';

export const appSettingsInitialState = {
  settingList: [{ test: '123456' }],
};

export default (state = appSettingsInitialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_APP_SETTING_LIST:
      return {
        ...state,
        settingList: action.payload,
      };
    default:
      return state;
  }
};
