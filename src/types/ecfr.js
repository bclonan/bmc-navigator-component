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
 * @property {Object} [metadata] - Any metadata associated with the selected item
 * @property {Object} [processedMetadata] - Any processed metadata for the selected item
 */

/**
 * @typedef {Object} MetadataChangedEvent - Event emitted when metadata is changed
 * @property {string} action - The action performed ('add' or 'remove')
 * @property {string} itemId - ID of the item the metadata is associated with
 * @property {string} metadataType - Type of metadata that was changed
 * @property {Object} [metadata] - The metadata that was added (for 'add' action)
 * @property {Object} [oldMetadata] - The metadata that was removed (for 'remove' action)
 */

/**
 * @typedef {Function} MetadataProcessor - Function to process a specific type of metadata
 * @param {Object} metadata - The raw metadata to process
 * @param {string} itemId - ID of the item the metadata is associated with
 * @returns {Object} The processed metadata
 */

/**
 * @typedef {Object} XMLLinkMetadata - Example of XML link metadata structure
 * @property {string} url - URL to the XML resource
 * @property {string} [version] - Optional version of the XML
 */

/**
 * @typedef {Object} RenderTargetMetadata - Example of render target metadata structure
 * @property {string} elementId - ID of the element to render into
 * @property {string} [mode] - Optional rendering mode ('replace', 'append', etc.)
 */
