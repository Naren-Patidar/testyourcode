/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import './splitButton.scss';
import { Button, Popup, VerticalMenu, Icon } from '@scuf/common';

interface SplitButtonProps {
  items: string[];
  onClick?: (index: string, rowData: any) => unknown;
  verticalMenuWidth?: number;
  disableSplitButton?: boolean;
  dataOfRow?: any;
}
export const SplitButton: React.FC<SplitButtonProps> = (props) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [menuItemSelected, setMenuItemSelected] = React.useState(false);

  const popupHandler = (e) => {
    e.stopPropagation();
    setMenuItemSelected(!menuItemSelected);
  };
  const handleMenuClick = (item, key) => {
    setSelectedIndex(key);
    setMenuItemSelected(false);
  };

  const populateVerticalMenu = () => {
    return props.items.map((item, key) => {
      return (
        <div
          key={`spli_button_item_${key}`}
          className="split-button-popup-item"
          onClick={() => handleMenuClick(item, key)}
        >
          <div className="split-button-popup-text">{item}</div>
        </div>
      );
    });
  };

  const handleItemClick = useCallback(() => {
    if (props.onClick) {
      // props.onClick(selectedIndex);
      props.onClick(props.items[selectedIndex], props.dataOfRow);
    }
  }, [props, selectedIndex]);

  const handleMouseLeaveOfSplitButton = () => {
    setMenuItemSelected(false);
  };
  return (
    <div className="d-flex flex-column">
      <div
        className={`split-button ${props.disableSplitButton ? 'disabled' : ''}`}
      >
        <div
          onClick={props.disableSplitButton ? undefined : handleItemClick}
          className="text-truncate"
        >
          {props.items[selectedIndex]}
        </div>
        <Popup
          className="split-button-popup"
          element={
            <Icon
              name="caret-down"
              root="common"
              exactSize=".6667rem"
              onClick={props.disableSplitButton ? undefined : popupHandler}
              className={props.disableSplitButton ? 'cursor-not-allowed' : ''}
            />
          }
          on="click"
          position="bottom center"
          open={menuItemSelected}
        >
          <div onMouseLeave={handleMouseLeaveOfSplitButton}>
            {populateVerticalMenu()}
          </div>
        </Popup>
      </div>
    </div>
  );
};
