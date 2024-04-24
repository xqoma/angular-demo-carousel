export const APP = {
  TITLE: 'ADC',
  // Font size can be configured in CSS variables (@adc/styles/utils/_variables.scss)
  FONT_SIZE: getFontSize(),
};

function getFontSize(): number | undefined {
  const htmlElement = document.querySelector('html');
  if (!htmlElement) return;
  return parseFloat(window.getComputedStyle(htmlElement).fontSize);
}
