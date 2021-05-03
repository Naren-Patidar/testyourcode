import React from 'react';
import { Modal, Icon } from '@scuf/common';

import './DeleteEWIModal.scss';
import { useDispatch, useSelector } from 'react-redux';
import { onCloseOfDeleteModalPopup } from '+store/workInstruction/workInstrSlice';
import { selectProceduralElements } from '+store/workInstruction/selector';

const DeleteEWIModal: React.FC<{ open: boolean }> = ({ open }) => {
  const dispatch = useDispatch();
  const proceduralItems = useSelector(selectProceduralElements);
  return (
    <div>
      <Modal
        className="delete-wi-modal"
        closeIcon
        open={open}
        size="small"
        onClose={() => dispatch(onCloseOfDeleteModalPopup())}
      >
        <Modal.Header>
          <Icon root="common" className="pr-2" name="badge-important" />
          <h6>Instruction can not be deleted</h6>
        </Modal.Header>
        <Modal.Content>
          <p className="mb-0">
            Instruction can not be deleted while linked to a procedure.
          </p>
          <p>Manually unlink from these procedure[s] before deleting.</p>

          <div className="procedural-list">
            {proceduralItems?.map((element) => (
              <p className="mb-1">{element}</p>
            ))}
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default DeleteEWIModal;
