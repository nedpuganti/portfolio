/// <reference types="@angular/localize" />

import { enableProdMode, importProvidersFrom } from '@angular/core';

import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withHashLocation, withInMemoryScrolling } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { AppComponent } from './app/app.component';
import { AppRoutes } from './app/app.routing';
import { TokenInterceptor } from './app/token.interceptor';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
  if (window) {
    window.console.log = () => {
      undefined;
    };
  }
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      FormsModule,
      ReactiveFormsModule,
      CommonModule,
      BrowserModule,
      NgbModule,
      ToastrModule.forRoot({
        timeOut: 3000,
        progressBar: true,
        positionClass: 'toast-bottom-full-width',
        countDuplicates: true
      })
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    provideEnvironmentNgxMask(),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    provideRouter(AppRoutes, withHashLocation(), withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }))
  ]
}).catch((err) => console.error(err));
