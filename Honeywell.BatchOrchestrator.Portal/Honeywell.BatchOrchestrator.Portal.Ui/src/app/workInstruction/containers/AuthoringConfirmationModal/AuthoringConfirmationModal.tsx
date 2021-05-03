import React from 'react';
import { Modal, Button } from '@scuf/common';
import { useDispatch } from 'react-redux';

import { toggleAuthoringScreen } from '+store/workInstruction/workInstrSlice';

const AuthoringConfirmationModal: React.FC<{ closeConfirmationModal }> = ({
  closeConfirmationModal,
}) => {
  const dispatch = useDispatch();
  const handleOkClick = () => {
    dispatch(toggleAuthoringScreen(false));
    closeConfirmationModal();
  };

  return (
    <div>
      <Modal
        className="delete-wi-modal"
        open
        closeIcon
        size="small"
        onClose={() => closeConfirmationModal()}
      >
        <Modal.Header>
          <h6>Confirmation</h6>
        </Modal.Header>
        <Modal.Content>
          Are you sure want to close the Work Instruction Authoring? <br />
          Note: All unsaved changes will be lost.
        </Modal.Content>
        <Modal.Footer>
          <Button
            type="secondary"
            size="medium"
            content="Cancel"
            onClick={() => closeConfirmationModal()}
          />
          <Button
            type="primary"
            size="medium"
            content="Ok"
            onClick={() => handleOkClick()}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AuthoringConfirmationModal;
