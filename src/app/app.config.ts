import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations'
import { NgToggleModule } from 'ng-toggle-button';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { errorInterceptorInterceptor } from './core/interceptors/iterceptors/error-interceptor-interceptor';
import { loadingInterceptorInterceptor } from './core/interceptors/iterceptors/loadingInterceptor/loading-interceptor-interceptor';
import { headerInterceptorInterceptor } from './core/interceptors/iterceptors/headerInterceptor/header-interceptor-interceptor';
import { provideTranslateService, provideTranslateLoader } from "@ngx-translate/core";
import { provideTranslateHttpLoader } from "@ngx-translate/http-loader";


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(), withInterceptors([errorInterceptorInterceptor, loadingInterceptorInterceptor, headerInterceptorInterceptor])),
    provideAnimations(),
    NgToggleModule,
    ToastrModule,
    provideToastr(),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en'
    })
  ]
};
