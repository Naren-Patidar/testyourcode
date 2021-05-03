/* eslint-disable prefer-destructuring */
/* eslint-disable object-shorthand */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prefer-template */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable eqeqeq */
/* eslint-disable no-else-return */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable no-restricted-globals */
/* eslint-disable array-callback-return */
/* eslint-disable no-continue */
/* eslint-disable spaced-comment */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import { getPageEntries } from '@scuf/datatable/dist/util/paginationHelper';
import { withExperionModificationContext } from '../../controllers/experion-modification/experion-modification-context';
import { DataTable } from '@scuf/datatable';
import { Icon, Button, Select, Input, Checkbox, Card } from '@scuf/common';
import { useHistory, useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
// import {
//   APPLY_EXPERION_CHANGES_ROUTE,
//   BASE_ROUTE,
// } from '../../../../utils/constants/routes';
import { AppRoutes } from 'routing';
import ExperionModificationMessages from './experion-messages';
import './experion.scss';
import AlertPopup from '../../components/AlertPopup/AlertPopup';
import { FORMULASET } from 'utils/constants/boterminology';
import { NEW_PARAM_TYPES, PAGE_SIZE } from 'utils/constants/enums';
import { PageTitle } from 'shared/page-title';
import { PageDescription } from 'shared/page-description';

const ExperionModifiedParameterList = (props) => {
  const {
    parameterList,
    parameterObject,
    deleteFormulaSet,
    getModifiedListOfParameters,
  } = props;
  let [alterTable, setAlterTable] = useState();
  const [showDescription, setShowDescription] = useState(true);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState(parameterList);
  const [filter, setFilter] = useState(0);
  const [messageBoxItem, setMessageBoxItem] = useState('');
  const [open, setOpen] = useState(false);
  const [isDataValid, setIsDataValid] = useState(true);

  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);

  const handlePageChange = (page, itemCount) => {
    let tempPage = page;
    let tempitemCount = itemCount;
    setActivePage(tempPage);
    setItemsPerPage(tempitemCount);
  };
  useEffect(() => {
    handlePageChange(1, itemsPerPage);
  }, [filter, search]); // To stop going back to page one

  const parseData = () => {
    let pagedData = getPageEntries(searchResult, activePage, itemsPerPage);
    return pagedData;
  };

  let history = useHistory();
  let location = useLocation();

  let formulaSetId;
  let recipeName;
  let ProductTypName;

  formulaSetId = location.state?.formulaSetId;
  recipeName = location.state?.recipeName;
  ProductTypName = location.state?.ProductTypName;

  const modificationOptions = [
    { value: '0', text: 'All' },
    { value: '1', text: 'Not Modified' },
    { value: '2', text: 'Modified' },
    { value: '3', text: 'New' },
  ];
  useEffect(() => {
    getModifiedListOfParameters(recipeName).then((res) => {
      if (res && res.status && res.status !== 200) {
        setMessageBoxItem(res.message);
        setOpen(!open);
      }
    });
  }, []);

  useEffect(() => {
    setSearchResult(parameterList);
    setAlterTable(parameterList);
  }, [parameterList]);

  useEffect(() => {
    let filteredResult = filterParameterList(filter);
    setSearchResult(filteredResult);
  }, [filter]);

  useEffect(() => {
    if (alterTable !== undefined) {
      let setTrue = alterTable.length > 0;

      for (let i = 0; i < alterTable.length; i += 1) {
        let row = alterTable[i];
        let {
          paramType,
          optionValue,
          minval,
          maxval,
          notApplicableValue,
          diffType,
        } = row;

        //If parameter is removed then no validation
        if (diffType === 4) {
          continue;
        }

        if (paramType === NEW_PARAM_TYPES.STRING) {
          if (notApplicableValue.length > 8) {
            setTrue = false;
            break;
          }
        } else if (
          paramType === NEW_PARAM_TYPES.ENUMERATION ||
          paramType === NEW_PARAM_TYPES.BOOLEAN
        ) {
          let optionValues = [];

          let options = JSON.parse(optionValue);
          options.map((opt) => {
            let obj = {};
            obj.text = opt.EnumerationString;
            obj.value = opt.EnumerationNumber;
            optionValues.push(obj);
          });
          let valueFromOptions = getValueFromOptions(
            optionValues,
            notApplicableValue
          );
          if (valueFromOptions === undefined) {
            setTrue = false;
            break;
          }
        } else if (
          paramType === NEW_PARAM_TYPES.INT32 ||
          paramType === NEW_PARAM_TYPES.FLOAT64
        ) {
          if (notApplicableValue.toLowerCase() === 'nan') {
            setTrue = true;
          } else if (
            notApplicableValue.toLowerCase() !== 'nan' &&
            (isNaN(notApplicableValue) || notApplicableValue === '')
          ) {
            setTrue = false;
          } else if (notApplicableValue.toLowerCase() !== 'nan') {
            if (
              minval.toLowerCase() !== 'nan' &&
              maxval.toLowerCase() === 'nan' &&
              parseFloat(notApplicableValue) < parseFloat(minval)
            ) {
              setTrue = false;
              break;
            }
            if (
              maxval.toLowerCase() !== 'nan' &&
              minval.toLowerCase() === 'nan' &&
              parseFloat(notApplicableValue) > parseFloat(maxval)
            ) {
              setTrue = false;
              break;
            }
            if (
              maxval.toLowerCase() !== 'nan' &&
              minval.toLowerCase() !== 'nan' &&
              (parseFloat(notApplicableValue) < parseFloat(minval) ||
                parseFloat(notApplicableValue) > parseFloat(maxval))
            ) {
              setTrue = false;
              break;
            }
            if (
              paramType === NEW_PARAM_TYPES.INT32 &&
              notApplicableValue.indexOf('.') !== -1
            ) {
              setTrue = false;
              break;
            }
          }
        }
      }
      setIsDataValid(setTrue);
    }
  }, [alterTable]);

  const filterParameterList = (filter) => {
    if (filter === '0') {
      //--All
      return parameterList;
    } else if (filter === '1') {
      //--Not modified
      const items = parameterList.filter((data) => {
        if (data.diffType === 0) {
          return data;
        }
      });
      return items;
    } else if (filter === '2') {
      //--Modified
      const items = parameterList.filter((data) => {
        if (data.diffType === 1 || data.diffType === 2) {
          return data;
        }
      });
      return items;
    } else if (filter === '3') {
      //--New
      const items = parameterList.filter((data) => {
        if (data.diffType === 3) {
          return data;
        }
      });
      return items;
    }
  };

  useEffect(() => {
    let filteredResult = SearchFormulaList(search);
    setSearchResult(filteredResult);
  }, [search]);

  const SearchFormulaList = (searchText) => {
    const items = parameterList.filter((data) => {
      if (searchText == null || searchText == '') return data;
      else if (
        data.name.toLowerCase().includes(searchText.toLowerCase()) ||
        data.description.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return data;
      }
    });
    return items;
  };

  const renderCheckbox = (cellData) => {
    return <Checkbox checked={cellData.value} disabled />;
  };

  const renderStatus = (cellData) => {
    if (cellData.value === 0) {
      return '';
    } else if (cellData.value === 1) {
      return (
        <div>
          <span
            data-tip
            data-for={cellData.rowData.name}
            class="dot-non-impacted"
          ></span>
          {/* <ReactTooltip id={cellData.rowData.name} place="bottom" effect="solid">
            <div>
              <p>Old min value {cellData.rowData.prevMinval}, Old max value {cellData.rowData.prevMaxval}</p>
            </div>
          </ReactTooltip> */}
        </div>
      );
    } else if (cellData.value === 2) {
      return (
        <div>
          <span
            data-tip
            data-for={cellData.rowData.name}
            class="dot-impacted"
          ></span>
          <ReactTooltip
            backgroundColor="#303030"
            textColor="#d0d0d0"
            id={cellData.rowData.name}
            place="bottom"
            effect="solid"
          >
            <div>
              <p>
                Old min value {cellData.rowData.prevMinval}, Old max value{' '}
                {cellData.rowData.prevMaxval}
              </p>
            </div>
          </ReactTooltip>
        </div>
      );
    } else if (cellData.value === 3) {
      return (
        <span title="New" className="icon-New-indicator span_new">
          <span>New</span>
        </span>
      );
    } else if (cellData.value === 4) {
      return (
        <span
          title="Removed"
          className="icon icon-Close"
          style={{ color: '#c00707' }}
        ></span>
      );
    }
  };

  const renderMinMax = (cellData) => {
    if (cellData) {
      return <div>{cellData.value}</div>;
    }
  };

  const renderTooltip = (cellData) => {
    return (
      <div>
        <span
          data-tip
          data-for={
            showDescription
              ? cellData.rowData.description
              : cellData.rowData.name
          }
        >
          {showDescription
            ? displayText(cellData.rowData.description)
            : displayText(cellData.rowData.name)}
        </span>
        <ReactTooltip
          backgroundColor="#303030"
          textColor="#d0d0d0"
          id={
            showDescription
              ? cellData.rowData.description
              : cellData.rowData.name
          }
          place="bottom"
          effect="solid"
        >
          <div
            style={{
              minWidth: 'auto',
              maxWidth: '400px',
              wordBreak: 'break-word',
              padding: '1px',
            }}
          >
            <p>
              {showDescription
                ? cellData.rowData.description
                : cellData.rowData.name}
            </p>
          </div>
        </ReactTooltip>
      </div>
    );
  };
  const displayText = (value) => {
    if (value.length > 64) {
      return value.substring(0, 63) + '...';
    } else {
      return value;
    }
  };

  const renderRawMaterial = (cellData) => {
    if (cellData.value) {
      return (
        <div
          className="raw raw-true editable"
          onClick={() => {
            if (cellData.rowData.diffType === 3) {
              let oldData = alterTable.slice(0);
              let editIndex = 0;
              oldData.filter((item, index) => {
                if (
                  item.name.toLowerCase() ===
                    cellData.rowData.name.toLowerCase() &&
                  item.paramType.toLowerCase() ===
                    cellData.rowData.paramType.toLowerCase()
                ) {
                  editIndex = index;
                }
              });
              // oldData[cellData.rowIndex][cellData.field] = !cellData.value
              // alterTable.formulaParameter = oldData
              oldData[editIndex][cellData.field] = !cellData.value;
              setAlterTable(oldData);
            }
          }}
        >
          <i className="icon-Raw-material" />
        </div>
      );
    } else {
      return (
        <div
          className="raw raw-false editable"
          onClick={() => {
            if (cellData.rowData.diffType === 3) {
              let oldData = alterTable.slice(0);
              let editIndex = 0;
              oldData.filter((item, index) => {
                if (
                  item.name.toLowerCase() ===
                    cellData.rowData.name.toLowerCase() &&
                  item.paramType.toLowerCase() ===
                    cellData.rowData.paramType.toLowerCase()
                ) {
                  editIndex = index;
                }
              });
              oldData[editIndex][cellData.field] = !cellData.value;
              // alterTable.formulaParameter = oldData
              setAlterTable(oldData);
            }
          }}
        >
          <i className="icon-Raw-material" />
        </div>
      );
    }
  };

  const experionModificationSelection = (value) => {
    setFilter(value);
  };

  const onNextClick = () => {
    parameterObject.formulaParameter = alterTable;
    history.push({
      pathname: AppRoutes.EXPERION_APPLY_CHANGES.path,
      state: { parameterObject: parameterObject, formulaSetId: formulaSetId },
    });
  };

  const onDeleteClick = async () => {
    deleteFormulaSet(formulaSetId, recipeName).then((res) => {
      if (res && res.status && res.status !== 200) {
        setMessageBoxItem(res.message);
        setOpen(!open);
      }
      history.push(AppRoutes.DEFAULT.path);
    });
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

    let oldData = alterTable.slice(0);
    let editIndex = 0;
    oldData.filter((item, index) => {
      if (
        item.name.toLowerCase() === cellData.rowData.name.toLowerCase() &&
        item.paramType.toLowerCase() ===
          cellData.rowData.paramType.toLowerCase()
      ) {
        editIndex = index;
      }
    });
    oldData[editIndex][cellData.field] = selectedText;
    setAlterTable(oldData);
  };

  function renderNotApplicableValue(cellData) {
    //-- If paramType == string then min max will not be editable
    //--If paramType === 'Enumeration' and min max is empty then this will not be editable
    let paramType = cellData.rowData.paramType;
    let { value, rowData } = cellData;
    let { minval, maxval } = rowData;
    let isDataValid = true;
    let optionValues = [];

    if (
      paramType === NEW_PARAM_TYPES.ENUMERATION ||
      paramType === NEW_PARAM_TYPES.BOOLEAN
    ) {
      let options = JSON.parse(cellData.rowData.optionValue);
      options.map((opt) => {
        let obj = {};
        obj.text = opt.EnumerationString;
        obj.value = opt.EnumerationNumber;
        optionValues.push(obj);
      });
    }

    if (paramType === NEW_PARAM_TYPES.STRING) {
      if (value != undefined && value.length > 8) {
        isDataValid = false;
      }
    } else if (
      paramType === NEW_PARAM_TYPES.INT32 ||
      paramType === NEW_PARAM_TYPES.FLOAT64
    ) {
      if (value.toLowerCase() === 'nan') {
        isDataValid = true;
      } else if (
        value.toLowerCase() !== 'nan' &&
        (isNaN(value) || value === '')
      ) {
        isDataValid = false;
      } else if (value.toLowerCase() !== 'nan') {
        if (
          minval.toLowerCase() !== 'nan' &&
          maxval.toLowerCase() === 'nan' &&
          parseFloat(value) < parseFloat(minval)
        ) {
          isDataValid = false;
        }
        if (
          maxval.toLowerCase() !== 'nan' &&
          minval.toLowerCase() === 'nan' &&
          parseFloat(value) > parseFloat(maxval)
        ) {
          isDataValid = false;
        }
        if (
          maxval.toLowerCase() !== 'nan' &&
          minval.toLowerCase() !== 'nan' &&
          (parseFloat(value) < parseFloat(minval) ||
            parseFloat(value) > parseFloat(maxval))
        ) {
          isDataValid = false;
        }
        if (paramType === NEW_PARAM_TYPES.INT32 && value.indexOf('.') !== -1) {
          isDataValid = false;
        }
      }
    } else if (
      paramType === NEW_PARAM_TYPES.ENUMERATION ||
      paramType === NEW_PARAM_TYPES.BOOLEAN
    ) {
      let valueFromOptions = getValueFromOptions(optionValues, value);
      if (valueFromOptions === undefined) {
        isDataValid = false;
      } else {
        isDataValid = true;
      }
    }

    return (
      <div>
        {(paramType === NEW_PARAM_TYPES.INT32 ||
          paramType === NEW_PARAM_TYPES.FLOAT64) && (
          <Input
            className={
              !isDataValid ||
              (cellData.value && cellData.value.trim().length === 0)
                ? 'error-validation-input'
                : ''
            }
            value={cellData.value && cellData.value.trim()}
            onChange={(value) => {
              let oldData = alterTable.slice(0);
              let editIndex = 0;
              oldData.filter((item, index) => {
                if (
                  item.name.toLowerCase() ===
                    cellData.rowData.name.toLowerCase() &&
                  item.paramType.toLowerCase() ===
                    cellData.rowData.paramType.toLowerCase()
                ) {
                  editIndex = index;
                }
              });
              oldData[editIndex][cellData.field] = value;
              setAlterTable(oldData);
            }}
            onBlur={() => {
              if (cellData.value && cellData.value.trim().length === 0) {
                setIsDataValid(false);
              }
            }}
          />
        )}
        {(paramType === NEW_PARAM_TYPES.ENUMERATION ||
          paramType === NEW_PARAM_TYPES.BOOLEAN) && (
          <div className="select-options">
            <Select
              options={optionValues}
              className={isDataValid ? '' : 'error-validation'}
              value={getValueFromOptions(optionValues, cellData.value)}
              onChange={(value) =>
                onDefaultValueDDLClick(value, cellData, optionValues)
              }
            />
          </div>
        )}
        {paramType === NEW_PARAM_TYPES.STRING && (
          <Input
            className={
              !isDataValid ||
              (cellData.value && cellData.value.trim().length) === 0
                ? 'error-validation-input'
                : ''
            }
            value={cellData.value && cellData.value.trim()}
            onChange={(value) => {
              let oldData = alterTable.slice(0);
              let editIndex = 0;
              oldData.filter((item, index) => {
                if (
                  item.name.toLowerCase() ===
                    cellData.rowData.name.toLowerCase() &&
                  item.paramType.toLowerCase() ===
                    cellData.rowData.paramType.toLowerCase()
                ) {
                  editIndex = index;
                }
              });
              oldData[editIndex][cellData.field] = value;
              setAlterTable(oldData);
            }}
            onBlur={() => {
              if (cellData.value && cellData.value.trim().length === 0) {
                setIsDataValid(false);
              }
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="experion-container">
      <AlertPopup
        messageBoxItem={messageBoxItem}
        open={open}
        setOpen={setOpen}
      ></AlertPopup>

      <Card className="mt-0 bg-light-550-force">
        <Card.Content>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <PageTitle content="Experion Modification" />
              <PageDescription content="The below parameter changes have been applied to the formula set" />
            </div>
            <div className="d-flex align-items-center justify-content-around">
              <Input
                value={search}
                placeholder="Search"
                iconPosition="left"
                icon={<Icon name="search" root="common" exactSize="0.875rem" />}
                onChange={(value) => {
                  setSearch(value);
                }}
              />
              <Select
                placeholder="Filter"
                options={modificationOptions}
                onChange={(value) => experionModificationSelection(value)}
                className="ml-4"
              />
              <Checkbox
                checked={!showDescription}
                toggle={true}
                label="Show parameter name"
                onChange={() => {
                  setShowDescription(!showDescription);
                }}
                className="ml-4 pt-2"
              />
            </div>
          </div>

          <div className="horizontal-divider"></div>
          <div className="mt-4 d-flex w-75">
            <Input
              label={`${FORMULASET} name`}
              className="w-50"
              value={ProductTypName}
              fluid={true}
              disabled
            />
            <Input
              label="Master Recipe"
              className="w-50 ml-4"
              value={parameterObject?.recipeName}
              fluid={true}
              disabled
            />
          </div>

          <div className="d-flex">
            {parameterObject?.isAssocDataBlockExist === undefined && (
              <div class="data-loader d-flex justify-content-center">
                <div class="spinner-border" role="status">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
            )}
            {parameterObject.isAssocDataBlockExist &&
              parameterObject.isAssocDataBlockMatched &&
              parameterObject.isRecipeExist && (
                <div className="experion-modification-table">
                  <DataTable
                    data={parseData()}
                    resizableColumns={true}
                    scrollable={true}
                    rows={PAGE_SIZE}
                    lazy={true}
                  >
                    <DataTable.Column
                      field="diffType"
                      header=""
                      align="center"
                      renderer={renderStatus}
                      initialWidth="2.5vw"
                    />

                    <DataTable.Column
                      field={showDescription ? 'description' : 'name'}
                      header={
                        showDescription
                          ? 'PARAMETER DESCRIPTION'
                          : 'PARAMETER NAME'
                      }
                      sortable={true}
                      initialWidth="15vw"
                      renderer={renderTooltip}
                    />
                    <DataTable.Column
                      field="isRawMaterial"
                      header="RM"
                      align="center"
                      initialWidth="8vw"
                      renderer={renderRawMaterial}
                    />
                    <DataTable.Column
                      field="engUnit"
                      header="ENG. UNIT"
                      initialWidth="8vw"
                    />
                    <DataTable.Column
                      field="minval"
                      header="MIN VALUE"
                      renderer={renderMinMax}
                      initialWidth="8vw"
                    />
                    <DataTable.Column
                      field="maxval"
                      header="MAX VALUE"
                      renderer={renderMinMax}
                      initialWidth="8vw"
                    />
                    <DataTable.Column
                      field="scalable"
                      header="SCALABLE"
                      align="center"
                      renderer={renderCheckbox}
                      initialWidth="8vw"
                    />
                    <DataTable.Column
                      field="notApplicableValue"
                      header="NA VALUE"
                      renderer={renderNotApplicableValue}
                      initialWidth="10vw"
                    />
                    <DataTable.Pagination
                      totalItems={searchResult.length}
                      activePage={activePage}
                      itemsPerPage={itemsPerPage}
                      showDisplayDetails
                      onPageChange={handlePageChange}
                    />
                  </DataTable>
                </div>
              )}
            {(!parameterObject.isAssocDataBlockExist ||
              !parameterObject.isAssocDataBlockMatched ||
              !parameterObject.isRecipeExist) && (
              <ExperionModificationMessages
                parameterObject={parameterObject}
              ></ExperionModificationMessages>
            )}
          </div>
        </Card.Content>
      </Card>

      <div className="d-flex justify-content-between mt-4">
        <Button
          // className="cancel"
          size="small"
          onClick={() => {
            history.push(AppRoutes.DEFAULT.path);
          }}
          content="Close"
          type="inline-secondary"
        />
        <div>
          {parameterObject.isAssocDataBlockExist != undefined &&
            (!parameterObject.isAssocDataBlockExist ||
              !parameterObject.isAssocDataBlockMatched ||
              !parameterObject.isRecipeExist) && (
              <Button
                type="primary"
                size="small"
                content="Apply Changes"
                onClick={onDeleteClick}
              />
            )}
          {parameterObject.isAssocDataBlockExist &&
            parameterObject.isAssocDataBlockMatched &&
            parameterObject.isRecipeExist && (
              <Button
                type="secondary"
                size="small"
                content="Next"
                disabled={!isDataValid}
                onClick={onNextClick}
              />
            )}
        </div>
      </div>
    </div>
  );
};

export default withExperionModificationContext(ExperionModifiedParameterList);
