import {
  SET_IS_FIRST_TIME_LOGIN,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  CLEAR_SERVER_FORM_ERROR,
  RESET_AUTHENTICATION_FAILURE,
} from '../actions/types';

export const loginReducerDefaultState = {
  token: null,
  userId: null,
  isFirstTimeLogin: false,
  isAuthenticated: false,
  isFetching: false,
  serverFormErrors: '',
  formulaSetsObj: {},
};

export default (state = loginReducerDefaultState, action = {}) => {
  switch (action.type) {
    case SET_IS_FIRST_TIME_LOGIN:
      return { ...state, isFirstTimeLogin: action.isFirstTimeLogin };
    case CLEAR_SERVER_FORM_ERROR:
      return { ...state, serverFormErrors: '' };
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isFetching: false,
        isAuthenticated: true,
        serverFormErrors: '',
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        serverFormErrors: action.payload,
      };
    case RESET_AUTHENTICATION_FAILURE:
      return loginReducerDefaultState;
    case 'GetFormulaSet':
      return {
        ...state,
        isFetching: false,
        formulaSetsObj: action.payload,
      };
    default:
      return state;
  }
};
