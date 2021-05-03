import React, { useState } from 'react';
import { Modal } from '@scuf/common';
import { useDispatch, useSelector } from 'react-redux';
import { useConfirm } from 'shared/confirm-dialog';
import WIAuthoringCard from '../WIAuthoringCard/WIAuthoringCard';
import { toggleAuthoringScreen } from '+store/workInstruction/workInstrSlice';
import {
  selectIsAuthoringScreenCloseIconActive,
  selectIsAuthoringScreenActive,
  selectEwi,
} from '+store/workInstruction/selector';

import './WIAuthoring.scss';

const WIAuthoring: React.FC = () => {
  const confirm = useConfirm();
  const dispatch = useDispatch();
  const isAuthoringScreenCloseIconActive = useSelector(
    selectIsAuthoringScreenCloseIconActive
  );
  const isAuthoringScreenActive = useSelector(selectIsAuthoringScreenActive);
  const ewi = useSelector(selectEwi);
  const { showPreview } = ewi;

  const onClickCloseAuthoring = async () => {
    const { confirmed } = await confirm.show({
      message: `Are you sure want to close the Work Instruction Authoring?
                Note: All unsaved changes will be lost.`,
      confirmText: 'Ok',
    });
    if (confirmed) {
      dispatch(toggleAuthoringScreen(false));
    }
  };

  const closeAuthoringScreen = () => {
    if (showPreview) {
      dispatch(toggleAuthoringScreen(false));
    } else {
      onClickCloseAuthoring();
    }
  };

  return (
    <>
      <Modal
        className="wi-edit-modal medium"
        closeIcon={isAuthoringScreenCloseIconActive}
        open={isAuthoringScreenActive}
        closeOnDimmerClick={false}
        onClose={() => closeAuthoringScreen()}
        closeOnDocumentClick={false}
      >
        <Modal.Header className="modal-header">
          <h6>Work instruction</h6>
        </Modal.Header>
        <Modal.Content>
          <WIAuthoringCard />
        </Modal.Content>
      </Modal>
    </>
  );
};

export default WIAuthoring;
