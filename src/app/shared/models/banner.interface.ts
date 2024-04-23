import {BannerLink} from './banner-link.interface';

export interface Banner {
  backgroundImage: string;
  frontImage?: string;
  title?: string;
  text?: string;
  link?: BannerLink;
}
