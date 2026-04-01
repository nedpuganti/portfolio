import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { PromptSuggestion } from '../../../../core/models';
import { HeroIntroComponent } from '../hero-intro/hero-intro.component';
import { PromptChipListComponent } from '../prompt-chip-list/prompt-chip-list.component';

@Component({
  selector: 'app-empty-state',
  imports: [HeroIntroComponent, PromptChipListComponent],
  templateUrl: './empty-state.component.html',
  styleUrl: './empty-state.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmptyStateComponent {
  readonly suggestions = input.required<PromptSuggestion[]>();
  readonly promptSelected = output<string>();

  selectPrompt(prompt: string): void {
    this.promptSelected.emit(prompt);
  }
}
