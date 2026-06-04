import { Component, input } from '@angular/core';

import { StatItem } from '../../../core/models';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrl: './stat-card.component.scss'
})
export class StatCardComponent {
  readonly stat = input.required<StatItem>();
  readonly compact = input(false);
}
