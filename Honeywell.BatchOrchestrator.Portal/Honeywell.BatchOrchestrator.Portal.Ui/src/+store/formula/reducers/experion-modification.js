/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
import * as actionTypes from '../actions/experion-modification/types';
// import { parameterList } from '../__mocks__/experion-changes';

export const experionModificationInitialState = {
  parameterList: [],
  formulaList: [],
  parameterObject: {},
};

export default (state = experionModificationInitialState, action = {}) => {
  switch (action.type) {
    case actionTypes.SET_MODIFIED_PARAMETER_LIST:
      return {
        ...state,
        parameterList: action.payload.formulaParameter,
        parameterObject: action.payload,
      };
    case actionTypes.SET_EXPERION_MODIFICATION_FORMULA_LIST:
      return {
        ...state,
        formulaList: action.payload,
      };
    default:
      return state;
  }
};
