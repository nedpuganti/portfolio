import { Component, input } from '@angular/core';

import { ExperienceItem } from '../../../core/models';

@Component({
  selector: 'app-timeline-item',
  templateUrl: './timeline-item.component.html',
  styleUrl: './timeline-item.component.scss'
})
export class TimelineItemComponent {
  readonly item = input.required<ExperienceItem>();
}
