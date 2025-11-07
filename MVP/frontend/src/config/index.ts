/**
 * Design System Entry Point
 * Centralized exports for the entire design system
 */

// Design Tokens
export {
  colors,
  spacing,
  borderRadius,
  fontSize,
  fontWeight,
  lineHeight,
  fontFamily,
  shadows,
  transitions,
  zIndex,
  breakpoints,
  containerWidth,
  accessibility,
  components,
} from './design-tokens';

export type {
  Color,
  Spacing,
  FontSize,
  FontWeight,
  Shadow,
  Transition,
  Breakpoint,
} from './design-tokens';

// Typography
export {
  typography,
  getTypographyClasses,
} from './typography';

export type { TypographyVariant } from './typography';

// Design Utilities
export {
  getColorClass,
  getPrimaryColorClasses,
  getSpacingClass,
  getResponsiveSpacing,
  getBorderRadiusClass,
  getResponsiveBorderRadius,
  getResponsiveText,
  getShadowClass,
  getTransitionClass,
  getButtonClasses,
  getCardClasses,
  getResponsiveWidth,
  getResponsiveGap,
  getFocusClasses,
  getHoverClasses,
  presets,
} from './design-utils';

// Default export for convenience
export { default as designUtils } from './design-utils';
