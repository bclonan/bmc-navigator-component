/**
 * Type definitions for the eCFR navigator component
 */

// These JSDoc comments will help provide type information in JavaScript

/**
 * @typedef {Object} ECFRItem - Represents a single item in the eCFR hierarchical structure
 * @property {string} id - Unique identifier for the item
 * @property {string} title - Title of the item
 * @property {string} [subtitle] - Optional subtitle of the item
 * @property {string} [content] - Optional content of the item
 * @property {ECFRItem[]} [children] - Optional array of child items
 * @property {string} [type] - Optional type of the item (title, part, section, etc.)
 * @property {string} [number] - Optional number identifier for the item
 * @property {string} [citationPrefix] - Optional citation prefix for the item
 */

/**
 * @typedef {Object} NavigationPath - Represents the navigation path in the eCFR hierarchy
 * @property {ECFRItem} item - The item at this point in the path
 * @property {number} index - The index of the item within its parent's children array
 */

/**
 * @typedef {Object} ECFRNavigatorOptions - Configuration options for the eCFR navigator
 * @property {boolean} [showBreadcrumb=true] - Whether to show the breadcrumb navigation
 * @property {boolean} [expandAll=false] - Whether to expand all items by default
 * @property {boolean} [hideContentOnNavigation=false] - Whether to hide content when navigating
 * @property {string} [theme='light'] - The theme to use ('light' or 'dark')
 */

/**
 * @typedef {Object} ItemSelectedEvent - Event emitted when an item is selected
 * @property {ECFRItem} item - The selected item
 * @property {NavigationPath[]} path - The path to the selected item
 */
