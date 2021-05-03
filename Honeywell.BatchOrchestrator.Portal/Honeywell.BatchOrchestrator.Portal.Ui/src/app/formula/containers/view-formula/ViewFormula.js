/* eslint-disable prettier/prettier */
/* eslint-disable func-names */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-underscore-dangle */
/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable consistent-return */

import React, { useEffect, useState, useRef } from 'react';
import { Input, Button, Icon, Checkbox, Modal, Card } from '@scuf/common';
import { useHistory, useLocation } from 'react-router-dom';
import { AppRoutes } from 'routing';
import { Permissions, useAuthorize } from 'core/authentication';
import { useConfirm } from 'shared/confirm-dialog';
import { PermissionValues } from 'core/authentication/models/user-permission';
import { AppConstants } from 'utils/app-constants';
import ViewFormulaTable from './ViewFormulaTable';
import '../../stylesheets/ViewFormula.scss';
import '../../stylesheets/MessageBox.scss';
// import { BASE_ROUTE } from '../../../../utils/constants/routes';
import { PARAM_TYPES } from '../../../../utils/constants/enums';
import { errorHandler } from '../../../../core/error';
import AlertPopup from '../AlertPopup';
import {
  FORMULA,
  IDENTIFICATION,
} from '../../../../utils/constants/boterminology';
import {
  setFormulaLockApiCall,
  getFormulaCommentsApiCall,
  getFormulaDetailsApiCall,
} from './view-formula-service';

