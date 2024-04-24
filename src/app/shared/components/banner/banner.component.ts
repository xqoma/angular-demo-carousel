import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';

import {pixelsToRem} from '@adc/core';
import {BannerLink} from '@adc/shared';

@Component({
  selector: 'adc-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BannerComponent {
  backgroundImage = input.required<string>();
  frontImage = input<string>();
  title = input<string>();
  text = input<string>();
  link = input<BannerLink>();
  minHeightPixels = input<number>();

  protected minHeightRem = computed(() => {
    const pixels = this.minHeightPixels();
    return pixels ? pixelsToRem(pixels) : undefined;
  });
}
