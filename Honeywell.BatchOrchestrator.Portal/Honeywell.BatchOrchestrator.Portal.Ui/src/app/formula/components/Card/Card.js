/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import './card.scss';
import moment from 'moment';
import { Tooltip } from '@scuf/common';

const Card = (props) => {
  const {
    item,
    setItemType,
    setFilterData,
    selectedId,
    setSelectedId,
    setApprovalType,
  } = props;
  return (
    <div
      className={
        selectedId === item.id ? 'approvals-card bordered' : 'approvals-card'
      }
      onClick={() => {
        props.setId(item.id);
        setItemType(item.category);
        setFilterData('Viewall');
        setSelectedId(item.id);
        setApprovalType('formula');
      }}
    >
      <Tooltip
        content={item.name}
        element={
          <div className="approvals-card-div1 approvals-card-title text-truncate">
            {item.name}
          </div>
        }
        position="top center"
        event="hover"
        hoverable
      />

      <div className="approvals-card-div1 approvals-card-date-info">
        <span>{item.dateTime}</span>
      </div>
    </div>
  );
};

export default Card;
