# UI Components

This directory contains reusable UI components for the application.

## Components

### Buttons.tsx
Provides a comprehensive set of button components following the application's design system.

**Components:**
- `PrimaryButton` - Main call-to-action buttons
- `SecondaryButton` - Important but secondary actions
- `TertiaryButton` - Less emphasized actions
- `IconButton` - Utility buttons with icons only
- `SelectionCard` - Multi-select option cards

**Features:**
- Consistent styling across the app
- Built-in hover, active, focus, and disabled states
- Loading state support for async actions
- Accessible with proper ARIA labels
- Maintains brand colors (#eb7f6f, #f8f3eb)

**Usage:**
```tsx
import { PrimaryButton, SecondaryButton } from './ui/Buttons';

<PrimaryButton onClick={handleSubmit}>
  Continue
</PrimaryButton>

<SecondaryButton onClick={handleRegenerate} isLoading={loading}>
  Regenerate
</SecondaryButton>
```

### ButtonDemo.tsx
A demo/reference page showing all button variants and typography examples. Not used in production.

**To view:**
Import and render `ButtonDemo` component to see all variants.

## Other UI Components

Additional UI components from shadcn/ui are available in this directory:
- `accordion.tsx`
- `alert-dialog.tsx`
- `button.tsx`
- `card.tsx`
- `dialog.tsx`
- `input.tsx`
- `label.tsx`
- `select.tsx`
- `tabs.tsx`
- And more...

Refer to [shadcn/ui documentation](https://ui.shadcn.com/) for usage of these components.

## Design Tokens

Typography and other design tokens are defined in:
- `/src/config/typography.ts` - Typography scale and weights

## Documentation

For complete design system documentation, see:
- `/DESIGN_SYSTEM.md` - Comprehensive design system guide
