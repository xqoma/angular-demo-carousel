import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {Observable} from 'rxjs';

import {Banner} from '@adc/shared';

// TODO: Move to environment variables
const API_URL = 'api/v1';

const API_BASE = `${API_URL}/banners`;
const API_ROUTES = {
  fetchDemoBanners: (): string => `${API_BASE}/demo`,
};

@Injectable({providedIn: 'root'})
export class BannersApiService {
  readonly #http = inject(HttpClient);

  fetchDemoBanners$(): Observable<Banner[]> {
    return this.#http.get<Banner[]>(API_ROUTES.fetchDemoBanners());
  }
}
