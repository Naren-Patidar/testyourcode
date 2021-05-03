/* eslint-disable array-callback-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-unneeded-ternary */

import { useState, useEffect } from 'react';
import { Grid, InputLabel, Card, Button, Icon, Tooltip } from '@scuf/common';
import { IOption } from '@scuf/common/dist/components/Select/ISelectProps';
import { Campaign, CampaignStateValues } from 'app/campaign/models/campaign';
import { CampaignType } from 'app/campaign/models/campaign-type';
// eslint-disable-next-line import/named
import { CampaignDetailsFormModelType } from 'app/campaign/models/campaignFormModel';
import { useFormikContext } from 'formik';
import {
  InputField,
  SelectField,
  CheckboxField,
  DatePickerField,
  NumberInputField,
} from 'shared/form-fields';
import styled from 'styled-components/macro';
import { PatternRow } from 'shared/batch-patterns/pattern';
import { PatternBatch } from 'shared/batch-patterns/batch-pattern-row';
import 'shared/batch-patterns/patterns.scss';
// eslint-disable-next-line import/named
import {
  BatchStartMethod,
  batchStartMethods,
} from '../../models/campaign-start-method';
import { useCampaignFacade } from '+store/campaign';

const ScrollableGrid = styled(Grid)`
  /* height: auto;
  overflow-y: auto; */
`;
const { Row, Column } = Grid;
type CampaignDetailsFormProps = {
  formModel: CampaignDetailsFormModelType;
  fieldDisabled: boolean;
  batchIdPatternList: IOption[];
  isCustumizeBatchPattern: (status) => void;
  setCampaignBatchIdPattern: any;
};

