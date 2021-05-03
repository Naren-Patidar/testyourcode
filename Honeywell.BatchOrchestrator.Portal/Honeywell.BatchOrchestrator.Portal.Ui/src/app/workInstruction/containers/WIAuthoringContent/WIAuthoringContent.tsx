/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Input } from '@scuf/common';

import {
  EWI_TITLE_SPECIAL_CHARACTERS_NUMBERS_VALIDATION,
  MAX_CHARACTERS_FOR_EWI_TITLE,
  EMPTY_EWI_TITLE,
  MAX_CHARACTER_LIMIT_FOR_TITLE,
  DUPLICATE_TITLE,
  STATUS,
} from 'utils/app-constants';
import EWIDescription from '../EWIDescription/EWIDescription';
import {
  selectEwi,
  selectChangeLog,
  selectDuplicateTitle,
  selectDraftWIs,
  selectActiveWIs,
  selectBranchedWIs,
} from '+store/workInstruction/selector';
import { setEwiTitle } from '+store/workInstruction/workInstrSlice';

import './WIAuthoringContent.scss';
import EWITags from '../EWITags/EWITags';
import EWIProElements from '../EWIProElements/EWIProElements';
import EWITaskList from '../EWITaskList/EWITaskList';

const WIAuthoringContent: React.FC<{
  setInvalidTitle: (value: boolean) => void;
  showPreview: boolean;
}> = ({ setInvalidTitle, showPreview }) => {
  const changelogdata = useSelector(selectChangeLog);
  const isDuplicate = useSelector(selectDuplicateTitle);
  const [isEditable, setIsEditable] = useState(true);
  const draftEWIs = useSelector(selectDraftWIs);
  const activeEWIs = useSelector(selectActiveWIs);
  const branchedEWIs = useSelector(selectBranchedWIs);
  const [titleValidationMessage, setTitleValidationMessage] = useState('');
  const ewi = useSelector(selectEwi);
  const dispatch = useDispatch();

  const handleEditTitle = (value: string) => {
    if (value.length <= MAX_CHARACTER_LIMIT_FOR_TITLE) {
      setTitleValidationMessage('');
      dispatch(setEwiTitle(value));
      setInvalidTitle(false);
    }
    if (!/^[A-Za-z]+$/.test(value[0])) {
      setTitleValidationMessage(
        EWI_TITLE_SPECIAL_CHARACTERS_NUMBERS_VALIDATION
      );
      setInvalidTitle(true);
    } else if (
      draftEWIs.some((eachDraftEwi) => eachDraftEwi.title === value) ||
      activeEWIs.some((eachDraftEwi) => eachDraftEwi.title === value) ||
      branchedEWIs.some((eachDraftEwi) => eachDraftEwi.title === value)
    ) {
      setTitleValidationMessage(DUPLICATE_TITLE);
      setInvalidTitle(true);
    }
  };

  const handleKeyDown = () => {
    if (ewi.ewi_title.length === MAX_CHARACTER_LIMIT_FOR_TITLE)
      setTitleValidationMessage(MAX_CHARACTERS_FOR_EWI_TITLE);
  };

  const getIsModifiedFlag = (title: string): boolean => {
    const idx = branchedEWIs.findIndex((wi) => wi.title === title);
    if (idx === -1) {
      return false;
    }
    const branchedWI = branchedEWIs[idx];
    return branchedWI.isModified;
  };
  return (
    <div>
      <div className="ewi-description-container">
        {isEditable || ewi.ewi_title === '' ? (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Input
              className={
                changelogdata &&
                showPreview &&
                changelogdata.ewi_title instanceof Object
                  ? 'ewi-title-edit pl-4 title-star'
                  : 'ewi-title-edit pl-4 '
              }
              value={ewi.ewi_title}
              placeholder="EWI title"
              error={
                ewi.ewi_title === '' ? EMPTY_EWI_TITLE : titleValidationMessage
              }
              onChange={(value) => handleEditTitle(value)}
              id="ewititle"
              onBlur={() => setIsEditable(false)}
              onKeyDown={() => handleKeyDown()}
              readOnly={
                showPreview ||
                isDuplicate ||
                ewi.status === STATUS.MODIFIED ||
                (ewi.status === STATUS.REWORK &&
                  getIsModifiedFlag(ewi.ewi_title))
              }
            />
          </div>
        ) : (
          <>
            <p
              className={
                changelogdata &&
                showPreview &&
                changelogdata.ewi_title instanceof Object
                  ? 'ewi-title ml-4 mb-0 title-star'
                  : 'ewi-title ml-4 mb-0'
              }
              onClick={() => {
                setIsEditable(true);
              }}
              id="ewititle"
            >
              {ewi.ewi_title}
            </p>
          </>
        )}
        <>
          {changelogdata &&
          showPreview &&
          changelogdata.description instanceof Object ? (
            <span className="d-none">&nbsp;</span>
          ) : null}
          <Accordion>
            <Accordion.Content
              title="Instruction description"
              arrowPosition="left"
              id="intructiontitle"
              className={
                changelogdata &&
                showPreview &&
                changelogdata.description instanceof Object
                  ? 'addstar-icon'
                  : ''
              }
            >
              <EWIDescription ewi={ewi} />
            </Accordion.Content>
          </Accordion>
        </>
      </div>
      <div className="accordion-scrolling-content">
        <Accordion>
          <Accordion.Content
            className="ewi-tasklist"
            title="Tasklist"
            arrowPosition="left"
          >
            <EWITaskList />
          </Accordion.Content>
        </Accordion>
        <Accordion>
          <Accordion.Content
            title="Tags"
            arrowPosition="left"
            id="tagsdata"
            className={
              changelogdata &&
              showPreview &&
              changelogdata.tags &&
              changelogdata.tags.added &&
              changelogdata.tags.added.length > 0
                ? 'addstar-icon'
                : ''
            }
          >
            <EWITags ewi={ewi} />
          </Accordion.Content>
        </Accordion>
        {ewi.ewi_id !== '' && (
          <Accordion>
            <Accordion.Content title="Metadata" arrowPosition="left">
              <span className="pl-5 ml-1 d-block">EWI id - {ewi.ewi_id}</span>
            </Accordion.Content>
          </Accordion>
        )}
        <Accordion>
          <Accordion.Content title="Procedural elements" arrowPosition="left">
            <EWIProElements />
          </Accordion.Content>
        </Accordion>
      </div>
    </div>
  );
};

export default WIAuthoringContent;
