export const campaignFormModel = {
  formId: 'editCampaignForm',
  campaignTypeFormField: {
    state: {
      name: 'state',
    },
    isRecipeBased: {
      name: 'isRecipeBased',
      label: 'Type',
    },
    formulaSetId: {
      name: 'formulaSetId',
      label: 'Formula Set',
      requiredErrorMsg: 'Please select formula set',
    },
    formulaSetName: {
      name: 'formulaSetName',
      label: 'Formula Set',
    },
    formulaId: {
      name: 'formulaId',
      label: 'Formula',
      requiredErrorMsg: 'Please select formula',
    },
    formulaName: {
      name: 'formulaName',
      label: 'Formula',
    },
    recipeName: {
      name: 'recipeName',
      label: 'Recipe',
      requiredErrorMsg: 'Please select recipe',
      placeholder: 'Search Recipe',
    },
    campaignType: {
      name: 'campaignType',
      label: 'Campaign Type',
      requiredErrorMsg: 'Please select campaign type',
    },
    productionQty: {
      name: 'productionQty',
      label: 'Quantity',
      hintText: 'Ltrs',
      requiredErrorMsg: 'Please enter quantity',
    },
    rawMaterial: {
      name: 'rawMaterial',
      label: 'Selected raw material',
      requiredErrorMsg: 'Please select raw material',
    },
    rawMaterialParameterId: {
      name: 'rawMaterialParameterId',
    },
    rawMaterialQty: {
      name: 'rawMaterialQty',
      label: 'Planned raw material quantity',
      requiredErrorMsg: 'Please enter quantity',
    },
    rawMaterialEngUnit: {
      name: 'rawMaterialEngUnit',
    },
    noOfBatches: {
      name: 'noOfBatches',
      label: 'No. of batches',
      requiredErrorMsg: 'Please enter no. of batches',
    },
    campaignRefId: {
      name: 'campaignRefId',
      label: 'Campaign ID',
      requiredErrorMsg: 'Please enter campaign id',
      duplicateErrorMsg: 'Entered campaign id currently in use',
    },
    defaultBatchSize: {
      name: 'defaultBatchSize',
    },
    minimumBatchSize: {
      name: 'minimumBatchSize',
      label: 'Minimum batch size',
      requiredErrorMsg: 'Please enter min batch size',
    },

    batchSizeEngUnit: {
      name: 'batchSizeEngUnit',
    },
    currentBatchSize: {
      name: 'currentBatchSize',
      label: 'Batch size',
      requiredErrorMsg: 'Please enter batch size',
    },
    referenceBatch: {
      name: 'referenceBatch',
      label: 'Reference Batch',
      requiredErrorMsg: '',
    },
    isLastBatchScaled: {
      name: 'isLastBatchScaled',
      label: 'Scale last batch',
      helpText: 'Last batch scaled',
      requiredErrorMsg: '',
    },
    yieldParameter: {
      name: 'yieldParameter',
      label: 'Yield Parameter',
      requiredErrorMsg: 'Invalid parameter',
    },
  },
  campaignDetailsFormField: {
    campaignBatchIdPattern: {
      name: 'campaignBatchIdPattern',
      label: 'Campaign BatchId Pattern',
    },
    BatchIdPatternPreview: {
      name: 'BatchIdPatternPreview',
      label: 'BatchId Pattern Preview',
    },
    batchIdPatternPreviewLength: {
      name: 'batchIdPatternPreviewLength',
      label: 'BatchId Pattern Preview Length',
    },
    BatchIdPatternContainerList: {
      name: 'BatchIdPatternContainerList',
      label: 'BatchId Pattern List',
    },
    batchIdPattern: {
      name: 'batchIdPattern',
      label: 'Batch ID',
      requiredErrorMsg: 'Please enter batch ID pattern',
      placeholder: 'Select batch ID pattern',
    },
    batchStartMethod: {
      name: 'batchStartMethod',
      label: 'Batch start method',
      requiredErrorMsg: 'Please select batch start method',
    },
    simultaneousBatches: {
      name: 'simultaneousBatches',
      label: 'Simultaneous Batches',
      requiredErrorMsg: 'Please enter simultaneous batches',
      placeholder: 'Enter 1-10 batches',
    },
    isScheduledCampaign: {
      name: 'isScheduledCampaign',
      label: 'Schedule Campaign',
    },
    startTime: {
      name: 'startTime',
      label: 'Start Time',
      placeholder: 'Pick start time',
      requiredErrorMsg: 'Start time is required',
    },
  },
  resourceManagement: {
    campaignFormulaSetParameter: {
      name: 'campaignFormulaSetParameter',
    },
    paramType: {
      name: 'paramType',
    },
    defaultValue: {
      name: 'defaultValue',
    },
    minValue: {
      name: 'minValue',
    },
    maxValue: {
      name: 'maxValue',
    },
  },
  unitSelectionFormField: {
    isUnitSelectionDeferred: {
      name: 'isUnitSelectionDeferred',
      label: 'Unit selection',
    },
    campaignUnitSelection: {
      name: 'campaignUnitSelection',
    },
  },
  reviewFormField: {
    campaignBatches: {
      name: 'campaignBatches',
    },
  },
};
export type CampaignFormModelType = typeof campaignFormModel;
export type CampaignDetailsFormModelType = typeof campaignFormModel.campaignDetailsFormField;
export type CampaignTypeFormModelType = typeof campaignFormModel.campaignTypeFormField;
export type SelectionUnitsFormModelType = typeof campaignFormModel.unitSelectionFormField;
export type ResourceManagementFormModelType = typeof campaignFormModel.resourceManagement;
// const campaignTypeFormFields = pick(campaignFormModel.campaignTypeFormField, [
//   'formulaSetId',
//   'formulaId',
//   'campaignType',
//   'productionQty',
//   'campaignRefId',
//   'defaultBatchSize',
//   'referenceBatch',
//   'isLastBatchScaled',
// ]);
export const campaignTypeFormFieldsKeys = Object.keys(
  campaignFormModel.campaignTypeFormField
);
// const campaignDetailFormFields = pick(campaignFormModel.formField, [
//   'batchIdPattern',
//   'batchStartMethod',
//   'isScheduledCampaign',
//   'simultaneousBatches',
//   'startTime',
// ]);
export const campaignDetailFormFieldsKeys = Object.keys(
  campaignFormModel.campaignDetailsFormField
);
