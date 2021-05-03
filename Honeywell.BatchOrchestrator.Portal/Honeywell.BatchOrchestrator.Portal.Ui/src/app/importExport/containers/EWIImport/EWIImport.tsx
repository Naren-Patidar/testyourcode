import React, { useEffect, useState } from 'react';
import { Grid, Button, Modal, Table } from '@scuf/common';
import { DataTable } from '@scuf/datatable';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectImportedEwi,
  getAcquireResponse,
} from '+store/importExport/selector';
import { importSelected, releaseLock } from '+store/importExport/effects';
import { FileImported } from '../../models/importFile';
import '../FormulaImport/FormulaImport.scss';
import '../ImportExport.scss';

const EwiImport: React.FC<{
  searchQuery: string;
  getSelectedImportItem: (selectedItemCount: number) => void;
}> = ({ searchQuery, getSelectedImportItem }) => {
  const [selectedRow, setSeletedRow] = useState<any>(null);
  const [selectAll, setSelectAll] = useState(false);
  const [normalData, setNormalData] = useState<any>([]);
  const [conflictData, setConflictData] = useState<any>([]);
  const [dataForImport, setDataForImport] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const [disableImportButton, setDisableIportButton] = useState(false);
  const [data, setData] = useState<any>([]);
  const [initialData, setInitialData] = useState<any>([]);
  const importedEwi = useSelector(selectImportedEwi);
  const [conflictDataImportAll, setconflictDataImportAll] = useState<boolean>(
    false
  );
  const [conflictDataReplaceAll, setconflictDataReplaceAll] = useState<boolean>(
    false
  );
  const [conflictDataSkipAll, setconflictDataSkipAll] = useState<boolean>(
    false
  );
  const [disableHeaderButton, setDisableHeaderButton] = useState(false);
  // const importedData: FileImported[] = [];
  const lockData = useSelector(getAcquireResponse);
  const dispatch = useDispatch();
  const clearSelection = () => {
    setSeletedRow(null);
  };
  const handleClickSelectedEwi = (importData) => {
    const array: FileImported[] = [];
    importData.forEach((element) => {
      const newItem: FileImported = {
        id: element.id || '',
        fileName: element.title,
        fileAction: element.fileAction,
        formulaSetFileName: '',
      };
      array.push(newItem);
    });
    // setDisableIportButton(true);
    getSelectedImportItem(importData.length);
    dispatch(
      importSelected({
        lockId: lockData.lockId,
        importedFileList: array,
        // importedFileList: importData,
      })
    );
  };

  useEffect(() => {
    return () => {
      if (lockData.isLockAcquired) {
        dispatch(releaseLock());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (importedEwi) {
      // console.log('ImportedEWI is: ', importedEwi);
      const importNormalArray: FileImported[] = [];
      const importConflictArray: FileImported[] = [];
      const importedData: FileImported[] = [];
      importedEwi.forEach((element) => {
        const newItem: FileImported = {
          id: element.id,
          title: element.title,
          description: element.description,
          fileName: element.title,
          fileAction:
            element.importOptions.length === 1
              ? element.importOptions[0]
              : null,
          conflict: element.isConflicted ? 'CONFLICT' : '',
          isConflicted: element.isConflicted,
          importOptions: element.importOptions,
        };
        if (element.isConflicted) {
          importConflictArray.push(newItem);
        } else {
          importNormalArray.push(newItem);
        }
        // newItem.title = element.title;
        importedData.push(newItem);
      });
      // setNormalData(importNormalArray);
      // setConflictData(importConflictArray);
      setInitialData(importedData);
      setData(importedData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [importedEwi]);

  useEffect(() => {
    if (searchQuery && searchQuery.length > 0) {
      const serachData = initialData.filter(
        (eachewi) =>
          eachewi.title.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1 ||
          eachewi.description.toLowerCase().indexOf(searchQuery.toLowerCase()) >
            -1
      );
      setData(serachData);
    } else {
      setData(initialData);
    }
  }, [searchQuery, initialData]);

  const onClickImported = () => {
    // setDisableIportButton(false);
    const importNormalArray: FileImported[] = [];
    const importConflictArray: FileImported[] = [];
    selectedRow.forEach((element) => {
      // console.log('Element is: ', element);
      const newItem: FileImported = {
        id: element.id,
        title: element.title,
        description: element.description,
        fileName: element.title,
        fileAction: element.fileAction,
        conflict: element.conflict,
        isConflicted: element.isConflicted,
        importOptions: element.importOptions,
      };
      if (element.isConflicted) {
        importConflictArray.push(newItem);
      } else {
        importNormalArray.push(newItem);
      }
    });
    setDataForImport(importNormalArray);
    setNormalData(importNormalArray);
    setConflictData(importConflictArray);
    if (importConflictArray.length > 0) {
      setOpenModal(true);
    } else {
      handleClickSelectedEwi(importNormalArray);
    }
  };

  const onClickImportAll = () => {
    const tempConflictData = [] as any;
    const tempSelectedRow = [...selectedRow];
    // console.log('TempSelectedRow is: ', tempSelectedRow);
    // console.log('SelectedRow is: ', selectedRow);
    conflictData.forEach((formula) => {
      // console.log('Formula is: ', formula);
      // console.log('TempRowLength is: ', tempSelectedRow.length);
      formula.conflictflagimportnew = true;
      if (formula.importOptions.indexOf(1) !== -1) {
        formula.fileAction = 1;
        tempConflictData.push(formula);
      } else {
        const temp = tempSelectedRow.find((item) => item.id === formula.id);
        // console.log('Temp is: ', temp);
        const conflictIndex = tempSelectedRow.indexOf(temp);
        // console.log('ConflictIndex is: ', conflictIndex);
        if (conflictIndex !== -1) {
          tempSelectedRow.splice(conflictIndex, 1);
        }
      }
    });

    const tempRow = tempSelectedRow.map(
      (obj) => tempConflictData.find((o) => o.id === obj.id) || obj
    );
    // console.log('TempRow is: ', tempRow);
    // console.log('SelectedRow is: ', selectedRow);
    setconflictDataImportAll(true);
    setDataForImport(tempRow);
    // handleClickSelectedEwi(tempRow);
  };

  const onClickReplaceAll = () => {
    const tempConflictData = [] as any;
    const tempSelectedRow = [...selectedRow];
    conflictData.forEach((formula) => {
      formula.conflictflagreplace = true;
      if (formula.importOptions.indexOf(2) !== -1) {
        formula.fileAction = 2;
        tempConflictData.push(formula);
      } else {
        const temp = tempSelectedRow.find((item) => item.id === formula.id);
        const conflictIndex = tempSelectedRow.indexOf(temp);
        tempSelectedRow.splice(conflictIndex, 1);
      }
    });

    const tempRow = tempSelectedRow.map(
      (obj) => tempConflictData.find((o) => o.id === obj.id) || obj
    );
    // const finalFormulaSetData = selectedRow.push(...tempConflictData);
    // setNormalData(finalFormulaSetData);
    setconflictDataReplaceAll(true);
    setDataForImport(tempRow);
    // handleClickSelectedEwi(tempRow);
  };

  const onClickSkipAll = () => {
    for (let i = 0; i < selectedRow.length; i += 1) {
      const item = selectedRow[i];
      for (let j = 0; j < conflictData.length; j += 1) {
        const obj = conflictData[j];
        obj.conflictflagskip = true;
        if (obj.id === item.id && obj.conflictflagskip) {
          selectedRow.splice(i, 1);
          i -= 1;
        }
      }
    }
    setconflictDataSkipAll(true);
    setDataForImport(selectedRow);
    // handleClickSelectedEwi(selectedRow);
  };

  const onClickSelectedImport = (conflictId, itemIndex) => {
    const temp = selectedRow.find((item) => item.id === conflictId);
    const conflictIndex = selectedRow.indexOf(temp);
    temp.fileAction = 1;
    selectedRow.splice(conflictIndex, 1, temp);
    // const tempObj = conflictData[conflictIndex];
    // tempObj.fileAction = 1;
    // const tempNormalData = [...selectedRow];
    // tempNormalData.push(tempObj);
    const tempConflictData = [...conflictData];
    const clonedConflictedIndex = {
      ...tempConflictData[itemIndex],
      conflictflagimportnew: true,
    };
    tempConflictData.splice(itemIndex, 1, clonedConflictedIndex);
    // setNormalData(tempNormalData);
    setConflictData(tempConflictData);
    setDataForImport(selectedRow);
    setDisableHeaderButton(true);
  };

  const onClickSelectedReplace = (conflictId, itemIndex) => {
    const temp = selectedRow.find((item) => item.id === conflictId);
    const conflictIndex = selectedRow.indexOf(temp);
    temp.fileAction = 2;
    selectedRow.splice(conflictIndex, 1, temp);

    // const tempObj = conflictData[conflictIndex];
    // tempObj.fileAction = 2;
    // const tempNormalData = [...selectedRow];
    // tempNormalData.push(tempObj);
    const tempConflictData = [...conflictData];
    const clonedConflictedIndex = {
      ...tempConflictData[itemIndex],
      conflictflagreplace: true,
    };
    tempConflictData.splice(itemIndex, 1, clonedConflictedIndex);
    // setNormalData(tempNormalData);
    setConflictData(tempConflictData);
    setDataForImport(selectedRow);
    setDisableHeaderButton(true);
  };

  const onClickSelectedSkip = (conflictId, itemIndex) => {
    const temp = selectedRow.find((item) => item.id === conflictId);
    const conflictIndex = selectedRow.indexOf(temp);
    // temp.fileAction = 2;
    selectedRow.splice(conflictIndex, 1);

    const tempConflictData = [...conflictData];
    const clonedConflictedIndex = {
      ...tempConflictData[itemIndex],
      conflictflagskip: true,
    };
    tempConflictData.splice(itemIndex, 1, clonedConflictedIndex);
    setConflictData(tempConflictData);
    setDataForImport(selectedRow);
    setDisableHeaderButton(true);
  };
  const onClickCloseModal = () => {
    if (conflictDataSkipAll) {
      clearSelection();
    }
    setOpenModal(false);
    setconflictDataImportAll(false);
    setconflictDataReplaceAll(false);
    setconflictDataSkipAll(false);
    setDisableHeaderButton(false);
  };
  return (
    <>
      <DataTable
        data={data}
        selection={selectedRow}
        selectionMode="multiple"
        scrollable
        scrollHeight="65vh"
        onSelectionChange={(e) => setSeletedRow(e)}
        isSelectAllChecked={selectAll}
      >
        <DataTable.Column field="title" header="Title" />
        <DataTable.Column field="description" header="Description" />
        <DataTable.Column
          field="conflict"
          className="error-message"
          header=""
        />
      </DataTable>
      <Grid className="table-footer px-4">
        <Grid.Row className="align-items-center">
          <Grid.Column width={6} mOrder={5} sOrder={2}>
            <span>
              {selectedRow ? selectedRow.length : 0} Work instructions selected
            </span>
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
              disabled={!selectedRow || selectedRow.length === 0}
              onClick={() => onClickImported()}
              content="Import Selected"
            />
            <Button
              type="secondary"
              content="Cancel"
              onClick={clearSelection}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Modal
        open={openModal}
        size="large"
        closeIcon
        onClose={onClickCloseModal}
        className="resolve-conflict"
      >
        <Modal.Header>
          <h6>Resolve Conflicts</h6>
        </Modal.Header>
        <Modal.Content>
          <Table>
            <Table.Header>
              <Table.HeaderCell content="Title" />
              <Table.HeaderCell content="Description" />
              <Table.HeaderCell
                className={
                  conflictDataImportAll ? 'conflict-text' : 'link-text'
                }
                content="Import all as new"
                onClick={() =>
                  !conflictDataImportAll &&
                  !conflictDataReplaceAll &&
                  !conflictDataSkipAll &&
                  !disableHeaderButton &&
                  onClickImportAll()
                }
              />
              <Table.HeaderCell
                className={
                  conflictDataReplaceAll ? 'conflict-text' : 'link-text'
                }
                content="Replace all"
                onClick={() =>
                  !conflictDataImportAll &&
                  !conflictDataReplaceAll &&
                  !conflictDataSkipAll &&
                  !disableHeaderButton &&
                  onClickReplaceAll()
                }
              />
              <Table.HeaderCell
                className={conflictDataSkipAll ? 'conflict-text' : 'link-text'}
                content="Skip all"
                onClick={() =>
                  !conflictDataImportAll &&
                  !conflictDataReplaceAll &&
                  !conflictDataSkipAll &&
                  !disableHeaderButton &&
                  onClickSkipAll()
                }
              />
            </Table.Header>
            <Table.Body>
              {conflictData.map((conflictSet, conflictIndex) => {
                // console.log('ConflictSet is: ', conflictSet);
                return (
                  <>
                    <Table.Row>
                      <Table.Cell>{conflictSet.title}</Table.Cell>
                      <Table.Cell>{conflictSet.description}</Table.Cell>
                      <Table.Cell
                        className={
                          conflictSet.conflictflagimportnew
                            ? 'conflict-text'
                            : 'link-text'
                        }
                        onClick={() => {
                          if (
                            !conflictDataImportAll &&
                            !conflictDataReplaceAll &&
                            !conflictDataSkipAll &&
                            !conflictSet.conflictflagimportnew &&
                            !conflictSet.conflictflagreplace &&
                            !conflictSet.conflictflagskip
                          ) {
                            onClickSelectedImport(
                              conflictSet.id,
                              conflictIndex
                            );
                          }
                        }}
                      >
                        {conflictSet.importOptions.indexOf(1) !== -1
                          ? 'Import as new'
                          : ''}
                      </Table.Cell>
                      <Table.Cell
                        className={
                          conflictSet.conflictflagreplace
                            ? 'conflict-text'
                            : 'link-text'
                        }
                        onClick={() => {
                          if (
                            !conflictDataImportAll &&
                            !conflictDataReplaceAll &&
                            !conflictDataSkipAll &&
                            !conflictSet.conflictflagimportnew &&
                            !conflictSet.conflictflagreplace &&
                            !conflictSet.conflictflagskip
                          ) {
                            onClickSelectedReplace(
                              conflictSet.id,
                              conflictIndex
                            );
                          }
                        }}
                      >
                        {conflictSet.importOptions.indexOf(2) !== -1
                          ? 'Replace'
                          : ''}
                      </Table.Cell>
                      <Table.Cell
                        className={
                          conflictSet.conflictflagskip
                            ? 'conflict-text'
                            : 'link-text'
                        }
                        onClick={() => {
                          if (
                            !conflictDataImportAll &&
                            !conflictDataReplaceAll &&
                            !conflictDataSkipAll &&
                            !conflictSet.conflictflagimportnew &&
                            !conflictSet.conflictflagreplace &&
                            !conflictSet.conflictflagskip
                          ) {
                            onClickSelectedSkip(conflictSet.id, conflictIndex);
                          }
                        }}
                      >
                        Skip import
                      </Table.Cell>
                    </Table.Row>
                  </>
                );
              })}
            </Table.Body>
          </Table>
        </Modal.Content>
        <Modal.Footer>
          <Button
            type="primary"
            content="Import"
            disabled={conflictData.some((ewidata) => {
              // console.log('ewiData is: ', ewidata);
              return (
                !ewidata.conflictflagimportnew &&
                !ewidata.conflictflagreplace &&
                !ewidata.conflictflagskip
              );
            })}
            onClick={() => handleClickSelectedEwi(dataForImport)}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default EwiImport;
