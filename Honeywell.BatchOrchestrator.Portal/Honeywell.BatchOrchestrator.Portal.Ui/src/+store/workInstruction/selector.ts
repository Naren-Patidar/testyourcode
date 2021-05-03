import { createSelector } from 'reselect';
import { RootState } from '../types';
// eslint-disable-next-line import/named
import { initialState } from './workInstrSlice';

const selectWorkIntrState = (state: RootState) =>
  state.workInstruction || initialState;

export const SelectWorkInstructionSummary = createSelector(
  [selectWorkIntrState],
  (state) => state.workInstructionSummary
);
export const SelectSelectedTask = createSelector(
  [selectWorkIntrState],
  (state) => state.selectedTask
);
export const SelectWiLimitAlertDisabled = createSelector(
  [selectWorkIntrState],
  (state) => state.wiLimitAlertDisabled
);
export const selectDraftWIs = createSelector(
  [selectWorkIntrState],
  (state) => state.draftEwiList
);
export const selectActiveWIs = createSelector(
  [selectWorkIntrState],
  (state) => state.activeEwiList
);
export const selectBranchedWIs = createSelector(
  [selectWorkIntrState],
  (state) => state.branchedEwiList
);
export const selectWIs = createSelector(
  [selectWorkIntrState],
  (state) => state.ewiList
);
export const selectWITasks = createSelector(
  [selectWorkIntrState],
  (state) => state.ewiTaskList
);
export const selectAtiveModalPopup = createSelector(
  [selectWorkIntrState],
  (state) => state.activeModalPopup
);

export const selectIsAuthoringScreenActive = createSelector(
  [selectWorkIntrState],
  (state) => state.isAuthoringScreenActive
);
export const selectIsAuthoringScreenCloseIconActive = createSelector(
  [selectWorkIntrState],
  (state) => state.isAuthoringScreenCloseIconActive
);
export const selectEwi = createSelector(
  [selectWorkIntrState],
  (state) => state.ewi
);
export const selectTags = createSelector(
  [selectWorkIntrState],
  (state) => state.recentTags
);
export const selectRecentDocuments = createSelector(
  [selectWorkIntrState],
  (state) => state.recentDocuments
);
export const selectSafetyItems = createSelector(
  [selectWorkIntrState],
  (state) => state.safetyItemList
);
export const selectIsAuthoringControlSetActive = createSelector(
  [selectWorkIntrState],
  (state) => state.isAuthoringControlSetActive
);

export const selectChangeLog = createSelector(
  [selectWorkIntrState],
  (state) => state.changeLog
);
export const selectProceduralElements = createSelector(
  [selectWorkIntrState],
  (state) => state.proceduralElements
);
export const selectActiveContextMenuEwiId = createSelector(
  [selectWorkIntrState],
  (state) => state.activeContextMenuEwiId
);
export const selectAuthoringEwiId = createSelector(
  [selectWorkIntrState],
  (state) => state.authoringEwiId
);
export const selectLastEditedAt = createSelector(
  [selectWorkIntrState],
  (state) => state.lastEditedAt
);
export const selectDuplicateTitle = createSelector(
  [selectWorkIntrState],
  (state) => state.duplicateTitle
);
export const selectEditTitleState = createSelector(
  [selectWorkIntrState],
  (state) => state.isEditTitlePopupActive
);
export const selectIsDuplicateTiteExist = createSelector(
  [selectWorkIntrState],
  (state) => state.duplicateTitleExist
);