export const CampaignDetailsForm: React.FC<CampaignDetailsFormProps> = (
  props
) => {
  const {
    values: {
      isScheduledCampaign: scheduledCampaign,
      batchStartMethod: batchStartMethodVal,
      simultaneousBatches: simultaneousBatchesVal,
      campaignType: campaignTypeValue,
      batchIdPattern: batchIdPatternVal,
      campaignBatchIdPattern,
      id,
      recipeName,
      formulaName,
      campaignRefId,
      BatchIdPatternContainerList,
      BatchIdPatternPreview,
      state: campaignState,
      isRecipeBased,
    },
    setFieldValue,
  } = useFormikContext<Campaign>();
  // const timePickerRef = useRef(null);
  const {
    formModel: {
      batchIdPattern,
      batchStartMethod,
      isScheduledCampaign,
      simultaneousBatches,
      startTime,
    },
    formModel,
    fieldDisabled,
    batchIdPatternList,
    isCustumizeBatchPattern,
    setCampaignBatchIdPattern,
  } = props;
  const {
    selectedMRFormulaSet,
    recipeClassBased,
    maxSimulataneousBatch,
  } = useCampaignFacade();

  const [isBatchPatternPreview, setIsBatchPatternPreview] = useState(false);
  const [batchPatternEdit, setBatchPatternEdit] = useState(true);
  const [pattternPreviewAtEdit, setPattternPreviewAtEdit] = useState('');
  const [pattternPreviewLength, setPattternPreviewLength] = useState(0);

  const [disableSimultaeous, setDisableSimultaeous] = useState(false);
  const [infoDisable, setInfoDisable] = useState('');
  const [infoBatchStartDisable, setInfoBatchStartDisable] = useState('');
  const [batchPatternProp, setBatchPatternProp] = useState([] as any);

  /**
   * set simultaneous batch disable on diff scenario
   */
  useEffect(() => {
    setDisableSimultaeous(
      (selectedMRFormulaSet &&
        !selectedMRFormulaSet.isRecipeBased &&
        !selectedMRFormulaSet.isClassBased) ||
        (recipeClassBased !== null && !recipeClassBased) ||
        batchStartMethodVal === BatchStartMethod.AutomaticStart ||
        campaignTypeValue === CampaignType.ContinuousCampaign
    );
  }, [
    batchStartMethodVal,
    campaignTypeValue,
    selectedMRFormulaSet,
    recipeClassBased,
  ]);

  /**
   * set simultaneous batch disable tooltip on diff scenario
   */
  useEffect(() => {
    if (disableSimultaeous) {
      if (batchStartMethodVal === BatchStartMethod.AutomaticStart) {
        setInfoDisable('Restricted: Batch start method is automatic');
      } else if (campaignTypeValue === CampaignType.ContinuousCampaign) {
        setInfoDisable('Restricted: Campaign type is continuous');
      } else if (
        selectedMRFormulaSet &&
        !selectedMRFormulaSet.isRecipeBased &&
        !selectedMRFormulaSet.isClassBased
      ) {
        setInfoDisable('Restricted: Recipe is not class based');
      } else if (recipeClassBased !== null && !recipeClassBased) {
        setInfoDisable('Restricted: Recipe is not class based');
      }
    } else {
      setInfoDisable('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    disableSimultaeous,
    batchStartMethodVal,
    campaignTypeValue,
    selectedMRFormulaSet,
    recipeClassBased,
  ]);
  /**
   * set batch start method disable tooltip on diff scenario
   */
  useEffect(() => {
    if (+simultaneousBatchesVal > 1) {
      setInfoBatchStartDisable(
        'Restricted: Simultaneous batches are more than 1'
      );
    } else {
      setInfoBatchStartDisable('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [simultaneousBatchesVal]);
  useEffect(() => {
    if (id) {
      setIsBatchPatternPreview(true);
      setBatchPatternEdit(false);
    } else if (batchIdPatternVal && !id) {
      setIsBatchPatternPreview(true);
      setBatchPatternEdit(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (
      BatchIdPatternContainerList !== undefined &&
      BatchIdPatternContainerList !== null &&
      batchIdPatternVal === 'CustomizeBatchId'
    ) {
      setBatchPatternProp([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCampaignIdPattern = (pattern) => {
    const length = pattern.props.len;
    let txt = '';
    if (length < campaignRefId.length) {
      txt = campaignRefId.substring(0, length);
    } else {
      txt = campaignRefId;
    }
    return campaignRefId;
  };
  const getRecipeNamePattern = (pattern) => {
    const length = pattern.props.len;
    let txt = '';
    if (length < recipeName.length) {
      txt = recipeName.substring(0, length);
    } else {
      txt = recipeName;
    }
    return recipeName;
  };
  const getFormulaNamePattern = (pattern) => {
    const length = pattern.props.len;
    let txt = '';
    if (length < formulaName.length) {
      txt = formulaName.substring(0, length);
    } else {
      txt = formulaName;
    }
    return formulaName;
  };
  const getMonthPattern = (pattern) => {
    const { fmtType } = pattern.props;
    let txt = '';
    if (fmtType === '2D') {
      txt = '[MM]';
    } else if (fmtType === 'SM') {
      txt = '[MMM]';
    }
    return txt;
  };
  const getYearPattern = (pattern) => {
    const { fmtType } = pattern.props;
    let txt = '';
    if (fmtType === '2D') {
      txt = '[YY]';
    } else if (fmtType === '4D') {
      txt = '[YYYY]';
    }
    return txt;
  };
  const getDayPattern = (pattern) => {
    return '[dd]';
  };
  const getTextPattern = (pattern) => {
    const { val } = pattern.props;
    return val;
  };
  const getBasePattern = (pattern) => {
    const { val } = pattern.props;
    return val;
  };
  const getDelimiterPattern = (pattern) => {
    const { val } = pattern.props;
    return val;
  };
  const getAutoIncPattern = (pattern) => {
    const { len } = pattern.props;
    if (len === 0) {
      return '';
    }
    let i = 0;
    let s = '';
    for (i = 1; i <= len; i++) {
      s += '#';
    }
    return `[${s}]`;
  };

  const abstactBatchPatternPreview = (patternObj) => {
    let patternPreview = '';
    let patternPreviewForContainer = '';
    let patterLength = 0;

    patternObj.map((pattern) => {
      switch (pattern.type) {
        case 'CAM_ID':
          patternPreviewForContainer = getCampaignIdPattern(pattern);
          patternPreview += patternPreviewForContainer;
          patterLength += patternPreviewForContainer.length;
          break;
        case 'R':
          patternPreviewForContainer = getRecipeNamePattern(pattern);
          patternPreview += patternPreviewForContainer;
          patterLength += patternPreviewForContainer.length;
          break;
        case 'F':
          patternPreviewForContainer = getFormulaNamePattern(pattern);
          patternPreview += patternPreviewForContainer;
          patterLength += patternPreviewForContainer.length;
          break;
        case 'MONTH':
          patternPreviewForContainer = getMonthPattern(pattern);
          patternPreview += patternPreviewForContainer;
          patterLength += patternPreviewForContainer.length - 2;
          break;
        case 'YEAR':
          patternPreviewForContainer = getYearPattern(pattern);
          patternPreview += patternPreviewForContainer;
          patterLength += patternPreviewForContainer.length - 2;
          break;
        case 'DAY':
          patternPreviewForContainer = getDayPattern(pattern);
          patternPreview += patternPreviewForContainer;
          patterLength += patternPreviewForContainer.length - 2;
          break;
        case 'TXT':
          patternPreviewForContainer = getTextPattern(pattern);
          patternPreview += patternPreviewForContainer;
          patterLength += patternPreviewForContainer.length;
          break;
        case 'DELIMITER':
          // Not in use
          patternPreview += getDelimiterPattern(pattern);
          break;
        case 'INC':
          patternPreviewForContainer = getAutoIncPattern(pattern);
          patternPreview += patternPreviewForContainer;
          patterLength += patternPreviewForContainer.length - 2;
          break;
        case 'BASE':
          // Not in use
          patternPreview += getBasePattern(pattern);
          break;
        default:
          break;
      }
    });
    if (patternPreview.length > 0) {
      setPattternPreviewAtEdit(`Pattern preview : ${patternPreview}`);
      setPattternPreviewLength(patterLength);
      setFieldValue(formModel.BatchIdPatternPreview.name, patternPreview);
      setFieldValue(formModel.batchIdPatternPreviewLength.name, patterLength);
    }
  };

  const updatePatternRowState = (position, state) => {
    const tempState = [...state];
    setCampaignBatchIdPattern(JSON.stringify(tempState));
    abstactBatchPatternPreview(tempState);
    setFieldValue(formModel.BatchIdPatternContainerList.name, tempState);
  };

  const createEmptyRowPattern = () => {
    const patternRowObj: PatternRow = {
      key: '',
      value: [],
    };
    return patternRowObj;
  };

  const closePatternRow = () => {
    isCustumizeBatchPattern(false);
    setPattternPreviewAtEdit('');
    setPattternPreviewLength(0);
  };
  const setPatternEditView = () => {
    setBatchPatternEdit(true);
    setIsBatchPatternPreview(false);
  };
  return (
    <Card className="m-0 mr-4 p-2 shadow-none">
      <Card.Content className="border">
        <ScrollableGrid className="my-6 p-0">
          <Row>
            <Column width={8} xsWidth={8} className="m-0 p-0">
              <InputLabel label="Batch Pattern" />
            </Column>
            {isBatchPatternPreview && !batchPatternEdit && (
              <Column width={12} xsWidth={12}>
                <div className="d-flex align-items-center">
                  <span>
                    {batchIdPatternVal !== 'CustomizeBatchId'
                      ? batchIdPatternVal
                      : BatchIdPatternPreview}
                  </span>
                  <Button
                    actionType="button"
                    content="Edit batch pattern"
                    size="small"
                    textTransform={false}
                    type="link"
                    onClick={setPatternEditView}
                    disabled={
                      campaignState === CampaignStateValues.Running
                        ? true
                        : false
                    }
                  />
                </div>
              </Column>
            )}
            {!isBatchPatternPreview &&
              batchPatternEdit &&
              batchIdPatternVal !== 'CustomizeBatchId' && (
                <Column width={6} xsWidth={6}>
                  <SelectField
                    name={batchIdPattern.name}
                    options={batchIdPatternList}
                    placeholder={batchIdPattern.placeholder}
                    disabled={campaignRefId.length > 0 ? false : true}
                    fluid
                  />
                </Column>
              )}
            {!isBatchPatternPreview &&
              batchPatternEdit &&
              batchIdPatternVal === 'CustomizeBatchId' && (
                <Column width={12} xsWidth={12}>
                  <Row>
                    <Column>
                      <div>{pattternPreviewAtEdit}</div>
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      {pattternPreviewLength > 0 && (
                        <div>Pattern length : {pattternPreviewLength}</div>
                      )}
                    </Column>
                  </Row>
                  <Row>
                    <Column>
                      <div className="d-flex justify-content-start align-items-center">
                        <Icon
                          root="common"
                          name="close"
                          exactSize={10}
                          color="white"
                          className="pattern-icon-close"
                          onClick={() => closePatternRow()}
                        />
                        <div>
                          <PatternBatch
                            rowPosition={0}
                            rowState={batchPatternProp}
                            updatePatternRowState={updatePatternRowState}
                            isRecipeBased={isRecipeBased}
                          />
                        </div>
                      </div>
                    </Column>
                  </Row>
                </Column>
              )}
          </Row>
          <Row>
            {/* <Column width={12} xsWidth={12}>
              <div className="d-flex align-items-end">
                <InputField
                  name={batchIdPattern.name}
                  label={batchIdPattern.label}
                  disabled={fieldDisabled}
                />
                <Button
                  actionType="button"
                  content="Custom batch id"
                  size="small"
                  textTransform={false}
                  type="link"
                />
              </div>
            </Column> */}
            <Column width={8} xsWidth={8} className="m-0 p-0">
              <InputLabel label="Campaign Execution Criteria" />
            </Column>

            <Column width={6} xsWidth={6}>
              <SelectField
                name={batchStartMethod.name}
                placeholder="Select batch start method"
                label={batchStartMethod.label}
                options={batchStartMethods.map((item) =>
                  item.value === BatchStartMethod.AutomaticStart
                    ? {
                        ...item,
                        disabled: +simultaneousBatchesVal > 1 || fieldDisabled,
                        icon:
                          +simultaneousBatchesVal > 1 ? (
                            <Tooltip
                              content={infoBatchStartDisable}
                              element={
                                <Icon
                                  name="badge-info"
                                  root="common"
                                  className="mr-2"
                                  size="small"
                                />
                              }
                              // position="top left"
                              event="hover"
                              hoverable
                            />
                          ) : undefined,
                      }
                    : item
                )}
                fluid
              />
            </Column>
          </Row>

          <Row>
            <Column width={12} xsWidth={12}>
              {/* <div className="d-flex"> */}
              <NumberInputField
                disabled={disableSimultaeous || fieldDisabled}
                name={simultaneousBatches.name}
                label={simultaneousBatches.label}
                placeholder={`Enter 1-${maxSimulataneousBatch} batches`}
                icon={
                  infoDisable && (
                    <Tooltip
                      content={infoDisable}
                      element={
                        <Icon
                          name="badge-info"
                          root="common"
                          className="mt-2 mr-2"
                          size="small"
                        />
                      }
                      // position="top left"
                      event="hover"
                      hoverable
                    />
                  )
                }
                min={1}
                step={1}
              />
              {/* <div className="d-flex align-items-center ml-2 py-2">
                  {}
                </div>
              </div> */}
            </Column>
          </Row>

          <Row>
            <Column width={12} xsWidth={12}>
              <CheckboxField
                name={isScheduledCampaign.name}
                label={isScheduledCampaign.label}
                disabled={fieldDisabled}
              />
            </Column>

            {scheduledCampaign ? (
              <Column width={12} xsWidth={12}>
                {/* <div ref={timePickerRef}> */}
                <DatePickerField
                  name={startTime.name}
                  label={startTime.label}
                  placeholder={startTime.placeholder}
                  type="datetime"
                  displayFormat="MM/DD/YY, h:mm a"
                  minuteStep={30}
                  disablePast
                  disabled={fieldDisabled}
                />
                {/* </div> */}
              </Column>
            ) : null}
          </Row>
        </ScrollableGrid>
      </Card.Content>
    </Card>
  );
};
