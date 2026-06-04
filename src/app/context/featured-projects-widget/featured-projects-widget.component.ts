import { Component, input } from '@angular/core';

import { ContextPanelWidget } from '../../core/models';
import { ProjectCarouselComponent } from '../../shared/components/project-carousel/project-carousel.component';

@Component({
  selector: 'app-featured-projects-widget',
  imports: [ProjectCarouselComponent],
  templateUrl: './featured-projects-widget.component.html',
  styleUrl: './featured-projects-widget.component.scss'
})
export class FeaturedProjectsWidgetComponent {
  readonly widget = input.required<ContextPanelWidget>();
}
