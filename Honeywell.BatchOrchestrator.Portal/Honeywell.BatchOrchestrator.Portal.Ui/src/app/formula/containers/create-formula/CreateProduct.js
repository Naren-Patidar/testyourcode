/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-return-await */
/* eslint-disable no-continue */
/* eslint-disable no-useless-escape */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable consistent-return */
import React, { useEffect, useState, useRef } from 'react';
import {
  Input,
  Button,
  Icon,
  TextArea,
  Checkbox,
  Modal,
  Card,
} from '@scuf/common';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Permissions, useAuthorize } from 'core/authentication';
import { PermissionValues } from 'core/authentication/models/user-permission';
import { useConfirm } from 'shared/confirm-dialog';
import { AppConstants } from 'utils/app-constants';
import { AppRoutes } from 'routing';
import { getCookie } from 'utils/utility';
import ProductTable from './ProductTable';
import '../../stylesheets/CreateProduct.scss';
import { FM_URL } from '../../../../utils/Settings';
// import { BASE_ROUTE } from '../../../../utils/constants/routes';
import '../../stylesheets/MessageBox.scss';

import { errorHandler } from '../../../../core/error';
import AlertPopup from '../AlertPopup';
import {
  FORMULA,
  FORMULAS,
  IDENTIFICATION,
} from '../../../../utils/constants/boterminology';

const xsrfToken = getCookie('X-XSRF-TOKEN');
const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'X-XSRF-TOKEN': xsrfToken,
  },
  withCredentials: true,
});

