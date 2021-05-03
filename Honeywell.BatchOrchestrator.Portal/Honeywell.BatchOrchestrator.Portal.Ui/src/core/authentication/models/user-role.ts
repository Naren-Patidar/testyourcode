export interface UserRole {
  roleId: number;
  roleName: string;
}

export enum RoleValues {
  ProductAdministrators = 1,
  LocalEngineers = 2,
  LocalOperators = 3,
  LocalSupervisors = 4,
  ProcessEngineer = 5,
  ProductionPlanner = 6,
  QualityAssurance = 7,
}
