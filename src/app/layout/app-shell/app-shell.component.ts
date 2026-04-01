import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, effect, inject, viewChild } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { ContextPanelComponent } from '../context-panel/context-panel.component';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TopbarComponent } from '../topbar/topbar.component';

@Component({
  selector: 'app-app-shell',
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, ContextPanelComponent],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellComponent {
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private readonly portfolioData = inject(PortfolioDataService);
  private readonly workspace = viewChild<ElementRef<HTMLElement>>('workspace');

  constructor() {
    effect(() => {
      if (this.portfolioData.error() && !this.portfolioData.loading() && !this.portfolioData.loaded() && this.router.url !== '/unavailable') {
        void this.router.navigateByUrl('/unavailable', { replaceUrl: true });
      }
    });

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        requestAnimationFrame(() => {
          this.workspace()?.nativeElement.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        });
      });
  }
}
