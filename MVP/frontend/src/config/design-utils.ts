import { colors, spacing, borderRadius, fontSize, shadows, transitions } from './design-tokens';

/**
 * Design System Utilities
 * Helper functions for applying design tokens consistently
 */

// ===== COLOR UTILITIES =====
export const getColorClass = (color: string, type: 'bg' | 'text' | 'border' = 'bg'): string => {
  const prefix = type === 'bg' ? 'bg-' : type === 'text' ? 'text-' : 'border-';
  return `${prefix}[${color}]`;
};

export const getPrimaryColorClasses = (state: 'default' | 'hover' | 'active' = 'default'): string => {
  switch (state) {
    case 'hover':
      return `bg-[${colors.primary.hover}]`;
    case 'active':
      return `bg-[${colors.primary.active}]`;
    default:
      return `bg-[${colors.primary.DEFAULT}]`;
  }
};

// ===== SPACING UTILITIES =====
export const getSpacingClass = (
  value: keyof typeof spacing,
  type: 'p' | 'px' | 'py' | 'm' | 'mx' | 'my' | 'gap' = 'p'
): string => {
  return `${type}-[${spacing[value]}]`;
};

export const getResponsiveSpacing = (sizes: {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}): string => {
  const classes: string[] = [];
  
  if (sizes.sm) classes.push(`sm:p-[${sizes.sm}]`);
  if (sizes.md) classes.push(`md:p-[${sizes.md}]`);
  if (sizes.lg) classes.push(`lg:p-[${sizes.lg}]`);
  if (sizes.xl) classes.push(`xl:p-[${sizes.xl}]`);
  
  return classes.join(' ');
};

// ===== BORDER RADIUS UTILITIES =====
export const getBorderRadiusClass = (
  size: keyof typeof borderRadius
): string => {
  if (size === 'full') return 'rounded-full';
  return `rounded-[${borderRadius[size]}]`;
};

export const getResponsiveBorderRadius = (sizes: {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}): string => {
  const classes: string[] = [];
  
  if (sizes.sm) classes.push(`rounded-[${sizes.sm}]`);
  if (sizes.md) classes.push(`sm:rounded-[${sizes.md}]`);
  if (sizes.lg) classes.push(`md:rounded-[${sizes.lg}]`);
  if (sizes.xl) classes.push(`lg:rounded-[${sizes.xl}]`);
  
  return classes.join(' ');
};

// ===== TYPOGRAPHY UTILITIES =====
export const getResponsiveText = (sizes: {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}): string => {
  const classes: string[] = [];
  
  if (sizes.sm) classes.push(`text-[${sizes.sm}]`);
  if (sizes.md) classes.push(`sm:text-[${sizes.md}]`);
  if (sizes.lg) classes.push(`md:text-[${sizes.lg}]`);
  if (sizes.xl) classes.push(`lg:text-[${sizes.xl}]`);
  
  return classes.join(' ');
};

// ===== SHADOW UTILITIES =====
export const getShadowClass = (shadow: keyof typeof shadows): string => {
  if (shadow === 'none') return 'shadow-none';
  return `shadow-${shadow}`;
};

// ===== TRANSITION UTILITIES =====
export const getTransitionClass = (
  properties: string[] = ['all'],
  duration: keyof typeof transitions = 'base'
): string => {
  const props = properties.join(', ');
  return `transition-[${props}] duration-[${transitions[duration]}]`;
};

