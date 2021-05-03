/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Tooltip } from '@scuf/common';
import { getFormattedDateTime } from 'app/campaign/utils';
import './card.scss';

const CampaignCard = (props) => {
  const {
    item,
    selectedId,
    setSelectedId,
    setId,
    setApprovalType,
    setItemType,
  } = props;
  return (
    <div
      className={
        selectedId === item.id ? 'approvals-card bordered' : 'approvals-card'
      }
      onClick={() => {
        setId(item.id);
        setSelectedId(item.id);
        setApprovalType('campaign');
        setItemType('campaign');
      }}
    >
      <Tooltip
        content={item.campaignRefId}
        element={
          <div className="approvals-card-div1 approvals-card-title text-truncate">
            {item.campaignRefId}
          </div>
        }
        position="top center"
        event="hover"
        hoverable
      />

      <div className="approvals-card-div1">
        {item.isRecipeBased ? item.recipeName : item.formula}
      </div>
      <div className="approvals-card-div1 approvals-card-date-info">
        <span>{getFormattedDateTime(new Date(item.modifiedDt))}</span>
      </div>
    </div>
  );
};

export default CampaignCard;
