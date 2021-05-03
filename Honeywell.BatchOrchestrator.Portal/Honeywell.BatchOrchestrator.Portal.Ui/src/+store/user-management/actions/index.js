import { SET_EDIT_ROW } from './types';

export const enableRowEdit = (selectedRowIndex, renderEditRowForm) => ({
  type: SET_EDIT_ROW,
  selectedRowIndex,
  renderEditRowForm,
});

export const getUsers = () => {
  return {
    type: 'GetUser',
    payload: ['Raju', 'tej'],
  };
};
