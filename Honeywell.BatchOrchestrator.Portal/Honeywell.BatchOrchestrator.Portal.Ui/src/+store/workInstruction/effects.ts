/* eslint-disable array-callback-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/named */
import { createAsyncThunk } from '@reduxjs/toolkit';
import { RESPONSE_CODE, SAFETY_ITEMS, EWI_DELETE } from 'utils/app-constants';
import { workInstrAPI } from '../../app/workInstruction/services/workInstrAPI';
import {
  EwiPayload,
  SafetyItem,
  WorkInstrFilter,
  WorkInstrViewDef,
  DocumentToAdd,
  DuplicateWorkInstr,
} from '../../app/workInstruction/models';

// eslint-disable-next-line import/no-cycle
import {
  duplicateEwi,
  setActiveModalPopup,
  setProceduralElements,
  saveChangeLog,
  toggleAuthoringScreen,
  setDuplicateTitle,
  setAuthoringScreenActiveStatus,
  setIsDuplicateTitleExist,
  setEditTitleState,
  setEwiTitle,
  setActiveContextMenuEwiId,
} from './workInstrSlice';

const setSafetyItems = (safetyItems: string[]) => {
  const safetyItemList = SAFETY_ITEMS;
  const returnItems: SafetyItem[] = [];
  const matchingItems: string[] = [];
  const customItems: string[] = [];

  !!safetyItems &&
    !!safetyItems.length &&
    safetyItems.map((item: string) => {
      safetyItemList.some((x) => x.name === item)
        ? matchingItems.push(item)
        : customItems.push(item);
    });

  safetyItemList.map((item: SafetyItem) => {
    if (matchingItems.some((y) => y === item.name))
      returnItems.push({ ...item, isChecked: true });
    else returnItems.push(item);
  });

  !!customItems &&
    !!customItems.length &&
    customItems.map((x) => {
      returnItems.push({
        id: returnItems.length + 1,
        name: x,
        isCustom: true,
        isChecked: true,
        isFocused: false,
        iconClassName: 'safety-custom',
      });
    });
  return returnItems;
};

