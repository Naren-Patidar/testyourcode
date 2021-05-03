/* eslint-disable react-hooks/exhaustive-deps */
import { DataTable } from '@scuf/datatable';
import { Checkbox, Input, Icon, Tooltip, Card, Select } from '@scuf/common';
import { FormulaParameter } from 'app/campaign/models/formula-parameter';
import { useCallback, useEffect, useState } from 'react';
import { ColumnProps } from 'utils/datatable-column-props';
import { PARAM_TYPES } from 'utils/constants/enums';
import { IOption } from '@scuf/common/dist/components/Select/ISelectProps';
import './FormulaParamsList.scss';
import { InputField } from 'shared/form-fields';
import { campaignFormModel } from 'app/campaign/models/campaignFormModel';
import { MinMaxTooltip } from '../MinMaxTooltip/MinMaxTooltip';

export const FormulaParamsList: React.FC<{
  data: FormulaParameter[];
  loading: boolean;
  editable?: boolean;
  onCellDataChange?: (dataItem: FormulaParameter) => void;
  // disableSave?: (disable: boolean) => void;
}> = ({ data, loading, editable, onCellDataChange }) => {
  const [localData, setLocaldata] = useState<FormulaParameter[]>([]);
  const [showName, setShowName] = useState(false);
  // const [disable, setDisable] = useState(false);
  // const [errorCount, setErrorCount] = useState(0);
  useEffect(() => {
    setLocaldata(data);
  }, [data]);
  // useEffect(() => {
  //   if (disableSave) {
  //     console.log(errorCount);
  //     disableSave(errorCount > 0);
  //   }
  // }, [errorCount]);
  const editData = (newVal, cellData) => {
    if (editable) {
      const filteredDataCopy = [...localData];
      const dataItem = filteredDataCopy.find(
        (f) => f.name === cellData.rowData.name
      );

      if (dataItem) {
        const localItem = { ...dataItem };
        localItem[cellData.field] = newVal;

        if (onCellDataChange) {
          onCellDataChange(localItem);
        }
      }

      // if (disableSave) {
      //   disableSave(false);
      // }
    }
  };
  function descRenderer(cellData) {
    return (
      <Tooltip
        content={cellData.value}
        element={<span className="text-truncate">{cellData.value}</span>}
        position="top left"
        event="hover"
        hoverable
      />
    );
  }
  function valueRenderer(cellData) {
    return cellData.rowData?.paramType === PARAM_TYPES.INTEGER ||
      cellData.rowData?.paramType === PARAM_TYPES.DOUBLE ? (
      <MinMaxTooltip
        element={<span>{cellData.value}</span>}
        min={cellData.rowData?.minValue}
        current={cellData.value}
        max={cellData.rowData?.maxValue}
      />
    ) : (
      // <Tooltip
      //   content={`Min value: ${cellData.rowData?.minValue}, Max value: ${cellData.rowData?.maxValue}`}
      //   element={<span>{cellData.value}</span>}
      //   position="top left"
      //   event="hover"
      //   hoverable
      // />
      <span>{cellData.value}</span>
    );
  }
  const getValueFromOptions = (options, defaultValue) => {
    const object = options.filter(
      (row) => row.text.toLowerCase() === defaultValue.toLowerCase()
    );
    return object[0]?.value;
  };
  function formControlRender(cellData) {
    // -- If paramType == string then min max will not be editable
    // --If paramType === 'Enumeration' and min max is empty then this will not be editable
    const { paramType } = cellData.rowData as FormulaParameter;
    const { value, rowData } = cellData;
    const { minValue, maxValue } = rowData as FormulaParameter;
    let isDataValid = true;

    let optionValues: IOption[] = [];

    if (
      paramType === PARAM_TYPES.ENUMERATION ||
      paramType === PARAM_TYPES.BOOLEAN
    ) {
      const options = JSON.parse(cellData.rowData.optionValue);
      optionValues = options.map(
        (opt) =>
          ({
            text: opt.EnumerationString,
            value: opt.EnumerationNumber,
          } as IOption)
      );
    }

    if (paramType === PARAM_TYPES.STRING) {
      if (value && value.length > 8) {
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
        // eslint-disable-next-line no-restricted-globals
        (isNaN(value) || value === '')
      ) {
        isDataValid = false;
      } else if (value.toLowerCase() !== 'nan') {
        if (
          minValue.toLowerCase() !== 'nan' &&
          maxValue.toLowerCase() === 'nan' &&
          parseFloat(value) < parseFloat(minValue)
        ) {
          isDataValid = false;
        }
        if (
          maxValue.toLowerCase() !== 'nan' &&
          minValue.toLowerCase() === 'nan' &&
          parseFloat(value) > parseFloat(maxValue)
        ) {
          isDataValid = false;
        }
        if (
          maxValue.toLowerCase() !== 'nan' &&
          minValue.toLowerCase() !== 'nan' &&
          (parseFloat(value) < parseFloat(minValue) ||
            parseFloat(value) > parseFloat(maxValue))
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

    return (
      <div>
        {(paramType === PARAM_TYPES.INTEGER ||
          paramType === PARAM_TYPES.DOUBLE) && (
          // <Tooltip
          //   content={`Min value: ${minValue}, Max value: ${maxValue}`}
          //   element={
          //     <Input
          //       className={`xs-input ${
          //         !isDataValid ||
          //         (cellData.value && cellData.value.trim().length === 0)
          //           ? 'error-validation-input'
          //           : ''
          //       }`}
          //       value={cellData.value && cellData.value.trim()}
          //       onChange={(val) => {
          //         editData(val, cellData);
          //       }}
          //       reserveSpace={false}
          //     />
          //   }
          //   position="top left"
          //   event="hover"
          //   hoverable
          // />
          <MinMaxTooltip
            element={
              <Input
                className={`xs-input ${
                  !isDataValid ||
                  (cellData.value && cellData.value.trim().length === 0)
                    ? 'error-validation-input'
                    : ''
                }`}
                value={cellData.value && cellData.value.trim()}
                onChange={(val) => {
                  editData(val, cellData);
                }}
                reserveSpace={false}
              />
            }
            min={cellData.rowData?.minValue}
            current={cellData.value}
            max={cellData.rowData?.maxValue}
          />
        )}
        {(paramType === PARAM_TYPES.ENUMERATION ||
          paramType === PARAM_TYPES.BOOLEAN) && (
          <div className="select-options">
            {/* <Select
              options={optionValues}
              className={isDataValid ? '' : 'error-validation'}
              value={getValueFromOptions(optionValues, cellData.value)}
              onChange={(val) => {
                const selectedText = optionValues.find(
                  (item) => item.value === val
                )?.text;
                editData(selectedText, cellData);
              }}
              reserveSpace={false}
            /> */}
            <select
              value={getValueFromOptions(optionValues, cellData.value)}
              onChange={(e) => {
                const selectedText = optionValues.find(
                  (item) => item.value.toString() === e.target.value
                )?.text;
                editData(selectedText, cellData);
              }}
            >
              {optionValues.map((optionVal, index) => (
                // eslint-disable-next-line react/no-array-index-key
                <option key={`select-options${index}`} value={optionVal.value}>
                  {optionVal.text}
                </option>
              ))}
            </select>
          </div>
        )}
        {paramType === PARAM_TYPES.STRING && (
          <Input
            className={`xs-input ${
              !isDataValid ||
              (cellData.value && cellData.value.trim().length === 0)
                ? 'error-validation-input'
                : ''
            }`}
            value={cellData.value && cellData.value.trim()}
            onChange={(val) => {
              editData(val, cellData);
            }}
            reserveSpace={false}
          />
        )}
      </div>
    );
  }
  function indexColRenderer(cellData) {
    return <span>{cellData.rowData.paramIndex}</span>;
  }

  const getColumnDefs = () =>
    // show: boolean,
    // editable?: boolean,
    // editData?: any,
    // setDisableSave?: any
    {
      return [
        {
          field: showName ? 'name' : 'description',
          header: showName ? 'Name' : 'Description',
          renderer: descRenderer,
          align: 'left',
          initialWidth: '250px',
        },
        {
          field: 'defaultValue',
          header: 'Value',
          align: 'right',
          renderer: editable ? formControlRender : valueRenderer,

          initialWidth: '120px',
        },
        {
          field: 'engUnit',
          header: 'Eng Unit',
          align: 'center',
          initialWidth: '80px',
        },
      ] as ColumnProps[];
    };
  const columnDefs = getColumnDefs();
  // showName,
  // editable,
  // editData,
  // setDisableSave

  return (
    <DataTable
      data={localData}
      loading={loading}
      resizableColumns
      scrollable
      scrollHeight="250px"
      rows={10}
      search
      searchPlaceholder="Search formula paramaters"
    >
      <DataTable.HeaderBar>
        <DataTable.HeaderBar.Item
          content=""
          className="d-flex align-items-center mt-2"
          icon={
            <Checkbox
              label="Show parameter name"
              toggle
              onChange={setShowName}
              className="mb-0"
            />
          }
        />
      </DataTable.HeaderBar>
      <DataTable.Column
        field=""
        header="Sr. No."
        renderer={indexColRenderer}
        initialWidth="80px"
        align="right"
      />
      {columnDefs.map((col) => (
        <DataTable.Column
          key={col.field}
          field={col.field}
          header={col.header}
          renderer={col.renderer}
          sortable
          align={col.align}
          initialWidth={col.initialWidth}
        />
      ))}
      <DataTable.Pagination
        itemsPerPage={10}
        totalItems={0}
        showDisplayDetails
        showNav
        expandEllipsis
      />
    </DataTable>
  );
};
