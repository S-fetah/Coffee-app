// 1. Define custom Sora font family names
export const fonts = {
  regular: 'Sora-Regular',
  medium: 'Sora-Medium',
  semiBold: 'Sora-SemiBold',
  bold: 'Sora-Bold',
} as const;

// 2. Define text presets with fontFamily, fontSize, lineHeight, and letterSpacing
export const typography = {
  h1: {
    fontFamily: fonts.bold,
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: fonts.semiBold,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.3,
  },
  h3: {
    fontFamily: fonts.semiBold,
    fontSize: 18,
    lineHeight: 24,
    letterSpacing: 0,
  },
  body: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    letterSpacing: 0,
  },
  button: {
    fontFamily: fonts.semiBold,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: 0.2,
  },
  caption: {
    fontFamily: fonts.regular,
    fontSize: 12,
    lineHeight: 16,
    letterSpacing: 0.4,
  },
} as const;

// 3. Export types derived with typeof
export type Fonts = typeof fonts;
export type Typography = typeof typography;

// Union of preset names: "h1" | "h2" | "h3" | "body" | "button" | "caption"
export type TypographyVariant = keyof typeof typography;
