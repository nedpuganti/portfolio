import { provideHttpClient, withXhr } from '@angular/common/http';
import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection
} from '@angular/core';
import {
  provideRouter,
  withComponentInputBinding,
  withExperimentalAutoCleanupInjectors,
  withInMemoryScrolling,
  withViewTransitions
} from '@angular/router';

import { appRoutes } from './app.routes';
import { PortfolioDataService } from './core/services/portfolio-data.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withComponentInputBinding(),
      withViewTransitions(),
      withExperimentalAutoCleanupInjectors()
    ),
    provideHttpClient(withXhr()),
    provideAppInitializer(() => {
      void inject(PortfolioDataService).load(2000);
    }),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection()
  ]
};
