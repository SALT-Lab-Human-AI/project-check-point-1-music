# Design Tokens Quick Reference

This document provides a quick visual reference for all design tokens in the system.

## 🎨 Colors

### Primary Colors
| Token | Value | Usage | Preview |
|-------|-------|-------|---------|
| `colors.primary.DEFAULT` | `#eb7f6f` | Main brand color, buttons, CTAs | 🟠 |
| `colors.primary.hover` | `#e87b6a` | Hover state for primary elements | 🟠 |
| `colors.primary.active` | `#e56959` | Active/pressed state | 🟠 |
| `colors.primary.light` | `rgba(231, 109, 87, 0.1)` | Light gradient overlay | 🟠 (10% opacity) |

### Background Colors
| Token | Value | Usage | Preview |
|-------|-------|-------|---------|
| `colors.background.cream` | `#f8f3eb` | Main screen background | 🟤 |
| `colors.background.creamHover` | `#f0e8d9` | Hover state for cream backgrounds | 🟤 |
| `colors.background.creamActive` | `#e5ddd5` | Active state for cream backgrounds | 🟤 |
| `colors.background.white` | `#ffffff` | Card backgrounds, overlays | ⬜ |

### Text Colors
| Token | Value | Usage | Preview |
|-------|-------|-------|---------|
| `colors.text.primary` | `#000000` | Main text, headings | ⬛ |
| `colors.text.secondary` | `#6B6563` | Secondary text, descriptions | ⬛ (lighter) |
| `colors.text.tertiary` | `#cdc9c1` | Disabled text, placeholders | ⬛ (lightest) |
| `colors.text.white` | `#ffffff` | Text on dark backgrounds | ⬜ |

### Border Colors
| Token | Value | Usage |
|-------|-------|-------|
| `colors.border.light` | `#e5ddd5` | Default borders, dividers |
| `colors.border.medium` | `#cdc9c1` | Medium emphasis borders |

---

## 📏 Spacing Scale

| Token | Value | Rem | Usage |
|-------|-------|-----|-------|
| `spacing.xs` | `4px` | 0.25rem | Minimal spacing, icon gaps |
| `spacing.sm` | `8px` | 0.5rem | Tight spacing within components |
| `spacing.md` | `12px` | 0.75rem | Compact layouts |
| `spacing.lg` | `16px` | 1rem | Standard spacing |
| `spacing.xl` | `20px` | 1.25rem | Comfortable spacing |
| `spacing['2xl']` | `24px` | 1.5rem | Generous spacing |
| `spacing['3xl']` | `32px` | 2rem | Large spacing between sections |
| `spacing['4xl']` | `40px` | 2.5rem | Extra large spacing |
| `spacing['5xl']` | `48px` | 3rem | Section dividers |
| `spacing['6xl']` | `60px` | 3.75rem | Major section breaks |

### Component Spacing
```typescript
// Card gaps (responsive)
spacing.component.cardGap.sm    // 24px
spacing.component.cardGap.md    // 32px
spacing.component.cardGap.lg    // 40px
spacing.component.cardGap.xl    // 48px

// Card padding (responsive)
spacing.component.cardPadding.sm  // 24px
spacing.component.cardPadding.md  // 32px
spacing.component.cardPadding.lg  // 38px
spacing.component.cardPadding.xl  // 45px

// Section gaps (responsive)
spacing.component.sectionGap.sm  // 40px
spacing.component.sectionGap.md  // 50px
spacing.component.sectionGap.lg  // 60px
```

---

## 📝 Typography Scale

### Font Sizes
| Token | Value | Usage | Example |
|-------|-------|-------|---------|
| `fontSize.display` | `48px` | Page titles | # Large Title |
| `fontSize.h1` | `32px` | Section headers | ## Section Header |
| `fontSize.h2` | `24px` | Subsection headers | ### Subsection |
| `fontSize.h3` | `20px` | Component headers | #### Component |
| `fontSize.bodyLg` | `18px` | Important body text | Large paragraph |
| `fontSize.body` | `16px` | Standard text | Normal paragraph |
| `fontSize.bodySm` | `14px` | Secondary text | Small paragraph |
| `fontSize.caption` | `12px` | Captions, labels | Tiny text |

### Font Weights
| Token | Value | Usage |
|-------|-------|-------|
| `fontWeight.normal` | `400` | Body text |
| `fontWeight.medium` | `500` | Emphasis, labels |
| `fontWeight.semibold` | `600` | Subheadings |
| `fontWeight.bold` | `700` | Headings, strong emphasis |

### Line Heights
| Token | Value | Usage |
|-------|-------|-------|
| `lineHeight.tight` | `1.25` | Headings |
| `lineHeight.snug` | `1.375` | Subheadings |
| `lineHeight.normal` | `1.5` | Body text |
| `lineHeight.relaxed` | `1.625` | Comfortable reading |

---

## 🔲 Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `borderRadius.sm` | `8px` | Small elements |
| `borderRadius.md` | `12px` | Medium elements |
| `borderRadius.lg` | `16px` | Large elements, inputs |
| `borderRadius.xl` | `20px` | Extra large elements |
| `borderRadius['2xl']` | `24px` | Cards |
| `borderRadius['3xl']` | `28px` | Large cards |
| `borderRadius['4xl']` | `30px` | Extra large cards |
| `borderRadius.full` | `9999px` | Pills, buttons |

