import React from 'react';
import { Input } from '@scuf/common';

import { FORMULA, FORMULASET, IDENTIFICATION } from 'utils/app-constants';

const Header = (props) => {
  const { formulaSetInfo, formulaInfo, itemType } = props;

  return (
    <>
      {itemType === 'formulaset' && (
        <div className="d-flex">
          <Input
            label={`${FORMULASET} name`}
            disabled
            value={formulaSetInfo.name}
            fluid
            className="w-25"
          />
          <Input
            label="Master Recipe name"
            value={formulaSetInfo.masterRecipeName}
            fluid
            disabled
            className="ml-4 w-25"
          />
        </div>
      )}
      {itemType === 'formula' && (
        <div className="d-flex">
          <Input
            label={`${FORMULA} name`}
            value={formulaInfo.productName}
            fluid
            disabled
            className="w-25"
          />
          <Input
            label={`${IDENTIFICATION}`}
            value={formulaInfo.productId}
            fluid
            disabled
            className="ml-4 w-25"
          />

          <Input
            label="Description"
            value={formulaInfo.productDescription}
            fluid
            disabled
            className="ml-4 w-50"
          />
        </div>
      )}
    </>
  );
};

export default Header;
