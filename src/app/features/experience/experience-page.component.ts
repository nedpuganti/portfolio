import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ChatStateService } from '../../core/services/chat-state.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { TimelineItemComponent } from '../../shared/components/timeline-item/timeline-item.component';

@Component({
  selector: 'app-experience-page',
  imports: [SectionTitleComponent, StatCardComponent, TimelineItemComponent],
  templateUrl: './experience-page.component.html',
  styleUrl: './experience-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExperiencePageComponent {
  readonly portfolioData = inject(PortfolioDataService);
  readonly chatState = inject(ChatStateService);

  constructor() {
    this.chatState.setContextPanelState(this.portfolioData.createExperienceContextPanelState());
  }
}
