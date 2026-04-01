import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import { AppIconComponent } from '../../../../shared/components/app-icon/app-icon.component';

@Component({
  selector: 'app-chat-input',
  imports: [AppIconComponent],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatInputComponent {
  readonly submitted = output<string>();
  readonly disabled = input(false);
  readonly draft = signal('');

  updateDraft(event: Event): void {
    const target = event.target as HTMLTextAreaElement;
    this.draft.set(target.value);
  }

  handleKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.submit();
    }
  }

  submit(): void {
    if (this.disabled()) {
      return;
    }

    const value = this.draft().trim();

    if (!value) {
      return;
    }

    this.submitted.emit(value);
    this.draft.set('');
  }
}
