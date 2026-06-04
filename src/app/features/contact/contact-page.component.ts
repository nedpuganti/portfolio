import { Component, computed, inject } from '@angular/core';
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
  styleUrl: './contact-page.component.scss'
})
export class ContactPageComponent {
  readonly portfolioData = inject(PortfolioDataService);
  readonly chatState = inject(ChatStateService);

  readonly githubHref = computed(() => {
    const githubLink = this.portfolioData
      .profile()
      .socialLinks.find((link) => link.iconLabel === 'GH' || `${link.label} ${link.url}`.toLowerCase().includes('github'));

    return githubLink?.url;
  });

  constructor() {
    this.chatState.setContextPanelState(this.portfolioData.createContactContextPanelState());
  }
}
