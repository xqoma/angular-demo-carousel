import {NgStyle} from '@angular/common';
import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';

import {pixelsToRem} from '@adc/core';
import {BannerLink} from '@adc/shared';

@Component({
  selector: 'adc-banner',
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  // TODO: Remove unused import from all components
  imports: [NgStyle],
})
export class BannerComponent {
  backgroundImage = input.required<string>();
  frontImage = input<string>();
  title = input<string>();
  text = input<string>();
  link = input<BannerLink>();
  heightPixels = input<number>();

  protected heightRem = computed(() => {
    const pixels = this.heightPixels();
    return pixels ? pixelsToRem(pixels) : undefined;
  });
}
