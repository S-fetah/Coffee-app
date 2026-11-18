export const colors = {
  espresso: '#C67C4E',
  darkRoast: '#161616',
  frothWhite: '#FFFFFF',
  mutedGrey: '#9B9B9B',
  errorRed: '#ED5151',
} as const;

// Type of the entire colors object (read-only with exact hex values)
export type Colors = typeof colors;

// Optional bonus types if you need them:
// Union of all color names: "espresso" | "darkRoast" | "frothWhite" | ...
export type ColorKey = keyof typeof colors;

// Union of all hex values: "#C67C4E" | "#161616" | "#FFFFFF" | ...
export type ColorValue = (typeof colors)[ColorKey];
