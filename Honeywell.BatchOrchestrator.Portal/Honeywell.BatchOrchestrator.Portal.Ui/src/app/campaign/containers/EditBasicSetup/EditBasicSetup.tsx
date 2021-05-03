/* eslint-disable no-nested-ternary */
import { Tab, Footer, Button } from '@scuf/common';
// eslint-disable-next-line import/named
import {
  // eslint-disable-next-line import/named
  campaignDetailFormFieldsKeys,
  campaignFormModel,
  CampaignFormModelType,
  // eslint-disable-next-line import/named
  campaignTypeFormFieldsKeys,
} from 'app/campaign/models/campaignFormModel';
import { useFormikContext } from 'formik';
import { Campaign } from 'app/campaign/models/campaign';
import { useEffect, useState } from 'react';
import { PayloadForBatch } from 'app/campaign/models/batch-size';
import { CampaignType } from 'app/campaign/models/campaign-type';
import { CampaignBatchIdPattern } from 'app/campaign/models/campaign-batchId-pattern';
import { lazyLoad } from 'utils/loadable';
import { BatchStartMethod } from 'app/campaign/models/campaign-start-method';
import { CampaignTypeForm, CampaignDetailsForm } from '../../components';
import { useCampaignFacade } from '+store/campaign';
import { RawMaterialSelection } from '../RawMaterialSelection/RawMaterialSelection';
import { RecipeFormulaSetSelection } from '../RecipeFormulaSetModal/RecipeFormulaSetSelection/RecipeFormulaSetSelection';

