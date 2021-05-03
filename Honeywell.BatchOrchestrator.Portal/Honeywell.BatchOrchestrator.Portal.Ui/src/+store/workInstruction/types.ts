import {
  EwiPayload,
  ExperionTag,
  RecentDocument,
  SafetyItem,
  Task,
  WorkInstrSummary,
  WorkInstruction,
} from '../../app/workInstruction/models';

export interface WorkInstructionState {
  duplicateTitleExist?: boolean;
  loading: boolean;
  error: string | null;
  count: number;
  ewiKeys: [];
  ewiList: WorkInstruction[];
  draftEwiList: WorkInstruction[];
  activeEwiList: WorkInstruction[];
  branchedEwiList: WorkInstruction[];
  workInstructionSummary: WorkInstrSummary | null;
  wiLimitAlertDisabled: boolean;
  isAuthoringScreenActive: boolean;
  isAuthoringScreenCloseIconActive: true;
  ewiTaskList: Task[];
  selectedTask: Task | null;
  ewi: EwiPayload;
  recentTags: ExperionTag[];
  recentDocuments: RecentDocument[];
  safetyItemList: SafetyItem[] | null;
  activeModalPopup: string;
  isAuthoringControlSetActive: boolean;
  changeLog: any;
  proceduralElements: string[] | null;
  activeContextMenuEwiId: string;
  authoringEwiId?: string;
  lastEditedAt?: string;
  duplicateTitle?: boolean;
  isEditTitlePopupActive?: boolean;
}
