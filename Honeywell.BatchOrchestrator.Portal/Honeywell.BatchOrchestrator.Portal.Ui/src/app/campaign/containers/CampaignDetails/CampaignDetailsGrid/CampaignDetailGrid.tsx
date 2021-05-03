/* eslint-disable react/no-array-index-key */
/* eslint-disable radix */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable no-nested-ternary */
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
import { ActionState } from '+store/campaign/types';
import {
  Badge,
  Button,
  Card,
  Grid,
  Icon,
  Input,
  Loader,
  Modal,
  Popup,
  Select,
  Tooltip,
} from '@scuf/common';
import { DataTable } from '@scuf/datatable';
import { getPageEntries } from '@scuf/datatable/dist/util/paginationHelper';
import {
  campaignStates,
  CampaignStateValues,
  CampaignStatusValues,
} from 'app/campaign/models/campaign';
import { CampaignType } from 'app/campaign/models/campaign-type';
import { UpdateBatch } from 'app/campaign/models/update-batch';
// import { getFormattedDateTime } from 'app/campaign/utils';
import { toLocalTimeStringFormatted } from 'app/../utils/date-utils';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toastr } from 'shared/toastr';
import { useConfirm } from 'shared/confirm-dialog';
import { ColumnProps } from 'utils/datatable-column-props';
import { BatchDetails, UnitSelection } from '../../../models/campaign-details';
import { DataTableFilter } from '../BatchDataTableFilter/BatchDatatable.Filter';
import './CampaignDetailGrid.scss';
import { HeaderWithToolTip } from 'shared/tooltip';
import { unitSelectionTypeVals } from 'app/campaign/models/campaign-unit-selection';
import { Permissions, useAuthorize } from 'core/authentication';
import { PermissionValues } from 'core/authentication/models/user-permission';
import { useCampaignFacade } from '+store/campaign';
import { useClickOutSide } from 'utils/hooks/useClickOutside';
import { AppConstants } from 'utils/app-constants';
import isDecimal from 'validator/es/lib/isDecimal';

