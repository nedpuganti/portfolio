import { provideHttpClient } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { appRoutes } from './app.routes';
import { PortfolioDataService } from './core/services/portfolio-data.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withComponentInputBinding(),
      withViewTransitions()
    ),
    provideHttpClient(),
    provideAppInitializer(() => {
      void inject(PortfolioDataService).load(2000);
    }),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ]
};
