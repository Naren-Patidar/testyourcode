/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
/* eslint-disable radix */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable dot-notation */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-nested-ternary */
/* eslint-disable spaced-comment */
/* eslint-disable prefer-const */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/* eslint-disable import/named */
/* eslint-disable import/no-duplicates */
/* eslint-disable prettier/prettier */
import {
  Button,
  Card,
  Checkbox,
  Grid,
  Input,
  InputLabel,
  Modal,
  Select,
  Tab,
  Tooltip,
} from '@scuf/common';
import { DataTable } from '@scuf/datatable';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { Permissions, useAuthorize } from 'core/authentication';
import { PermissionValues } from 'core/authentication/models/user-permission';
import { useConfirm } from 'shared/confirm-dialog';
import { AppConstants } from 'utils/app-constants';
import { FORMULASET } from '../../../../utils/constants/boterminology';
import { PAGE_SIZE, PARAM_TYPES } from '../../../../utils/constants/enums';
// import { BASE_ROUTE } from '../../../../utils/constants/routes';
import { withBatchManagementContext } from '../../controllers/create-batch/create-batch-context';
import { errorHandler } from 'core/error';
import AlertPopup from '../AlertPopup';
import '../../components/AlertPopup/MessageBox.scss';
import { AppRoutes } from 'routing';
import './create-batch.scss';
import { PageTitle } from 'shared/page-title';

