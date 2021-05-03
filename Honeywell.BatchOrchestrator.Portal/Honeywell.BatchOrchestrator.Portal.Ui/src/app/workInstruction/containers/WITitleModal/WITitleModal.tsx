import React, { useEffect, useState } from 'react';
import { Button, Input, Modal } from '@scuf/common';
import { useDispatch, useSelector } from 'react-redux';
import {
  MAX_CHARACTER_LIMIT_FOR_TITLE,
  MIN_TITLE_CHARACTER_LIMIT,
  MIN_TITLE_CHARACTER_MESSAGE,
} from 'utils';
import {
  selectActiveContextMenuEwiId,
  selectEditTitleState,
  selectIsDuplicateTiteExist,
} from '+store/workInstruction/selector';
import {
  setEditTitleState,
  setIsDuplicateTitleExist,
} from '+store/workInstruction/workInstrSlice';
import { duplicateWorkinstruction } from '+store/workInstruction/effects';

const WITitleModal: React.FC = () => {
  const [title, setTitle] = useState('');
  const [tempTitle, setTempTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const dispatch = useDispatch();
  const editTitleState = useSelector(selectEditTitleState);
  const isDuplicateTitle = useSelector(selectIsDuplicateTiteExist);
  const srcEWIId = useSelector(selectActiveContextMenuEwiId);

  useEffect(() => {
    if (!editTitleState) {
      setTitle('');
      setTempTitle('');
      setTitleError('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editTitleState]);

  useEffect(() => {
    if (isDuplicateTitle) {
      setTitleError('Title already exist');
      setTitle(tempTitle);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDuplicateTitle]);

  const onDuplicateCheck = () => {
    setTempTitle(title);
    if (title.length > MAX_CHARACTER_LIMIT_FOR_TITLE) {
      setTitleError('Title should be less than 40 characters');
    } else if (title.length < MIN_TITLE_CHARACTER_LIMIT) {
      setTitleError(MIN_TITLE_CHARACTER_MESSAGE);
    } else {
      dispatch(duplicateWorkinstruction({ title, srcEWIId }));
    }
  };

  return (
    <Modal
      size="mini"
      className="modal-Popup"
      closeIcon
      onClose={() => {
        setTitle('');
        setTempTitle('');
        setTitleError('');
        dispatch(setEditTitleState(false));
        dispatch(setIsDuplicateTitleExist(false));
      }}
      open={editTitleState}
      closeOnDimmerClick={false}
    >
      <Modal.Header className="modal-Popup-header">
        Duplicate Work Instruction
      </Modal.Header>
      <Modal.Content className="modal-Popup-content">
        <Input
          fluid
          placeholder="Enter New Work Instruction Title"
          value={title}
          onChange={(t) => {
            setTitle(t);
          }}
          error={titleError}
        />
      </Modal.Content>
      <Modal.Footer>
        <Button
          disabled={title === ''}
          type="primary"
          size="medium"
          content="Proceed"
          onClick={() => onDuplicateCheck()}
        />
      </Modal.Footer>
    </Modal>
  );
};
export default WITitleModal;
