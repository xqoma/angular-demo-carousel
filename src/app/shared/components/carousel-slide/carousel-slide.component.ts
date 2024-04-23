import {NgStyle} from '@angular/common';
import {ChangeDetectionStrategy, Component, input} from '@angular/core';

import {CarouselSlideLink} from '@adc/shared';

@Component({
  selector: 'adc-carousel-slide',
  templateUrl: './carousel-slide.component.html',
  styleUrl: './carousel-slide.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [NgStyle],
})
export class CarouselSlideComponent {
  backgroundImage = input.required<string>();
  frontImage = input<string>();
  title = input<string>();
  text = input<string>();
  link = input<CarouselSlideLink>();
}
