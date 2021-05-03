import { Datatable } from 'shared/datatable';
import { HeaderWithToolTip } from 'shared/tooltip';
import { Button, Tooltip, Popup, VerticalMenu, Icon, Card } from '@scuf/common';
import {
  Campaign,
  campaignStatuses,
  CampaignStatusValues,
} from 'app/campaign/models/campaign';
import { batchStartMethods } from 'app/campaign/models/campaign-start-method';
import { campaignTypes } from 'app/campaign/models/campaign-type';
import {
  UnitSelectionType,
  unitSelectionTypeVals,
} from 'app/campaign/models/campaign-unit-selection';
import clsx from 'clsx';
import { ColumnProps } from 'utils/datatable-column-props';
import { MoreActions } from 'shared/more-actions';
// import { getFormattedDateTime } from 'app/campaign/utils';
import { toLocalTimeStringFormatted } from 'app/../utils/date-utils';
import { MoreAction } from 'shared/more-actions/more-action';
import { useCallback } from 'react';
import { PermissionValues } from 'core/authentication/models/user-permission';
import { Permissions, useAuthorize } from 'core/authentication';
import { AppConstants } from 'utils/app-constants';
import { ActionState } from '+store/campaign/types';
import { useCampaignFacade } from '+store/campaign';

function commentRenderer(cellData) {
  return cellData.rowData.submitterComment ||
    cellData.rowData.approverComment ? (
    <Popup
      element={<Icon root="common" name="message" size="small" />}
      on="hover"
      hoverable
    >
      {cellData.rowData.submitterComment && (
        <Card className="m-0 mr-4 p-2 shadow-none border">
          <Card.Header title="Submitter comments" />
          <Card.Content>{cellData.rowData.submitterComment}</Card.Content>
        </Card>
      )}
      {cellData.rowData.approverComment && (
        <Card className="m-0 mr-4 p-2 shadow-none border">
          <Card.Header title="Approver comments" />
          <Card.Content>{cellData.rowData.approverComment}</Card.Content>
        </Card>
      )}
    </Popup>
  ) : null;
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
    <Tooltip
      content={
        campaignTypes.find((f) => f.value === cellData.value)?.text || ''
      }
      element={
        <span className="text-truncate">
          {campaignTypes.find((f) => f.value === cellData.value)?.text}
        </span>
      }
      position="bottom center"
      event="hover"
      hoverable
    />
  );
}

const productionQtyRenderer = (cellData) => {
  return cellData.value <= 0 ? (
    <Tooltip
      content="Not Applicable"
      element={<span className="text-truncate">Not Applicable</span>}
      position="bottom center"
      event="hover"
      hoverable
    />
  ) : (
    <span>{`${cellData.value}  ${cellData.rowData.batchSizeEngUnit}`}</span>
  );
};
function startTimeRenderer(cellData) {
  return (
    <Tooltip
      content={
        cellData.value
          ? toLocalTimeStringFormatted(cellData.value)
          : 'Unscheduled'
      }
      element={
        <span className="text-truncate">
          {cellData.value
            ? toLocalTimeStringFormatted(cellData.value)
            : 'Unscheduled'}
        </span>
      }
      position="bottom center"
      event="hover"
      hoverable
    />
  );
}

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

export type actionType =
  | 'start'
  | 'reschedule'
  | 'edit'
  | 'rowClick'
  | 'delete';
export type Action = (type: actionType, data: Campaign) => void;

