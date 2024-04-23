import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {RouterOutlet} from '@angular/router';

import {LayoutFacadeService} from '@adc/core';

@Component({
  selector: 'adc-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [RouterOutlet],
})
export class LayoutComponent {
  readonly #facade = inject(LayoutFacadeService);

  protected header = computed(() => this.#facade.title());
}
