/* eslint-disable eqeqeq */
import React from 'react';
import { Select } from '@scuf/common';
import { FORMULA, FORMULAS, FORMULASET } from 'utils/app-constants';
import { PageTitle } from 'shared/page-title';

const stateOptions = [
  { value: 'Viewall', text: 'View all', applyFor: 'both' },
  { value: 'Modified', text: 'Modified', applyFor: 'both' },
  { value: 'New', text: 'New', applyFor: 'formula' },
];
const Filter = (props) => {
  const { filterData, setFilterData, itemType } = props;

  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex">
        <PageTitle
          content={
            itemType === 'formulaset'
              ? `Review ${FORMULASET}`
              : `Review ${FORMULA}`
          }
        />
      </div>
      <div className="d-flex justify-content-between align-items-center">
        <Select
          placeholder="Select a State"
          options={
            itemType === 'formulaset'
              ? stateOptions.filter((item) => {
                  return item.applyFor == 'both';
                })
              : stateOptions
          }
          value={filterData}
          onChange={(value) => setFilterData(value)}
        />
      </div>
    </div>
  );
};

export default Filter;
