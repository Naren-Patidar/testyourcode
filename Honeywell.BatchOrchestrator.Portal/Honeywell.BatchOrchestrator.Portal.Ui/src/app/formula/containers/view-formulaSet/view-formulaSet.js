/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
/* eslint-disable no-return-assign */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-continue */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState, useRef } from 'react';
import { Input, Button, Checkbox, Icon, TextArea, Card } from '@scuf/common';
import { useHistory, useLocation } from 'react-router-dom';
import { Permissions, useAuthorize } from 'core/authentication';
import { PermissionValues } from 'core/authentication/models/user-permission';
import { useConfirm } from 'shared/confirm-dialog';
import { AppConstants } from 'utils/app-constants';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import { AppRoutes } from 'routing';
import { getCookie } from 'utils/utility';
import FormulaSetTable from './view-formulaSet-table';
import { FM_URL } from '../../../../utils/Settings';
// import { BASE_ROUTE } from '../../../../utils/constants/routes';
import { errorHandler } from '../../../../core/error';
import AlertPopup from '../AlertPopup';
import { FORMULASET } from '../../../../utils/constants/boterminology';
import {
  updateFormulaSetLockURL,
  getFormulaSetCommentsUrl,
} from './formula-sets-service';
import '../../stylesheets/ViewFormulaSet.scss';

const xsrfToken = getCookie('X-XSRF-TOKEN');
const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'X-XSRF-TOKEN': xsrfToken,
  },
  withCredentials: true,
});

