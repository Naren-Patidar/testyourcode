/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import {
  EwiPayload,
  ExperionTag,
  Instruction,
  RecentDocument,
  SafetyItem,
  Task,
  WorkInstruction,
  WorkInstrViewDef,
} from 'app/workInstruction/models';
import { EWI_STATUS, SAFETY_ITEMS, STATUS } from 'utils';
// eslint-disable-next-line import/no-cycle
import {
  getRecentDocuments,
  getRecentTags,
  getWorkInstrSummary,
  getWorkInstruction,
  getWorkInstructions,
} from './effects';
import { WorkInstructionState } from './types';

const defaultNewTasks = ['New Task', 'New Task', 'New Task'];
const defaultTask: Task = {
  display_seq: 1,
  key: 0,
  instruction_name: '',
  description: '',
  disabled: false,
  input: false,
  type: 'task',
  components: [],
};
const defaultInstruction: Instruction = {
  key: 0,
  label: ' ',
  description: 'New Instruction',
  disabled: false,
  input: true,
  type: '',
  required: true,
  units: '',
};

const defaultNewEwi: EwiPayload = {
  ewi_id: '',
  ewi_title: '',
  description: '',
  version: '',
  enforce_order: false,
  category: 'batch',
  status: STATUS.DRAFT,
  tags: [],
  attachments: [],
  view_content: [],
  safety: {
    key: 100000,
    checklist: [],
  },
  showPreview: false,
};

const changeLogInitialState: unknown = {};

