import {
  userListArray,
  roleList,
  countryCodeList,
  userObj,
} from '__mocks__/users';
import * as actionTypes from '../actions/types';

export const userManagementDefaultState = {
  usersList: userListArray,
  roleList,
  countryCodeList,
  selectedRowIndex: -1,
  userObj,
};

const setEditRow = (usersList, index, renderEditRowForm) => {
  const newUserList = usersList;
  newUserList[index].edit = renderEditRowForm;
  return newUserList;
};

export default (state = userManagementDefaultState, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_EDIT_ROW:
      return {
        ...state,
        usersList: setEditRow(
          state.usersList,
          action.selectedRowIndex,
          action.renderEditRowForm
        ),
        selectedRowIndex: action.selectedRowIndex,
      };
    case 'GetUser':
      return {
        ...state,
        usersList: action.payload,
      };
    default:
      return state;
  }
};