function ViewFormula(props) {
  const { setProductNeedToBeSave, productNeedToBeSave } = props;
  const [productID, setProductID] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [version, setVersion] = useState('');
  const [tableData, setTableData] = useState([]);
  const [editFormula, setEditFormula] = useState(false);
  const [search, setSearch] = useState('');
  const [showDescription, setShowDescription] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [showRawMaterialFilter, setShowRawMaterialFilter] = useState(false);
  const [showScalableFilter, setShowScalableFilter] = useState(false);
  const [showUnitFilter, setShowUnitFilter] = useState(false);
  const [unitFilters, setUnitFilters] = useState(new Set());
  const [unitOptions, setUnitOptions] = useState(null);
  const [selectedRawOptions, setSelectedRawOptions] = useState(new Set());
  const [selectedScalableOptions, setSelectedScalableOptions] = useState(
    new Set()
  );
  const [selectedUnitOptions, setSelectedUnitOptions] = useState(new Set());
  const [showComment, setShowComment] = useState(false);
  const [description, setDescription] = useState('');
  const [allowSave, setAllowSave] = useState(false);
  const [postData, setPostData] = useState([]);
  const [allowPost, setAllowPost] = useState(false);
  const [isSubmitForApproval, setIsSubmitForApproval] = useState(false);
  const [statusOfFormula, setStatusOfFormula] = useState(-1);
  const [popupFlag, setPopupFlag] = useState(false);
  const [submitterComment, setSubmitterComment] = useState(null);
  const [formulaComments, setformulaComments] = useState(null);
  const [formulaSetStatus, setFormulaSetStatus] = useState(0);
  const [messageBoxItem, setMessageBoxItem] = useState('');
  const [open, setOpen] = useState(false);
  const [productDetails, setProductDetails] = useState([]);
  const [isProductEditLocked, setIsProductEditLocked] = useState(false);
  const [isFormulaNotReferenced, SetIsFormulaNotReferenced] = useState(false);

  const confirm = useConfirm();
  const { authorized: isAuthorize } = useAuthorize([
    PermissionValues.ViewFormulaSetAndFormula,
    PermissionValues.ModifyFormulaSetAndFormula,
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

  let errorMessage = '';
  const renderModal = () => {
    return (
      <Modal
        className="modal-Popup"
        closeIcon
        size="small"
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
            content="Submit"
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

  let _productId;
  let _productType;
  const history = useHistory();
  const location = useLocation();

  const setFormulaLock = (productId, isLocked) => {
    setFormulaLockApiCall(productId, isLocked).then((res) => {
      SetIsFormulaNotReferenced(res.data.success);
      if (res && res.data && !res.data.success) {
        setMessageBoxItem(res.data.message);
        setOpen(!open);
      }

      if (res.status === 200 && res.data.success) {
        setEditFormula(true);
        setIsProductEditLocked(isLocked);
        return 1;
      }
    });
  };

  const getFormulaComments = () => {
    getFormulaCommentsApiCall(productID).then((res) => {
      if (res.status === 200) {
        const { data } = res;
        props.setSubmitterFormulaComment(data.submitterComment);
        props.setApproverFormulaComment(data.approvarComment);
        setSubmitterComment(data.submitterComment);
        setformulaComments(data);
      }
    });
  };

  useEffect(() => {
    if (props.showViewFormula) {
      getFormulaDetails();
    }
    // eslint-disable-next-line
  }, [props.showViewFormula]);

  async function getFormulaDetails() {
    let data = [];
    let modifiedFormulaData = [];

    _productId = props.product.productID
      ? props.product.productID
      : location.state.product.productId;
    _productType = props.productMR.set
      ? props.productMR.set
      : location.state.product.productType;

    await getFormulaDetailsApiCall(_productId)
      .then((response) => {
        if (response.status === 200) {
          data = response.data;
          setFormulaSetStatus(data.formulaSetStatus);
          setStatusOfFormula(data.status);
          // setProductName(props.product.productName)
          setProductID(_productId);
          setVersion(props.product.version);
          // setMasterRecipe(props.productMR.recipe)
          setProductDetails(data);
          setIsProductEditLocked(data.lock);
          setDescription(data.productDescription);
          const formulaData = [];
          formulaData.push(data);
          {
            for (let i = 0; i < formulaData.length; i += 1) {
              modifiedFormulaData =
                formulaData[i].formulaParameterInfoForApprovals &&
                formulaData[i].formulaParameterInfoForApprovals.map(
                  (entry, index) => {
                    return {
                      no: parseInt(index) + 1,
                      item: entry.name,
                      value: entry.isSelected
                        ? entry.defaultValue
                        : entry.notApplicableValue,
                      unit: entry.enggUnit,
                      min: entry.minValFormulaSetParameter,
                      max: entry.maxValFormulaSetParameter,
                      scale: entry.scalable,
                      setMin: entry.minSetPoint,
                      setMax: entry.maxSetPoint,
                      desc: entry.formulaParameterDescription,
                      optionValue: entry.optionValue,
                      enumSetName: entry.enumSetName,
                      rawMaterial: !!entry.rawMaterial,
                      id: entry.id,
                      optionValue: entry.optionValue,
                      paramType: entry.paramType,
                      isSelected: entry.isSelected,
                      tempDefaultValue: entry.defaultValue,
                      notApplicableValue: entry.notApplicableValue,
                    };
                  }
                );
            }

            setTableData(modifiedFormulaData);
            // --Code for set user prev selection
            // setSelectedAll(true)
            const selectedFormulaParameters = [];
            modifiedFormulaData.map((row) => {
              if (row.isSelected) {
                selectedFormulaParameters.push(row);
              }
            });
            setSelectedRows(selectedFormulaParameters);
          }
        }
      })
      .catch((err) => {
        if (err && err.status && err.status !== 200) {
          setMessageBoxItem(err.message);
          setOpen(!open);
        }
      });
  }

  /// ///////////////////////////////////////////////////////

  // this useEffect is written for edit formula only
  useEffect(() => {
    let data = [];
    let new_data = [];
    async function getFormula() {
      _productId = props.product.productID
        ? props.product.productID
        : location.state.product.productId;
      _productType = props.productMR.set
        ? props.productMR.set
        : location.state.product.productType;

      if (productDetails === null) {
        try {
          getFormulaDetailsApiCall(_productId)
            .then((response) => {
              if (response.status === 200) {
                data = response.data;
              } else {
                throw errorHandler(response);
              }
            })

            .catch((err) => {
              if (err && err.status && err.status !== 200) {
                setMessageBoxItem(err.message);
                setOpen(!open);
              }
            });
        } catch (ex) {
          errorHandler();
        }
      } else {
        data = productDetails;
      }

      // setProductName(props.product.productName)
      _productId = props.product.productID
        ? props.product.productID
        : location.state.product.productId;
      setProductID(_productId);
      setVersion(props.product.version);
      // setMasterRecipe(props.productMR.recipe)
      setDescription(data.productDescription);

      const data2 = [];

      data2.push(data);

      for (let i = 0; i < data2.length; i += 1) {
        new_data =
          data2[i].formulaParameterInfoForApprovals &&
          data2[i].formulaParameterInfoForApprovals.map((entry, index) => {
            return {
              id: entry.id,
              formulaId: entry.formulaId,
              formulaSetParameterId: entry.formulaSetParameterId,
              defaultValue: entry.defaultValue,
              defaultValuePrevious: entry.defaultValuePrevious,
              minSetPoint: entry.minValFormulaSetParameter,
              maxSetPoint: entry.maxValFormulaSetParameter,
              minSetPointPrevious: entry.minSetPointPrevious,
              maxSetPointPrevious: entry.maxSetPointPrevious,
              isSelected: entry.isSelected,
              createdBy: entry.createdBy,
              modifiedBy: entry.modifiedBy,
              isSelectedPrevious: entry.isSelectedPrevious,
              isNewRow: entry.isNewRow,
              isFormulaParameterModified: entry.isFormulaParameterModified,
              tempDefaultValue: entry.defaultValue,
              notApplicableValue: entry.notApplicableValue,
            };
          });

        // Loop to update the defalut value , min and Max on the change in table
        for (let i = 0; i < new_data.length; i++) {
          for (let j = 0; j < tableData.length; j++) {
            if (new_data[i].id === tableData[j].id) {
              new_data[i].defaultValue = tableData[j].value;
              new_data[i].minSetPoint = tableData[j].setMin;
              new_data[i].maxSetPoint = tableData[j].setMax;
              continue;
            }
          }
        }

        // loop to make all isSelected as false
        if (selectedRows.length > 0) {
          for (let i = 0; i < new_data.length; i += 1) {
            new_data[i].isSelected = false;
          }
        }

        // loop to update isSelectd to populate the view formula table
        for (let i = 0; i < new_data.length; i += 1) {
          for (let j = 0; j < selectedRows.length; j += 1) {
            if (new_data[i].id === selectedRows[j].id) {
              new_data[i].isSelected = true;
            }
          }
        }

        const newEditedFormula = {
          id: data2[i].id,
          formulasetId: data2[i].formulasetId,
          name: data2[i].productName,
          version: data2[i].version,
          productId: data2[i].productId,
          status: data2[i].status,
          approvedBy: data2[i].approvedBy,
          approvedDt: data2[i].approvedDt,
          createdBy: data2[i].createdBy,
          modifiedBy: data2[i].modifiedBy,
          isSyncWithDataBlock: data2[i].isSyncWithDataBlock,
          formulaParameter: new_data,
          description: data2[i].productDescription,
        };

        const newEditedFormula2 = [];
        newEditedFormula2.push(newEditedFormula);

        props.setEditFormulaData(newEditedFormula2);
      }
    }

    if (editFormula) {
      getFormula();
    }
    // eslint-disable-next-line
  }, [tableData, selectedRows]);

  /// ////////////////////////////////////////////
  useEffect(() => {
    if (tableData.length > 0) {
      const options = new Set();
      for (let i = 0; i < tableData.length; i += 1) {
        if (options.has(tableData[i].unit.toLowerCase())) {
          continue;
        }
        options.add(tableData[i].unit.toLowerCase());
      }
      setUnitFilters(options);
    } else {
      setUnitFilters(new Set());
    }
  }, [tableData]);
  useEffect(() => {
    if (unitFilters.size > 0) {
      const options = Array.from(unitFilters);
      const units = options.map((option) => {
        return (
          <Checkbox
            checked={selectedUnitOptions.has(option)}
            label={option.toUpperCase()}
            key={option}
            onChange={() => {
              const update = new Set(selectedUnitOptions);
              if (selectedUnitOptions.has(option)) {
                update.delete(option);
                setSelectedUnitOptions(update);
              } else {
                update.add(option);
                setSelectedUnitOptions(update);
              }
            }}
            className="option"
          />
        );
      });
      setUnitOptions(units);
    }
  }, [unitFilters, selectedUnitOptions]);

  const refFilter = useRef();
  function useOnClickOutsideFilter(refFilter, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (
          !refFilter.current ||
          refFilter.current.contains(event.target) // ||
          // event.target.classList[0] === 'tab' ||
          // event.target.parentNode.classList[0] === 'sidebar' ||
          // event.target.parentNode.parentNode.classList[0] === 'sidebar' ||
          // event.target.parentNode.classList[0] === 'filter' ||
          // event.target.parentNode.classList[0] === 'filter-button'
        ) {
          return;
        }
        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [refFilter, handler]);
  }

  const getValueFromOptions = (options, defaultValue) => {
    const object = options.filter((row) => {
      if (row.text.toLowerCase() === defaultValue.toLowerCase()) {
        return row;
      }
    });
    return object[0]?.value;
  };

  const validateProductData = () => {
    const products = tableData;

    const productWithError = [];
    const validProducts = products.filter((row) => {
      let { value } = row;
      let { setMin } = row;
      let { setMax } = row;
      let { min } = row;
      let { max } = row;
      if (
        value.toLowerCase() === 'nan' &&
        min.toLowerCase() === 'nan' &&
        max.toLowerCase() === 'nan'
      ) {
        return row;
      }
      if (row.paramType === PARAM_TYPES.INTEGER) {
        value = parseFloat(row.value);
        setMin = parseFloat(row.setMin);
        setMax = parseFloat(row.setMax);
        min = parseFloat(row.min);
        max = parseFloat(row.max);
        // --validate the default value
        if (value === '' || setMin === '' || setMax === '') {
          errorMessage = 'Blank values are not allowed';
          productWithError.push({ row, err: errorMessage });
        } else if (value < setMin || value > setMax) {
          errorMessage = 'Invalid value';
          productWithError.push({ row, err: errorMessage });
        } else if (setMin < min || setMin >= max) {
          errorMessage = 'Invalid min';
          productWithError.push({ row, err: errorMessage });
        } else if (setMax > max || setMax <= min) {
          errorMessage = 'Invalid max';
          productWithError.push({ row, err: errorMessage });
        } else if (
          !(
            Number.isInteger(value) &&
            Number.isInteger(setMin) &&
            Number.isInteger(setMax)
          )
        ) {
          errorMessage = 'Invalid integer value';
          productWithError.push({ row, err: errorMessage });
        } else {
          return row;
        }
      } else if (row.paramType === PARAM_TYPES.DOUBLE) {
        value = parseFloat(row.value);
        setMin = parseFloat(row.setMin);
        setMax = parseFloat(row.setMax);
        min = parseFloat(row.min);
        max = parseFloat(row.max);
        if (value === '' || setMin === '' || setMax === '') {
          errorMessage = 'Blank values are not allowed';
          productWithError.push({ row, err: errorMessage });
        } else if (value < setMin || value > setMax) {
          errorMessage = 'Invalid value';
          productWithError.push({ row, err: errorMessage });
        } else if (setMin < min || setMin >= max) {
          errorMessage = 'Invalid min';
          productWithError.push({ row, err: errorMessage });
        } else if (setMax > max || setMax <= min) {
          errorMessage = 'Invalid max';
          productWithError.push({ row, err: errorMessage });
        } else {
          return row;
        }
      } else if (
        row.paramType === PARAM_TYPES.ENUMERATION ||
        row.paramType === PARAM_TYPES.BOOLEAN
      ) {
        if (
          (min.length === 0 || min.toLowerCase() === 'nan') &&
          (max.length === 0 || max.toLowerCase() === 'nan')
        ) {
          return row;
        }

        const optionValues = [];
        const options = JSON.parse(row.optionValue);
        options.map((opt) => {
          const obj = {};
          obj.text = opt.EnumerationString;
          obj.value = opt.EnumerationNumber;
          optionValues.push(obj);
        });

        const valueFromOptions = getValueFromOptions(optionValues, value);
        const setMinFromOptions = getValueFromOptions(optionValues, setMin);
        const setMaxFromOptions = getValueFromOptions(optionValues, setMax);
        const minFromOptions = getValueFromOptions(optionValues, min);
        const maxFromOptions = getValueFromOptions(optionValues, max);

        if (
          setMinFromOptions >= minFromOptions &&
          setMaxFromOptions <= maxFromOptions
        ) {
          if (
            valueFromOptions >= setMinFromOptions &&
            valueFromOptions <= setMaxFromOptions
          ) {
            return row;
          }
          errorMessage = 'Please check range min, max and default value ';
          productWithError.push({ row, err: errorMessage });
        } else {
          errorMessage = 'Please check range min, max and default value ';
          productWithError.push({ row, err: errorMessage });
        }
      } else if (row.paramType === PARAM_TYPES.STRING) {
        value = row.value;
        setMin = row.setMin;
        setMax = row.setMax;

        if (value && value.length > 8) {
          errorMessage = 'Only eight charaters are allowed';
          productWithError.push({ row, err: errorMessage });
        } else {
          return row;
        }
      }
    });
    if (productWithError.length > 0) {
      setMessageBoxItem(
        `Error : ${productWithError[0].err} for parameter name ${productWithError[0].row.item}`
      );
      setOpen(!open);
      props.setProductNeedToBeSave(false);
    } else {
      props.setProductNeedToBeSave(true);
      // history.push(BASE_ROUTE)
    }
  };

  const onSubmitClick = () => {
    if (formulaSetStatus === 2) {
      if (submitterComment && submitterComment.length > 0) {
        props.setSubmitForFormulaApproval(true);
        setIsSubmitForApproval(true);
        setAllowPost(true);
        // props.setAllowPost(true)
        setShowDescription(false);
        setShowComment(false);
        setSearch('');
        setShowFilters(false);
        setShowRawMaterialFilter(false);
        setShowScalableFilter(false);
        setShowUnitFilter(false);
        setUnitFilters(new Set());
        setUnitOptions(null);
        setSelectedRawOptions(new Set());
        setSelectedScalableOptions(new Set());
        setSelectedUnitOptions(new Set());
        props.setSubmitterFormulaComment(submitterComment);
        props.setApproverFormulaComment(
          formulaComments && formulaComments.approvarComment
        );
        props.setProductNeedToBeSave(true);
        setFormulaLock(productID, false);
        // history.push(BASE_ROUTE)
      } else {
        // alert("Please add comments.")
        setMessageBoxItem('Please add comments.');

        setOpen(!open);
      }
    } else {
      // alert("FormulaSet status is in review.")
      setMessageBoxItem('FormulaSet status is draft/in review');

      setOpen(!open);
    }
  };

  const onSaveDraftClick = () => {
    props.setSubmitForFormulaApproval(false);
    setAllowPost(true);
    // props.setAllowPost(true)
    setShowDescription(false);
    setShowComment(false);
    setSearch('');
    setShowFilters(false);
    setShowRawMaterialFilter(false);
    setShowScalableFilter(false);
    setShowUnitFilter(false);
    setUnitFilters(new Set());
    setUnitOptions(null);
    setSelectedRawOptions(new Set());
    setSelectedScalableOptions(new Set());
    setSelectedUnitOptions(new Set());
    props.setSubmitterFormulaComment(submitterComment);
    props.setApproverFormulaComment(
      formulaComments && formulaComments.approvarComment
    );
    props.setAllowEditFormulaDataPost(true);
    props.setProductNeedToBeSave(false);
    setFormulaLock(productID, false);
    // validateProductData()
    setProductNeedToBeSave(true);
    // history.push(BASE_ROUTE)
  };

  const ref = useRef();
  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (
          !ref.current ||
          ref.current.contains(event.target) // ||
          // event.target.classList[0] === 'tab' ||
          // event.target.parentNode.classList[0] === 'sidebar' ||
          // event.target.parentNode.parentNode.classList[0] === 'sidebar'
        ) {
          return;
        }
        handler(event);
      };

      document.addEventListener('mousedown', listener);
      document.addEventListener('touchstart', listener);

      return () => {
        document.removeEventListener('mousedown', listener);
        document.removeEventListener('touchstart', listener);
      };
    }, [ref, handler]);
  }

  return (
    <div className={`create-product${props.showViewFormula ? '' : ' none'}`}>
      {/* {renderModal()} */}
      <AlertPopup
        messageBoxItem={messageBoxItem}
        open={open}
        setOpen={setOpen}
      />
      {popupFlag && (
        <div className="Approvals_comments_vf" style={{ msGridRow: 1 }}>
          <div className="Approvals_comments_vf_close" style={{ msGridRow: 1 }}>
            <div className="Approvals_comments_vf_close_text">
              <p>Comments</p>
            </div>
            <div className="Approvals_comments_vf_close_close">
              <span onClick={() => setPopupFlag(false)}>X</span>
            </div>
          </div>
          <div
            className="Approvals_comments_vf_submitter"
            style={{ msGridRow: 2 }}
          >
            <p style={{ msGridRow: 1 }}>Submitter Comments</p>
            <textarea
              style={{ msGridRow: 2 }}
              value={submitterComment}
              onChange={(event) => {
                setSubmitterComment(event.target.value);
              }}
            />
          </div>
          <div
            className="Approvals_comments_vf_approver"
            style={{ msGridRow: 3 }}
          >
            <p style={{ msGridRow: 1 }}>Approver Comments</p>
            <textarea
              style={{ msGridRow: 2 }}
              value={formulaComments && formulaComments.approvarComment}
              disabled
            />
          </div>
          <div className="Approvals_comments_vf_save" style={{ msGridRow: 4 }}>
            <Button
              type="primary"
              size="small"
              onClick={() => setPopupFlag(false)}
              textTransform={false}
            >
              Save
            </Button>
          </div>
        </div>
      )}
      <Card className="mt-0 bg-light-550-force">
        <Card.Content>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div className="font-size-20 text-dark-400 text-semibold">
                {editFormula && isFormulaNotReferenced
                  ? `Edit ${location.state.product.productType}`
                  : location.state.product.productType}
              </div>
              <div className="ml-4 cursor-pointer font-size-16">
                <span
                  title="Edit formula"
                  className="icon-Edit"
                  onClick={() => {
                    if (statusOfFormula !== 1) {
                      const formulaTempData = [...tableData];
                      setTableData(formulaTempData);
                      setEditFormula(true);
                      // setIsProductEditLocked(isProductEditLocked);
                      setFormulaLock(productID, true);
                      // if (!isProductEditLocked) {
                      //   // --Make api call if isProductEditLocked === false
                      //   setFormulaLock(productID, true);
                      // }
                      // setIsProductEditLocked(true);
                    } else {
                      // console.log('Product already submitted for aprroval')
                    }
                  }}
                >
                  {' '}
                  {isProductEditLocked && (
                    <label className="warning">Locked for editing</label>
                  )}
                </span>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Input
                value={search}
                placeholder="Search the table below"
                iconPosition="left"
                icon={<Icon name="search" root="common" exactSize="0.875rem" />}
                onChange={(value) => {
                  setSearch(value);
                }}
              />
              <div className="filter">
                <div
                  className={`filter-button d-flex align-items-center justify-content-between${
                    showFilters ? ' show-filter' : ''
                  }`}
                  onClick={() => {
                    setShowFilters(!showFilters);
                    setShowScalableFilter(false);
                    setShowRawMaterialFilter(false);
                    setShowUnitFilter(false);
                  }}
                >
                  <i className="icon-Advance-filter" />
                  <span className="filter-header-text ml-1">All Filters</span>
                </div>
                <div className="clear" />
                <div
                  className={`filter-card${showFilters ? '' : ' none'}`}
                  ref={refFilter}
                >
                  <div className="header d-flex justify-content-between p-4">
                    <div className="head">Filters</div>
                    <div
                      className="clear-all"
                      onClick={() => {
                        setSelectedRawOptions(new Set());
                        setSelectedScalableOptions(new Set());
                        setSelectedUnitOptions(new Set());
                      }}
                    >
                      Clear All
                    </div>
                  </div>
                  <div
                    className="filter-parameter"
                    onClick={() => {
                      setShowRawMaterialFilter(!showRawMaterialFilter);
                      setShowUnitFilter(false);
                      setShowScalableFilter(false);
                    }}
                  >
                    <div className="filter-parameter-title">Raw Material</div>
                    <Icon
                      name={`caret${showRawMaterialFilter ? '-up' : '-down'}`}
                      root="common"
                      exactSize=".6667rem"
                      className="parameter-icon"
                    />
                  </div>
                  <div
                    className={`filter-options${
                      showRawMaterialFilter ? '' : ' none'
                    }`}
                  >
                    <Checkbox
                      checked={selectedRawOptions.has('true')}
                      label="True"
                      onChange={() => {
                        const update = new Set(selectedRawOptions);
                        if (selectedRawOptions.has('true')) {
                          update.delete('true');
                        } else {
                          update.add('true');
                        }
                        setSelectedRawOptions(update);
                      }}
                      className="option"
                    />
                    <Checkbox
                      checked={selectedRawOptions.has('false')}
                      label="False"
                      onChange={() => {
                        const update = new Set(selectedRawOptions);
                        if (selectedRawOptions.has('false')) {
                          update.delete('false');
                        } else {
                          update.add('false');
                        }
                        setSelectedRawOptions(update);
                      }}
                      className="option"
                    />
                  </div>
                  <div
                    className="filter-parameter"
                    onClick={() => {
                      setShowUnitFilter(false);
                      setShowRawMaterialFilter(false);
                      setShowScalableFilter(!showScalableFilter);
                    }}
                  >
                    <div className="filter-parameter-title">Scalable</div>
                    <Icon
                      name={`caret${showScalableFilter ? '-up' : '-down'}`}
                      root="common"
                      exactSize=".6667rem"
                      className="parameter-icon"
                    />
                  </div>
                  <div
                    className={`filter-options${
                      showScalableFilter ? '' : ' none'
                    }`}
                  >
                    <Checkbox
                      checked={selectedScalableOptions.has('true')}
                      label="True"
                      onChange={() => {
                        const update = new Set(selectedScalableOptions);
                        if (selectedScalableOptions.has('true')) {
                          update.delete('true');
                        } else {
                          update.add('true');
                        }
                        setSelectedScalableOptions(update);
                      }}
                      className="option"
                    />
                    <Checkbox
                      checked={selectedScalableOptions.has('false')}
                      label="False"
                      onChange={() => {
                        const update = new Set(selectedScalableOptions);
                        if (selectedScalableOptions.has('false')) {
                          update.delete('false');
                        } else {
                          update.add('false');
                        }
                        setSelectedScalableOptions(update);
                      }}
                      className="option"
                    />
                  </div>
                  <div
                    className="filter-parameter"
                    onClick={() => {
                      setShowUnitFilter(!showUnitFilter);
                      setShowRawMaterialFilter(false);
                      setShowScalableFilter(false);
                    }}
                  >
                    <div className="filter-parameter-title">
                      Engineering Unit
                    </div>
                    <Icon
                      name={`caret${showUnitFilter ? '-up' : '-down'}`}
                      root="common"
                      exactSize=".6667rem"
                      className="parameter-icon"
                    />
                  </div>
                  <div
                    className={`filter-options scrollable${
                      showUnitFilter ? '' : ' none'
                    }`}
                  >
                    {unitOptions}
                  </div>
                </div>
              </div>

              <Checkbox
                checked={!showDescription}
                toggle
                label="Show parameter name"
                onChange={() => {
                  setShowDescription(!showDescription);
                }}
                className="pt-2"
              />
            </div>
          </div>
          <div className="horizontal-divider" />
          <div className="d-flex">
            <Input
              label={`${FORMULA} name`}
              value={location.state.product.name}
              fluid
              // onChange={(value) => {
              //   setProductName(value)
              // }}
              disabled
              className="w-25"
            />
            <Input
              label={`${IDENTIFICATION}`}
              value={location.state.product.formulaID || ''}
              // value="ABCDEFGHIJKLMNOPQRSTUVWXYZ123456"
              fluid
              // onChange={(value) => {
              //   setProductID(value)
              // }}
              disabled
              className="ml-4 w-25"
            />
            <Input
              label="Version"
              value=""
              fluid
              disabled
              className="ml-4 w-15"
            />
            <Input
              label="Description"
              value={description}
              // value="ABCDEFGHIJKLMNOPQRSTUVWXYZ123456ABCDEFGHIJKLMNOPQRSTUVWXYZ123456"
              fluid
              // onChange={(value) => {
              //   setDescription(value)
              // }}
              disabled
              className="ml-4 w-50"
            />
          </div>
          <ViewFormulaTable
            showViewFormula={props.showViewFormula}
            selectedRows={selectedRows}
            setSelectedRows={setSelectedRows}
            selectedAll={selectedAll}
            setSelectedAll={setSelectedAll}
            setAllowSave={setAllowSave}
            productMR={
              Object.keys(props.productMR).length === 0
                ? location.state && location.state.productMR
                : props.productMR
            }
            showCreateProduct={props.showCreateProduct}
            setPostData={setPostData}
            url={props.url}
            tableData={tableData}
            setTableData={setTableData}
            showDescription={showDescription}
            search={search}
            selectedUnitOptions={selectedUnitOptions}
            selectedRawOptions={selectedRawOptions}
            selectedScalableOptions={selectedScalableOptions}
            editFormula={editFormula}
            // selectedItemsBeforeEdit={selectedItemsBeforeEdit}
          />
        </Card.Content>
      </Card>

      <div className="clear" />
      <div className="buttons">
        <Button
          // className="cancel"
          size="small"
          onClick={() => {
            // props.setShowCreateProduct(false)
            // setProductName("")
            setProductID('');
            setDescription('');
            // props.setShowFormulaSets(true)
            setSelectedRows([]);
            setSelectedAll(false);
            setAllowSave(false);
            // setMasterRecipe("")
            setAllowPost(false);
            setPostData([]);
            // props.setComment("")
            setTableData([]);
            setShowDescription(false);
            setShowComment(false);
            setSearch('');
            setShowFilters(false);
            setShowRawMaterialFilter(false);
            setShowScalableFilter(false);
            setShowUnitFilter(false);
            setUnitFilters(new Set());
            setUnitOptions(null);
            setSelectedRawOptions(new Set());
            setSelectedScalableOptions(new Set());
            setSelectedUnitOptions(new Set());
            if (isProductEditLocked && editFormula) {
              setFormulaLock(productID, false);
            }
            history.push(AppRoutes.DEFAULT.path);
          }}
          content={isProductEditLocked && editFormula ? 'Cancel' : 'Close'}
          type="inline-secondary"
          textTransform={false}
        />
        <Permissions
          type="disable"
          allowed={[PermissionValues.ModifyFormulaSetAndFormula]}
        >
          {({ authorized }) => (
            <div className="float-right">
              <Button
                type="secondary"
                size="small"
                content="Add Comments"
                disabled={!authorized}
                // disabled={!(productName.length > 0 && productID.length > 0 && allowSave)}
                onClick={() => {
                  getFormulaComments();
                  setPopupFlag(true);
                  setShowComment(true);
                }}
                textTransform={false}
              />
              <Button
                type="secondary"
                size="small"
                content="Save Draft"
                // disabled={!(editFormula)}
                disabled={
                  !(allowSave && editFormula) ||
                  !isFormulaNotReferenced ||
                  !authorized
                }
                onClick={onSaveDraftClick}
                textTransform={false}
              />
              <Button
                type="primary"
                size="small"
                content="Submit for Approval"
                // disabled={!(editFormula)}
                disabled={
                  !(allowSave && editFormula) ||
                  !isFormulaNotReferenced ||
                  !authorized
                }
                onClick={onSubmitClick}
                textTransform={false}
              />
            </div>
          )}
        </Permissions>
      </div>
    </div>
  );
}

export default ViewFormula;
