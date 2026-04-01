import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { AppIconComponent } from '../../shared/components/app-icon/app-icon.component';

@Component({
  selector: 'app-api-unavailable-page',
  imports: [RouterLink, AppIconComponent],
  templateUrl: './api-unavailable-page.component.html',
  styleUrl: './api-unavailable-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApiUnavailablePageComponent {
  readonly portfolioData = inject(PortfolioDataService);
  readonly retrying = signal(false);
  private readonly router = inject(Router);

  async retry(): Promise<void> {
    if (this.retrying()) {
      return;
    }

    this.retrying.set(true);

    try {
      const loaded = await this.portfolioData.retryLoad(300);
      if (loaded) {
        await this.router.navigateByUrl('/', { replaceUrl: true });
        return;
      }

      this.retrying.set(false);
    } catch {
      this.retrying.set(false);
    }
  }
}
