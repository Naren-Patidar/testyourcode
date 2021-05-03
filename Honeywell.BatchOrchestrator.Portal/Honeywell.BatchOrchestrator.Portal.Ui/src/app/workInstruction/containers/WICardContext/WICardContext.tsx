import React from 'react';
import moment from 'moment';
// import { Link } from 'react-router-dom';

import {
  EWI_STATUS,
  // STATUS,
} from 'utils/app-constants';
import { toLocalTimeStringFormatted } from 'utils/date-utils';
import ApprovedIcon from 'assets/icons/Approved.svg';
import EditStateIcon from 'assets/icons/edit_state.svg';
import PendingApprovalIcon from 'assets/icons/inReview.svg';
import './WICardContext.scss';

const WICardContext: React.FC<{ lastModifiedAt: any; status: number }> = ({
  lastModifiedAt,
  status,
}) => {
  return (
    <div className="d-flex w-100 justify-content-start">
      <small>
        <span className="edited-text">Last Edited: </span>
        <span className="dt-format">
          {toLocalTimeStringFormatted(lastModifiedAt)}
        </span>
      </small>
      <span className="ewi-state">
        {status === EWI_STATUS.APPROVED && (
          <>
            <img src={ApprovedIcon} />
            {/* {STATUS.APPROVED} */}
          </>
        )}
        {status === EWI_STATUS.RELEASED && (
          <>
            <img src={ApprovedIcon} />
            {/* {STATUS.RELEASED} */}
          </>
        )}
        {status === EWI_STATUS.DRAFT && (
          <>
            <img src={EditStateIcon} />
            {/* {STATUS.DRAFT} */}
          </>
        )}
        {status === EWI_STATUS.BRANCHED && (
          <>
            <img src={EditStateIcon} />
            {/* {STATUS.BRANCHED} */}
          </>
        )}
        {status === EWI_STATUS.MODIFIED && (
          <>
            <img src={EditStateIcon} />
            {/* {STATUS.MODIFIED} */}
          </>
        )}
        {status === EWI_STATUS.UNDERREVIEW && (
          <>
            <img src={PendingApprovalIcon} />
            {/* {STATUS.UNDERREVIEW} */}
          </>
        )}
      </span>
    </div>
  );
};

export default WICardContext;
