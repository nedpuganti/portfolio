import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ContextPanelWidget } from '../../core/models';
import { AppIconComponent } from '../../shared/components/app-icon/app-icon.component';
import { AvatarBadgeComponent } from '../../shared/components/avatar-badge/avatar-badge.component';

@Component({
  selector: 'app-about-widget',
  imports: [AvatarBadgeComponent, AppIconComponent],
  templateUrl: './about-widget.component.html',
  styleUrl: './about-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutWidgetComponent {
  readonly widget = input.required<ContextPanelWidget>();
}
