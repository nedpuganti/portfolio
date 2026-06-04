import { Component, input } from '@angular/core';

import { EducationItem } from '../../../core/models';

@Component({
  selector: 'app-education-card',
  templateUrl: './education-card.component.html',
  styleUrl: './education-card.component.scss'
})
export class EducationCardComponent {
  readonly item = input.required<EducationItem>();
}
