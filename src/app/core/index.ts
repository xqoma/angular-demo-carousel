import {LayoutComponent} from './components/layout/layout.component';
import {APP} from './constants/app.constant';
import {mockApiInterceptor} from './interceptors/mock-api.interceptor';
import {provideAppTitleStrategy} from './providers/app-title-strategy.provider';
import {BannersApiService} from './services/banners-api.service';
import {LayoutFacadeService} from './services/layout-facade.service';
import {formControlToSignal, nonNullableFormControl} from './utils/angular.utils';
import {pixelsToRem} from './utils/template.utils';

export {
  APP,
  mockApiInterceptor,
  provideAppTitleStrategy,
  pixelsToRem,
  formControlToSignal,
  nonNullableFormControl,
  LayoutComponent,
  BannersApiService,
  LayoutFacadeService,
};
