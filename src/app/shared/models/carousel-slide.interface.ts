import {CarouselSlideLink} from './carousel-slide-link.interface';

export interface CarouselSlide {
  backgroundImage: string;
  frontImage?: string;
  title?: string;
  text?: string;
  link?: CarouselSlideLink;
}