function CreateBatch(props) {
  const {
    getUnitsList,
    unitsList,
    getFormulaByFormulaId,
    formulaParams,
    createBatch,
    allFormulaSet,
    getAllFormulaSet,
    getFormulaListByFormulaSetId,
    formulaList,
    refBatches,
    batchSizeSource,
    getBatchSize,
    getReferenceBatches,
  } = props;

  let history = useHistory();
  let location = useLocation();

  const confirm = useConfirm();
  const { authorized: isAuthorize } = useAuthorize([
    PermissionValues.CreateBatch,
  ]);

  const isUserAuthorized = async () => {
    if (isAuthorize !== null && !isAuthorize) {
      const { confirmed } = await confirm.show({
        title: 'Alert',
        message: AppConstants.UNAUTHORIZED_MESSAGE,
        type: 'alert',
        confirmText: 'Ok',
      });
      if (confirmed) {
        history.push(AppRoutes.DEFAULT.path);
      }
    }
  };
  useEffect(() => {
    isUserAuthorized();
  }, [isAuthorize]);
  //const [flagFromNavigationMenu,setFlagFromNavigationMenu]=useState(location.state.fromNavigationMenu ? true :false);
  const [batchData, setBatchData] = useState({});
  const [batchID, setBatchID] = useState('');
  const [showFormulaParams, setShowFormulaParams] = useState(true);
  const [batchSize, setBatchSize] = useState('');
  const [defaultBatchSize, setDefaultBatchSize] = useState('');
  const [batchSizeEngUnit, setBatchSizeEngUnit] = useState('');
  const [showDescription, setShowDescription] = useState(true);
  const [masterRecipeName, setMasterRecipeName] = useState(
    location.state.fromNavigationMenu
      ? allFormulaSet?.length > 0
        ? allFormulaSet[0].masterRecipeName
        : ''
      : location.state.productForBatch.masterRecipeName
  );
  const [selectedUnits] = useState([]);
  const [isRefresh, setRefresh] = useState(true);
  //const selectedProduct = location.state.productForBatch.productID;
  const [messageBoxItem, setMessageBoxItem] = useState('');
  const [open, setOpen] = useState(false);
  const [tempUnitsList, setTempUnitsList] = useState([]);
  const [isFormulaParameterValid, setIsFormulaParameterValid] = useState(true);
  const [formulaSetId, setFormulaSetId] = useState(
    location.state.fromNavigationMenu
      ? allFormulaSet?.length > 0
        ? allFormulaSet.filter((item) => {
            return (
              item.formula.filter((fitem) => {
                return fitem.status === 2;
              }).length > 0
            );
          })[0]?.id
          ? allFormulaSet.filter((item) => {
              return (
                item.formula.filter((fitem) => {
                  return fitem.status === 2;
                }).length > 0
              );
            })[0]?.id
          : null
        : null
      : location.state.productForBatch.formulaSetId
  );
  const [productID, setProductID] = useState(
    location.state.fromNavigationMenu
      ? allFormulaSet?.length && allFormulaSet[0].formula.length
        ? allFormulaSet[0].formula[0].id
        : null
      : location.state.productForBatch.productID
  );
  const [referenceBatch, setReferenceBatch] = useState('');
  const [refBatchList, setRefBatchList] = useState([]);
  // const [messageBoxItem, setMessageBoxItem] = useState("")
  // const [open, setOpen] = useState(false);

  const renderModal = () => {
    return (
      <Modal
        className="modal-Popup"
        size="small"
        closeIcon={true}
        onClose={(e) => closeModal(e)}
        open={open}
        closeOnDimmerClick={false}
      >
        <Modal.Header className="modal-Popup-header">Alert</Modal.Header>
        <Modal.Content className="modal-Popup-content">
          {messageBoxItem}
        </Modal.Content>
        <Modal.Footer className="modal-Popup-footer">
          {/* <Button className="messageBoxCancel" type="secondary" size="medium" content="Cancel" onClick={(e) => closeModal(e)} /> */}
          <Button
            // className="messageBoxSubmit"
            type="primary"
            size="small"
            content="Ok"
            onClick={(e) => closeModal(e)}
          />
        </Modal.Footer>
      </Modal>
    );
  };
  const closeModal = (e) => {
    if (e.path == undefined) {
      setOpen(false);
    }
  };

  // Formula set and Product selection data
  const [formulaParamsList, setFormulaParamsList] = useState({});

  let formulaSetList = [];

  if (location.state.fromNavigationMenu) {
    formulaSetList =
      allFormulaSet &&
      allFormulaSet
        .filter((_item) => {
          return (
            _item.formula.filter((fitem) => {
              return fitem.status === 2;
            }).length > 0
          );
        })
        .map((item) => {
          return { text: item.name, value: item.id };
        });
  } else {
    formulaSetList = [
      {
        text: location.state.productForBatch.productTypName,
        value: location.state.productForBatch.formulaSetId,
      },
    ];
  }
  let productsList = [];
  if (location.state.fromNavigationMenu) {
    productsList =
      formulaList &&
      formulaList
        .filter((_itm) => {
          return _itm.status === 2;
        })
        .map((item) => {
          return { text: item.name, value: item.id };
        });
  } else {
    productsList = [
      {
        text: formulaParams['productName'],
        value: location.state.productForBatch.productID,
      },
    ];
  }
  // location.state.fromNavigationMenu ? [{text:'',value:''}] : [{ text: formulaParams["productName"], value: location.state.productForBatch.productID}];
  formulaParamsList['params'] = formulaParams[
    'formulaParameterInfoForApprovals'
  ]?.filter((row) => {
    if (row.isSelected === true) {
      return row;
    }
  });

  /* Updating the params data upong entering the value */
  const setParamsList = (data) => {
    formulaParamsList['params'] = data;
  };
  /* get all formula set */
  useEffect(() => {
    if (location.state.fromNavigationMenu) {
      getAllFormulaSet().then((res) => {
        if (res && res.status && res.status !== 200 && res.status !== 403) {
          setMessageBoxItem(res.message);
          setOpen(!open);
        }
      });
    }
  }, []);

  /* get all reference batches */
  useEffect(() => {
    if (masterRecipeName) {
      getReferenceBatches(masterRecipeName).then((res) => {
        if (res && res.status && res.status !== 200 && res.status !== 403) {
          setMessageBoxItem(res.message);
          setOpen(!open);
        }
      });
    }
  }, [masterRecipeName]);
  useEffect(() => {
    if (refBatches && refBatches.referenceBatchList) {
      let refBatcheOptions = [
        {
          text: 'No Selection',
          value: '',
        },
      ];
      refBatcheOptions = [
        ...refBatcheOptions,
        ...(refBatches.referenceBatchList.map((item) => ({
          text: item,
          value: item,
        })) || []),
      ];
      setRefBatchList(refBatcheOptions);
    }
  }, [refBatches]);
  /* get batch size */
  useEffect(() => {
    if (masterRecipeName) {
      getBatchSize(masterRecipeName).then((res) => {
        if (res && res.status && res.status !== 200 && res.status !== 403) {
          setMessageBoxItem(res.message);
          setOpen(!open);
        }
      });
    }
  }, [masterRecipeName]);

  /**
   * when new batch size from api comes, change the form fields
   */
  useEffect(() => {
    if (batchSizeSource) {
      setBatchSizeEngUnit(batchSizeSource.batchSizeEngUnit ?? '');
      setDefaultBatchSize(batchSizeSource.defaultBatchSize ?? '');
      setBatchSize(batchSizeSource.currentBatchSize ?? '');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [batchSizeSource]);

  useEffect(() => {
    if (location.state.fromNavigationMenu && formulaSetId) {
      getFormulaListByFormulaSetId(formulaSetId).then((res) => {
        if (res && res.status && res.status !== 200 && res.status !== 403) {
          setMessageBoxItem(res.message);
          setOpen(!open);
        }
      });
      // setFormulaSetId(formulaSetId);
      // setMasterRecipeName(masterRecipeName);
    }
  }, [formulaSetId]);

  // useEffect(()=>{
  //     if(formulaSetId)
  //     {
  //         getFormulaListByFormulaSetId(formulaSetId).then((res)=>{
  //             if(res && res.status && res.status!==200)
  //             {
  //                 setMessageBoxItem(res.message);
  //                 setOpen(!open);
  //             }
  //            });
  //     }
  // },[formulaSetId]);

  useEffect(() => {
    if (location.state.fromNavigationMenu) {
      setFormulaSetId(
        allFormulaSet.filter((item) => {
          return (
            item.formula.filter((fitem) => {
              return fitem.status === 2;
            }).length > 0
          );
        })[0]?.id
      );
      setProductID(
        allFormulaSet
          .filter((item) => {
            return (
              item.formula.filter((fitem) => {
                return fitem.status === 2;
              }).length > 0
            );
          })[0]
          ?.formula.filter((_item) => {
            return _item.status === 2;
          })[0]?.id
      );
      setMasterRecipeName(
        allFormulaSet.filter((item) => {
          return (
            item.formula.filter((fitem) => {
              return fitem.status === 2;
            }).length > 0
          );
        })[0]?.masterRecipeName
      );
    }
  }, [
    allFormulaSet.filter((item) => {
      return (
        item.formula.filter((fitem) => {
          return fitem.status === 2;
        }).length > 0
      );
    })[0]?.id,
    allFormulaSet
      .filter((item) => {
        return (
          item.formula.filter((fitem) => {
            return fitem.status === 2;
          }).length > 0
        );
      })[0]
      ?.formula.filter((_item) => {
        return _item.status === 2;
      })[0]?.id,
    allFormulaSet.filter((item) => {
      return (
        item.formula.filter((fitem) => {
          return fitem.status === 2;
        }).length > 0
      );
    })[0]?.masterRecipeName,
  ]);

  /* get formula list for the given formula set */
  // useEffect(() => {
  //     let data = formulaParamsList["params"];
  //     if(data === undefined){
  //         return;
  //     }
  //     let setTrue = data.length > 0
  //     for (let i = 0; i < data.length; i += 1) {
  //         let row = data[i]
  //         let {minValFormulaSetParameter, maxValFormulaSetParameter, defaultValue, paramType, optionValue} = row

  //         if(paramType === PARAM_TYPES.STRING){
  //             if(defaultValue.length > 8){
  //             setTrue = false;
  //             break;
  //             }
  //         }
  //         else if(paramType === PARAM_TYPES.ENUMERATION){
  //             let optionValues = [];

  //                 let options = JSON.parse(optionValue)
  //                 options.map((opt) => {
  //                 let obj = {};
  //                 obj.text = opt.EnumerationString
  //                 obj.value = opt.EnumerationNumber
  //                 optionValues.push(obj)
  //                 })

  //             let valueFromOptions = getValueFromOptions(optionValues, defaultValue)
  //             let minFromOptions = getValueFromOptions(optionValues, minValFormulaSetParameter)
  //             let maxFromOptions = getValueFromOptions(optionValues, maxValFormulaSetParameter)

  //             if(minFromOptions === undefined && maxFromOptions === undefined){
  //             setTrue = true
  //             continue;
  //             }
  //         //--validate default value
  //         if(valueFromOptions >= minFromOptions && valueFromOptions <= maxFromOptions){
  //             setTrue = true;
  //             continue;
  //             }
  //             else{
  //                 setTrue = false
  //                 break;
  //             }

  //         }
  //         else if(paramType === PARAM_TYPES.INTEGER || paramType === PARAM_TYPES.DOUBLE){
  //             if(defaultValue === 'NaN'){
  //                 setTrue = true;
  //                 continue;
  //             }
  //             else if(defaultValue !== 'NaN' && (isNaN(defaultValue) || defaultValue === '') ){
  //                 setTrue = false;
  //                 break
  //             }
  //             else if(defaultValue !== 'NaN'){
  //                 if(minValFormulaSetParameter !== 'NaN' && maxValFormulaSetParameter === 'NaN' && parseFloat(defaultValue) < parseFloat(minValFormulaSetParameter)){
  //                     setTrue = false
  //                     break;
  //                 }
  //                 if(maxValFormulaSetParameter !== 'NaN' && minValFormulaSetParameter === 'NaN' && parseFloat(defaultValue) > parseFloat(maxValFormulaSetParameter)){
  //                     setTrue = false
  //                     break;
  //                 }
  //                 if(maxValFormulaSetParameter !== 'NaN' && minValFormulaSetParameter !== 'NaN' && (parseFloat(defaultValue) < parseFloat(minValFormulaSetParameter) || parseFloat(defaultValue) > parseFloat(maxValFormulaSetParameter))){
  //                     setTrue = false
  //                     break;
  //                 }
  //                 if(paramType === PARAM_TYPES.INTEGER && defaultValue.indexOf('.') !== -1){
  //                     setTrue = false
  //                     break;
  //                 }
  //             }
  //         }

  //     }
  //     console.log('data state', setTrue)
  //     setIsFormulaParameterValid(setTrue)
  // } , [setParamsList])

  /* get formula list for the given formula set */
  useEffect(() => {
    let _productID = location.state.fromNavigationMenu
      ? allFormulaSet?.length && allFormulaSet[0].formula.length
        ? allFormulaSet
            .filter((item) => {
              return (
                item.formula.filter((fitem) => {
                  return fitem.status === 2;
                }).length > 0
              );
            })[0]
            ?.formula?.filter((item) => {
              return item.status === 2;
            })[0]?.id
        : null
      : location.state.productForBatch.productID;

    if (_productID) {
      getFormulaByFormulaId(_productID).then((res) => {
        if (res && res.status && res.status !== 200 && res.status !== 403) {
          setMessageBoxItem(res.message);
          setOpen(!open);
        }
      });
    }
    setProductID(_productID);
  }, []);

  useEffect(() => {
    let _productID = productID ? productID : null;

    if (_productID) {
      getFormulaByFormulaId(_productID).then((res) => {
        if (res && res.status && res.status !== 200) {
          setMessageBoxItem(res.message);
          setOpen(!open);
        }
      });
    } else {
      formulaParamsList['params'] = {};
    }
    setProductID(_productID);
  }, [location.state.productForBatch?.productID, productID]);

  /* get units list for the given formula set */
  useEffect(() => {
    if (!location.state.fromNavigationMenu) {
      getUnitsList(masterRecipeName).then((res) => {
        if (res && res.status && res.status !== 200 && res.status !== 403) {
          setMessageBoxItem(res.message);
          setOpen(!open);
        }
      });
    }
  }, []);
  useEffect(() => {
    if (location.state.fromNavigationMenu) {
      if (masterRecipeName) {
        getUnitsList(masterRecipeName).then((res) => {
          if (res && res.status && res.status !== 200 && res.status !== 403) {
            setMessageBoxItem(res.message);
            setOpen(!open);
          }
        });
      }
      //   setMasterRecipeName(masterRecipeName);
    }
  }, [masterRecipeName]);

  useEffect(() => {
    let data = unitsList.slice(0);
    data.map((row) => {
      selectedUnits[row.unitParamName] = row.primaryUnit;
      row.selectedUnitParamValue = row.primaryUnit;
    });
    setTempUnitsList(data);
  }, [unitsList]);

  /** Batch Size Validation */
  const validateAndSetBatchSize = (value) => {
    let msg = 'Please enter a valid number';
    if (value && !isNaN(parseInt(value)) && !isNaN(value)) {
      setBatchSize(value);
    } else {
      setMessageBoxItem(msg);
      setOpen(!open);
      setBatchSize('');
    }
  };

  /** Batch ID validation */
  const validateBatchID = (value) => {
    //  let pattern = new RegExp(/^([^` ~!@$^+=./,\\<>'"*?|:;\[\]{}()%#&-])[a-zA-Z0-9`~!@$^+=-]{0,15}$/);
    let pattern = new RegExp(/^\S*$/);
    if (pattern.test(value)) {
      setBatchID(value);
    } else {
      setMessageBoxItem('Space not allowed');
      setOpen(!open);
    }
  };

  /* Submit the batch creation request */
  const onSaveClick = async (e) => {
    batchData['BatchId'] = batchID;
    batchData['RecipeName'] = masterRecipeName;
    batchData['ReferenceBatch'] = referenceBatch ?? '';
    batchData['Header'] = [];
    batchData['Units'] = [];
    batchData['FormulaParameters'] = [];
    batchData['FormulaSet'] = formulaSetList.filter((item) => {
      return item.value === formulaSetId;
    })[0].text;
    batchData['Formula'] = productsList.filter((item) => {
      return item.value === productID;
    })[0].text;

    let headerParamCount = 0;
    batchData['Header'][headerParamCount++] = {
      paramName: 'BATCHSIZECURR',
      paramValue: '' + batchSize,
      paramType: 'STRING',
    };
    batchData['Header'][headerParamCount++] = {
      paramName: 'BATCHSIZEDEF',
      paramValue: '' + batchSize,
      paramType: 'STRING',
    };
    let isValidParams = true;

    // get the selected units
    let unitParamCount = 0;
    unitsList.map((item) => {
      if (
        selectedUnits[item['unitParamName']] != undefined &&
        item.unitSelectionList.length > 0
      ) {
        batchData['Units'][unitParamCount++] = {
          paramName: item['unitParamName'],
          paramValue: selectedUnits[item['unitParamName']],
          paramType: 'STRING',
        };
      }
    });
    // Tread Formula Params list
    let formulaParamCount = 0;
    formulaParams['formulaParameterInfoForApprovals'].map((item) => {
      let batchParametrName = 'DATA.' + item['name'] + '.VALUE';
      let batchParamValue =
        item['value'] != undefined ? item['value'] : item['defaultValue'];
      let batchParamType =
        item['paramType'] != undefined ? item['paramType'] : 'STRING';
      // if(parseFloat(batchParamValue) < parseFloat(item["minValFormulaSetParameter"]) ||
      //    parseFloat(batchParamValue) > parseFloat(item["maxValFormulaSetParameter"])) {
      //        // alert("Invalid fomrula parameter values!!");
      //        setMessageBoxItem("Invalid fomrula parameter values!!")
      //        setOpen(!open)
      //         isValidParams = false;
      //    }
      // else {
      //NA value changes
      let newBatchParamValue = item.isSelected
        ? batchParamValue
        : item.notApplicableValue;
      batchData['FormulaParameters'][formulaParamCount++] = {
        paramName: batchParametrName,
        paramValue: newBatchParamValue,
        paramType: batchParamType,
      };
      // }
    });
    // Call the create batch API and pass the new batch information
    if (isValidParams) {
      let result;
      result = await createBatch(batchData);

      if (result.status == 200) {
        if (result.data.code == 0) {
          // alert(result.data.message);
          setMessageBoxItem(
            'Create batch returned with status code ' +
              result.data.code +
              ': ' +
              result.data.message
          );
          setOpen(!open);
          // route to HOME page
          //history.push(BASE_ROUTE);
        } else {
          // alert ( "Unable to create batch. Error code " + result.data.code + ": "+result.data.message)
          setMessageBoxItem(
            'Create batch returned with status code ' +
              result.data.code +
              ': ' +
              result.data.message
          );
          setOpen(!open);
        }
      } else {
        // alert("Unable to create Batch. Status Code: " + result.state);
        setMessageBoxItem(errorHandler(result).message);
        setOpen(!open);
      }
    }
  };

  /* handle the tab change */
  const onTabChange = (tabIndex) => {
    setShowFormulaParams(tabIndex == 0 ? true : false);
  };

  const getSelectedUnit = (unitParamName) => {
    return selectedUnits[unitParamName];
  };

  /* handles the selected units state */
  const setSelectedUnits = (unitParamName, value) => {
    selectedUnits[unitParamName] = value;
    let data = tempUnitsList.slice(0);
    //unitParamName
    data.map((row) => {
      if (row.unitParamName === unitParamName) {
        row.selectedUnitParamValue = value;
      }
    });
    setTempUnitsList(data);
  };
  const getValueFromOptions = (options, defaultValue) => {
    let object = options.filter((row) => {
      if (row.text.toLowerCase() === defaultValue.toLowerCase()) {
        return row;
      }
    });
    return object[0]?.value;
  };

  const onDefaultValueDDLClick = (value, cellData, optionValues) => {
    let selectedText;
    optionValues.map((row) => {
      if (row.value === value) {
        selectedText = row.text;
      }
    });
    let data = formulaParamsList['params'];
    data[cellData.rowIndex][cellData.field] = selectedText;
    setParamsList(data);
    cellData.value = value;
    setRefresh(!isRefresh);
  };

  const renderInput = (cellData) => {
    let paramType = cellData.rowData.paramType;
    let { value, rowData } = cellData;
    let { minValFormulaSetParameter, maxValFormulaSetParameter } = rowData;
    let isDataValid = true;
    let optionValues = [];

    if (
      paramType === PARAM_TYPES.ENUMERATION ||
      paramType === PARAM_TYPES.BOOLEAN
    ) {
      let options = JSON.parse(cellData.rowData.optionValue);
      options.map((opt) => {
        let obj = {};
        obj.text = opt.EnumerationString;
        obj.value = opt.EnumerationNumber;
        optionValues.push(obj);
      });
    }
    if (paramType === PARAM_TYPES.STRING) {
      if (value != undefined && value.length > 8) {
        isDataValid = false;
      }
    } else if (
      paramType === PARAM_TYPES.INTEGER ||
      paramType === PARAM_TYPES.DOUBLE
    ) {
      if (value === 'NaN') {
        isDataValid = true;
      } else if (value !== 'NaN' && (isNaN(value) || value === '')) {
        isDataValid = false;
      } else if (value !== 'NaN') {
        if (
          minValFormulaSetParameter !== 'NaN' &&
          maxValFormulaSetParameter === 'NaN' &&
          parseFloat(value) < parseFloat(minValFormulaSetParameter)
        ) {
          isDataValid = false;
        }
        if (
          maxValFormulaSetParameter !== 'NaN' &&
          minValFormulaSetParameter === 'NaN' &&
          parseFloat(value) > parseFloat(maxValFormulaSetParameter)
        ) {
          isDataValid = false;
        }
        if (
          maxValFormulaSetParameter !== 'NaN' &&
          minValFormulaSetParameter !== 'NaN' &&
          (parseFloat(value) < parseFloat(minValFormulaSetParameter) ||
            parseFloat(value) > parseFloat(maxValFormulaSetParameter))
        ) {
          isDataValid = false;
        }
        if (paramType === PARAM_TYPES.INTEGER && value.indexOf('.') !== -1) {
          isDataValid = false;
        }
      }
    } else if (
      paramType === PARAM_TYPES.ENUMERATION ||
      paramType === PARAM_TYPES.BOOLEAN
    ) {
      let valueFromOptions = getValueFromOptions(optionValues, value);
      let min = getValueFromOptions(optionValues, minValFormulaSetParameter);
      let max = getValueFromOptions(optionValues, maxValFormulaSetParameter);

      if (valueFromOptions >= min && valueFromOptions <= max) {
        isDataValid = true;
      } else {
        isDataValid = false;
      }
      if (
        minValFormulaSetParameter === '' &&
        maxValFormulaSetParameter === ''
      ) {
        isDataValid = true;
      }
    }
    return (
      <div>
        {/* {renderModal()} */}
        {
          <AlertPopup
            messageBoxItem={messageBoxItem}
            open={open}
            setOpen={setOpen}
          ></AlertPopup>
        }
        {(paramType === PARAM_TYPES.INTEGER ||
          paramType === PARAM_TYPES.DOUBLE) && (
          <Input
            key={cellData.rowData.id}
            className={
              !isDataValid ||
              (cellData.value && cellData.value.trim().length === 0)
                ? 'batch-input-error'
                : 'batch-input'
            }
            defaultValue={cellData.rowData.defaultValue}
            data-tip
            data-for={'tip_' + cellData.rowData.id}
            onChange={(value) => {
              let data = formulaParamsList['params'];
              data[cellData.rowIndex][cellData.field] = value;
              setParamsList(data);
              cellData.value = value;
              setRefresh(!isRefresh);
            }}
          />
        )}

        {(paramType === PARAM_TYPES.ENUMERATION ||
          paramType === PARAM_TYPES.BOOLEAN) && (
          <div>
            <Select
              options={optionValues}
              className={isDataValid ? 'batch-select' : 'error'}
              data-tip
              data-for={'tip_' + cellData.rowData.id}
              value={getValueFromOptions(optionValues, cellData.value)}
              onChange={(value) =>
                onDefaultValueDDLClick(value, cellData, optionValues)
              }
            />
          </div>
        )}
        {paramType === PARAM_TYPES.STRING && (
          <Input
            key={cellData.rowData.id}
            className={
              !isDataValid ||
              (cellData.value && cellData.value.trim().length === 0)
                ? 'batch-input-error'
                : 'batch-input'
            }
            defaultValue={cellData.rowData.defaultValue}
            data-tip
            data-for={'tip_' + cellData.rowData.id}
            onChange={(value) => {
              let data = formulaParamsList['params'];
              data[cellData.rowIndex][cellData.field] = value;
              setParamsList(data);
              cellData.value = value;
              setRefresh(!isRefresh);
            }}
          />
        )}
        <ReactTooltip
          backgroundColor="#303030"
          textColor="#d0d0d0"
          id={'tip_' + cellData.rowData.id}
          place="top"
          effect="solid"
        >
          <div className="info-tooltip">
            <p>
              Min val: {cellData.rowData.minValFormulaSetParameter} Max val:{' '}
              {cellData.rowData.maxValFormulaSetParameter} Default val:{' '}
              {cellData.rowData.defaultValuePrevious}
            </p>
          </div>
        </ReactTooltip>
      </div>
    );
  };

  const productCategoryOnChangeHandler = (e) => {
    setFormulaSetId(e);
    setMasterRecipeName(
      allFormulaSet
        .filter((item) => {
          return item.id === e;
        })
        .map((_item) => {
          return _item.masterRecipeName;
        })[0]
    );
    setProductID(null);
    setFormulaParamsList({});
  };

  const productOnChangeHandler = (e) => {
    setProductID(e);
  };
  const refBatchOnChangeHandler = (e) => {
    setReferenceBatch(e);
  };

  return (
    <div className="modal-batch ">
      {/* {renderModal()} */}
      <AlertPopup
        messageBoxItem={messageBoxItem}
        open={open}
        setOpen={setOpen}
      ></AlertPopup>

      <Card className="bg-light-550-force">
        <Card.Content>
          <div className="p-4">
            <PageTitle content="Create Batch" />
            <div className="batch-conetent mt-8">
              <Grid>
                <Grid.Row>
                  <Grid.Column
                    xsWidth={8}
                    sWidth={6}
                    mWidth={6}
                    lWidth={5}
                    xlWidth={4}
                    width={3}
                  >
                    <Card className="bg-light-550-force">
                      <Card.Header>
                        <div className="font-size-14 text-dark-200 text-semibold d-flex w-100 mb-5">
                          Batch information
                        </div>
                      </Card.Header>
                      <Card.Content className="border ml-n4">
                        <Grid>
                          <Grid.Row>
                            <Grid.Column width={6}>
                              <Tooltip
                                content={formulaSetId}
                                element={
                                  <Select
                                    label="Formula set"
                                    placeholder={`${FORMULASET} name`}
                                    className="batch-select-container-disabled"
                                    value={formulaSetId}
                                    search={true}
                                    defaultValue={formulaSetId}
                                    onChange={(e) => {
                                      return productCategoryOnChangeHandler(e);
                                    }}
                                    options={formulaSetList}
                                    disabled={
                                      !location.state.fromNavigationMenu
                                    }
                                    fluid
                                  />
                                }
                                position="top center"
                                event="hover"
                                hoverable
                              />
                            </Grid.Column>
                            <Grid.Column width={6}>
                              <Input
                                label="Master recipe"
                                className="batch-input-metadata-disabled"
                                value={masterRecipeName}
                                disabled
                                fluid
                              />
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column width={6}>
                              <Tooltip
                                content={productID}
                                element={
                                  <Select
                                    label="Formula"
                                    className="batch-select-container-disabled"
                                    placeholder="Formula/Product"
                                    defaultValue={productID}
                                    value={productID}
                                    options={productsList}
                                    search={true}
                                    onChange={(e) => {
                                      return productOnChangeHandler(e);
                                    }}
                                    disabled={
                                      !location.state.fromNavigationMenu
                                    }
                                    fluid
                                  />
                                }
                                position="top center"
                                event="hover"
                                hoverable
                              />
                            </Grid.Column>
                            <Grid.Column width={6}>
                              {referenceBatch ? (
                                <Tooltip
                                  content={referenceBatch}
                                  element={
                                    <Select
                                      label="Reference batch"
                                      className="batch-select-container-disabled"
                                      placeholder="Select reference batch"
                                      defaultValue={referenceBatch}
                                      value={referenceBatch}
                                      options={refBatchList}
                                      search
                                      onChange={(e) => {
                                        return refBatchOnChangeHandler(e);
                                      }}
                                      indicator="optional"
                                      fluid
                                    />
                                  }
                                  position="top center"
                                  event="hover"
                                  hoverable
                                />
                              ) : (
                                <Select
                                  label="Reference batch"
                                  className="batch-select-container-disabled"
                                  placeholder="Select reference batch"
                                  defaultValue={referenceBatch}
                                  value={referenceBatch}
                                  options={refBatchList}
                                  search
                                  onChange={(e) => {
                                    return refBatchOnChangeHandler(e);
                                  }}
                                  indicator="optional"
                                  fluid
                                />
                              )}
                            </Grid.Column>
                          </Grid.Row>
                          <Grid.Row>
                            <Grid.Column width={6}>
                              <Input
                                label="Batch ID"
                                placeholder="Batch ID"
                                className="batch-input-metadata"
                                value={batchID}
                                onChange={(value) => validateBatchID(value)}
                                fluid
                              />
                            </Grid.Column>
                            <Grid.Column width={6}>
                              <Input
                                label="Batch size"
                                placeholder="Batch Size"
                                className="batch-input-metadata"
                                value={batchSize}
                                onChange={(value) =>
                                  validateAndSetBatchSize(value)
                                }
                                helperText={
                                  defaultBatchSize
                                    ? `Default batch size is ${defaultBatchSize} ${batchSizeEngUnit}`
                                    : undefined
                                }
                                icon={<span>{batchSizeEngUnit}</span>}
                                fluid
                              />
                            </Grid.Column>
                          </Grid.Row>
                        </Grid>
                      </Card.Content>
                    </Card>
                  </Grid.Column>
                  <Grid.Column
                    xsWidth={12}
                    sWidth={6}
                    mWidth={6}
                    lWidth={7}
                    xlWidth={8}
                    width={9}
                  >
                    <div className="batch-params mt-n2">
                      <Tab
                        defaultActiveIndex={0}
                        onTabChange={(activeIndex) => onTabChange(activeIndex)}
                      >
                        <Tab.Pane title="Formula parameters">
                          <Card className="bg-light-550-force">
                            <Card.Content className="border">
                              <div hidden={productID}>
                                No formula parameters found.
                              </div>
                              <div
                                hidden={!productID}
                                className="params-container"
                              >
                                <div className="card-table">
                                  {formulaParamsList['params'] &&
                                    formulaParamsList['params'].length > 0 && (
                                      <DataTable
                                        data={formulaParamsList['params']}
                                        scrollable={true}
                                        scrollHeight="20vw"
                                        rows={PAGE_SIZE}
                                      >
                                        <DataTable.Column
                                          initialWidth="11.54vw"
                                          field={
                                            showDescription
                                              ? 'formulaParameterDescription'
                                              : 'name'
                                          }
                                          header={
                                            showDescription
                                              ? 'Parameter Description'
                                              : 'Parameter Name'
                                          }
                                        />
                                        <DataTable.Column
                                          field="defaultValue"
                                          align="right"
                                          header="Value"
                                          initialWidth="6.12vw"
                                        />
                                        <DataTable.Column
                                          field="enggUnit"
                                          align="left"
                                          header="Eng units"
                                          initialWidth="5.56vw"
                                        />
                                        <DataTable.Pagination />
                                      </DataTable>
                                    )}
                                </div>
                                <div className="mt-4 cursor">
                                  <Checkbox
                                    toggle={true}
                                    label="Show parameter name"
                                    className="description"
                                    checked={!showDescription}
                                    onChange={() => {
                                      setShowDescription(!showDescription);
                                    }}
                                  />
                                </div>
                              </div>
                            </Card.Content>
                          </Card>
                        </Tab.Pane>
                        <Tab.Pane title="Unit selection">
                          <Card className="bg-light-550-force">
                            <Card.Content className="border">
                              <div hidden={!(tempUnitsList.length <= 0)}>
                                No units found.
                              </div>
                              <div
                                hidden={tempUnitsList.length <= 0}
                                className="card-table"
                              >
                                <div className="unit-selection-list">
                                  <Grid>
                                    {tempUnitsList.map((item, index) => {
                                      const optionsList = [];
                                      let isOptionValueExists = true;

                                      const isNoUnits =
                                        item['unitSelectionList'] == null ||
                                        item['unitSelectionList'].length == 0;
                                      if (!isNoUnits) {
                                        isOptionValueExists = true;
                                        item['unitSelectionList'].map(
                                          (liitem, liIndex) => {
                                            optionsList[liIndex] = {
                                              text: liitem,
                                              value: liitem,
                                            };
                                          }
                                        );
                                      } else {
                                        isOptionValueExists = false;
                                        optionsList.push({
                                          text: item.primaryUnit,
                                          value: item.primaryUnit,
                                        });
                                      }
                                      // setSelectedUnits(item["unitParamName"], item["primaryUnit"]);

                                      return (
                                        // <div key={'div_' + item['unitName']}>
                                        isOptionValueExists ? (
                                          <Grid.Row key={item['unitName']}>
                                            <Grid.Column
                                              sWidth={3}
                                              xsWidth={3}
                                              mWidth={3}
                                            >
                                              <InputLabel
                                                label={item['unitName']}
                                              />
                                            </Grid.Column>
                                            <Grid.Column
                                              sWidth={3}
                                              xsWidth={3}
                                              mWidth={3}
                                            >
                                              <Select
                                                className="batch-select-container"
                                                placeholder={
                                                  'Choose ' + item['unitName']
                                                }
                                                options={optionsList}
                                                disabled={isNoUnits}
                                                value={getSelectedUnit(
                                                  item['unitParamName']
                                                )}
                                                onChange={(value) =>
                                                  setSelectedUnits(
                                                    item['unitParamName'],
                                                    value
                                                  )
                                                }
                                              />
                                            </Grid.Column>
                                          </Grid.Row>
                                        ) : (
                                          <Grid.Row key={item['unitName']}>
                                            <Grid.Column
                                              sWidth={3}
                                              xsWidth={3}
                                              mWidth={3}
                                            >
                                              <InputLabel
                                                label={item['unitName']}
                                              />
                                            </Grid.Column>
                                            <Grid.Column
                                              sWidth={3}
                                              xsWidth={3}
                                              mWidth={3}
                                            >
                                              <Select
                                                className="batch-select-container"
                                                placeholder={
                                                  'Choose ' + item['unitName']
                                                }
                                                options={optionsList}
                                                value={item.primaryUnit}
                                              />
                                            </Grid.Column>
                                          </Grid.Row>
                                        )
                                        // </div>
                                      );
                                    })}
                                  </Grid>
                                </div>
                              </div>
                            </Card.Content>
                          </Card>
                        </Tab.Pane>
                      </Tab>
                    </div>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </div>
            <div className="d-flex justify-content-between mx-4 px-2">
              <div />
              <div>
                <Button
                  type="secondary"
                  size="small"
                  // className="seconday-button"
                  onClick={(e) => history.push(AppRoutes.DEFAULT.path)}
                >
                  Cancel
                </Button>

                <Permissions
                  type="disable"
                  allowed={[PermissionValues.CreateBatch]}
                >
                  {({ authorized }) => (
                    <Button
                      type="primary"
                      size="small"
                      disabled={
                        !batchID ||
                        !batchSize ||
                        !isFormulaParameterValid ||
                        !productID ||
                        !authorized
                      }
                      // className="primary-button"
                      onClick={(e) => onSaveClick(e)}
                    >
                      Create
                    </Button>
                  )}
                </Permissions>
              </div>
            </div>
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
export default withBatchManagementContext(CreateBatch);
