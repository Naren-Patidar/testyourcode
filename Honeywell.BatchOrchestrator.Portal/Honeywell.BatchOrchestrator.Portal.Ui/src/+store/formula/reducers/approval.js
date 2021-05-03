import * as actionTypes from '../actions/approvals/types';

export const approvalInitialState = {
  pendingList: [],
  formulaSetInfo: {},
  formulaInfo: {},
  formulaSetComments: {},
  formulaComments: {},
  PendingCampaignList: [],
};

export default (state = approvalInitialState, action = {}) => {
  switch (action.type) {
    case actionTypes.UPDATE_PENDING_APPROVAL_ITEMS:
      return { ...state, pendingList: action.payload };
    case actionTypes.UPDATE_FORMULA_SET:
      return { ...state, formulaSetInfo: action.payload };
    case actionTypes.UPDATE_FORMULA:
      return { ...state, formulaInfo: action.payload };
    case actionTypes.UPDATE_FORMULA_SET_COMMENTS:
      return { ...state, formulaSetComments: action.payload };
    case actionTypes.UPDATE_FORMULA_COMMENTS:
      return { ...state, formulaComments: action.payload };
    case actionTypes.UPDATE_PENDING_CAMPAIGN_LIST:
      return { ...state, PendingCampaignList: action.payload };
    default:
      return state;
  }
};
