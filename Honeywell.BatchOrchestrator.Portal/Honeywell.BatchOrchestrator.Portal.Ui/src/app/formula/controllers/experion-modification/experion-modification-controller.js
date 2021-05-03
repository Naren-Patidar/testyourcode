/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
/* eslint-disable import/no-cycle */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ExperionModificationContextProvider } from './experion-modification-context';
import { experionModificationInitialState } from '../../../../+store/formula/reducers/experion-modification';
import {
  deleteFormulaSet,
  SaveSelectionForApplyChanges,
  getModifiedListOfParameters,
  getExperionModificationFormulaListByFormulaSetId,
  applyExperionModificationChanges,
} from '../../../../+store/formula/actions/experion-modification/index';

export class ExperionModificationController extends Component {
  render() {
    const {
      children,
      parameterList,
      parameterObject,
      formulaList,
      getModifiedListOfParameters,
      getExperionModificationFormulaListByFormulaSetId,
      applyExperionModificationChanges,
      SaveSelectionForApplyChanges,
      deleteFormulaSet,
    } = this.props;

    return (
      <ExperionModificationContextProvider
        value={{
          getModifiedListOfParameters,
          parameterList,
          parameterObject,
          formulaList,
          getExperionModificationFormulaListByFormulaSetId,
          applyExperionModificationChanges,
          SaveSelectionForApplyChanges,
          deleteFormulaSet,
        }}
      >
        {children}
      </ExperionModificationContextProvider>
    );
  }
}

ExperionModificationController.propTypes = {
  children: PropTypes.element,
  getModifiedListOfParameters: PropTypes.func,
  parameterList: PropTypes.array,
  parameterObject: PropTypes.object,
  getExperionModificationFormulaListByFormulaSetId: PropTypes.func,
  formulaList: PropTypes.array,
  applyExperionModificationChanges: PropTypes.func,
  SaveSelectionForApplyChanges: PropTypes.func,
  deleteFormulaSet: PropTypes.func,
};

const mapStateToProps = ({ experionModification }) => ({
  ...experionModification,
});

const mapDispatchToProps = {
  getModifiedListOfParameters,
  getExperionModificationFormulaListByFormulaSetId,
  applyExperionModificationChanges,
  SaveSelectionForApplyChanges,
  deleteFormulaSet,
};

export const ConnectedExperionModificationController = connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperionModificationController);
