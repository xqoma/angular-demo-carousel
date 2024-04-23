import {Routes} from '@angular/router';

import {DemoCarouselComponent} from '../components/demo-carousel/demo-carousel.component';

export const demoCarouselRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Demo Carousel',
    component: DemoCarouselComponent,
  },
];