export const initialState: WorkInstructionState = {
  loading: false,
  error: '',
  count: 0,
  ewiKeys: [],
  ewiList: [],
  draftEwiList: [],
  activeEwiList: [],
  branchedEwiList: [],
  workInstructionSummary: null,
  wiLimitAlertDisabled: false,
  isAuthoringScreenActive: false,
  isAuthoringScreenCloseIconActive: true,
  ewiTaskList: [],
  selectedTask: defaultTask,
  ewi: defaultNewEwi,
  recentTags: [],
  recentDocuments: [],
  safetyItemList: SAFETY_ITEMS,
  activeModalPopup: '',
  isAuthoringControlSetActive: false,
  changeLog: changeLogInitialState,
  proceduralElements: [],
  activeContextMenuEwiId: '',
  authoringEwiId: '',
  lastEditedAt: '',
  duplicateTitle: false,
  isEditTitlePopupActive: false,
  duplicateTitleExist: false,
};
const workInstrSliceKey = 'workInstruction';
const workInstrSlice = createSlice({
  name: workInstrSliceKey,
  initialState,
  reducers: {
    toggleAuthoringScreen: (
      state: WorkInstructionState,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isAuthoringScreenActive = payload;
      state.ewiKeys = initialState.ewiKeys;
      state.ewi = initialState.ewi;
      state.selectedTask = initialState.selectedTask;
      state.safetyItemList = initialState.safetyItemList;
      state.activeModalPopup = '';
      state.recentTags = initialState.recentTags;
      state.proceduralElements = initialState.proceduralElements;
    },
    duplicateEwi: (
      state,
      {
        payload,
      }: PayloadAction<{
        ewi: EwiPayload;
        safetyItems: SafetyItem[];
        proceduralElements: string[] | null;
        authoringEwiId?: string;
        lastEditedAt?: string;
      }>
    ) => {
      state.safetyItemList = payload.safetyItems;
      state.ewi = JSON.parse(JSON.stringify(payload.ewi));
      const eTags = payload.ewi.tags?.map((t) => {
        return { id: uuidv4(), name: t };
      });
      state.ewi.tags = eTags?.flatMap((x) => x.name);
      state.proceduralElements = payload.proceduralElements;
      state.authoringEwiId = payload.authoringEwiId;
      state.lastEditedAt = payload.lastEditedAt;
    },
    setAuthoringScreenActiveStatus: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isAuthoringScreenActive = payload;
    },
    setActiveModalPopup: (
      state: WorkInstructionState,
      { payload }: PayloadAction<string>
    ) => {
      state.activeModalPopup = payload;
    },
    setEwiTitle: (
      state: WorkInstructionState,
      { payload }: PayloadAction<string>
    ) => {
      state.ewi.ewi_title = payload;
    },
    setEwiDescription: (
      state: WorkInstructionState,
      { payload }: PayloadAction<string>
    ) => {
      state.ewi.description = payload;
    },
    setEnforceOrderInTasklist: (state, { payload }: PayloadAction<boolean>) => {
      state.ewi.enforce_order = payload;
    },
    addNewTagToExistingList: (state, { payload }: PayloadAction<string>) => {
      state.ewi.tags?.push(payload);
    },
    editTag: (
      state,
      { payload }: PayloadAction<{ tagname: string; idx: number }>
    ) => {
      if (payload.idx !== -1 && state.ewi.tags !== undefined) {
        state.ewi.tags[payload.idx] = payload.tagname;
      }
    },
    deleteTag: (state, { payload }: PayloadAction<string>) => {
      const index = state.ewi.tags?.findIndex((t) => t === payload);
      if (index !== -1 && index !== undefined) state.ewi.tags?.splice(index, 1);
    },
    suggestTag: (state, { payload }) => {
      // TODO
    },
    // setTagsOnEwiCreation: (state) => {
    //   state.ewi.tags = state.ewi.eTags?.map((et) => et.id);
    //   state.ewi.eTags = [];
    // },
    addTaskFromImportTaskList: (state, { payload }: PayloadAction<Task>) => {
      state.ewi.view_content.push(payload);
    },
    onCloseOfModalPopup: (state) => {
      state.isAuthoringScreenActive = true;
      state.activeModalPopup = '';
    },
    addNewDocument: (state, { payload }: PayloadAction<RecentDocument>) => {
      state.ewi.attachments.push({
        doc_id: payload.id,
        // display_type: null,
        title: payload.docName,
        path: payload.docPath,
        doctype: 'embed',
      });
    },
    allDocumentDelete: (state) => {
      state.ewi.attachments = [];
    },
    deleteSelectedDocument: (state, { payload }: PayloadAction<string>) => {
      const index = state.ewi.attachments.findIndex(
        (rd) => rd.doc_id === payload
      );
      if (index !== -1) {
        state.ewi.attachments.splice(index, 1);
      }
    },
    addCustomSafetyItem: (state, { payload }: PayloadAction<SafetyItem>) => {
      state.safetyItemList?.forEach((si) => {
        si.isFocused = false;
      });
      state.safetyItemList?.push(payload);

      const safetyListToSave: string[] = [];
      state.safetyItemList?.forEach((item: SafetyItem) => {
        if (item.isChecked) {
          safetyListToSave.push(item.name);
        }
      });
      state.ewi.safety.checklist = safetyListToSave;
    },
    deleteCustomSafetyItem: (state, { payload }: PayloadAction<number>) => {
      const index = state.safetyItemList?.findIndex((si) => si.id === payload);
      if (index !== -1 && index !== undefined) {
        state.safetyItemList?.splice(index, 1);
      }
      // eslint-disable-next-line no-return-assign
      state.safetyItemList?.forEach((e, i) => (e.id = i + 1));
      const safetyListToSave: string[] = [];
      state.safetyItemList?.forEach((item: SafetyItem) => {
        if (item.isChecked) {
          safetyListToSave.push(item.name);
        }
      });
      state.ewi.safety.checklist = safetyListToSave;
    },
    saveCheckedSafetyItems: (
      state,
      { payload }: PayloadAction<SafetyItem[]>
    ) => {
      const safetyListToSave: string[] = [];
      payload.forEach((item: SafetyItem) => {
        if (item.isChecked) {
          safetyListToSave.push(item.name);
        }
      });
      state.ewi.safety.checklist = safetyListToSave;
    },
    setCheckedStatusInSafetyItems: (
      state,
      { payload }: PayloadAction<number>
    ) => {
      const index = state.safetyItemList?.findIndex((si) => si.id === payload);
      if (index !== -1 && index !== undefined) {
        if (state.safetyItemList !== null)
          state.safetyItemList[index].isChecked = !state.safetyItemList[index]
            .isChecked;
      }
      const safetyListToSave: string[] = [];
      state.safetyItemList?.forEach((item: SafetyItem) => {
        if (item.isChecked) {
          safetyListToSave.push(item.name);
        }
      });
      state.ewi.safety.checklist = safetyListToSave;
    },
    canEditSafetyItemText: (
      state,
      { payload }: PayloadAction<{ id: number; value: boolean }>
    ) => {
      state.safetyItemList?.forEach((si) => {
        if (si.id === payload.id) {
          si.isFocused = payload.value;
        } else {
          si.isFocused = false;
        }
      });
    },
    onChangeOfSafetyItemText: (
      state,
      { payload }: PayloadAction<{ id: number; itemName: string }>
    ) => {
      const index = state.safetyItemList?.findIndex(
        (si) => si.id === payload.id
      );
      if (index !== -1 && index !== undefined) {
        if (state.safetyItemList !== null)
          state.safetyItemList[index].name = payload.itemName;
      }
      const safetyListToSave: string[] = [];
      state.safetyItemList?.forEach((item: SafetyItem) => {
        if (item.isChecked) {
          safetyListToSave.push(item.name);
        }
      });
      state.ewi.safety.checklist = safetyListToSave;
    },
    setWiLimitAlertPopupDisabled: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.wiLimitAlertDisabled = payload;
    },
    setSelectedTaskToEdit: (state, { payload }: PayloadAction<Task | null>) => {
      state.selectedTask = payload;
    },
    onSaveTasksDetailsEdit: (state, { payload }: PayloadAction<number>) => {
      const index = state.ewi.view_content.findIndex((e) => e.key === payload);
      if (index !== -1) state.ewi.view_content.splice(index, 1);

      if (state.selectedTask !== null)
        state.ewi.view_content.push(state.selectedTask);
    },
    editTaskNameHandler: (state, { payload }: PayloadAction<string>) => {
      if (state.selectedTask !== null)
        state.selectedTask.instruction_name = payload;
    },
    addNewTaskToExistingList: (state) => {
      const key = Math.floor(100000 + Math.random() * 900000);
      const newTask = {
        ...defaultTask,
        key,
        display_seq: state.ewi.view_content.length + 1,
        instruction_name: `New Task ${key}`,
      };
      state.ewi.view_content.push(newTask);
    },
    createDefaultThreeTaskList: (state) => {
      defaultNewTasks.forEach((ele, i) => {
        const currentDefaultTask = {
          ...defaultTask,
          key: Math.floor(100000 + Math.random() * 900000) + (i + 1),
          display_seq: i + 1,
          instruction_name: `${ele} ${i + 1}`,
        };
        state.ewi.view_content.push(currentDefaultTask);
      });
    },
    deleteTaskFromTaskList: (state, { payload }: PayloadAction<number>) => {
      const index = state.ewi.view_content.findIndex((x) => x.key === payload);
      if (index !== -1) {
        state.ewi.view_content.splice(index, 1);
        state.ewi.view_content.forEach((task, i) => {
          task.display_seq = i + 1;
        });
      }
    },
    moveTaskInTaskList: (
      state: WorkInstructionState,
      { payload }: PayloadAction<{ ewitasks: any }>
    ) => {
      state.ewi.view_content = payload.ewitasks;
    },
    addInstructionOnDragDrop: (state, { payload }: PayloadAction<string>) => {
      const newInstruction = { ...defaultInstruction, type: payload };
      state.selectedTask?.components.push(newInstruction);
    },
    setIsAuthoringControlSetActive: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.isAuthoringControlSetActive = payload;
    },
    saveTaskDetailsFromAuthoringControlSet: (
      state,
      { payload }: PayloadAction<Task>
    ) => {
      const index = state.ewi.view_content.findIndex(
        (e) => e.key === payload.key
      );

      if (state.selectedTask !== null)
        if (index !== -1) state.ewi.view_content[index] = payload;
    },
    saveChangeLog: (state, { payload }: PayloadAction<any>) => {
      state.changeLog = payload;
    },
    emptyChangeLog: (state) => {
      state.changeLog = {};
    },
    setProceduralElements: (state, { payload }: PayloadAction<string[]>) => {
      state.proceduralElements = payload;
    },
    onCloseOfDeleteModalPopup: (state) => {
      state.activeModalPopup = '';
      state.proceduralElements = [];
    },
    setActiveContextMenuEwiId: (state, { payload }: PayloadAction<string>) => {
      state.activeContextMenuEwiId = payload;
    },
    setAuthoringEwiId: (state, { payload }: PayloadAction<string>) => {
      state.authoringEwiId = payload;
    },
    setLastEditedAt: (state, { payload }: PayloadAction<string>) => {
      state.lastEditedAt = payload;
    },
    setDuplicateTitle: (state, { payload }: PayloadAction<boolean>) => {
      state.duplicateTitle = payload;
    },
    setIsDuplicateTitleExist: (state, { payload }: PayloadAction<boolean>) => {
      state.duplicateTitleExist = payload;
    },
    clearEwi: (state) => {
      state.safetyItemList = [];
      state.ewi = defaultNewEwi;
      state.proceduralElements = [];
      state.authoringEwiId = '';
      state.isAuthoringScreenActive = false;
    },
    setWIShowPreview: (state, { payload }: PayloadAction<boolean>) => {
      state.ewi.showPreview = payload;
    },
    setEditTitleState: (state, { payload }: PayloadAction<boolean>) => {
      state.isEditTitlePopupActive = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getWorkInstrSummary.fulfilled, (state, { payload }) => {
      state.workInstructionSummary = payload;
    });
    builder.addCase(
      getWorkInstructions.pending,
      (state: WorkInstructionState) => {
        state.loading = true;
      }
    );
    builder.addCase(
      getWorkInstructions.fulfilled,
      (state: WorkInstructionState, { payload }) => {
        state.loading = false;
        state.error = '';
        const allEwiList = [...payload];
        if (allEwiList && allEwiList.length > 0) {
          allEwiList.sort((ewiA: WorkInstruction, ewiB: WorkInstruction) => {
            return (
              Date.parse(ewiB.lastModifiedAt) - Date.parse(ewiA.lastModifiedAt)
            );
          });
        }
        const draftEwiList =
          allEwiList &&
          allEwiList.filter((ewi: WorkInstruction) => {
            return (
              ewi.status === EWI_STATUS.DRAFT ||
              (ewi.status === EWI_STATUS.UNDERREVIEW && !ewi.isModified) ||
              ewi.status === EWI_STATUS.REWORK
            );
          });
        const activeEwiList =
          allEwiList &&
          allEwiList.filter((ewi) => {
            return (
              ewi.status === EWI_STATUS.APPROVED ||
              ewi.status === EWI_STATUS.RELEASED
            );
          });
        const branchedEwiList =
          allEwiList &&
          allEwiList.filter((ewi) => {
            return ewi.isModified && ewi.status !== EWI_STATUS.RELEASED;
          });
        state.ewiList = allEwiList;
        state.draftEwiList = draftEwiList;
        state.activeEwiList = activeEwiList;
        state.branchedEwiList = branchedEwiList;
      }
    );
    builder.addCase(
      getWorkInstructions.rejected,
      (state: WorkInstructionState, { payload }) => {
        state.loading = false;
        state.error = 'ERROR';
      }
    );
    builder.addCase(
      getWorkInstruction.pending,
      (state: WorkInstructionState, { payload }) => {
        state.loading = true;
        state.error = '';
      }
    );
    builder.addCase(
      getWorkInstruction.fulfilled,
      (
        state: WorkInstructionState,
        { payload }: PayloadAction<WorkInstrViewDef>
      ) => {
        state.error = '';
        state.loading = false;
        const ewiPayload: EwiPayload = JSON.parse(payload.viewDefinition);
        state.ewiTaskList = ewiPayload.view_content;
      }
    );
    builder.addCase(
      getWorkInstruction.rejected,
      (state: WorkInstructionState, { payload }) => {
        state.loading = false;
        state.error = 'ERROR';
      }
    );
    builder.addCase(
      getRecentDocuments.pending,
      (state: WorkInstructionState, { payload }) => {
        state.loading = true;
        state.error = '';
      }
    );
    builder.addCase(
      getRecentDocuments.fulfilled,
      (
        state: WorkInstructionState,
        { payload }: PayloadAction<RecentDocument[]>
      ) => {
        state.error = '';
        state.loading = false;
        state.recentDocuments = payload;
      }
    );
    builder.addCase(
      getRecentDocuments.rejected,
      (state: WorkInstructionState, { payload }) => {
        state.loading = false;
        state.error = 'ERROR';
      }
    );
    builder.addCase(
      getRecentTags.fulfilled,
      (
        state: WorkInstructionState,
        { payload }: PayloadAction<ExperionTag[]>
      ) => {
        state.recentTags = payload;
      }
    );
  },
});