export const CreatedCampaignList: React.FC<{
  data: Campaign[];
  loading: boolean;
  action: Action;
  actionState?: ActionState | null;
  refreshHandler: () => void;
}> = ({ data, loading, action, actionState, refreshHandler }) => {
  const { campaignsInStarting } = useCampaignFacade();
  const { authorized: canManageCampaign } = useAuthorize([
    PermissionValues.StartManageProductionCampaign,
  ]);
  const { authorized: canEditCampaign } = useAuthorize([
    PermissionValues.EditProductionCampaign,
  ]);
  const showLoading = useCallback(
    (id) => {
      return campaignsInStarting.indexOf(id) > -1;
    },
    [campaignsInStarting]
  );
  function actionRenderer(cellData) {
    const moreActions: MoreAction[] = [];

    moreActions.push({
      disabled:
        !canManageCampaign ||
        cellData.rowData?.status === CampaignStatusValues.SubmitForApproval,
      disabledTooltip:
        !canManageCampaign &&
        cellData.rowData?.status !== CampaignStatusValues.SubmitForApproval
          ? AppConstants.UNAUTHORIZED_MESSAGE
          : undefined,
      name: 'Delete Campaign',
      onClick: () => action('delete', cellData.rowData),
    });
    moreActions.push({
      disabled:
        !canEditCampaign ||
        cellData.rowData?.status === CampaignStatusValues.SubmitForApproval,
      disabledTooltip:
        canManageCampaign &&
        cellData.rowData?.status !== CampaignStatusValues.SubmitForApproval
          ? AppConstants.UNAUTHORIZED_MESSAGE
          : undefined,
      name: 'Edit Campaign',
      onClick: () => action('edit', cellData.rowData),
    });

    return (
      <div className="d-flex justify-content-between">
        {!cellData.rowData?.startTime &&
        cellData.rowData?.status === CampaignStatusValues.Approved ? (
          <Permissions
            type="disable"
            allowed={[PermissionValues.StartManageProductionCampaign]}
          >
            {({ authorized }) => (
              <Button
                type="secondary"
                actionType="button"
                content="Start"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  action('start', cellData.rowData);
                }}
                loading={showLoading(cellData.rowData.id)}
                disabled={showLoading(cellData.rowData.id) || !authorized}
                textTransform={false}
              />
            )}
          </Permissions>
        ) : (
          <div />
        )}

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
          {/* {cellData.rowData?.status !==
          CampaignStatusValues.SubmitForApproval ? ( */}
          <MoreActions
            moreActionsObject={moreActions}
            funcArgumentData={cellData}
            on="click"
          />
          {/* ) : (
            <Icon
              name="ellipsis-horizontal"
              id="test"
              root="common"
              size="small"
              style={{ visibility: 'hidden' }}
            />
          )} */}
        </div>

        {/* <Popup
          className="popup-theme-wrap"
          element={<Icon root="common" name="ellipsis-horizontal" size="small" />}
          on="click"
          hideOnScroll={false}
          hoverable
        >
          <VerticalMenu>
            <VerticalMenu.Item>Reschedule</VerticalMenu.Item>
            <VerticalMenu.Item>Edit Campaign</VerticalMenu.Item>
          </VerticalMenu>
        </Popup> */}
      </div>
    );
  }
  const formulaRenderer = (cellData) => {
    return (
      <Tooltip
        content={
          cellData.rowData.isRecipeBased ? 'Not Applicable' : cellData.value
        }
        element={
          <span className="text-truncate">
            {cellData.rowData.isRecipeBased ? 'Not Applicable' : cellData.value}
          </span>
        }
        position="top left"
        event="hover"
        hoverable
      />
    );
  };

  const getColumnDefs = () => {
    return [
      // {
      //   field: 'status',
      //   header: '',
      //   align: 'center',
      //   renderer: commentRenderer,
      //   initialWidth: 40,
      // },
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
      {
        field: 'campaignType',
        header: (
          <HeaderWithToolTip
            contentOfToolTip="Campaign Criteria"
            element={<span>Campaign Criteria</span>}
          />
        ),
        align: 'left',
        renderer: campaignTypeRenderer,
        initialWidth: 185,
        sortable: true,
      },
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
        renderer: formulaRenderer,
        sortable: true,
      },

      // {
      //   field: 'isUnitSelectionDeferred',
      //   header: 'Unit Selection',
      //   align: 'left',
      //   renderer: unitSelectionRenderer,
      //   initialWidth: 130,
      // },

      {
        field: 'productionQty',
        header: (
          <HeaderWithToolTip
            contentOfToolTip="Production Quantity"
            element={<span>Production QTY</span>}
          />
        ),
        renderer: productionQtyRenderer,
        align: 'left',
        initialWidth: 145,
        sortable: true,
      },
      {
        field: 'noOfBatches',
        header: (
          <HeaderWithToolTip
            contentOfToolTip="Number of Batches"
            element={<span>NO OF BATCHES</span>}
          />
        ),
        align: 'left',
        initialWidth: 140,
        sortable: true,
      },
      {
        field: 'startTime',
        header: (
          <HeaderWithToolTip
            contentOfToolTip="Scheduled"
            element={<span>Scheduled</span>}
          />
        ),
        align: 'left',
        renderer: startTimeRenderer,
        placeholder: 'Unscheduled',
        initialWidth: 185,
        sortable: true,
      },
      // {
      //   field: 'startTime',
      //   header: 'Start Method',
      //   align: 'left',
      //   renderer: startMethodRenderer,
      //   initialWidth: 75,
      // },
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
        field: '',
        header: '',
        align: 'center',
        renderer: actionRenderer,
        sortable: false,
        initialWidth: 150,
      },
    ] as ColumnProps[];
  };
  const columnDefs = getColumnDefs();
  return (
    <Datatable
      columns={columnDefs}
      data={data}
      loading={loading}
      pagination
      scrollHeight="400px"
      search
      refresh
      onRefresh={refreshHandler}
      // onRowClick={({ data: dataItem }) => action('rowClick', dataItem)}
    />
  );
};
