import {ChangeDetectionStrategy, Component, computed, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {formControlToSignal, nonNullableFormControl, pixelsToRem} from '@adc/core';
import {
  BannerComponent,
  CarouselComponent,
  CarouselShiftDirection,
  CarouselSlideComponent,
} from '@adc/shared';

import {DemoCarouselFacadeService} from '../../services/demo-carousel-facade.service';

const BANNER_HEIGHT_PIXELS = 420;
const DEFAULT_AUTO_SHIFT = true;
const DEFAULT_AUTO_SHIFT_DIRECTION: CarouselShiftDirection = 'left';
const DEFAULT_AUTO_SHIFT_INTERVAL_SEC = 10;
const DEFAULT_DRAG_FPS = 90;
const DEFAULT_THRESHOLD_PERCENTAGE = 20;

@Component({
  selector: 'adc-demo-carousel',
  templateUrl: './demo-carousel.component.html',
  styleUrl: './demo-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CarouselComponent, BannerComponent, CarouselSlideComponent, ReactiveFormsModule],
})
export class DemoCarouselComponent {
  readonly #facade = inject(DemoCarouselFacadeService);

  protected banners = this.#facade.banners;
  protected bannerHeightPixels = computed(() => BANNER_HEIGHT_PIXELS);
  protected bannerHeightRem = computed(() => pixelsToRem(this.bannerHeightPixels()));

  protected autoShiftControl = nonNullableFormControl(DEFAULT_AUTO_SHIFT);
  protected autoShift = formControlToSignal(this.autoShiftControl);

  protected autoShiftIntervalSecControl = nonNullableFormControl(DEFAULT_AUTO_SHIFT_INTERVAL_SEC);
  protected autoShiftIntervalSec = formControlToSignal(this.autoShiftIntervalSecControl);

  protected thresholdPercentageControl = nonNullableFormControl(DEFAULT_THRESHOLD_PERCENTAGE);
  protected thresholdPercentage = formControlToSignal(this.thresholdPercentageControl);

  protected dragFpsControl = nonNullableFormControl(DEFAULT_DRAG_FPS);
  protected dragFps = formControlToSignal(this.dragFpsControl);

  protected autoShiftDirectionControl = nonNullableFormControl(DEFAULT_AUTO_SHIFT_DIRECTION);
  protected autoShiftDirection = formControlToSignal(this.autoShiftDirectionControl);
}
