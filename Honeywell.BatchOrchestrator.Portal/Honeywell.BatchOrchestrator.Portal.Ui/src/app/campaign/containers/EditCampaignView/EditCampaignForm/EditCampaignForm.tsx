/* eslint-disable import/named */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable dot-notation */

import { Modal, Card, Icon } from '@scuf/common';
import {
  campaignFormModel,
  // eslint-disable-next-line import/named
  CampaignFormModelType,
} from 'app/campaign/models/campaignFormModel';
import { Form, useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { lazyLoad } from 'utils/loadable';
import { Campaign } from 'app/campaign/models/campaign';
import { Stepper } from 'shared/stepper';
import { AppConstants } from 'utils';
import {
  CampaignCreationStep,
  campaignSteps,
} from 'app/campaign/models/campaign-step';
import { PayloadForBatch } from 'app/campaign/models/batch-size';
import { CampaignType } from 'app/campaign/models/campaign-type';
import { PageTitle } from 'shared/page-title';
import { useCampaignFacade } from '+store/campaign';

import { EditCampaignActions } from '../../EditCampaignActions/EditCampaignActions';

const BasicSetup = lazyLoad(
  () => import('../../EditBasicSetup/EditBasicSetup'),
  (page) => page.EditBasicSetup
);
const ResourceManagement = lazyLoad(
  () => import('../../EditResourceManagement/EditResourceManagement'),
  (page) => page.EditResourceManagement
);
const ReviewCampaign = lazyLoad(
  () => import('../../ReviewCampaign/ReviewCampaign'),
  (page) => page.ReviewCampaignView
);
const { formId }: CampaignFormModelType = campaignFormModel;
function renderStepContent(step: CampaignCreationStep) {
  switch (step) {
    case CampaignCreationStep.BasicSetup:
      return <BasicSetup />;
    case CampaignCreationStep.ResourceManagement:
      return <ResourceManagement />;
    case CampaignCreationStep.Review:
      return <ReviewCampaign />;
    default:
      return null;
  }
}
interface EditCampaignFormProps {
  open: boolean;
  onClose: () => void;
}
export const EditCampaignForm: React.FC<EditCampaignFormProps> = ({
  open,
  onClose,
}) => {
  const {
    campaignTypeFormField,
    resourceManagement,
    unitSelectionFormField,
  } = campaignFormModel;
  const {
    campaign,
    batchSize,
    newCampaignId,
    payloadForBatch,
    mode,
    activeStep,
    campaignState,
    formulaSelected,
    formulaParams,
    selectionUnits,
    recipeValid,
    loading,
    error,
    actionState,
    selectionUnitsEdited,
    formulaParamsEdited,
    maxSimulataneousBatch,
    setActiveStep,
    setPayloadForBatch,
    isRecipeValid,
    fetchBatchSize,
    fetchRefBatches,
    fetchReportParams,
    fetchFormulaIds,
    fetchMinimumProductionQuantity,
    fetchSelectionUnits,
    fetchFormulaParameters,
    setFormulaId,
    setError,
    setDisableSave,
    setDisableNext,
    setFormulaParamterEdited,
    setSelectionUnitsEdited,
    isRecipeClassBasedForSCMRCM,
    resetRecipeClassBased,
    setMRFormulaSet,
    fetchRecipeFormulaSet,
    selectedMRFormulaSet,
    fetchCampaignBatchIdPatternByCampaignId,
    fetchMaxSimultaneousBatch,
    setRecipeFormulaSet,
    fetchMinimumNumberOfBatches,
  } = useCampaignFacade();
  const {
    values: {
      isRecipeBased,
      campaignType,
      formulaSetId,
      formulaId,
      recipeName,
      productionQty,
      batchIdPattern,
      defaultBatchSize,
      currentBatchSize,
      isLastBatchScaled,
      minimumBatchSize,
      noOfBatches,
      rawMaterialParameterId,
      batchSizeEngUnit,
      BatchIdPatternContainerList,
      isUnitSelectionDeferred,
      rawMaterialQty,
      batchIdPatternPreviewLength,
    },
    setFieldValue,
    setFieldTouched,
    setFieldError,
    errors,
  } = useFormikContext<Campaign>();
  const isLastStep = activeStep === campaignSteps.length - 1;
  const batchPatternMaxLength = 24;

  useEffect(() => {
    if (
      BatchIdPatternContainerList !== null &&
      BatchIdPatternContainerList !== undefined &&
      batchIdPattern === 'CustomizeBatchId'
    ) {
      const IncPattern = BatchIdPatternContainerList.filter((item) => {
        if (item['type'] === 'INC') {
          return item;
        }
      });

      const txtPattern = BatchIdPatternContainerList.filter((item) => {
        if (item['type'] === 'TXT') {
          const txtLength = item['props']['val'] ? item['props']['val'] : '';
          if (txtLength.length === 0) {
            return item;
          }
        }
      });

      if (IncPattern.length === 0) {
        setError('Custom Batch Id pattern: AutoIncrement is mandatory.');
        setDisableSave(true);
        setDisableNext(true);
      } else if (txtPattern !== null && txtPattern.length > 0) {
        setError(
          'Custom Batch Id pattern: Custom pattern value should not be empty.'
        );
        setDisableSave(true);
        setDisableNext(true);
      } else if (
        batchIdPatternPreviewLength !== undefined &&
        batchIdPatternPreviewLength > batchPatternMaxLength
      ) {
        setError(
          `Custom Batch Id pattern: Custom pattern length exceed ${batchPatternMaxLength} character.`
        );
        setDisableSave(true);
        setDisableNext(true);
      } else {
        setError('');
        setDisableSave(false);
        setDisableNext(false);
      }
    }

    if (batchIdPattern && batchIdPattern !== 'CustomizeBatchId') {
      setError('');
      setDisableSave(false);
      setDisableNext(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [BatchIdPatternContainerList, batchIdPattern]);

  /**
   * On recipe/formula set selection change set formfields-formulaSetName,
   * formulaParams, formulaSetId, isRecipebased
   */
  useEffect(() => {
    if (selectedMRFormulaSet) {
      setFieldValue(resourceManagement.campaignFormulaSetParameter.name, []);
      if (!selectedMRFormulaSet.isRecipeBased) {
        setFieldValue(
          campaignTypeFormField.formulaSetName.name,
          selectedMRFormulaSet.name ?? ''
        );
        setFieldValue(
          campaignTypeFormField.formulaSetId.name,
          selectedMRFormulaSet.id
        );

        resetRecipeClassBased();
      } else {
        setFieldValue(campaignTypeFormField.formulaSetName.name, '');
        setFieldValue(campaignTypeFormField.formulaSetId.name, '');
        isRecipeClassBasedForSCMRCM(selectedMRFormulaSet.recipeName);
      }
      setFieldValue(
        campaignTypeFormField.isRecipeBased.name,
        selectedMRFormulaSet.isRecipeBased
      );
      setFieldValue(
        campaignTypeFormField.recipeName.name,
        selectedMRFormulaSet.recipeName ?? ''
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMRFormulaSet]);

  /**
   * Fetch max simultaneous batch on formula set/recipe selection change
   */
  useEffect(() => {
    if (selectedMRFormulaSet) {
      fetchMaxSimultaneousBatch(selectedMRFormulaSet.recipeName ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMRFormulaSet]);

  /**
   * On formula set id change fetch formula ids
   */
  useEffect(() => {
    if (formulaSetId && formulaSetId !== AppConstants.EMPTY_GUID) {
      fetchFormulaIds(formulaSetId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formulaSetId]);

  /**
   * On formula set id change reset selected formula
   */
  useEffect(() => {
    if (formulaSetId && formulaSetId !== AppConstants.EMPTY_GUID) {
      setFieldValue(campaignTypeFormField.formulaId.name, null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formulaSetId]);

  /**
   * On formulaset/recipe selection fetch batch size,ref batches and yield params
   */
  useEffect(() => {
    if (actionState === 'loading' || actionState === 'error') {
      return;
    }
    if (selectedMRFormulaSet) {
      const payload: PayloadForBatch = {
        ...payloadForBatch,
        recipeName: selectedMRFormulaSet.recipeName ?? '',
        id:
          mode === 'edit' &&
          ((campaign.isRecipeBased &&
            selectedMRFormulaSet.recipeName === campaign.recipeName) ||
            (!campaign.isRecipeBased &&
              selectedMRFormulaSet.id === campaign.formulaSetId))
            ? campaign.id
            : null,
      };
      setSelectionUnitsEdited(false);
      setFieldValue(unitSelectionFormField.campaignUnitSelection.name, []);
      setFormulaParamterEdited(false);
      fetchBatchSize(payload);
      fetchRefBatches(payload);
      fetchReportParams(payload);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMRFormulaSet, mode, campaign.id, actionState]);

  /**
   * when coming in edit mode, then set payload for batch and
   * fetch formula ids batch size,ref batches and yield params
   */
  useEffect(() => {
    if (mode === 'edit' && campaign.id) {
      const payload: PayloadForBatch = {
        ...payloadForBatch,
        formulaId: campaign.formulaId || null,
        isRecipeBased: campaign.isRecipeBased,
        recipeName: campaign.recipeName ?? '',
        defaultBatchSize:
          campaign.defaultBatchSize && +campaign.defaultBatchSize,
        currentBatchSize:
          campaign.currentBatchSize && +campaign.currentBatchSize,
        productionQty: campaign.productionQty && +campaign.productionQty,
        batchIdPattern: campaign.batchIdPattern ?? '',
        id: campaign.id || null,
        isLastBatchScaled: campaign.isLastBatchScaled,
        minimumBatchSize: campaign.minimumBatchSize,
        noOfBatches: campaign.noOfBatches,
        rawMaterialParameterId: campaign.rawMaterialParameterId,
        rawMaterialQty: campaign.rawMaterialQty,
        campaignType: campaign.campaignType,
      };
      setPayloadForBatch(payload);
      setRecipeFormulaSet(campaign);
      // if (!campaign.isRecipeBased) {
      //   // setFormulaId(campaign.formulaId || '');
      //   // resetRecipeClassBased();
      //   fetchRecipeFormulaSet({
      //     formulaSetId: campaign.formulaSetId || AppConstants.EMPTY_GUID,
      //   });
      // } else {
      //   // setFormulaParamterEdited(true);
      //   fetchRecipeFormulaSet({
      //     formulaSetId: AppConstants.EMPTY_GUID,
      //     recipeName: campaign.recipeName || '',
      //   });
      //   // isRecipeClassBasedForSCMRCM(campaign.recipeName);

      //   // fetchFormulaParameters(payload);
      // }
      // setSelectionUnitsEdited(true);
      // fetchSelectionUnits(payload);
      fetchCampaignBatchIdPatternByCampaignId(campaign.id);

      if (campaignState !== null) {
        if (campaign.campaignType === CampaignType.NoOfBatches) {
          fetchMinimumNumberOfBatches(campaign.id);
        } else {
          fetchMinimumProductionQuantity(campaign.id);
        }
      }
      if (
        activeStep !== CampaignCreationStep.BasicSetup ||
        campaignState !== null
      ) {
        if (campaign.id && campaign.isRecipeBased) {
          setFormulaParamterEdited(true);
          fetchFormulaParameters({ ...payload });
        }
        if (campaign.id && !campaign.isUnitSelectionDeferred) {
          setSelectionUnitsEdited(true);
          fetchSelectionUnits({ ...payload });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, campaign.id]);
  // /**
  //  * fetch saved formula paramaters and unit selection after save for the update
  //  */
  // useEffect(() => {
  //   if (campaign.isRecipeBased) {
  //     if (formulaParams.some((s) => s.id === AppConstants.EMPTY_GUID)) {
  //       return;
  //     }
  //   }

  //   if (selectionUnits.some((s) => s.id === AppConstants.EMPTY_GUID)) {
  //     return;
  //   }
  //   if (mode === 'edit' && campaign.id) {
  //     setFieldValue(
  //       unitSelectionFormField.campaignUnitSelection.name,
  //       selectionUnits
  //     );
  //     if (campaign.isRecipeBased) {
  //       setFieldValue(
  //         resourceManagement.campaignFormulaSetParameter.name,
  //         formulaParams
  //       );
  //     } else {
  //       setFieldValue(resourceManagement.campaignFormulaSetParameter.name, []);
  //     }
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [mode, campaign.id, formulaParams, selectionUnits]);

  /**
   * when coming in edit mode, fetch formula parameters if not changed
   */
  // useEffect(() => {
  //   if (formulaParamsEdited) {
  //     return;
  //   }
  //   if (
  //     activeStep === CampaignCreationStep.BasicSetup &&
  //     campaignState === null
  //   ) {
  //     return;
  //   }
  //   if (campaign.id && campaign.isRecipeBased) {
  //     setFormulaParamterEdited(true);
  //     fetchFormulaParameters({ ...payloadForBatch, id: campaign.id });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [campaign.id, formulaParamsEdited]);
  /**
   * when coming in edit mode, fetch selection units if not changed
   */
  // useEffect(() => {
  //   if (selectionUnitsEdited) {
  //     return;
  //   }
  //   if (
  //     activeStep === CampaignCreationStep.BasicSetup &&
  //     campaignState === null
  //   ) {
  //     return;
  //   }
  //   if (campaign.id && !campaign.isUnitSelectionDeferred) {
  //     setSelectionUnitsEdited(true);
  //     fetchSelectionUnits({ ...payloadForBatch, id: campaign.id });
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [campaign.id, selectionUnitsEdited]);

  /**
   * when formulaParams and recipe based set form field
   */
  useEffect(() => {
    if (isRecipeBased && formulaParams.length) {
      setFieldValue(
        resourceManagement.campaignFormulaSetParameter.name,
        formulaParams
      );
    } else {
      setFieldValue(resourceManagement.campaignFormulaSetParameter.name, []);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRecipeBased, formulaParams]);

  /**
   * if there is some user change in the selection then don't override with data fetch
   */
  useEffect(() => {
    // if (selectionUnitsEdited) {
    //   return;
    // }
    if (!isUnitSelectionDeferred && selectionUnits.length > 0) {
      setFieldValue(
        unitSelectionFormField.campaignUnitSelection.name,
        selectionUnits
      );
    } else {
      setFieldValue(unitSelectionFormField.campaignUnitSelection.name, []);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectionUnits, isUnitSelectionDeferred]);

  /**
   * On formula selection set formula id in redux store
   */
  useEffect(() => {
    if (formulaId) {
      setFormulaId(formulaId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formulaId]);

  /**
   * On formula selection set formula name form field
   */
  useEffect(() => {
    if (formulaSelected) {
      setFieldValue(
        campaignTypeFormField.formulaName.name,
        formulaSelected.name ?? ''
      );
      setFieldValue(campaignTypeFormField.formulaId.name, formulaSelected.id);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formulaSelected]);

  /**
   * Update Payload for batch on every paramter change
   */
  useEffect(() => {
    setPayloadForBatch({
      ...payloadForBatch,
      formulaId: isRecipeBased ? '' : formulaId,
      campaignType,
      isRecipeBased,
      recipeName,
      defaultBatchSize: defaultBatchSize && +defaultBatchSize,
      currentBatchSize: currentBatchSize && +currentBatchSize,
      productionQty:
        // eslint-disable-next-line no-nested-ternary
        batchSizeEngUnit === '%'
          ? null
          : // eslint-disable-next-line no-nested-ternary
          campaignType === CampaignType.NoOfBatches
          ? noOfBatches && currentBatchSize
            ? +noOfBatches * +currentBatchSize
            : 0
          : productionQty && +productionQty,
      batchIdPattern,
      id: newCampaignId || null,
      isLastBatchScaled,
      minimumBatchSize: isLastBatchScaled ? minimumBatchSize : null,
      noOfBatches:
        campaignType === CampaignType.NoOfBatches ? noOfBatches : null,
      rawMaterialParameterId:
        campaignType === CampaignType.RawMaterialConsumption
          ? rawMaterialParameterId
          : null,
      rawMaterialQty:
        campaignType === CampaignType.RawMaterialConsumption
          ? rawMaterialQty
          : null,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    campaignType,
    formulaId,
    recipeName,
    productionQty,
    batchIdPattern,
    defaultBatchSize,
    currentBatchSize,
    isLastBatchScaled,
    minimumBatchSize,
    isRecipeBased,
    noOfBatches,
    rawMaterialParameterId,
    newCampaignId,
    batchSizeEngUnit,
    rawMaterialQty,
  ]);

  /**
   * When batch EU is % then only No. of batche campaign type is allowed
   */
  useEffect(() => {
    if (maxSimulataneousBatch !== null && maxSimulataneousBatch < 1) {
      setDisableNext(true);
      setDisableSave(true);
      setError("You can't create campaign as max owners are less than 1");
    } else {
      setError('');
      setDisableSave(false);
      setDisableNext(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxSimulataneousBatch]);
  /**
   * when new batch size from api comes, change the form fields
   */
  useEffect(() => {
    if (batchSize) {
      setFieldValue(
        campaignTypeFormField.batchSizeEngUnit.name,
        batchSize.batchSizeEngUnit ?? ''
      );
      setFieldValue(
        campaignTypeFormField.defaultBatchSize.name,
        batchSize.defaultBatchSize
      );
      setFieldValue(
        campaignTypeFormField.currentBatchSize.name,
        batchSize.currentBatchSize
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchSize]);

  /**
   * when isLastBatchScaled, set min batch size
   */
  useEffect(() => {
    if (!isLastBatchScaled) {
      setFieldValue(campaignTypeFormField.minimumBatchSize.name, null);
    }
    if (minimumBatchSize) {
      return;
    }
    setFieldValue(
      campaignTypeFormField.minimumBatchSize.name,
      batchSize?.currentBatchSize
    );
    setFieldTouched(campaignTypeFormField.minimumBatchSize.name, true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchSize, isLastBatchScaled]);

  // /**
  //  * when min batch size is valid, reset min batch error
  //  */
  // useEffect(() => {
  //   if (
  //     minimumBatchSize &&
  //     currentBatchSize &&
  //     +minimumBatchSize <= +currentBatchSize
  //   ) {
  //     setFieldError(campaignTypeFormField.minimumBatchSize.name, undefined);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [minimumBatchSize, currentBatchSize]);
  /**
   * Function to handler back button
   */
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Modal
      open={open}
      // closeIcon
      closeOnDimmerClick={false}
      closeOnDocumentClick={false}
      // onClose={onClose}
      className="medium"
    >
      <Form
        id={formId}
        autoComplete="off"
        onKeyDown={(e) => {
          if (e.key === AppConstants.ENTER_KEY) {
            e.preventDefault();
          }
        }}
        onKeyPress={(e) => {
          if (e.key === AppConstants.ENTER_KEY) {
            e.preventDefault();
          }
        }}
      >
        {/* <Modal.Header className="flex-column">
          <p className="m-0">
            {mode === 'add' ? 'Create Campaign' : 'Edit Campaign'}
          </p>
          <Stepper
            steps={campaignSteps}
            activeStep={activeStep}
            disabledSteps={0}
          />
        </Modal.Header> */}
        <Modal.Content
          scrolling={false}
          className="overflow-x-hidden content-min-height"
        >
          <Card>
            <Card.Content>
              <div className="p-4">
                <div className="d-flex justify-content-between">
                  <PageTitle
                    content={
                      mode === 'add' ? 'Create Campaign' : 'Edit Campaign'
                    }
                  />
                  <Icon
                    name="close"
                    root="common"
                    className="cursor-pointer font-size-l7-rem-force"
                    onClick={onClose}
                  />
                </div>
                <Stepper
                  steps={campaignSteps}
                  activeStep={activeStep}
                  disabledSteps={0}
                />
                {renderStepContent(activeStep)}{' '}
                <div className="d-flex w-100 justify-content-start ml-2 mb-4">
                  {error ? (
                    <>
                      <span className="text-danger ml-0">
                        {typeof error === 'object' && error !== null
                          ? JSON.stringify(error)
                          : error}
                      </span>
                    </>
                  ) : null}
                </div>
              </div>
            </Card.Content>
          </Card>
        </Modal.Content>
        <Modal.Footer className="pt-0">
          <EditCampaignActions
            step={activeStep}
            isLastStep={isLastStep}
            handleBack={handleBack}
          />
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
