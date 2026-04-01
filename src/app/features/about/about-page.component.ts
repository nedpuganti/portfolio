import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ChatStateService } from '../../core/services/chat-state.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { AvatarBadgeComponent } from '../../shared/components/avatar-badge/avatar-badge.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ServiceCardComponent } from '../../shared/components/service-card/service-card.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';

@Component({
  selector: 'app-about-page',
  imports: [AvatarBadgeComponent, SectionTitleComponent, ServiceCardComponent, StatCardComponent],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutPageComponent {
  readonly portfolioData = inject(PortfolioDataService);
  readonly chatState = inject(ChatStateService);

  constructor() {
    this.chatState.setContextPanelState(this.portfolioData.createAboutContextPanelState());
  }
}
