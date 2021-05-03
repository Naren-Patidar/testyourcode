/* eslint-disable react/self-closing-comp */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable prefer-template */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable prefer-destructuring */
/* eslint-disable spaced-comment */
/* eslint-disable no-return-assign */
/* eslint-disable no-else-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prefer-const */
/* eslint-disable import/newline-after-import */
/* eslint-disable import/no-duplicates */
/* eslint-disable import/extensions */
/* eslint-disable import/order */
/* eslint-disable import/no-unresolved */
/* eslint-disable prettier/prettier */
import {
  Button,
  Checkbox,
  DatePicker,
  Icon,
  Input,
  Tooltip,
} from '@scuf/common';
import { DataTable } from '@scuf/datatable';
import { getPageEntries } from '@scuf/datatable/dist/util/paginationHelper';
import axios from 'axios';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { getCookie } from 'utils/utility';
import { DATEFORMAT } from '../../../../utils/constants/dateformat';
import { errorHandler } from '../../../../core/error';
import { BASE_URL } from '../../../../utils/Settings';
import AlertPopup from '../AlertPopup';
import './audit-trail.scss';
const getSubsystemsEndpoint = `${BASE_URL}AuditTrail/GetSubsystems`;
const getUserIdsEndpoint = `${BASE_URL}AuditTrail/GetUniqueUserIds`;
const getAuditTrailEndpoint = `${BASE_URL}AuditTrail/GetAuditTrailsWithFilter`;

let today = new Date();
const xsrfToken = getCookie('X-XSRF-TOKEN');
const axiosClient = axios.create({
  headers: {
    'content-type': 'application/json',
    'X-XSRF-TOKEN': xsrfToken,
  },
  withCredentials: true,
});

