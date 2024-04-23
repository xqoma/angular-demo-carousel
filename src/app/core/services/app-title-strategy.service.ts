import {Injectable, inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {RouterStateSnapshot, TitleStrategy} from '@angular/router';

import {APP, LayoutFacadeService} from '@adc/core';

@Injectable({providedIn: 'root'})
export class AppTitleStrategy extends TitleStrategy {
  readonly #tabTitle = inject(Title);
  readonly #layoutFacade = inject(LayoutFacadeService);

  updateTitle(snapshot: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(snapshot);
    const tabTitle = pageTitle ? `${APP.TITLE} | ${pageTitle}` : APP.TITLE ?? '';

    this.#layoutFacade.title.set(pageTitle ?? APP.TITLE);
    this.#tabTitle.setTitle(tabTitle);
  }
}
