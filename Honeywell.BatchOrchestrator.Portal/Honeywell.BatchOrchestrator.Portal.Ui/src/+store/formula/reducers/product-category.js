import * as actionTypes from '../actions/formulaSets/types';

export const productCategoryInitialState = {
  formulaSetList: [],
  backDropFlag: false,
  experionChangesMRList: '',
  signalRConnectionCreatedFlag: false,
};

export default (state = productCategoryInitialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_FORMULASETS:
      return {
        ...state,
        formulaSetList: action.payload,
        backDropFlag: false,
      };
    case actionTypes.UPDATE_EXPERION_CHANGES_MR_ITEMS:
      return { ...state, experionChangesMRList: action.payload };
    case actionTypes.UPDATE_SIGNALR_CONNECTION_STATUS:
      return { ...state, signalRConnectionCreatedFlag: action.payload };
    case actionTypes.DELELE_FORMULASET:
      return {
        ...state,
        formulaSetList: [],
      };
    default:
      return state;
  }
};
