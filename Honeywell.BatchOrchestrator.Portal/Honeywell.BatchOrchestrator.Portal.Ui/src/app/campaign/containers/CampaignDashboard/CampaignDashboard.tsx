import { Button, Card, Tab } from '@scuf/common';
import { useDialog } from 'shared/dialog';
import { lazyLoad } from 'utils/loadable';
import { useHistory, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Permissions, useAuthorize } from 'core/authentication';
import { PermissionValues } from 'core/authentication/models/user-permission';
import { useConfirm } from 'shared/confirm-dialog';
import { AppConstants } from 'utils/app-constants';
import { useCampaignFacade } from '+store/campaign';
import { RecipeFormulaSetModal } from '../RecipeFormulaSetModal/RecipeFormulaSetModal';

const EditCampaign = lazyLoad(
  () => import('../EditCampaignView/EditCampaignView'),
  (page) => page.EditCampaignView
);
const CreatedCampaignsTab = lazyLoad(
  () => import('../CreatedCampaignsTab/CreatedCampaignsTab'),
  (page) => page.CreatedCampaignsTab
);
const ActiveCampaignsTab = lazyLoad(
  () => import('../ActiveCampaignsTab/ActiveCampaignsTab'),
  (page) => page.ActiveCampaignsTab
);

const ClosedCampaignsTab = lazyLoad(
  () => import('../ClosedCampaignsTab/ClosedCampaignsTab'),
  (page) => page.ClosedCampaignsTab
);
export const CampaignDashboard: React.FC = () => {
  const [showDialog, hideDialog] = useDialog(() => (
    <EditCampaign open closeCampaignView={hideDialog} />
  ));
  const { authorized: canMonitorCampaign } = useAuthorize([
    PermissionValues.MonitorProductionCampaign,
  ]);
  const [showMRFormulaSetDialog, hideMRFormulaSetDialog] = useDialog(() => (
    <RecipeFormulaSetModal
      open
      onClose={(openCreateCampaign: boolean) => {
        hideMRFormulaSetDialog();
        if (openCreateCampaign) {
          showDialog();
        }
      }}
    />
  ));
  // const [selectedTab, setSelectedTab] = useState(0);
  const {
    selectedCampaignTab,
    setSelectedTab,
    setNavigationFrom,
    setFormulaSetId,
    setFormulaId,
    initializeCampaignState,
    fetchRecipeFormulaSet,
  } = useCampaignFacade();
  const location = useLocation<any>();
  const confirm = useConfirm();
  const history = useHistory();
  const { formulaId, formulaSetId } = location.state || {};
  useEffect(() => {
    if (formulaId && formulaSetId) {
      initializeCampaignState();
      setNavigationFrom('formula');
      fetchRecipeFormulaSet({ formulaSetId });
      // setFormulaSetId(formulaSetId);
      setFormulaId(formulaId);
      showDialog();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
    if (canMonitorCampaign !== null && !canMonitorCampaign) {
      raiseAlert(AppConstants.UNAUTHORIZED_MESSAGE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canMonitorCampaign]);
  return (
    <div className="m-4 mr-8">
      <div className="d-flex justify-content-start">
        <div className="font-size-20 text-dark-400 text-semibold">
          Campaign Dashboard
        </div>
        <Permissions
          type="disable"
          allowed={[PermissionValues.CreateProductionCampaign]}
        >
          {({ authorized }) => (
            <Button
              type="primary"
              size="small"
              content="Create Campaign"
              onClick={() => {
                initializeCampaignState();
                showMRFormulaSetDialog();
              }}
              className="ml-4"
              disabled={!authorized}
              textTransform={false}
            />
          )}
        </Permissions>
      </div>
      {canMonitorCampaign && (
        <Tab
          activeIndex={selectedCampaignTab}
          onTabChange={setSelectedTab}
          className="mt-4"
        >
          <Tab.Pane title="Active Campaigns">
            {/* <h1>Hello World</h1> */}
            <ActiveCampaignsTab />
          </Tab.Pane>
          <Tab.Pane title="Planned Campaigns">
            <CreatedCampaignsTab />
          </Tab.Pane>

          <Tab.Pane title="Closed Campaigns">
            <ClosedCampaignsTab />
          </Tab.Pane>
        </Tab>
      )}
    </div>
  );
};
