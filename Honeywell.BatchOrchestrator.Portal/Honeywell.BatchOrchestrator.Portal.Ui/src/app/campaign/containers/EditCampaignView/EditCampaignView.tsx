import { useHistory } from 'react-router-dom';

import { campaignValidationSchema } from 'app/campaign/models/campaignFormValidationSchema';
import { campaignFormModel } from 'app/campaign/models/campaignFormModel';
import { Formik, FormikConfig, FormikValues } from 'formik';
import { useEffect } from 'react';
import { toastr } from 'shared/toastr';
import { useConfirm } from 'shared/confirm-dialog';
import { useAuthorize } from 'core/authentication';
import {
  Campaign,
  CampaignStateValues,
  CampaignStatusValues,
} from 'app/campaign/models/campaign';
import { PermissionValues } from 'core/authentication/models/user-permission';
import { getUpdatedUnitSelection } from 'app/campaign/utils';
import {
  CampaignCreationStep,
  campaignSteps,
} from 'app/campaign/models/campaign-step';
import { CampaignType } from 'app/campaign/models/campaign-type';
import { Loader } from '@scuf/common';
import { AppConstants, RESPONSE_CODE } from 'utils/app-constants';
import { useCampaignFacade } from '+store/campaign';
import { CampaignTabs } from '+store/campaign/types';
import './EditCampaignView.scss';
import { EditCampaignForm } from './EditCampaignForm/EditCampaignForm';

