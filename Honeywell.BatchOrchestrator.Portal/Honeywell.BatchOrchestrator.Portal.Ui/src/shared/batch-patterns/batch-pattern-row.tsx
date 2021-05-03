/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
/* eslint-disable no-continue */
/* eslint-disable no-unneeded-ternary */

import React, { useState, useEffect } from 'react';
import { Button, Icon } from '@scuf/common';
import { useConfirm } from 'shared/confirm-dialog';
import { patternOptionsHelper } from './pattern-options';
import { Pattern, patternProps } from './pattern';
import { PatternContainer } from './pattern-container';
import './patterns.scss';

export const PatternBatch: React.FC<{
  rowState: Pattern[] | [];
  updatePatternRowState: any;
  rowPosition: number;
  isRecipeBased: boolean | undefined;
}> = ({ rowState, updatePatternRowState, rowPosition, isRecipeBased }) => {
  const confirm = useConfirm();
  const [patterns, setPatterns] = useState([] as any);
  const createEmptyPattern = () => {
    const patternPropObj: patternProps = {
      val: '',
      len: 0,
      fmt: '',
      fmtType: '',
      freq: '',
    };
    const patternObject: Pattern = {
      type: '',
      props: patternPropObj,
    };
    return patternObject;
  };

  const validatePattern = (patternState) => {
    let isPatternRowValid = true;
    if (patternState !== null && patternState !== undefined) {
      for (let i = 0; i < patternState.length; i++) {
        const item = patternState[i];
        const dupPatternContainers = patternState.filter((subItems) => {
          if (item.type === subItems.type) {
            return subItems;
          }
        });

        if (
          item.type === '' ||
          item.type === 'TXT' ||
          dupPatternContainers.length <= 1
        ) {
          continue;
        }

        let isDupAllowed;
        const dupLength = dupPatternContainers.length;
        switch (item.type) {
          case 'INC':
            isDupAllowed = dupLength > 1 ? false : true;
            break;
          case 'F':
            isDupAllowed = dupLength > 1 ? false : true;
            break;
          case 'R':
            isDupAllowed = dupLength > 1 ? false : true;
            break;
          case 'DAY':
            isDupAllowed = dupLength > 1 ? false : true;
            break;
          case 'CAM_ID':
            isDupAllowed = dupLength > 1 ? false : true;
            break;
          case 'YEAR':
            isDupAllowed = dupLength > 1 ? false : true;
            break;
          case 'MONTH':
            isDupAllowed = dupLength > 1 ? false : true;
            break;
          default:
            break;
        }
        // -- extract helper text
        const helperTextObject = patternOptionsHelper.filter((helper) => {
          if (helper.key === item.type) {
            return helper;
          }
        });

        const containerName =
          helperTextObject !== null && helperTextObject.length > 0
            ? helperTextObject[0].value
            : item.type;

        if (!isDupAllowed) {
          confirm.show({
            title: 'Batch ID patterns',
            message: `Maximum one instance of ( ${containerName} type ) pattern container allowed. `,
            type: 'alert',
            confirmText: 'Ok',
          });
          // // --reset duplicate container from state
          // patternState.map((item)=>{

          // })
          // patternState.pop(dupPatternContainers[1]);
          // setPatterns([]);
          // setPatterns(patternState);
          // console.log('patternState', patternState);

          isPatternRowValid = false;
          break;
        }
      }
    }

    return isPatternRowValid;
  };

  const validatePatternForRecipeBased = (patternsList, isRecipeBasedFlag) => {
    let isValid = true;

    if (isRecipeBasedFlag) {
      // --validation batch pattern - campaign is recipe based.
      const formulaPattern = patternsList.filter((item) => {
        if (item.type === 'F') {
          return item;
        }
      });

      if (
        formulaPattern !== null &&
        formulaPattern.length > 0 &&
        isRecipeBasedFlag
      ) {
        confirm.show({
          title: 'Batch ID patterns',
          message: `Campaign is recipe based. Formula container selection is not valid.`,
          type: 'alert',
          confirmText: 'Ok',
        });
        isValid = false;
      }
    } else if (isRecipeBasedFlag !== undefined && !isRecipeBasedFlag) {
      // --validation batch pattern - campaign is formulaset based.
      const racipePattern = patternsList.filter((item) => {
        if (item.type === 'R') {
          return item;
        }
      });

      if (
        racipePattern !== null &&
        racipePattern.length > 0 &&
        !isRecipeBasedFlag
      ) {
        confirm.show({
          title: 'Batch ID patterns',
          message: `Campaign is formula set based. Recipe container selection is not valid.`,
          type: 'alert',
          confirmText: 'Ok',
        });
        isValid = false;
      }
    }

    return isValid;
  };

  const updateState = (position, state) => {
    if (validatePattern(patterns)) {
      if (validatePatternForRecipeBased(patterns, isRecipeBased)) {
        patterns[position] = state;
      } else {
        patterns[position] = createEmptyPattern();
      }
    } else {
      patterns[position] = createEmptyPattern();
    }
    setPatterns([]);
    setPatterns(patterns);
    updatePatternRowState(rowPosition, patterns);
  };
  useEffect(() => {
    if (rowState !== undefined && rowState.length > 0) {
      setPatterns([]);
      setPatterns([...rowState]);
    }
    if (rowState === undefined || rowState.length === 0) {
      if (patterns.length === 0) {
        const patternObject = [] as any;
        patternObject.push(createEmptyPattern());
        patternObject.push(createEmptyPattern());
        // patternObject.push(createEmptyPattern());
        setPatterns(patternObject);
      }
    }
  }, [rowState]);

  const addPattern = async () => {
    if (patterns.length < 8) {
      const obj = createEmptyPattern();
      setPatterns((ele) => [...ele, obj]);
    } else {
      const { confirmed } = await confirm.show({
        title: 'Batch ID patterns',
        message: 'Maximum eight pattern cotainer allowed.',
        type: 'alert',
        confirmText: 'Ok',
      });
    }
  };

  return (
    <div className="d-flex align-items-end  flex-wrap pattern-height">
      {patterns.map((pattern, index) => {
        return (
          <>
            <PatternContainer
              key={index}
              position={index}
              state={pattern}
              updatePatternState={updateState}
            />
          </>
        );
      })}
      <Icon
        root="common"
        name="badge-plus"
        exactSize={20}
        color="white"
        className="pattern-icon-add"
        onClick={addPattern}
      />
    </div>
  );
};
// export default PatternBatch;
