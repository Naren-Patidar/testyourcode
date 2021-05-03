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
import { BatchManagementContextProvider } from './create-batch-context';
import {
  getUnitsList,
  getFormulaByFormulaId,
  createBatch,
  getAllFormulaSet,
  getFormulaListByFormulaSetId,
  getBatchSize,
  getReferenceBatches,
} from '../../../../+store/formula/actions/create-batch/index';

export class BatchManagementController extends Component {
  render() {
    const {
      children,
      unitsList,
      allFormulaSet,
      formulaParams,
      getUnitsList,
      getFormulaByFormulaId,
      createBatch,
      getAllFormulaSet,
      formulaList,
      getFormulaListByFormulaSetId,
      refBatches,
      batchSizeSource,
      getBatchSize,
      getReferenceBatches,
    } = this.props;

    return (
      <BatchManagementContextProvider
        value={{
          unitsList,
          allFormulaSet,
          formulaParams,
          getUnitsList,
          getFormulaByFormulaId,
          createBatch,
          getAllFormulaSet,
          formulaList,
          getFormulaListByFormulaSetId,
          refBatches,
          batchSizeSource,
          getBatchSize,
          getReferenceBatches,
        }}
      >
        {children}
      </BatchManagementContextProvider>
    );
  }
}

BatchManagementController.propTypes = {
  children: PropTypes.element,
  getUnitsList: PropTypes.func,
  getFormulaByFormulaId: PropTypes.func,
  createBatch: PropTypes.func,
  unitsList: PropTypes.array,
  allFormulaSet: PropTypes.array,
  formulaParams: PropTypes.object,
  getAllFormulaSet: PropTypes.func,
  formulaList: PropTypes.array,
  getFormulaListByFormulaSetId: PropTypes.func,
  refBatches: PropTypes.object,
  batchSizeSource: PropTypes.object,
  getBatchSize: PropTypes.func,
  getReferenceBatches: PropTypes.func,
};

const mapStateToProps = ({ batchManagement }) => ({ ...batchManagement });

const mapDispatchToProps = {
  getUnitsList,
  getFormulaByFormulaId,
  createBatch,
  getAllFormulaSet,
  getFormulaListByFormulaSetId,
  getBatchSize,
  getReferenceBatches,
};

export const ConnectedBatchManagementController = connect(
  mapStateToProps,
  mapDispatchToProps
)(BatchManagementController);
