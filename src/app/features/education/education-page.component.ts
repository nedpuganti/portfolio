import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { ChatStateService } from '../../core/services/chat-state.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { EducationCardComponent } from '../../shared/components/education-card/education-card.component';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-education-page',
  imports: [EducationCardComponent, SectionTitleComponent],
  templateUrl: './education-page.component.html',
  styleUrl: './education-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationPageComponent {
  readonly portfolioData = inject(PortfolioDataService);
  readonly chatState = inject(ChatStateService);

  constructor() {
    this.chatState.setContextPanelState(this.portfolioData.createEducationContextPanelState());
  }
}
