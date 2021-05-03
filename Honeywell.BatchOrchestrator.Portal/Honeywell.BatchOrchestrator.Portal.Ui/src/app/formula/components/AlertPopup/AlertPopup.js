import React, { useState } from 'react';
import './MessageBox.scss';

import { Button, Modal } from '@scuf/common';

function AlertPopup(props) {
  const { messageBoxItem, open } = props;

  const closeModal = (e) => {
    props.setOpen(false);
  };
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
}

export default AlertPopup;
