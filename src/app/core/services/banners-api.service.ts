import {HttpClient} from '@angular/common/http';
import {Injectable, inject} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '@adc/envs/environment';
import {Banner} from '@adc/shared';

const API_BASE = `${environment.apiUrl}/banners`;
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
