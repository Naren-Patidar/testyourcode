/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/require-default-props */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { ApprovalContextProvider } from './approval-context';
import {
  getPendingItems,
  getFormulaSet,
  approveFormulaSetStatus,
  rejectFormulaSetStatus,
  getFormula,
  approveFormulaStatus,
  rejectFormulaStatus,
  getFormulaSetComments,
  getFormulaComments,
  getPendingCampaigns,
  UpdateCampaignStatus,
} from '+store/formula/actions/approvals';

export class ApprovalController extends Component {
  render() {
    const {
      children,
      getPendingItems,
      pendingList,
      getFormulaSet,
      formulaSetInfo,
      approveFormulaSetStatus,
      rejectFormulaSetStatus,
      getFormula,
      formulaInfo,
      approveFormulaStatus,
      rejectFormulaStatus,
      getFormulaSetComments,
      getFormulaComments,
      formulaSetComments,
      formulaComments,
      PendingCampaignList,
      getPendingCampaigns,
      UpdateCampaignStatus,
    } = this.props;

    return (
      <ApprovalContextProvider
        value={{
          getPendingItems,
          pendingList,
          getFormulaSet,
          formulaSetInfo,
          approveFormulaSetStatus,
          rejectFormulaSetStatus,
          getFormula,
          formulaInfo,
          approveFormulaStatus,
          rejectFormulaStatus,
          getFormulaSetComments,
          getFormulaComments,
          formulaSetComments,
          formulaComments,
          PendingCampaignList,
          getPendingCampaigns,
          UpdateCampaignStatus,
        }}
      >
        {children}
      </ApprovalContextProvider>
    );
  }
}

ApprovalController.propTypes = {
  children: PropTypes.element,
  getPendingItems: PropTypes.func,
  pendingList: PropTypes.array,
  getFormulaSet: PropTypes.func,
  formulaSetInfo: PropTypes.object,
  updateFormulaSetStatus: PropTypes.func,
  approveFormulaSetStatus: PropTypes.func,
  rejectFormulaSetStatus: PropTypes.func,
  formulaInfo: PropTypes.object,
  getFormula: PropTypes.func,
  approveFormulaStatus: PropTypes.func,
  rejectFormulaStatus: PropTypes.func,
  getFormulaSetComments: PropTypes.func,
  getFormulaComments: PropTypes.func,
  formulaSetComments: PropTypes.object,
  formulaComments: PropTypes.object,
  PendingCampaignList: PropTypes.array,
  getPendingCampaigns: PropTypes.func,
  UpdateCampaignStatus: PropTypes.func,
};

const mapStateToProps = ({ approval }) => ({ ...approval });

const mapDispatchToProps = {
  getPendingItems,
  getFormulaSet,
  approveFormulaSetStatus,
  rejectFormulaSetStatus,
  getFormula,
  approveFormulaStatus,
  rejectFormulaStatus,
  getFormulaSetComments,
  getFormulaComments,
  getPendingCampaigns,
  UpdateCampaignStatus,
};

export const ConnectedApprovalController = connect(
  mapStateToProps,
  mapDispatchToProps
)(ApprovalController);
