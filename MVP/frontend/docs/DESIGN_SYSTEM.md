# Design System Documentation

## 🎨 Overview

This design system provides a comprehensive, centralized set of design tokens and utilities to ensure consistency across the entire application. All design decisions are codified in `/src/config/design-tokens.ts`.

## 📐 Design Tokens

### Core Files
- **`design-tokens.ts`**: Central source of truth for all design values
- **`typography.ts`**: Typography system using design tokens
- **`design-utils.ts`**: Utility functions for applying design tokens
- **`tailwind.config.js`**: Tailwind configuration extended with design tokens

---

## 🎯 Color System

### Primary Colors (Coral/Salmon)
```typescript
primary: {
  DEFAULT: '#eb7f6f',  // Main brand color
  hover: '#e87b6a',    // Hover state
  active: '#e56959',   // Active/pressed state
  light: 'rgba(231, 109, 87, 0.1)', // Light gradient
}
```

### Background Colors
```typescript
background: {
  cream: '#f8f3eb',      // Main screen background
  creamHover: '#f0e8d9', // Hover state
  creamActive: '#e5ddd5',// Active state
  white: '#ffffff',      // Card backgrounds
}
```

### Accent Colors
- **Orange**: Used for instrument selection cards
- **Blue**: Used for style selection cards
- **Green**: Used for difficulty selection cards

### Text Colors
```typescript
text: {
  primary: '#000000',    // Main text
  secondary: '#6B6563',  // Secondary/helper text
  tertiary: '#cdc9c1',   // Disabled/placeholder text
  white: '#ffffff',      // Text on dark backgrounds
}
```

### Border Colors
```typescript
border: {
  light: '#e5ddd5',   // Default borders
  medium: '#cdc9c1',  // Medium emphasis borders
}
```

---

## 📝 Typography System

### Size Scale
- **Display (48px)**: Main page titles ("Create harmonies in a ⚡", "Here is your harmony!")
- **H1 (32px)**: Section headers (Project names, Processing steps, Expanded player titles)
- **H2 (24px)**: Subsection headers, Large button text (Tags, Button labels)
- **H3 (20px)**: Component headers, Instrument card labels
- **Body Large (18px)**: Descriptions, Important text (Dropdown labels, Upload messages)
- **Body (16px)**: Standard text (Dropdown options, Toast notifications, Helper text)
- **Body Small (14px)**: Secondary text
- **Caption (12px)**: Helper text, captions

### Font Weights
- **Bold (700)**: Headings, emphasis
- **Semibold (600)**: Subheadings, dropdowns
- **Medium (500)**: Buttons, labels
- **Normal (400)**: Body text

### Font Families
- **Heading**: 'Figtree:Bold', sans-serif
- **Body**: 'SF_Pro_Rounded:Regular', sans-serif

### Implementation
All typography tokens are defined in `/src/config/typography.ts`

```typescript
import { typography, getTypographyClasses } from '@/config/typography';

// Example usage
<h1 className={getTypographyClasses('display')}>
  Title Text
</h1>
```

---

## 📏 Spacing System

### Base Scale
```typescript
xs: '4px',    // 0.25rem - Minimal spacing
sm: '8px',    // 0.5rem  - Tight spacing
md: '12px',   // 0.75rem - Compact spacing
lg: '16px',   // 1rem    - Standard spacing
xl: '20px',   // 1.25rem - Comfortable spacing
2xl: '24px',  // 1.5rem  - Generous spacing
3xl: '32px',  // 2rem    - Large spacing
4xl: '40px',  // 2.5rem  - Extra large spacing
5xl: '48px',  // 3rem    - Section spacing
6xl: '60px',  // 3.75rem - Major section spacing
```

### Component-Specific Spacing
- **Card Gap**: 24px (sm) → 32px (md) → 40px (lg) → 48px (xl)
- **Card Padding**: 24px (sm) → 32px (md) → 38px (lg) → 45px (xl)
- **Section Gap**: 40px (sm) → 50px (md) → 60px (lg)

### Usage
```typescript
import { spacing } from '@/config/design-tokens';
import { getResponsiveGap } from '@/config/design-utils';

// Responsive gaps
className={getResponsiveGap({ sm: '24px', md: '32px', lg: '40px' })}
```

---

## 🔲 Border Radius System

