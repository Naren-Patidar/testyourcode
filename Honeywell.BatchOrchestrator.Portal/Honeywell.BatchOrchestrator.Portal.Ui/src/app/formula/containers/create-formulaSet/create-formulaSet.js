/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable prefer-template */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-continue */
/* eslint-disable prefer-const */
import React, { useEffect, useState, useRef } from 'react';
import { Input, Button, Checkbox, Icon, TextArea, Card } from '@scuf/common';
import { useHistory, useLocation } from 'react-router-dom';
import { Permissions, useAuthorize } from 'core/authentication';
import { PermissionValues } from 'core/authentication/models/user-permission';
import { useConfirm } from 'shared/confirm-dialog';
import { AppConstants } from 'utils/app-constants';
import { AppRoutes } from 'routing';
import FormulaTable from './create-formulaSet-table';
import '../../stylesheets/FormulaSet.scss';
// import { BASE_ROUTE } from '../../../../utils/constants/routes';
import AlertPopup from '../AlertPopup';
import { FORMULASET } from '../../../../utils/constants/boterminology';

function FormulaSet(props) {
  const [recipeName, setRecipeName] = useState('');
  const [hasData, setHasData] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [showDescription, setShowDescription] = useState(true);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState('');
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
  const [messageBoxItem, setMessageBoxItem] = useState('');
  const [open, setOpen] = useState(false);
  const [isDataValid, setIsDataValid] = useState(true);
  // const [submitterComment,setSubmitterComment]=useState(null);
  let history = useHistory();
  let location = useLocation();
  props.setRecipeName(location.state.mr[0].recipeName);
  props.setProductName(location.state.productName);

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

  useEffect(() => {
    if (tableData.length > 0) {
      let options = new Set();
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
      let options = Array.from(unitFilters);
      let units = options.map((option) => {
        return (
          <Checkbox
            checked={selectedUnitOptions.has(option)}
            label={option.toUpperCase()}
            key={option}
            onChange={() => {
              let update = new Set(selectedUnitOptions);
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
    setRecipeName(props.recipeName);
  }, [props.recipeName]);
  useEffect(() => {
    return () => {
      props.setSubmitterComment(null);
    };
  }, []);
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

  const submitForApprovalHandler = () => {};

  return (
    <div className={`formula-set ${props.showFormulaSet ? '' : ' none'}`}>
      {
        <AlertPopup
          messageBoxItem={messageBoxItem}
          open={open}
          setOpen={setOpen}
        ></AlertPopup>
      }
      <div className={'comment-card' + (showComment ? '' : ' none')} ref={ref}>
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
        <div className="clear"></div>
        <p>Add comments</p>
        <div className="d-flex">
          <TextArea
            placeholder="Add comments here"
            value={props.submitterComment}
            onChange={(value) => {
              props.setSubmitterComment(value);
            }}
            fluid
          />
        </div>
        <div className="d-flex mt-4 justify-content-end">
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
            <div className="font-size-20 text-dark-400 text-semibold">{`Review ${FORMULASET}`}</div>
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
                  className={
                    'filter-button d-flex align-items-center justify-content-between' +
                    (showFilters ? ' show-filter' : '')
                  }
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
                <div className="clear"></div>
                <div
                  className={'filter-card' + (showFilters ? '' : ' none')}
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
                      name={'caret' + (showRawMaterialFilter ? '-up' : '-down')}
                      root="common"
                      exactSize=".6667rem"
                      className="parameter-icon"
                    />
                  </div>
                  <div
                    className={
                      'filter-options' + (showRawMaterialFilter ? '' : ' none')
                    }
                  >
                    <Checkbox
                      checked={selectedRawOptions.has('true')}
                      label="True"
                      onChange={() => {
                        let update = new Set(selectedRawOptions);
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
                        let update = new Set(selectedRawOptions);
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
                      name={'caret' + (showScalableFilter ? '-up' : '-down')}
                      root="common"
                      exactSize=".6667rem"
                      className="parameter-icon"
                    />
                  </div>
                  <div
                    className={
                      'filter-options' + (showScalableFilter ? '' : ' none')
                    }
                  >
                    <Checkbox
                      checked={selectedScalableOptions.has('true')}
                      label="True"
                      onChange={() => {
                        let update = new Set(selectedScalableOptions);
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
                        let update = new Set(selectedScalableOptions);
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
                      name={'caret' + (showUnitFilter ? '-up' : '-down')}
                      root="common"
                      exactSize=".6667rem"
                      className="parameter-icon"
                    />
                  </div>
                  <div
                    className={
                      'filter-options scrollable' +
                      (showUnitFilter ? '' : ' none')
                    }
                  >
                    {unitOptions}
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <Checkbox
                  checked={!showDescription}
                  toggle={true}
                  label="Show parameter name"
                  onChange={() => {
                    setShowDescription(!showDescription);
                  }}
                  className="mt-4 pt-2"
                />
              </div>
            </div>
          </div>
          <div className="horizontal-divider" />
          <div className="d-flex">
            <Input
              label={`${FORMULASET} name`}
              value={
                props.productName
                  ? props.productName
                  : location.state && location.state.productName
              }
              fluid={true}
              disabled
              className="w-25"
            />
            <Input
              label="Master Recipe name"
              value={
                recipeName
                  ? recipeName
                  : location.state && location.state.mrName
              }
              // value="ABCDEFGHIJKLMNOPQRSTUVWXYZ123456"
              fluid={true}
              disabled
              className="ml-4 w-25"
            />
          </div>

          <FormulaTable
            strategyID={
              props.strategyID
                ? props.strategyID
                : location.state && location.state.id
            }
            saveData={props.saveData}
            setSaveData={props.setSaveData}
            productName={location.state.productName}
            recipeName={recipeName}
            setHasData={setHasData}
            imported={props.imported}
            setImported={props.setImported}
            tableData={tableData}
            setTableData={setTableData}
            showDescription={showDescription}
            search={search}
            selectedUnitOptions={selectedUnitOptions}
            selectedRawOptions={selectedRawOptions}
            selectedScalableOptions={selectedScalableOptions}
            url={props.url}
            comment={props.comment}
            selectedMR={location.state.mr[0]}
            isDataValid={isDataValid}
            setIsDataValid={setIsDataValid}
          />
        </Card.Content>
      </Card>
      {/* <div className="formula-set-card"></div> */}
      <div className="clear"></div>
      <div className="buttons">
        <Button
          // className="cancel"
          size="small"
          onClick={() => {
            props.setRecipeName('');
            props.setStrategyID('');
            props.setProductName('');
            props.setComment('');
            setHasData(false);
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
            props.setShowFormulaSet(false);
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
            <div className="float-right">
              <Button
                type="secondary"
                size="small"
                content="Add Comments"
                disabled={!hasData || !authorized}
                onClick={() => {
                  setShowComment(true);
                }}
                textTransform={false}
              />
              <Button
                type="secondary"
                size="small"
                content="Save Draft"
                disabled={!hasData || !authorized}
                onClick={() => {
                  props.setAllowPost(true);
                  setHasData(false);
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
                }}
                textTransform={false}
              />
              <Button
                type="primary"
                size="small"
                content="Submit for Approval"
                disabled={!hasData || !isDataValid || !authorized}
                onClick={() => {
                  if (
                    props.submitterComment &&
                    props.submitterComment.length > 0
                  ) {
                    props.setAllowPost(true);
                    props.setSubmitForApproval(true);
                  } else {
                    // alert("Please add comments.")
                    setMessageBoxItem('Please add comments.');
                    setOpen(!open);
                  }

                  // submitForApprovalHandler()
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

export default FormulaSet;
