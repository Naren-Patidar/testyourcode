/* eslint-disable array-callback-return */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
  Icon,
  Input,
  InputLabel,
  Button,
  Select,
  List,
  Tooltip,
} from '@scuf/common';
import {
  UNSUPPORTED_DOC_MESSAGE,
  UNSUPPORTED_DOC_TYPES,
} from 'utils/app-constants';
import { WIAttachment } from 'app/workInstruction/models';
import {
  getRecentDocuments,
  addNewToRecentDocuments,
} from '+store/workInstruction/effects';
import {
  onCloseOfModalPopup,
  addNewDocument,
  allDocumentDelete,
  deleteSelectedDocument,
} from '+store/workInstruction/workInstrSlice';
import {
  selectAtiveModalPopup,
  selectEwi,
  selectRecentDocuments,
} from '+store/workInstruction/selector';

import './DocumentLinkModal.scss';

const DocumentLinkModal: React.FC<{ showPreview: boolean }> = ({
  showPreview,
}) => {
  const [fileInput, setFileInput] = useState('');
  const [docTitle, setDocTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [urlError, setUrlError] = useState('');
  const dispatch = useDispatch();
  const activeModalPopup = useSelector(selectAtiveModalPopup);
  useEffect(() => {
    dispatch(getRecentDocuments());
  }, [dispatch]);

  const recentDocuments = useSelector(selectRecentDocuments);
  const ewi = useSelector(selectEwi);

  const handleOnClickOfAdd = () => {
    if (fileInput !== '') {
      const documentName = fileInput.split('/').pop();
      const extension = documentName?.split('.').pop();
      let unsupportedType = false;
      if (extension && UNSUPPORTED_DOC_TYPES.includes(extension)) {
        unsupportedType = true;
        setUrlError(UNSUPPORTED_DOC_MESSAGE);
      }
      if (documentName?.trim() && docTitle?.trim() && !unsupportedType) {
        dispatch(
          addNewDocument({
            id: uuidv4(),
            docName: docTitle,
            docPath: fileInput,
          })
        );
        dispatch(
          addNewToRecentDocuments({
            docName: docTitle,
            docPath: fileInput,
            title: docTitle,
          })
        );
        setFileInput('');
        setDocTitle('');
      } else {
        if (!documentName?.trim()) {
          setUrlError('URL should not be empty');
        }
        if (!docTitle?.trim()) {
          setTitleError('Title should not be empty');
        }
      }
    } else {
      setUrlError('URL should not be empty');
    }
  };

  return (
    <div
      className={`dropdown-menu link-doc ${
        activeModalPopup === 'Document link' ? `show` : ''
      }`}
    >
      <div className="dd-title">
        <h6>Link document</h6>
        <Icon
          root="common"
          name="close"
          size="small"
          className="close"
          onClick={() => dispatch(onCloseOfModalPopup())}
        />
      </div>
      {!showPreview && (
        <Input
          className="url-link rounded-0 mb-3"
          placeholder=""
          error={titleError}
          value={docTitle}
          label="Title"
          onChange={(value) => {
            if (titleError) {
              setTitleError('');
            }
            setDocTitle(value);
          }}
        />
      )}
      {!showPreview && (
        <Input
          className="url-link rounded-0 mb-3"
          placeholder=""
          error={urlError}
          value={fileInput}
          label="URL"
          onChange={(value) => {
            if (urlError) {
              setUrlError('');
            }
            setFileInput(value);
          }}
        />
      )}

      {!showPreview && (
        <Button
          className="ml-2 mt-4 rounded"
          type="primary"
          content="Add"
          size="small"
          onClick={() => handleOnClickOfAdd()}
        />
      )}
      <div />

      {!showPreview && (
        <Select
          className="mb-4"
          placeholder="Choose"
          options={
            !!recentDocuments && !!recentDocuments.length
              ? recentDocuments.map((v, key) => ({
                  value: v.id,
                  text: v.docName,
                }))
              : []
          }
          onChange={(val) => {
            recentDocuments.filter((v) => {
              if (v.id === val) {
                dispatch(addNewDocument(v));
                dispatch(addNewToRecentDocuments(v));
              }
            });
          }}
          label="Previously linked documents"
        />
      )}
      <div className="documents-linked pb-1">
        <InputLabel label="Documents linked" />
        <List verticalAlign="middle">
          {!!ewi.attachments &&
            !!ewi.attachments.length &&
            ewi.attachments.map((v: WIAttachment, key) => (
              <List.Content
                id={v.doc_id}
                key={v.doc_id}
                iconName={
                  showPreview ? (
                    <></>
                  ) : (
                    <Icon
                      onClick={() => dispatch(deleteSelectedDocument(v.doc_id))}
                      name="close"
                      root="common"
                      size="small"
                      className="close"
                    />
                  )
                }
              >
                <Tooltip
                  content={v.path}
                  element={<div>{v.title}</div>}
                  position="top left"
                  hoverable
                  size="mini"
                  style={{ 'min-width': '0px', 'max-width': '200px' }}
                />
              </List.Content>
            ))}
        </List>
      </div>
      {ewi.attachments.length && !showPreview ? (
        <div className="remove-alldocs">
          <InputLabel
            onClick={() => {
              dispatch(allDocumentDelete());
              setFileInput('');
            }}
            label="Remove all linked"
          />
        </div>
      ) : null}
    </div>
  );
};

export default DocumentLinkModal;
