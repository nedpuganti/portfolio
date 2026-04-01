import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';

import { ChatStateService } from '../../core/services/chat-state.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { groupProjectsByCategory } from '../../core/utils/portfolio-filter.util';
import { ProjectCardComponent } from '../../shared/components/project-card/project-card.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-projects-page',
  imports: [ProjectCardComponent, SectionTitleComponent],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsPageComponent {
  readonly portfolioData = inject(PortfolioDataService);
  readonly chatState = inject(ChatStateService);
  readonly featuredProjects = computed(() => this.portfolioData.getFeaturedProjects(4));
  readonly projectGroups = computed(() => groupProjectsByCategory(this.portfolioData.projects()));

  constructor() {
    this.chatState.setContextPanelState(
      this.portfolioData.createProjectsContextPanelState(
        'Project library',
        'A browsable view across mobile apps, operational portals, analytics dashboards, and polished websites.',
        this.portfolioData.getFeaturedProjects(4)
      )
    );
  }
}