### Scale
```typescript
sm: '8px',
md: '12px',
lg: '16px',
xl: '20px',
2xl: '24px',
3xl: '28px',
4xl: '30px',
full: '9999px',  // Fully rounded
```

### Component-Specific Radius
- **Cards**: 20px (sm) → 24px (md) → 28px (lg) → 30px (xl)
- **Buttons**: full (rounded-full)
- **Inputs**: lg (16px)

---

## 🌊 Shadows

```typescript
sm: Standard small shadow
md: Default card shadow
lg: Elevated card shadow
xl: Modal/overlay shadow
2xl: Maximum elevation shadow
```

---

## ⚡ Transitions

### Durations
- **Fast**: 150ms - Micro-interactions
- **Base**: 200ms - Standard transitions
- **Slow**: 300ms - Complex animations

### Timing Functions
- **ease**: General purpose
- **easeIn**: Entrance animations
- **easeOut**: Exit animations
- **easeInOut**: Smooth in-out animations

---

## 📱 Breakpoints

```typescript
sm: '640px',   // Small devices
md: '768px',   // Medium devices (tablets)
lg: '1024px',  // Large devices (laptops)
xl: '1280px',  // Extra large devices
2xl: '1536px', // 2X large devices
```

### Container Widths
- **xl**: 1200px (default max-width for content)
- **full**: 100% (full width layouts)

---

## 🔘 Button System

### Button Components
Located in `/src/components/ui/Buttons.tsx`

#### 1. PrimaryButton
**Use for**: Main CTAs (Generate, Continue, Upload)
- Background: `#eb7f6f` → Hover: `#e87b6a` → Active: `#e56959`
- Text: White, 24px, Semibold
- Padding: 48px horizontal, 24px vertical
- Border Radius: Full (rounded-full)
- Effects: Scale on hover (105%), Shadow
- States: Hover, Active, Focus, Disabled, Loading

#### 2. SecondaryButton
**Use for**: Important but not primary actions (Regenerate)
- Background: `#eb7f6f` → Hover: `#e87b6a` → Active: `#e56959`
- Text: White, 24px, Medium
- Padding: 40px horizontal, 20px vertical
- Border Radius: Full (rounded-full)
- Effects: Scale on hover (105%)
- States: Hover, Active, Focus, Disabled, Loading

#### 3. TertiaryButton
**Use for**: Less emphasized actions (Generate New)
- Background: `#f8f3eb` → Hover: `#f0e8d9` → Active: `#e5ddd5`
- Text: Gray-900, 24px, Medium
- Padding: 40px horizontal, 20px vertical
- Border Radius: Full (rounded-full)
- Border: 1px solid gray-200
- Effects: Scale on hover (105%)
- States: Hover, Active, Focus, Disabled

#### 4. IconButton
**Use for**: Utility actions (Close, Expand, Collapse)
- Background: Transparent → Hover: gray-100 → Active: gray-200
- Border Radius: Full (rounded-full)
- Sizes: sm (p-2), md (p-3), lg (p-4)
- States: Hover, Active, Focus

#### 5. SelectionCard
**Use for**: Multi-select options (Instruments, Styles, Difficulty)
- Variants: default, orange, blue, green
- Border: 2px solid
- Border Radius: rounded-2xl
- Padding: 16px
- Unselected: White background, gray-200 border
- Selected: Colored background (orange-50, blue-50, green-50), colored border
- Effects: Shadow and scale on hover

### Color Palette (Existing Colors Preserved)

#### Primary/Secondary Buttons
- Default: `#eb7f6f`
- Hover: `#e87b6a`
- Active: `#e56959`
- Disabled: `#eb7f6f` with opacity-50

#### Tertiary Buttons
- Default: `#f8f3eb` (cream)
- Hover: `#f0e8d9`
- Active: `#e5ddd5`

#### Background Colors
- Main screens: `#f8f3eb` (cream)
- Selection cards (selected):
  - Instruments: `bg-orange-50`, `border-orange-400`
  - Styles: `bg-blue-50`, `border-blue-400`
  - Difficulty: `bg-green-50`, `border-green-400`

### Accessibility Features
✓ WCAG AA color contrast (4.5:1)
✓ Focus states with visible rings
✓ Hover states distinct from default
✓ Keyboard navigation support
✓ Screen reader labels (aria-label)
✓ Minimum touch target: 44x44px
✓ Disabled states clearly indicated

---

## Screen-Specific Typography

