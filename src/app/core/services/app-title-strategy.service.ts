import {Injectable, inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {RouterStateSnapshot, TitleStrategy} from '@angular/router';

import {PageHeaderService} from '@adc/app/core/services/page-header.service';
import {APP} from '@adc/core';

@Injectable({providedIn: 'root'})
export class AppTitleStrategy extends TitleStrategy {
  readonly #titleService = inject(Title);
  readonly #pageHeaderService = inject(PageHeaderService);

  updateTitle(snapshot: RouterStateSnapshot): void {
    const pageTitle = this.buildTitle(snapshot);
    const tabTitle = pageTitle ? `${APP.TITLE} | ${pageTitle}` : APP.TITLE ?? '';

    this.#pageHeaderService.title.set(pageTitle ?? APP.TITLE);
    this.#titleService.setTitle(tabTitle);
  }
}
