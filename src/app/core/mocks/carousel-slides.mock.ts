import {Banner} from '@adc/shared';

import {TIME} from '../constants/time.constant';
import {Mock} from '../models/mock.interface';

export const CAROUSEL_SLIDES_MOCK: Mock<Banner[]> = {
  url: 'api/v1/carousel/demo',
  method: 'GET',
  delay: TIME.SEC * 2,
  body: [
    {
      title: 'WinzUp Loyalty Program',
      text: 'Get up to <span class="accent">35% in rewards</span>: daily rakeback, weekly cashback and level-up bonuses',
      backgroundImage: 'assets/images/winzup-bg-mob.webp',
      frontImage: 'assets/images/winzup_mob.png',
      link: {
        text: 'Join now',
        href: '#',
      },
    },
    {
      title: "Valentine's Fortune Drops",
      text: 'Trigger random prizes and win a share of <span class="accent">€30,000</span>!',
      backgroundImage: 'assets/images/valentines-fortune-drops_mob-bg.png',
      frontImage: 'assets/images/valentines-fortune-drops_mob-pic.png',
      link: {
        text: 'Learn more',
        href: '#',
      },
    },
    {
      title: 'Wheel of Winz',
      text: 'Spin the wheel to win up to <span class="accent">€15,000</span> weekly',
      backgroundImage: 'assets/images/wheel-mob-bg.webp',
      frontImage: 'assets/images/wheel-mob.png',
      link: {
        text: 'Spin now',
        href: '#',
      },
    },
  ],
};
