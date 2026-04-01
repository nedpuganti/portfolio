import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { AppIconComponent } from './shared/components/app-icon/app-icon.component';
import { PortfolioDataService } from './core/services/portfolio-data.service';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  readonly themeService = inject(ThemeService);
  readonly portfolioData = inject(PortfolioDataService);
}
