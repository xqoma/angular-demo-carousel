import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'adc-carousel-slide',
  templateUrl: './carousel-slide.component.html',
  styleUrl: './carousel-slide.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class CarouselSlideComponent {}