### Component Border Radius
```typescript
// Cards (responsive)
borderRadius.component.card.sm  // 20px
borderRadius.component.card.md  // 24px
borderRadius.component.card.lg  // 28px
borderRadius.component.card.xl  // 30px

// Buttons
borderRadius.component.button   // full (rounded-full)
```

---

## 🌊 Shadows

| Token | Usage | Example |
|-------|-------|---------|
| `shadows.sm` | Subtle depth | Small cards |
| `shadows.md` | Default elevation | Standard cards |
| `shadows.lg` | Elevated items | Hover states |
| `shadows.xl` | Modals, overlays | Dialogs |
| `shadows['2xl']` | Maximum elevation | Important modals |
| `shadows.inner` | Inset shadow | Input fields |
| `shadows.none` | No shadow | Flat design |

---

## ⚡ Transitions

### Durations
| Token | Value | Usage |
|-------|-------|-------|
| `transitions.fast` | `150ms` | Quick feedback (hover) |
| `transitions.base` | `200ms` | Standard transitions |
| `transitions.slow` | `300ms` | Complex animations |

### Timing Functions
| Token | Value | Usage |
|-------|-------|-------|
| `transitions.timing.ease` | `ease` | General purpose |
| `transitions.timing.easeIn` | `ease-in` | Entrance |
| `transitions.timing.easeOut` | `ease-out` | Exit |
| `transitions.timing.easeInOut` | `ease-in-out` | Smooth both ways |

---

## 📱 Breakpoints

| Token | Value | Device |
|-------|-------|--------|
| `breakpoints.sm` | `640px` | Large phones |
| `breakpoints.md` | `768px` | Tablets |
| `breakpoints.lg` | `1024px` | Laptops |
| `breakpoints.xl` | `1280px` | Desktops |
| `breakpoints['2xl']` | `1536px` | Large desktops |

---

## 🔘 Button Tokens

### Padding
```typescript
components.button.padding.sm  // x: 32px, y: 16px
components.button.padding.md  // x: 40px, y: 20px
components.button.padding.lg  // x: 48px, y: 24px
```

### Font Sizes
```typescript
components.button.fontSize.sm  // 20px (h3)
components.button.fontSize.md  // 24px (h2)
components.button.fontSize.lg  // 24px (h2)
```

### Minimum Widths
```typescript
components.button.minWidth.sm  // 120px
components.button.minWidth.md  // 180px
components.button.minWidth.lg  // 240px
```

---

## 🎴 Card Tokens

### Widths
```typescript
components.card.width.sm  // 240px
components.card.width.md  // 280px
components.card.width.lg  // 320px
```

### Image Sizes
```typescript
components.card.imageSize.sm  // 140px
components.card.imageSize.md  // 150px
components.card.imageSize.lg  // 170px
components.card.imageSize.xl  // 190px
```

### Border Widths
```typescript
components.card.borderWidth.default  // 2px
components.card.borderWidth.sm       // 2.5px
components.card.borderWidth.md       // 3px
```

---

## 🎯 Z-Index Scale

| Token | Value | Usage |
|-------|-------|-------|
| `zIndex.base` | `0` | Default layer |
| `zIndex.dropdown` | `10` | Dropdowns |
| `zIndex.sticky` | `20` | Sticky headers |
| `zIndex.overlay` | `30` | Overlays |
| `zIndex.modal` | `40` | Modals |
| `zIndex.popover` | `50` | Popovers |
| `zIndex.tooltip` | `60` | Tooltips |

---

## ♿ Accessibility Tokens

```typescript
accessibility.minTouchTarget    // 44px (WCAG requirement)
accessibility.focusRingWidth    // 2px
accessibility.focusRingOffset   // 2px
accessibility.focusRingColor    // colors.primary.DEFAULT
```

---

## 📦 Container Widths

| Token | Value | Usage |
|-------|-------|-------|
| `containerWidth.sm` | `640px` | Narrow content |
| `containerWidth.md` | `768px` | Medium content |
| `containerWidth.lg` | `1024px` | Wide content |
| `containerWidth.xl` | `1200px` | Max content width |
| `containerWidth.full` | `100%` | Full width |

---

## 💡 Usage Examples

### Import Design Tokens
```typescript
import { colors, spacing, fontSize } from '@/config/design-tokens';
```

### Use in Components
```typescript
// Direct usage
style={{ color: colors.text.primary, padding: spacing.lg }}

// With Tailwind
className="text-[#000000] p-[16px]"

// With utilities
import { getTypographyClasses } from '@/config/typography';
className={getTypographyClasses('display')}
```

### Responsive Patterns
```typescript
import { getResponsiveText, getResponsiveGap } from '@/config/design-utils';

// Responsive text
className={getResponsiveText({ 
  sm: '14px', 
  md: '16px', 
  lg: '18px', 
  xl: '20px' 
})}

// Responsive gap
className={getResponsiveGap({ 
  sm: '24px', 
  md: '32px', 
  lg: '40px', 
  xl: '48px' 
})}
```
