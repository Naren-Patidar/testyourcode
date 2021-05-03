import React, { useState } from 'react';
import { Grid, Button, Modal } from '@scuf/common';
import {
  EWI_SAVE,
  EWI_PUBLISH,
  MIN_SUBTASK_MESSAGE,
} from 'utils/app-constants';
import { toLocalTimeStringFormatted } from 'utils/date-utils';
import { useDispatch, useSelector } from 'react-redux';
import { WorkInstrViewDef } from 'app/workInstruction/models';
import WIAuthoringActions from '../WIAuthoringActions/WIAuthoringActions';
import WIAuthoringContent from '../WIAuthoringContent/WIAuthoringContent';
import {
  selectEwi,
  selectAuthoringEwiId,
  selectLastEditedAt,
} from '+store/workInstruction/selector';

import {
  createWorkInstruction,
  submitWorkInstructionForApproval,
  updateWorkInstruction,
} from '+store/workInstruction/effects';

const WIAuthoringCard: React.FC = () => {
  const dispatch = useDispatch();
  const ewi = useSelector(selectEwi);
  const lastEditedAt: any = useSelector(selectLastEditedAt);
  const { showPreview } = ewi;
  const authoringEwiId = useSelector(selectAuthoringEwiId);
  const [isTitleInvalid, setIsTitleInvalid] = useState(false);
  const [taskErrorModal, setTaskErrorModal] = useState(false);
  const setInvalidTitle = (value: boolean) => {
    setIsTitleInvalid(value);
  };

  const disableSaveButton = () => {
    let disableSave = false;
    if (
      ewi.ewi_title === '' ||
      !ewi.view_content ||
      ewi.view_content.length === 0 ||
      isTitleInvalid
    ) {
      disableSave = true;
    }
    return disableSave;
  };

  const saveEwi = (mode: string) => {
    const workInstr: WorkInstrViewDef = {
      viewDefinition: JSON.stringify(ewi),
    };
    if (authoringEwiId !== '') {
      workInstr.id = authoringEwiId;
    }
    if (mode === EWI_PUBLISH) {
      let showAlert = false;
      if (ewi.view_content.length !== 0) {
        for (let i = 0; i < ewi.view_content.length; i += 1) {
          if (ewi.view_content[i].components.length === 0) {
            showAlert = true;
            break;
          }
        }
      }
      if (showAlert) {
        setTaskErrorModal(true);
      } else {
        dispatch(submitWorkInstructionForApproval(workInstr));
      }
    } else if (authoringEwiId !== '' && ewi.ewi_id !== '') {
      dispatch(updateWorkInstruction(workInstr));
    } else {
      dispatch(createWorkInstruction(workInstr));
    }
  };
  return (
    <>
      <Grid className="m-0">
        <Grid.Row>
          <Grid.Column width={8}>
            <WIAuthoringContent
              setInvalidTitle={setInvalidTitle}
              showPreview={showPreview}
            />
          </Grid.Column>
          <Grid.Column width={4}>
            <WIAuthoringActions showPreview={showPreview} />
            {!showPreview && (
              <div className="footer-action-btns">
                <Button
                  disabled={disableSaveButton()}
                  className="rounded w-100 mb-3"
                  type="secondary"
                  onClick={() => saveEwi(EWI_SAVE)}
                  content="Save draft"
                />
                <div className="clearfix" />
                <Button
                  disabled={disableSaveButton()}
                  className="rounded w-100"
                  type="primary"
                  onClick={() => saveEwi(EWI_PUBLISH)}
                  content="Send for approval"
                />
              </div>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <div className="last-edited">
        <small>
          {lastEditedAt !== '' && (
            <span>Last Edited: {toLocalTimeStringFormatted(lastEditedAt)}</span>
          )}
        </small>
      </div>
      <Modal size="mini" open={taskErrorModal}>
        <Modal.Header>Alert</Modal.Header>
        <Modal.Content>{MIN_SUBTASK_MESSAGE}</Modal.Content>
        <Modal.Footer>
          <Button content="Ok" onClick={() => setTaskErrorModal(false)} />
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default WIAuthoringCard;
