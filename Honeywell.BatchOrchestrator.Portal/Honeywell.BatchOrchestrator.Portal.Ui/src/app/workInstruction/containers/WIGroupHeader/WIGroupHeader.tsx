import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Badge } from '@scuf/common';

// import './WIGroupHeader.scss';
import { Permissions, useAuthorize } from 'core/authentication';
import { PermissionValues } from 'core/authentication/models/user-permission';
import {
  toggleAuthoringScreen,
  setAuthoringEwiId,
  setLastEditedAt,
} from '+store/workInstruction/workInstrSlice';

interface WIGroupHeaderProps {
  heading: string;
  showButton: boolean;
  numberOfItems: number;
}

const WIGroupHeader: React.FC<WIGroupHeaderProps> = ({
  heading,
  showButton,
  numberOfItems,
}: WIGroupHeaderProps) => {
  const dispatch = useDispatch();

  return (
    <div className="row align-items-center pl-4 pr-2">
      <div className="col-auto mr-auto">
        <div className="cardtitle">
          <h3>
            {heading}
            <Badge>{numberOfItems}</Badge>
          </h3>
        </div>
      </div>
      {showButton && (
        <div className="col-auto">
          <Permissions
            type="disable"
            allowed={[PermissionValues.AuthorWorkInstruction]}
          >
            {({ authorized }) => (
              <Button
                className="text-white mt-0 py-2 wi__group__header_btn"
                type="primary"
                content="+ New Instruction"
                size="small"
                disabled={!authorized}
                onClick={() => {
                  dispatch(toggleAuthoringScreen(true));
                  dispatch(setAuthoringEwiId(''));
                  dispatch(setLastEditedAt(''));
                }}
              />
            )}
          </Permissions>
        </div>
      )}
    </div>
  );
};
export default WIGroupHeader;
