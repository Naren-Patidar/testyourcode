import { Button, Grid, Modal, TextArea } from '@scuf/common';
import { FC, useState } from 'react';
import styled from 'styled-components/macro';
import { ConfirmDialogOptions } from './ConfirmDialogOptions';
import './ConfirmDialog.scss';

const WordCount = styled.span`
  margin: 0.125rem 0;
  font-size: 0.75rem;
  line-height: 1.25rem;
  color: #d0d0d0;
`;
const Message = styled.div`
  font-size: 1rem;
  color: #f0f0f0;
`;
const Note = styled.div`
  font-size: 0.875rem;
  color: #a0a0a0;
  margin-top: 0.5rem;
`;
export interface ConfirmDialogProps extends ConfirmDialogOptions {
  open: boolean;
  onClose: () => void;
  onConfirm: (comments?: string) => void;
}
export const ConfirmDialog: FC<ConfirmDialogProps> = ({
  onClose,
  onConfirm,
  open,
  showCommentBox,
  commentsRequired,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
  message = 'Are you sure?',
  note,
  title = 'Confirmation',
  type = 'confirm',
  messageLength = 250,
}) => {
  const [localComments, setLocalComments] = useState<string>('');
  return (
    <Modal
      closeIcon
      onClose={onClose}
      open={open}
      closeOnDimmerClick={false}
      size="small"
    >
      <Modal.Header style={{ fontSize: '1.25rem' }}>{title}</Modal.Header>
      <Modal.Content scrolling={false}>
        <Message>{message}</Message>
        {note && <Note>{note}</Note>}

        {showCommentBox ? (
          <div className="d-flex flex-column">
            <TextArea
              placeholder="Enter comments here..."
              indicator={!commentsRequired ? 'optional' : undefined}
              label="Comments"
              reserveSpace={false}
              value={localComments}
              onChange={(val) => {
                if (val.length <= messageLength) {
                  setLocalComments(val);
                }
              }}
              error={
                // eslint-disable-next-line no-nested-ternary
                !localComments.trim() && commentsRequired
                  ? 'Please enter comments'
                  : ''
              }
              fluid
              className="confirm-dialog mt-4"
            />
            <div className="d-flex justify-content-end">
              <WordCount>{`${localComments.length} / ${messageLength}`}</WordCount>
            </div>
          </div>
        ) : null}
      </Modal.Content>
      <Modal.Footer>
        {type === 'confirm' ? (
          <Button
            type="secondary"
            size="small"
            content={cancelText}
            onClick={onClose}
            textTransform={false}
          />
        ) : (
          ''
        )}

        <Button
          type="primary"
          size="small"
          content={confirmText}
          disabled={!localComments.trim() && commentsRequired}
          onClick={() => onConfirm(localComments.trim())}
          textTransform={false}
        />
      </Modal.Footer>
    </Modal>
  );
};
