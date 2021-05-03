/* eslint-disable react/no-array-index-key */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Popup, Icon, Tooltip } from '@scuf/common';
import './more-action.scss';
import { MoreAction } from './more-action';

export const MoreActions: React.FC<{
  moreActionsObject: MoreAction[];
  funcArgumentData: any;
  on: 'hover' | 'click';
}> = ({ moreActionsObject, funcArgumentData, on }) => {
  const optionClick = (action) => {
    action.onClick(funcArgumentData);
  };
  return (
    <Popup
      className="more-action-popup"
      element={<Icon name="ellipsis-horizontal" root="common" size="small" />}
      on={on}
      position="left center"
      hideOnScroll={false}
    >
      <>
        {moreActionsObject.map((action, index) =>
          action.disabled ? (
            action.disabledTooltip ? (
              <Tooltip
                content={action.disabledTooltip || ''}
                element={
                  <div
                    key={`div_more_action_${index}`}
                    className="more-action-item"
                  >
                    <div className="more-action-text disabled">
                      {action.name}
                    </div>
                  </div>
                }
                event="hover"
                flowing
                hideOnScroll
                position="top center"
                hoverable
              />
            ) : (
              <div
                key={`div_more_action_${index}`}
                className="more-action-item"
              >
                <div className="more-action-text disabled">{action.name}</div>
              </div>
            )
          ) : (
            <div
              key={`div_more_action_${index}`}
              className="more-action-item"
              onClick={(e) => {
                e.stopPropagation();
                optionClick(action);
              }}
            >
              <div className="more-action-text">{action.name}</div>
            </div>
          )
        )}
      </>
    </Popup>
  );
};
