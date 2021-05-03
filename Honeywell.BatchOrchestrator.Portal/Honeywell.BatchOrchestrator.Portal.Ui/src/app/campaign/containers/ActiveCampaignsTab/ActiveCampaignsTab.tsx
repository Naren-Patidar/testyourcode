import { useCallback, useEffect, useState } from 'react';
import { Card } from '@scuf/common';
import { AppRoutes } from 'routing';
import { useHistory } from 'react-router-dom';
import { lazyLoad } from 'utils/loadable';
import { useDialog } from 'shared/dialog';
import {
  CampaignFilter,
  CampaignCategory,
} from 'app/campaign/models/campaign-filter';
import SignalRService, { HubMethods } from 'core/signalr/SignalRConnection';
import { useCampaignFacade } from '+store/campaign';
import {
  ActiveCampaignList,
  Action,
} from './ActiveCampaigns/ActiveCampaignList';
import { useAppShellFacade } from '+store/app-shell';

const EditCampaign = lazyLoad(
  () => import('../EditCampaignView/EditCampaignView'),
  (page) => page.EditCampaignView
);

export const ActiveCampaignsTab: React.FC = () => {
  const [dataChange, setDataChange] = useState(0);
  const history = useHistory();

  const {
    campaign,
    activeCampaigns,
    loading,
    actionState,
    setActionState,
    fetchActiveCampaigns,
    fetchCampaignById,
    setMode,
    changeCampaignsState,
  } = useCampaignFacade();
  const [showDialog, hideDialog] = useDialog(
    () => <EditCampaign open closeCampaignView={hideDialog} />,
    [campaign]
  );
  const getCampaigns = () => {
    const bodyData: CampaignFilter = {
      campaignCategory: CampaignCategory.Active,
    };
    fetchActiveCampaigns(bodyData);
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

  const onAction: Action = (type, data) => {
    switch (type) {
      case 'edit':
        setMode('edit');
        fetchCampaignById(data.id || '');
        // setSelectedCampaign(data);
        showDialog();
        break;
      case 're-execute':
        break;
      case 'pause':
        break;
      case 'rowClick':
        history.push(`${AppRoutes.CAMPAIGN_DETAILS.path}/${data.id}`);
        break;
      case 'changeState':
        changeCampaignsState(data);
        break;
      default:
        break;
    }
  };
  return (
    <ActiveCampaignList
      data={activeCampaigns}
      loading={loading}
      action={onAction}
      refreshHandler={getCampaigns}
    />
  );
};
