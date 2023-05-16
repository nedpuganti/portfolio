import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding, withHashLocation, withInMemoryScrolling } from '@angular/router';

import { provideEnvironmentNgxMask } from 'ngx-mask';

import { AppRoutes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEnvironmentNgxMask(),
    provideRouter(
      AppRoutes,
      withHashLocation(),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
      withComponentInputBinding()
    )
  ]
};
