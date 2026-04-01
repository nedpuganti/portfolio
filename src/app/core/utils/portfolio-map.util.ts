import { ChatApiParsedResponse, ChatApiRawResponse } from '../models';

export function extractChatAnswer(response: ChatApiRawResponse): ChatApiParsedResponse {
  if (typeof response === 'string') {
    return {
      answer: response.trim()
    };
  }

  if (typeof response === 'object' && response !== null && 'answer' in response) {
    const value = response.answer;

    return {
      answer: typeof value === 'string' ? value.trim() : ''
    };
  }

  return {
    answer: ''
  };
}

export function formatChatTimestamp(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit'
  }).format(date);
}

export function buildMessageId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`;
}
