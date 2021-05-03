import { useCallback, useEffect } from 'react';
import {
  CampaignCategory,
  CampaignFilter,
} from 'app/campaign/models/campaign-filter';
import { useConfirm } from 'shared/confirm-dialog';
import { AppRoutes } from 'routing/app.route-names';
import { useHistory } from 'react-router-dom';
import SignalRService, { HubMethods } from 'core/signalr/SignalRConnection';
import { useCampaignFacade } from '+store/campaign';
import {
  Action,
  ClosedCampaignsList,
} from './ClosedCampaigns/ClosedCampaignsList';
import { useAppShellFacade } from '+store/app-shell';

export const ClosedCampaignsTab: React.FC = () => {
  const {
    closedCampaigns,
    loading,
    actionState,
    fetchClosedCampaigns,
    removeCampaign,
    setActionState,
  } = useCampaignFacade();
  const history = useHistory();
  const confirm = useConfirm();
  const getCampaigns = () => {
    const filter: CampaignFilter = {
      campaignCategory: CampaignCategory.Closed,
    };
    fetchClosedCampaigns(filter);
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
      case 'remove':
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
      case 'rowClick':
        history.push(`${AppRoutes.CAMPAIGN_DETAILS.path}/${data.id}`);
        break;
      default:
        break;
    }
  };
  return (
    <ClosedCampaignsList
      data={closedCampaigns}
      loading={loading}
      action={onAction}
      refreshHandler={getCampaigns}
    />
  );
};