function getSuccessMessage(
  status: CampaignStatusValues,
  state: CampaignStateValues | null
) {
  switch (status) {
    case CampaignStatusValues.Created:
      return 'Campaign is saved';
    case CampaignStatusValues.SubmitForApproval:
      return state === CampaignStateValues.Paused
        ? 'Campaign has been paused and submitted for review'
        : 'Campaign is submitted for review';
    case CampaignStatusValues.Approved:
      return state === CampaignStateValues.Paused
        ? 'Campaign has been paused and updated '
        : 'Campaign is created';
    default:
      return '';
  }
}
function getUpdateCampaignBasedonCampaignType(campaign: Campaign) {
  const updatedCamp = { ...campaign };
  switch (campaign.campaignType) {
    case CampaignType.ContinuousCampaign:
      updatedCamp.noOfBatches = null;
      updatedCamp.rawMaterial = null;
      updatedCamp.rawMaterialParameterId = null;
      updatedCamp.rawMaterialQty = null;
      if (updatedCamp.batchSizeEngUnit === '%') {
        updatedCamp.productionQty = null;
      }
      break;
    case CampaignType.ProductionQuantity:
      updatedCamp.noOfBatches = null;
      updatedCamp.rawMaterial = null;
      updatedCamp.rawMaterialParameterId = null;
      updatedCamp.rawMaterialQty = null;
      break;
    case CampaignType.NoOfBatches:
      updatedCamp.productionQty =
        // eslint-disable-next-line no-nested-ternary
        updatedCamp.batchSizeEngUnit === '%'
          ? null
          : updatedCamp.noOfBatches && updatedCamp.currentBatchSize
          ? updatedCamp.noOfBatches * updatedCamp.currentBatchSize
          : 0;
      updatedCamp.rawMaterial = null;
      updatedCamp.rawMaterialParameterId = null;
      updatedCamp.rawMaterialQty = null;
      break;
    case CampaignType.RawMaterialConsumption:
      updatedCamp.noOfBatches = null;
      updatedCamp.productionQty = null;
      break;
    default:
      break;
  }
  return updatedCamp;
}
const FormikContainer: React.FC<FormikConfig<FormikValues>> = (props) => {
  return <Formik {...props}>{props.children}</Formik>;
};
export const EditCampaignView: React.FC<{
  open: boolean;
  closeCampaignView: () => void;
}> = (props) => {
  const {
    campaign,
    actionState,
    newCampaignId,
    activeStep,
    minProdQty,
    mode,
    loading,
    setActiveStep,
    error,
    errorStatusCode,
    addCampaign,
    initializeCampaignState,
    setSelectedCampaign,
    setSelectedTab,
    campaignStatus,
    campaignState,
  } = useCampaignFacade();
  const {
    campaignTypeFormField,
    campaignDetailsFormField,
    resourceManagement,
    unitSelectionFormField,
  } = campaignFormModel;
  const confirm = useConfirm();
  const isLastStep = activeStep === campaignSteps.length - 1;
  const currentValidationSchema = campaignValidationSchema()[activeStep];
  const history = useHistory();
  const { authorized } = useAuthorize([
    PermissionValues.CreateProductionCampaign,
    PermissionValues.EditProductionCampaign,
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

  /**
   * clear campaign state on popup destroy
   */
  useEffect(() => {
    return () => {
      initializeCampaignState();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (authorized !== null && !authorized) {
      raiseAlert(AppConstants.UNAUTHORIZED_MESSAGE);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authorized]);
  useEffect(() => {
    if (errorStatusCode && errorStatusCode === RESPONSE_CODE.SERVICE_DOWN) {
      toastr.banner('Service Unavailable', error, 'error');
      // raiseAlert(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorStatusCode]);
  /**
   * when user action successfully finished show snakbar
   * if status is approved/in review then close popup
   */
  useEffect(() => {
    if (actionState && actionState === 'finished') {
      /**
       * Commented below code as notification has been implemented
       */
      // const successMessage = getSuccessMessage(campaign.status, campaign.state);
      // toastr.snackbar(successMessage);

      if (
        campaign.status === CampaignStatusValues.SubmitForApproval ||
        campaign.status === CampaignStatusValues.Approved
      ) {
        props.closeCampaignView();
        if (campaign.state === null) {
          setSelectedTab(CampaignTabs.Planned);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionState]);

  /**
   * Function to send campaign data to API during form submit
   */
  const submitForm = (data: Campaign) => {
    let payload: Campaign = {
      ...campaign,
      ...data,
      id: newCampaignId || null,
      step:
        activeStep === CampaignCreationStep.Review &&
        data.status !== CampaignStatusValues.Created
          ? CampaignCreationStep.BasicSetup
          : activeStep,
    };
    if (payload.isUnitSelectionDeferred) {
      payload.campaignUnitSelection = [];
    } else {
      payload.campaignUnitSelection = getUpdatedUnitSelection(
        payload.campaignUnitSelection
      );
    }
    payload = getUpdateCampaignBasedonCampaignType(payload);
    if (!payload.isLastBatchScaled) {
      payload.minimumBatchSize = null;
    }
    // setSelectedCampaign(payload);
    addCampaign(payload);
  };

  /**
   * Submit form handler
   */
  const handleSubmit = async (values, actions) => {
    if (values.status === CampaignStatusValues.Created) {
      if (campaignState !== null) {
        const { confirmed } = await confirm.show({
          confirmText: 'Ok',
          title: 'Alert',
          message:
            'This action might affect number of batches for the campaign. Do you want to save?',
        });
        if (confirmed) {
          submitForm(values);
        }
      } else {
        submitForm(values);
      }
    } else if (
      (isLastStep &&
        values.status === CampaignStatusValues.SubmitForApproval) ||
      values.status === CampaignStatusValues.Approved
    ) {
      const { confirmed, comments } = await confirm.show({
        message:
          // eslint-disable-next-line no-nested-ternary
          campaignState !== null
            ? values.status === CampaignStatusValues.SubmitForApproval
              ? 'This action might affect number of batches for the campaign. Do you want to submit this campaign for review?'
              : 'This action might affect number of batches for the campaign. Do you want to update this campaign?'
            : values.status === CampaignStatusValues.SubmitForApproval
            ? 'Do you want to submit this campaign for review?'
            : 'Do you want to create this campaign?',
        confirmText:
          // eslint-disable-next-line no-nested-ternary
          values.status === CampaignStatusValues.SubmitForApproval
            ? 'Submit'
            : campaignState !== null
            ? 'Update'
            : 'Create',
        commentsRequired:
          values.status === CampaignStatusValues.SubmitForApproval,
        showCommentBox:
          values.status === CampaignStatusValues.SubmitForApproval,
      });
      if (confirmed) {
        const payload: Campaign = {
          ...values,
          submitterComment: comments || 'Auto Approved',
        };
        submitForm(payload);
      }
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  };

  /**
   * Function to handler close campaign popup
   */
  const onClose = async (shouldNotLeave: boolean) => {
    if (shouldNotLeave) {
      const { confirmed } = await confirm.show({
        title: 'Alert',
        message: `Do you want to close ${
          mode === 'add' ? 'create campaign' : 'edit campaign'
        } view?`,
        note: 'Note: All unsaved changes will be lost.',
        confirmText: 'Yes',
        cancelText: 'No',
      });
      if (confirmed) {
        props.closeCampaignView();
      }
    } else {
      props.closeCampaignView();
    }
  };
  return (
    <FormikContainer
      initialValues={campaign}
      initialTouched={{
        [campaignDetailsFormField.startTime.name]: mode === 'edit',
        [campaignTypeFormField.productionQty.name]: mode === 'edit',
        [campaignTypeFormField.rawMaterialQty.name]: mode === 'edit',
      }}
      enableReinitialize
      onSubmit={handleSubmit}
      validationSchema={currentValidationSchema}
    >
      {({ dirty, errors, values }) => {
        return (
          <EditCampaignForm open={props.open} onClose={() => onClose(dirty)} />
        );
      }}
    </FormikContainer>
  );
};
