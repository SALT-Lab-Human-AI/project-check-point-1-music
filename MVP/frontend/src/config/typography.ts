import { fontSize, fontWeight, lineHeight, fontFamily } from './design-tokens';

/**
 * Typography System
 * Consistent text sizing across the application
 * Uses design tokens for all values
 */

export const typography = {
  // Display - Main page titles
  display: {
    size: `text-[${fontSize.display}]`,
    weight: 'font-bold',
    leading: 'leading-tight',
    family: fontFamily.heading,
  },
  
  // H1 - Section headers
  h1: {
    size: `text-[${fontSize.h1}]`,
    weight: 'font-bold',
    leading: 'leading-tight',
    family: fontFamily.heading,
  },
  
  // H2 - Subsection headers, large buttons
  h2: {
    size: `text-[${fontSize.h2}]`,
    weight: 'font-semibold',
    leading: 'leading-snug',
    family: fontFamily.body,
  },
  
  // H3 - Component headers, medium buttons
  h3: {
    size: `text-[${fontSize.h3}]`,
    weight: 'font-semibold',
    leading: 'leading-snug',
    family: fontFamily.body,
  },
  
  // Body Large - Descriptions, important text
  bodyLg: {
    size: `text-[${fontSize.bodyLg}]`,
    weight: 'font-normal',
    leading: 'leading-relaxed',
    family: fontFamily.body,
  },
  
  // Body - Standard text
  body: {
    size: `text-[${fontSize.body}]`,
    weight: 'font-normal',
    leading: 'leading-relaxed',
    family: fontFamily.body,
  },
  
  // Body Small - Secondary text
  bodySm: {
    size: `text-[${fontSize.bodySm}]`,
    weight: 'font-normal',
    leading: 'leading-normal',
    family: fontFamily.body,
  },
  
  // Caption - Helper text, captions
  caption: {
    size: `text-[${fontSize.caption}]`,
    weight: 'font-normal',
    leading: 'leading-normal',
    family: fontFamily.body,
  },
} as const;

export type TypographyVariant = keyof typeof typography;

// Utility function to apply typography styles
export const getTypographyClasses = (variant: TypographyVariant): string => {
  const styles = typography[variant];
  return `${styles.size} ${styles.weight} ${styles.leading}`;
};
