import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { SkillItem } from '../../../core/models/skill-category.model';

@Component({
  selector: 'app-skill-pill',
  templateUrl: './skill-pill.component.html',
  styleUrl: './skill-pill.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillPillComponent {
  readonly skill = input.required<SkillItem>();
  readonly showProficiency = input(true);
}