export const { reducer, name: sliceKey } = workInstrSlice;

export const {
  toggleAuthoringScreen,
  duplicateEwi,
  setAuthoringScreenActiveStatus,
  setActiveModalPopup,
  setEwiDescription,
  setEwiTitle,
  setEnforceOrderInTasklist,
  addNewTagToExistingList,
  editTag,
  suggestTag,
  deleteTag,
  addTaskFromImportTaskList,
  onCloseOfModalPopup,
  addNewDocument,
  allDocumentDelete,
  deleteSelectedDocument,
  addCustomSafetyItem,
  deleteCustomSafetyItem,
  saveCheckedSafetyItems,
  setCheckedStatusInSafetyItems,
  canEditSafetyItemText,
  onChangeOfSafetyItemText,
  setWiLimitAlertPopupDisabled,
  setSelectedTaskToEdit,
  onSaveTasksDetailsEdit,
  editTaskNameHandler,
  deleteTaskFromTaskList,
  moveTaskInTaskList,
  createDefaultThreeTaskList,
  addNewTaskToExistingList,
  addInstructionOnDragDrop,
  setIsAuthoringControlSetActive,
  saveTaskDetailsFromAuthoringControlSet,
  saveChangeLog,
  emptyChangeLog,
  setProceduralElements,
  onCloseOfDeleteModalPopup,
  setActiveContextMenuEwiId,
  setAuthoringEwiId,
  setLastEditedAt,
  setIsDuplicateTitleExist,
  clearEwi,
  setDuplicateTitle,
  setWIShowPreview,
  setEditTitleState,
} = workInstrSlice.actions;
