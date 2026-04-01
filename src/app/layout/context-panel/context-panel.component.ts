import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ChatStateService } from '../../core/services/chat-state.service';
import { AboutWidgetComponent } from '../../context/about-widget/about-widget.component';
import { EducationWidgetComponent } from '../../context/education-widget/education-widget.component';
import { FeaturedProjectsWidgetComponent } from '../../context/featured-projects-widget/featured-projects-widget.component';
import { QuickStatsWidgetComponent } from '../../context/quick-stats-widget/quick-stats-widget.component';
import { SkillsWidgetComponent } from '../../context/skills-widget/skills-widget.component';
import { CallToAction } from '../../core/models';
import { AppIconComponent } from '../../shared/components/app-icon/app-icon.component';

@Component({
  selector: 'app-context-panel',
  imports: [
    RouterLink,
    AppIconComponent,
    AboutWidgetComponent,
    EducationWidgetComponent,
    FeaturedProjectsWidgetComponent,
    QuickStatsWidgetComponent,
    SkillsWidgetComponent
  ],
  templateUrl: './context-panel.component.html',
  styleUrl: './context-panel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContextPanelComponent {
  readonly chatState = inject(ChatStateService);

  isRouteAction(action: CallToAction): boolean {
    return action.type === 'route';
  }
}
