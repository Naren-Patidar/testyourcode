/* eslint-disable camelcase */
import { SafetyItem } from './safetyItem';
import { Task, WIAttachment } from './workInstruction';

export interface EwiPayload {
  ewi_id: string;
  ewi_title: string;
  description: string;
  version: string;
  enforce_order: boolean;
  category: string;
  status: string;
  tags?: string[];
  safety: WISafety;
  attachments: WIAttachment[];
  view_content: Task[];
  showPreview: boolean;
}

export interface WISafety {
  key: number;
  checklist: string[];
}
