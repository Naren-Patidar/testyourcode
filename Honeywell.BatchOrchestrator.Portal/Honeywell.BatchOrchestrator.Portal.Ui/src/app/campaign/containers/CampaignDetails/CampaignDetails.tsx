/* eslint-disable no-nested-ternary */
import React, { useCallback, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Tooltip, Icon } from '@scuf/common';
import validator from 'validator';
import {
  campaignStates,
  CampaignStateValues,
  campaignStatuses,
  CampaignWorkflowParameter,
} from 'app/campaign/models/campaign';
import { CampaignType } from 'app/campaign/models/campaign-type';
import { AddBatch } from 'app/campaign/models/update-batch';
import { useConfirm } from 'shared/confirm-dialog';
import SignalRService, { HubMethods } from 'core/signalr/SignalRConnection';
import { useAuthorize } from 'core/authentication';
import { PermissionValues } from 'core/authentication/models/user-permission';
import { AppConstants } from 'utils/app-constants';
import { ReactComponent as Terminated } from 'assets/icons/Terminated.svg';
import { ReactComponent as Paused } from 'assets/icons/Paused.svg';
import { ReactComponent as Running } from 'assets/icons/Running.svg';
import { useCampaignFacade } from '+store/campaign/facade';
import { CampaignBasicDetail } from './CampaignBasicDetails/CampaignBasicDetail';
import {
  Action,
  CampaignDetailGrid,
} from './CampaignDetailsGrid/CampaignDetailGrid';
import { CampaignProgress } from './CampaignProgressBar/CampaignProgressBar';
import { useAppShellFacade } from '+store/app-shell';
import './CampaignDetails.scss';

