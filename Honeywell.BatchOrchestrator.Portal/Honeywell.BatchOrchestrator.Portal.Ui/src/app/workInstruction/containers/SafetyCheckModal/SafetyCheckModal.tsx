/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon, List, Checkbox, Input } from '@scuf/common';
import { SafetyItem } from 'app/workInstruction/models';

import {
  selectAtiveModalPopup,
  selectSafetyItems,
} from '+store/workInstruction/selector';

import {
  onCloseOfModalPopup,
  addCustomSafetyItem,
  deleteCustomSafetyItem,
  canEditSafetyItemText,
  setCheckedStatusInSafetyItems,
  onChangeOfSafetyItemText,
} from '+store/workInstruction/workInstrSlice';

import {
  ERROR_MESSAGE_FOR_SAFETYNAME_DUPLICATE,
  ERROR_MESSAGE_FOR_SAFETYNAME_EMPTY,
  NUMBER_OF_MAX_SAFETY_ITEMS,
  MAX_SAFETY_ITEMS_MESSAGE,
} from '../../../../utils/app-constants';

import './SafetyCheckModal.scss';

const SafetyCheckModal: React.FC<{ showPreview: boolean }> = ({
  showPreview,
}) => {
  const safetyItemList = useSelector(selectSafetyItems);
  const [isShowError, setIsShowError] = useState(false);
  const [isNameEmpty, setIsNameEmpty] = useState('');
  const [safetyName, setSafetyName] = useState('');
  const dispatch = useDispatch();

  const activeModalPopup = useSelector(selectAtiveModalPopup);

  const checkForDuplicateSafetyName = (id: number, txt: string) => {
    const index = safetyItemList?.findIndex((x) => x.name === txt);
    if (index !== -1 && index !== undefined) {
      setIsNameEmpty(ERROR_MESSAGE_FOR_SAFETYNAME_DUPLICATE);
      dispatch(canEditSafetyItemText({ id, value: true }));
    } else {
      setIsNameEmpty('');
    }
  };

  const hanldeAddSafetyItems = () => {
    if (isNameEmpty === '') {
      setIsNameEmpty('');
      if (safetyItemList !== null) {
        const newSafetyItem: SafetyItem = {
          id: safetyItemList.length + 1,
          name: `New Safety Item ${safetyItemList.length + 1}`,
          iconClassName: 'safety-custom',
          isCustom: true,
          isChecked: true,
          isFocused: true,
        };
        safetyItemList.length >= NUMBER_OF_MAX_SAFETY_ITEMS
          ? setIsShowError(true)
          : dispatch(addCustomSafetyItem(newSafetyItem));
        checkForDuplicateSafetyName(newSafetyItem.id, newSafetyItem.name);
      }
    }
  };

  const handleOnChangeSafetyName = (id: number, txt: string) => {
    setSafetyName(txt);
    if (txt !== '' && txt !== null) {
      setIsNameEmpty('');
    } else {
      setIsNameEmpty(ERROR_MESSAGE_FOR_SAFETYNAME_EMPTY);
    }
    checkForDuplicateSafetyName(id, txt);
    dispatch(onChangeOfSafetyItemText({ id, itemName: txt }));
  };

  const handleOnBlurOfSafetyName = (id: number) => {
    if (safetyName === '') {
      dispatch(deleteCustomSafetyItem(id));
      setIsShowError(false);
    }
    setSafetyName('');
    dispatch(canEditSafetyItemText({ id, value: false }));
    if (isNameEmpty !== '') {
      dispatch(deleteCustomSafetyItem(id));
      setIsNameEmpty('');
      dispatch(canEditSafetyItemText({ id, value: false }));
      setIsShowError(false);
    }
  };

  const handleDeleteSafetyItem = (id) => {
    dispatch(deleteCustomSafetyItem(id));
    setIsShowError(false);
  };

  const hanldeOnClose = () => {
    setIsNameEmpty('');
    dispatch(onCloseOfModalPopup());
  };
  const safetyItems =
    !!safetyItemList &&
    !!safetyItemList.length &&
    safetyItemList.map((item: SafetyItem) => (
      <List.Content key={item.id} id={item.name}>
        <div className="d-flex justify-content-between">
          <div className="d-flex">
            <Checkbox
              checked={item.isChecked}
              readOnly={showPreview}
              onChange={() => dispatch(setCheckedStatusInSafetyItems(item.id))}
            />
            {item.isCustom && item.isFocused ? (
              <Input
                className="input-example"
                value={item.name}
                readOnly={showPreview}
                onFocus={() => setSafetyName(item.name)}
                onBlur={() => handleOnBlurOfSafetyName(item.id)}
                onChange={(txt) => handleOnChangeSafetyName(item.id, txt)}
                error={isNameEmpty}
              />
            ) : item.isCustom ? (
              <span
                className="safety-cursor-hover"
                onClick={() =>
                  showPreview
                    ? null
                    : dispatch(
                        canEditSafetyItemText({ id: item.id, value: true })
                      )
                }
              >
                {item.name}
              </span>
            ) : (
              <span>{item.name}</span>
            )}
          </div>
          <img className={`safetyicon ${item.iconClassName}`} />
        </div>
        {item.isCustom && !showPreview && (
          <Icon
            className="close safety-cursor-hover"
            root="common"
            name="close"
            size="small"
            onClick={() => handleDeleteSafetyItem(item.id)}
          />
        )}
      </List.Content>
    ));

  return (
    <div
      className={`dropdown-menu safety-list ${
        activeModalPopup === 'Safety check' ? `show` : ''
      }`}
    >
      <div className="dd-title">
        <h6>Safety</h6>
        <Icon
          root="common"
          name="close"
          size="small"
          className="close"
          onClick={() => hanldeOnClose()}
        />
      </div>
      <List selection>{safetyItems}</List>
      {!showPreview && (
        <p
          className="add-safety-btn mb-0"
          onClick={() => hanldeAddSafetyItems()}
        >
          <Icon
            root="common"
            className="pr-3"
            name="slidercontrols-plus"
            size="small"
          />
          Add custom safety item
        </p>
      )}
      {isShowError && (
        <span className="error-msg">
          <small>{MAX_SAFETY_ITEMS_MESSAGE}</small>
        </span>
      )}
    </div>
  );
};

export default SafetyCheckModal;