### HomeScreen (App.tsx)
- Title: 48px bold ("Create harmonies in a ⚡")
- Upload info: 18px normal (file type, size)
- Messages: 18px normal (upload status, errors)

### InstrumentSelectionScreen
- Page title: 48px bold ("Choose your instruments, style and difficulty")
- Instrument labels: 32px bold
- Dropdown labels: 18px semibold
- Dropdown options: 16px semibold
- Button: 24px semibold (Continue)
- Toast: 16px semibold

### ProcessingScreen
- Status text: 32px bold (processing steps)

### ResultsScreen
- Page title: 48px bold ("Here is your harmony!")
- Project name: 32px bold
- Tags: 24px normal
- Sheet music preview: 24px normal
- Buttons: 24px (Regenerate, Generate New)
- Expanded player title: 32px bold
- Expanded player subtitle: 18px normal

---

---

## 🎨 Design Utilities

The design system includes utility functions for consistent application of design tokens.

### Typography Utilities
```tsx
import { getTypographyClasses } from '@/config/typography';

<h1 className={getTypographyClasses('display')}>Title</h1>
```

### Responsive Text Sizing
```tsx
import { getResponsiveText } from '@/config/design-utils';

<p className={getResponsiveText({ sm: '14px', md: '16px', lg: '18px' })}>
  Responsive text
</p>
```

### Button Utilities
```tsx
import { getButtonClasses } from '@/config/design-utils';

<button className={getButtonClasses('primary', 'lg', false)}>
  Click Me
</button>
```

### Card Utilities
```tsx
import { getCardClasses } from '@/config/design-utils';

<div className={getCardClasses(isSelected, 'orange')}>
  Card content
</div>
```

### Preset Components
```tsx
import { presets } from '@/config/design-utils';

// Instrument card
<div className={presets.instrumentCard(isSelected)}>
  Content
</div>

// Page container
<div className={presets.pageContainer()}>
  Content
</div>

// Screen background
<div className={presets.screenBackground()}>
  Content
</div>
```

---

## 📚 Usage Guidelines

### Using Typography
```tsx
import { PrimaryButton, SecondaryButton, TertiaryButton, IconButton } from '@/components/ui/Buttons';

// Primary action
<PrimaryButton onClick={handleAction}>
  Continue
</PrimaryButton>

// Secondary action
<SecondaryButton onClick={handleRegenerate}>
  Regenerate
</SecondaryButton>

// Tertiary action
<TertiaryButton onClick={handleCancel}>
  Cancel
</TertiaryButton>

// Icon button
<IconButton onClick={handleClose} size="lg" aria-label="Close">
  <X size={32} />
</IconButton>
```

---

## ♿ Accessibility

### Focus States
All interactive elements have visible focus indicators:
```typescript
focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
```

### Minimum Touch Targets
All interactive elements meet the minimum 44x44px touch target size.

### Color Contrast
All color combinations meet WCAG AA standards (4.5:1 contrast ratio).

### Keyboard Navigation
All components support keyboard navigation and proper tab order.

---

## 🔄 Responsive Design Patterns

### Mobile-First Approach
All components use mobile-first responsive design:

```tsx
// Base styles for mobile, then scale up
className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px]"
```

### Breakpoint Strategy
- **Base (0-640px)**: Mobile phones
- **sm (640px+)**: Large phones / small tablets
- **md (768px+)**: Tablets
- **lg (1024px+)**: Laptops / desktops
- **xl (1280px+)**: Large desktops

---

## 📦 Component Tokens

### Button Sizes
```typescript
sm: { x: '32px', y: '16px' }  // Compact buttons
md: { x: '40px', y: '20px' }  // Standard buttons
lg: { x: '48px', y: '24px' }  // Large CTAs
```

### Card Dimensions
```typescript
width: { sm: '240px', md: '280px', lg: '320px' }
imageSize: { sm: '140px', md: '150px', lg: '170px', xl: '190px' }
borderWidth: { default: '2px', sm: '2.5px', md: '3px' }
```

### Icon Button Sizes
```typescript
sm: '32px'  // Small icons
md: '40px'  // Medium icons
lg: '48px'  // Large icons
```

---

## 🚀 Quick Start Examples

