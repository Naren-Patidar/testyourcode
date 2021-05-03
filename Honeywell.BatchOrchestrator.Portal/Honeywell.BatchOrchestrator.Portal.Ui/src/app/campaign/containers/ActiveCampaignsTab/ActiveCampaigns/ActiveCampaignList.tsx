/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Datatable } from 'shared/datatable';
import { HeaderWithToolTip } from 'shared/tooltip';
import { useCallback, useEffect, useState } from 'react';
import { Button, Tooltip, Popup, VerticalMenu, Icon } from '@scuf/common';
import {
  Campaign,
  campaignStates,
  CampaignStateValues,
  CampaignWorkflowParameter,
  CampaignStatusValues,
  campaignStatuses,
} from 'app/campaign/models/campaign';
import { CampaignType, campaignTypes } from 'app/campaign/models/campaign-type';
import {
  UnitSelectionType,
  unitSelectionTypeVals,
} from 'app/campaign/models/campaign-unit-selection';
import { ColumnProps } from 'utils/datatable-column-props';
import { useConfirm } from 'shared/confirm-dialog';
import Running from 'assets/icons/Running.svg';
import Paused from 'assets/icons/Paused.svg';
import Terminated from 'assets/icons/Terminated.svg';
import { MoreActions } from 'shared/more-actions';
import '../active-campaign.scss';
// import { getFormattedDateTime } from 'app/campaign/utils';
import { toLocalTimeStringFormatted } from 'app/../utils/date-utils';
import { useAuthorize } from 'core/authentication';
import { PermissionValues } from 'core/authentication/models/user-permission';
import { MoreAction } from 'shared/more-actions/more-action';
import { AppConstants } from 'utils/app-constants';
import clsx from 'clsx';

export type actionType =
  | 'pause'
  | 're-execute'
  | 'rowClick'
  | 'changeState'
  | 'edit';
export type Action = (type: actionType, data: any) => void;

