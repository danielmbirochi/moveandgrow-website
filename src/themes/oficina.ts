import type { Theme } from './types';

/** Theme A, "Oficina": a workshop. Precise, plain, built by engineers. */
export const oficina: Theme = {
  name: 'oficina',
  colors: {
    ground: '#FFFFFF',
    ink: '#0E1B2A',
    surface: '#EEF1F4',
    surfaceRaised: '#EEF1F4',
    muted: '#44505E',
    body: '#2B3846',
    accent: '#FF5A1F',
    onAccent: '#0E1B2A',
    accentText: '#B93A0A',
    accentTextOnInverse: '#FF8A5C',
    border: '#C9D0D8',
    inverseGround: '#0E1B2A',
    inverseInk: '#FFFFFF',
  },
  fonts: {
    heading: { family: 'Space Grotesk', weights: [700], fontsource: '@fontsource/space-grotesk' },
    body: { family: 'Inter', weights: [400, 600], fontsource: '@fontsource/inter' },
    label: { family: 'JetBrains Mono', weights: [500], fontsource: '@fontsource/jetbrains-mono' },
  },
  radii: { control: '2px', card: '2px', pill: '2px' },
  style: { label: 'mono', numbered: 'rule', card: 'outline' },
};
