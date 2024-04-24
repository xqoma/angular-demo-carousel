import {ChangeDetectionStrategy, Component, input} from '@angular/core';

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
}
