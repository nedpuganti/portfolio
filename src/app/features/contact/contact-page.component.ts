import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ChatStateService } from '../../core/services/chat-state.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { AppIconComponent } from '../../shared/components/app-icon/app-icon.component';
import { AvatarBadgeComponent } from '../../shared/components/avatar-badge/avatar-badge.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-contact-page',
  imports: [RouterLink, AppIconComponent, AvatarBadgeComponent, SectionTitleComponent],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactPageComponent {
  readonly portfolioData = inject(PortfolioDataService);
  readonly chatState = inject(ChatStateService);

  constructor() {
    this.chatState.setContextPanelState(this.portfolioData.createContactContextPanelState());
  }
}
