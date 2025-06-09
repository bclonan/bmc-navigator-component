// Helper utilities for Material-UI components
import { SIZE_CLASSES, COLOR_CLASSES, ELEVATION_CLASSES } from './constants.js';

/**
 * Get CSS classes for a component based on its props
 * @param {string} component - Component type (avatar, button, chip, etc.)
 * @param {Object} props - Component props
 * @returns {Array} Array of CSS classes
 */
export function getComponentClasses(component, props) {
  const classes = [];
  
  // Add size classes
  if (props.size && SIZE_CLASSES[component]) {
    classes.push(SIZE_CLASSES[component][props.size]);
  }
  
  // Add color classes
  if (props.color && props.variant && COLOR_CLASSES[props.variant]) {
    classes.push(COLOR_CLASSES[props.variant][props.color]);
  }
  
  // Add elevation classes
  if (typeof props.elevation === 'number') {
    classes.push(ELEVATION_CLASSES[Math.min(props.elevation, 24)]);
  }
  
  // Add disabled state
  if (props.disabled) {
    classes.push('opacity-50', 'cursor-not-allowed');
  }
  
  // Add full width
  if (props.fullWidth) {
    classes.push('w-full');
  }
  
  return classes.filter(Boolean);
}

/**
 * Generate unique ID for form elements
 * @param {string} prefix - ID prefix
 * @returns {string} Unique ID
 */
export function generateId(prefix = 'mui') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Deep merge objects
 * @param {Object} target - Target object
 * @param {Object} source - Source object
 * @returns {Object} Merged object
 */
export function deepMerge(target, source) {
  const result = { ...target };
  
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  
  return result;
}

/**
 * Debounce function for performance optimization
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if a value is empty
 * @param {any} value - Value to check
 * @returns {boolean} True if empty
 */
export function isEmpty(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
}

/**
 * Format display value for components
 * @param {any} value - Value to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted value
 */
export function formatDisplayValue(value, options = {}) {
  const { type, max, suffix, prefix } = options;
  
  if (isEmpty(value)) return '';
  
  switch (type) {
    case 'currency':
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
      }).format(value);
    
    case 'percentage':
      return `${value}%`;
    
    case 'number':
      if (typeof value === 'number' && max && value > max) {
        return `${max}+`;
      }
      return value.toString();
    
    default:
      const formatted = value.toString();
      return `${prefix || ''}${formatted}${suffix || ''}`;
  }
}

/**
 * Get focus trap elements for accessibility
 * @param {HTMLElement} container - Container element
 * @returns {Array} Array of focusable elements
 */
export function getFocusableElements(container) {
  const focusableSelectors = [
    'a[href]',
    'button:not([disabled])',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])'
  ].join(',');
  
  return Array.from(container.querySelectorAll(focusableSelectors));
}

/**
 * Handle keyboard navigation for components
 * @param {KeyboardEvent} event - Keyboard event
 * @param {Array} items - Navigation items
 * @param {number} currentIndex - Current focused index
 * @returns {number} New focused index
 */
export function handleKeyboardNavigation(event, items, currentIndex) {
  let newIndex = currentIndex;
  
  switch (event.key) {
    case 'ArrowDown':
      event.preventDefault();
      newIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
      break;
    
    case 'ArrowUp':
      event.preventDefault();
      newIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
      break;
    
    case 'Home':
      event.preventDefault();
      newIndex = 0;
      break;
    
    case 'End':
      event.preventDefault();
      newIndex = items.length - 1;
      break;
  }
  
  return newIndex;
}

/**
 * Convert hex color to RGB
 * @param {string} hex - Hex color value
 * @returns {Object} RGB values
 */
export function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Get contrast color (black or white) for a given background
 * @param {string} bgColor - Background color in hex
 * @returns {string} Contrast color
 */
export function getContrastColor(bgColor) {
  const rgb = hexToRgb(bgColor);
  if (!rgb) return '#000000';
  
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#ffffff';
}