function CreateProduct(props) {
  const [productName, setProductName] = useState('');
  const [productID, setProductID] = useState('');
  const [description, setDescription] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedAll, setSelectedAll] = useState(false);
  const [allowSave, setAllowSave] = useState(false);
  const [masterRecipe, setMasterRecipe] = useState('');
  const [allowPost, setAllowPost] = useState(false);
  const [postData, setPostData] = useState([]);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');
  const [showDescription, setShowDescription] = useState(true);
  const [search, setSearch] = useState('');
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
  const [tableData, setTableData] = useState([]);
  const [isSubmitForApproval, setIsSubmitForApproval] = useState(false);
  const [formulaSetDetails, setFormulaSetDetails] = useState([]);
  const [submitterComment, setSubmitterComment] = useState('');
  const history = useHistory();
  const location = useLocation();
  const [messageBoxItem, setMessageBoxItem] = useState('');
  const [open, setOpen] = useState(false);
  let lengthOFProductID = -1;
  let lengthOFProductDescription = -1;

  const confirm = useConfirm();
  const { authorized: isAuthorize } = useAuthorize([
    PermissionValues.CreateFormulaSetAndFormula,
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

  function performValidations(productName) {
    const pattern = new RegExp(
      /^([^` ~_\t!@$^+=.\/,\\<>'"*?|:;\[\]{}()%#&-])[a-zA-Z0-9`~!@$^+\t= _-]{0,31}$/
    );
    if (
      pattern.test(productName) &&
      lengthOFProductDescription <= 64 &&
      lengthOFProductID <= 32
    ) {
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
    } else {
      // alert("Check for special characters or length");
      setMessageBoxItem(
        'Check for special characters or length or Empty space at first character of formula name'
      );
      setOpen(!open);
    }
  }

  const validateProductName = (productName) => {
    const pattern = new RegExp(
      /^([^` ~_\t!@$^+=.\/,\\<>'"*?|:;\[\]{}()%#&-])[a-zA-Z0-9`~!@$^+\t= _-]{0,31}$/
    );
    if (pattern.test(productName)) {
      return true;
    }
    return false;
  };

  //
  function validatProductIDLength(input) {
    lengthOFProductID = input.length;
    if (lengthOFProductID <= 32) {
      return true;
    }
    return false;
  }
  function validatProductDescripton(input) {
    lengthOFProductDescription = input.length;
    if (lengthOFProductDescription <= 64) {
      return true;
    }
    return false;
  }

  const renderModal = () => {
    return (
      <Modal
        className="modal-Popup"
        size="small"
        closeIcon
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
    if (e.path === undefined) {
      setOpen(false);
    }
  };
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

  useEffect(() => {
    async function createFormula(saveData) {
      return await axiosClient
        .post(`${FM_URL}createformula`, saveData)
        // .then((response) => {
        //   if (response.status === 409) {
        //     // alert('Duplicate formula Name')
        //     setMessageBoxItem('Duplicate name');
        //     setOpen(!open);
        //   }
        //   return response.json();
        // })
        // .then((json) => console.log(json))
        .catch((err) => {
          if (err.response.status === 409) {
            setAllowPost(false);
            setMessageBoxItem('Duplicate name');
            setOpen(!open);
          }
        });
    }

    if (allowPost) {
      const formulaParameters = postData.slice(0);

      for (let i = 0; i < tableData.length; i += 1) {
        let itemSelected = false;
        selectedRows.filter((row) => {
          if (row.item === tableData[i].item) {
            itemSelected = true;
          }
        });

        const row = tableData[i];
        formulaParameters[i] = {
          paramName: row.item,
          defaultValue: row.value,
          engUnit: row.unit,
          minValue: row.min,
          maxValue: row.max,
          scalabale: row.scale,
          // minSetPoint: row.setMin?row.setMin:row.min ,
          // maxSetPoint: row.setMax?row.setMax:row.max,
          minSetPoint: row.min,
          maxSetPoint: row.max,
          paramDescription: row.desc,
          enumSetName: row.enumSetName,
          formulaSetParameterId: formulaParameters[i].id,
          isSelected: itemSelected,
          paramType: row.paramType,
          // defaultValuePrevious:row.value,
          // minSetPointPrevious:row.min,
          // maxSetPointPrevious:row.max,
          minSetPointPrevious: row.setMin,
          maxSetPointPrevious: row.setMax,
          defaultValuePrevious: row.value,
          isSelectedPrevious: itemSelected,
        };
      }
      const _productTypeName = props.productMR.set
        ? props.productMR.set
        : location.state.productMR.set;
      const _formulasetId = props.productMR.formulasetId
        ? props.productMR.formulasetId
        : location.state.productMR.formulaSetId;

      const new_entry = {
        name: productName,
        description,
        productID,
        version: 1,
        formulaParameter: formulaParameters,
        productTypeName: _productTypeName,
        formulasetId: _formulasetId,
        createdDt: new Date(),
        comment: submitterComment,
        submitterComment,
      };
      if (isSubmitForApproval) {
        new_entry.status = 1;
      } else {
        new_entry.status = 0;
      }
      createFormula(new_entry).then((res) => {
        if (res.status === 200) {
          history.push(AppRoutes.DEFAULT.path);
          setAllowPost(false);
          setAllowSave(false);
          setMasterRecipe('');
          setPostData([]);
          setSelectedAll(false);
          setSelectedRows([]);
          setProductID('');
          setProductName('');
          setTableData([]);
          setIsSubmitForApproval(false);
          props.setShowCreateProduct(false);
          props.setShowFormulas(true);
        } else {
          if (res && res.status && res.status !== 200) {
            setMessageBoxItem(errorHandler(res).message);
            setOpen(!open);
          }
          setAllowPost(false);
        }
      });
    }
    // eslint-disable-next-line
  }, [allowPost, masterRecipe, postData, productID, productName, selectedRows]);

  useEffect(() => {
    if (
      Object.keys(props.productMR).length > 0 &&
      props.productMR.constructor === Object
    ) {
      setMasterRecipe(props.productMR.recipe);
    }
  }, [props.productMR]);

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
  useOnClickOutsideFilter(refFilter, () => {
    setShowFilters(false);
    setShowScalableFilter(false);
    setShowRawMaterialFilter(false);
    setShowUnitFilter(false);
  });

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
  useOnClickOutside(ref, () => {
    setComment(props.comment);
    setShowComment(false);
  });

  const getFormulaSetParameters = async () => {
    try {
      await axiosClient
        .get(
          `${FM_URL}GetFormulaSetById/${location.state.productMR.formulaSetId}`
        )
        .then((response) => {
          if (response.status === 200) {
            setFormulaSetDetails(response.data);
            return response;
          }
          throw errorHandler(response);
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
  };
  useEffect(() => {
    if (location.state.productMR.formulaSetId) {
      getFormulaSetParameters();
    }
  }, [location.state.productMR.formulaSetId]);
  return (
    <div className={`create-product ${props.showCreateProduct ? '' : ' none'}`}>
      {/* {renderModal()} */}
      <AlertPopup
        messageBoxItem={messageBoxItem}
        open={open}
        setOpen={setOpen}
      />
      <div className={`comment-card ${showComment ? '' : ' none'}`} ref={ref}>
        <Icon
          name="close"
          root="common"
          exactSize="0.5rem"
          className="comment-close"
          onClick={() => {
            setShowComment(false);
            setComment(props.comment);
          }}
        />
        <div className="clear" />
        <p>Add comments</p>
        <TextArea
          placeholder="Add comments here"
          value={submitterComment}
          onChange={(value) => {
            setSubmitterComment(value);
          }}
        />
        <div className="mt-4 d-flex justify-content-end">
          <Button
            content="Save"
            type="primary"
            size="small"
            // className="comment-save"
            onClick={() => {
              props.setComment(comment);
              setShowComment(false);
            }}
            textTransform={false}
          />
        </div>
      </div>

      <Card className="mt-0 bg-light-550-force">
        <Card.Content>
          <div className="d-flex justify-content-between">
            <div className="font-size-20 text-dark-400 text-semibold">
              Create formula
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
              value={productName || ''}
              fluid
              onChange={(value) => {
                if (value.length > 0) {
                  if (validateProductName(value)) {
                    setProductName(value);
                  } else {
                    setMessageBoxItem(
                      'Check for special characters or length or Empty space at first character of formula name'
                    );
                    setOpen(!open);
                  }
                } else {
                  setProductName('');
                }
              }}
              // onBlur={() => {
              //   if (isNullOrWhitespace(productName)) {
              //     //alert("Product can not be blank or empty spaces")
              //     setMessageBoxItem("Product can not be blank or empty spaces")
              //     setOpen(!open)
              //   }
              // }}
              className="w-25"
            />
            <Input
              value={productID || ''}
              // value="ABCDEFGHIJKLMNOPQRSTUVWXYZ123456"
              fluid
              onChange={(value) => {
                if (!validatProductIDLength(value)) {
                  // alert("Product id can be only upto 32 characters")
                  setMessageBoxItem(
                    `${IDENTIFICATION} can be only upto 32 characters`
                  );
                  setOpen(!open);
                } else {
                  setProductID(value);
                }
              }}
              // onMouseLeave={() => {

              //   if (!validatProductIDLength(productID)) {

              //     //alert("Product id can be only upto 32 characters")
              //     setMessageBoxItem(`${IDENTIFICATION} can be only upto 32 characters`)
              //     setOpen(!open)
              //   }
              // }}
              label={`${IDENTIFICATION}`}
              className="ml-4 w-25"
            />
            <Input
              value=""
              fluid
              disabled
              label="Version"
              className="ml-4 w-15"
            />
            <Input
              value={description}
              // value="ABCDEFGHIJKLMNOPQRSTUVWXYZ123456ABCDEFGHIJKLMNOPQRSTUVWXYZ123456"
              fluid
              onChange={(value) => {
                if (!validatProductDescripton(value)) {
                  // alert("Product description can be only upto 64 characters")
                  setMessageBoxItem(
                    `${FORMULA} description can be only upto 64 characters`
                  );
                  setOpen(!open);
                } else {
                  setDescription(value);
                }
              }}
              // onMouseLeave={() => {
              //   if (!validatProductDescripton(description)) {
              //    // alert("Product description can be only upto 64 characters")
              //    setMessageBoxItem(`${FORMULA} description can be only upto 64 characters"`)
              //    setOpen(!open)
              //   }
              // }}
              label="Description"
              className="ml-4 w-50"
            />
          </div>
          <ProductTable
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
          />
        </Card.Content>
      </Card>

      <div className="clear" />
      <div className="buttons d-flex justify-content-between">
        <Button
          // className="cancel"
          size="small"
          onClick={() => {
            props.setShowCreateProduct(false);
            setProductName('');
            setProductID('');
            setDescription('');
            props.setShowFormulaSets(true);
            setSelectedRows([]);
            setSelectedAll(false);
            setAllowSave(false);
            setMasterRecipe('');
            setAllowPost(false);
            setPostData([]);
            props.setComment('');
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
            history.push(AppRoutes.DEFAULT.path);
          }}
          content="Cancel"
          type="inline-secondary"
          textTransform={false}
        />

        <Permissions
          type="disable"
          allowed={[PermissionValues.CreateFormulaSetAndFormula]}
        >
          {({ authorized }) => (
            <div>
              <Button
                type="secondary"
                size="small"
                content="Add Comments"
                disabled={
                  !(
                    productName.length > 0 &&
                    productID.length > 0 &&
                    allowSave
                  ) || !authorized
                }
                onClick={() => {
                  setShowComment(true);
                }}
                textTransform={false}
              />
              <Button
                type="secondary"
                size="small"
                content="Save Draft"
                disabled={
                  !(
                    productName.length > 0 &&
                    productID.length > 0 &&
                    allowSave
                  ) || !authorized
                }
                onClick={() => {
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
                }}
                textTransform={false}
              />
              <Button
                type="primary"
                size="small"
                content="Submit for Approval"
                disabled={
                  !(
                    productName.length > 0 &&
                    productID.length > 0 &&
                    allowSave
                  ) || !authorized
                }
                onClick={() => {
                  if (formulaSetDetails.status === 2) {
                    if (submitterComment && submitterComment.length > 0) {
                      setIsSubmitForApproval(true);
                      setAllowPost(true);
                      // props.setAllowPost(true)
                      // setShowDescription(false);
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
                }}
                textTransform={false}
              />
            </div>
          )}
        </Permissions>
      </div>
    </div>
  );
}

export default CreateProduct;