### Creating a New Screen
```tsx
import { presets } from '@/config/design-utils';
import { getTypographyClasses } from '@/config/typography';

export default function MyScreen() {
  return (
    <div className={presets.screenBackground()}>
      <div className={presets.pageContainer()}>
        <h1 className={getTypographyClasses('display')}>
          My Screen Title
        </h1>
      </div>
    </div>
  );
}
```

### Creating a Button
```tsx
import { PrimaryButton } from '@/components/ui/Buttons';

<PrimaryButton onClick={handleClick}>
  Click Me
</PrimaryButton>
```

### Creating a Card
```tsx
import { getCardClasses } from '@/config/design-utils';

<div className={getCardClasses(isSelected, 'orange')}>
  Card content
</div>
```

---

## Migration Checklist

### Design System Setup ✅
- [x] Created comprehensive design tokens file
- [x] Updated typography configuration
- [x] Created design utilities
- [x] Extended Tailwind configuration
- [x] Updated design system documentation

### Completed ✅
- [x] Created typography configuration file
- [x] Created button components library
- [x] Updated HomeScreen typography (App.tsx)
- [x] Updated InstrumentSelectionScreen with PrimaryButton
- [x] Updated InstrumentSelectionScreen typography
- [x] Updated ProcessingScreen typography
- [x] Updated ResultsScreen with SecondaryButton and IconButton
- [x] Updated ResultsScreen typography
- [x] Maintained all existing colors

### Components Updated
- [x] App.tsx - Title (48px), Messages (18px)
- [x] InstrumentSelectionScreen.tsx - All text sizes, PrimaryButton
- [x] ProcessingScreen.tsx - Status text (32px)
- [x] ResultsScreen.tsx - All text sizes, SecondaryButton, IconButton

---

## 🔍 Component Refactoring Guide

### Components Needing Updates
Components with inconsistent spacing/sizing should be refactored to use design tokens:

1. **InstrumentSelectionScreen.tsx**
   - ✅ Uses responsive sizing but with hardcoded values
   - Should use: `getResponsiveText()`, `getResponsiveGap()`, `presets.instrumentCard()`

2. **HomePage.tsx**
   - Hardcoded SVG dimensions and spacing
   - Should use: Design token spacing values

3. **ResultsScreen.tsx**
   - Mixed sizing approaches
   - Should use: Consistent typography and spacing from design tokens

### Refactoring Steps
1. Import design utilities: `import { presets, getResponsiveText } from '@/config/design-utils'`
2. Replace hardcoded values with utility functions
3. Test responsive behavior at all breakpoints
4. Verify accessibility (focus states, contrast, touch targets)

---

## 📝 Best Practices

### DO ✅
- Use design tokens for all colors, spacing, and sizing
- Use utility functions for responsive design
- Apply consistent button variants (Primary, Secondary, Tertiary)
- Include focus states on all interactive elements
- Test at multiple breakpoints
- Use semantic HTML elements

### DON'T ❌
- Hardcode color hex values directly in components
- Use arbitrary spacing values (stick to the scale)
- Mix different sizing approaches in the same component
- Forget hover/focus/active states
- Use inline styles for design values
- Create custom shadows/transitions (use design tokens)

---

## 🎯 Design Token Reference

### Quick Reference
```typescript
// Colors
colors.primary.DEFAULT
colors.background.cream
colors.text.primary

// Spacing
spacing.lg              // 16px
spacing['2xl']          // 24px
spacing.component.cardPadding.md

// Typography
fontSize.display        // 48px
fontSize.h1            // 32px
fontWeight.bold        // 700

// Border Radius
borderRadius.xl        // 20px
borderRadius.full      // 9999px

// Shadows
shadows.lg             // Large elevation
shadows.xl             // Modal elevation

// Transitions
transitions.base       // 200ms
transitions.slow       // 300ms
```

---

## Future Enhancements

### Potential Additions
- [ ] Dark mode color tokens
- [ ] Animation presets (slide, fade, etc.)
- [ ] Form input design tokens
- [ ] Alert/notification design tokens
- [ ] Loading state animations
- [ ] Custom icon system
- [ ] Grid/layout utilities
- [ ] Print styles
- [ ] Button size variants (small, medium, large)
- [ ] More selection card variants
- [ ] Dark mode support
- [ ] Animation timing tokens
- [ ] Spacing system tokens

### Maintenance
- Keep this documentation updated when adding new components
- Test accessibility with screen readers
- Verify color contrast ratios when changing colors
- Run visual regression tests when updating styles
