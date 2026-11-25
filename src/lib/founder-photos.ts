import type { ImageMetadata } from 'astro';
import daniel from '../assets/founders/daniel.jpg';
import luiz from '../assets/founders/luiz.jpg';

/** Founder portraits, keyed by the `photo` slug in `src/content/sobre.ts`. */
export const founderPhotos = { daniel, luiz } satisfies Record<string, ImageMetadata>;

export type FounderPhoto = keyof typeof founderPhotos;