export const getWorkInstruction = createAsyncThunk(
  'workInstruction/getWorkInstruction',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await workInstrAPI.getWorkInstruction(id);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
// export const cloneWorkInstruction = createAsyncThunk(
//   'workInstruction/cloneWorkInstruction',
//   // eslint-disable-next-line consistent-return
//   async (id: string, { dispatch, rejectWithValue }) => {
//     try {
//       const response = await workInstrAPI.duplicateWorkInstruction(id);
//       if (
//         response.status === RESPONSE_CODE.SUCCESS ||
//         response.status === RESPONSE_CODE.SUCCESSFUL
//       ) {
//         const clonedEWI: EwiPayload = JSON.parse(response.data.viewDefinition);
//         dispatch(
//           duplicateEwi({
//             ewi: clonedEWI,
//             safetyItems: setSafetyItems(clonedEWI?.safety?.checklist),
//             proceduralElements:
//               response.data.proceduralElements === undefined
//                 ? []
//                 : response.data.proceduralElements,
//             authoringEwiId: response.data.id,
//             lastEditedAt: response.data.lastModifiedAt,
//           })
//         );
//         dispatch(setDuplicateTitle(true));
//       }
//       // return response.data;
//     } catch (err) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );
export const previewWorkInstruction = createAsyncThunk(
  'workInstruction/previewWorkInstruction',
  // eslint-disable-next-line consistent-return
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await workInstrAPI.getWorkflowChanges(id);
      if (
        response.status === RESPONSE_CODE.SUCCESS ||
        response.status === RESPONSE_CODE.SUCCESSFUL
      ) {
        const ewiPayload: EwiPayload = JSON.parse(
          response.data.workInstr.viewDefinition
        );
        ewiPayload.showPreview = true;

        // clonedEWI.attachments = [];
        dispatch(
          duplicateEwi({
            ewi: ewiPayload,
            safetyItems: setSafetyItems(ewiPayload.safety?.checklist),
            proceduralElements:
              response.data.workInstr.proceduralElements === undefined
                ? []
                : response.data.workInstr.proceduralElements,
            authoringEwiId: response.data.id,
            lastEditedAt: response.data.workInstr.lastModifiedAt,
          })
        );

        dispatch(saveChangeLog(response.data.changeLog));
      }
      // return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const editWorkInstruction = createAsyncThunk(
  'workInstruction/editWorkInstruction',
  // eslint-disable-next-line consistent-return
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await workInstrAPI.getWorkInstruction(id);
      if (
        response.status === RESPONSE_CODE.SUCCESS ||
        response.status === RESPONSE_CODE.SUCCESSFUL
      ) {
        const savedEWI: EwiPayload = JSON.parse(response.data.viewDefinition);
        savedEWI.showPreview = false;
        dispatch(
          duplicateEwi({
            ewi: savedEWI,
            safetyItems: setSafetyItems(savedEWI.safety?.checklist),
            proceduralElements:
              response.data.proceduralElements === undefined
                ? []
                : response.data.proceduralElements,
            authoringEwiId: response.data.id,
            lastEditedAt: response.data.lastModifiedAt,
          })
        );
        dispatch(setDuplicateTitle(false));
      }
      // return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getWorkInstructions = createAsyncThunk(
  'workInstruction/getWorkInstructions',
  async (workInstrFilter: WorkInstrFilter, { rejectWithValue }) => {
    try {
      const response = await workInstrAPI.getWorkInstructions(workInstrFilter);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getWorkInstrSummary = createAsyncThunk(
  'workInstruction/getWorkInstrSummary',
  async (_, { rejectWithValue }) => {
    try {
      const response = await workInstrAPI.getWorkInstrSummary();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getRecentTags = createAsyncThunk(
  'workInstruction/getRecentTags',
  async (_, { rejectWithValue }) => {
    try {
      const response = await workInstrAPI.getRecentTags();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const getRecentDocuments = createAsyncThunk(
  'workInstruction/getRecentDocuments',
  async (_, { rejectWithValue }) => {
    try {
      const response = await workInstrAPI.getRecentDocuments();
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const deleteWorkInstruction = createAsyncThunk(
  'workInstruction/deleteWorkInstruction',
  // eslint-disable-next-line consistent-return
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await workInstrAPI.deleteWorkInstruction(id);
      dispatch(
        getWorkInstructions({
          description: '',
          isDefaultSearch: false,
          searchQuery: '',
          title: '',
          workInstrId: 0,
        })
      );
      return response.data;
    } catch (err) {
      if (
        !!err.response.data &&
        !!err.response.data.Code &&
        err.response.data.Code === 40006
      ) {
        dispatch(setActiveModalPopup(EWI_DELETE));
        if (err.response.data.Message) {
          const message = err.response.data.Message;
          const items: string[] = message.split(',');
          dispatch(setProceduralElements(items));
        }
      } else {
        return rejectWithValue(err.response.data);
      }
    }
  }
);
export const createWorkInstruction = createAsyncThunk(
  'workInstruction/createWorkInstruction',
  async (viewDefination: WorkInstrViewDef, { dispatch, rejectWithValue }) => {
    try {
      const response = await workInstrAPI.createWorkInstruction(viewDefination);
      if (
        response.status === RESPONSE_CODE.SUCCESS ||
        response.status === RESPONSE_CODE.SUCCESSFUL
      ) {
        dispatch(toggleAuthoringScreen(false));
        dispatch(
          getWorkInstructions({
            description: '',
            isDefaultSearch: false,
            searchQuery: '',
            title: '',
            workInstrId: 0,
          })
        );
        dispatch(setDuplicateTitle(false));
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const submitWorkInstructionForApproval = createAsyncThunk(
  'workInstruction/submitWorkInstructionForApproval',
  async (viewDefination: WorkInstrViewDef, { dispatch, rejectWithValue }) => {
    try {
      const response = await workInstrAPI.submitWorkInstructionForApproval(
        viewDefination
      );
      if (
        response.status === RESPONSE_CODE.SUCCESS ||
        response.status === RESPONSE_CODE.SUCCESSFUL
      ) {
        dispatch(toggleAuthoringScreen(false));
        dispatch(
          getWorkInstructions({
            description: '',
            isDefaultSearch: false,
            searchQuery: '',
            title: '',
            workInstrId: 0,
          })
        );
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const updateWorkInstruction = createAsyncThunk(
  'workInstruction/updateWorkInstruction',
  async (viewDefination: WorkInstrViewDef, { dispatch, rejectWithValue }) => {
    try {
      const response = await workInstrAPI.updateWorkInstruction(viewDefination);
      if (
        response.status === RESPONSE_CODE.SUCCESS ||
        response.status === RESPONSE_CODE.SUCCESSFUL
      ) {
        dispatch(toggleAuthoringScreen(false));
        dispatch(
          getWorkInstructions({
            description: '',
            isDefaultSearch: false,
            searchQuery: '',
            title: '',
            workInstrId: 0,
          })
        );
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const addNewTag = createAsyncThunk(
  'workInstruction/addNewTag',
  // eslint-disable-next-line consistent-return
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await workInstrAPI.addNewTag(id);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const addNewToRecentDocuments = createAsyncThunk(
  'workInstruction/addNewDocument',
  // eslint-disable-next-line consistent-return
  async (ewiDocument: DocumentToAdd, { dispatch, rejectWithValue }) => {
    try {
      const response = await workInstrAPI.addNewToRecentDocuments(ewiDocument);
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const modifyReleasedWorkInstruction = createAsyncThunk(
  'workInstruction/modifyReleasedWorkInstruction',
  // eslint-disable-next-line consistent-return
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await workInstrAPI.modifyReleasedWorkInstruction(id);
      if (
        response.status === RESPONSE_CODE.SUCCESS ||
        response.status === RESPONSE_CODE.SUCCESSFUL
      ) {
        const modifiedEWI: EwiPayload = JSON.parse(
          response.data.viewDefinition
        );
        dispatch(
          duplicateEwi({
            ewi: modifiedEWI,
            safetyItems: setSafetyItems(modifiedEWI?.safety?.checklist),
            proceduralElements:
              response.data.proceduralElements === undefined
                ? []
                : response.data.proceduralElements,
            authoringEwiId: response.data.id,
            lastEditedAt: response.data.lastModifiedAt,
          })
        );
        dispatch(
          getWorkInstructions({
            description: '',
            isDefaultSearch: false,
            searchQuery: '',
            title: '',
            workInstrId: 0,
          })
        );
        dispatch(setDuplicateTitle(false));
      }
      // return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
export const duplicateWorkinstruction = createAsyncThunk(
  'workInstruction/duplicateWorkinstruction',
  async (
    { title, srcEWIId }: { title: string; srcEWIId: string },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await workInstrAPI.checkDuplicateTitle(title);
      if (!response.data) {
        const duplicatePayload: DuplicateWorkInstr = {
          id: srcEWIId,
          title,
        };
        const ewiResponse = await workInstrAPI.duplicateWorkInstruction(
          duplicatePayload
        );
        if (
          ewiResponse.status === RESPONSE_CODE.SUCCESS ||
          ewiResponse.status === RESPONSE_CODE.SUCCESSFUL
        ) {
          const ewi: EwiPayload = JSON.parse(ewiResponse.data.viewDefinition);
          dispatch(setEditTitleState(false));
          dispatch(setIsDuplicateTitleExist(false));
          dispatch(setAuthoringScreenActiveStatus(true));
          dispatch(
            duplicateEwi({
              ewi,
              safetyItems: setSafetyItems(ewi?.safety?.checklist),
              proceduralElements:
                ewiResponse.data.proceduralElements === undefined
                  ? []
                  : ewiResponse.data.proceduralElements,
              authoringEwiId: ewiResponse.data.id,
              lastEditedAt: ewiResponse.data.lastModifiedAt,
            })
          );
          dispatch(setActiveContextMenuEwiId(''));
          dispatch(
            getWorkInstructions({
              description: '',
              isDefaultSearch: false,
              searchQuery: '',
              title: '',
              workInstrId: 0,
            })
          );
        }
      } else {
        dispatch(setIsDuplicateTitleExist(true));
      }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
