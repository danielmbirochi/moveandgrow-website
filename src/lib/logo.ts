// src/assets/logo.svg is the one logo file. It is drawn in these two colours;
// repainting swaps them for a theme's (or for CSS values such as currentColor).
const INK = '#0E1B2A';
const ACCENT = '#FF5A1F';

/** The logo's SVG source with its ink and accent colours replaced. */
export const paintLogo = (svg: string, ink: string, accent: string): string =>
  svg.replaceAll(INK, ink).replaceAll(ACCENT, accent);

/** Inner markup of the `<g id="mark">` group: the MG mark without the lettering. */
export const logoMark = (svg: string): string => {
  const mark = svg.match(/<g id="mark">([\s\S]*?)<\/g>/);
  if (!mark) throw new Error('logo.svg has no <g id="mark"> group');
  return mark[1].trim();
};

/** Width of the mark alone, in the logo's viewBox units (its height is 330). */
export const LOGO_MARK_WIDTH = 591;
export const LOGO_HEIGHT = 330;
