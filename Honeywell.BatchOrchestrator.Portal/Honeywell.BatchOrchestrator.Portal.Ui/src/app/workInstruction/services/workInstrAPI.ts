/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { httpClient } from 'core/http-client/http-client';
import {
  ExperionTag,
  RecentDocument,
  WorkInstrFilter,
  WorkInstrSummary,
  WorkInstruction,
  WorkInstrViewDef,
  DocumentToAdd,
  DuplicateWorkInstr,
} from '../models';

// controller name
const CONTROLLER = 'workinstr';

// api routes/endpoint
const GET_WORKINSTRUCTIONS = 'getEWIList';
const GET_WORKINSTRUCTION_SUMMARY = 'getWorkInstrSummary';
const GET_WORKINSTRUCTION = 'GetEWI';
const GET_RECENT_TAGS = 'RecentTags';
const GET_RECENT_DOCUMENTS = 'RecentDocs';
const DELETE_WORK_INSTRUCTION = 'DeleteWorkInstr';
const CREATE_WORK_INSTRUCTION = 'workInstr';
const EWI_WORKFLOW = 'Workflow';
const EWI_DUPLICATE = 'Duplicate';
const SUBMIT_FOR_APPROVAL = 'SubmitForApproval';
const EXPORT_WORK_INSTRUCTION = 'ExportWorkInstructions';
const WORKFLOW = 'Workflow';
const GET_WORKINSTRUCTION_CHANGES = 'WorkInstrChanges';
const DEFAULT_PAGE_COUNT = 10;
const APPROVE = 'approve';
const REJECT = 'reject';
const MODIFY = 'Modify';

export const workInstrAPI = {
  getWorkInstruction: (id: string) =>
    httpClient.get<WorkInstrViewDef>(
      `${CONTROLLER}/${GET_WORKINSTRUCTION}/${id}`
    ),
  getWorkInstructions: (payload: WorkInstrFilter) =>
    httpClient.post<WorkInstruction[]>(
      `${CONTROLLER}/${GET_WORKINSTRUCTIONS}`,
      payload
    ),
  getWorkInstrSummary: () =>
    httpClient.get<WorkInstrSummary>(
      `${CONTROLLER}/${GET_WORKINSTRUCTION_SUMMARY}`
    ),
  getRecentTags: () =>
    httpClient.get<ExperionTag[]>(`${CONTROLLER}/${GET_RECENT_TAGS}`),
  getRecentDocuments: () =>
    httpClient.get<RecentDocument[]>(
      `${CONTROLLER}/${GET_RECENT_DOCUMENTS}/${DEFAULT_PAGE_COUNT}`
    ),
  deleteWorkInstruction: (payload: string) =>
    httpClient.delete(`${CONTROLLER}/${DELETE_WORK_INSTRUCTION}/${payload}`),
  createWorkInstruction: (payload: WorkInstrViewDef) =>
    httpClient.post(`${CONTROLLER}/${CREATE_WORK_INSTRUCTION}`, payload),
  exportWorkInstructions: (payload: []) =>
    httpClient.post(`${CONTROLLER}/${EXPORT_WORK_INSTRUCTION}`, payload),
  getPendingApprovals: () =>
    httpClient.get(`WorkInstr/Workflow/pendingapprovals`),
  getWorkflowChanges: (id: string) =>
    httpClient.get(
      `${CONTROLLER}/${WORKFLOW}/${GET_WORKINSTRUCTION_CHANGES}/${id}`
    ),
  submitWorkInstructionForApproval: (payload: WorkInstrViewDef) =>
    httpClient.put<WorkInstrViewDef>(
      `${CONTROLLER}/${EWI_WORKFLOW}/${SUBMIT_FOR_APPROVAL}`,
      payload
    ),
  // duplicateWorkInstruction: (payload: string) =>
  //   httpClient.post<WorkInstrViewDef>(
  //     `${CONTROLLER}/${EWI_DUPLICATE}`,
  //     payload
  //   ),
  duplicateWorkInstruction: (payload: DuplicateWorkInstr) =>
    httpClient.post(`${CONTROLLER}/${EWI_DUPLICATE}`, payload),
  updateWorkInstruction: (payload: WorkInstrViewDef) =>
    httpClient.put(
      `${CONTROLLER}/${CREATE_WORK_INSTRUCTION}/${payload.id}`,
      payload
    ),
  approvePendingWorkInstruction: (payload) =>
    httpClient.post(`${CONTROLLER}/${WORKFLOW}/${APPROVE}`, payload),
  rejectPendingWorkInstruction: (payload) =>
    httpClient.post(`${CONTROLLER}/${WORKFLOW}/${REJECT}`, payload),
  addNewTag: (payload: string) =>
    httpClient.post(`${CONTROLLER}/${GET_RECENT_TAGS}`, payload),
  addNewToRecentDocuments: (payload: DocumentToAdd) =>
    httpClient.post(`${CONTROLLER}/${GET_RECENT_DOCUMENTS}`, payload),
  modifyReleasedWorkInstruction: (payload: string) =>
    httpClient.post(`${CONTROLLER}/${MODIFY}`, payload),
  checkDuplicateTitle: (title: string) =>
    httpClient.get(`${CONTROLLER}/DuplicateTitleCheck/${title}`),
};
