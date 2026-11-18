import { colors } from './colors';
import { spacing } from './spacing';
import { fonts, typography } from './typography';

export const theme = {
  colors,
  spacing,
  typography,
  fonts,
} as const;

export type Theme = typeof theme;

// Re-export everything for flexible imports
export * from './colors';
export * from './spacing';
export * from './typography';
