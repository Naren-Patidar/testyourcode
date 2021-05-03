/* eslint-disable import/named */
// [IMPORT NEW CONTAINERSTATE ABOVE] < Needed for generating containers seamlessly
import { AppShellState } from '+store/app-shell/types';
import { WorkInstructionState } from '+store/workInstruction/types';
import {
  CampaignState,
  CampaignsState,
  CampaignSummaryState,
} from '+store/campaign/types';
import { UserProfileState } from '+store/user-profile/types';
import { RoleManagementState } from '+store/role-management/types';
import { NotificationGroup } from '+store/notification/types';
import { ImportExportState } from '+store/importExport/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
  Properties are optional because they are injected when the components are mounted sometime in your application's life. 
  So, not available always
*/
export interface RootState {
  appshell: AppShellState;
  editCampaign?: CampaignState;
  campaigns?: CampaignsState;
  userProfile?: UserProfileState;
  roleManagement?: RoleManagementState;
  // [INSERT NEW REDUCER KEY ABOVE] < Needed for generating containers seamlessly
  workInstruction: WorkInstructionState;
  notification: NotificationGroup;
  importExport: ImportExportState;
  campaignSummary?: CampaignSummaryState;
}
