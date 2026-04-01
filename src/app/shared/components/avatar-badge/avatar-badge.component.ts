import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { PersonalProfile } from '../../../core/models';

@Component({
  selector: 'app-avatar-badge',
  templateUrl: './avatar-badge.component.html',
  styleUrl: './avatar-badge.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarBadgeComponent {
  readonly profile = input.required<PersonalProfile>();
  readonly compact = input(false);
}
