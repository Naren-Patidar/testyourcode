/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
import * as actionTypes from '../actions/create-batch/types';

export const createBatchInitialState = {
  formulaParams: {},
  unitsList: [],
  allFormulaSet: [],
  formulaList: [],
  refBatches: {},
  batchSizeSource: {},
};

export default (state = createBatchInitialState, action = {}) => {
  switch (action.type) {
    case actionTypes.GET_FORMULA_PARAMS:
      return {
        ...state,
        formulaParams: action.payload,
      };
    case actionTypes.GET_UNITS_LIST:
      return {
        ...state,
        unitsList: action.payload,
      };
    case actionTypes.GET_ALL_FORMULASET:
      return {
        ...state,
        allFormulaSet: action.payload,
      };
    case actionTypes.GET_FORMULA_LIST_BY_FORMULASETID:
      return {
        ...state,
        formulaList: action.payload,
      };
    case actionTypes.GET_REFRENCE_BATHCES:
      return {
        ...state,
        refBatches: action.payload,
      };
    case actionTypes.GET_BATCH_SIZE:
      return {
        ...state,
        batchSizeSource: action.payload,
      };
    default:
      return state;
  }
};
