// Material-UI Component Constants
export const COLORS = {
  inherit: 'inherit',
  default: 'default',
  primary: 'primary',
  secondary: 'secondary',
  error: 'error',
  info: 'info',
  success: 'success',
  warning: 'warning'
};

export const SIZES = {
  small: 'small',
  medium: 'medium',
  large: 'large'
};

export const VARIANTS = {
  filled: 'filled',
  outlined: 'outlined',
  standard: 'standard',
  text: 'text'
};

// Color mappings for consistent styling
export const COLOR_CLASSES = {
  filled: {
    default: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-purple-600 text-white hover:bg-purple-700',
    error: 'bg-red-600 text-white hover:bg-red-700',
    info: 'bg-cyan-600 text-white hover:bg-cyan-700',
    success: 'bg-green-600 text-white hover:bg-green-700',
    warning: 'bg-orange-600 text-white hover:bg-orange-700'
  },
  outlined: {
    default: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    primary: 'border border-blue-600 text-blue-600 hover:bg-blue-50',
    secondary: 'border border-purple-600 text-purple-600 hover:bg-purple-50',
    error: 'border border-red-600 text-red-600 hover:bg-red-50',
    info: 'border border-cyan-600 text-cyan-600 hover:bg-cyan-50',
    success: 'border border-green-600 text-green-600 hover:bg-green-50',
    warning: 'border border-orange-600 text-orange-600 hover:bg-orange-50'
  },
  text: {
    inherit: 'text-inherit',
    default: 'text-gray-600',
    primary: 'text-blue-600',
    secondary: 'text-purple-600',
    error: 'text-red-600',
    info: 'text-cyan-600',
    success: 'text-green-600',
    warning: 'text-orange-600'
  }
};

// Size mappings for consistent sizing
export const SIZE_CLASSES = {
  avatar: {
    small: 'w-8 h-8 text-sm',
    medium: 'w-10 h-10 text-base',
    large: 'w-14 h-14 text-lg'
  },
  button: {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg'
  },
  chip: {
    small: 'h-6 text-xs px-2',
    medium: 'h-8 text-sm px-3',
    large: 'h-10 text-base px-4'
  },
  input: {
    small: 'h-8 text-sm px-3',
    medium: 'h-10 text-base px-3',
    large: 'h-12 text-lg px-4'
  },
  iconButton: {
    small: 'p-1 text-sm',
    medium: 'p-2 text-base',
    large: 'p-3 text-lg'
  }
};

// Typography variants
export const TYPOGRAPHY_VARIANTS = {
  h1: { tag: 'h1', classes: 'text-6xl font-light leading-tight' },
  h2: { tag: 'h2', classes: 'text-5xl font-light leading-tight' },
  h3: { tag: 'h3', classes: 'text-4xl font-normal leading-tight' },
  h4: { tag: 'h4', classes: 'text-3xl font-normal leading-tight' },
  h5: { tag: 'h5', classes: 'text-2xl font-normal leading-tight' },
  h6: { tag: 'h6', classes: 'text-xl font-medium leading-tight' },
  subtitle1: { tag: 'h6', classes: 'text-base font-normal leading-relaxed' },
  subtitle2: { tag: 'h6', classes: 'text-sm font-medium leading-relaxed' },
  body1: { tag: 'p', classes: 'text-base font-normal leading-relaxed' },
  body2: { tag: 'p', classes: 'text-sm font-normal leading-relaxed' },
  button: { tag: 'span', classes: 'text-sm font-medium uppercase tracking-wide' },
  caption: { tag: 'span', classes: 'text-xs font-normal leading-tight' },
  overline: { tag: 'span', classes: 'text-xs font-normal uppercase tracking-wider' }
};

// Elevation shadows
export const ELEVATION_CLASSES = {
  0: 'shadow-none',
  1: 'shadow-sm',
  2: 'shadow',
  3: 'shadow-md',
  4: 'shadow-lg',
  6: 'shadow-xl',
  8: 'shadow-2xl',
  12: 'shadow-2xl',
  16: 'shadow-2xl',
  24: 'shadow-2xl'
};

// Position mappings
export const POSITION_CLASSES = {
  fixed: 'fixed top-0 left-0 right-0 z-50',
  absolute: 'absolute top-0 left-0 right-0 z-40',
  sticky: 'sticky top-0 z-40',
  static: 'static',
  relative: 'relative'
};

// Validation utilities
export const validateColor = (value) => Object.values(COLORS).includes(value);
export const validateSize = (value) => Object.values(SIZES).includes(value);
export const validateVariant = (value) => Object.values(VARIANTS).includes(value);