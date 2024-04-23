import {Injectable, effect, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';

import {CarouselApiService} from '@adc/core';

@Injectable({providedIn: 'root'})
export class DemoCarouselFacadeService {
  readonly #carouselApi = inject(CarouselApiService);

  slides = toSignal(this.#carouselApi.fetchDemoSlides$(), {initialValue: []});

  constructor() {
    effect(() => {
      console.log('slides:', this.slides());
    });
  }
}
