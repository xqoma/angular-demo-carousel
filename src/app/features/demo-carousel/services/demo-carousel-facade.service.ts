import {Injectable, inject} from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';

import {BannersApiService} from '@adc/core';

@Injectable({providedIn: 'root'})
export class DemoCarouselFacadeService {
  readonly #bannersApi = inject(BannersApiService);

  banners = toSignal(this.#bannersApi.fetchDemoBanners$(), {initialValue: []});
}
