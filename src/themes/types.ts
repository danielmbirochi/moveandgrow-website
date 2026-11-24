export type ThemeName = 'oficina' | 'sistema';

export const colorRoles = [
  'ground',
  'ink',
  'surface',
  'surfaceRaised',
  'muted',
  'body',
  'accent',
  'onAccent',
  'accentText',
  'accentTextOnInverse',
  'border',
  'inverseGround',
  'inverseInk',
] as const;

export type ColorRole = (typeof colorRoles)[number];

export type FontSpec = {
  /** CSS family name as declared by the Fontsource package, e.g. 'Inter'. */
  family: string;
  weights: number[];
  /** Fontsource package name, e.g. '@fontsource/inter'. */
  fontsource: string;
};

export type Theme = {
  name: ThemeName;
  colors: Record<ColorRole, string>;
  fonts: { heading: FontSpec; body: FontSpec; label: FontSpec };
  radii: { control: string; card: string; pill: string };
  style: {
    label: 'mono' | 'pill';
    numbered: 'rule' | 'circle';
    card: 'outline' | 'filled';
  };
};
