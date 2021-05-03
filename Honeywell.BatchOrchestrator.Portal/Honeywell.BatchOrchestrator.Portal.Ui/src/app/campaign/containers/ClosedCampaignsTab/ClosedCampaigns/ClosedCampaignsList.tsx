import { Datatable } from 'shared/datatable';
import { HeaderWithToolTip } from 'shared/tooltip';
import { Icon, Tooltip } from '@scuf/common';
import {
  Campaign,
  CampaignStateValues,
  campaignStates,
} from 'app/campaign/models/campaign';
import { CampaignType, campaignTypes } from 'app/campaign/models/campaign-type';
import Terminated from 'assets/icons/Terminated.svg';
import Completed from 'assets/icons/Completed.svg';
import { ColumnProps } from 'utils/datatable-column-props';
import { MoreActions } from 'shared/more-actions';
// import { getFormattedDateTime } from 'app/campaign/utils';
import { toLocalTimeStringFormatted } from 'app/../utils/date-utils';
import { MoreAction } from 'shared/more-actions/more-action';
import '../../ActiveCampaignsTab/active-campaign.scss';
import { useAuthorize } from 'core/authentication';
import { PermissionValues } from 'core/authentication/models/user-permission';
import { AppConstants } from 'utils/app-constants';

function stateRenderer(cellData) {
  return (
    <>
      {CampaignStateValues.Completed === cellData.value && (
        <div className="d-flex align-items-center">
          <img src={Completed} />
          <span className="completed-campaign">
            {
              campaignStates.find(
                (f) => f.value === CampaignStateValues.Completed
              )?.text
            }
          </span>
        </div>
      )}
      {CampaignStateValues.Terminated === cellData.value && (
        <div className="d-flex align-items-center">
          <img src={Terminated} />
          <span className="terminated-campaign">
            {
              campaignStates.find(
                (f) => f.value === CampaignStateValues.Terminated
              )?.text
            }
          </span>
        </div>
      )}
    </>
  );
}

const productionYieldRenderer = (cellData) => {
  return <span>{`${cellData.value ?? ''}`}</span>;
};
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

function actionRenderer(cellData, action: Action, authorized: boolean) {
  const moreActions: MoreAction[] = [
    {
      disabled: !authorized,
      disabledTooltip: AppConstants.UNAUTHORIZED_MESSAGE,
      name: 'Remove Campaign',
      onClick: () => action('remove', cellData.rowData),
    },
  ];
  return (
    <div className="d-flex justify-content-between">
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
        <MoreActions
          moreActionsObject={moreActions}
          funcArgumentData={cellData}
          on="click"
        />
      </div>
    </div>
  );
}

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
      position="top left"
      event="hover"
      hoverable
    />
  );
};
const getColumnDefs = (action: Action, authorizedFlag: boolean) => {
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
      initialWidth: 125,
      renderer: textWithToopTipRenderer,
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
      initialWidth: 165,
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
      renderer: formulaRenderer,
      initialWidth: 105,
      sortable: true,
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
      initialWidth: 178,
      sortable: true,
    },
    {
      field: 'endTime',
      header: (
        <HeaderWithToolTip
          contentOfToolTip="End Time"
          element={<span>End Time</span>}
        />
      ),
      align: 'left',
      renderer: startTimeRenderer,
      initialWidth: 178,
      sortable: true,
    },
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
      initialWidth: 110,
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
      field: 'noOfBatches',
      header: (
        <HeaderWithToolTip
          contentOfToolTip="Number of Batches"
          element={<span>NO OF BATCHES</span>}
        />
      ),
      renderer: batchStateRenderer,
      align: 'left',
      initialWidth: 120,
      sortable: true,
    },
    {
      field: '',
      header: '',
      align: 'right',
      renderer: (cellData) => actionRenderer(cellData, action, authorizedFlag),
      initialWidth: 80,
    },
  ] as ColumnProps[];
};
export type actionType = 'remove' | 'rowClick';
export type Action = (type: actionType, data: Campaign) => void;

export const ClosedCampaignsList: React.FC<{
  data: Campaign[];
  loading: boolean;
  action: Action;
  refreshHandler: () => void;
}> = ({ data, loading, action, refreshHandler }) => {
  const { authorized: canManageCampaign } = useAuthorize([
    PermissionValues.StartManageProductionCampaign,
  ]);
  const columnDefs = getColumnDefs(action, !!canManageCampaign);

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
