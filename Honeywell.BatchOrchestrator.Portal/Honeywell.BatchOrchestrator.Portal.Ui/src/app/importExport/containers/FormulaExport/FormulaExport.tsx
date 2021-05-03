import React, { useEffect, useState } from 'react';
import { Icon, Checkbox, Table, Grid, Button } from '@scuf/common';
import { useDispatch, useSelector, connect } from 'react-redux';
import { cloneDeep } from 'lodash';
import {
  getFormulaSetsForExport,
  removeFormulaSets,
} from '+store/formula/actions/formulaSets';

const FormulaExport = (props: any) => {
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
  const getFormulaSetData = useSelector(
    (state: any) => state.productCategory.formulaSetList
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFormulaSetsForExport());
  }, [dispatch]);
  useEffect(() => {
    if (getFormulaSetData) {
      setFormulaSetData(getFormulaSetData);
      setData(getFormulaSetData);
    }
  }, [getFormulaSetData]);
  useEffect(() => {
    return () => {
      dispatch(removeFormulaSets());
    };
  }, [dispatch]);

  useEffect(() => {
    const resultData: any = [];
    if (formulaSetData) {
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
          setData(resultData);
        } else {
          setData(formulaSetData);
        }
      }
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
    const tempRow = formulaSetData.map(
      (obj) => cloneobject.find((o) => o.id === obj.id) || obj
    );
    setFormulaSetData(tempRow);
  };

  const showSelection = () => {
    const cloneobject = [...data];
    cloneobject.forEach((eachformula) => {
      if (eachformula.parentchecked || eachformula.partialchecked) {
        eachformula.childflag = true;
      }
    });
    setData(cloneobject);
    const tempRow = formulaSetData.map(
      (obj) => cloneobject.find((o) => o.id === obj.id) || obj
    );
    setFormulaSetData(tempRow);
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

  useEffect(() => {
    updateSuperParentFlag(data);
  }, [data]);

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
    const tempRow = formulaSetData.map(
      (obj) => parentclone.find((o) => o.id === obj.id) || obj
    );
    setFormulaSetData(tempRow);
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
    const tempRow = formulaSetData.map(
      (obj) => parentclone.find((o) => o.id === obj.id) || obj
    );
    setFormulaSetData(tempRow);
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
    const tempRow = formulaSetData.map(
      (obj) => parentclone.find((o) => o.id === obj.id) || obj
    );
    setFormulaSetData(tempRow);
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
    const tempRow = formulaSetData.map(
      (obj) => cloneobject.find((o) => o.id === obj.id) || obj
    );
    setFormulaSetData(tempRow);
  };

  useEffect(() => {
    if (clearSelectedItem) {
      clearSelection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearSelectedItem]);

  const exportFormulaSet = () => {
    const dataExportResult: any = [];
    data.forEach((parentElement) => {
      if (parentElement.parentchecked || parentElement.partialchecked) {
        if (parentElement.parentchecked) {
          const childData: any = [];
          parentElement.formulas.forEach((eachChild) => {
            const childclone = {
              formulaId: eachChild.formulaId,
              formulaName: eachChild.formulaName,
            };
            childData.push(childclone);
          });
          const parentclone = {
            id: parentElement.id,
            formulaSetName: parentElement.formulaSetName,
            formulas: childData,
          };
          dataExportResult.push(parentclone);
        } else {
          const childData: any = [];
          parentElement.formulas.forEach((eachChild) => {
            if (eachChild.checked) {
              const childclone = {
                formulaId: eachChild.formulaId,
                formulaName: eachChild.formulaName,
              };
              childData.push(childclone);
            }
          });
          const parentclone = {
            id: parentElement.id,
            formulaSetName: parentElement.formulaSetName,
            formulas: childData,
          };
          dataExportResult.push(parentclone);
        }
      }
    });
    getSelectedImportItem(dataExportResult.length);
    onClickExportFormula(dataExportResult);
  };
  if (data) {
    props.setDataCount(data.length);
  }

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
                    {formuladata.noofformula}
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

export default FormulaExport;
