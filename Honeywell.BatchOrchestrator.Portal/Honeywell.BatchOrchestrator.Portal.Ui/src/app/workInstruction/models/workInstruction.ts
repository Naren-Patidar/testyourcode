/* eslint-disable camelcase */
export interface Safety {
  key: number;
  checklist: string[];
}

export interface Attributes {
  min_length: number;
  max_length: number;
  min_value?: number;
  max_value?: number;
  devi_low?: number;
  devi_max?: number;
  devi_type: string;
  action: string;
  precision?: number;
}

export interface ExperionTag {
  id: string;
  name: string;
}

export interface Instruction {
  key: number;
  label: string;
  description: string;
  disabled: boolean;
  input: boolean;
  required: boolean;
  type: string;
  units: string;
  attributes?: Attributes;
  experion_tag?: ExperionTag;
}

export interface Task {
  display_seq: number;
  key: number;
  instruction_name: string;
  description: string;
  disabled: boolean;
  input: boolean;
  type: string;
  components: Instruction[];
}

export interface WIAttachment {
  doc_id: string;
  title: string;
  doctype: string;
  display_type?: string;
  path: string;
}

export interface WorkInstruction {
  id: string;
  workInstrId: number;
  lastModifiedAt: string;
  title: string;
  description: string;
  version?: string;
  enforce_order: boolean;
  category: string;
  status: number;
  tags: string[];
  safety?: Safety;
  attachments?: WIAttachment[];
  view_content: Task[];
  isModified: boolean;
}
