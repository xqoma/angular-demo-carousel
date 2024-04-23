import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';

import {mockApiInterceptor, provideAppTitleStrategy} from '@adc/core';

import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([mockApiInterceptor])),
    provideAppTitleStrategy(),
  ],
};
