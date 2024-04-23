import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {PageHeaderService} from '@adc/app/core/services/page-header.service';

@Component({
  selector: 'adc-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet],
})
export class LayoutComponent {
  readonly #pageHeaderService = inject(PageHeaderService);

  protected header = computed(() => this.#pageHeaderService.title());
}
