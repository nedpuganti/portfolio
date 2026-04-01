import { ChangeDetectionStrategy, Component, ElementRef, effect, input, viewChild } from '@angular/core';

import { ChatMessage } from '../../../../core/models';
import { ChatMessageComponent } from '../chat-message/chat-message.component';
import { TypingIndicatorComponent } from '../typing-indicator/typing-indicator.component';

@Component({
  selector: 'app-chat-window',
  imports: [ChatMessageComponent, TypingIndicatorComponent],
  templateUrl: './chat-window.component.html',
  styleUrl: './chat-window.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatWindowComponent {
  readonly messages = input.required<ChatMessage[]>();
  readonly typing = input(false);
  readonly scrollContainer = viewChild.required<ElementRef<HTMLElement>>('scrollContainer');

  constructor() {
    effect(() => {
      this.messages();
      this.typing();

      queueMicrotask(() => {
        const element = this.scrollContainer().nativeElement;
        element.scrollTo({
          top: element.scrollHeight,
          behavior: 'auto'
        });
      });
    });
  }
}
