import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CallToAction, ChatMessage } from '../../../../core/models';
import { AppIconComponent } from '../../../../shared/components/app-icon/app-icon.component';

@Component({
  selector: 'app-chat-message',
  imports: [RouterLink, AppIconComponent],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatMessageComponent {
  readonly message = input.required<ChatMessage>();

  readonly roleIconMap: Record<ChatMessage['role'], string> = {
    assistant: 'AI',
    system: 'ER',
    user: 'NE'
  };

  isRouteAction(action: CallToAction): boolean {
    return action.type === 'route';
  }

  messageBlocks(): MessageBlock[] {
    return parseMessageBlocks(this.message().text);
  }

  formatInline(text: string): string {
    return formatInlineMarkdown(text);
  }
}

type MessageBlock =
  | {
      kind: 'paragraph';
      text: string;
    }
  | {
      kind: 'list';
      items: string[];
    };

function parseMessageBlocks(text: string): MessageBlock[] {
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line, index, allLines) => !(line === '' && allLines[index - 1] === ''));

  const blocks: MessageBlock[] = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];

  const flushParagraph = (): void => {
    if (!paragraphBuffer.length) {
      return;
    }

    blocks.push({
      kind: 'paragraph',
      text: paragraphBuffer.join(' ')
    });
    paragraphBuffer = [];
  };

  const flushList = (): void => {
    if (!listBuffer.length) {
      return;
    }

    blocks.push({
      kind: 'list',
      items: [...listBuffer]
    });
    listBuffer = [];
  };

  for (const line of lines) {
    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    const bulletMatch = line.match(/^[-*]\s+(.*)$/);

    if (bulletMatch) {
      flushParagraph();
      listBuffer.push(cleanInlineMarkdown(bulletMatch[1]));
      continue;
    }

    flushList();
    paragraphBuffer.push(cleanInlineMarkdown(line));
  }

  flushParagraph();
  flushList();

  return blocks.length
    ? blocks
    : [
        {
          kind: 'paragraph',
          text: cleanInlineMarkdown(text)
        }
      ];
}

function cleanInlineMarkdown(text: string): string {
  return text.replace(/\s+/g, ' ').trim();
}

function formatInlineMarkdown(text: string): string {
  const escaped = escapeHtml(text);

  return escaped
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