function AuditTrail(props) {
  // const [filterData, setFilterData] = useState([])
  const [messageBoxItem, setMessageBoxItem] = useState('');
  const [open, setOpen] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [pageNumber, setPageNumber] = useState(null);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [auditMessageapi, setAuditMessageapi] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [activePage, setActivePage] = useState(1);
  const [filteredCount, setFilteredCount] = useState(null);
  const [totalItems, setTotalItems] = useState(100);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [showUserIdFilters, setShowUserIdFilters] = useState(false);
  const [showSubsystemFilters, setShowSubsystemFilters] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(new Set());
  const [selectedSubsystem, setSelectedSubsystem] = useState(new Set());
  const [totalSubsystems, setTotalSubsystems] = useState([]);
  const [totalUserIds, setTotalUserIds] = useState([]);
  const [searchAuditTrailData, setSearchAuditTrailData] = useState(false);

  const [auditTrailPostData, setAuditTrailPostData] = useState({
    pageNumber: activePage,
    fromDate: fromDate,
    toDate: toDate,
    searchPattern: filterValue,
    sortConfig: {
      sortField: sortField,
      sortOrder: sortOrder,
    },
    filters: [],
  });

  let updateSendingObject = (filtersForAuditTrail) => {
    let tempauditTrailPostData = JSON.parse(JSON.stringify(auditTrailPostData));
    const filterIdx = tempauditTrailPostData.filters.findIndex(
      (d) => d.filterBy === filtersForAuditTrail.filterBy
    );
    if (filterIdx >= 0) {
      if (filtersForAuditTrail.filterValues.length === 0)
        tempauditTrailPostData.filters.splice(filterIdx, 1);
      else tempauditTrailPostData.filters[filterIdx] = filtersForAuditTrail;
    } else {
      tempauditTrailPostData.filters.push(filtersForAuditTrail);
    }

    setAuditTrailPostData(tempauditTrailPostData);
  };

  let clearAllFilters = (filtersForAuditTrail) => {
    let tempauditTrailPostData = JSON.parse(JSON.stringify(auditTrailPostData));
    tempauditTrailPostData.filters = [];
    tempauditTrailPostData.filters.push(filtersForAuditTrail);
    setAuditTrailPostData(tempauditTrailPostData);
  };

  let updateFromDateInSendingObject = (date) => {
    let tempauditTrailPostData = JSON.parse(JSON.stringify(auditTrailPostData));
    tempauditTrailPostData.fromDate = date;
    setAuditTrailPostData(tempauditTrailPostData);
  };

  let updateToDateInSendingObject = (date) => {
    let tempauditTrailPostData = JSON.parse(JSON.stringify(auditTrailPostData));
    tempauditTrailPostData.toDate = date;
    setAuditTrailPostData(tempauditTrailPostData);
  };

  let updateActivePageInSendingObject = (tempPage) => {
    let tempauditTrailPostData = JSON.parse(JSON.stringify(auditTrailPostData));
    tempauditTrailPostData.pageNumber = tempPage;
    setAuditTrailPostData(tempauditTrailPostData);
  };

  let updateSortingInSendingObject = (sortFields) => {
    let tempauditTrailPostData = JSON.parse(JSON.stringify(auditTrailPostData));

    tempauditTrailPostData.sortConfig.sortField = sortFields.sortField;
    tempauditTrailPostData.sortConfig.sortOrder = sortFields.sortOrder;
    parseData();
    setAuditTrailPostData(tempauditTrailPostData);
    setSearchAuditTrailData(!searchAuditTrailData);
  };

  let updateGlobalFilterValueInSendingObject = (val) => {
    let tempauditTrailPostData = JSON.parse(JSON.stringify(auditTrailPostData));
    tempauditTrailPostData.searchPattern = val;
    setAuditTrailPostData(tempauditTrailPostData);
    // setSearchAuditTrailData(!searchAuditTrailData)
  };

  useEffect(() => {
    let data;

    async function getData() {
      try {
        await axiosClient
          .post(getAuditTrailEndpoint, auditTrailPostData)
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

      setTotalItems(data.totalRecords);
      setItemsPerPage(data.pageSize);

      const data2 = data.data.map((entry, index) => {
        let stillUtc = moment.utc(entry.dateTime).toDate();
        let local = moment(stillUtc).local().format(DATEFORMAT);
        return {
          auditMessage: entry.auditMessage,
          //   dateTime: entry.dateTime,
          dateTime: local,
          event: entry.event,
          id: entry.id,
          machineIP: entry.machineIP,
          source: entry.source,
          subsystem: entry.subsystem,
          user: entry.user,
          comment: entry.comment,
          entityName: entry.entityName,
        };
      });

      // setObjectfromapi(data2);

      setTableData(data2);
      //setFilterData(data2)
    }

    // if (props.showAuditTrail) {
    getData();

    // }

    // eslint-disable-next-line
  }, [props.showAuditTrail, searchAuditTrailData]);

  const onRowSelectChange = (row) => {
    let id = row.data.id;
    let data = tableData.slice(0);
    let dataTableBody = document.querySelector('tbody.p-datatable-tbody');
    if (selectedRow) {
      let dataTableRow = dataTableBody.children[selectedRow.index];
      if (dataTableRow) dataTableRow.classList.remove('p-highlight');
    }
    dataTableBody.children[row.index].classList.add('p-highlight');
    setSelectedRow(row);

    // use filter here if possilbe , check row.data.auditmessage
    for (let i = 0; i < data.length; i += 1) {
      if (id === data[i].id) {
        const str = data[i].auditMessage;

        setAuditMessageapi(str);
      }
    }
  };

  const handlePageChange = (page, itemCount) => {
    let tempPage = page;
    let tempitemCount = itemCount;
    setActivePage(tempPage);
    setPageNumber(tempPage);
    setItemsPerPage(tempitemCount);
    updateActivePageInSendingObject(tempPage);
    setAuditMessageapi('');
    setSearchAuditTrailData(!searchAuditTrailData);

    if (selectedRow) {
      let dataTableBody = document.querySelector('tbody.p-datatable-tbody');

      let dataTableRow = dataTableBody.children[selectedRow.index];
      if (dataTableRow) dataTableRow.classList.remove('p-highlight');

      setSelectedRow(null);
    }
  };

  const handleGlobalFilter = (val) => {
    setFilterValue(val);
    updateGlobalFilterValueInSendingObject(val);
  };

  const handleGlobalSearchFocus = (val) => {
    // let searchAuditTrailButton = document.querySelector(
    //   '.btn-search-audit-trail'
    // );
    // searchAuditTrailButton.classList.add('focus');
  };

  const handleGlobalSearchBlur = (val) => {
    // let searchAuditTrailButton = document.querySelector(
    //   '.btn-search-audit-trail'
    // );
    // searchAuditTrailButton.classList.remove('focus');
  };

  const parseData = () => {
    let pagedData = getPageEntries(
      tableData,
      activePage,
      itemsPerPage,
      ['dateTime', 'machineIP', 'subsystem', 'source', 'entityName', 'comment'],
      sortOrder,
      sortField,
      filterValue
    );

    return pagedData;
  };

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
    setShowUserIdFilters(false);
    setShowSubsystemFilters(false);
  });

  const ref = useRef();
  function useOnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (
          !ref.current ||
          ref.current.contains(event.target) //  ||
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
  // useOnClickOutside(ref, () => {
  //     setShowComment(false)
  // })

  const getSubsystems = async () => {
    const { status, data } = await axiosClient.get(getSubsystemsEndpoint);
    if (status === 200) {
      setTotalSubsystems(data);
    }
  };

  const getUserIds = async () => {
    const { status, data } = await axiosClient.get(getUserIdsEndpoint);
    if (status === 200) {
      setTotalUserIds(data);
    }
  };

  let onRefreshClick = () => {
    setSearchAuditTrailData(!searchAuditTrailData);
  };

  const showRowDetailsPlaceHolder = (data) => {
    if (data) {
      return <pre className="p-2">{data}</pre>;
    } else {
      return (
        <div className="placeholder text-mute p-2">
          {'Select a data row in the table above to view details...'}
        </div>
      );
    }
  };

  return (
    <div className="audit-trail">
      <h3>Audit Trail</h3>
      <div className="d-flex align-items-center">
        <div className="date-picker-container">
          <DatePicker
            className="set-from-datepicker"
            label="From"
            disableFuture={true}
            onChange={(date) => {
              let tempFromdate =
                date.getFullYear() +
                '-' +
                (date.getMonth() + 1) +
                '-' +
                date.getDate();
              setFromDate(tempFromdate);
              setActivePage(1);
              updateFromDateInSendingObject(tempFromdate);
              setAuditMessageapi('');
            }}
          />
        </div>
        <div className="date-picker-container">
          <DatePicker
            className="set-to-datepicker"
            label="To - Optional"
            onChange={(date) => {
              let tempToDate =
                date.getFullYear() +
                '-' +
                (date.getMonth() + 1) +
                '-' +
                date.getDate();
              setToDate(tempToDate);
              setActivePage(1);
              updateToDateInSendingObject(tempToDate);
              setAuditMessageapi('');
            }}
          />
        </div>

        {/* <! -- Filters --> */}
        <div className="filter-container">
          <div className="">
            <div className="filter">
              <div
                className={
                  'filter-button d-flex align-items-center' +
                  (showFilters ? ' show-filter' : '')
                }
                onClick={() => {
                  setShowFilters(!showFilters);
                  setShowUserIdFilters(false);
                  setShowSubsystemFilters(false);
                }}
              >
                <Icon
                  name="filter"
                  root="common"
                  exactSize="0.6667rem"
                  className="filter-icon"
                />
                <span className="filter-header-text">All Filters</span>
              </div>
              <div className="clear"></div>

              <div
                className={'filter-card' + (showFilters ? '' : ' none')}
                ref={refFilter}
              >
                <div
                  className="filter-parameter"
                  onClick={() => {
                    setShowSubsystemFilters(!showSubsystemFilters);
                    setShowUserIdFilters(false);
                    getSubsystems();
                  }}
                >
                  <span className="filter-parameter-header-text">
                    Subsystem
                  </span>
                  <Icon
                    name={'caret' + (showSubsystemFilters ? '-up' : '-down')}
                    root="common"
                    exactSize=".6667rem"
                    className="parameter-icon"
                  />
                </div>
                <div
                  className={
                    'filter-options' + (showSubsystemFilters ? '' : ' none')
                  }
                >
                  {totalSubsystems.map((value, index) => {
                    return (
                      <Checkbox
                        checked={selectedSubsystem.has(value)}
                        label={value}
                        onChange={(e) => {
                          let update = selectedSubsystem;
                          const isOptionChecked = e;

                          if (
                            !isOptionChecked &&
                            selectedSubsystem.has(value)
                          ) {
                            update.delete(value);
                          } else {
                            update.add(value);
                            // setFilterBy(filterByField);
                          }

                          setSelectedSubsystem(update);
                          let filtersForAuditTrail = {
                            filterBy: 'subsystem', //selectedSubsystem.size ? filterBy : "",
                            filterValues: Array.from(selectedSubsystem),
                          };

                          updateSendingObject(filtersForAuditTrail);
                        }}
                        className="option"
                      />
                    );
                  })}
                </div>
                <div
                  className="filter-parameter"
                  onClick={() => {
                    setShowSubsystemFilters(false);
                    setShowUserIdFilters(!showUserIdFilters);
                    getUserIds();
                  }}
                >
                  <span className="filter-parameter-header-text">UserID</span>
                  <Icon
                    name={'caret' + (showUserIdFilters ? '-up' : '-down')}
                    root="common"
                    exactSize=".6667rem"
                    className="parameter-icon"
                  />
                </div>
                <div
                  className={
                    'filter-options' + (showUserIdFilters ? '' : ' none')
                  }
                >
                  {totalUserIds.map((value, index) => {
                    return (
                      <Checkbox
                        checked={selectedUserId.has(value)}
                        label={value}
                        onChange={(e) => {
                          let update = selectedUserId;
                          const isOptionChecked = e;
                          if (!isOptionChecked && selectedUserId.has(value)) {
                            update.delete(value);
                          } else {
                            update.add(value);
                          }

                          setSelectedUserId(update);
                          let filtersForAuditTrailuserid = {
                            filterBy: 'user',
                            filterValues: Array.from(selectedUserId),
                          };

                          updateSendingObject(filtersForAuditTrailuserid);
                        }}
                        className="option"
                      />
                    );
                  })}
                </div>
                <div
                  className="filter-parameter "
                  onClick={() => {
                    // setShowUserIdFilters(new Set())
                    // setShowSubsystemFilters(new Set())
                    setSelectedUserId(new Set());
                    setSelectedSubsystem(new Set());

                    let filtersForAuditTrailClearALL = {
                      filterBy: '',
                      filterValues: [],
                    };
                    clearAllFilters(filtersForAuditTrailClearALL);
                  }}
                >
                  <span className="filter-parameter-header-text">
                    Clear All
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <! -- /Filters --> */}

        <Button
          // className="btn-primary"
          content="Apply"
          type="primary"
          size="small"
          onClick={() => {
            setAuditMessageapi('');
            setActivePage(1);
            setSearchAuditTrailData(!searchAuditTrailData);
            handlePageChange(1, itemsPerPage);
          }}
        ></Button>
      </div>

      <div className="table-toolbar d-flex align-items-center justify-content-flex-end">
        <Input
          placeholder="Search the table below"
          value={filterValue}
          // icon={
          //   <Icon
          //     name="search"
          //     root="global"
          //     exactSize="1.75rem"
          //     title={'Search Text'}
          //     onClick={() => {
          //       setAuditMessageapi('');
          //       handlePageChange(1, itemsPerPage);
          //       setSearchAuditTrailData(!searchAuditTrailData);
          //     }}
          //   />
          // }
          iconPosition="right"
          className="mr-4"
          onFocus={handleGlobalSearchFocus}
          onBlur={handleGlobalSearchBlur}
          onChange={handleGlobalFilter}
          onEnter={() => {
            setSearchAuditTrailData(!searchAuditTrailData);
          }}
        />
        <Tooltip
          content={'search audit data'}
          element={
            <Icon
              name={'search'}
              root="global"
              exactSize="1.9rem"
              className="mr-8 search-audit-trail-icon"
              title={'Search Text'}
              onClick={() => {
                setAuditMessageapi('');
                handlePageChange(1, itemsPerPage);
                setSearchAuditTrailData(!searchAuditTrailData);
              }}
            />
          }
          position="top center"
          event="hover"
          hoverable
        />

        {/* <Input
          value={filterValue}
          placeholder="Search the table below"
          className="txt-search-audit-trail"
          onFocus={handleGlobalSearchFocus}
          onBlur={handleGlobalSearchBlur}
          onChange={handleGlobalFilter}
        />

        <Icon
          name={'search'}
          root="global"
          exactSize="1.75rem"
          className="btn-search-audit-trail"
          title={'Search Text'}
          onClick={() => {
            setAuditMessageapi('');
            handlePageChange(1, itemsPerPage);
            setSearchAuditTrailData(!searchAuditTrailData);
          }}
        /> */}

        {/* <Button
          className="Audit-Trail-Button"
          icon="close"
          content=""
          type="secondary"
          onClick={() => {
            setFilterValue("");
            let tempauditTrailPostData = JSON.parse(
              JSON.stringify(auditTrailPostData)
            );
            tempauditTrailPostData.searchPattern = "";
            setAuditTrailPostData(tempauditTrailPostData);
            setSearchAuditTrailData(!searchAuditTrailData);
          }}
        ></Button> */}
        {/* <Button
          className=""
          content=""
          type="inline"
          icon=""
          root="global"
          title={"Search"}
          onClick={() => setSearchAuditTrailData(!searchAuditTrailData)}
        ></Button> */}
        <Tooltip
          content={'Clear the input text'}
          element={
            <Icon
              name={'badge-stop'}
              root="global"
              exactSize="1.9rem"
              className="mr-8 stop-audit-trail-icon"
              title={'Clear Search Text'}
              onClick={() => {
                setFilterValue('');
                let tempauditTrailPostData = JSON.parse(
                  JSON.stringify(auditTrailPostData)
                );
                tempauditTrailPostData.searchPattern = '';
                setAuditTrailPostData(tempauditTrailPostData);
                setSearchAuditTrailData(!searchAuditTrailData);
              }}
            />
          }
          position="top center"
          event="hover"
          hoverable
        />

        <Tooltip
          content={'Refresh data of the table'}
          element={
            <Icon
              title={'Reload Data in Table'}
              className="refresh-audit-trail-icon"
              name="refresh"
              root="global"
              exactSize="1.9rem"
              onClick={onRefreshClick}
            />
          }
          position="top center"
          event="hover"
          hoverable
        />

        {/* <div className="refresh-audit-trail"> */}
        {/* <Icon
          title={'Reload Data in Table'}
          className="refresh-audit-trail-icon"
          name="refresh"
          root="global"
          exactSize="1.9rem"
          onClick={onRefreshClick}
        /> */}
        {/* </div> */}
      </div>

      {/* <Button
        className="Audit-Trail-Button"
        content="Search"
        type="primary"
        onClick={() => setSearchAuditTrailData(!searchAuditTrailData)}
      ></Button> */}

      <AlertPopup
        messageBoxItem={messageBoxItem}
        open={open}
        setOpen={setOpen}
      ></AlertPopup>

      <DataTable
        data={tableData}
        // data={parseData()}
        scrollable={true}
        scrollHeight="46vh"
        rows={totalItems}
        // search={true}
        lazy={true}
        totalRecords={filteredCount || totalItems}
        // onGlobalFilter={handleGlobalFilter}
        onSort={(sortFields) => {
          let tempsortFields = sortFields;
          setSortField(tempsortFields.sortField);
          setSortOrder(tempsortFields.sortOrder);
          // setActivePage(1);
          updateSortingInSendingObject(tempsortFields);
        }}
        onRowClick={(e) => {
          onRowSelectChange(e);
        }}

        // selection={selectedRow}

        // onSelectionChange={(e) =>  onRowSelectChange(e)}
      >
        <DataTable.Column
          field="dateTime"
          header="DATE&TIME"
          initialWidth="15vw"
          sortable={true}
        />
        <DataTable.Column
          field="user"
          header="USER ID"
          initialWidth="15vw"
          // renderer={renderTooltip}
          sortable={true}
        />
        <DataTable.Column
          field="machineIP"
          header="MACHINE IP"
          initialWidth="9.8vw"
          sortable={true}
          // renderer={props.EditRawMaterial?renderRectangleEditEnabled :renderRectangleWithoutEdit}
        />
        <DataTable.Column
          field="subsystem"
          header="SUBSYSTEM"
          initialWidth="11.7708vw"
          sortable={true}
        />
        <DataTable.Column
          field="source"
          header="ACTION"
          initialWidth="15.7708vw"
          sortable={true}
        />

        <DataTable.Column
          field="entityName"
          header="EntityName"
          initialWidth="11.7708vw"
        />
        <DataTable.Column
          field="comment"
          header="COMMENT"
          initialWidth="9.9225vw"
          // renderer={renderCheckbox}
          align="center"
          className="scalable"
        />
        <DataTable.Pagination
          totalItems={filteredCount || totalItems}
          itemsPerPage={itemsPerPage}
          activePage={activePage}
          showDisplayDetails
          onPageChange={handlePageChange}
        />
      </DataTable>

      <div className="audit-trail-description">
        <div className="details-header">Details of</div>
        <div className="details-text">
          {showRowDetailsPlaceHolder(auditMessageapi)}
        </div>
      </div>
    </div>
  );
}

export default AuditTrail;
