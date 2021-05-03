/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable prettier/prettier */
import React from 'react';
// import './experion.scss';
import {
  EXPERION_RECIPE_NOT_EXISTS,
  EXPERION_ASSOCITE_DATABLOCK_NOT_EXISTS,
  EXPERION_ASSOCITE_DATABLOCK_NOT_MATCHED,
} from 'utils/constants/messages';

const ExperionModificationMessages = (props) => {
  const { parameterObject } = props;
  const {
    isAssocDataBlockExist,
    isAssocDataBlockMatched,
    isRecipeExist,
  } = parameterObject;
  let isObjectEmpty =
    Object.keys(parameterObject).length === 0 &&
    parameterObject.constructor === Object;

  return (
    <div className="experionMessages">
      {!isRecipeExist && !isObjectEmpty && (
        <div className="experionMessagesContainer">
          {EXPERION_RECIPE_NOT_EXISTS}
        </div>
      )}
      {!isAssocDataBlockExist && !isObjectEmpty && (
        <div className="experionMessagesContainer">
          {EXPERION_ASSOCITE_DATABLOCK_NOT_EXISTS}
        </div>
      )}
      {!isAssocDataBlockMatched && !isObjectEmpty && (
        <div className="experionMessagesContainer">
          {EXPERION_ASSOCITE_DATABLOCK_NOT_MATCHED}
        </div>
      )}
    </div>
  );
};
export default ExperionModificationMessages;