function FormulaSet(props) {
  const [tableData, setTableData] = useState([]);
  const [showDescription, setShowDescription] = useState(true);
  const [showComment, setShowComment] = useState(false);
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
  const [EditRawMaterial, setEditRawMaterial] = useState(false);
  const [popupFlag, setPopupFlag] = useState(false);
  const [submitterComment, setSubmitterComment] = useState(null);
  const [formulaSetComments, setformulaSetComments] = useState(null);
  const [messageBoxItem, setMessageBoxItem] = useState('');
  const [open, setOpen] = useState(false);
  const [isCategoryEditLocked, setIsCategoryEditLocked] = useState(false);
  const [isDataValid, setIsDataValid] = useState(true);
  const [isFormulaSetReferenced, SetIsFormulaSetReferenced] = useState(true);

  const history = useHistory();
  const location = useLocation();
  const { formulaSetId } = location.state.productMR;

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

  const setFormulaSetLock = async (formulasetId, isLocked) => {
    const { status, data } = await axiosClient.put(
      `${updateFormulaSetLockURL(formulasetId, isLocked)}`
    );
    SetIsFormulaSetReferenced(data.success);
    if (data && !data.success) {
      setMessageBoxItem(data.message);
      setOpen(!open);
    }
    if (status === 200 && data && data.success) {
      setIsCategoryEditLocked(isLocked);
    }
  };

  const getFormulaSetComments = async () => {
    const { status, data } = await axiosClient.get(
      `${getFormulaSetCommentsUrl(location.state.productMR.formulaSetId)}`
    );
    if (status === 200) {
      props.setSubmitterComment(data.submitterComment);
      props.setApproverComment(data.approvarComment);
      setSubmitterComment(data.submitterComment);
      setformulaSetComments(data);
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
    const data = [];
    let formulaSetDetails = [];

    async function getData() {
      function mapToPostEditedData(data) {
        const newEditedData = [];

        for (let i = 0; i < data.length; i += 1) {
          const formulaSetParameter = data[i].formulaSetParameter.map(
            (entry) => {
              return {
                id: entry.id,
                name: entry.name,
                description: entry.description,
                paramType: entry.paramType,
                paramIndex: entry.paramIndex,
                enumId: null,
                defaultValue: entry.defaultValue,
                realValue: entry.defaultValue,
                stringValue: entry.defaultValue.toString(),
                minval: entry.minval,
                maxval: entry.maxval,
                engUnit: entry.engUnit,
                scalable: !!entry.scalable,
                accessLock: entry.accessLock,
                isRawMaterial: !!entry.rawMaterial,
                isRawMaterialPrevious: !!entry.isRawMaterialPrevious,
                isFormulaSetParameterModified: !!entry.isFormulaSetParameterModified,
                importedDt: new Date(),
                approvedDt: entry.approvedDt,
                isSyncWithDataBlock: entry.isSyncWithDataBlock,
                dataBlockTypeId: entry.dataBlockTypeId,
                optionValue: entry.optionValue,
                notApplicableValue: entry.notApplicableValue,
                notApplicableValuePrevious: entry.notApplicableValuePrevious,
              };
            }
          );

          for (let i = 0; i < formulaSetParameter.length; i++) {
            for (let j = 0; j < tableData.length; j++) {
              if (formulaSetParameter[i].id === tableData[j].id) {
                formulaSetParameter[i].isRawMaterial = tableData[j].rawMaterial
                  ? tableData[j].rawMaterial
                  : false;
                formulaSetParameter[i].notApplicableValue =
                  tableData[j].notApplicableValue;
                continue;
              }
            }
          }

          const formulaSet = {
            id: data[i].id,
            name: data[i].name,
            // description: data[i].description ,
            // masterRecipeId: data[i].recipeID ,
            masterRecipeName: data[i].masterRecipeName,
            version: data[i].version,
            comment: data[i].comment || '',
            productId: '',
            status: 0,
            // createdBy: data[i].createdby,
            // createdDt: "2020-07-28T16:39:24.149Z",
            formulaSetParameter,
            publicName: data[i].publicName,
            // templateName:"dummy",
            pntbldDate: data[i].pntbldDate,
            importedDt: data[i].importedDt,
            approvedDt: data[i].approvedDt,
            baseName: data[i].baseName,
            currentVersion: data[i].currentVersion,
            clusterName: data[i].clusterName,
            numOfFormulaParameter: data[i].numOfFormulaParameter,
            // dataBlockTypeID:data[i].dataBlockTypeID,
            dataBlockName: data[i].dataBlockName,
            imageFileName: data[i].imageFileName,
            proceduralLevel: data[i].proceduralLevel,
            parentAsset: data[i].parentAsset,
            isSyncWithDataBlock: data[i].isSyncWithDataBlock,
            dataBlockTypeId: data[i].dataBlockTypeId,
            isClassBased: data[i].isClassBased,
            description: data[i].description,
          };
          newEditedData.push(formulaSet);
        }
        return newEditedData;
      }

      //* ********************* */
      try {
        await axiosClient
          .get(
            `${FM_URL}GetFormulaSetById/${location.state.productMR.formulaSetId}`
          )
          .then((response) => {
            if (response.status === 200) {
              formulaSetDetails = response.data;
              return response.data;
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

      const new_data = [];
      new_data.push(formulaSetDetails);
      const newEditedData = mapToPostEditedData(new_data);
      props.setEditData(mapToPostEditedData(newEditedData));
      setIsCategoryEditLocked(formulaSetDetails.lock);
    }

    if (props.showViewFormulaSet) {
      getData();
    }
    // eslint-disable-next-line
  }, [props.showViewFormulaSet, tableData]);

  const setEditState = () => {
    setEditRawMaterial(location.state.isEdit && true);
    if (!isCategoryEditLocked && location.state.isEdit) {
      // --Make api call if isProductEditLocked === false
      setFormulaSetLock(formulaSetId, true);
      // setIsCategoryEditLocked(true);
    }
  };

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
    setShowComment(false);
  });

  useEffect(() => {
    return () => {
      props.setSubmitterComment(null);
    };
  });

  return (
    <div className={`formula-set${props.showViewFormulaSet ? '' : ' none'}`}>
      <AlertPopup
        messageBoxItem={messageBoxItem}
        open={open}
        setOpen={setOpen}
      />
      {/* <div 
        className={"comment-card" + (showComment? "" : " none")}
        ref={ref}
      >
        <Icon 
          name="close" 
          root="common" 
          exactSize="0.5rem" 
          className="comment-close"
          onClick={() => {
            setShowComment(false)
          }} 
        />
        <div className="clear" ></div>
        <p>Comments</p>
        <TextArea 
          placeholder='No comments' 
          value={props.comment}
          disabled
        />
      </div> */}

      {popupFlag && (
        <div className="Approvals_comments_vfs" style={{ msGridRow: 1 }}>
          <div
            className="Approvals_comments_vfs_close"
            style={{ msGridRow: 1 }}
          >
            <div className="Approvals_comments_vfs_close_text">
              <p>Comments</p>
            </div>
            <div className="Approvals_comments_vfs_close_close">
              <span onClick={() => setPopupFlag(false)}>X</span>
            </div>
          </div>
          <div
            className="Approvals_comments_vfs_submitter"
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
            className="Approvals_comments_vfs_approver"
            style={{ msGridRow: 3 }}
          >
            <p style={{ msGridRow: 1 }}>Approver Comments</p>
            <textarea
              style={{ msGridRow: 2 }}
              value={formulaSetComments && formulaSetComments.approvarComment}
              disabled
            />
          </div>
          <div className="Approvals_comments_vfs_save" style={{ msGridRow: 4 }}>
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
                {EditRawMaterial && isCategoryEditLocked
                  ? `Edit ${
                      props.productMR.set
                        ? props.productMR.set
                        : location.state.productMR.set
                    }`
                  : props.productMR.set
                  ? props.productMR.set
                  : location.state.productMR.set}
              </div>

              <div className="ml-4 cursor-pointer font-size-16">
                <span
                  title="Edit formula set"
                  className="icon-Edit"
                  onClick={setEditState}
                >
                  {isCategoryEditLocked && (
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
                className="search"
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
              label={`${FORMULASET} name`}
              value={
                props.productMR.set
                  ? props.productMR.set
                  : location.state.productMR.set
              }
              fluid
              disabled
              className="w-25"
            />
            <Input
              label="Master Recipe name"
              value={
                props.productMR.recipe
                  ? props.productMR.recipe
                  : location.state.productMR.recipe
              }
              fluid
              disabled
              className="ml-4 w-25"
            />
          </div>

          {/* <div className="clear" /> */}

          <FormulaSetTable
            productMR={
              Object.keys(props.productMR).length === 0
                ? location.state.productMR
                : props.productMR
            }
            tableData={tableData}
            setTableData={setTableData}
            showDescription={showDescription}
            showViewFormulaSet={props.showViewFormulaSet}
            search={search}
            selectedUnitOptions={selectedUnitOptions}
            selectedRawOptions={selectedRawOptions}
            selectedScalableOptions={selectedScalableOptions}
            EditRawMaterial={EditRawMaterial}
            url={props.url}
            setEditData={props.setEditData}
            isDataValid={isDataValid}
            setIsDataValid={setIsDataValid}
          />
        </Card.Content>
      </Card>

      <div className="clear" />
      <div className="buttons">
        <Button
          // className="cancel"
          size="small"
          onClick={() => {
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
            // props.setShowViewFormulaSet(false)
            props.setShowFormulaSets(true);
            if (isCategoryEditLocked && EditRawMaterial) {
              setFormulaSetLock(formulaSetId, false);
            }
            history.push(AppRoutes.DEFAULT.path);
          }}
          content={isCategoryEditLocked && EditRawMaterial ? 'Cancel' : 'Close'}
          type="inline-secondary"
          textTransform={false}
        />
        <Permissions
          type="disable"
          allowed={[PermissionValues.ModifyFormulaSetAndFormula]}
        >
          {({ authorized }) => (
            <div className="comment">
              <Button
                type="secondary"
                size="small"
                content="View Comments"
                disabled={!authorized}
                onClick={() => {
                  getFormulaSetComments();
                  setPopupFlag(true);
                }}
                textTransform={false}
              />
              <Button
                type="secondary"
                size="small"
                content="Save Draft"
                disabled={
                  !EditRawMaterial ||
                  !location.state.isEdit ||
                  !isCategoryEditLocked ||
                  !isFormulaSetReferenced ||
                  !authorized
                }
                textTransform={false}
                onClick={() => {
                  props.setSubmitterComment(submitterComment);
                  props.setApproverComment(
                    formulaSetComments && formulaSetComments.approvarComment
                  );
                  props.setAllowEditPost(true);
                  setFormulaSetLock(formulaSetId, false);
                  // history.push(BASE_ROUTE)
                }}
              />

              <Button
                type="primary"
                size="small"
                content="Submit for Approval"
                disabled={
                  !EditRawMaterial ||
                  !location.state.isEdit ||
                  !isDataValid ||
                  !isCategoryEditLocked ||
                  !isFormulaSetReferenced ||
                  !authorized
                }
                textTransform={false}
                onClick={() => {
                  if (submitterComment && submitterComment.length > 0) {
                    props.setSubmitForApproval(true);
                    props.setSubmitterComment(submitterComment);
                    props.setApproverComment(
                      formulaSetComments && formulaSetComments.approvarComment
                    );
                    props.setAllowEditPost(true);
                    setFormulaSetLock(formulaSetId, false);
                    // history.push(BASE_ROUTE)
                  } else {
                    // alert("Please add comments.");
                    setMessageBoxItem('Please add comments.');

                    setOpen(!open);
                  }
                }}
              />
            </div>
          )}
        </Permissions>

        {/* <Button className = "saveeditedformulaset"
            type="secondary"
            content="Save draft"
            disabled = {!EditRawMaterial}
            onClick={() => {
              
              props.setAllowEditPost(true)
              history.push(BASE_ROUTE)
            }}
          /> */}
      </div>
    </div>
  );
}

export default FormulaSet;
