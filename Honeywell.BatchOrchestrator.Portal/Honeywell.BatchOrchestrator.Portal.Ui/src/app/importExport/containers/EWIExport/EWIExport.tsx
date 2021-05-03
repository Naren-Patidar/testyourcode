import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Button } from '@scuf/common';
import { DataTable } from '@scuf/datatable';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/@reduxjs';
import { EWI_STATUS } from 'utils';
import { sliceKey, reducer } from '+store/workInstruction/workInstrSlice';
import { getWorkInstructions } from '+store/workInstruction/effects';
import { selectWIs } from '+store/workInstruction/selector';

const EWIExport = (props) => {
  const {
    searchQuery,
    getStatusData,
    statusFilter,
    onClickExportSelected,
    getSelectedEWI,
    getTagsData,
    tagsFilter,
    clearSelectedItem,
    getSelectedImportItem,
  } = props;
  useInjectReducer({ key: sliceKey, reducer });
  const [selectedRow, setSeletedRow] = useState<any>(null);
  const ewiList = useSelector(selectWIs);
  const dispatch = useDispatch();

  let filteredEWIList = ewiList;
  filteredEWIList = filteredEWIList.filter((e) => !e.isModified);
  if (statusFilter && statusFilter !== undefined) {
    filteredEWIList = filteredEWIList.filter((item) => {
      return item.status === statusFilter;
    });
  }

  if (tagsFilter) {
    filteredEWIList = filteredEWIList.filter((item) => {
      const tagsArr = JSON.parse(`${item.tags}`);
      return tagsArr.includes(tagsFilter);
    });
  }
  if (filteredEWIList) {
    props.setDataCount(filteredEWIList.length);
  }

  useEffect(() => {
    const tagsArray = [] as any;
    ewiList.map((item) => {
      const { tags } = item;
      tagsArray.push(...JSON.parse(`${tags}`));
      return item.tags;
    });
    const uniqueTagArray = Array.from(new Set(tagsArray.map((item) => item)));
    getTagsData(uniqueTagArray);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ewiList]);

  useEffect(() => {
    const ewisForStatus = ewiList.filter((e) => !e.isModified);
    const uniqueStatus = Array.from(
      new Set(ewisForStatus.map((item: any) => item.status))
    );
    getStatusData(uniqueStatus.sort());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ewiList]);

  useEffect(() => {
    getSelectedImportItem(selectedRow?.length);
    getSelectedEWI(selectedRow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRow]);

  useEffect(() => {
    dispatch(
      getWorkInstructions({
        description: '',
        isDefaultSearch: false,
        searchQuery: '',
        title: '',
        workInstrId: 0,
      })
    );
  }, [dispatch]);

  if (searchQuery && searchQuery.length > 0) {
    filteredEWIList = filteredEWIList.filter(
      (eachewi) =>
        eachewi.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1 ||
        eachewi.description.toLowerCase().indexOf(searchQuery.toLowerCase()) >
          -1
    );
  }

  const clearSelection = () => {
    setSeletedRow(null);
  };

  useEffect(() => {
    if (clearSelectedItem) {
      clearSelection();
    }
  }, [clearSelectedItem]);

  return (
    <>
      <DataTable
        data={filteredEWIList}
        selection={selectedRow}
        selectionMode="multiple"
        scrollable
        scrollHeight="65vh"
        onSelectionChange={(e) => setSeletedRow(e)}
        className="pb-2"
      >
        <DataTable.Column field="title" header="Title" />
        <DataTable.Column field="description" header="Description" />
      </DataTable>
      <Grid className="table-footer px-4">
        <Grid.Row className="align-items-center">
          <Grid.Column width={6} mOrder={5} sOrder={2}>
            <span>
              {selectedRow ? selectedRow.length : 0} Work instructions selected
            </span>
            {/* <span className="clear-all pl-3" aria-hidden="true">
              Show selection
            </span> */}
            <span
              className="clear-all pl-3"
              onClick={clearSelection}
              aria-hidden="true"
            >
              Clear selection
            </span>
          </Grid.Column>
          <Grid.Column
            width={6}
            mOrder={5}
            sOrder={2}
            className="justify-content-end"
          >
            <Button
              type="primary"
              className="pl-3"
              onClick={onClickExportSelected}
              disabled={!selectedRow || selectedRow.length === 0}
              content="Export Selected"
            />
            <Button
              type="secondary"
              content="Cancel"
              onClick={clearSelection}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
};

export default EWIExport;
