import {Injectable, Optional, SkipSelf, signal} from '@angular/core';

const MULTIPLE_INSTANCES_ERROR =
  'Trying to create multiple instances! This service must be singleton.';

@Injectable({providedIn: 'root'})
export class LayoutFacadeService {
  readonly title = signal<string | undefined>(undefined);

  constructor(@Optional() @SkipSelf() parent?: LayoutFacadeService) {
    if (parent) {
      throw Error(`[${this.constructor.name}]: ${MULTIPLE_INSTANCES_ERROR}`);
    }
  }
}
