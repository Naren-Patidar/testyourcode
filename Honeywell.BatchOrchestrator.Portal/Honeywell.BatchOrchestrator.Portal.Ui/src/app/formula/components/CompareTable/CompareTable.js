/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable eqeqeq */
/* eslint-disable radix */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import './compareTable.scss';

import { DataTable } from '@scuf/datatable';
import { getPageEntries } from '@scuf/datatable/dist/util/paginationHelper';
// import '@scuf/datatable/honeywell-compact-combined/theme.css';
import { AppConstants } from 'utils/app-constants';
import { Checkbox } from '@scuf/common';
import ReactTooltip from 'react-tooltip';
import New_Icon from 'assets/icons/New_Icon.svg';
import TableRow from '../TableRow/TableRow';
import TableHeader from '../TableHeader/TableHeader';

const columnNames = [
  { id: 1, name: 'SR.NO' },
  { id: 2, name: 'PARAMETER DESCRIPTION' },
  { id: 3, name: 'RM' },
  { id: 4, name: 'ENG.UNIT' },
  { id: 5, name: 'MIN VALUE' },
  { id: 6, name: 'MAX VALUE' },
  { id: 7, name: 'SCALABLE' },
  { id: 8, name: 'NA VALUE' },
];
const columnNamesFormula = [
  { id: 1, name: 'SR.NO' },
  { id: 2, name: 'PARAMETER DESCRIPTION' },
  { id: 3, name: 'VALUE' },
  { id: 4, name: 'ENG.UNIT' },
  { id: 5, name: 'MIN VALUE' },
  { id: 6, name: 'MAX VALUE' },
  { id: 7, name: 'SCALABLE' },
];

