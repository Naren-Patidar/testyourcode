/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-destructuring */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable radix */
/* eslint-disable no-return-assign */
/* eslint-disable no-else-return */
/* eslint-disable prefer-template */
/* eslint-disable camelcase */
/* eslint-disable no-restricted-globals */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable array-callback-return */
/* eslint-disable spaced-comment */
/* eslint-disable object-shorthand */
/* eslint-disable no-dupe-keys */
/* eslint-disable no-unneeded-ternary */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react';
import { getPageEntries } from '@scuf/datatable/dist/util/paginationHelper';
import { DataTable } from '@scuf/datatable';
// import '@scuf/datatable/honeywell-compact-dark/theme.css';
import { Checkbox, Input, Select, Tooltip } from '@scuf/common';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import { getCookie } from 'utils/utility';
import { API_URL, FM_URL } from '../../../../utils/Settings';
import { errorHandler } from '../../../../core/error';
import AlertPopup from '../AlertPopup';
import {
  PARAM_TYPES,
  NEW_PARAM_TYPES,
  PAGE_SIZE,
} from '../../../../utils/constants/enums';
import '../../stylesheets/FormulaTable.scss';

const xsrfToken = getCookie('X-XSRF-TOKEN');
const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'X-XSRF-TOKEN': xsrfToken,
  },
  withCredentials: true,
});
function FormulaTable(props) {
  const [filterData, setFilterData] = useState([]);
  const [messageBoxItem, setMessageBoxItem] = useState('');
  const [open, setOpen] = useState(false);
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
  }, [
    props.search,
    props.selectedUnitOptions,
    props.selectedRawOptions,
    props.selectedScalableOptions,
  ]); // To stop going back to page one
  function mapToPostData(data) {
    let newData = [];

    for (let i = 0; i < data.length; i += 1) {
      let formulaSetParameter = data[i].masterFormulaParameters.map((entry) => {
        return {
          name: entry.paramName,
          description: entry.paramDescription,
          paramType: entry.paramType,
          enumId: null,
          defaultValue: entry.defaultValue,
          realValue: entry.defaultValue,
          stringValue: entry.defaultValue.toString(),
          minval: entry.minValue,
          maxval: entry.maxValue,
          engUnit: entry.engUnit,
          scalable: entry.scalable ? true : false,
          accessLock: entry.accessLock,
          paramIndex: entry.paramIndex,
          notApplicableValue: entry.notApplicableValue,
          isRawMaterial: entry.rawMaterial ? true : false,
          isRawMaterialPrevious: entry.isRawMaterialPrevious ? true : false,
          isFormulaSetParameterModified: entry.isFormulaSetParameterModified
            ? true
            : false,
          approvedDt: entry.approvedDt,
          importedDt: new Date(),
          optionValue: entry.optionValue,
          notApplicableValue: entry.notApplicableValue,
          notApplicableValuePrevious: entry.notApplicableValuePrevious
            ? entry.notApplicableValuePrevious
            : entry.notApplicableValue,
        };
      });
      let formulaSet = {
        name: data[i].productTypName,
        description: data[i].description,
        masterRecipeId: data[i].recipeID,
        masterRecipeName: data[i].recipeName || 'dummy',
        version: data[i].version,
        comment: data[i].comment || '',
        productId: '',
        status: 0,
        createdBy: data[i].createdby,
        // createdDt: "2020-07-28T16:39:24.149Z",
        formulaSetParameter: formulaSetParameter,
        publicName: data[i].publicName,
        // templateName:"dummy",
        pntbldDate: data[i].pntbldDate,
        importedDt: data[i].importedDt,
        baseName: data[i].baseName,
        currentVersion: data[i].currentVersion,
        clusterName: data[i].clusterName,
        numOfFormulaParameter: data[i].numOfFormulaParameter,
        dataBlockTypeID: data[i].dataBlockTypeID,
        dataBlockName: data[i].dataBlockName,
        proceduralLevel: data[i].proceduralLevel,
        parentAsset: data[i].parentAsset,
        approvedDt: data[i].approvedDt,
        isClassBased: data[i].isClassBased,
      };
      newData.push(formulaSet);
    }
    return newData;
  }

  useEffect(() => {
    let alterTable = props.tableData;
    if (alterTable !== undefined) {
      let setTrue = alterTable.length > 0;

      if (alterTable.length > 0) {
        for (let i = 0; i < alterTable.length; i += 1) {
          let row = alterTable[i];
          let { paramType, optionValue, min, max, notApplicableValue } = row;

          //If parameter is removed then no validation
          // if (diffType === 4) {
          //   continue;
          // }
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
                min.toLowerCase() !== 'nan' &&
                max.toLowerCase() === 'nan' &&
                parseFloat(notApplicableValue) < parseFloat(min)
              ) {
                setTrue = false;
                break;
              }
              if (
                max.toLowerCase() !== 'nan' &&
                min.toLowerCase() === 'nan' &&
                parseFloat(notApplicableValue) > parseFloat(max)
              ) {
                setTrue = false;
                break;
              }
              if (
                max.toLowerCase() !== 'nan' &&
                min.toLowerCase() !== 'nan' &&
                (parseFloat(notApplicableValue) < parseFloat(min) ||
                  parseFloat(notApplicableValue) > parseFloat(max))
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
      }
      props.setIsDataValid(setTrue);
    }
  }, [props.tableData]);

  useEffect(() => {
    if (
      props.search.length > 0 ||
      props.selectedUnitOptions.size > 0 ||
      props.selectedRawOptions.size > 0 ||
      props.selectedScalableOptions.size > 0
    ) {
      let data = [];
      for (let i = 0; i < props.tableData.length; i += 1) {
        if (
          (props.tableData[i].desc
            .toLowerCase()
            .includes(props.search.toLowerCase()) ||
            props.tableData[i].item
              .toLowerCase()
              .includes(props.search.toLowerCase()) ||
            props.tableData[i].unit
              .toLowerCase()
              .includes(props.search.toLowerCase())) &&
          (props.selectedUnitOptions.size === 0 ||
            props.selectedUnitOptions.has(
              props.tableData[i].unit.toLowerCase()
            )) &&
          (props.selectedRawOptions.size === 0 ||
            props.selectedRawOptions.has(
              props.tableData[i].rawMaterial ? 'true' : 'false'
            )) &&
          (props.selectedScalableOptions.size === 0 ||
            props.selectedScalableOptions.has(
              props.tableData[i].scale ? 'true' : 'false'
            ))
        ) {
          data.push(props.tableData[i]);
        }
      }
      setFilterData(data);
    } else {
      setFilterData(props.tableData);
    }
    // eslint-disable-next-line
  }, [
    props.search,
    props.tableData,
    props.selectedUnitOptions,
    props.selectedRawOptions,
    props.selectedScalableOptions,
  ]);

  useEffect(() => {
    let existing_data = props.saveData.slice(0);
    if (existing_data.length > 0) {
      props.setHasData(false);
      let data = existing_data.slice(0);
      data = data[existing_data.length - 1];
      data.comment = props.comment;
      existing_data[existing_data.length - 1] = data;
      props.setSaveData(existing_data);
      props.setHasData(true);
    }
    // eslint-disable-next-line
  }, [props.comment]);

  useEffect(() => {
    let existing_data = props.saveData.slice(0);
    if (existing_data.length > 0) {
      props.setHasData(false);
      let data = existing_data.slice(0)[existing_data.length - 1];

      for (let i = 0; i < props.tableData.length; i += 1) {
        data.formulaSetParameter[i].isRawMaterial =
          props.tableData[i].rawMaterial;
        data.formulaSetParameter[i].notApplicableValue =
          props.tableData[i].notApplicableValue;
      }
      existing_data[existing_data.length - 1] = data;
      props.setSaveData(existing_data);
      props.setHasData(true);
    }
    // eslint-disable-next-line
  }, [props.tableData]);

  useEffect(() => {
    let data = [];
    let existing_data = [];
    async function getExistingData() {
      //await fetch(API_URL + 'getformulasetofrecipe/', {
      // await fetch(props.url + 'GetAllFormulaSet/', {
      try {
        await axiosClient
          .get(FM_URL + 'GetAllFormulaSet/')
          .then((response) => {
            if (response.status === 200) {
              return response.data;
            } else {
              throw errorHandler(response);
            }
          })
          .then((response) => (existing_data = response.data))
          .catch((err) => {
            if (err && err.status && err.status !== 200) {
              setMessageBoxItem(err.message);
              setOpen(!open);
            }
          });
      } catch (ex) {
        errorHandler();
      }
    }
    async function getData() {
      console.log('selectedMR', props.selectedMR);
      try {
        await axiosClient
          .post(
            FM_URL + 'GetMasterFormulaParametersByRecipeName/',
            props.selectedMR
          )
          .then((response) => {
            if (response.status === 200) {
              data = response.data;
              return response.data;
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

      data.productTypName = props.productName;
      data.recipeName = props.recipeName;
      data.recipeID = props.strategyID;
      data.comment = '';
      // data.description = props.productDescription;

      let new_data = existing_data;
      new_data.push(data);

      props.setSaveData(mapToPostData(new_data));
      props.setHasData(true);

      const data2 = data.masterFormulaParameters.map((entry, index) => {
        return {
          no: parseInt(index) + 1,
          item: entry.paramName,
          desc: entry.paramDescription,
          unit: entry.engUnit,
          min: entry.minValue,
          max: entry.maxValue,
          value: entry.defaultValue,
          scale: entry.scalable,
          rawMaterial: false,
          paramType: entry.paramType,
          optionValue: entry.optionValue,
          notApplicableValue: entry.notApplicableValue,
        };
      });

      props.setTableData(data2);
    }

    if (props.recipeName.length > 0) {
      // getExistingData()
      getData();
      props.setImported(false);
    }
  }, [props.recipeName]);
  const parseData = () => {
    let pagedData = getPageEntries(filterData, activePage, itemsPerPage);
    return pagedData;
  };

  function renderRectangle(cellData) {
    if (cellData.value) {
      return (
        <div
          className="raw raw-true editable"
          onClick={() => {
            let oldData = props.tableData.slice(0);
            let editIndex = 0;
            oldData.filter((item, index) => {
              if (item.item === cellData.rowData.item) {
                editIndex = index;
              }
            });
            //oldData[cellData.rowIndex][cellData.field] = !cellData.value
            oldData[editIndex][cellData.field] = !cellData.value;
            props.setTableData(oldData);
          }}
        >
          <i className="icon-Raw-material" />
        </div>
      );
    } else if (
      cellData.rowData.paramType === NEW_PARAM_TYPES.INT32 ||
      cellData.rowData.paramType === NEW_PARAM_TYPES.FLOAT64
    ) {
      return (
        <div
          className="raw raw-false editable"
          onClick={() => {
            let oldData = props.tableData.slice(0);
            let editIndex = 0;
            oldData.filter((item, index) => {
              if (item.item === cellData.rowData.item) {
                editIndex = index;
              }
            });
            // oldData[cellData.rowIndex][cellData.field] = !cellData.value
            oldData[editIndex][cellData.field] = !cellData.value;
            props.setTableData(oldData);
          }}
        >
          <i className="icon-Raw-material" />
        </div>
      );
    } else {
      return (
        <Tooltip
          content="Raw material selection is not allowed as parameter is not numeric"
          element={
            <div className="raw raw-false cursor-not-allowed">
              <i className="icon-Raw-material" />
            </div>
          }
          event="hover"
          hoverable
          position="bottom center"
        />
      );
    }
  }

  function renderCheckbox(cellData) {
    return <Checkbox checked={cellData.value} disabled />;
    // if (cellData.value) {
    //   return <Checkbox checked={true} />;
    // } else {
    //   return <div className="not-scalable"></div>;
    // }
  }

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

    let data = props.tableData.slice(0);
    let editIndex = 0;
    data.filter((item, index) => {
      if (item.item === cellData.rowData.item) {
        editIndex = index;
      }
    });
    data[editIndex][cellData.field] = selectedText;
    props.setTableData(data);
  };

  const renderTooltip = (cellData) => {
    return (
      <div>
        <span
          data-tip
          data-for={
            props.showDescription
              ? cellData.rowData.desc
              : cellData.rowData.item
          }
        >
          {props.showDescription
            ? displayText(cellData.rowData.desc)
            : displayText(cellData.rowData.item)}
        </span>
        <ReactTooltip
          backgroundColor="#303030"
          textColor="#d0d0d0"
          id={
            props.showDescription
              ? cellData.rowData.desc
              : cellData.rowData.item
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
              {props.showDescription
                ? cellData.rowData.desc
                : cellData.rowData.item}
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

  function renderInput(cellData) {
    //-- If paramType == string then min max will not be editable
    //--If paramType === 'Enumeration' and min max is empty then this will not be editable
    let paramType = cellData.rowData.paramType;
    let { value, rowData } = cellData;
    let { setMin, setMax, min, max } = rowData;
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
      if (value.toLowerCase() === 'nan') {
        isDataValid = true;
      } else if (
        value.toLowerCase() !== 'nan' &&
        (isNaN(value) || value === '')
      ) {
        isDataValid = false;
      } else if (value.toLowerCase() !== 'nan') {
        if (
          min.toLowerCase() !== 'nan' &&
          max.toLowerCase() === 'nan' &&
          parseFloat(value) < parseFloat(min)
        ) {
          isDataValid = false;
        }
        if (
          max.toLowerCase() !== 'nan' &&
          min.toLowerCase() === 'nan' &&
          parseFloat(value) > parseFloat(max)
        ) {
          isDataValid = false;
        }
        if (
          max.toLowerCase() !== 'nan' &&
          min.toLowerCase() !== 'nan' &&
          (parseFloat(value) < parseFloat(min) ||
            parseFloat(value) > parseFloat(max))
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
      if (valueFromOptions === undefined) {
        isDataValid = false;
      } else {
        isDataValid = true;
      }
    }
    // else if(paramType === PARAM_TYPES.ENUMERATION){
    //   let valueFromOptions = getValueFromOptions(optionValues, value)
    //   let setMinFromOptions = getValueFromOptions(optionValues, setMin)
    //   let setMaxFromOptions = getValueFromOptions(optionValues, setMax)
    //   let minFromOptions = getValueFromOptions(optionValues, min)
    //   let maxFromOptions = getValueFromOptions(optionValues, max)

    //   if(setMinFromOptions>=minFromOptions && setMaxFromOptions <= maxFromOptions){
    //     if(valueFromOptions >= setMinFromOptions && valueFromOptions<=setMaxFromOptions){
    //       isDataValid = true
    //     }
    //     else{
    //      isDataValid = false
    //     }
    //   }
    //   else{
    //     isDataValid = false
    //   }

    //   if(cellData.rowData.min ==="" && cellData.rowData.max ===""){
    //     isDataValid = true
    //   }
    // }

    return (
      <div>
        {(paramType === PARAM_TYPES.INTEGER ||
          paramType === PARAM_TYPES.DOUBLE) && (
          <Input
            className={
              !isDataValid ||
              (cellData.value && cellData.value.trim().length === 0)
                ? 'error-validation-input'
                : ''
            }
            value={cellData.value && cellData.value.trim()}
            onChange={(value) => {
              let data = props.tableData.slice(0);
              let editIndex = 0;
              data.filter((item, index) => {
                if (item.item === rowData.item) {
                  editIndex = index;
                }
              });
              //data[cellData.rowIndex][cellData.field] = value
              data[editIndex][cellData.field] = value;
              props.setTableData(data);
            }}
            onBlur={() => {
              if (cellData.value && cellData.value.trim().length === 0) {
                props.setAllowSave(false);
              }
            }}
          />
        )}
        {(paramType === PARAM_TYPES.ENUMERATION ||
          paramType === PARAM_TYPES.BOOLEAN) && (
          <div className="select-options">
            <Select
              options={optionValues}
              className={isDataValid ? '' : 'error-validation'}
              value={
                getValueFromOptions(optionValues, cellData.value) === undefined
                  ? ''
                  : getValueFromOptions(optionValues, cellData.value)
              }
              onChange={(value) =>
                onDefaultValueDDLClick(value, cellData, optionValues)
              }
            />
          </div>
        )}
        {paramType === PARAM_TYPES.STRING && (
          <Input
            className={
              !isDataValid ||
              (cellData.value && cellData.value.trim().length) === 0
                ? 'error-validation-input'
                : ''
            }
            value={cellData.value && cellData.value.trim()}
            onChange={(value) => {
              let data = props.tableData.slice(0);
              let editIndex = 0;
              data.filter((item, index) => {
                if (item.item === rowData.item) {
                  editIndex = index;
                }
              });
              data[editIndex][cellData.field] = value;
              props.setTableData(data);
            }}
            onBlur={() => {
              if (cellData.value && cellData.value.trim().length === 0) {
                props.setAllowSave(false);
              }
            }}
          />
        )}
      </div>
    );
  }

  return (
    <div className="formula-set-table">
      <AlertPopup
        messageBoxItem={messageBoxItem}
        open={open}
        setOpen={setOpen}
      ></AlertPopup>
      <DataTable
        data={parseData()}
        scrollable={true}
        scrollHeight="46vh"
        rows={PAGE_SIZE}
        lazy={true}
        loading={props.tableData.length <= 0}
      >
        <DataTable.Column
          field="no"
          header="SR NO."
          align="right"
          initialWidth="6.8vw"
        />
        <DataTable.Column
          field={props.showDescription ? 'desc' : 'item'}
          header={
            props.showDescription ? 'PARAMETER DESCRIPTION' : 'PARAMETER NAME'
          }
          initialWidth="20vw"
          renderer={renderTooltip}
        />
        <DataTable.Column
          field="rawMaterial"
          header="RM"
          align="center"
          initialWidth="7.8vw"
          renderer={renderRectangle}
        />

        <DataTable.Column
          field="unit"
          header="ENG. UNIT"
          initialWidth="11.7708vw"
        />
        <DataTable.Column
          field="min"
          header="MIN VALUE"
          initialWidth="11.7708vw"
        />
        <DataTable.Column
          field="max"
          header="MAX VALUE"
          initialWidth="11.7708vw"
        />
        {/* <DataTable.Column field="default" header="DEFAULT VALUE" initialWidth="11.7708vw" /> */}
        <DataTable.Column
          field="scale"
          header="SCALABLE"
          initialWidth="9.9225vw"
          renderer={renderCheckbox}
          align="center"
        />
        <DataTable.Column
          field="notApplicableValue"
          header="NA VALUE"
          renderer={renderInput}
          initialWidth="11.7708vw"
          className="editable"
        />
        <DataTable.Pagination
          totalItems={filterData.length}
          activePage={activePage}
          itemsPerPage={itemsPerPage}
          showDisplayDetails
          onPageChange={handlePageChange}
        />
      </DataTable>
    </div>
  );
}

export default FormulaTable;
