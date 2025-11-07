# Design System Configuration

This directory contains the complete design system configuration for the application.

## 📂 Files

### `design-tokens.ts`
**Central source of truth** for all design values.

Contains:
- Color palette (primary, backgrounds, text, borders)
- Spacing scale (xs to 6xl)
- Typography scale (font sizes, weights, line heights)
- Border radius values
- Shadows
- Transitions and animations
- Breakpoints
- Component-specific tokens
- Accessibility standards

### `typography.ts`
Typography system built on design tokens.

Exports:
- `typography`: Predefined text styles (display, h1-h3, body sizes)
- `getTypographyClasses()`: Utility to apply typography styles

### `design-utils.ts`
Utility functions for applying design tokens consistently.

Exports:
- Color utilities: `getColorClass()`, `getPrimaryColorClasses()`
- Spacing utilities: `getSpacingClass()`, `getResponsiveSpacing()`
- Typography utilities: `getResponsiveText()`
- Component utilities: `getButtonClasses()`, `getCardClasses()`
- Preset components: `presets.instrumentCard()`, `presets.pageContainer()`
- Accessibility utilities: `getFocusClasses()`, `getHoverClasses()`

### `index.ts`
Entry point that exports all design system utilities.

Use this for imports:
```typescript
import { colors, spacing, getTypographyClasses, presets } from '@/config';
```

## 🚀 Quick Start

### 1. Import Design Tokens
```typescript
import { colors, spacing, fontSize } from '@/config/design-tokens';
```

### 2. Use Typography
```typescript
import { getTypographyClasses } from '@/config/typography';

<h1 className={getTypographyClasses('display')}>
  My Title
</h1>
```

### 3. Use Design Utilities
```typescript
import { getButtonClasses, presets } from '@/config/design-utils';

// Button
<button className={getButtonClasses('primary', 'lg', false)}>
  Click Me
</button>

// Page layout
<div className={presets.screenBackground()}>
  <div className={presets.pageContainer()}>
    Content
  </div>
</div>
```

### 4. Responsive Design
```typescript
import { getResponsiveText, getResponsiveGap } from '@/config/design-utils';

<div className={getResponsiveGap({ sm: '24px', md: '32px', lg: '40px' })}>
  <p className={getResponsiveText({ sm: '14px', md: '16px', lg: '18px' })}>
    Responsive text
  </p>
</div>
```

## 📋 Design System Guidelines

### Colors
✅ **DO**: Use design tokens
```typescript
bg-[${colors.primary.DEFAULT}]
```

❌ **DON'T**: Hardcode colors
```typescript
bg-[#eb7f6f]  // Don't do this
```

### Spacing
✅ **DO**: Use the spacing scale
```typescript
spacing.lg     // 16px
spacing['2xl'] // 24px
```

❌ **DON'T**: Use arbitrary values
```typescript
p-[17px]  // Don't do this - use spacing scale
```

### Typography
✅ **DO**: Use typography utilities
```typescript
import { getTypographyClasses } from '@/config/typography';
className={getTypographyClasses('h1')}
```

❌ **DON'T**: Mix text sizes
```typescript
className="text-[31px]"  // Don't do this - use predefined sizes
```

### Buttons
✅ **DO**: Use button components or utilities
```typescript
import { PrimaryButton } from '@/components/ui/Buttons';
<PrimaryButton>Click</PrimaryButton>
```

❌ **DON'T**: Create custom button styles
```typescript
// Don't create one-off button styles
```

## 🎨 Customization

### Adding New Colors
Edit `design-tokens.ts`:
```typescript
export const colors = {
  // ... existing colors
  newColor: {
    DEFAULT: '#hexvalue',
    hover: '#hexvalue',
  },
};
```

### Adding New Spacing
Edit `design-tokens.ts`:
```typescript
export const spacing = {
  // ... existing spacing
  '7xl': '72px',
};
```

### Adding New Component Tokens
Edit `design-tokens.ts`:
```typescript
export const components = {
  // ... existing components
  myComponent: {
    width: '300px',
    padding: '20px',
  },
};
```

## 📚 Documentation

- **[DESIGN_SYSTEM.md](../docs/DESIGN_SYSTEM.md)**: Complete design system documentation
- **[DESIGN_TOKENS_REFERENCE.md](../docs/DESIGN_TOKENS_REFERENCE.md)**: Visual reference for all tokens
- **[Guidelines.md](../docs/Guidelines.md)**: General usage guidelines

## 🔄 Migration Guide

### Updating Existing Components

1. **Import design utilities**
   ```typescript
   import { presets, getResponsiveText } from '@/config/design-utils';
   import { getTypographyClasses } from '@/config/typography';
   ```

2. **Replace hardcoded values**
   ```typescript
   // Before
   <div className="text-[24px] font-semibold">
   
   // After
   <div className={getTypographyClasses('h2')}>
   ```

3. **Use presets for common patterns**
   ```typescript
   // Before
   <div className="bg-[#f8f3eb] relative w-full h-screen overflow-hidden flex flex-col">
   
   // After
   <div className={presets.screenBackground()}>
   ```

4. **Apply responsive patterns**
   ```typescript
   // Before
   <div className="gap-[24px] sm:gap-[32px] md:gap-[40px] lg:gap-[48px]">
   
   // After
   <div className={getResponsiveGap({ sm: '24px', md: '32px', lg: '40px', xl: '48px' })}>
   ```

## ✅ Best Practices

1. **Always use design tokens** - Never hardcode design values
2. **Mobile-first responsive design** - Start with mobile, scale up
3. **Consistent spacing** - Stick to the spacing scale
4. **Typography hierarchy** - Use predefined text styles
5. **Accessibility** - Always include focus states and meet contrast ratios
6. **Component reusability** - Use presets for common patterns
7. **Type safety** - Leverage TypeScript types from design-tokens

## 🔗 Related Files

- `/src/components/ui/Buttons.tsx` - Button components using design system
- `/tailwind.config.js` - Tailwind configuration with design tokens
- `/docs/DESIGN_SYSTEM.md` - Complete documentation
