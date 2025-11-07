/**
 * Design Tokens System
 * Central source of truth for all design values
 */

// ===== COLOR SYSTEM =====
export const colors = {
  // Primary Colors (Coral/Salmon)
  primary: {
    DEFAULT: '#eb7f6f',
    hover: '#e87b6a',
    active: '#e56959',
    light: 'rgba(231, 109, 87, 0.1)', // For gradients
  },
  
  // Accent Colors
  accent: {
    orange: {
      50: '#fff7ed',
      100: '#ffedd5',
      400: '#fb923c',
      500: '#f97316',
    },
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      400: '#60a5fa',
      500: '#3b82f6',
    },
    green: {
      50: '#f0fdf4',
      100: '#dcfce7',
      400: '#4ade80',
      500: '#22c55e',
    },
  },
  
  // Background Colors
  background: {
    cream: '#f8f3eb',
    creamHover: '#f0e8d9',
    creamActive: '#e5ddd5',
    white: '#ffffff',
  },
  
  // Border Colors
  border: {
    light: '#e5ddd5',
    medium: '#cdc9c1',
    gray: '#e5e7eb', // gray-200
  },
  
  // Text Colors
  text: {
    primary: '#000000',
    secondary: '#6B6563',
    tertiary: '#cdc9c1',
    white: '#ffffff',
    gray900: '#111827',
  },
  
  // State Colors
  state: {
    disabled: 'rgba(0, 0, 0, 0.5)',
    hover: 'rgba(0, 0, 0, 0.05)',
    active: 'rgba(0, 0, 0, 0.1)',
  },
} as const;

// ===== SPACING SYSTEM =====
export const spacing = {
  // Base spacing scale (in px, converted to rem for accessibility)
  xs: '4px',    // 0.25rem
  sm: '8px',    // 0.5rem
  md: '12px',   // 0.75rem
  lg: '16px',   // 1rem
  xl: '20px',   // 1.25rem
  '2xl': '24px', // 1.5rem
  '3xl': '32px', // 2rem
  '4xl': '40px', // 2.5rem
  '5xl': '48px', // 3rem
  '6xl': '60px', // 3.75rem
  
  // Component-specific spacing
  component: {
    cardGap: {
      sm: '24px',
      md: '32px',
      lg: '40px',
      xl: '48px',
    },
    cardPadding: {
      sm: '24px',
      md: '32px',
      lg: '38px',
      xl: '45px',
    },
    sectionGap: {
      sm: '40px',
      md: '50px',
      lg: '60px',
    },
  },
} as const;

// ===== BORDER RADIUS SYSTEM =====
export const borderRadius = {
  none: '0',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '28px',
  '4xl': '30px',
  full: '9999px',
  
  // Component-specific radius
  component: {
    card: {
      sm: '20px',
      md: '24px',
      lg: '28px',
      xl: '30px',
    },
    button: 'full',
  },
} as const;

// ===== TYPOGRAPHY SCALE =====
export const fontSize = {
  // Display & Headings
  display: '48px',
  h1: '32px',
  h2: '24px',
  h3: '20px',
  
  // Body Text
  bodyLg: '18px',
  body: '16px',
  bodySm: '14px',
  caption: '12px',
  
  // Responsive Text (with breakpoint variations)
  responsive: {
    title: {
      sm: '20px',
      md: '22px',
      lg: '24px',
      xl: '26px',
    },
    subtitle: {
      sm: '13px',
      md: '14px',
      lg: '15px',
      xl: '16px',
    },
    caption: {
      sm: '12px',
      md: '13px',
      lg: '14px',
    },
  },
} as const;

export const fontWeight = {
  normal: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const lineHeight = {
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
} as const;

// ===== FONT FAMILIES =====
export const fontFamily = {
  heading: "'Figtree:Bold', sans-serif",
  body: "'SF_Pro_Rounded:Regular', sans-serif",
  system: "-apple-system, Roboto, Helvetica, sans-serif",
} as const;

// ===== SHADOWS =====
export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
} as const;

// ===== TRANSITIONS =====
export const transitions = {
  fast: '150ms',
  base: '200ms',
  slow: '300ms',
  
  timing: {
    ease: 'ease',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
  },
} as const;

// ===== Z-INDEX SCALE =====
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  overlay: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
} as const;

// ===== BREAKPOINTS =====
export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

// ===== CONTAINER WIDTHS =====
export const containerWidth = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1200px',
  full: '100%',
} as const;

// ===== ACCESSIBILITY =====
export const accessibility = {
  minTouchTarget: '44px',
  focusRingWidth: '2px',
  focusRingOffset: '2px',
  focusRingColor: colors.primary.DEFAULT,
} as const;

// ===== COMPONENT-SPECIFIC TOKENS =====
export const components = {
  button: {
    padding: {
      sm: { x: '32px', y: '16px' },
      md: { x: '40px', y: '20px' },
      lg: { x: '48px', y: '24px' },
    },
    fontSize: {
      sm: fontSize.h3,
      md: fontSize.h2,
      lg: fontSize.h2,
    },
    minWidth: {
      sm: '120px',
      md: '180px',
      lg: '240px',
    },
  },
  
  card: {
    width: {
      sm: '240px',
      md: '280px',
      lg: '320px',
    },
    imageSize: {
      sm: '140px',
      md: '150px',
      lg: '170px',
      xl: '190px',
    },
    borderWidth: {
      default: '2px',
      sm: '2.5px',
      md: '3px',
    },
  },
  
  iconButton: {
    size: {
      sm: '32px',
      md: '40px',
      lg: '48px',
    },
    padding: {
      sm: '8px',
      md: '12px',
      lg: '16px',
    },
  },
} as const;

// ===== TYPE EXPORTS =====
export type Color = typeof colors;
export type Spacing = typeof spacing;
export type FontSize = typeof fontSize;
export type FontWeight = keyof typeof fontWeight;
export type Shadow = keyof typeof shadows;
export type Transition = keyof typeof transitions;
export type Breakpoint = keyof typeof breakpoints;
