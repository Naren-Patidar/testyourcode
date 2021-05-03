/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable import/no-cycle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ProductCategoryContextProvider } from './product-category-context';
import {
  refreshForExperionModification,
  getFormulaSets,
  deleteFormulaSetById,
  uploadImageForFormulaSetById,
  deleteFormulaSetImageById,
  updateExperionChangesMRList,
  updateSignalRConnectionStatus,
  getAppSettingsStatus,
} from '+store/formula/actions/formulaSets';

export class ProductCategoryController extends Component {
  render() {
    const {
      children,
      getFormulaSets,
      formulaSetList,
      deleteFormulaSetById,
      uploadImageForFormulaSetById,
      deleteFormulaSetImageById,
      refreshForExperionModification,
      updateExperionChangesMRList,
      experionChangesMRList,
      signalRConnectionCreatedFlag,
      updateSignalRConnectionStatus,
      getAppSettingsStatus,
    } = this.props;

    return (
      <ProductCategoryContextProvider
        value={{
          getFormulaSets,
          formulaSetList,
          deleteFormulaSetById,
          uploadImageForFormulaSetById,
          deleteFormulaSetImageById,
          refreshForExperionModification,
          updateExperionChangesMRList,
          experionChangesMRList,
          signalRConnectionCreatedFlag,
          updateSignalRConnectionStatus,
          getAppSettingsStatus,
        }}
      >
        {children}
      </ProductCategoryContextProvider>
    );
  }
}

ProductCategoryController.propTypes = {
  children: PropTypes.element,
  getFormulaSets: PropTypes.func,
  formulaSetList: PropTypes.array,
  deleteFormulaSetById: PropTypes.func,
  uploadImageForFormulaSetById: PropTypes.func,
  deleteFormulaSetImageById: PropTypes.func,
  refreshForExperionModification: PropTypes.func,
  updateExperionChangesMRList: PropTypes.func,
  experionChangesMRList: PropTypes.string,
  signalRConnectionCreatedFlag: PropTypes.bool,
  updateSignalRConnectionStatus: PropTypes.func,
  getAppSettingsStatus: PropTypes.func,
};

const mapStateToProps = ({ productCategory }) => ({ ...productCategory });

const mapDispatchToProps = {
  getFormulaSets,
  deleteFormulaSetById,
  uploadImageForFormulaSetById,
  deleteFormulaSetImageById,
  refreshForExperionModification,
  updateExperionChangesMRList,
  updateSignalRConnectionStatus,
  getAppSettingsStatus,
};

export const ConnectedProductCategoryController = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductCategoryController);
