/**
 * Visual identity switch.
 *
 * Change `activeTheme` to 'sistema' (or any theme in src/themes/) and rebuild:
 * colours, typefaces, corners, label style and cards all follow.
 * The brand name below is the only place the company name is written.
 *
 * For a one-off build without editing this file: MG_THEME=sistema npm run build
 */
import type { ThemeName } from './src/themes/types';

export const activeTheme: ThemeName = 'oficina';

export const brand = {
  name: 'Move and Grow',
  shortName: 'M.G.',
};