export type actionType = 'delete';
export type Action = (type: actionType, data: BatchDetails) => void;
export const CampaignDetailGrid: React.FC<{
  data: BatchDetails[];
  loading?: boolean;
  getSelectionUnit: Function;
  batchUnitSelections: UnitSelection[];
  updateBatchState: Function;
  addBatch: Function;
  markEditableBatch: Function;
  action: Action;
  actionState?: ActionState;
  onRefresh: () => void;
}> = ({
  data,
  loading,
  getSelectionUnit,
  batchUnitSelections,
  updateBatchState,
  addBatch,
  markEditableBatch,
  action,
  actionState,
  onRefresh,
}) => {
  const {
    campaignSummaryCampaignType: campaignType,
    campaignSummaryIsUnitSelectionDeferred: isUnitSelectionDeferred,
    campaignSummaryExcessRawMaterialQty: excessRawMaterialQty,
    campaignSummaryActionState,
    loading: unitSelectionLoading,
  } = useCampaignFacade();
  const [actualQuantity, setActualQuantity] = useState(0);
  const [estimatedQuantity, setEstimatedQuantity] = useState<number | null>(
    null
  );
  const [estimatedQuantityError, setEstimatedQuantityError] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedStateError, setSelectedStateError] = useState('');
  const [openState, setOpenState] = useState(false);
  const [selectedBatchId, setSelectedBatchId] = useState('');
  const [filterData, setFilterData] = useState<BatchDetails[]>([]);
  const [activePage, setActivePage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [loadingData, setLoadingData] = useState(false);
  const [batchAdded, setBatchAdded] = useState(false);
  const [actionType, setActionType] = useState('');
  const params: any = useParams();
  const confirm = useConfirm();
  const newBatchInfoRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef(null);
  useClickOutSide(stateRef, () => {
    setOpenState(false);
  });

  // const { authorized: canManageCampaign } = useAuthorize([
  //   PermissionValues.StartManageProductionCampaign,
  // ]);
  useEffect(() => {
    setFilterData(data);
  }, [data]);
  useEffect(() => {
    if (actionState && actionState === 'finished') {
      if (actionType === 'add_batch') {
        // setLoadingData(false);
        setBatchAdded(true);
        setTimeout(() => {
          if (newBatchInfoRef.current) {
            newBatchInfoRef.current.scrollIntoView();
            newBatchInfoRef.current
              .closest('tr')
              ?.classList.add('row-highlight');
          }
        }, 500);

        setTimeout(() => {
          if (newBatchInfoRef.current) {
            newBatchInfoRef.current
              .closest('tr')
              ?.classList.remove('row-highlight');
          }
          setLoadingData(false);
          setBatchAdded(false);
        }, 2000);
        setActionType('');
      }
    }
  }, [actionState, actionType]);
  // useEffect(() => {
  //   const field: string[] = [
  //     'batchId',
  //     'isUnitSelectionDeferred',
  //     'currentBatchSize',
  //     'batchYield',
  //     'state',
  //     'startTime',
  //     'endTime',
  //     '',
  //   ];
  //   const pagedData = getPageEntries(
  //     filterData,
  //     activePage,
  //     itemsPerPage,
  //     field
  //   );
  //   setPageData(pagedData);
  // }, [filterData, activePage, itemsPerPage]);

  const parseData = () => {
    const field: string[] = [
      'batchId',
      'isUnitSelectionDeferred',
      'currentBatchSize',
      'batchYield',
      'state',
      'startTime',
      'endTime',
      '',
    ];
    const pagedData = getPageEntries(
      filterData,
      activePage,
      itemsPerPage,
      field
    );
    return pagedData;
  };

  const startTimeRenderer = (cellData) => {
    return (
      <span>
        {cellData.value
          ? toLocalTimeStringFormatted(cellData.value) // getFormattedDateTime(new Date(cellData.value))
          : ''}
      </span>
    );
  };
  // const stateRenderer = (cellData) => {
  //   return (
  //     <span>{cellData?.value}</span>
  // <div>
  //   {CampaignStateValues.Paused === cellData.value && (
  //     <div className="d-flex">
  //       <span className="paused-campaign">
  //         {
  //           campaignStates.find(
  //             (f) => f.value === CampaignStateValues.Paused
  //           )?.text
  //         }
  //       </span>{' '}
  //     </div>
  //   )}
  //   {CampaignStateValues.Running === cellData.value && (
  //     <div className="d-flex">
  //       <span className="running-campaign">
  //         {
  //           campaignStates.find(
  //             (f) => f.value === CampaignStateValues.Running
  //           )?.text
  //         }
  //       </span>
  //     </div>
  //   )}
  //   {CampaignStateValues.Terminating === cellData.value && (
  //     <div className="d-flex">
  //       <span className="terminated-campaign">
  //         {
  //           campaignStates.find(
  //             (f) => f.value === CampaignStateValues.Terminating
  //           )?.text
  //         }
  //       </span>
  //     </div>
  //   )}
  // </div>
  //   );
  // };

  const editModal = (batchData: BatchDetails) => {
    const editableData = { ...batchData };
    editableData.editable = true;
    setEstimatedQuantityError('');
    if (editableData.isStatusUnknown) {
      setSelectedStateError('Please select state');
    } else {
      setSelectedStateError('');
    }

    setSelectedBatchId(batchData.id);
    setEstimatedQuantity(editableData.currentBatchSize ?? 0);
    setActualQuantity(editableData.batchYield ?? 0);
    markEditableBatch(editableData);
  };
  const saveEditData = async (batchData: BatchDetails) => {
    if (estimatedQuantityError || selectedStateError) {
      await confirm.show({
        confirmText: 'Ok',
        message: 'Fields are not valid',
        type: 'alert',
        title: 'Alert',
      });
      return;
    }
    const editableData = { ...batchData };
    editableData.editable = false;
    const batchUpdateData: UpdateBatch = {
      id: selectedBatchId,
      campaignId: params.id,
      batchYield: actualQuantity ?? batchData.batchYield,
      state: selectedState || batchData.state,
      currentBatchSize: estimatedQuantity ?? batchData.currentBatchSize,
    };
    const { confirmed } = await confirm.show({
      confirmText: 'Save',
      message: 'Do you want to save this?',
    });
    if (confirmed) {
      updateBatchState(batchUpdateData);
      markEditableBatch(editableData);
      setActualQuantity(0);
      setSelectedState('');
      setEstimatedQuantity(null);
    }
  };

  const cancelEditData = (batchData: BatchDetails) => {
    const editableData = { ...batchData };
    editableData.editable = false;
    markEditableBatch(editableData);
    setActualQuantity(0);
    setSelectedState('');
    setEstimatedQuantity(null);
  };

  const actionRenderer = (cellData) => {
    const lastItemIndex = data.length;
    return (
      <div className="d-flex justify-content-end align-items-center">
        {campaignType?.state === CampaignStateValues.Terminated ||
        campaignType?.state === CampaignStateValues.Completed ||
        campaignType?.status ===
          CampaignStatusValues.SubmitForApproval ? null : cellData.rowData
            .isStatusUnknown ||
          (cellData.rowData.endTime &&
            campaignType?.state !== CampaignStateValues.Terminating) ||
          (!cellData.rowData.activityId &&
            campaignType?.state !== CampaignStateValues.Terminating) ? (
          !cellData.rowData.editable ? (
            <Permissions
              type="disable"
              allowed={[PermissionValues.StartManageProductionCampaign]}
            >
              {({ authorized: canEditbatch }) => (
                <span
                  className={`edit-batch ${
                    canEditbatch ? '' : 'cursor-not-allowed text-light-100'
                  }`}
                  onClick={() =>
                    canEditbatch ? editModal(cellData.rowData) : null
                  }
                >
                  <Icon root="building" name="edit" exactSize="1.5rem" />
                </span>
              )}
            </Permissions>
          ) : (
            <div className="d-flex justify-content-end align-items-center">
              <span
                className="edit-save-batch"
                onClick={() => saveEditData(cellData.rowData)}
              >
                <Icon
                  // className="pr-6"
                  root="building"
                  name="check"
                  exactSize="1.5rem"
                />
              </span>
              <span
                className="edit-cancel-batch"
                onClick={() => cancelEditData(cellData.rowData)}
              >
                <Icon
                  className="mr-2 ml-2"
                  root="common"
                  name="close"
                  exactSize="0.875rem"
                />
              </span>
            </div>
          )
        ) : null}
        {cellData.rowData.editable ? null : cellData.rowData.activityId ||
          campaignType?.state === CampaignStateValues.Terminating ||
          campaignType?.state === CampaignStateValues.Terminated ||
          campaignType?.state === CampaignStateValues.Completed ||
          campaignType?.status === CampaignStatusValues.SubmitForApproval ||
          cellData.rowData.batchOrder !== lastItemIndex ||
          lastItemIndex === 1 ? (
          <i
            className={`icon-Delete font-size-16 mr-2 ml-2 visibility-hidden`}
          />
        ) : (
          <Permissions
            type="disable"
            allowed={[PermissionValues.StartManageProductionCampaign]}
          >
            {({ authorized: canDeletebatch }) => (
              <i
                className={`icon-Delete font-size-16 mr-2 ml-2 ${
                  canDeletebatch
                    ? 'cursor-pointer'
                    : 'cursor-not-allowed text-light-100'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (canDeletebatch) {
                    action('delete', cellData.rowData);
                  }
                }}
              />
            )}
          </Permissions>
        )}
      </div>
    );
  };
  const unitSelectionRenderer = (cellData) => {
    const unitText = unitSelectionTypeVals.find(
      (f) => f.value === isUnitSelectionDeferred
    )?.text;
    if (!isUnitSelectionDeferred) {
      return (
        <Popup
          element={
            <Button
              type="link"
              content={unitText}
              onClick={() => unitSelectionDisplay(cellData)}
            />
          }
          on="click"
        >
          {unitSelectionLoading ? (
            <div className="preselected-unit">
              <Loader />
            </div>
          ) : batchUnitSelections.length ? (
            <div className="preselected-unit">
              <table>
                <tr>
                  <td>Unit class</td>
                  <td>Unit</td>
                </tr>
                {batchUnitSelections.map((item: UnitSelection) => {
                  return (
                    <tr>
                      <td>{item.unitName}</td>
                      <td>{item.primaryUnit}</td>
                    </tr>
                  );
                })}
              </table>
            </div>
          ) : (
            <div className="preselected-unit py-8 px-4 d-flex justify-content-center align-items-center">
              <div className=" font-size-16 text-align-center">
                No records found
              </div>
            </div>
          )}
        </Popup>
      );
    }
    return <span>{unitText}</span>;
  };
  const editEstimatedQuantity = (cellData) => {
    if (
      cellData.rowData.editable &&
      !cellData.rowData.activityId &&
      campaignType?.state !== CampaignStateValues.Terminating
    ) {
      return (
        <Input
          type="number"
          min={0}
          step={0.01}
          className="xs-input"
          error={estimatedQuantityError}
          reserveSpace={false}
          value={estimatedQuantity?.toString()}
          onChange={(value) => {
            if (value.length > 0) {
              if (
                !isDecimal(value, {
                  decimal_digits: `0,${AppConstants.MAX_DECIMAL_DIGITS_ALLOWED}`,
                })
              ) {
                return;
              }
              if (+value < (campaignType?.minimumBatchSize || 0)) {
                setEstimatedQuantityError(
                  `Quantity can't be less than ${
                    campaignType?.minimumBatchSize || 0
                  }`
                );
              } else if (+value > (campaignType?.defaultBatchSize || 1)) {
                setEstimatedQuantityError(
                  `Quantity can't be more than ${
                    campaignType?.defaultBatchSize || 1
                  }`
                );
              } else {
                setEstimatedQuantityError('');
              }
              setEstimatedQuantity(+value);
            } else {
              setEstimatedQuantityError(`Please enter quantity`);
              setEstimatedQuantity(null);
            }
          }}
        />
      );
    }
    return <span>{cellData.value}</span>;
  };
  const editActualQuantity = (cellData) => {
    if (
      cellData.rowData.editable &&
      (cellData.rowData.isStatusUnknown ||
        (cellData.rowData.endTime &&
          campaignType?.state !== CampaignStateValues.Terminating))
    ) {
      return (
        <Input
          type="number"
          min={0}
          step={0.01}
          className="xs-input"
          value={actualQuantity?.toString()}
          onChange={(value) => {
            if (
              !isDecimal(value, {
                decimal_digits: `0,${AppConstants.MAX_DECIMAL_DIGITS_ALLOWED}`,
              })
            ) {
              return;
            }
            // if (!Number.isNaN(value)) {
            setActualQuantity(+value);
            // }
          }}
        />
      );
    }
    return <span>{cellData.value}</span>;
  };
  const editBatchState = (cellData) => {
    const stateDate = [
      { value: 'Complete', text: 'Complete' },
      { value: 'Aborted', text: 'Aborted' },
      { value: 'Stopped', text: 'Stopped' },
    ];
    if (cellData.rowData.editable && cellData.rowData.isStatusUnknown) {
      return (
        <>
          <Popup
            className="state-popup"
            // position="bottom left"
            // offset="0,0"
            open={openState}
            hideOnScroll
            hoverable
            // on="click"
            element={
              <div className="d-flex flex-column">
                <div
                  className="edit-state"
                  onClick={() => setOpenState(!openState)}
                  ref={stateRef}
                >
                  <span>{selectedState || 'Select state'}</span>
                  <Icon name="caret-down" root="common" exactSize=".6667rem" />
                </div>
                {selectedStateError && (
                  <div className="text-danger">{selectedStateError}</div>
                )}
              </div>
            }
          >
            {stateDate.map((item, index) => {
              return (
                <div
                  key={`state_item_${index}`}
                  className="state-popup-item"
                  onClick={() => {
                    setSelectedState(item.value);
                    setSelectedStateError('');
                    setOpenState(false);
                  }}
                >
                  <div className="state-popup-text">{item.text}</div>
                </div>
              );
            })}
          </Popup>
        </>
      );
    }
    return <span>{cellData.value}</span>;
  };
  const batchIdRenderer = (cellData) => {
    const lastItemIndex = data.length;
    return (
      <div className="d-flex">
        {batchAdded && cellData.rowData.batchOrder === lastItemIndex ? (
          <div className="mr-2" ref={newBatchInfoRef} />
        ) : (
          ''
        )}
        <Tooltip
          content={cellData.value}
          element={<span className="text-truncate">{cellData.value}</span>}
          position="top left"
          event="hover"
          hoverable
        />
      </div>
    );
  };
  const getColumnDefs = () => {
    const cols = [
      {
        field: 'batchId',
        header: (
          <HeaderWithToolTip
            contentOfToolTip="Campaign ID"
            element={<span>BATCH ID</span>}
          />
        ),
        align: 'left',
        initialWidth: '100px',
        sortable: true,
        renderer: batchIdRenderer,
      },
      {
        field: 'isUnitSelectionDeferred',
        header: 'UNIT SELECTION',
        align: 'center',
        initialWidth: '100px',
        sortable: true,
        renderer: unitSelectionRenderer,
      },
      {
        field: 'currentBatchSize',
        header: `Est Qty  (${campaignType?.batchSizeEngUnit})`,
        align: 'left',
        initialWidth: '80px',
        sortable: true,
        renderer: editEstimatedQuantity,
      },
      {
        field: 'batchYield',
        header: `Actual Qty`,
        align: 'left',
        initialWidth: '80px',
        sortable: true,
        renderer: editActualQuantity,
      },
      {
        field: 'state',
        header: 'STATE',
        align: 'left',
        initialWidth: '100px',
        renderer: editBatchState,
      },
      {
        field: 'startTime',
        header: 'START TIME',
        align: 'left',
        initialWidth: '130px',
        renderer: startTimeRenderer,
        sortable: true,
      },
      {
        field: 'endTime',
        header: 'END TIME',
        align: 'left',
        initialWidth: '130px',
        renderer: startTimeRenderer,
        sortable: true,
      },
      {
        field: 'action',
        header: '',
        align: 'Right',
        initialWidth: '80px',
        sortable: false,
        renderer: actionRenderer,
      },
    ] as ColumnProps[];
    // // if (!canManageCampaign) {
    //   return cols.filter((f) => f.field !== 'action');
    // }
    return cols;
  };
  const unitSelectionDisplay = (cellData) => {
    if (cellData.rowData.executionId !== null || undefined) {
      getSelectionUnit(cellData.rowData.id);
    }
  };
  const handleAddBatch = () => {
    setActionType('add_batch');
    addBatch();
    const lastPage = Math.trunc(data.length / 50);
    setActivePage(lastPage + 1);
    setLoadingData(true);
  };
  const applyBatchFilter = (
    stateData?: string[],
    minValue?: string,
    maxValue?: string,
    startTime?: Date | null,
    endTime?: Date | null
  ) => {
    let batchData: BatchDetails[] = data.map((entry) => Object.assign(entry));
    if (stateData?.length) {
      batchData = batchData.filter((item) =>
        stateData?.includes(item.state ? item.state.toLowerCase() : item.state)
      );
    }
    if (minValue) {
      batchData = batchData.filter((item) => {
        return item.batchYield >= parseInt(minValue);
      });
    }
    if (maxValue) {
      batchData = batchData.filter((item) => {
        return item.batchYield <= parseInt(maxValue);
      });
    }
    if (startTime) {
      batchData = batchData.filter((item) => {
        return item.startTime ? new Date(item.startTime) >= startTime : false;
      });
    }
    if (endTime) {
      batchData = batchData.filter((item) => {
        return item.endTime ? new Date(item.endTime) <= endTime : false;
      });
    }
    setFilterData(batchData);
  };

  const handlePageChange = (page, itemCount) => {
    setActivePage(page);
    setItemsPerPage(itemCount);
  };
  const columnDefs = getColumnDefs();
  return (
    <Card>
      <Card.Content
        style={{ background: '#272727' }}
        className="py-4 batch-datatable-grid"
      >
        <DataTable
          data={parseData()}
          loading={loading}
          resizableColumns
          scrollable
          scrollHeight="250px"
          rows={50}
          scrollWidth="100%"
          lazy
        >
          <DataTable.HeaderBar>
            {CampaignType.ContinuousCampaign === campaignType?.campaignType ||
            CampaignStatusValues.SubmitForApproval === campaignType?.status ||
            CampaignStateValues.Terminating === campaignType?.state ||
            CampaignStateValues.Terminated === campaignType?.state ||
            CampaignStateValues.Completed === campaignType?.state ? (
              ''
            ) : (
              <>
                {data.length >= 400 && (
                  <Tooltip
                    content={'No. of batches reached the limit 400'}
                    element={
                      <Icon
                        name="badge-info"
                        root="common"
                        className="px-2"
                        size="small"
                      />
                    }
                    position="bottom center"
                    event="hover"
                    hoverable
                  />
                )}
                <Permissions
                  type="disable"
                  allowed={[PermissionValues.StartManageProductionCampaign]}
                >
                  {({ authorized: canAddBatch }) => (
                    <Button
                      type="link"
                      content="Add Batch"
                      icon="slidercontrols-plus"
                      iconRoot="common"
                      loading={loadingData}
                      onClick={handleAddBatch}
                      disabled={
                        (campaignType?.campaignType ===
                          CampaignType.RawMaterialConsumption &&
                          excessRawMaterialQty <= 0) ||
                        data.length >= 400 ||
                        !canAddBatch ||
                        loadingData
                      }
                    />
                  )}
                </Permissions>
              </>
            )}
            <DataTableFilter applyBatchFilter={applyBatchFilter} />
            {campaignType?.state === CampaignStateValues.Running ||
            campaignType?.state === CampaignStateValues.Paused ||
            campaignType?.state === CampaignStateValues.Terminating ? (
              <DataTable.HeaderBar.Item
                content=""
                className="d-flex align-items-center"
                icon={<Icon name="refresh" root="common" size="small" />}
                onClick={onRefresh}
                disabled={
                  data.some((s) => s.editable) ||
                  campaignSummaryActionState === 'loading'
                }
              />
            ) : null}
          </DataTable.HeaderBar>
          {columnDefs.map((col) => (
            <DataTable.Column
              key={col.field}
              field={col.field}
              header={col.header}
              renderer={col.renderer}
              align={col.align}
              initialWidth={col.initialWidth}
              sortable={col.sortable}
            />
          ))}
          <DataTable.Pagination
            itemsPerPage={50}
            activePage={activePage}
            onPageChange={handlePageChange}
            totalItems={filterData.length}
            showDisplayDetails
            showNav
            expandEllipsis
          />
        </DataTable>
      </Card.Content>
    </Card>
  );
};