const RawMaterialSelectionContainer = lazyLoad(
  () => import('../RawMaterialSelection/RawMaterialSelection'),
  (page) => page.RawMaterialSelection
);
export const EditBasicSetup: React.FC = () => {
  const {
    campaignTypeFormField,
    campaignDetailsFormField,
    resourceManagement,
  } = campaignFormModel;
  const [selectedTab, setSelectedTab] = useState(0);
  const {
    selectedMRFormulaSet,
    recipeClassBased,
    formulaIds,
    batchSize,
    mode,
    refBatches,
    formulaSelected,
    reportParams,
    campaignFieldDisabled,
    selectedRawMaterial,
    batchIdPatterns,
    navigationFrom,
    setFormulaId,
    fetchBatchIdPatterns,
    setSelectedRawMaterial,
  } = useCampaignFacade();
  const {
    values: {
      isRecipeBased,
      formulaSetId,
      formulaId,
      defaultBatchSize,
      currentBatchSize,
      batchSizeEngUnit,
      productionQty,
      batchIdPattern,
      recipeName,
      campaignType,
      isScheduledCampaign: scheduledCampaign,
      isLastBatchScaled,
      minimumBatchSize,
      noOfBatches,
      rawMaterialParameterId,
      campaignBatchIdPattern,
      batchStartMethod,
      campaignRefId,
      rawMaterialEngUnit,
    },
    errors,
    values,
    touched,
    submitCount,
    setFieldValue,
    resetForm,
  } = useFormikContext<Campaign>();
  const errorsKeys = Object.keys(errors);
  const errorsCampaignTypes = errorsKeys.filter((item) =>
    campaignTypeFormFieldsKeys.includes(item)
  );
  const errorsCampaignDetails = errorsKeys.filter((item) =>
    campaignDetailFormFieldsKeys.includes(item)
  );
  const [showRawMaterials, setshowRawMaterials] = useState(false);
  const [showMRFormulaSelection, setMRFormulaSelection] = useState(false);

  /**
   * fetch list of batch patterns from appsetting table through redux store
   */
  useEffect(() => {
    const tempValues = { ...values };
    if (
      campaignRefId.length > 0 &&
      recipeName.length > 0 &&
      selectedTab === 1
    ) {
      const value: CampaignBatchIdPattern = {
        id:
          campaignBatchIdPattern?.id === undefined
            ? null
            : campaignBatchIdPattern?.id,
        campaignId: campaignBatchIdPattern?.campaignId
          ? campaignBatchIdPattern?.campaignId
          : null,
        patternConfig:
          campaignBatchIdPattern?.patternConfig === undefined ||
          campaignBatchIdPattern?.patternConfig === ''
            ? 'default'
            : campaignBatchIdPattern?.patternConfig,
      };
      tempValues.campaignBatchIdPattern = value;
      tempValues.batchIdPattern = 'default';
      fetchBatchIdPatterns(tempValues);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab]);

  /**
   * change default batch size every time current batch size changes
   */
  // useEffect(() => {
  //   if (currentBatchSize && +currentBatchSize > 0) {
  //     setFieldValue(
  //       campaignTypeFormField.defaultBatchSize.name,
  //       +currentBatchSize
  //     );
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [currentBatchSize]);

  /**
   * if campaign type is Continuous camapign then production quantity = current batch size
   */
  useEffect(() => {
    if (currentBatchSize && +currentBatchSize > 0) {
      if (campaignType === CampaignType.ContinuousCampaign) {
        setFieldValue(
          campaignTypeFormField.productionQty.name,
          +currentBatchSize
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBatchSize, campaignType]);

  /**
   * if campaign type is Continuous camapign then simultaneous batch = 1
   * if recipe is not class based then simultaneous batch = 1
   * if formulaSet is not class based  then simultaneous batch = 1
   * if batch start method is automatic  then simultaneous batch = 1
   */
  useEffect(() => {
    if (campaignType === CampaignType.ContinuousCampaign) {
      setFieldValue(campaignDetailsFormField.simultaneousBatches.name, 1);
    }
    if (
      selectedMRFormulaSet &&
      !selectedMRFormulaSet.isRecipeBased &&
      !selectedMRFormulaSet.isClassBased
    ) {
      setFieldValue(campaignDetailsFormField.simultaneousBatches.name, 1);
    }
    if (
      selectedMRFormulaSet &&
      selectedMRFormulaSet.isRecipeBased &&
      !recipeClassBased
    ) {
      setFieldValue(campaignDetailsFormField.simultaneousBatches.name, 1);
    }
    if (batchStartMethod === BatchStartMethod.AutomaticStart) {
      setFieldValue(campaignDetailsFormField.simultaneousBatches.name, 1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignType, selectedMRFormulaSet, batchStartMethod]);

  /**
   * Set start time equals to null
   *  when schedule campaign is not checked
   */
  useEffect(() => {
    if (!scheduledCampaign) {
      setFieldValue(campaignDetailsFormField.startTime.name, null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scheduledCampaign]);

  /**
   * Set last scale batch on campaign type change
   */
  useEffect(() => {
    if (
      campaignType !== CampaignType.ProductionQuantity &&
      campaignType !== CampaignType.RawMaterialConsumption
    ) {
      setFieldValue(campaignTypeFormField.isLastBatchScaled.name, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaignType]);

  // /**
  //  * On Raw material selection set eng unit as per raw material else as per formula/recipe batch eng unit
  //  */
  // useEffect(() => {
  //   if (campaignType === CampaignType.RawMaterialConsumption) {
  //     setFieldValue(
  //       campaignTypeFormField.batchSizeEngUnit.name,
  //       selectedRawMaterial?.engUnit
  //     );
  //   } else {
  //     setFieldValue(
  //       campaignTypeFormField.batchSizeEngUnit.name,
  //       batchSize?.batchSizeEngUnit
  //     );
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedRawMaterial, campaignType, batchSize]);

  /**
   * On Raw material selection set form fields required for raw material type
   */
  useEffect(() => {
    if (selectedRawMaterial) {
      setFieldValue(
        campaignTypeFormField.rawMaterial.name,
        selectedRawMaterial.description ?? ''
      );
      setFieldValue(
        campaignTypeFormField.rawMaterialParameterId.name,
        selectedRawMaterial.id
      );
      setFieldValue(
        campaignTypeFormField.rawMaterialEngUnit.name,
        selectedRawMaterial.engUnit ?? ''
      );

      // if (!productionQty) {
      //   setFieldValue(
      //     campaignTypeFormField.productionQty.name,
      //     selectedRawMaterial.totalQuantityForCampaign
      //   );
      // }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRawMaterial]);

  const isCustumizeBatchPattern = (status) => {
    if (!status) {
      setFieldValue(campaignDetailsFormField.batchIdPattern.name, '');
    }
  };
  const setCampaignBatchIdPattern = (patternString) => {
    if (patternString !== '') {
      const value: CampaignBatchIdPattern = {
        id: campaignBatchIdPattern?.id,
        campaignId: campaignBatchIdPattern?.campaignId
          ? campaignBatchIdPattern?.campaignId
          : null, // '00000000-0000-0000-0000-000000000000',
        patternConfig: patternString,
      };

      setFieldValue(
        campaignDetailsFormField.campaignBatchIdPattern.name,
        value
      );
    }
  };
  useEffect(() => {
    if (batchIdPattern) {
      // eslint-disable-next-line array-callback-return
      batchIdPatterns.map((item) => {
        if (item.value === batchIdPattern) {
          setCampaignBatchIdPattern(item.patternJson);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchIdPattern]);

  return (
    <Tab
      activeIndex={selectedTab}
      onTabChange={setSelectedTab}
      className="mb-0"
    >
      <Tab.Pane
        title="Campaign type"
        badgeColor="red"
        badge={
          (submitCount > 0 || mode === 'edit') && errorsCampaignTypes.length > 0
            ? errorsCampaignTypes.length.toString()
            : ''
        }
      >
        {showRawMaterials ? (
          <RawMaterialSelectionContainer
            onHideRawMaterials={() => setshowRawMaterials(false)}
          />
        ) : showMRFormulaSelection ? (
          <RecipeFormulaSetSelection
            on="view"
            onClose={(flag) => {
              setMRFormulaSelection(false);
              if (flag) {
                setFieldValue(campaignTypeFormField.campaignType.name, null);
                setSelectedRawMaterial(null);
                setFieldValue(
                  campaignTypeFormField.rawMaterialParameterId.name,
                  null
                );
                setFieldValue(campaignTypeFormField.rawMaterial.name, '');
              }
            }}
          />
        ) : (
          <CampaignTypeForm
            navigationFrom={navigationFrom}
            formModel={campaignTypeFormField}
            formulaIds={formulaIds}
            batchSize={batchSize}
            refBatches={refBatches}
            reportParams={reportParams}
            fieldDisabled={campaignFieldDisabled}
            onShowRawMaterials={() => {
              setshowRawMaterials(true);
            }}
            onShowMRFormulaSelection={() => {
              setMRFormulaSelection(true);
            }}
          />
        )}
      </Tab.Pane>
      <Tab.Pane
        title="Campaign details"
        badgeColor="red"
        badge={
          (submitCount > 0 || mode === 'edit') &&
          errorsCampaignDetails.length > 0
            ? errorsCampaignDetails.length.toString()
            : ''
        }
      >
        <CampaignDetailsForm
          formModel={campaignDetailsFormField}
          fieldDisabled={campaignFieldDisabled}
          batchIdPatternList={batchIdPatterns}
          isCustumizeBatchPattern={isCustumizeBatchPattern}
          setCampaignBatchIdPattern={setCampaignBatchIdPattern}
        />
      </Tab.Pane>
    </Tab>
  );
};
