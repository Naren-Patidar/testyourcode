import * as actionTypes from '../actions/formula-list/types';

export const formulaManagementInitialState = {
  formulaList: [],
};

export default (state = formulaManagementInitialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_FORMULA_LIST_BY_FORMULASETID:
      return {
        ...state,
        formulaList: action.payload,
      };
    default:
      return state;
  }
};
