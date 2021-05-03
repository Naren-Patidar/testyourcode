/* eslint-disable react/jsx-boolean-value */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, Input, Icon, Tooltip } from '@scuf/common';
import { AuthoringControlSet } from 'framework-authoring';
import { useInjectReducer } from 'utils/@reduxjs';
import { INSTRUCTIONS_LIMIT } from 'utils/app-constants';
import { useDebouncedCallback } from 'use-debounce';
import WITitleModal from '../WITitleModal/WITitleModal';
import {
  sliceKey,
  reducer,
  setWiLimitAlertPopupDisabled,
  setIsAuthoringControlSetActive,
  saveTaskDetailsFromAuthoringControlSet,
} from '+store/workInstruction/workInstrSlice';
import AlertPopup from '../../components/AlertPopup/AlertPopup';

import {
  SelectSelectedTask,
  selectActiveWIs,
  selectBranchedWIs,
  selectDraftWIs,
  SelectWiLimitAlertDisabled,
  SelectWorkInstructionSummary,
  selectIsAuthoringControlSetActive,
  selectEwi,
  selectEditTitleState,
} from '+store/workInstruction/selector';

import {
  getWorkInstructions,
  getWorkInstrSummary,
} from '+store/workInstruction/effects';

import WIGroup from '../WIGroup/WIGroup';
import WIAuthoring from '../WIAuthoring/WIAuthoring';
import './WILayout.scss';

const WILayout: React.FC = () => {
  useInjectReducer({ key: sliceKey, reducer });

  const [wiLimitAlertPopup, setWiLimitAlertPopup] = useState(false);
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();
  const wiLimitAlertDisabled = useSelector(SelectWiLimitAlertDisabled);

  const debounce = useDebouncedCallback(
    (value) => {
      dispatch(
        getWorkInstructions({
          description: '',
          isDefaultSearch: false,
          searchQuery: value,
          title: '',
          workInstrId: 0,
        })
      );
    },
    750,
    { maxWait: 2000 }
  );

  useEffect(() => {
    debounce('');
    if (!wiLimitAlertDisabled) dispatch(getWorkInstrSummary());
  }, [debounce, dispatch, wiLimitAlertDisabled]);

  const draftEWIs = useSelector(selectDraftWIs);
  const activeEWIs = useSelector(selectActiveWIs);
  const branchedEWIs = useSelector(selectBranchedWIs);
  const workInstructionSummary = useSelector(SelectWorkInstructionSummary);
  const selectedTask = useSelector(SelectSelectedTask);
  const isAuthoringControlSetActive = useSelector(
    selectIsAuthoringControlSetActive
  );
  const { showPreview } = useSelector(selectEwi);

  useEffect(() => {
    const totalEwis =
      draftEWIs.length + activeEWIs.length + branchedEWIs.length;
    let wiMaxLimit = 0;
    if (workInstructionSummary && workInstructionSummary.wiMaxLimit) {
      wiMaxLimit =
        (workInstructionSummary.wiMaxLimit * INSTRUCTIONS_LIMIT) / 100;
    }
    if (!wiLimitAlertDisabled && wiMaxLimit && wiMaxLimit < totalEwis) {
      setWiLimitAlertPopup(true);
    }
  }, [
    workInstructionSummary,
    wiLimitAlertDisabled,
    draftEWIs.length,
    activeEWIs.length,
    branchedEWIs.length,
  ]);

  const handleClose = (value?) => {
    setWiLimitAlertPopupDisabled(true);
    setWiLimitAlertPopup(value);
  };

  const handleAuthoringControl = (value?) => {
    dispatch(saveTaskDetailsFromAuthoringControlSet(value));
    dispatch(setIsAuthoringControlSetActive(false));
  };

  return (
    <Grid className="wi-layout">
      <Grid.Row>
        <div className="wi__search_input">
          <Tooltip
            element={
              <Input
                value={search}
                placeholder="Search"
                iconPosition="left"
                icon={
                  <Icon name="search" root="common" exactSize="0.5833rem" />
                }
                className="search"
                onChange={(value) => {
                  setSearch(value);
                  debounce(value);
                }}
              />
            }
            content="Search with title, description, tag, id"
            position="bottom left"
          />
        </div>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={4}>
          <Card>
            <Card.Content>
              <WIGroup heading="Draft" showButton={true} items={draftEWIs} />
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={4}>
          <Card>
            <Card.Content>
              <WIGroup heading="Active" showButton={false} items={activeEWIs} />
            </Card.Content>
          </Card>
        </Grid.Column>
        <Grid.Column width={4}>
          <Card>
            <Card.Content>
              <WIGroup
                heading="Modified"
                showButton={false}
                items={branchedEWIs}
              />
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
      <WIAuthoring />
      <WITitleModal />
      <div>
        {isAuthoringControlSetActive &&
          selectedTask !== null &&
          !!selectedTask.key && (
            <AuthoringControlSet
              previewMode={!!showPreview}
              viewJson={selectedTask}
              getViewJson={handleAuthoringControl}
            />
          )}
      </div>
      <AlertPopup
        messageBoxItem={`Instruction Sets reached its threshold ${INSTRUCTIONS_LIMIT}% limit`}
        open={wiLimitAlertPopup}
        setOpen={handleClose}
      />
    </Grid>
  );
};

export default WILayout;
