import React from 'react';
import { Button, Modal } from '@scuf/common';

import './AlertPopup.scss';

const AlertPopup: React.FC<{
  messageBoxItem: string;
  open: boolean;
  setOpen: (e?) => void;
}> = ({ messageBoxItem, open, setOpen }) => {
  const closeModal = (e?) => {
    setOpen(false);
  };
  return (
    <Modal
      className="modal-Popup"
      closeIcon
      onClose={() => closeModal()}
      open={open}
      closeOnDimmerClick={false}
    >
      <Modal.Header className="modal-Popup-header">Alert</Modal.Header>
      <Modal.Content className="modal-Popup-content">
        {messageBoxItem}
      </Modal.Content>
      <Modal.Footer className="modal-Popup-footer">
        <Button
          className="messageBoxSubmit"
          type="primary"
          size="medium"
          content="Ok"
          onClick={(e) => closeModal(e)}
        />
      </Modal.Footer>
    </Modal>
  );
};

export default AlertPopup;
