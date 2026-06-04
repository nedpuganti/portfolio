import { Component, input } from '@angular/core';

import { ContextPanelWidget } from '../../core/models';
import { SkillPillComponent } from '../../shared/components/skill-pill/skill-pill.component';

@Component({
  selector: 'app-skills-widget',
  imports: [SkillPillComponent],
  templateUrl: './skills-widget.component.html',
  styleUrl: './skills-widget.component.scss'
})
export class SkillsWidgetComponent {
  readonly widget = input.required<ContextPanelWidget>();
}
