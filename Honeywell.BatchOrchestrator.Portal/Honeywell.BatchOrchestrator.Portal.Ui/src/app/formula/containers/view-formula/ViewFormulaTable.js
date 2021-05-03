/* eslint-disable eqeqeq */
/* eslint-disable no-restricted-globals */
/* eslint-disable array-callback-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import {
  getPageEntries,
  filterData,
} from '@scuf/datatable/dist/util/paginationHelper';
import { DataTable } from '@scuf/datatable';
// import '@scuf/datatable/honeywell-compact-dark/theme.css';
import { Checkbox, Input, Select } from '@scuf/common';
// import '../Stylesheets/product-table.css'
import '../../stylesheets/ProductTable.scss';
import { useHistory, useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import { PARAM_TYPES, PAGE_SIZE } from '../../../../utils/constants/enums';

function ProductTable(props) {
  const [filterData, setFilterData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const location = useLocation();
  const handlePageChange = (page, itemCount) => {
    const tempPage = page;
    const tempitemCount = itemCount;
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
    if (
      props.search.length > 0 ||
      props.selectedUnitOptions.size > 0 ||
      props.selectedRawOptions.size > 0 ||
      props.selectedScalableOptions.size > 0
    ) {
      const data = [];
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
    setActivePage,
    props.tableData,
    props.selectedUnitOptions,
    props.selectedRawOptions,
    props.selectedScalableOptions,
  ]);

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
      return `${value.substring(0, 63)}...`;
    }
    return value;
  };

  function renderRectangle(cellData) {
    if (props.tableData[cellData.rowIndex].rawMaterial) {
      return (
        <div>
          <div className="raw raw-true" />
          {cellData.value}
        </div>
      );
    }
    return (
      <div>
        <div className="raw raw-false">&#10005;</div>
        {cellData.value}
      </div>
    );
  }

  function renderCheckbox(cellData) {
    return <Checkbox checked={cellData.value} disabled />;
  }

  // useEffect(() => {
  //   let setTrue = props.selectedRows.length > 0
  //   for (let i = 0; i < props.selectedRows.length; i += 1) {
  //     let row = props.selectedRows[i]
  //     //-this check only for integer and float
  //     if(row.paramType === PARAM_TYPES.STRING || row.paramType === PARAM_TYPES.ENUMERATION){
  //       continue;
  //     }
  //     //--NaN is valid value
  //     if((row.min.toLowerCase()==='nan' && row.max.toLowerCase()==='nan' && row.value.toLowerCase() === 'nan' )){
  //       setTrue = true
  //       continue;
  //     }
  //     if (
  //       isNaN(row['value']) || isNaN(row['setMin']) || isNaN(row['setMax']) ||
  //       row['value'].length <= 0
  //     ) {
  //       setTrue = false
  //       break
  //     }
  //     let value = parseFloat(row['value'])
  //     let setMin = parseFloat(row['setMin'])
  //     let setMax = parseFloat(row['setMax'])
  //     let min = row['min']
  //     let max = row['max']
  //     if (
  //       setMin < min || setMax > max || setMin >= setMax ||
  //       value < min || value > max || value < setMin || value > setMax
  //     ) {
  //       setTrue = false
  //       break
  //     }
  //   }
  //   props.setAllowSave(setTrue)

  //   // eslint-disable-next-line
  // }, [props.selectedRows, props.tableData])

  useEffect(() => {
    let setTrue = props.selectedRows.length > 0;
    for (let i = 0; i < props.selectedRows.length; i += 1) {
      const row = props.selectedRows[i];
      const { min, max, setMin, setMax, value, paramType, optionValue } = row;

      if (paramType === PARAM_TYPES.STRING) {
        if (value.length > 8) {
          setTrue = false;
          break;
        }
      } else if (
        paramType === PARAM_TYPES.ENUMERATION ||
        paramType === PARAM_TYPES.BOOLEAN
      ) {
        const optionValues = [];

        const options = JSON.parse(optionValue);
        options.map((opt) => {
          const obj = {};
          obj.text = opt.EnumerationString;
          obj.value = opt.EnumerationNumber;
          optionValues.push(obj);
        });
        const valueFromOptions = getValueFromOptions(optionValues, value);
        if (valueFromOptions === undefined) {
          setTrue = false;
          break;
        }
      }
      // else if(paramType === PARAM_TYPES.ENUMERATION){
      //   let optionValues = [];

      //       let options = JSON.parse(optionValue)
      //       options.map((opt) => {
      //         let obj = {};
      //         obj.text = opt.EnumerationString
      //         obj.value = opt.EnumerationNumber
      //         optionValues.push(obj)
      //       })

      //   let valueFromOptions = getValueFromOptions(optionValues, value)
      //   let setMinFromOptions = getValueFromOptions(optionValues, setMin)
      //   let setMaxFromOptions = getValueFromOptions(optionValues, setMax)
      //   let minFromOptions = getValueFromOptions(optionValues, min)
      //   let maxFromOptions = getValueFromOptions(optionValues, max)

      //   if(minFromOptions === undefined && maxFromOptions === undefined){
      //    setTrue = true
      //    continue;
      //   }
      // //--Validate setMin
      // if(setMinFromOptions < minFromOptions || setMinFromOptions >= setMaxFromOptions){
      //   setTrue = false
      //   break;
      //  }
      // //--validate setMax
      // if(setMinFromOptions > setMaxFromOptions || setMaxFromOptions > maxFromOptions){
      //   setTrue = false
      //   break;
      //  }
      // //--validate default value
      // if(setMinFromOptions>=minFromOptions && setMaxFromOptions <= maxFromOptions){
      //   if(valueFromOptions >= setMinFromOptions && valueFromOptions<=setMaxFromOptions){
      //       setTrue = true;
      //     }
      //   else{
      //       setTrue = false;
      //       break;
      //     }
      //   }
      //   else{
      //     setTrue = false;
      //     break;
      //   }
      // }
      else if (
        paramType === PARAM_TYPES.INTEGER ||
        paramType === PARAM_TYPES.DOUBLE
      ) {
        // validation for number
        if (max.toLowerCase() !== 'nan' && (isNaN(max) || max === '')) {
          setTrue = false;
          break;
        }
        if (min.toLowerCase() !== 'nan' && (isNaN(min) || min === '')) {
          setTrue = false;
          break;
        }
        if (value.toLowerCase() !== 'nan' && (isNaN(value) || value === '')) {
          setTrue = false;
          break;
        }

        // //--validate setMin
        // if(setMin === 'NaN'){
        //   setTrue = true;
        // }
        // else if(setMin !== 'NaN'){
        //   if(setMax === 'NaN' && parseFloat(setMin) < parseFloat(min)){
        //     setTrue = false;
        //     break;
        //   }
        //   if(setMax !== 'NaN' && (parseFloat(setMin) > parseFloat(setMax) || parseFloat(setMin) < parseFloat(min))){
        //     setTrue = false;
        //     break;
        //   }
        //   if(paramType === PARAM_TYPES.INTEGER && setMin.indexOf('.') !== -1){
        //     setTrue = false;
        //     break;
        //   }
        // }

        // //--validate setMax
        // if(setMax === 'NaN'){
        //   setTrue = true;
        // }
        // else if(setMax !== 'NaN'){
        //   if(setMin === 'NaN' && parseFloat(setMax) > parseFloat(max)){
        //     setTrue = false;
        //     break;
        //   }
        //   if(setMin !== 'NaN' && (parseFloat(setMax) < parseFloat(setMin) || parseFloat(setMax) > parseFloat(max))){
        //     setTrue = false;
        //     break;
        //   }
        //   if(paramType === PARAM_TYPES.INTEGER && setMax.indexOf('.') !== -1){
        //     setTrue = false;
        //     break;
        //   }
        // }

        // --validate default value
        if (value.toLowerCase() === 'nan') {
          setTrue = true;
        } else if (value.toLowerCase() !== 'nan') {
          if (
            min.toLowerCase() !== 'nan' &&
            max.toLowerCase() === 'nan' &&
            parseFloat(value) < parseFloat(min)
          ) {
            setTrue = false;
            break;
          } else if (
            max.toLowerCase() !== 'nan' &&
            min.toLowerCase() === 'nan' &&
            parseFloat(value) > parseFloat(max)
          ) {
            setTrue = false;
            break;
          } else if (
            max.toLowerCase() !== 'nan' &&
            min.toLowerCase() !== 'nan' &&
            (parseFloat(value) < parseFloat(min) ||
              parseFloat(value) > parseFloat(max))
          ) {
            setTrue = false;
            break;
          } else if (
            paramType === PARAM_TYPES.INTEGER &&
            value.indexOf('.') !== -1
          ) {
            setTrue = false;
            break;
          }
        }
        // --Set default
        setTrue = true;
      }
    }

    props.setAllowSave(setTrue);
  }, [props.selectedRows]);

  function editData(newData, cellData) {
    const dat = props.tableData.slice(0);
    dat[cellData.rowIndex][cellData.field] = newData;

    props.setTableData(dat);
  }

  const onDefaultValueDDLClick = (value, cellData, optionValues) => {
    let selectedText;
    optionValues.map((row) => {
      if (row.value === value) {
        selectedText = row.text;
      }
    });

    const data = props.tableData.slice(0);
    let editIndex = 0;
    data.filter((item, index) => {
      if (item.item === cellData.rowData.item) {
        editIndex = index;
      }
    });
    data[editIndex][cellData.field] = selectedText;
    props.setTableData(data);
    const newSelectedRows = props.selectedRows.map((row) => data[row.no - 1]);
    props.setSelectedRows(newSelectedRows);
  };

  const getValueFromOptions = (options, defaultValue) => {
    const object = options.filter((row) => {
      if (row.text.toLowerCase() === defaultValue.toLowerCase()) {
        return row;
      }
    });
    return object[0]?.value;
  };

  function renderInput(cellData) {
    // -- If paramType == string then min max will not be editable
    // --If paramType === 'Enumeration' and min max is empty then this will not be editable
    const { paramType } = cellData.rowData;
    const { value, rowData, selected } = cellData;
    const { setMin, setMax, min, max } = rowData;
    let isDataValid = true;
    const optionValues = [];

    if (
      paramType === PARAM_TYPES.ENUMERATION ||
      paramType === PARAM_TYPES.BOOLEAN
    ) {
      const options = JSON.parse(cellData.rowData.optionValue);
      options.map((opt) => {
        const obj = {};
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
      const valueFromOptions = getValueFromOptions(optionValues, value);
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
        {selected &&
          (paramType === PARAM_TYPES.INTEGER ||
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
                if (props.editFormula) {
                  const data = props.tableData.slice(0);
                  let editIndex = 0;
                  data.filter((item, index) => {
                    if (item.item === rowData.item) {
                      editIndex = index;
                    }
                  });
                  data[editIndex][cellData.field] = value;
                  props.setTableData(data);
                  const newSelectedRows = props.selectedRows.map(
                    (row) => data[row.no - 1]
                  );
                  props.setSelectedRows(newSelectedRows);
                }
              }}
              onBlur={() => {
                if (
                  props.editFormula &&
                  cellData.value &&
                  cellData.value.trim().length === 0
                ) {
                  props.setAllowSave(false);
                }
              }}
            />
          )}

        {selected &&
          (paramType === PARAM_TYPES.ENUMERATION ||
            paramType === PARAM_TYPES.BOOLEAN) && (
            <div className="select-options">
              <Select
                options={optionValues}
                className={isDataValid ? '' : 'error-validation'}
                value={getValueFromOptions(optionValues, cellData.value)}
                onChange={(value) => {
                  if (props.editFormula) {
                    onDefaultValueDDLClick(value, cellData, optionValues);
                  }
                }}
              />
            </div>
          )}

        {selected && paramType === PARAM_TYPES.STRING && (
          <Input
            className={
              !isDataValid ||
              (cellData.value && cellData.value.trim().length) === 0
                ? 'error-validation-input'
                : ''
            }
            value={cellData.value && cellData.value.trim()}
            onChange={(value) => {
              if (props.editFormula) {
                const data = props.tableData.slice(0);
                let editIndex = 0;
                data.filter((item, index) => {
                  if (item.item === rowData.item) {
                    editIndex = index;
                  }
                });
                data[editIndex][cellData.field] = value;
                props.setTableData(data);
                const newSelectedRows = props.selectedRows.map(
                  (row) => data[row.no - 1]
                );
                props.setSelectedRows(newSelectedRows);
              }
            }}
            onBlur={() => {
              if (
                props.editFormula &&
                cellData.value &&
                cellData.value.trim().length === 0
              ) {
                props.setAllowSave(false);
              }
            }}
          />
        )}
        {!selected && (
          <Input value={cellData.value && cellData.value.trim()} disabled />
        )}
      </div>
    );
  }

  function renderInputWithMin(cellData) {
    // -- If paramType == string then min max will not be editable
    // --If paramType === 'Enumeration' and min max is empty then this will not be editable
    const { paramType } = cellData.rowData;
    const { value, rowData, selected } = cellData;
    const { setMin, setMax, min, max } = rowData;
    let isDataValid = true;
    const optionValues = [];
    let disable = true;

    // if (paramType === PARAM_TYPES.ENUMERATION) {
    //   let options = JSON.parse(cellData.rowData.optionValue)
    //   options.map((opt) => {
    //     let obj = {};
    //     obj.text = opt.EnumerationString
    //     obj.value = opt.EnumerationNumber
    //     optionValues.push(obj)
    //   })
    // }

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
          max.toLowerCase() === 'nan' &&
          parseFloat(value) < parseFloat(min)
        ) {
          isDataValid = false;
        }
        if (
          max.toLowerCase() !== 'nan' &&
          (parseFloat(value) > parseFloat(max) ||
            parseFloat(value) < parseFloat(min))
        ) {
          isDataValid = false;
        }
        if (paramType === PARAM_TYPES.INTEGER && value.indexOf('.') !== -1) {
          isDataValid = false;
        }
      }
    }
    // else if(paramType === PARAM_TYPES.){
    //   let valueFromOptions = getValueFromOptions(optionValues, value)
    //   let setMinFromOptions = getValueFromOptions(optionValues, setMin)
    //   let setMaxFromOptions = getValueFromOptions(optionValues, setMax)
    //   let minFromOptions = getValueFromOptions(optionValues, min)
    //   let maxFromOptions = getValueFromOptions(optionValues, max)

    // if(setMinFromOptions < minFromOptions || setMinFromOptions >= setMaxFromOptions){
    //    isDataValid = false
    //   }

    // }

    if (
      paramType === PARAM_TYPES.STRING ||
      paramType === PARAM_TYPES.ENUMERATION ||
      paramType === PARAM_TYPES.BOOLEAN
    ) {
      // --for all enum types set min and max disabled
      disable = true;
    }
    return (
      <div className="innerTextBoxWithData">
        {selected &&
          (paramType === PARAM_TYPES.INTEGER ||
            paramType === PARAM_TYPES.DOUBLE) && (
            <Input
              className={
                !isDataValid ||
                (cellData.value && cellData.value.trim().length === 0)
                  ? 'error-validation-input'
                  : ''
              }
              value={cellData.value && cellData.value.trim()}
              disabled={disable}
              onChange={(value) => {
                if (props.editFormula) {
                  const data = props.tableData.slice(0);
                  let editIndex = 0;
                  data.filter((item, index) => {
                    if (item.item === rowData.item) {
                      editIndex = index;
                    }
                  });
                  // data[cellData.rowIndex][cellData.field] = value
                  data[editIndex][cellData.field] = value;
                  props.setTableData(data);
                  const newSelectedRows = props.selectedRows.map(
                    (row) => data[row.no - 1]
                  );
                  props.setSelectedRows(newSelectedRows);
                }
              }}
              onBlur={() => {
                if (
                  props.editFormula &&
                  cellData.value &&
                  cellData.value.trim().length === 0
                ) {
                  props.setAllowSave(false);
                }
              }}
            />
          )}

        {/* {paramType === PARAM_TYPES.ENUMERATION && !disable &&
          <div className="select-options">
            <Select options={optionValues} 
              className = {isDataValid ? '' : 'error-validation'}
              value={getValueFromOptions(optionValues, cellData.value)}
              onChange={(value) => 
              {               
                if(props.editFormula)
                {
                  onDefaultValueDDLClick(value, cellData, optionValues)
                }
              }
             } />
          </div>
        } */}
        {selected &&
          (paramType === PARAM_TYPES.ENUMERATION ||
            paramType === PARAM_TYPES.BOOLEAN ||
            paramType === PARAM_TYPES.STRING) &&
          disable && (
            <div>
              <Input
                disabled={disable}
                value={cellData.value && cellData.value.trim()}
              />
            </div>
          )}
        {!selected && (
          <Input value={cellData.value && cellData.value.trim()} disabled />
        )}
        {/* { !disable && <span>({filterData[cellData.rowIndex]["min"]})</span> }  */}
      </div>
    );
  }
  function renderInputWithMax(cellData) {
    // -- If paramType == string then min max will not be editable
    // --If paramType === 'Enumeration' and min max is empty then this will not be editable

    const { paramType } = cellData.rowData;
    const { value, rowData, selected } = cellData;
    const { setMin, setMax, min, max } = rowData;
    let isDataValid = true;
    const optionValues = [];
    let disable = true;

    // if (paramType === PARAM_TYPES.ENUMERATION) {
    //   let options = JSON.parse(cellData.rowData.optionValue)
    //   options.map((opt) => {
    //     let obj = {};
    //     obj.text = opt.EnumerationString
    //     obj.value = opt.EnumerationNumber
    //     optionValues.push(obj)
    //   })
    // }

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
          min.toLowerCase() === 'nan' &&
          parseFloat(value) > parseFloat(max)
        ) {
          isDataValid = false;
        }
        if (
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
    }
    // else if(paramType === PARAM_TYPES.ENUMERATION){
    //   let valueFromOptions = getValueFromOptions(optionValues, value)
    //   let setMinFromOptions = getValueFromOptions(optionValues, setMin)
    //   let setMaxFromOptions = getValueFromOptions(optionValues, setMax)
    //   let minFromOptions = getValueFromOptions(optionValues, min)
    //   let maxFromOptions = getValueFromOptions(optionValues, max)

    // if(setMinFromOptions > setMaxFromOptions || setMaxFromOptions > maxFromOptions){
    //    isDataValid = false
    //   }

    // }

    if (
      paramType === PARAM_TYPES.STRING ||
      paramType === PARAM_TYPES.ENUMERATION ||
      paramType === PARAM_TYPES.BOOLEAN
    ) {
      disable = true;
    }

    return (
      <div className="innerTextBoxWithData">
        {selected &&
          (paramType === PARAM_TYPES.INTEGER ||
            paramType === PARAM_TYPES.DOUBLE) && (
            <Input
              className={
                !isDataValid ||
                (cellData.value && cellData.value.trim().length === 0)
                  ? 'error-validation-input'
                  : ''
              }
              value={cellData.value && cellData.value.trim()}
              disabled={disable}
              onChange={(value) => {
                if (props.editFormula) {
                  const data = props.tableData.slice(0);
                  let editIndex = 0;
                  data.filter((item, index) => {
                    if (item.item === rowData.item) {
                      editIndex = index;
                    }
                  });
                  data[editIndex][cellData.field] = value;
                  props.setTableData(data);
                  const newSelectedRows = props.selectedRows.map(
                    (row) => data[row.no - 1]
                  );
                  props.setSelectedRows(newSelectedRows);
                }
              }}
              onBlur={() => {
                if (
                  props.editFormula &&
                  cellData.value &&
                  cellData.value.trim().length === 0
                ) {
                  props.setAllowSave(false);
                }
              }}
            />
          )}
        {/* {paramType === PARAM_TYPES.ENUMERATION &&  !disable &&
          <div className="select-options">
            <Select options={optionValues} 
              className = {isDataValid ? '' : 'error-validation'}
              value={getValueFromOptions(optionValues, cellData.value)}
              onChange={(value) => 
                {
                  if(props.editFormula)
                  {
                    onDefaultValueDDLClick(value, cellData, optionValues)}
                  }                  
                }
            />
          </div>
        } */}
        {selected &&
          (paramType === PARAM_TYPES.ENUMERATION ||
            paramType === PARAM_TYPES.BOOLEAN ||
            paramType === PARAM_TYPES.STRING) &&
          disable && (
            <div className="select-options">
              <Input
                disabled={disable}
                value={cellData.value && cellData.value.trim()}
              />
            </div>
          )}
        {!selected && (
          <Input value={cellData.value && cellData.value.trim()} disabled />
        )}
        {/* {!disable && <span>({filterData[cellData.rowIndex]["max"]})</span> }  */}
      </div>
    );
  }

  const onRowSelectChange = (rows) => {
    const data = props.tableData.slice(0);

    for (let i = 0; i < data.length; i += 1) {
      let itemSelected = false;
      let isNewRow = false;
      rows.filter((row) => {
        if (row.item === data[i].item) {
          itemSelected = true;
          const isOldSelectedRow = props.selectedRows.filter(
            (oldSelectedRow) => {
              if (row.item === oldSelectedRow.item) {
                return oldSelectedRow;
              }
            }
          );

          if (isOldSelectedRow !== null && isOldSelectedRow.length === 0) {
            isNewRow = true;
          } else if (isOldSelectedRow !== null && isOldSelectedRow.length > 0) {
            isNewRow = false;
          } else {
            isNewRow = false;
          }
        }
      });
      let value;
      if (itemSelected && isNewRow) {
        value = data[i].tempDefaultValue;
      } else if (itemSelected && !isNewRow) {
        value = data[i].value;
      } else {
        value = data[i].notApplicableValue;
      }

      data[i].value = value;
    }
    props.setTableData(data);
    props.setSelectedRows(rows);
  };

  const parseData = () => {
    const pagedData = getPageEntries(filterData, activePage, itemsPerPage);
    return pagedData;
  };
  return (
    <div className="product-table">
      <DataTable
        data={parseData()}
        loading={props.tableData.length <= 0}
        onEdit={(newData, cellData) => editData(newData, cellData)}
        lazy
        scrollable
        scrollHeight="46vh"
        rows={PAGE_SIZE}
        // selection={props.editFormula?props.selectedRows:props.selectedItemsBeforeEdit}
        selection={props.selectedRows}
        selectionMode="multiple"
        onSelectionChange={(rows) => {
          if (props.editFormula) {
            onRowSelectChange(rows);
          }
        }}
        onSelectAll={(e) => props.setSelectedAll(e)}
      >
        <DataTable.Column
          field={props.showDescription ? 'desc' : 'item'}
          header={
            props.showDescription ? 'PARAMETER DESCRIPTION' : 'PARAMETER NAME'
          }
          initialWidth="18.125vw"
          renderer={renderTooltip}
        />
        <DataTable.Column
          field="value"
          header="VALUE"
          renderer={renderInput}
          initialWidth="7.5vw"
          className="editable"
        />
        <DataTable.Column
          field="unit"
          header="ENG. UNIT"
          initialWidth="4.5vw"
        />
        {/* <DataTable.Column field="min"  renderer={renderInputWithMin} header="MINIMUM VALUE(REF.)" className="editable" initialWidth="11.78vw" />
        <DataTable.Column field="max" renderer={renderInputWithMax} header="MAXIMUM VALUE(REF.)" className="editable" initialWidth="11.78vw" /> */}
        <DataTable.Column
          field="min"
          header="MIN VALUE"
          // renderer={renderInputWithMin}
          initialWidth="7.5vw"
          className="editable"
        />
        <DataTable.Column
          field="max"
          header="MAX VALUE"
          // renderer={renderInputWithMax}
          initialWidth="7.5vw"
          className="editable"
        />
        <DataTable.Column
          field="scale"
          header="SCALABLE"
          renderer={renderCheckbox}
          initialWidth="6.6667vw"
          align="center"
          className="scalable"
        />
        {/* <DataTable.Column
          field="setMin"
          header="SET MIN"
          renderer={renderInputWithMin}
          initialWidth="7.5vw"
          className="editable"
        />
        <DataTable.Column
          field="setMax"
          header="SET MAX"
          renderer={renderInputWithMax}
          initialWidth="7.5vw"
          className="editable"
        /> */}
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

export default ProductTable;
