import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { ChatStateService } from '../../core/services/chat-state.service';
import { AppIconComponent } from '../../shared/components/app-icon/app-icon.component';
import { ChatInputComponent } from './components/chat-input/chat-input.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { EmptyStateComponent } from './components/empty-state/empty-state.component';
import { PromptChipListComponent } from './components/prompt-chip-list/prompt-chip-list.component';

@Component({
  selector: 'app-home-page',
  imports: [AppIconComponent, ChatInputComponent, ChatWindowComponent, EmptyStateComponent, PromptChipListComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  readonly chatState = inject(ChatStateService);
  readonly inlineSuggestions = computed(() => this.chatState.promptSuggestions().slice(0, 3));

  constructor() {
    this.chatState.restoreHomeContext();
  }

  submitPrompt(prompt: string): void {
    this.chatState.sendPrompt(prompt);
  }
}