export const ActiveCampaignList: React.FC<{
  data: Campaign[];
  loading: boolean;
  action: Action;
  refreshHandler: () => void;
}> = ({ data, loading, action, refreshHandler }) => {
  const confirm = useConfirm();
  const { authorized: canManageCampaign } = useAuthorize([
    PermissionValues.StartManageProductionCampaign,
  ]);
  const { authorized: canEditCampaign } = useAuthorize([
    PermissionValues.EditProductionCampaign,
  ]);
  const pauseCampaignClick = async (activeCampaignRow) => {
    const { confirmed } = await confirm.show({
      message: `Do you want to pause campaign: ${activeCampaignRow.rowData?.campaignRefId} ?`,
      confirmText: 'Pause',
    });
    if (confirmed) {
      const bodyData: CampaignWorkflowParameter = {
        id: activeCampaignRow.rowData.id,
        state: CampaignStateValues.Paused,
        comment: '',
      };
      action('changeState', bodyData);
    }
  };
  const endCampaignClick = async (activeCampaignRow) => {
    const { confirmed } = await confirm.show({
      message: `Do you want to end campaign: ${activeCampaignRow.rowData?.campaignRefId} ?`,
      confirmText: 'End',
    });
    if (confirmed) {
      const bodyData: CampaignWorkflowParameter = {
        id: activeCampaignRow.rowData.id,
        state: CampaignStateValues.Terminating,
        comment: '',
      };
      action('changeState', bodyData);
    }
  };
  const resumeCampaignClick = async (activeCampaignRow) => {
    const { confirmed } = await confirm.show({
      message: `Do you want to resume campaign: ${activeCampaignRow.rowData?.campaignRefId} ?`,
      confirmText: 'Resume',
    });
    if (confirmed) {
      const bodyData: CampaignWorkflowParameter = {
        id: activeCampaignRow.rowData.id,
        state: CampaignStateValues.Running,
        comment: '',
      };
      action('changeState', bodyData);
    }
  };
  const editCampaignClick = async (activeCampaignRow) => {
    const { confirmed } = await confirm.show({
      message: `Do you want to edit campaign: ${activeCampaignRow.rowData?.campaignRefId} ?`,
      confirmText: 'Edit',
    });
    if (confirmed) {
      action('edit', activeCampaignRow.rowData);
    }
  };
  // const moreActionsObject = [
  //   { name: 'rowClick1qeqweqweq', isVisible: true, onClick: testEvent },
  //   { name: 'rowClick2', isVisible: true, onClick: testEvent },
  // ];
  const createMoreActionObject = (cellData) => {
    const actionsObj: MoreAction[] = [];
    let obj = {} as MoreAction;
    const { state, status } = cellData.rowData;
    if (state === CampaignStateValues.Running) {
      obj.name = 'Pause campaign';
      obj.disabled = !canManageCampaign;
      obj.disabledTooltip = AppConstants.UNAUTHORIZED_MESSAGE;
      obj.onClick = pauseCampaignClick;
      actionsObj.push(obj);
    }
    if (
      state === CampaignStateValues.Paused &&
      status === CampaignStatusValues.Approved
    ) {
      obj = {} as MoreAction;
      obj.name = 'Resume campaign';
      obj.disabled = !canManageCampaign;
      obj.disabledTooltip = AppConstants.UNAUTHORIZED_MESSAGE;
      obj.onClick = resumeCampaignClick;
      actionsObj.push(obj);
    }
    // if (state !== CampaignStateValues.Terminating) {
    obj = {} as MoreAction;
    obj.name = 'End campaign';
    obj.disabled = !canManageCampaign;
    // obj.disabledTooltip = AppConstants.UNAUTHORIZED_MESSAGE;
    obj.onClick = endCampaignClick;
    actionsObj.push(obj);
    // }
    obj = {} as MoreAction;
    obj.name = 'Edit campaign';
    obj.disabled = !canEditCampaign;
    obj.disabledTooltip = canManageCampaign
      ? AppConstants.UNAUTHORIZED_MESSAGE
      : undefined;
    obj.onClick = editCampaignClick;
    actionsObj.push(obj);
    return actionsObj;
  };

  const moreActions = (cellData) => {
    const { state, status } = cellData.rowData;
    let actions: MoreAction[] = [];
    if (state !== CampaignStateValues.Terminating) {
      actions = createMoreActionObject(cellData);
    }

    return (
      <div>
        <Icon
          name="visible"
          root="common"
          size="small"
          className="cursor-pointer mr-2"
          onClick={(e) => {
            e.stopPropagation();
            action('rowClick', cellData.rowData);
          }}
        />
        {state !== CampaignStateValues.Terminating ? (
          <MoreActions
            moreActionsObject={actions}
            funcArgumentData={cellData}
            on="click"
          />
        ) : (
          <Icon
            name="ellipsis-horizontal"
            id="test"
            root="common"
            size="small"
            style={{ visibility: 'hidden' }}
          />
        )}
      </div>
    );
  };
  const batchStateRenderer = (cellData) => {
    return (
      <>
        {cellData.rowData.campaignType === CampaignType.ContinuousCampaign && (
          <div>{`${cellData.rowData.completedBatches}`}</div>
        )}
        {cellData.rowData.campaignType !== CampaignType.ContinuousCampaign && (
          <Tooltip
            content={`${cellData.rowData.completedBatches}  /  ${cellData.rowData.noOfBatches}`}
            element={
              <div className="text-truncate">{`${cellData.rowData.completedBatches}  /  ${cellData.rowData.noOfBatches}`}</div>
            }
            position="bottom center"
            event="hover"
            hoverable
          />
        )}
      </>
    );
  };
  const productionYieldRenderer = (cellData) => {
    return <span>{`${cellData.value ?? ''}`}</span>;
  };
  const rawMaterialRenderer = (cellData) => {
    if (cellData.rowData.campaignType === CampaignType.RawMaterialConsumption) {
      return (
        <span>{`${cellData.value}  ${
          cellData.rowData.rawMaterialEngUnit ?? ''
        }`}</span>
      );
    }
    return (
      <Tooltip
        content="Not Applicable"
        element={<span className="text-truncate">Not Applicable</span>}
        position="bottom center"
        event="hover"
        hoverable
      />
    );
  };
  function textWithToopTipRenderer(cellData) {
    return (
      <Tooltip
        content={cellData.value}
        element={<span className="text-truncate">{cellData.value}</span>}
        position="bottom center"
        event="hover"
        hoverable
      />
    );
  }
  function stateRenderer(cellData) {
    return (
      <>
        {CampaignStateValues.Paused === cellData.value && (
          <div className="d-flex align-items-center">
            <img src={Paused} />
            <span className="paused-campaign">
              {
                campaignStates.find(
                  (f) => f.value === CampaignStateValues.Paused
                )?.text
              }
            </span>
            {cellData.rowData.fault && cellData.rowData.fault.code !== 0 && (
              <Tooltip
                content={cellData.rowData.fault.message}
                element={
                  <Icon
                    className="ml-2 fault"
                    name="badge-warning"
                    root="common"
                    size="small"
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
        {CampaignStateValues.Running === cellData.value && (
          <div className="d-flex align-items-center">
            <img src={Running} />
            <span className="running-campaign">
              {
                campaignStates.find(
                  (f) => f.value === CampaignStateValues.Running
                )?.text
              }
            </span>
          </div>
        )}
        {CampaignStateValues.Terminating === cellData.value && (
          <div className="d-flex align-items-center">
            <img src={Terminated} />
            <span className="terminated-campaign">
              {
                campaignStates.find(
                  (f) => f.value === CampaignStateValues.Terminating
                )?.text
              }
            </span>
          </div>
        )}
      </>
    );
  }
  function statusRenderer(cellData) {
    return (
      <Tooltip
        content={
          campaignStatuses.find((f) => f.value === cellData.value)?.text || ''
        }
        element={
          <span
            className={clsx({
              icon: true,
              'icon-In-review orange':
                cellData.value === CampaignStatusValues.SubmitForApproval,
              'icon-Draft yellow':
                cellData.value === CampaignStatusValues.Created,
              'icon-Approved green':
                cellData.value === CampaignStatusValues.Approved,
            })}
          />
        }
        position="bottom center"
        event="hover"
        hoverable
      />
    );
  }
  function campaignTypeRenderer(cellData) {
    return (
      <span>{campaignTypes.find((f) => f.value === cellData.value)?.text}</span>
    );
  }
  function unitSelectionRenderer(cellData) {
    return (
      <span>
        {unitSelectionTypeVals.find((f) => f.value === cellData.value)?.text}
      </span>
    );
  }
  function startMethodRenderer(cellData) {
    return <span>{cellData.value ? 'Auto' : 'Manual'}</span>;
  }
  function startTimeRenderer(cellData) {
    return cellData.value ? (
      <Tooltip
        content={toLocalTimeStringFormatted(cellData.value)}
        element={
          <span className="text-truncate">
            {toLocalTimeStringFormatted(cellData.value)}
          </span>
        }
        position="bottom center"
        event="hover"
        hoverable
      />
    ) : null;
  }
  function actionRenderer(cellData, rowAction: Action) {
    return (
      <div className="d-flex justify-content-between">
        {CampaignStateValues.Paused === cellData.value && (
          <Button
            type="secondary"
            actionType="button"
            content="Re-execute"
            size="small"
            onClick={() => rowAction('re-execute', cellData.rowData)}
            textTransform={false}
          />
        )}
      </div>
    );
  }
  const formulaRenderer = (cellData) => {
    let textToDisplay;
    if (cellData.rowData.isRecipeBased) {
      textToDisplay = 'Not Applicable';
    } else {
      textToDisplay = cellData.value;
    }

    return (
      <Tooltip
        content={textToDisplay}
        element={<span className="text-truncate">{textToDisplay}</span>}
        position="bottom center"
        event="hover"
        hoverable
      />
    );
  };
  const getColumnDefs = (rowAction: Action) => {
    return [
      {
        field: 'campaignRefId',
        header: (
          <HeaderWithToolTip
            contentOfToolTip="Campaign ID"
            element={<span>campaign id</span>}
          />
        ),
        align: 'left',
        renderer: textWithToopTipRenderer,
        initialWidth: 125,
        sortable: true,
      },
      // {
      //   field: 'campaignType',
      //   header: 'CAMPAIGN CRITERIA',
      //   align: 'left',
      //   renderer: campaignTypeRenderer,
      //   initialWidth: 80,
      // },
      {
        field: 'formulaName',
        header: (
          <HeaderWithToolTip
            contentOfToolTip="Formula"
            element={<span>Formula</span>}
          />
        ),
        align: 'left',
        initialWidth: 105,
        sortable: true,
        renderer: formulaRenderer,
      },
      {
        field: 'startTime',
        header: (
          <HeaderWithToolTip
            contentOfToolTip="Start Time"
            element={<span>Start Time</span>}
          />
        ),
        align: 'left',
        renderer: startTimeRenderer,
        initialWidth: 185,
        sortable: true,
      },
      // {
      //   field: 'endTime',
      //   header: (
      //     <HeaderWithToolTip
      //       contentOfToolTip="End Time"
      //       element={<span>End Time</span>}
      //     />
      //   ),
      //   align: 'left',
      //   renderer: startTimeRenderer,
      //   initialWidth: 90,
      //   sortable: true,
      // },
      {
        field: 'state',
        header: (
          <HeaderWithToolTip
            contentOfToolTip="State"
            element={<span>State</span>}
          />
        ),
        align: 'left',
        renderer: stateRenderer,
        initialWidth: 120,
        sortable: true,
      },
      {
        field: 'status',
        header: (
          <HeaderWithToolTip
            contentOfToolTip="Status"
            element={<span>Status</span>}
          />
        ),
        align: 'center',
        renderer: statusRenderer,
        initialWidth: 80,
        sortable: true,
      },
      {
        field: 'productionYield',
        header: (
          <HeaderWithToolTip
            contentOfToolTip="Production Yield"
            element={<span>Production Yield</span>}
          />
        ),
        align: 'left',
        renderer: productionYieldRenderer,
        initialWidth: 140,
        sortable: true,
      },
      {
        field: '',
        header: (
          <HeaderWithToolTip
            contentOfToolTip="Batch Status"
            element={<span>Batch Status</span>}
          />
        ),
        align: 'left',
        renderer: (cellData) => batchStateRenderer(cellData),
        initialWidth: 120,
      },
      {
        field: 'rawMaterialLeftQty',
        header: (
          <HeaderWithToolTip
            contentOfToolTip="Raw Material Left"
            element={<span>Raw Material Left</span>}
          />
        ),
        align: 'center',
        renderer: (cellData) => rawMaterialRenderer(cellData),
        initialWidth: 140,
      },
      // {
      //   field: 'state',
      //   header: '',
      //   align: 'center',
      //   renderer: (cellData) => actionRenderer(cellData, rowAction),
      //   sortable: false,
      //   initialWidth: 100,
      // },
      {
        field: '',
        header: '',
        align: 'right',
        renderer: (cellData) => moreActions(cellData),
        sortable: false,
        initialWidth: 80,
      },
    ] as ColumnProps[];
  };

  const columnDefs = getColumnDefs(action);
  return (
    <Datatable
      columns={columnDefs}
      data={data}
      loading={loading}
      pagination
      scrollHeight="300px"
      search
      refresh
      onRefresh={refreshHandler}
    />
  );
};
