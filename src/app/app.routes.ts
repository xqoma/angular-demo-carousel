import {Routes} from '@angular/router';

import {LayoutComponent} from '@adc/core';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadChildren: () => import('@adc/features/demo-carousel').then((m) => m.demoCarouselRoutes),
      },
    ],
  },
];