// ===== BUTTON UTILITIES =====
export const getButtonClasses = (
  variant: 'primary' | 'secondary' | 'tertiary' = 'primary',
  size: 'sm' | 'md' | 'lg' = 'md',
  disabled: boolean = false
): string => {
  const baseClasses = 'rounded-full font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Size classes
  const sizeClasses: Record<string, string> = {
    sm: `px-[32px] py-[16px] text-[${fontSize.h3}]`,
    md: `px-[40px] py-[20px] text-[${fontSize.h2}]`,
    lg: `px-[48px] py-[24px] text-[${fontSize.h2}]`,
  };
  
  // Variant classes
  const variantClasses: Record<string, string> = {
    primary: `bg-[${colors.primary.DEFAULT}] hover:bg-[${colors.primary.hover}] active:bg-[${colors.primary.active}] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 focus:ring-[${colors.primary.DEFAULT}]`,
    secondary: `bg-[${colors.primary.DEFAULT}] hover:bg-[${colors.primary.hover}] active:bg-[${colors.primary.active}] text-white hover:scale-105 active:scale-95 focus:ring-[${colors.primary.DEFAULT}]`,
    tertiary: `bg-[${colors.background.cream}] hover:bg-[${colors.background.creamHover}] active:bg-[${colors.background.creamActive}] text-gray-900 border border-gray-200 hover:scale-105 active:scale-95`,
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed hover:scale-100' : '';
  
  return `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${disabledClasses}`;
};

// ===== CARD UTILITIES =====
export const getCardClasses = (
  selected: boolean = false,
  variant: 'default' | 'orange' | 'blue' | 'green' = 'default'
): string => {
  const baseClasses = 'rounded-2xl border-2 p-4 transition-all duration-300 cursor-pointer';
  
  if (selected) {
    const selectedClasses: Record<string, string> = {
      default: `bg-white border-[${colors.primary.DEFAULT}] shadow-2xl`,
      orange: `bg-orange-50 border-orange-400 shadow-xl`,
      blue: `bg-blue-50 border-blue-400 shadow-xl`,
      green: `bg-green-50 border-green-400 shadow-xl`,
    };
    return `${baseClasses} ${selectedClasses[variant]}`;
  }
  
  return `${baseClasses} bg-white border-gray-200 hover:shadow-md hover:scale-105`;
};

// ===== RESPONSIVE UTILITIES =====
export const getResponsiveWidth = (sizes: {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
}): string => {
  const classes: string[] = [];
  
  if (sizes.base) classes.push(`w-[${sizes.base}]`);
  if (sizes.sm) classes.push(`sm:w-[${sizes.sm}]`);
  if (sizes.md) classes.push(`md:w-[${sizes.md}]`);
  if (sizes.lg) classes.push(`lg:w-[${sizes.lg}]`);
  
  return classes.join(' ');
};

export const getResponsiveGap = (sizes: {
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}): string => {
  const classes: string[] = [];
  
  if (sizes.sm) classes.push(`gap-[${sizes.sm}]`);
  if (sizes.md) classes.push(`sm:gap-[${sizes.md}]`);
  if (sizes.lg) classes.push(`md:gap-[${sizes.lg}]`);
  if (sizes.xl) classes.push(`lg:gap-[${sizes.xl}]`);
  
  return classes.join(' ');
};

// ===== ACCESSIBILITY UTILITIES =====
export const getFocusClasses = (): string => {
  return `focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[${colors.primary.DEFAULT}]`;
};

export const getHoverClasses = (scale: boolean = true): string => {
  const scaleClass = scale ? 'hover:scale-105' : '';
  return `hover:shadow-lg transition-all duration-200 ${scaleClass}`;
};

// ===== PRESET COMPONENT CLASSES =====
export const presets = {
  // Instrument Card (from InstrumentSelectionScreen)
  instrumentCard: (isSelected: boolean): string => {
    const gradient = `bg-gradient-to-b from-[${colors.primary.light}] to-[rgba(115,115,115,0)]`;
    const border = isSelected ? `border-[${colors.primary.DEFAULT}]` : `border-[${colors.border.light}]`;
    const ring = isSelected ? `ring-4 ring-[${colors.primary.DEFAULT}] shadow-2xl` : '';
    const baseClasses = getResponsiveBorderRadius({
      sm: '20px',
      md: '24px',
      lg: '28px',
      xl: '30px',
    });
    const padding = getResponsiveSpacing({
      sm: '24px',
      md: '32px',
      lg: '38px',
      xl: '45px',
    });
    
    return `${gradient} ${border} ${ring} ${baseClasses} ${padding} cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl`;
  },
  
  // Page Container
  pageContainer: (): string => {
    return `max-w-container mx-auto px-4 md:px-8 py-4`;
  },
  
  // Screen Background
  screenBackground: (): string => {
    return `bg-[${colors.background.cream}] relative w-full h-screen overflow-hidden flex flex-col`;
  },
};

export default {
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
};
