import { DestroyRef, Injectable, computed, effect, inject, signal } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export type ThemeMode = 'auto' | 'dark' | 'light';
type ResolvedTheme = 'dark' | 'light';

const THEME_STORAGE_KEY = 'naren-portfolio-theme-mode';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  readonly mode = signal<ThemeMode>(this.getStoredMode());
  private readonly systemTheme = signal<ResolvedTheme>(this.mediaQuery.matches ? 'dark' : 'light');
  readonly resolvedTheme = computed<ResolvedTheme>(() => {
    const mode = this.mode();

    if (mode === 'auto') {
      return this.systemTheme();
    }

    return mode;
  });

  constructor() {
    const listener = (event: MediaQueryListEvent): void => {
      this.systemTheme.set(event.matches ? 'dark' : 'light');
    };

    this.mediaQuery.addEventListener('change', listener);
    this.destroyRef.onDestroy(() => {
      this.mediaQuery.removeEventListener('change', listener);
    });

    effect(() => {
      const mode = this.mode();
      const theme = this.resolvedTheme();
      const root = this.document.documentElement;

      root.dataset['themeMode'] = mode;
      root.dataset['theme'] = theme;
      window.localStorage.setItem(THEME_STORAGE_KEY, mode);
    });
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
  }

  private getStoredMode(): ThemeMode {
    const storedMode = window.localStorage.getItem(THEME_STORAGE_KEY);

    if (storedMode === 'dark' || storedMode === 'light' || storedMode === 'auto') {
      return storedMode;
    }

    return 'auto';
  }
}
