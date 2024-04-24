import {HttpInterceptorFn, HttpResponse} from '@angular/common/http';
import {delay, of} from 'rxjs';

import {MOCKS} from '../mocks/mocks';

export const mockApiInterceptor: HttpInterceptorFn = (request, next) => {
  const mock = MOCKS.find(({url, method}) => url === request.url && method === request.method);

  if (mock) {
    const response = new HttpResponse({status: 200, body: mock.body});
    return of(response).pipe(delay(mock.delay ?? 0));
  }

  return next(request);
};
