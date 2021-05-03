/* eslint-disable no-redeclare */
/* eslint-disable no-case-declarations */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-restricted-globals */
/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
/* eslint-disable no-plusplus */

import React, { useEffect, useState } from 'react';
import './applicationSettings.scss';
import { Button, Grid, Input, Select, Checkbox, Card } from '@scuf/common';
import { useHistory } from 'react-router-dom';
import { API_FAILURE_MSG } from 'utils/app-constants';
import ReactTooltip from 'react-tooltip';
import { PageTitle } from 'shared/page-title';
import { withAppSettingsContext } from '../controllers/app-settings/app-settings-context';
import { AppRoutes } from '../../../routing';
import { ManagePattern } from './manage-pattern';

const { Row, Column } = Grid;
const app_set_info_text = `This setting allows you to be define the "Not Applicable" value
for each datatype which be processed by the system for
Formula Parameters that are not enabled for a Formula.`;
const ApplicationSettings = (props) => {
  const { settingList, getAppSettingsList, updateAppsettingsChanges } = props;

  const history = useHistory();

  // const [pollingfloatValue, setPollingfloatValue] = useState('');
  const [intValue, setIntValue] = useState('');
  const [floatValue, setFloatValue] = useState('');
  const [stringValue, setStringValue] = useState('');
  const [enumValue, setEnumValue] = useState('');
  const [boolValue, setBoolValue] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [autoApproval, setAutoApproval] = useState(false);
  const [batchPatterns, setBatchPatterns] = useState([]);
  const [removedBatch, setRemovedBatch] = useState([]);

  const boolValueOptions = [
    { value: 0, text: 'OFF' },
    { value: 1, text: 'ON' },
  ];

  useEffect(() => {
    getAppSettingsList();
  }, []);

  const mergeBatchPatternState = (rowKey, patternRow) => {
    const rowObj = batchPatterns.map((row, index) => {
      if (row.key === rowKey) {
        return row;
      }
    });
    if (rowObj.length === 0) {
      setBatchPatterns((ele) => [...ele, { key: rowKey, value: patternRow }]);
    }
  };

  useEffect(() => {
    const removedState = [...removedBatch];
    settingList.map((item, index) => {
      switch (item.key) {
        case 'CampaignAutoApproval':
          const autoApprove = item.value;
          if (autoApprove != undefined) {
            if (autoApprove === 'false') {
              setAutoApproval(false);
            } else {
              setAutoApproval(true);
            }
          }
          break;

        // case 'ExperionPollingIntervalinHrs':
        //   const experionValue = item.value;
        //   if (experionValue != undefined) {
        //     setPollingfloatValue(experionValue);
        //   }
        //   break;

        case 'INT32NotApplicableValue':
          const integerValue = item.value;
          if (integerValue != undefined) {
            setIntValue(integerValue);
          }
          break;

        case 'FLOAT64NotApplicableValue':
          const float64Value = item.value;
          if (float64Value != undefined) {
            setFloatValue(float64Value);
          }
          break;

        case 'BOOLEANNotApplicableValue':
          const booleanValue = item.value;
          if (booleanValue != undefined) {
            setBoolValue(booleanValue);
          }
          break;

        case 'ENUMNotApplicableValue':
          const enumerationValue = item.value;
          if (enumerationValue != undefined) {
            setEnumValue(enumerationValue);
          }
          break;

        case 'STRINGNotApplicableValue':
          const strValue = item.value;
          if (strValue != undefined) {
            setStringValue(strValue);
          }
          break;
        case 'BatchIdPattern1':
          const strPatterns = item.value;
          if (strPatterns != undefined && strPatterns.length > 0) {
            const patternRow = JSON.parse(strPatterns);
            mergeBatchPatternState(item.key, patternRow);
          }
          break;
        case 'BatchIdPattern2':
          const strPatterns2 = item.value;
          if (strPatterns2 != undefined && strPatterns2.length > 0) {
            const patternRow2 = JSON.parse(strPatterns2);

            mergeBatchPatternState(item.key, patternRow2);
          }
          break;
        case 'BatchIdPattern3':
          const strPatterns3 = item.value;
          if (strPatterns3 != undefined && strPatterns3.length > 0) {
            const patternRow3 = JSON.parse(strPatterns3);
            mergeBatchPatternState(item.key, patternRow3);
          }
          break;
        case 'AutoRemoveCompletedBatch':
          if (
            item.value &&
            item.value.toLowerCase() === 'true' &&
            !removedState.includes('Completed')
          ) {
            removedState.push('Completed');
          }
          setRemovedBatch(removedState);
          break;
        case 'AutoRemoveStoppedBatch':
          if (
            item.value &&
            item.value.toLowerCase() === 'true' &&
            !removedState.includes('Terminal Stopped')
          ) {
            removedState.push('Terminal Stopped');
          }
          setRemovedBatch(removedState);
          break;
        case 'AutoRemoveAbortedBatch':
          if (
            item.value &&
            item.value.toLowerCase() === 'true' &&
            !removedState.includes('Aborted')
          ) {
            removedState.push('Aborted');
          }
          setRemovedBatch(removedState);
          break;
        default:
          break;
      }
    });
  }, [settingList]);

  // if (settingList[0]?.key === 'ExperionPollingIntervalinHrs') {
  //   const { value } = settingList[0];
  //   if (value != undefined) {
  //     setPollingfloatValue(value);
  //   }
  // }
  // if (settingList[0]?.key === 'CampaignAutoApproval') {
  //   const { value } = settingList[0];
  //   if (value != undefined) {
  //     if (value === 'False') {
  //       setAutoApproval(true);
  //     }
  //     setAutoApproval(false);
  //   }
  // }
  // if (settingList[1]?.key === 'INT32NotApplicableValue') {
  //   const { value } = settingList[1];
  //   if (value != undefined) {
  //     setIntValue(value);
  //   }
  // }
  // if (settingList[2]?.key === 'FLOAT64NotApplicableValue') {
  //   const { value } = settingList[2];
  //   if (value != undefined) {
  //     setFloatValue(value);
  //   }
  // }
  // if (settingList[3]?.key === 'BOOLEANNotApplicableValue') {
  //   const { value } = settingList[3];
  //   if (value != undefined) {
  //     setBoolValue(value);
  //   }
  // }
  // if (settingList[4]?.key === 'ENUMNotApplicableValue') {
  //   const { value } = settingList[4];
  //   if (value != undefined) {
  //     setEnumValue(value);
  //   }
  // }
  // if (settingList[5]?.key === 'STRINGNotApplicableValue') {
  //   const { value } = settingList[5];
  //   if (value != undefined) {
  //     setStringValue(value);
  //   }
  // }
  // }, [settingList]);

  const getValueFromOptions = (options, defaultValue) => {
    const object = options.filter((row) => {
      if (row.text === defaultValue) {
        return row;
      }
    });
    return object[0]?.value;
  };

  const onChangeAutoApproval = () => {
    setAutoApproval(!autoApproval);
  };

  const intOnChange = (event) => {
    const clt = event.target;
    setIntValue(clt.value);
    // int - validation

    // --NaN is valid, decimal is not allowed
    if (isNaN(clt.value) || clt.value.indexOf('.') !== -1) {
      if (clt.value.toLowerCase() === 'nan') {
        clt.className = '';
      } else {
        clt.className = 'app-settings-error';
      }
    } else if (clt.value.length === 0) {
      clt.className = 'app-settings-error';
    } else {
      clt.className = '';
    }
  };
  const floatOnChange = (event) => {
    const clt = event.target;
    setFloatValue(clt.value);
    // int - validation
    if (isNaN(clt.value)) {
      if (clt.value.toLowerCase() === 'nan') {
        clt.className = '';
      } else {
        clt.className = 'app-settings-error';
      }
    } else if (clt.value.length === 0) {
      clt.className = 'app-settings-error';
    } else {
      clt.className = '';
    }
  };

  // const pollingfloatValueOnChange = (event) => {
  //   const clt = event.target;
  //   setPollingfloatValue(clt.value);
  //   // int - validation
  //   if (isNaN(clt.value)) {
  //     if (clt.value.toLowerCase() === 'nan') {
  //       clt.className = '';
  //     } else {
  //       clt.className = 'app-settings-error';
  //     }
  //   } else if (clt.value.length === 0) {
  //     clt.className = 'app-settings-error';
  //   } else if (clt.value < 0 || clt.value == 0) {
  //     clt.className = 'app-settings-error';
  //   } else {
  //     clt.className = '';
  //   }
  // };
  const stringOnChange = (event) => {
    const clt = event.target;
    setStringValue(clt.value);
    if (clt.value.length > 8) {
      clt.className = 'app-settings-error';
    } else {
      clt.className = '';
    }
  };
  const onBoolDDLClick = (value, optionValues) => {
    let selectedText = '';
    optionValues.map((row) => {
      if (row.value === value) {
        selectedText = row.text;
      }
    });
    setBoolValue(selectedText);
  };
  const enumOnChange = (event) => {
    const clt = event.target;
    setEnumValue(clt.value);
    if (clt.value.length < 1) {
      clt.className = 'app-settings-error';
    } else {
      clt.className = '';
    }
  };
  const setBatchPatternState = (state) => {
    setBatchPatterns(state);
  };

  const validatePattern = () => {
    for (let i = 0; i < batchPatterns.length; i++) {
      const IncPattern = batchPatterns[i].value.filter((item) => {
        if (item.type === 'INC') {
          return item;
        }
      });
      if (IncPattern.length === 0) {
        return batchPatterns[i];
      }
    }
    return null;
  };
  const validateCustomPattern = () => {
    for (let i = 0; i < batchPatterns.length; i++) {
      const txtPattern = batchPatterns[i].value.filter((item) => {
        if (item.type === 'TXT') {
          if (item.props.val.length === 0) {
            return item;
          }
        }
      });
      if (txtPattern.length > 0) {
        return batchPatterns[i];
      }
    }
    return null;
  };
  const onSaveChangesClick = () => {
    // --Validation
    const regexpnForEnum = new RegExp(/^[^\s]+(\s+[^\s]+)*$/);
    const regexpnForEnumBool = regexpnForEnum.test(enumValue);
    if (
      intValue.toLowerCase() !== 'nan' &&
      (isNaN(intValue) || intValue.indexOf('.') !== -1)
    ) {
      setErrorText('Invalid integer value');
      return;
    }
    if (intValue.length === 0) {
      setErrorText('Invalid integer value');
      return;
    }
    if (floatValue.toLowerCase() !== 'nan' && isNaN(floatValue)) {
      setErrorText('Invalid float value');
      return;
    }
    if (floatValue.length === 0) {
      setErrorText('Invalid float value');
      return;
    }
    if (stringValue.length > 8) {
      setErrorText('Only eight char allowed for string');
      return;
    }
    if (enumValue.length === 0 || !regexpnForEnumBool) {
      setErrorText(
        'enum value can not be empty & can not start or end with space(s)'
      );
      return;
    }
    const pattern = validatePattern();
    if (pattern !== null) {
      setErrorText(`${pattern.key} : AutoIncrement is mandatory.`);
      return;
    }
    const txtPattern = validateCustomPattern();
    if (txtPattern !== null) {
      setErrorText(
        `${txtPattern.key} : Custom pattern value should not be empty.`
      );
      return;
    }

    setErrorText('');
    const tempList = settingList.map((item, index) => {
      switch (item.key) {
        case 'CampaignAutoApproval':
          item.value = autoApproval;
          break;

        // case 'ExperionPollingIntervalinHrs':
        //   item.value = pollingfloatValue;
        //   break;

        case 'INT32NotApplicableValue':
          item.value = intValue;
          break;

        case 'FLOAT64NotApplicableValue':
          item.value = floatValue;
          break;

        case 'BOOLEANNotApplicableValue':
          item.value = boolValue;
          break;

        case 'ENUMNotApplicableValue':
          item.value = enumValue;
          break;

        case 'STRINGNotApplicableValue':
          item.value = stringValue;
          break;
        case 'BatchIdPattern1':
          item.value =
            batchPatterns.length > 0
              ? JSON.stringify(batchPatterns[0].value)
              : null;
          break;
        case 'BatchIdPattern2':
          item.value =
            batchPatterns.length > 1
              ? JSON.stringify(batchPatterns[1].value)
              : null;
          break;
        case 'BatchIdPattern3':
          item.value =
            batchPatterns.length > 2
              ? JSON.stringify(batchPatterns[2].value)
              : null;
          break;
        case 'AutoRemoveCompletedBatch':
          if (removedBatch.includes('Completed')) {
            item.value = 'True';
          } else {
            item.value = 'False';
          }
          break;
        case 'AutoRemoveStoppedBatch':
          if (removedBatch.includes('Terminal Stopped')) {
            item.value = 'True';
          } else {
            item.value = 'False';
          }
          break;
        case 'AutoRemoveAbortedBatch':
          if (removedBatch.includes('Aborted')) {
            item.value = 'True';
          } else {
            item.value = 'False';
          }
          break;
        default:
          break;
      }
      return item;
    });
    updateAppsettingsChanges(tempList).then((res) => {
      if (res.status === 200) {
        return history.push(AppRoutes.DEFAULT.path);
      }
      setErrorText(API_FAILURE_MSG);
      setErrorText(res.message);
    });
  };
  const handleRemovedBatch = (state) => {
    const removedState = [...removedBatch];
    if (removedState.includes(state)) {
      const index = removedState.indexOf(state);
      if (index > -1) {
        removedState.splice(index, 1);
      }
    } else {
      removedState.push(state);
    }
    // const tempList = settingList.map((item) => {
    //   switch (item.key.toLowerCase()) {
    //     case 'autoremovecompletedbatch':
    //       if (removedState.includes('Completed')) {
    //         item.value = 'True';
    //       } else {
    //         item.value = 'False';
    //       }
    //       break;
    //     case 'autoremovestoppedbatch':
    //       if (removedState.includes('Terminal Stopped')) {
    //         item.value = 'True';
    //       } else {
    //         item.value = 'False';
    //       }
    //       break;
    //     case 'autoremoveabortedbatch':
    //       if (removedState.includes('Aborted')) {
    //         item.value = 'True';
    //       } else {
    //         item.value = 'False';
    //       }
    //       break;
    //     default:
    //       break;
    //   }
    //   return item;
    // });
    // updateAppsettingsChanges(tempList);
    setRemovedBatch(removedState);
  };
  // const removedBatchState = () => {
  //   const a = [
  //     { text: 'Completed', value: 'Completed' },
  //     { text: 'Terminal Stopped', value: 'Stopped' },
  //     { text: 'Aborted', value: 'Aborted' },
  //   ];
  //   return (
  //     <div>
  //       {a.map((item) => {
  //         <div className="ml-4 mt-4">
  //           <Checkbox
  //             className="ml-2"
  //             label={item.text}
  //             checked={removedBatch.includes(item.value)}
  //             onChange={() => handleRemovedBatch(item.value)}
  //           />
  //         </div>;
  //       })}
  //     </div>
  //   );
  // };
  return (
    <div className="m-4 mr-8 AppSettings">
      <div className="d-flex justify-content-between w-88-p">
        <PageTitle content="Application settings" />
        <Button
          type="primary"
          size="small"
          onClick={onSaveChangesClick}
          content="Save changes"
          className="mr-2"
        />
      </div>
      <div className="d-flex flex-column align-items-center">
        {errorText && <div className="text-danger mt-2">{errorText}</div>}
        <div className="d-flex w-75 mt-2">
          <div className="d-flex flex-column">
            <div className="font-size-16 text-dark-700">
              Not applicable value
            </div>
            <div className="font-size-12 mt-2 text-dark-200">
              {app_set_info_text}
            </div>
          </div>
        </div>

        <Card className="w-75 bg-app-container">
          <Card.Content className="border">
            <Grid className="mt-4">
              <Row>
                <Column width={4}>
                  <div className="font-size-12 text-dark-200 text-uppercase text-semibold">
                    Data type
                  </div>
                </Column>
                <Column width={6}>
                  <div className="font-size-12 text-dark-200 text-uppercase text-semibold">
                    NA Value
                  </div>
                </Column>
              </Row>
              <Row>
                <Column width={4}>
                  <div className="font-size-12 text-dark-700">
                    Integer value
                  </div>
                </Column>
                <Column width={6}>
                  <input
                    value={intValue}
                    onChange={(event) => intOnChange(event)}
                  />
                  {/* <Input value={intValue} onChange={(event) => intOnChange(event)} /> */}
                </Column>
              </Row>
              <Row>
                <Column width={4}>
                  <div className="font-size-12 text-dark-700">Float value</div>
                </Column>
                <Column width={6}>
                  {/* <Input
              value={floatValue}
              onChange={(event) => floatOnChange(event)}
            /> */}
                  <input
                    value={floatValue}
                    onChange={(event) => floatOnChange(event)}
                  />
                </Column>
              </Row>
              <Row>
                <Column width={4}>
                  <div className="font-size-12 text-dark-700">String value</div>
                </Column>
                <Column width={6}>
                  {/* <Input
              value={stringValue}
              onChange={(event) => stringOnChange(event)}
            /> */}
                  <input
                    value={stringValue}
                    onChange={(event) => stringOnChange(event)}
                  />
                </Column>
              </Row>
              <Row>
                <Column width={4}>
                  <div className="font-size-12 text-dark-700">
                    Enumeration value
                  </div>
                </Column>
                <Column width={6}>
                  {/* <Input
              value={enumValue}
              onChange={(event) => enumOnChange(event)}
            /> */}
                  <input
                    value={enumValue}
                    onChange={(event) => enumOnChange(event)}
                  />
                </Column>
              </Row>
              <Row>
                <Column width={4}>
                  <div className="font-size-12 text-dark-700">
                    Boolean value
                  </div>
                </Column>
                <Column width={6}>
                  <Select
                    options={boolValueOptions}
                    value={getValueFromOptions(boolValueOptions, boolValue)}
                    onChange={(value) =>
                      onBoolDDLClick(value, boolValueOptions)
                    }
                  />
                </Column>
              </Row>
            </Grid>
          </Card.Content>
        </Card>

        <div className="d-flex w-75 mt-4">
          <div className="font-size-16 text-dark-700">Campaign and batches</div>
        </div>
        <Card className="w-75 bg-app-container">
          <Card.Content className="border">
            <div className="d-flex">
              <div className="w-40-p font-size-14 text-dark-700">
                Campaign Auto Approval
              </div>

              <Checkbox
                toggle={true}
                onChange={onChangeAutoApproval}
                checked={autoApproval}
                value={autoApproval}
                className="ml-8"
              />
            </div>
            <div className="batch-removal mt-8">
              <div className="batch-removal-header">Batch removal</div>

              <div className="batch-removal-desc mt-2">
                Remove batch from Experion when the batch status is :
              </div>
              <div className="mt-4 ml-6">
                <Checkbox
                  className="ml-2"
                  label="Completed"
                  checked={removedBatch.includes('Completed')}
                  value={removedBatch.includes('Completed')}
                  onChange={() => handleRemovedBatch('Completed')}
                />
              </div>
              <div className="mt-4 ml-6">
                <Checkbox
                  className="ml-2"
                  label="Terminal Stopped"
                  checked={removedBatch.includes('Terminal Stopped')}
                  value={removedBatch.includes('Terminal Stopped')}
                  onChange={() => handleRemovedBatch('Terminal Stopped')}
                />
              </div>
              <div className="mt-4 ml-6">
                <Checkbox
                  className="ml-2"
                  label="Aborted"
                  checked={removedBatch.includes('Aborted')}
                  value={removedBatch.includes('Aborted')}
                  onChange={() => handleRemovedBatch('Aborted')}
                />
              </div>
            </div>
            <div className="d-flex flex-column justify-content-start mt-8 mb-n6">
              <div className="font-size-14 tex-dark-700">Batch ID type</div>
              <div className="font-size-12 mt-2 text-dark-200">
                Batch Patterns
              </div>
            </div>
            <div className="d-flex justify-content-start">
              <ManagePattern
                batchPatternsState={batchPatterns}
                setBatchPatternState={setBatchPatternState}
              />
            </div>
          </Card.Content>
        </Card>
      </div>
    </div>
  );
};

export default withAppSettingsContext(ApplicationSettings);
