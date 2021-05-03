export interface UserPermission {
  taskId: number;
  taskName: string;
}

export enum PermissionValues {
  CreateFormulaSetAndFormula = 1,
  ModifyFormulaSetAndFormula,
  DeleteFormulaSetAndFormula,
  CreateBatch,
  ApprovaAndReject,
  UpdatePermission,
  ViewFormulaSetAndFormula,
  GenericAccess,
  AuthorWorkInstruction,
  ImportWorkInstruction,
  EditWorkInstruction,
  ApproveWorkInstruction,
  ViewWorkInstruction,
  DeleteWorkInstruction,
  ExportWorkInstruction,
  CreateProductionCampaign,
  EditProductionCampaign,
  StartManageProductionCampaign,
  MonitorProductionCampaign,
  ApproveProductionCampaign,
  ImportExportFormulaNdEWI,
}
