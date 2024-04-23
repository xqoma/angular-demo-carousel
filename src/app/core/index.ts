import {LayoutComponent} from './components/layout/layout.component';
import {APP} from './constants/app.constant';
import {mockApiInterceptor} from './interceptors/mock-api.interceptor';
import {provideAppTitleStrategy} from './providers/app-title-strategy.provider';
import {CarouselApiService} from './services/carousel-api.service';

export {APP, mockApiInterceptor, provideAppTitleStrategy, LayoutComponent, CarouselApiService};
