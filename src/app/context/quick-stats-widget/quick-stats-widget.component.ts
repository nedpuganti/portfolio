import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { ContextPanelWidget } from '../../core/models';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';

@Component({
  selector: 'app-quick-stats-widget',
  imports: [StatCardComponent],
  templateUrl: './quick-stats-widget.component.html',
  styleUrl: './quick-stats-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuickStatsWidgetComponent {
  readonly widget = input.required<ContextPanelWidget>();
}
