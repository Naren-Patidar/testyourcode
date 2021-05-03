import { useCallback, useEffect } from 'react';
import { Card } from '@scuf/common';
import { useHistory } from 'react-router-dom';
import { AppRoutes } from 'routing';
import { useDialog } from 'shared/dialog';
import { lazyLoad } from 'utils/loadable';
import { useConfirm } from 'shared/confirm-dialog';
import {
  CampaignCategory,
  CampaignFilter,
} from 'app/campaign/models/campaign-filter';
import SignalRService, { HubMethods } from 'core/signalr/SignalRConnection';
import { useCampaignFacade } from '+store/campaign';
import {
  CreatedCampaignList,
  Action,
} from './CreatedCampaignList/CreatedCampaignList';
import { useAppShellFacade } from '+store/app-shell';

const EditCampaign = lazyLoad(
  () => import('../EditCampaignView/EditCampaignView'),
  (page) => page.EditCampaignView
);

export const CreatedCampaignsTab: React.FC = () => {
  const {
    plannedCampaigns,
    campaign,
    loading,
    actionState,
    fetchPlannedCampaigns,
    executeStartCampaign,
    setActionState,
    setMode,
    setSelectedCampaign,
    fetchCampaignById,
    removeCampaign,
  } = useCampaignFacade();
  const confirm = useConfirm();
  const history = useHistory();
  const [showDialog, hideDialog] = useDialog(
    () => <EditCampaign open closeCampaignView={hideDialog} />,
    [campaign]
  );
  const getCampaigns = () => {
    const filter: CampaignFilter = {
      campaignCategory: CampaignCategory.Planned,
    };
    fetchPlannedCampaigns(filter);
  };
  const onCampaignStatusChanged = useCallback(() => {
    SignalRService.onCampaignStatusChanged((res) => {
      getCampaigns();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    return () => {
      SignalRService.removeHandlers([HubMethods.OnCampaignStatusChanged]);
    };
  }, []);
  useEffect(() => {
    getCampaigns();
    onCampaignStatusChanged();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (actionState === 'finished') {
      getCampaigns();
      setActionState(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionState]);
  const onAction: Action = async (type, data) => {
    switch (type) {
      case 'edit':
        setMode('edit');
        fetchCampaignById(data.id || '');
        // setSelectedCampaign(data);
        showDialog();
        break;
      case 'delete':
        {
          const { confirmed: shouldDelete } = await confirm.show({
            message: `Do you want to delete campaign: ${data.campaignRefId} ?`,
            confirmText: 'Delete',
          });
          if (shouldDelete) {
            removeCampaign(data.id || '');
          }
        }
        break;
      case 'start':
        executeStartCampaign(data);

        break;
      case 'rowClick':
        history.push(`${AppRoutes.CAMPAIGN_DETAILS.path}/${data.id}`);
        break;
      default:
        break;
    }
  };
  return (
    // <Card className="m-0 mr-4 p-2 shadow-none">
    //   <Card.Content>
    <CreatedCampaignList
      data={plannedCampaigns}
      loading={loading}
      action={onAction}
      actionState={actionState}
      refreshHandler={getCampaigns}
    />
    //   </Card.Content>
    // </Card>
  );
};
