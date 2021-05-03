/* eslint-disable array-callback-return */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unneeded-ternary */

import React, { useState, useEffect } from 'react';
import { Button, Icon } from '@scuf/common';
import { PatternRow } from 'shared/batch-patterns/pattern';
import { PatternBatch } from 'shared/batch-patterns/batch-pattern-row';
import 'shared/batch-patterns/patterns.scss';

export const ManagePattern: React.FC<{
  batchPatternsState: PatternRow[];
  setBatchPatternState: any;
}> = ({ setBatchPatternState, batchPatternsState }) => {
  const [patternRow, setPatternRow] = useState([] as any);
  const createEmptyRowPattern = () => {
    const patternRowObj: PatternRow = {
      key: '',
      value: [],
    };
    return patternRowObj;
  };
  useEffect(() => {
    if (batchPatternsState != null && batchPatternsState.length > 0) {
      setPatternRow(batchPatternsState);
    } else {
      setPatternRow((ele) => [...ele, []]);
    }
  }, [batchPatternsState]);

  const updatePatternRowState = (position, state) => {
    const obj = {} as any;
    obj.key = `BatchIdPattern${position + 1}`;
    obj.value = state;
    patternRow[position] = obj;
    setPatternRow(patternRow);
    setBatchPatternState(patternRow);
  };
  const addNewPatternRow = () => {
    setPatternRow((ele) => [...ele, []]);
  };
  const removePatternRow = (index, e) => {
    // const modifiedRows = patternRow
    //   .slice(0, index)
    //   .concat(patternRow.slice(index + 1, patternRow.length));
    patternRow.splice(index, 1);
    const modifiedRows = [...patternRow];
    setPatternRow([]);
    setPatternRow(modifiedRows);
    setBatchPatternState(modifiedRows);
  };
  return (
    <div>
      {patternRow.map((row, index) => {
        return (
          <>
            <div className="pattern-row-caption mt-8">{`Batch pattern ${
              index + 1
            }`}</div>
            <div className="d-flex align-items-end pattern-height">
              <Icon
                root="common"
                name="close"
                exactSize={10}
                color="white"
                className="pattern-icon-close"
                onClick={(e) => removePatternRow(index, e)}
              />
              <PatternBatch
                key={index}
                rowPosition={index}
                rowState={row.value}
                updatePatternRowState={updatePatternRowState}
                isRecipeBased={undefined}
              />
            </div>
          </>
        );
      })}

      <div className="mt-4">
        <Button
          type="secondary"
          className=""
          content="Add more types"
          onClick={addNewPatternRow}
          disabled={patternRow.length < 3 ? false : true}
        />
      </div>
    </div>
  );
};
// export default ManagePattern;
