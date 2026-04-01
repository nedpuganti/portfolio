import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

import { ChatStateService } from '../../core/services/chat-state.service';
import { PortfolioDataService } from '../../core/services/portfolio-data.service';
import { AppIconComponent } from '../../shared/components/app-icon/app-icon.component';
import { ThemeMode, ThemeService } from '../../core/services/theme.service';

interface SidebarNavItem {
  label: string;
  href: string;
  iconLabel: string;
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, AppIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SidebarComponent {
  readonly chatState = inject(ChatStateService);
  readonly portfolioData = inject(PortfolioDataService);
  readonly themeService = inject(ThemeService);
  private readonly router = inject(Router);

  readonly navItems: SidebarNavItem[] = [
    { label: 'Assistant', href: '/', iconLabel: 'AI' },
    { label: 'About', href: '/about', iconLabel: 'AB' },
    { label: 'Projects', href: '/projects', iconLabel: 'PR' },
    { label: 'Experience', href: '/experience', iconLabel: 'XP' },
    { label: 'Skills', href: '/skills', iconLabel: 'SK' },
    { label: 'Education', href: '/education', iconLabel: 'ED' },
    { label: 'Contact', href: '/contact', iconLabel: 'CT' }
  ];

  readonly themeOptions: Array<{ label: string; value: ThemeMode }> = [
    { label: 'Auto', value: 'auto' },
    { label: 'Dark', value: 'dark' },
    { label: 'Light', value: 'light' }
  ];

  startNewConversation(): void {
    this.chatState.resetConversation();
    void this.router.navigateByUrl('/');
  }

  openRecentConversation(prompt: string): void {
    if (this.router.url !== '/') {
      void this.router.navigateByUrl('/').then(() => this.chatState.openRecentConversation(prompt));
      return;
    }

    this.chatState.openRecentConversation(prompt);
  }

  setTheme(mode: ThemeMode): void {
    this.themeService.setMode(mode);
  }
}
