import {EnvironmentProviders, makeEnvironmentProviders} from '@angular/core';
import {TitleStrategy} from '@angular/router';

import {AppTitleStrategy} from '../services/app-title-strategy.service';

export const provideAppTitleStrategy = (): EnvironmentProviders =>
  makeEnvironmentProviders([
    {
      provide: TitleStrategy,
      useClass: AppTitleStrategy,
    },
  ]);
