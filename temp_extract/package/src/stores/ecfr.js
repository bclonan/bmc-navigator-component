import { defineStore } from 'pinia';

export const useECFRStore = defineStore('ecfr', {
  state: () => ({
    rootItems: [],
    currentPath: [],
    currentItem: null,
    expandedItems: new Set(),
    metadataRegistry: new Map(), // Store for injected metadata
    metadataProcessors: new Map() // Functions to process specific metadata types
  }),
  
  getters: {
    breadcrumbPath() {
      return this.currentPath;
    },
    
    isItemExpanded() {
      return (itemId) => this.expandedItems.has(itemId);
    },
    
    /**
     * Get metadata for an item
     * @param {string} itemId - ID of the item
     * @param {string} [metadataType] - Optional type of metadata to retrieve
     * @returns {Object|null} The metadata object or null if not found
     */
    getItemMetadata() {
      return (itemId, metadataType) => {
        if (!this.metadataRegistry.has(itemId)) {
          return null;
        }
        
        const itemMetadata = this.metadataRegistry.get(itemId);
        
        // If a specific metadata type is requested, return only that type
        if (metadataType && typeof itemMetadata === 'object') {
          return itemMetadata[metadataType] || null;
        }
        
        // Otherwise return all metadata for the item
        return itemMetadata;
      };
    },
    
    /**
     * Get the metadata for the current item
     * @param {string} [metadataType] - Optional type of metadata to retrieve
     * @returns {Object|null} The metadata object or null if not found
     */
    currentItemMetadata() {
      return (metadataType) => {
        if (!this.currentItem || !this.currentItem.id) {
          return null;
        }
        
        return this.getItemMetadata(this.currentItem.id, metadataType);
      };
    },
    
    /**
     * Get all registered metadata processors
     * @returns {Map} Map of metadata processors
     */
    allMetadataProcessors() {
      return this.metadataProcessors;
    }
  },
  
  actions: {
    setRootItems(items) {
      this.rootItems = items;
      // If we have items but no current selection, set the first item as current
      if (items.length > 0 && !this.currentItem) {
        this.selectItem(items[0], 0);
      }
    },
    
    selectItem(item, index, parentPath = []) {
      const newPath = [...parentPath, { item, index }];
      this.currentPath = newPath;
      this.currentItem = item;
      
      // Automatically expand the selected item if it has children
      if (item.children && item.children.length > 0) {
        this.expandItem(item.id);
      }
    },
    
    navigateToPath(path) {
      if (path.length > 0) {
        this.currentPath = path;
        this.currentItem = path[path.length - 1].item;
      }
    },
    
    expandItem(itemId) {
      this.expandedItems.add(itemId);
    },
    
    collapseItem(itemId) {
      this.expandedItems.delete(itemId);
    },
    
    toggleItemExpansion(itemId) {
      if (this.expandedItems.has(itemId)) {
        this.expandedItems.delete(itemId);
      } else {
        this.expandedItems.add(itemId);
      }
    },
    
    expandAll() {
      const addAllItemIds = (items) => {
        for (const item of items) {
          this.expandedItems.add(item.id);
          if (item.children) {
            addAllItemIds(item.children);
          }
        }
      };
      
      addAllItemIds(this.rootItems);
    },
    
    collapseAll() {
      this.expandedItems.clear();
    },
    
    /**
     * Register a metadata processor function for a specific metadata type
     * @param {string} metadataType - Type identifier for the metadata
     * @param {Function} processorFn - Function to process this type of metadata
     */
    registerMetadataProcessor(metadataType, processorFn) {
      if (typeof processorFn !== 'function') {
        console.error(`Metadata processor for '${metadataType}' must be a function`);
        return;
      }
      
      this.metadataProcessors.set(metadataType, processorFn);
    },
    
    /**
     * Remove a metadata processor
     * @param {string} metadataType - Type identifier for the metadata to remove
     */
    unregisterMetadataProcessor(metadataType) {
      this.metadataProcessors.delete(metadataType);
    },
    
    /**
     * Set metadata for an item
     * @param {string} itemId - ID of the item to attach metadata to
     * @param {Object} metadata - Metadata object to attach
     * @param {string} [metadataType] - Optional type identifier if adding a specific type
     */
    setItemMetadata(itemId, metadata, metadataType) {
      if (!itemId) {
        console.error('Cannot set metadata: Item ID is required');
        return;
      }
      
      // If this is the first metadata for this item, initialize a new object
      if (!this.metadataRegistry.has(itemId)) {
        this.metadataRegistry.set(itemId, {});
      }
      
      const itemMetadata = this.metadataRegistry.get(itemId);
      
      // If a metadata type is specified, set just that type
      if (metadataType) {
        itemMetadata[metadataType] = metadata;
      } else if (typeof metadata === 'object') {
        // Otherwise merge the entire metadata object
        Object.assign(itemMetadata, metadata);
      } else {
        console.error('Invalid metadata format: must be an object');
      }
    },
    
    /**
     * Process the metadata for an item with registered processor functions
     * @param {string} itemId - ID of the item to process metadata for
     * @param {string} [metadataType] - Optional type of metadata to process
     * @returns {any} The processed metadata or null if processing failed
     */
    processItemMetadata(itemId, metadataType) {
      const metadata = this.getItemMetadata(itemId, metadataType);
      if (!metadata) return null;
      
      // If no specific type is requested, process all available types
      if (!metadataType) {
        const result = {};
        
        for (const [type, data] of Object.entries(metadata)) {
          if (this.metadataProcessors.has(type)) {
            const processor = this.metadataProcessors.get(type);
            result[type] = processor(data, itemId);
          } else {
            result[type] = data; // No processor, return raw data
          }
        }
        
        return result;
      }
      
      // Process specific metadata type
      if (this.metadataProcessors.has(metadataType)) {
        const processor = this.metadataProcessors.get(metadataType);
        return processor(metadata, itemId);
      }
      
      // No processor for this type, return raw metadata
      return metadata;
    },
    
    /**
     * Remove metadata from an item
     * @param {string} itemId - ID of the item to remove metadata from
     * @param {string} [metadataType] - Optional type of metadata to remove (if not specified, removes all)
     */
    removeItemMetadata(itemId, metadataType) {
      if (!this.metadataRegistry.has(itemId)) {
        return; // No metadata to remove
      }
      
      if (!metadataType) {
        // Remove all metadata for this item
        this.metadataRegistry.delete(itemId);
        return;
      }
      
      // Remove specific metadata type
      const itemMetadata = this.metadataRegistry.get(itemId);
      if (itemMetadata && itemMetadata[metadataType]) {
        delete itemMetadata[metadataType];
      }
    }
  }
});