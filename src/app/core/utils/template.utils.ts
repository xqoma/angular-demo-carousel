import {APP} from '@adc/core';

export function pixelsToRem(pixels: number): number | undefined {
  if (!APP.FONT_SIZE) return;
  return pixels / APP.FONT_SIZE;
}
