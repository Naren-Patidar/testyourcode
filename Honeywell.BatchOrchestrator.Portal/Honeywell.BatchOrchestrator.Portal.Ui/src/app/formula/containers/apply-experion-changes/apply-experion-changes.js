/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useState } from 'react';
import { AppRoutes } from 'routing';
import { DataTable } from '@scuf/datatable';
import './apply-experion-changes.scss';
// import { Button } from '@scuf/common';
import { useHistory, useLocation } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';
import {
  EXPERION_APPLY_CHANGES_INFO,
  EXPERION_APPLY_CHANGES_PAGE_DESC,
} from 'utils/constants/messages';
import { Button, Modal, Icon, Card, Tooltip } from '@scuf/common';
import '../../components/AlertPopup/MessageBox.scss';
// import {
//   BASE_ROUTE,
//   EXPERION_MODIFIED_PARAMETER_ROUTE,
// } from '../../../constants/routes';
import { useConfirm } from 'shared/confirm-dialog';
import {
  FORMULA,
  FORMULAS,
  IDENTIFICATION,
} from 'utils/constants/boterminology';
import { PAGE_SIZE } from 'utils/constants/enums';
import { PageDescription } from 'shared/page-description';
import { PageTitle } from 'shared/page-title';
import { withExperionModificationContext } from '../../controllers/experion-modification/experion-modification-context';
import AlertPopup from '../AlertPopup';

const ExperionModification = (props) => {
  const {
    formulaList,
    deleteFormulaSet,
    SaveSelectionForApplyChanges,
    getExperionModificationFormulaListByFormulaSetId,
    applyExperionModificationChanges,
  } = props;
  const confirm = useConfirm();
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedAll, setSelectedAll] = useState(false);
  const [applyChangesClicked, setApplyChangesClicked] = useState(false);
  const [messageBoxItem, setMessageBoxItem] = useState('');
  const [open, setOpen] = useState(false);
  const renderModal = () => {
    return (
      <Modal
        className="modal-Popup"
        size="small"
        closeIcon
        onClose={(e) => closeModal(e)}
        open={open}
        closeOnDimmerClick={false}
      >
        <Modal.Header className="modal-Popup-header">Alert</Modal.Header>
        <Modal.Content className="modal-Popup-content">
          {messageBoxItem}
        </Modal.Content>
        <Modal.Footer className="modal-Popup-footer">
          {/* <Button className="messageBoxCancel" type="secondary" size="medium" content="Cancel" onClick={(e) => closeModal(e)} /> */}
          <Button
            // className="messageBoxSubmit"
            type="primary"
            size="small"
            content="Ok"
            onClick={(e) => closeModal(e)}
          />
        </Modal.Footer>
      </Modal>
    );
  };
  const closeModal = (e) => {
    if (e.path == undefined) {
      setOpen(false);
    }
  };

  const history = useHistory();
  const location = useLocation();
  const { formulaSetId } = location.state;
  const { recipeName } = location.state.parameterObject;

  useEffect(() => {
    getExperionModificationFormulaListByFormulaSetId(formulaSetId).then(
      (res) => {
        if (res && res.status && res.status !== 200) {
          setMessageBoxItem(res.message);
          setOpen(!open);
        }
      }
    );
  }, []);

  useEffect(() => {
    const selectedFormula = [];
    formulaList.map((row) => {
      if (row.isSelectedforChg || row.isImpactedByChg) {
        selectedFormula.push(row);
      }
    });
    setSelectedRow(selectedFormula);
  }, [formulaList]);

  const onSelectAllFormulas = (e) => {
    setSelectedAll(e);
  };

  const onSelectionChange = (e) => {
    setSelectedRow(e);
  };

  const onSaveSelectionForApplyChanges = () => {
    const formulaList = [];
    if (selectedRow != null) {
      selectedRow.map((row) => formulaList.push(row.id));
    }

    if (formulaList.length === 0) {
      // alert('Please select formula.')
      setMessageBoxItem('Please select formula');
      setOpen(!open);
    } else {
      SaveSelectionForApplyChanges(formulaSetId, formulaList).then((res) => {
        if (res && res.status && res.status !== 200) {
          setMessageBoxItem(res.message);
          setOpen(!open);
        }
      });
      // alert('Selection of formulas successfully saved.')
      setMessageBoxItem('Selection of formulas successfully saved');

      setOpen(!open);
    }
  };

  const onBackClick = () => {
    return history.push({
      pathname: AppRoutes.EXPERION_MODIFIED_PARAMETER.path,
      state: {
        formulaSetId,
        recipeName,
        ProductTypName: recipeName,
      },
    });
  };

  const onApplyChanges = async () => {
    const formulaList = [];
    if (selectedRow != null) {
      selectedRow.map((row) => formulaList.push(row.id));
    }
    const parameterList = location.state.parameterObject;

    parameterList.selectedFormulaList = formulaList;
    const { confirmed } = await confirm.show({
      confirmText: 'Apply',
      message: 'Do you want to apply this changes?',
    });
    if (confirmed) {
      setApplyChangesClicked(true);
      applyExperionModificationChanges(formulaSetId, parameterList).then(
        (res) => {
          if (res && res.status && res.status !== 200) {
            setMessageBoxItem(res.message);
            setOpen(!open);
          }

          history.push(AppRoutes.DEFAULT.path);
        }
      );
    }
  };
  return (
    <div className="experion-container">
      {/* {renderModal()} */}
      <AlertPopup
        messageBoxItem={messageBoxItem}
        open={open}
        setOpen={setOpen}
      />
      <Card className="mt-0 bg-light-550-force">
        <Card.Content>
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column">
              <PageTitle content="Experion Modification" />
              <PageDescription content={EXPERION_APPLY_CHANGES_PAGE_DESC} />
            </div>
          </div>
          <div className="formula-set-table">
            <DataTable
              data={formulaList}
              resizableColumns
              scrollable
              selection={selectedRow}
              selectionMode="multiple"
              onSelectAll={(e) => onSelectAllFormulas(e)}
              onSelectionChange={(e) => onSelectionChange(e)}
            >
              <DataTable.Column
                field="name"
                header={`${FORMULA} name`}
                sortable
                initialWidth="12vw"
              />
              <DataTable.Column
                field="productId"
                header={`${IDENTIFICATION} `}
                sortable
                initialWidth="12vw"
              />
            </DataTable>
          </div>
        </Card.Content>
      </Card>

      <div className="d-flex justify-content-between mt-4">
        <Button
          // className="cancel"
          size="small"
          onClick={() => {
            history.push(AppRoutes.DEFAULT.path);
          }}
          content="Cancel"
          type="inline-secondary"
        />

        <div>
          <Button
            type="secondary"
            size="small"
            content="Back"
            onClick={onBackClick}
          />
          <Button
            type="secondary"
            size="small"
            content="Save Selection"
            onClick={onSaveSelectionForApplyChanges}
          />
          <Button
            type="primary"
            size="small"
            content="Apply Changes"
            onClick={onApplyChanges}
            disabled={applyChangesClicked}
          />
          <Tooltip
            content={EXPERION_APPLY_CHANGES_INFO}
            element={
              <Icon
                root="common"
                name="badge-info"
                size="medium"
                className="ml-4"
              />
            }
            hoverable
            position="left center"
          />
        </div>
      </div>
    </div>
  );
};

export default withExperionModificationContext(ExperionModification);
