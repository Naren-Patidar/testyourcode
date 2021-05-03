import React, { useEffect, useState } from 'react';
import { Icon, Checkbox, Table, Grid, Button, Modal } from '@scuf/common';
import { useDispatch, useSelector, connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import { FileImported } from 'app/importExport/models/importFile';
import {
  getFormulaSetsForExport,
  removeFormulaSets,
} from '+store/formula/actions/formulaSets';
import {
  getAcquireResponse,
  selectImportedFormula,
} from '+store/importExport/selector';
import { importSelected, releaseLock } from '+store/importExport/effects';
import './FormulaImport.scss';

const FormulaImport = (props: any) => {
  const {
    onClickExportFormula,
    clearSelectedItem,
    getSelectedImportItem,
  } = props;
  const [parentflag, setParentflag] = useState(false);
  const [parentflagPartial, setParentflagPartial] = useState(false);
  const [selectedcount, setSelectedcount] = useState(0);
  const [data, setData] = useState<any>([]);
  const [formulaSetData, setFormulaSetData] = useState<any>([]);
  const [normalData, setNormalData] = useState<any>([]);
  const [conflictData, setConflictData] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
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
  const lockData = useSelector(getAcquireResponse);
  const formulaSetData1 = useSelector(selectImportedFormula);

  const uniqueFormulaTitle = Array.from(
    new Set(formulaSetData1.map((item: any) => item.formulaSetTitle))
  );

  useEffect(() => {
    const tempFormData = [] as any;
    uniqueFormulaTitle.filter((item) => {
      const importObject = {} as any;
      importObject.formulaSetName = item;
      importObject.formulas = [];
      importObject.importOptions = [];

      const formArr = formulaSetData1.filter((formula) => {
        if (formula.formulaSetTitle === item) {
          if (!importObject.isConflicted) {
            importObject.isConflicted = formula.isConflicted;
          }
          importObject.id = formula.formulaSetId;
          if (importObject.importOptions.length === 0) {
            importObject.importOptions = formula.importOptions;
            importObject.validationResultString =
              formula.validationResultString;
          } else if (formula.importOptions.length > 1) {
            importObject.importOptions = formula.importOptions;
            importObject.validationResultString =
              formula.validationResultString;
          }
          const childObject = {} as any;
          childObject.formulaId = formula.id;
          childObject.formulaName = formula.title;
          childObject.importOptions = formula.importOptions;
          childObject.isConflicted = formula.isConflicted;
          childObject.validationResultString = formula.validationResultString;
          importObject.formulas.push(childObject);
          return childObject;
        }
        return false;
      });
      tempFormData.push(importObject);
      return item;
    });
    setFormulaSetData(tempFormData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formulaSetData1]);

  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      if (lockData.isLockAcquired) {
        dispatch(releaseLock());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (formulaSetData) {
      setData(formulaSetData);
    }
  }, [formulaSetData]);
  useEffect(() => {
    return () => {
      dispatch(removeFormulaSets());
    };
  }, [dispatch]);

  useEffect(() => {
    const resultData: any = [];
    if (!props.searchQuery) {
      setData(formulaSetData);
    } else if (formulaSetData) {
      const formulaArraylength = formulaSetData.length;
      for (let i = 0; i < formulaArraylength; i += 1) {
        const parentdata = formulaSetData[i];
        if (props.searchQuery) {
          if (
            parentdata.formulaSetName
              .toLowerCase()
              .indexOf(props.searchQuery.toLowerCase()) > -1
          ) {
            resultData.push(cloneDeep(parentdata));
          } else {
            const childdata = parentdata.formulas.filter(
              (child) =>
                child.formulaName
                  .toLowerCase()
                  .indexOf(props.searchQuery.toLowerCase()) > -1
            );
            if (childdata && childdata.length > 0) {
              const cloneparentdata = cloneDeep(parentdata);
              cloneparentdata.formulas = cloneDeep(childdata);
              cloneparentdata.noofformula = childdata.length;
              resultData.push(cloneparentdata);
            }
          }
        }
      }
      setData(resultData);
    }
  }, [props.searchQuery, formulaSetData]);

  useEffect(() => {
    if (props.formulaSetFilter === 'viewAll') {
      setData(formulaSetData);
    } else {
      const resultData: any = [];
      const formulaArraylength = formulaSetData.length;
      for (let i = 0; i < formulaArraylength; i += 1) {
        const parentdata = formulaSetData[i];
        if (parentdata.isFavorite) {
          resultData.push(cloneDeep(parentdata));
        } else {
          const childdata = parentdata.formulas.filter(
            (child) => child.isFavorite
          );
          if (childdata && childdata.length > 0) {
            const cloneparentdata = cloneDeep(parentdata);
            cloneparentdata.formulas = cloneDeep(childdata);
            cloneparentdata.noofformula = childdata.length;
            resultData.push(cloneparentdata);
          }
        }
      }
      setData(resultData);
    }
  }, [props.formulaSetFilter, formulaSetData]);

  const updateFormulaChildFlag = (index) => {
    const cloneobject = [...data];
    const formulaData = { ...cloneobject[index] };
    formulaData.childflag = !formulaData.childflag;
    cloneobject.splice(index, 1);
    cloneobject.splice(index, 0, formulaData);
    setData(cloneobject);
  };

  const showSelection = () => {
    const cloneobject = [...data];
    cloneobject.forEach((eachformula) => {
      if (eachformula.parentchecked || eachformula.partialchecked) {
        eachformula.childflag = true;
      }
    });
    setData(cloneobject);
  };

  const updateSuperParentFlag = (parentclone) => {
    let parentcheckedcount = 0;
    const parentclonelength = parentclone.length;
    let partialcheckedflag = false;
    let selectedCount = 0;
    for (let i = 0; i < parentclonelength; i += 1) {
      const indexparent = parentclone[i];
      if (indexparent.partialchecked) {
        partialcheckedflag = true;
        selectedCount += 1;
      } else if (indexparent.parentchecked) {
        parentcheckedcount += 1;
        selectedCount += 1;
      }
    }

    if (partialcheckedflag) {
      setParentflag(false);
      setParentflagPartial(true);
    } else if (parentcheckedcount === parentclone.length) {
      setParentflag(true);
      setParentflagPartial(false);
    } else if (parentcheckedcount === 0) {
      setParentflag(false);
      setParentflagPartial(false);
    } else {
      setParentflag(false);
      setParentflagPartial(true);
    }
    setSelectedcount(selectedCount);
  };

  const updateParent = (parentindex) => {
    const parentclone = [...data];
    const parentdata = parentclone[parentindex];
    parentdata.formulas.forEach((eachChildren) => {
      eachChildren.checked = !eachChildren.checked;
    });
    parentdata.parentchecked = !parentdata.parentchecked;
    parentclone.splice(parentindex, 1);
    parentclone.splice(parentindex, 0, parentdata);
    updateSuperParentFlag(parentclone);
    setData(parentclone);
  };

  const updateChildindex = (childindex, parentindex) => {
    const parentclone = [...data];
    const parentdata = parentclone[parentindex];
    const childData = { ...parentdata.formulas[childindex] };
    childData.checked = !childData.checked;
    parentdata.formulas.splice(childindex, 1);
    parentdata.formulas.splice(childindex, 0, childData);
    let childCheckedCount = 0;
    parentdata.formulas.forEach((eachchildcheck) => {
      if (eachchildcheck.checked) {
        childCheckedCount += 1;
      }
    });
    if (childCheckedCount === parentdata.formulas.length) {
      parentdata.parentchecked = true;
      parentdata.partialchecked = false;
    } else if (childCheckedCount === 0) {
      parentdata.parentchecked = false;
      parentdata.partialchecked = false;
    } else {
      parentdata.partialchecked = true;
      parentdata.parentchecked = false;
    }
    parentclone.splice(parentindex, 1);
    parentclone.splice(parentindex, 0, parentdata);
    updateSuperParentFlag(parentclone);
    setData(parentclone);
  };

  const updateAll = () => {
    const parentclone = [...data];
    parentclone.forEach((eachFormula) => {
      eachFormula.parentchecked = !parentflag;
      eachFormula.partialchecked = false;
      eachFormula.formulas.forEach((eachChildrean) => {
        eachChildrean.checked = !parentflag;
      });
    });
    setParentflag(!parentflag);
    setParentflagPartial(false);
    if (!parentflag) {
      setSelectedcount(parentclone.length);
    } else {
      setSelectedcount(0);
    }
    setData(parentclone);
  };

  const clearSelection = () => {
    const cloneobject = [...data];
    cloneobject.forEach((eachformula) => {
      if (eachformula.parentchecked || eachformula.partialchecked) {
        eachformula.childflag = true;
      }
      eachformula.parentchecked = false;
      eachformula.partialchecked = false;
      eachformula.childflag = false;
      eachformula.formulas.forEach((eachchildformula) => {
        eachchildformula.checked = false;
      });
    });
    setData(cloneobject);
    setParentflag(false);
    setParentflagPartial(false);
    setSelectedcount(0);
  };

  useEffect(() => {
    if (clearSelectedItem) {
      clearSelection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearSelectedItem]);

  const onClickCloseModal = () => {
    setOpenModal(false);
    setconflictDataImportAll(false);
    setconflictDataReplaceAll(false);
    setconflictDataSkipAll(false);
    setDisableHeaderButton(false);
  };

  const handleClickSelectedFormula = (importedData) => {
    const finalImportArray: FileImported[] = [];
    importedData.forEach((element) => {
      const newItem: FileImported = {
        id: element.id || '',
        fileName: element.fileName,
        fileAction: element.fileAction,
        formulaSetFileName: element.formulaSetName,
      };
      finalImportArray.push(newItem);
    });
    getSelectedImportItem(importedData.length);
    dispatch(
      importSelected({
        lockId: lockData.lockId,
        importedFileList: finalImportArray,
      })
    );
    clearSelection();
    // setOpenModal(false);
    onClickCloseModal();
  };

  const exportFormulaSet = () => {
    const importNormalArray: FileImported[] = [];
    const importConflictArray: FileImported[] = [];
    data.forEach((parentElement) => {
      if (parentElement.parentchecked || parentElement.partialchecked) {
        if (parentElement.parentchecked) {
          parentElement.formulas.forEach((eachChild) => {
            const childclone = {
              id: eachChild.formulaId,
              fileName: eachChild.formulaName,
              fileAction:
                eachChild.importOptions.length === 1
                  ? eachChild.importOptions[0]
                  : null,
              formulaSetName: parentElement.formulaSetName,
              importOptions: eachChild.importOptions,
              isConflicted: eachChild.isConflicted,
            };
            if (eachChild.isConflicted) {
              importConflictArray.push(childclone);
            } else {
              importNormalArray.push(childclone);
            }
          });
        } else {
          parentElement.formulas.forEach((eachChild) => {
            if (eachChild.checked) {
              const childclone = {
                id: eachChild.formulaId,
                fileName: eachChild.formulaName,
                fileAction:
                  eachChild.importOptions.length === 1
                    ? eachChild.importOptions[0]
                    : null,
                formulaSetName: parentElement.formulaSetName,
                importOptions: eachChild.importOptions,
                isConflicted: eachChild.isConflicted,
              };
              if (eachChild.isConflicted) {
                importConflictArray.push(childclone);
              } else {
                importNormalArray.push(childclone);
              }
            }
          });
        }
      }
    });
    setNormalData(importNormalArray);
    setConflictData(importConflictArray);
    if (importConflictArray.length > 0) {
      setOpenModal(true);
    } else {
      handleClickSelectedFormula(importNormalArray);
    }
  };

  const onClickImportAll = () => {
    const tempConflictData = [] as any;
    conflictData.forEach((formula) => {
      formula.conflictflagimportnew = true;
      if (formula.importOptions.indexOf(1) !== -1) {
        formula.fileAction = 1;
        tempConflictData.push(formula);
      }
    });
    const finalFormulaSetData = normalData.concat(tempConflictData);
    setNormalData(finalFormulaSetData);
    setconflictDataImportAll(true);
    // handleClickSelectedFormula(normalData);
  };

  const onClickReplaceAll = () => {
    const tempConflictData = [] as any;
    conflictData.forEach((formula) => {
      formula.conflictflagreplace = true;
      if (formula.importOptions.indexOf(2) !== -1) {
        formula.fileAction = 2;
        tempConflictData.push(formula);
      }
    });
    const finalFormulaSetData = normalData.concat(tempConflictData);
    setNormalData(finalFormulaSetData);
    setconflictDataReplaceAll(true);
    // handleClickSelectedFormula(normalData);
  };

  const onClickSkipAll = () => {
    conflictData.forEach((formula) => {
      formula.conflictflagskip = true;
    });
    setconflictDataSkipAll(true);
    // handleClickSelectedFormula(normalData);
  };

  const onClickSelectedImport = (conflictIndex) => {
    const tempObj = conflictData[conflictIndex];
    tempObj.fileAction = 1;
    const tempNormalData = [...normalData];
    tempNormalData.push(tempObj);
    const tempConflictData = [...conflictData];
    const clonedConflictedIndex = {
      ...tempConflictData[conflictIndex],
      conflictflagimportnew: true,
    };
    tempConflictData.splice(conflictIndex, 1, clonedConflictedIndex);
    setNormalData(tempNormalData);
    setConflictData(tempConflictData);
    setDisableHeaderButton(true);
  };

  const onClickSelectedReplace = (conflictIndex) => {
    const tempObj = conflictData[conflictIndex];
    tempObj.fileAction = 2;
    const tempNormalData = [...normalData];
    tempNormalData.push(tempObj);
    const tempConflictData = [...conflictData];
    const clonedConflictedIndex = {
      ...tempConflictData[conflictIndex],
      conflictflagreplace: true,
    };
    tempConflictData.splice(conflictIndex, 1, clonedConflictedIndex);
    setNormalData(tempNormalData);
    setConflictData(tempConflictData);
    setDisableHeaderButton(true);
  };

  const onClickSelectedSkip = (conflictIndex) => {
    const tempConflictData = [...conflictData];
    const clonedConflictedIndex = {
      ...tempConflictData[conflictIndex],
      conflictflagskip: true,
    };
    tempConflictData.splice(conflictIndex, 1, clonedConflictedIndex);
    setConflictData(tempConflictData);
    setDisableHeaderButton(true);
  };

  return (
    <>
      <Table>
        <Table.Header>
          <Table.HeaderCell style={{ width: '1px' }} content="">
            <Checkbox
              checked={parentflag}
              onChange={updateAll}
              indeterminate={parentflagPartial}
            />
          </Table.HeaderCell>
          <Table.HeaderCell
            style={{ width: '35%' }}
            content="Formula Set Name"
          />
          <Table.HeaderCell content="Number of Formula" />
          <Table.HeaderCell />
        </Table.Header>
        <Table.Body>
          {data.map((formuladata, parentindex) => {
            return (
              <>
                <Table.Row key={formuladata.id}>
                  <Checkbox
                    style={{
                      marginTop: '15px !important',
                      marginLeft: '15px !important',
                    }}
                    checked={formuladata.parentchecked}
                    onChange={() => updateParent(parentindex)}
                    indeterminate={formuladata.partialchecked}
                  />
                  <Table.Cell>{formuladata.formulaSetName}</Table.Cell>
                  <Table.Cell>
                    {formuladata.noofformula || formuladata.formulas.length}
                  </Table.Cell>
                  <Table.Cell>
                    {formuladata.isConflicted && !formuladata.childflag && (
                      <span className="error-message">Conflict</span>
                    )}
                    {'    '}
                    <Icon
                      root="common"
                      name={formuladata.childflag ? 'caret-up' : 'caret-down'}
                      onClick={() => updateFormulaChildFlag(parentindex)}
                      size="small"
                      className="float-right"
                    />{' '}
                  </Table.Cell>
                </Table.Row>
                {formuladata.childflag && (
                  <>
                    <Table.Row>
                      <Table.Cell />
                      <Table.Cell>Formula Name</Table.Cell>
                      <Table.Cell>IDENTIFICATION NO.</Table.Cell>
                      <Table.Cell />
                    </Table.Row>
                    {formuladata.formulas.map((childformula, childindex) => (
                      <Table.Row key={childformula.id}>
                        <Table.Cell />
                        <Table.Cell>
                          <Checkbox
                            style={{
                              marginTop: '15px !important',
                              marginLeft: '15px !important',
                            }}
                            checked={childformula.checked}
                            onChange={() =>
                              updateChildindex(childindex, parentindex)
                            }
                          />
                          {childformula.formulaName}
                        </Table.Cell>
                        <Table.Cell>{childformula.formulaId}</Table.Cell>
                        <Table.Cell>
                          {childformula.isConflicted && (
                            <span className="error-message">Conflict</span>
                          )}
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </>
                )}
              </>
            );
          })}
        </Table.Body>
      </Table>
      <Grid className="table-footer px-4">
        <Grid.Row className="align-items-center">
          <Grid.Column width={6} mOrder={5} sOrder={2}>
            <span>{selectedcount} formula sets selected</span>
            <span
              className="clear-all pl-3"
              onClick={showSelection}
              aria-hidden="true"
            >
              Show selection
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
              disabled={selectedcount === 0}
              onClick={exportFormulaSet}
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
              <Table.HeaderCell content="Formula" />
              <Table.HeaderCell content="Formula Set" />
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
                content="Replace all"
                className={
                  conflictDataReplaceAll ? 'conflict-text' : 'link-text'
                }
                onClick={() =>
                  !conflictDataImportAll &&
                  !conflictDataReplaceAll &&
                  !conflictDataSkipAll &&
                  !disableHeaderButton &&
                  onClickReplaceAll()
                }
              />
              <Table.HeaderCell
                content="Skip all"
                className={conflictDataSkipAll ? 'conflict-text' : 'link-text'}
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
                return (
                  <>
                    <Table.Row>
                      <Table.Cell>{conflictSet.fileName}</Table.Cell>
                      <Table.Cell>{conflictSet.formulaSetName}</Table.Cell>
                      <Table.Cell
                        className={
                          conflictSet.conflictflagimportnew
                            ? 'conflict-text'
                            : 'link-text'
                        }
                        onClick={() =>
                          !conflictDataImportAll &&
                          !conflictDataReplaceAll &&
                          !conflictDataSkipAll &&
                          !conflictSet.conflictflagimportnew &&
                          !conflictSet.conflictflagreplace &&
                          !conflictSet.conflictflagskip &&
                          onClickSelectedImport(conflictIndex)
                        }
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
                        onClick={() =>
                          !conflictDataImportAll &&
                          !conflictDataReplaceAll &&
                          !conflictDataSkipAll &&
                          !conflictSet.conflictflagimportnew &&
                          !conflictSet.conflictflagreplace &&
                          !conflictSet.conflictflagskip &&
                          onClickSelectedReplace(conflictIndex)
                        }
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
                        onClick={() =>
                          !conflictDataImportAll &&
                          !conflictDataReplaceAll &&
                          !conflictDataSkipAll &&
                          !conflictSet.conflictflagimportnew &&
                          !conflictSet.conflictflagreplace &&
                          !conflictSet.conflictflagskip &&
                          onClickSelectedSkip(conflictIndex)
                        }
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
            disabled={conflictData.some((formulaData) => {
              return (
                !formulaData.conflictflagimportnew &&
                !formulaData.conflictflagreplace &&
                !formulaData.conflictflagskip
              );
            })}
            onClick={() => handleClickSelectedFormula(normalData)}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FormulaImport;
