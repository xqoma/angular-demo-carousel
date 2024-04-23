import {ChangeDetectionStrategy, Component, inject} from '@angular/core';

import {DemoCarouselFacadeService} from '@adc/features/demo-carousel/services/demo-carousel-facade.service';
import {CarouselComponent} from '@adc/shared';

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
