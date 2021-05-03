import React, { useState } from 'react';
// import '../Stylesheets/MessageBox.css'
import '../stylesheets/MessageBox.scss';
import { Icon, Button, Modal } from '@scuf/common';
import { useHistory } from 'react-router-dom';
// import { BASE_ROUTE } from '../../../utils/constants/routes';

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
