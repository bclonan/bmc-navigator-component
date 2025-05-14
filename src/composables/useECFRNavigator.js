import { useECFRStore } from '../stores/ecfr';

/**
 * A helper for interacting with the ECFR navigation state outside of components
 * @returns {Object} An object containing ECFR navigator methods and computed properties
 */
export function useECFRNavigator() {
  const ecfrStore = useECFRStore();
  
  return {
    /**
     * Set the root data items
     * @param {Array} items - The root items to set
     */
    setData(items) {
      ecfrStore.setRootItems(items);
    },
    
    /**
     * Navigate to an item by its ID
     * @param {string} itemId - The ID of the item to navigate to
     * @returns {boolean} True if the item was found and navigation occurred, false otherwise
     */
    navigateTo(itemId) {
      // Helper function to find an item by ID recursively
      const findItemById = (items, id, path = []) => {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const currentPath = [...path, { item, index: i }];
          
          if (item.id === id) {
            return { item, path: currentPath };
          }
          
          if (item.children && item.children.length > 0) {
            const result = findItemById(item.children, id, currentPath);
            if (result) {
              return result;
            }
          }
        }
        
        return null;
      };
      
      const result = findItemById(ecfrStore.rootItems, itemId);
      
      if (result) {
        ecfrStore.navigateToPath(result.path);
        return true;
      }
      
      return false;
    },
    
    /**
     * Expand an item by its ID
     * @param {string} itemId - The ID of the item to expand
     */
    expandItem(itemId) {
      ecfrStore.expandItem(itemId);
    },
    
    /**
     * Collapse an item by its ID
     * @param {string} itemId - The ID of the item to collapse
     */
    collapseItem(itemId) {
      ecfrStore.collapseItem(itemId);
    },
    
    /**
     * Expand all items
     */
    expandAll() {
      ecfrStore.expandAll();
    },
    
    /**
     * Collapse all items
     */
    collapseAll() {
      ecfrStore.collapseAll();
    },
    
    /**
     * Get the current citation path as a string
     * @returns {string} The citation path
     */
    getCitationPath() {
      return ecfrStore.currentPath.map(p => {
        const item = p.item;
        if (item.type && item.number) {
          return `${item.type} ${item.number}`;
        }
        return item.title;
      }).join(' > ');
    },
    
    /**
     * Get the current root items
     * @returns {Array} The root items
     */
    getRootItems() {
      return ecfrStore.rootItems;
    },
    
    /**
     * Get the current item
     * @returns {Object} The current item
     */
    getCurrentItem() {
      return ecfrStore.currentItem;
    },
    
    /**
     * Get the current path
     * @returns {Array} The current path
     */
    getCurrentPath() {
      return ecfrStore.currentPath;
    },
    
    /**
     * Get the breadcrumb path
     * @returns {Array} The breadcrumb path
     */
    getBreadcrumbPath() {
      return ecfrStore.breadcrumbPath;
    }
  };
}