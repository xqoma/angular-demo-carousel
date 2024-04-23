import {ChangeDetectionStrategy, Component, inject} from '@angular/core';

import {CarouselComponent} from '@adc/shared';

import {DemoCarouselFacadeService} from '../../services/demo-carousel-facade.service';

@Component({
  selector: 'adc-demo-carousel',
  templateUrl: './demo-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CarouselComponent],
})
export class DemoCarouselComponent {
  readonly #facade = inject(DemoCarouselFacadeService);

  protected slides = this.#facade.slides;
}
