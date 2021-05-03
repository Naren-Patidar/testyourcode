/* eslint-disable import/named */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Grid,
  Radio,
  Card,
  InputLabel,
  Button,
  Icon,
  Progress,
  Tooltip,
} from '@scuf/common';
import { Campaign } from 'app/campaign/models/campaign';
import { CampaignTypeFormModelType } from 'app/campaign/models/campaignFormModel';
import { useFormikContext } from 'formik';
import {
  InputField,
  SelectField,
  CheckboxField,
  NumberInputField,
} from 'shared/form-fields';
import { BatchSize } from 'app/campaign/models/batch-size';
import { IOption } from '@scuf/common/dist/components/Select/ISelectProps';
import styled from 'styled-components/macro';
import { FormulaParameter } from 'app/campaign/models/formula-parameter';
import { useDebouncedCallback } from 'use-debounce';
import { useEffect } from 'react';
import { CampaignType, campaignTypes } from '../../models/campaign-type';
import { useCampaignFacade } from '+store/campaign';

const LabeledWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const LabeledDiv = styled.div`
  background: #404040;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
`;
const Content = styled.div`
  padding: 4px;
  margin-left: 8px;
  flex-grow: 1;
`;
const ScrollableGrid = styled(Grid)`
  /* height: auto;
  overflow-y: auto; */
`;
const { Row, Column } = Grid;
type CampaignTypeFormProps = {
  formModel: CampaignTypeFormModelType;
  formulaIds: IOption[];
  batchSize: BatchSize | null;
  refBatches: IOption[];
  reportParams: IOption[];
  fieldDisabled: boolean;
  navigationFrom: 'formula' | 'campaign';
  onShowRawMaterials?: () => void;
  onShowMRFormulaSelection?: () => void;
};
export const CampaignTypeForm: React.FC<CampaignTypeFormProps> = (props) => {
  const {
    formModel: {
      isRecipeBased,
      formulaSetId,
      formulaId,
      recipeName,
      campaignType,
      productionQty,
      campaignRefId,
      currentBatchSize,
      minimumBatchSize,
      referenceBatch,
      isLastBatchScaled,
      yieldParameter,
      rawMaterial,
      noOfBatches,
      formulaSetName,
      formulaName,
      rawMaterialQty,
    },
    formulaIds,
    batchSize: batchSizeSource,
    refBatches,
    reportParams,
    fieldDisabled,
    navigationFrom,
    onShowMRFormulaSelection,
  } = props;
  const {
    values: {
      campaignType: campaignTypeValue,
      recipeName: recipeNameVal,
      formulaSetName: formulaSetNameVal,
      isRecipeBased: isRecipeBasedValue,
      isLastBatchScaled: isLastBatchScaledValue,
      rawMaterial: rawMaterialVal,
      batchSizeEngUnit,
      yieldParameter: yieldParameterVal,
      defaultBatchSize: defaultBatchSizeVal,
      formulaId: formulaIdVal,
      rawMaterialEngUnit,
    },
    setFieldValue,
    setFieldError,
  } = useFormikContext<Campaign>();
  const {
    yieldParameterValid,
    yieldParameterLoading,
    campaignInterimFieldDisabled,
    setFormulaId,
    isYieldParamValid,
    resetYieldParameterValidation,
    setDisableNext,
    setDisableSave,
    selectedRawMaterial,
    campaignRefIdExist,
    campaignRefIdExistLoading,
    resetCampaignRefIdExist,
    isCampaignReferenceIdExist,
  } = useCampaignFacade();

  // const onTypeChange = (val: boolean) => {
  //   setFieldValue(isRecipeBased.name, val);
  // };
  const validateYieldParam = (val: string) => {
    if (val.length > 0) {
      isYieldParamValid(val);
    } else {
      resetYieldParameterValidation();
    }
  };
  const debounced = useDebouncedCallback(validateYieldParam, 1000);
  const checkCampaignRefIdExists = (val: string) => {
    if (val.length > 0) {
      isCampaignReferenceIdExist(val);
    } else {
      resetCampaignRefIdExist();
    }
  };
  const debouncedCampaignRefIdExists = useDebouncedCallback(
    checkCampaignRefIdExists,
    1000
  );
  /**
   * set yield parameter validation error
   */
  useEffect(() => {
    if (!yieldParameterValid) {
      setFieldError(yieldParameter.name, yieldParameter.requiredErrorMsg);
    } else {
      setFieldError(yieldParameter.name, undefined);
    }
  }, [yieldParameterValid]);

  /**
   * set campaign ref id validation error
   */
  useEffect(() => {
    if (campaignRefIdExist !== null) {
      if (campaignRefIdExist) {
        setFieldError(campaignRefId.name, campaignRefId.duplicateErrorMsg);
      } else {
        setFieldError(campaignRefId.name, undefined);
      }
    }
  }, [campaignRefIdExist]);
  // const [type, setType] = useState(TypeValues.FormulaSet);
  return (
    <Card interactive className="m-0 mr-4 p-2 shadow-none">
      <Card.Content className="border">
        <ScrollableGrid className="my-4 p-0">
          <Row>
            <Column width={12} xsWidth={12}>
              <LabeledWrapper>
                <InputLabel
                  label={
                    isRecipeBasedValue ? recipeName.label : formulaSetName.label
                  }
                />
                <LabeledDiv>
                  <Content className="text-truncate">
                    {isRecipeBasedValue ? recipeNameVal : formulaSetNameVal}
                  </Content>
                  <div>
                    <Button
                      actionType="button"
                      content="Change selection"
                      size="small"
                      textTransform={false}
                      type="link"
                      onClick={onShowMRFormulaSelection}
                      disabled={
                        fieldDisabled ||
                        navigationFrom === 'formula' ||
                        campaignInterimFieldDisabled
                      }
                    />
                  </div>
                </LabeledDiv>
              </LabeledWrapper>
            </Column>
          </Row>
          {!isRecipeBasedValue && (
            <Row>
              <Column width={6} xsWidth={6}>
                <SelectField
                  name={formulaId.name}
                  placeholder="Please select formula"
                  label={formulaId.label}
                  options={formulaIds}
                  search
                  fluid
                  disabled={
                    fieldDisabled ||
                    navigationFrom === 'formula' ||
                    campaignInterimFieldDisabled
                  }
                />
              </Column>
            </Row>
          )}
          <Row>
            <Column width={6} xsWidth={6}>
              <SelectField
                name={campaignType.name}
                placeholder="Please select"
                label={campaignType.label}
                options={
                  isRecipeBasedValue
                    ? campaignTypes.filter(
                        (f) => f.value !== CampaignType.RawMaterialConsumption
                      )
                    : campaignTypes
                }
                fluid
                disabled={fieldDisabled || campaignInterimFieldDisabled}
              />
            </Column>

            {campaignTypeValue === CampaignType.ProductionQuantity && (
              <Column width={6} xsWidth={6}>
                <NumberInputField
                  name={productionQty.name}
                  label={productionQty.label}
                  placeholder={productionQty.label}
                  icon={<span>{batchSizeEngUnit}</span>}
                  min={1}
                  step={0.01}
                />
              </Column>
            )}
            {campaignTypeValue === CampaignType.NoOfBatches && (
              <Column width={6} xsWidth={6}>
                <NumberInputField
                  name={noOfBatches.name}
                  label={noOfBatches.label}
                  placeholder={noOfBatches.label}
                  min={1}
                  step={1}
                />
              </Column>
            )}
            {campaignTypeValue === CampaignType.RawMaterialConsumption && (
              <Column width={6} xsWidth={6}>
                <div className="mt-6">
                  <Button
                    actionType="button"
                    content={
                      rawMaterialVal
                        ? 'Change raw material'
                        : 'Select raw material'
                    }
                    size="small"
                    textTransform={false}
                    type="link"
                    onClick={props.onShowRawMaterials}
                    disabled={fieldDisabled || !formulaIdVal}
                  />
                  {!formulaIdVal && (
                    <Tooltip
                      content="Please select formula"
                      element={
                        <Icon
                          name="badge-info"
                          root="common"
                          className="ml-2"
                          size="small"
                        />
                      }
                      // position="top left"
                      event="hover"
                      hoverable
                    />
                  )}
                </div>
              </Column>
            )}
          </Row>
          {campaignTypeValue === CampaignType.RawMaterialConsumption && (
            <Row>
              <Column width={6} xsWidth={6}>
                <InputField
                  placeholder={rawMaterial.label}
                  label={rawMaterial.label}
                  name={rawMaterial.name}
                  fluid
                  disabled
                />
              </Column>
              <Column width={6} xsWidth={6}>
                <NumberInputField
                  name={rawMaterialQty.name}
                  label={rawMaterialQty.label}
                  placeholder="Enter quantity"
                  icon={<span>{rawMaterialEngUnit}</span>}
                  min={1}
                  step={0.01}
                />
              </Column>
            </Row>
          )}

          <Row>
            <Column width={6} xsWidth={6}>
              <InputField
                placeholder={campaignRefId.label}
                label={campaignRefId.label}
                name={campaignRefId.name}
                type="text"
                fluid
                disabled={fieldDisabled}
                icon={
                  <Button
                    actionType="button"
                    size="small"
                    type="link"
                    content=""
                    className="p-0 right-0"
                    loading={campaignRefIdExistLoading}
                  />
                }
                onChange={(val) => {
                  if (val) {
                    setDisableNext(true);
                    setDisableSave(true);
                  }
                  debouncedCampaignRefIdExists(val);
                }}
              />
            </Column>
            <Column width={6} xsWidth={6}>
              {/* <div className="d-flex"> */}
              <NumberInputField
                name={currentBatchSize.name}
                placeholder={currentBatchSize.label}
                label={currentBatchSize.label}
                disabled={fieldDisabled}
                helperText={
                  defaultBatchSizeVal
                    ? `Default batch size is ${defaultBatchSizeVal} ${batchSizeEngUnit}`
                    : undefined
                }
                icon={<span>{batchSizeEngUnit}</span>}
                min={1}
                step={0.01}
              />
              {/* <div className="d-flex align-items-center ml-2">
                  {batchSizeEngUnit}
                </div> */}
              {/* </div> */}
            </Column>
          </Row>
          <Row>
            <Column width={6} xsWidth={6}>
              <SelectField
                name={referenceBatch.name}
                placeholder="Select reference batch"
                label={referenceBatch.label}
                options={refBatches}
                search
                indicator="optional"
                fluid
                disabled={fieldDisabled}
              />
            </Column>
            <Column width={6} xsWidth={6}>
              {campaignTypeValue === CampaignType.ProductionQuantity ||
              campaignTypeValue === CampaignType.RawMaterialConsumption ? (
                <div className="d-flex flex-column">
                  <div className="visibility-hidden">
                    <InputLabel label={isLastBatchScaled.helpText} />
                  </div>

                  <CheckboxField
                    name={isLastBatchScaled.name}
                    label={isLastBatchScaled.label}
                    disabled={fieldDisabled}
                  />
                </div>
              ) : null}
            </Column>
          </Row>
          <Row>
            <Column width={6} xsWidth={6}>
              <InputField
                name={yieldParameter.name}
                placeholder="Enter Yield Parameter"
                label={yieldParameter.label}
                indicator="optional"
                fluid
                disabled={fieldDisabled}
                icon={
                  <Button
                    actionType="button"
                    size="small"
                    type="link"
                    content=""
                    className="p-0 right-0"
                    loading={yieldParameterLoading}
                  />
                }
                onChange={(val) => {
                  if (val) {
                    setDisableNext(true);
                    setDisableSave(true);
                  }
                  debounced(val);
                }}
              />
              {/* <SelectField
                name={yieldParameter.name}
                placeholder="Select Yield Parameter"
                label={yieldParameter.label}
                options={reportParams}
                search
                indicator="optional"
                fluid
                disabled={fieldDisabled}
              /> */}
            </Column>
            <Column width={6}>
              {isLastBatchScaledValue ? (
                <NumberInputField
                  name={minimumBatchSize.name}
                  placeholder={minimumBatchSize.label}
                  label={minimumBatchSize.label}
                  disabled={fieldDisabled}
                  icon={<span>{batchSizeEngUnit}</span>}
                  min={1}
                  step={0.01}
                />
              ) : null}
            </Column>
          </Row>
        </ScrollableGrid>
      </Card.Content>
    </Card>
  );
};
