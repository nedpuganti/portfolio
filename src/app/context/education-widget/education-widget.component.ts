import { Component, input } from '@angular/core';

import { ContextPanelWidget } from '../../core/models';
import { EducationCardComponent } from '../../shared/components/education-card/education-card.component';

@Component({
  selector: 'app-education-widget',
  imports: [EducationCardComponent],
  templateUrl: './education-widget.component.html',
  styleUrl: './education-widget.component.scss'
})
export class EducationWidgetComponent {
  readonly widget = input.required<ContextPanelWidget>();
}
