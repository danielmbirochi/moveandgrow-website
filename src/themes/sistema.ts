import type { Theme } from './types';

/** Theme B, "Sistema": a tech platform. Dark, rounded. */
export const sistema: Theme = {
  name: 'sistema',
  colors: {
    ground: '#12102E',
    ink: '#F3F2FF',
    surface: '#1C1946',
    surfaceRaised: '#2A2566',
    muted: '#B9B7D9',
    body: '#D5D3EE',
    accent: '#6C4DFF',
    onAccent: '#FFFFFF',
    accentText: '#7CF2C4',
    accentTextOnInverse: '#3F2BB8',
    border: '#8F8CC4',
    inverseGround: '#F3F2FF',
    inverseInk: '#12102E',
  },
  fonts: {
    heading: { family: 'Manrope', weights: [800], fontsource: '@fontsource/manrope' },
    body: { family: 'Inter', weights: [400, 600], fontsource: '@fontsource/inter' },
    label: { family: 'Inter', weights: [600], fontsource: '@fontsource/inter' },
  },
  radii: { control: '12px', card: '18px', pill: '9999px' },
  style: { label: 'pill', numbered: 'circle', card: 'filled' },
};
