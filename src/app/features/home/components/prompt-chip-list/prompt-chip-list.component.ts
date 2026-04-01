import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

import { PromptSuggestion } from '../../../../core/models';
import { AppIconComponent } from '../../../../shared/components/app-icon/app-icon.component';

@Component({
  selector: 'app-prompt-chip-list',
  imports: [AppIconComponent],
  templateUrl: './prompt-chip-list.component.html',
  styleUrl: './prompt-chip-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromptChipListComponent {
  readonly suggestions = input.required<PromptSuggestion[]>();
  readonly inline = input(false);
  readonly promptSelected = output<string>();

  selectPrompt(prompt: string): void {
    this.promptSelected.emit(prompt);
  }
}
