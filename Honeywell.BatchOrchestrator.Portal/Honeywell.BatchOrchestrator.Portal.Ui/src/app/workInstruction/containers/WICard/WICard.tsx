/* eslint-disable camelcase */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  VerticalMenu,
  Popup,
  Icon,
  Tooltip,
  Modal,
  Button,
} from '@scuf/common';
import { AppConstants, EWI_DELETE, EWI_STATUS } from 'utils/app-constants';
import { useConfirm } from 'shared/confirm-dialog';
import { useAuthorize } from 'core/authentication';
import { PermissionValues } from 'core/authentication/models/user-permission';
import { WorkInstruction } from '../../models/index';

import WICardContext from '../WICardContext/WICardContext';
import DeleteEWIModal from '../DeleteEWIModal/DeleteEWIModal';
import {
  selectAtiveModalPopup,
  selectIsAuthoringScreenActive,
  selectActiveContextMenuEwiId,
  selectBranchedWIs,
} from '+store/workInstruction/selector';
import {
  setAuthoringScreenActiveStatus,
  setActiveContextMenuEwiId,
  setAuthoringEwiId,
  setWIShowPreview,
  setEditTitleState,
} from '+store/workInstruction/workInstrSlice';
import './WICard.scss';
import {
  deleteWorkInstruction,
  editWorkInstruction,
  modifyReleasedWorkInstruction,
  previewWorkInstruction,
} from '+store/workInstruction/effects';

const WICard: React.FC<{ ewiItem: WorkInstruction }> = ({ ewiItem }) => {
  const confirm = useConfirm();
  const { title, description, lastModifiedAt, id, status } = ewiItem;
  const [active, setActive] = useState(false);

  const dispatch = useDispatch();
  const activeModalPopup = useSelector(selectAtiveModalPopup);
  const isAuthoringScreenActive = useSelector(selectIsAuthoringScreenActive);
  const activeEwiId = useSelector(selectActiveContextMenuEwiId);
  const branchedEWIs = useSelector(selectBranchedWIs);

  const isModifiedExist = (): boolean => {
    const idx = branchedEWIs.findIndex((wi) => wi.title === title);
    return idx > -1;
  };

  const { authorized: authForWIDelete } = useAuthorize([
    PermissionValues.DeleteWorkInstruction,
  ]);

  const { authorized: authForWIApproveOnly } = useAuthorize([
    PermissionValues.ApproveWorkInstruction,
  ]);

  const { authorized: authForWIView } = useAuthorize([
    PermissionValues.ViewWorkInstruction,
  ]);

  const { authorized: authorizedForWIEdit } = useAuthorize([
    PermissionValues.AuthorWorkInstruction,
    PermissionValues.EditWorkInstruction,
  ]);

  const handleDuplicateEwi = () => {
    setActive(false);
    dispatch(setEditTitleState(true));
  };

  const handleDeleteEwi = () => {
    dispatch(deleteWorkInstruction(id));
    setActive(false);
  };

  const handleClickContextMenu = () => {
    setActive(true);
    dispatch(setActiveContextMenuEwiId(id));
  };

  const handleModifyEwi = () => {
    dispatch(modifyReleasedWorkInstruction(JSON.stringify(id)));
    dispatch(setAuthoringScreenActiveStatus(true));
    dispatch(setAuthoringEwiId(id));
    setActive(false);
  };

  const onClickModify = async () => {
    const { confirmed } = await confirm.show({
      message: `Are you sure to modify the Work Instruction?`,
      confirmText: 'Ok',
    });
    if (confirmed) {
      handleModifyEwi();
    }
  };

  const onClickDelete = async () => {
    const { confirmed } = await confirm.show({
      message: `Are you sure to delete the Work Instruction?`,
      confirmText: 'Ok',
    });
    if (confirmed) {
      handleDeleteEwi();
    }
  };

  const onWICardClick = () => {
    if (
      !authForWIDelete &&
      !authForWIView &&
      !authorizedForWIEdit &&
      !authForWIApproveOnly
    )
      return;

    if (!authorizedForWIEdit && !authForWIView) return;

    if (
      status === EWI_STATUS.RELEASED ||
      status === EWI_STATUS.APPROVED ||
      status === EWI_STATUS.UNDERREVIEW ||
      (authForWIView && !authorizedForWIEdit)
    ) {
      dispatch(setWIShowPreview(true));
      dispatch(previewWorkInstruction(id));
    } else {
      dispatch(editWorkInstruction(id));
    }
    dispatch(setAuthoringScreenActiveStatus(true));
    dispatch(setAuthoringEwiId(id));
  };

  return (
    <>
      <div className={`wi-card list-group ${id}`}>
        <div
          className="list-group-items list-group-item-action flex-column align-items-start"
          onClick={() => onWICardClick()}
          aria-hidden="true"
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="title-text mb-0">{title}</h5>
          </div>
          <p className="card-content mb-0">{description}</p>
          <WICardContext lastModifiedAt={lastModifiedAt} status={status} />
        </div>
        <Popup
          className="wi-card-vertical-menu popup-theme-wrap"
          element={
            <Icon
              root="common"
              name="ellipsis-vertical"
              size="small"
              onClick={() => handleClickContextMenu()}
            />
          }
          on="click"
          position="bottom left"
          hideOnScroll
          open={!isAuthoringScreenActive && active && activeEwiId === id}
        >
          {active && (
            <VerticalMenu width={125}>
              <Icon
                className="close-popup"
                iconRoot="common"
                name="close"
                size="small"
                onClick={() => setActive(false)}
              />
              <VerticalMenu.Header>Actions</VerticalMenu.Header>

              <VerticalMenu.Item
                onClick={() => handleDuplicateEwi()}
                disabled={!authorizedForWIEdit}
              >
                Duplicate
              </VerticalMenu.Item>
              {status === EWI_STATUS.RELEASED && (
                <VerticalMenu.Item
                  onClick={() => {
                    setActive(false);
                    onClickModify();
                  }}
                  disabled={!authorizedForWIEdit || isModifiedExist()}
                >
                  Modify
                </VerticalMenu.Item>
              )}
              <VerticalMenu.Item
                onClick={() => {
                  setActive(false);
                  onClickDelete();
                }}
                disabled={!authForWIDelete}
              >
                Delete
              </VerticalMenu.Item>
            </VerticalMenu>
          )}
        </Popup>
      </div>
      {activeModalPopup === EWI_DELETE && <DeleteEWIModal open />}
    </>
  );
};

export default WICard;
