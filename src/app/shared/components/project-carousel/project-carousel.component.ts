import { Component, input } from '@angular/core';

import { Project } from '../../../core/models';
import { ProjectCardComponent } from '../project-card/project-card.component';

@Component({
  selector: 'app-project-carousel',
  imports: [ProjectCardComponent],
  templateUrl: './project-carousel.component.html',
  styleUrl: './project-carousel.component.scss'
})
export class ProjectCarouselComponent {
  readonly projects = input.required<Project[]>();
  readonly compact = input(false);
}