export const CampaignDetail: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const params: any = useParams();
  const {
    batchUnitSelections,
    loading,
    fetchCampaignDetails,
    fetchBatchSelectionUnit,
    changeCampaignsState,
    changeUpdateBatch,
    addBatches,
    markEditableBatch,
    removeBatch,
    actionState,
    setActionState,
    fetchUpdatedBatchDetails,
    fetchCampaignBasicSetupInfo,
    campaignSummaryCampaignType: campaignType,
    campaignSummaryCampaignFault: campaignFault,
    campaignSummaryCampaignDetails: campaignDetails,
    campaignSummaryBatches: batches,
    campaignSummaryCompletedBatch: completedBatch,
    campaignSummaryProductionYield: productionYield,
  } = useCampaignFacade();
  const confirm = useConfirm();
  const history = useHistory();
  const { authorized: canMonitorAndManageCampaign } = useAuthorize([
    PermissionValues.MonitorProductionCampaign,
    PermissionValues.StartManageProductionCampaign,
  ]);
  const raiseAlert = async (message: string) => {
    const { confirmed } = await confirm.show({
      title: 'Alert',
      confirmText: 'Ok',
      message,
      type: 'alert',
    });
    if (confirmed) {
      history.push('/');
    }
  };
  useEffect(() => {
    return () => {
      SignalRService.removeHandlers([
        HubMethods.OnBatchStatusChanged,
        HubMethods.OnCampaignStatusChanged,
      ]);
    };
  }, []);
  useEffect(() => {
    if (canMonitorAndManageCampaign !== null && !canMonitorAndManageCampaign) {
      raiseAlert(AppConstants.UNAUTHORIZED_MESSAGE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canMonitorAndManageCampaign]);
  const onCampaignStatusChanged = useCallback(() => {
    SignalRService.onCampaignStatusChanged((res) => {
      fetchCampaignBasicSetupInfo(params.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const OnBatchStatusChanged = useCallback(() => {
    SignalRService.OnBatchStatusChanged((res) => {
      fetchUpdatedBatchDetails(params.id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (params.id && validator.isUUID(params.id)) {
      fetchCampaignDetails(params.id);
    } else {
      raiseAlert('Not a valid campaign');
    }
    onCampaignStatusChanged();
    OnBatchStatusChanged();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (actionState === 'finished') {
      if (params.id && validator.isUUID(params.id)) {
        fetchCampaignDetails(params.id);
      }
      setActionState(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionState]);
  const getSelectionUnit = (id: string) => {
    fetchBatchSelectionUnit(id);
  };
  const getStatusUpdate = (data: number) => {
    const argValue: CampaignWorkflowParameter = {
      id: params.id,
      state: data,
      comment: '',
    };
    changeCampaignsState(argValue);
  };
  const addBatch = () => {
    const batchData: AddBatch = {
      campaignId: params.id,
      defaultBatchSize: campaignType?.defaultBatchSize,
      currentBatchSize: campaignType?.currentBatchSize,
    };
    addBatches(batchData);
  };
  const nameTooltip =
    campaignType && !campaignType.isRecipeBased
      ? campaignType.formulaName?.length > 10
        ? `${campaignType.formulaName.substring(0, 10)} ${'...'}`
        : campaignType.formulaName
      : campaignType && campaignType.recipeName?.length > 10
      ? `${campaignType.recipeName.substring(0, 10)} ${'...'}`
      : campaignType?.recipeName;

  const onAction: Action = async (type, data) => {
    switch (type) {
      case 'delete':
        {
          const { confirmed: shouldDelete } = await confirm.show({
            message: 'Do you want to delete this batch?',
            confirmText: 'Delete',
          });
          if (shouldDelete) {
            removeBatch(data.id);
          }
        }
        break;

      default:
        break;
    }
  };
  const refreshHandler = () => {
    fetchUpdatedBatchDetails(params.id);
  };
  return canMonitorAndManageCampaign ? (
    <div className="campaign-details">
      <div className="campaign-header">
        <div className=" name-header">
          {campaignType && !campaignType.isRecipeBased
            ? 'Formula name'
            : 'Recipe name'}
        </div>
        <div className="id-header">Campaign id</div>

        {campaignType && (
          <div className="campaign-state">
            {CampaignStateValues.Paused === campaignType.state && (
              <div className="d-flex align-items-center">
                <Paused />
                <span className="paused-campaign">
                  {
                    campaignStates.find(
                      (f) => f.value === CampaignStateValues.Paused
                    )?.text
                  }
                </span>
                {campaignFault && campaignFault.code !== 0 && (
                  <Tooltip
                    content={campaignFault.message}
                    element={
                      <Icon
                        className="ml-2 text-danger"
                        name="badge-warning"
                        root="common"
                        exactSize="0.875rem"
                      />
                    }
                    position="bottom center"
                    event="hover"
                    hoverable
                  />
                )}
              </div>
            )}
            {CampaignStateValues.Running === campaignType.state && (
              <div className="d-flex align-items-center">
                <Running />

                <span className="running-campaign">
                  {
                    campaignStates.find(
                      (f) => f.value === CampaignStateValues.Running
                    )?.text
                  }
                </span>
              </div>
            )}
            {CampaignStateValues.Terminating === campaignType.state && (
              <div className="d-flex align-items-center">
                <Terminated />
                <span className="terminated-campaign">
                  {
                    campaignStates.find(
                      (f) => f.value === CampaignStateValues.Terminating
                    )?.text
                  }
                </span>
              </div>
            )}
          </div>
        )}
      </div>
      <div className="d-flex">
        <div className="campaign-details-header">
          {campaignType &&
            (!campaignType.isRecipeBased ? (
              <>
                <Tooltip
                  content={campaignType.formulaName || ''}
                  element={
                    <div className="campaign-name text-truncate">
                      {nameTooltip}
                    </div>
                  }
                  position="bottom center"
                  event="hover"
                  hoverable
                />
                <Tooltip
                  content={campaignType.campaignRefId || ''}
                  element={
                    <div className="campaign-refId text-truncate">
                      {campaignType.campaignRefId}
                    </div>
                  }
                  position="bottom center"
                  event="hover"
                  hoverable
                />
              </>
            ) : (
              <>
                <Tooltip
                  content={campaignType.recipeName || ''}
                  element={
                    <div className="campaign-name text-truncate">
                      {nameTooltip}
                    </div>
                  }
                  position="bottom center"
                  event="hover"
                  hoverable
                />
                <Tooltip
                  content={campaignType.campaignRefId || ''}
                  element={
                    <div className="campaign-refId text-truncate">
                      {campaignType.campaignRefId}
                    </div>
                  }
                  position="bottom center"
                  event="hover"
                  hoverable
                />
              </>
            ))}
        </div>
      </div>

      <CampaignProgress
        batches={batches}
        completedBatch={completedBatch}
        getStatusUpdate={getStatusUpdate}
      />
      <CampaignBasicDetail
        campaignDetails={campaignDetails}
        campaignType={campaignType}
        productionYield={productionYield}
      />
      <CampaignDetailGrid
        data={batches}
        getSelectionUnit={getSelectionUnit}
        batchUnitSelections={batchUnitSelections}
        updateBatchState={changeUpdateBatch}
        addBatch={addBatch}
        markEditableBatch={markEditableBatch}
        action={onAction}
        actionState={actionState}
        onRefresh={refreshHandler}
      />
    </div>
  ) : null;
};
