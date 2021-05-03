/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable spaced-comment */
/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/self-closing-comp */
/* eslint-disable radix */
/* eslint-disable no-return-assign */
/* eslint-disable no-else-return */
/* eslint-disable prefer-template */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
// eslint-disable-next-line
import React, { useState, useEffect } from 'react';
import { getPageEntries } from '@scuf/datatable/dist/util/paginationHelper';
import { DataTable } from '@scuf/datatable';
// import '@scuf/datatable/honeywell-compact-dark/theme.css';
import { Checkbox, Input, Select, Tooltip } from '@scuf/common';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import { getCookie } from 'utils/utility';
import { FM_URL } from '../../../../utils/Settings';
import { errorHandler } from '../../../../core/error';
import AlertPopup from '../AlertPopup';
import {
  PARAM_TYPES,
  NEW_PARAM_TYPES,
  PAGE_SIZE,
} from '../../../../utils/constants/enums';

const xsrfToken = getCookie('X-XSRF-TOKEN');
const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'X-XSRF-TOKEN': xsrfToken,
  },
  withCredentials: true,
});
function FormulaSetTable(props) {
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
  useEffect(() => {
    let data = [];
    let formulaSetDetails = [];

    async function getData() {
      try {
        await axiosClient
          .get(`${FM_URL}GetFormulaSetParametersByName/${props.productMR.set}`)
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

      const data2 = data.map((entry, index) => {
        return {
          no: parseInt(index) + 1,
          item: entry.name,
          desc: entry.description,
          unit: entry.engUnit,
          min: entry.minval,
          max: entry.maxval,
          default: entry.defaultValue,
          scale: entry.scalable,
          id: entry.id,
          rawMaterial: entry.isRawMaterial,
          notApplicableValue: entry.notApplicableValue,
          optionValue: entry.optionValue,
          paramType: entry.paramType,
        };
      });

      props.setTableData(data2);
    }

    if (props.showViewFormulaSet) {
      getData();
    }
    // eslint-disable-next-line
  }, [props.showViewFormulaSet]);

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

  function renderRectangleWithoutEdit(cellData) {
    return (
      <div
        className={`raw ${
          cellData.value ? 'raw-true' : 'raw-false'
        } cursor-not-allowed`}
      >
        <i className="icon-Raw-material" />
      </div>
    );
  }
  const parseData = () => {
    let pagedData = getPageEntries(filterData, activePage, itemsPerPage);
    return pagedData;
  };
  function renderRectangleEditEnabled(cellData) {
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
            // oldData[cellData.rowIndex][cellData.field] = !cellData.value
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
            //oldData[cellData.rowIndex][cellData.field] = !cellData.value
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
    //console.log("cellData",cellData);
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
              if (props.EditRawMaterial) {
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
              }
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
              onChange={(value) => {
                if (props.EditRawMaterial) {
                  onDefaultValueDDLClick(value, cellData, optionValues);
                }
              }}
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
              if (props.EditRawMaterial) {
                let data = props.tableData.slice(0);
                let editIndex = 0;
                data.filter((item, index) => {
                  if (item.item === rowData.item) {
                    editIndex = index;
                  }
                });
                data[editIndex][cellData.field] = value;
                props.setTableData(data);
              }
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
        // columnResizeMode="expand"
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
          renderer={
            props.EditRawMaterial
              ? renderRectangleEditEnabled
              : renderRectangleWithoutEdit
          }
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

export default FormulaSetTable;
