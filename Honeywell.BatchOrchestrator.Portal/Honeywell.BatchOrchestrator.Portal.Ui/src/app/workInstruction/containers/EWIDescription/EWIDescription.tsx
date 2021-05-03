import React, { useState } from 'react';
import {
  MAX_CHARACTERS_FOR_EWI_DESCRIPTION,
  MAX_CHARACTER_LIMIT_FOR_DESCRIPTION,
} from 'utils/app-constants';
import { TextArea } from '@scuf/common';
import { useDispatch } from 'react-redux';
import { EwiPayload } from 'app/workInstruction/models';
import { setEwiDescription } from '+store/workInstruction/workInstrSlice';
import './EWIDescription.scss';

const EWIDescription: React.FC<{ ewi: EwiPayload }> = ({ ewi }) => {
  const { showPreview } = ewi;
  const dispatch = useDispatch();
  const [descValidationMessage, setDescValidationMessage] = useState('');

  const handleEditDescription = (value: string) => {
    if (value.length <= MAX_CHARACTER_LIMIT_FOR_DESCRIPTION) {
      setDescValidationMessage('');
      dispatch(setEwiDescription(value));
    }
  };
  const handleKeyDownDescription = () => {
    if (ewi.description.length === MAX_CHARACTER_LIMIT_FOR_DESCRIPTION) {
      setDescValidationMessage(MAX_CHARACTERS_FOR_EWI_DESCRIPTION);
    }
  };
  return (
    <div className="description-box">
      <TextArea
        fluid
        rows={3}
        error={descValidationMessage}
        value={ewi.description}
        onChange={(value) =>
          showPreview ? null : handleEditDescription(value)
        }
        onKeyDown={() => handleKeyDownDescription()}
      />
    </div>
  );
};

export default EWIDescription;
