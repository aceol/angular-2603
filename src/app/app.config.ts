import { ApplicationConfig, DEFAULT_CURRENCY_CODE, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { appTitleProvider } from './app.token';

import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";

registerLocaleData(localeFr);
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), provideRouter(routes), appTitleProvider,  
    { provide: LOCALE_ID, useValue: "fr" },
    { provide: DEFAULT_CURRENCY_CODE, useValue: "EUR" },
  ],
};
