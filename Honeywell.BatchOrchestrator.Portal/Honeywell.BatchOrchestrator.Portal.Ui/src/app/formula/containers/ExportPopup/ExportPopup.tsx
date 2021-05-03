import React, { useState } from 'react';
import { Button, Modal, Input, Icon } from '@scuf/common';
import { useSelector } from 'react-redux';
import { getAcquireResponse } from '+store/importExport/selector';
import './ExportPopup.scss';

function ExportPopup(props) {
  const {
    open,
    fileName,
    onChangeFileName,
    encryptionKey,
    onChangeKey,
    reEnterKey,
    onChangeReEnterKey,
    onClickEncrypt,
    error,
    fileNameError,
    showExport,
    showProgress,
    onClickCancel,
    onClickOk,
    onClickCloseModal,
  } = props;
  const lockData = useSelector(getAcquireResponse);
  return (
    <div>
      <Modal
        className="export-encrypt-modal"
        size="mini"
        closeIcon
        onClose={onClickCloseModal}
        open={open}
      >
        <Modal.Header>
          <h6>Encrypt Export Data</h6>
        </Modal.Header>
        <Modal.Content>
          <div>
            <Input
              label="Filename(default)"
              value={fileName}
              placeholder="Production_package"
              onChange={(value) => onChangeFileName(value)}
              error={fileNameError}
            />
          </div>
          <div className="pt-4">
            <Input
              type="password"
              label="Create encryption key"
              placeholder="Please enter key"
              value={encryptionKey}
              onChange={(value) => onChangeKey(value)}
            />
          </div>
          <div className="pt-4">
            <Input
              type="password"
              label="Re-enter encryption key"
              placeholder="Please enter key"
              value={reEnterKey}
              onChange={(value) => onChangeReEnterKey(value)}
              error={error}
            />
          </div>
          <em>Note: Minimum 8 characters</em>
        </Modal.Content>
        <Modal.Footer>
          <Button type="primary" content="Encrypt" onClick={onClickEncrypt} />
        </Modal.Footer>
      </Modal>
      <Modal className="export-encrypt-modal" size="small" open={showExport}>
        <Modal.Header>
          <h6 className="mb-0">Export</h6>
        </Modal.Header>
        <Modal.Content>
          <div className="d-flex">
            <div>
              <Icon
                name="document-standard"
                root="common"
                size="medium"
                color="blue"
              />
            </div>
            <div className="pl-2">
              {showProgress ? (
                <p className="d-block m-0">Completed</p>
              ) : (
                <p className="d-block m-0">In progress</p>
              )}
              <span className="d-block filename">
                File name: {fileName || 'Production_package'}
              </span>
              {!showProgress && (
                <em>Note: Do not close window until export is complete.</em>
              )}
            </div>
          </div>
        </Modal.Content>
        <Modal.Footer>
          {!showProgress && (
            <Button type="secondary" content="Cancel" onClick={onClickCancel} />
          )}
          <Button
            type="primary"
            content="Ok"
            onClick={onClickOk}
            disabled={!showProgress}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ExportPopup;
