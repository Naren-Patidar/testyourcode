/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-cycle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormulaManagementContextProvider } from './formula-list-context';
import {
  getFormulaListByFormulaSetId,
  deleteFormulaByFormulaId,
} from '+store/formula/actions/formula-list';

export class FormulaManagementController extends Component {
  render() {
    const {
      children,
      formulaList,
      getFormulaListByFormulaSetId,
      deleteFormulaByFormulaId,
    } = this.props;

    return (
      <FormulaManagementContextProvider
        value={{
          deleteFormulaByFormulaId,
          getFormulaListByFormulaSetId,
          formulaList,
        }}
      >
        {children}
      </FormulaManagementContextProvider>
    );
  }
}

FormulaManagementController.propTypes = {
  children: PropTypes.element,
  getFormulaListByFormulaSetId: PropTypes.func,
  deleteFormulaByFormulaId: PropTypes.func,
  formulaList: PropTypes.array,
};

const mapStateToProps = ({ formulaManagement }) => ({ ...formulaManagement });

const mapDispatchToProps = {
  getFormulaListByFormulaSetId,
  deleteFormulaByFormulaId,
};

export const ConnectedFormulaManagementController = connect(
  mapStateToProps,
  mapDispatchToProps
)(FormulaManagementController);