const CompareTable = (props) => {
  const { formulaSetInfo, filterData, formulaInfo, itemType } = props;
  const [formulaSetData, setFormulaSetData] = useState(formulaSetInfo || []);
  const [formulaData, setFormulaData] = useState(formulaInfo || []);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  // const [approvalFormulaIndexes, setApprovalFormulaIndexs] = useState(0);

  const handlePageChange = (page, itemCount) => {
    const tempPage = page;
    const tempitemCount = itemCount;
    setActivePage(tempPage);
    setItemsPerPage(tempitemCount);
  };
  useEffect(() => {
    handlePageChange(1, itemsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterData]); // To stop going back to page one
  const parseformulaSetData = () => {
    const pagedData = getPageEntries(formulaSetData, activePage, itemsPerPage);
    return pagedData;
  };
  const parseformulaData = () => {
    const pagedData = getPageEntries(formulaData, activePage, itemsPerPage);
    return pagedData;
  };
  // console.log("ComapreTable-filterData",filterData);

  useEffect(() => {
    if (itemType === 'formulaset') {
      props.getFormulaSet(props.id);
    } else {
      props.getFormula(props.id);
    }
  }, [props.id]);

  useEffect(() => {
    let approvalFormulaIndexes = 0;
    const _tempFormulaSet =
      formulaSetInfo &&
      formulaSetInfo.formulaSetParameter?.map((item, index) => {
        item.no = parseInt(index) + 1;
        return item;
      });
    const _tempFormulaInfo =
      formulaInfo &&
      formulaInfo.formulaParameterInfoForApprovals?.map((item, index) => {
        if (item.isSelected) {
          item.no = approvalFormulaIndexes + 1;
          approvalFormulaIndexes += 1;
        }

        return item;
      });
    setFormulaSetData(_tempFormulaSet);
    setFormulaData(_tempFormulaInfo);
  }, [formulaSetInfo, formulaInfo]);

  useEffect(() => {
    if (itemType === 'formulaset') {
      if (filterData === 'Modified' && itemType === 'formulaset') {
        setFormulaSetData(
          formulaSetInfo.formulaSetParameter &&
            formulaSetInfo.formulaSetParameter.filter((item) => {
              return (
                item.isFormulaSetParameterModified == 1 ||
                (item.notApplicableValuePrevious &&
                  item.notApplicableValue != item.notApplicableValuePrevious)
              );
            })
        );
      } else {
        setFormulaSetData(formulaSetInfo.formulaSetParameter);
      }
    } else if (filterData === 'Modified' && itemType === 'formula') {
      setFormulaData(
        formulaInfo.formulaParameterInfoForApprovals &&
          formulaInfo.formulaParameterInfoForApprovals
            .filter((item) => {
              return item.isSelected;
            })
            .filter((item) => {
              return item.isFormulaParameterModified == 1 && item.isNewRow == 0;
            })
      );
    } else if (filterData === 'New' && itemType === 'formula') {
      setFormulaData(
        formulaInfo.formulaParameterInfoForApprovals &&
          formulaInfo.formulaParameterInfoForApprovals
            .filter((item) => {
              return item.isSelected;
            })
            .filter((item) => {
              return item.isNewRow == 1;
            })
      );
    } else {
      setFormulaData(
        formulaInfo.formulaParameterInfoForApprovals &&
          formulaInfo.formulaParameterInfoForApprovals.filter((item) => {
            return item.isSelected;
          })
      );
    }
  }, [
    filterData,
    itemType,
    formulaInfo.formulaParameterInfoForApprovals,
    formulaSetInfo.formulaSetParameter,
  ]);

  const renderCheckbox = (cellData) => {
    return <Checkbox checked={cellData.value} disabled />;
  };
  function renderRMWithoutEdit(cellData) {
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
  const renderTable = () => {
    if (itemType === 'formulaset') {
      if (filterData === 'Modified' && itemType === 'formulaset') {
        return (
          formulaSetInfo.formulaSetParameter &&
          formulaSetInfo.formulaSetParameter
            .filter((item) => {
              return (
                item.isFormulaSetParameterModified == 1 ||
                (item.notApplicableValuePrevious &&
                  item.notApplicableValue != item.notApplicableValuePrevious)
              );
            })
            .map((item, index) => (
              <TableRow itemType={itemType} item={item} index={index} />
            ))
        );
      }
      return (
        formulaSetInfo.formulaSetParameter &&
        formulaSetInfo.formulaSetParameter.map((item, index) => (
          <TableRow itemType={itemType} item={item} index={index} />
        ))
      );
    }
    if (filterData === 'Modified' && itemType === 'formula') {
      return (
        formulaInfo.formulaParameterInfoForApprovals &&
        formulaInfo.formulaParameterInfoForApprovals
          .filter((item) => {
            return item.isSelected;
          })
          .filter((item) => {
            return item.isFormulaParameterModified == 1 && item.isNewRow == 0;
          })
          .map((item, index) => (
            <TableRow itemType={itemType} item={item} index={index} />
          ))
      );
    }
    if (filterData === 'New' && itemType === 'formula') {
      return (
        formulaInfo.formulaParameterInfoForApprovals &&
        formulaInfo.formulaParameterInfoForApprovals
          .filter((item) => {
            return item.isSelected;
          })
          .filter((item) => {
            return item.isNewRow == 1;
          })
          .map((item, index) => (
            <TableRow itemType={itemType} item={item} index={index} />
          ))
      );
    }
    return (
      formulaInfo.formulaParameterInfoForApprovals &&
      formulaInfo.formulaParameterInfoForApprovals
        .filter((item) => {
          return item.isSelected;
        })
        .map((item, index) => (
          <TableRow itemType={itemType} item={item} index={index} />
        ))
    );
  };
  const renderIndex = (cellData) => {
    return cellData.rowIndex + 1;
  };
  const renderForulaSetDataTable = () => {
    return (
      formulaSetData?.length > 0 && (
        <DataTable
          data={parseformulaSetData() || []}
          loading={formulaSetData?.length <= 0}
          scrollable
          scrollHeight="46vh"
          lazy
          rows={AppConstants.PAGE_SIZE}
        >
          <DataTable.Column
            field="no"
            initialWidth="2.2vw"
            header="SR NO."
            align="right"
            renderer={renderDot}
          />
          {/* <DataTable.Column field="no" header="SN" initialWidth="1.5vw" /> */}
          <DataTable.Column
            field="description"
            header="PARAMETER DESCRIPTION"
            initialWidth="6.5vw"
            renderer={renderTooltip}
          />
          <DataTable.Column
            align="center"
            field="isRawMaterial"
            header="RM"
            initialWidth="2vw"
            renderer={renderRMWithoutEdit}
          />
          <DataTable.Column
            align="center"
            field="engUnit"
            header="ENG.UNIT"
            initialWidth="2vw"
          />
          <DataTable.Column
            align="right"
            field="minval"
            header="MIN VALUE"
            initialWidth="2.5vw"
          />
          <DataTable.Column
            align="right"
            field="maxval"
            header="MAX VALUE"
            initialWidth="2.5vw"
          />
          <DataTable.Column
            align="center"
            field="scalable"
            header="SCALABLE"
            initialWidth="2vw"
            renderer={renderCheckbox}
          />
          <DataTable.Column
            align="right"
            field="notApplicableValue"
            header="NA VALUE"
            initialWidth="2.5vw"
          />
          <DataTable.Pagination
            totalItems={formulaSetData.length}
            activePage={activePage}
            itemsPerPage={itemsPerPage}
            showDisplayDetails
            onPageChange={handlePageChange}
          />
        </DataTable>
      )
    );
  };
  const renderForulaDataTable = () => {
    return (
      formulaData?.length > 0 && (
        <DataTable
          data={parseformulaData() || []}
          loading={formulaData?.length <= 0}
          scrollable
          scrollHeight="46vh"
          lazy
          rows={AppConstants.PAGE_SIZE}
        >
          <DataTable.Column
            field="no"
            initialWidth="2vw"
            align="right"
            header="SR No."
            renderer={renderIcon}
          />
          {/* <DataTable.Column field="no" header="SN" initialWidth="1.5vw" /> */}
          <DataTable.Column
            field="formulaParameterDescription"
            header="PARAMETER DESCRIPTION"
            initialWidth="6.5vw"
            renderer={renderTooltip}
          />
          <DataTable.Column
            align="right"
            field="defaultValue"
            header="VALUE"
            initialWidth="2.5vw"
          />
          <DataTable.Column
            align="center"
            field="enggUnit"
            header="ENG.UNIT"
            initialWidth="2vw"
          />
          <DataTable.Column
            align="right"
            field="minSetPoint"
            header="MIN VALUE"
            initialWidth="2.5vw"
          />
          <DataTable.Column
            align="right"
            field="maxSetPoint"
            header="MAX VALUE"
            initialWidth="2.5vw"
          />
          <DataTable.Column
            align="center"
            field="scalable"
            header="SCALABLE"
            initialWidth="2vw"
            renderer={renderCheckbox}
          />
          <DataTable.Pagination
            totalItems={formulaData.length}
            activePage={activePage}
            itemsPerPage={itemsPerPage}
            showDisplayDetails
            onPageChange={handlePageChange}
          />
        </DataTable>
      )
    );
  };

  const renderTooltip = (cellData) => {
    return (
      <div>
        <span data-tip data-for={cellData.value}>
          {displayText(cellData.value)}
        </span>
        <ReactTooltip
          backgroundColor="#303030"
          textColor="#d0d0d0"
          id={cellData.value}
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
            <p>{cellData.value}</p>
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
  const renderDot = (cellData) => {
    const item = cellData.rowData;
    if (
      item.isFormulaSetParameterModified ||
      (item.notApplicableValuePrevious &&
        item.notApplicableValue != item.notApplicableValuePrevious)
    )
      return (
        <div className="d-flex align-items-center justify-content-end">
          <span className="TableRow_dot" />
          <span className="ml-2">{item.no}</span>
        </div>
      );
    return <span>{item.no}</span>;
  };

  const renderNew = (flag = false) => {
    if (flag) return <img src={New_Icon} />;
    return null;
  };

  const renderIcon = (cellData) => {
    const { isNewRow, isFormulaParameterModified, no } = cellData.rowData;
    const item = cellData.rowData;
    if (isNewRow) {
      // return <img src={New_Icon}></img>;
      // return <span title="new" className="icon_new"></span>
      return (
        <div className="d-flex align-items-center justify-content-end">
          <span title="New parameter" className="icon-New-indicator span_new">
            <span>New</span>
          </span>
          <span className="ml-2">{no}</span>
        </div>
      );
    }
    if (isFormulaParameterModified) {
      return (
        <>
          <div className="d-flex align-items-center justify-content-end">
            <span data-tip data-for={item.id} className="TableRow_dot" />
            <span className="ml-2">{no}</span>
          </div>
          {!item.isNewRow &&
          itemType === 'formula' &&
          (item.defaultValuePrevious != item.defaultValue ||
            item.minSetPoint != item.minSetPointPrevious ||
            item.maxSetPointPrevious != item.maxSetPoint) ? (
            //  <div className="TableRow-popup">
            <ReactTooltip
              backgroundColor="#303030"
              textColor="#d0d0d0"
              id={item.id}
              place="bottom"
              effect="solid"
            >
              <div className="TableRow-popup-details">
                <p style={{ msGridColumn: 1 }}>
                  {item.defaultValuePrevious &&
                  item.defaultValuePrevious != item.defaultValue
                    ? `old Value: ${item.defaultValuePrevious}`
                    : ''}
                </p>
                <p style={{ msGridColumn: 2 }}>
                  {item.minSetPointPrevious &&
                  item.minSetPoint != item.minSetPointPrevious
                    ? `old Min Val: ${item.minSetPointPrevious}`
                    : ''}
                </p>
                <p style={{ msGridColumn: 3 }}>
                  {item.maxSetPointPrevious &&
                  item.maxSetPointPrevious != item.maxSetPoint
                    ? `old Max Val: ${item.maxSetPointPrevious}`
                    : ''}
                </p>
              </div>
            </ReactTooltip>
          ) : (
            ''
          )}
        </>
      );
    }
    return <span style={{ float: 'right' }}>{no}</span>;
  };
  return (
    <div className="compareTable">
      <div className="compareTable-content">
        {itemType === 'formulaset'
          ? renderForulaSetDataTable()
          : renderForulaDataTable()}
      </div>
    </div>
  );
};

export default CompareTable;
