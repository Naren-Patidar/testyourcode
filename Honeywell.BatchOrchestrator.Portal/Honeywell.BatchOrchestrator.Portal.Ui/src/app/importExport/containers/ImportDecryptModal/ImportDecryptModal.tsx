import React, { useState, useEffect } from 'react';
import { Button, Input, InputLabel, Modal, List, Radio } from '@scuf/common';
import { useDispatch, useSelector } from 'react-redux';
import { ExportData } from '../../models/exportData';
import { acquireLock, importPackage } from '+store/importExport/effects';
import { getAcquireResponse } from '+store/importExport/selector';
import './ImportDecryptModal.scss';

const DecryptionKeyModal: React.FC<{
  open: boolean;
  closeModal?: any;
  importFile?: any;
}> = ({ open, closeModal, importFile }) => {
  const [decryptKey, setDecryptKey] = useState('');
  const dispatch = useDispatch();
  const lockData = useSelector(getAcquireResponse);
  useEffect(() => {
    if (lockData.isLockAcquired && lockData.lockId && decryptKey) {
      const reader = new FileReader();
      reader.readAsDataURL(importFile);
      reader.onload = () => {
        const fileExt = importFile.name.split('.').pop();
        const arr = importFile.name.split('.');
        const filename = arr[0];
        dispatch(
          importPackage({
            lockId: lockData.lockId,
            fileName: filename,
            fileExtension: fileExt,
            data: reader.result,
            encryptionKey: decryptKey,
          })
        );
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lockData]);
  const handleChangeDecryptKey = (value: string) => {
    setDecryptKey(value);
  };
  const handleClickImportFile = () => {
    dispatch(acquireLock());
  };

  return (
    <>
      <Modal
        className="impexp-modal"
        closeIcon
        open={open}
        size="mini"
        onClose={() => closeModal()}
      >
        <Modal.Header>
          <h6 className="mb-0">Enter Key</h6>
        </Modal.Header>
        <Modal.Content>
          <p>Selected File: {importFile.name}</p>
          <Input
            type="password"
            label="Decryption key"
            className="d-block"
            placeholder="Please enter decryption key"
            onChange={(value) => handleChangeDecryptKey(value)}
          />
          <div className="d-flex w-100 justify-content-end py-4">
            <Button
              type="primary"
              content="Open"
              disabled={!decryptKey}
              onClick={() => handleClickImportFile()}
            />
          </div>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default DecryptionKeyModal;
