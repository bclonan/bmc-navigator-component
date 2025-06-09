# Material-UI Component Library for Vue 3

A comprehensive collection of Vue 3 component analogs based on Material-UI, built with Tailwind CSS and optimized for financial applications.

## Components Overview

### Data Display
- **MAvatar** - User profile pictures, initials, or icons
- **MBadge** - Small status indicators and notification counts
- **MChip** - Compact elements for actions, selections, or filtering
- **MTypography** - Consistent text styling across all variants

### Feedback
- **MAlert** - Important messages with different severity levels
- **MCircularProgress** - Circular loading indicators
- **MLinearProgress** - Linear loading indicators
- **MSnackbar** - Brief messages that appear temporarily

### Inputs
- **MFormControl** - Wrapper for form input components
- **MInput** - Text input fields with various styles
- **MInputLabel** - Labels for form controls
- **MFormHelperText** - Helper text for form fields
- **MIconButton** - Buttons containing only icons

### Layout
- **MAppBar** - Top application bars
- **MDrawer** - Navigation drawers
- **MToolbar** - Container for navigation actions

### Navigation
- **MList** - Lists of content
- **MListItem** - Individual list items

### Surfaces
- **MDialog** - Modal dialogs
- **MDialogTitle** - Dialog header
- **MDialogContent** - Dialog body content
- **MDialogActions** - Dialog action buttons

## Usage Examples

### Basic Avatar
```vue
<template>
  <MAvatar>JD</MAvatar>
  <MAvatar src="/path/to/image.jpg" alt="John Doe" />
  <MAvatar color="primary" size="large">AB</MAvatar>
</template>
```

### Alert Messages
```vue
<template>
  <MAlert severity="success" title="Success">
    Operation completed successfully!
  </MAlert>
  <MAlert severity="error" closable @close="handleClose">
    An error occurred during processing.
  </MAlert>
</template>
```

### Form Controls
```vue
<template>
  <MFormControl full-width>
    <MInputLabel>Email Address</MInputLabel>
    <MInput
      v-model="email"
      type="email"
      placeholder="Enter your email"
    />
    <MFormHelperText>We'll never share your email</MFormHelperText>
  </MFormControl>
</template>
```

### Dialog Example
```vue
<template>
  <MDialog :open="dialogOpen" @close="dialogOpen = false">
    <MDialogTitle>Confirm Action</MDialogTitle>
    <MDialogContent>
      Are you sure you want to proceed with this action?
    </MDialogContent>
    <MDialogActions>
      <button @click="dialogOpen = false">Cancel</button>
      <button @click="confirmAction">Confirm</button>
    </MDialogActions>
  </MDialog>
</template>
```

## Component Props

### Common Props
Most components support these common properties:

- `color` - Theme color variant (primary, secondary, error, success, warning, info)
- `size` - Component size (small, medium, large)
- `disabled` - Disabled state
- `variant` - Visual variant (filled, outlined, standard)

### Theming
Components use consistent color and sizing through shared constants:

```js
import { COLORS, SIZES, VARIANTS } from './utils/constants.js';
```

## Accessibility

All components include proper ARIA attributes and keyboard navigation support:

- Semantic HTML elements
- ARIA labels and descriptions
- Focus management
- Keyboard navigation
- Screen reader compatibility

## Performance

Components are optimized for performance:

- Vue 3 Composition API
- Reactive computed properties
- Minimal re-renders
- Efficient event handling
- Tree-shakable exports

## Testing

Comprehensive test suites ensure reliability:

- Unit tests for all components
- Integration tests for complex interactions
- Accessibility testing
- Performance benchmarks

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Installation

```bash
npm install @your-org/mui-vue3
```

## Import

```js
// Import individual components
import { MButton, MAvatar, MDialog } from '@your-org/mui-vue3';

// Import all components
import * as MUIComponents from '@your-org/mui-vue3';
```

## TypeScript Support

Full TypeScript definitions are included for all components and their props.

## Financial Applications

These components are specifically optimized for financial applications with:

- Enhanced form validation
- Secure input handling
- Professional styling
- Compliance-ready features
- Accessibility standards