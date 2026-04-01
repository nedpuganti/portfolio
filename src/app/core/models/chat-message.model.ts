import { CallToAction } from './call-to-action.model';

export type ChatRole = 'user' | 'assistant' | 'system';
export type ChatStatus = 'sent' | 'loading' | 'error';

export interface ChatMessage {
  id: string;
  role: ChatRole;
  text: string;
  createdAt: string;
  status: ChatStatus;
  actions?: CallToAction[];
}
