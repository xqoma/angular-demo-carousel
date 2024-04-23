import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {Observable} from 'rxjs';

import {Banner} from '@adc/shared';

// TODO: Move to environment variables
const API_URL = 'api/v1';

const API_BASE = `${API_URL}/carousel`;
const API_ROUTES = {
  fetchDemoSlides: (): string => `${API_BASE}/demo`,
};

@Injectable({providedIn: 'root'})
export class CarouselApiService {
  readonly #http = inject(HttpClient);

  fetchDemoSlides$(): Observable<Banner[]> {
    return this.#http.get<Banner[]>(API_ROUTES.fetchDemoSlides());
  }
}
