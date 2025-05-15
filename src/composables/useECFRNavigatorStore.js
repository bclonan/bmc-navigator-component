/**
 * Enhanced composable for accessing the ECFR store with additional helper methods
 * This makes it easier to work with the store outside of components
 */

import { useECFRStore } from '../stores/ecfr';
import { computed, reactive, readonly } from 'vue';
import Fuse from 'fuse.js';

/**
 * Hook to access the ECFR store with additional helper methods
 * @param {Object} options - Options for the navigator store
 * @param {boolean} [options.autoExpandSelected=true] - Whether to automatically expand selected items
 * @param {function} [options.onItemSelected] - Callback when an item is selected
 * @param {function} [options.onMetadataChanged] - Callback when metadata changes
 * @returns {Object} Store and helper methods
 */
export function useECFRNavigatorStore(options = {}) {
  const {
    autoExpandSelected = true,
    onItemSelected,
    onMetadataChanged
  } = options;
  
  const ecfrStore = useECFRStore();
  
  // State that components can access
  const state = reactive({
    // Items
    currentItem: null,
    selectedPath: [],
    rootItems: [],
    
    // Status
    loading: false,
    errors: [],
    
    // Metadata
    metadata: null,
    processedMetadata: null
  });
  
  // Update local state from store
  const updateLocalState = () => {
    state.currentItem = ecfrStore.currentItem;
    state.selectedPath = ecfrStore.currentPath;
    state.rootItems = ecfrStore.rootItems;
    
    if (state.currentItem && state.currentItem.id) {
      state.metadata = ecfrStore.getItemMetadata(state.currentItem.id);
      state.processedMetadata = ecfrStore.processItemMetadata(state.currentItem.id);
    } else {
      state.metadata = null;
      state.processedMetadata = null;
    }
  };
  
  /**
   * Set root data items
   * @param {Array} items - Root data items
   */
  const setData = (items) => {
    state.loading = false;
    ecfrStore.setRootItems(items);
    updateLocalState();
  };
  
  /**
   * Load data from a URL
   * @param {string|string[]} urls - URL or array of URLs to load data from
   * @returns {Promise} Promise that resolves when data is loaded
   */
  const loadData = async (urls) => {
    if (!urls) return;
    
    state.loading = true;
    state.errors = [];
    
    const urlsToFetch = Array.isArray(urls) ? urls : [urls];
    
    try {
      // Use Promise.all to fetch all URLs in parallel
      const responses = await Promise.all(
        urlsToFetch.map(url => fetch(url).then(response => {
          if (!response.ok) {
            throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
          }
          return response.json();
        }))
      );
      
      // Process and combine all results
      const combinedData = [];
      responses.forEach(data => {
        if (Array.isArray(data)) {
          combinedData.push(...data);
        } else if (data && typeof data === 'object') {
          if (Array.isArray(data.items)) {
            combinedData.push(...data.items);
          } else {
            combinedData.push(data);
          }
        }
      });
      
      setData(combinedData);
      return combinedData;
    } catch (error) {
      console.error('Error loading data:', error);
      state.errors.push(error.message);
      state.loading = false;
      throw error;
    }
  };
  
  /**
   * Select an item by its ID
   * @param {string} itemId - ID of the item to select
   * @returns {boolean} True if the item was found and selected
   */
  const selectItem = (itemId) => {
    if (!itemId) return false;
    
    const result = navigateTo(itemId);
    
    if (result && autoExpandSelected && state.currentItem) {
      ecfrStore.expandItem(state.currentItem.id);
    }
    
    if (result && onItemSelected && typeof onItemSelected === 'function') {
      onItemSelected(state.currentItem);
    }
    
    return result;
  };
  
  /**
   * Navigate to an item by its ID
   * @param {string} itemId - ID of the item to navigate to
   * @returns {boolean} True if the item was found and navigation occurred
   */
  const navigateTo = (itemId) => {
    if (!itemId) return false;
    
    // Find the item in the data
    const findItemPath = (items, targetId, currentPath = []) => {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        
        if (item.id === targetId) {
          // Item found, return the path
          const newPath = [...currentPath, { item, index: i }];
          ecfrStore.navigateToPath(newPath);
          updateLocalState();
          return true;
        }
        
        // Check children if they exist
        if (item.children && item.children.length > 0) {
          const childPath = [...currentPath, { item, index: i }];
          const found = findItemPath(item.children, targetId, childPath);
          if (found) return true;
        }
      }
      
      return false;
    };
    
    return findItemPath(ecfrStore.rootItems, itemId);
  };
  
  /**
   * Set metadata for an item
   * @param {string} itemId - ID of the item
   * @param {Object} metadata - Metadata to set
   * @param {string} [metadataType] - Optional metadata type
   */
  const setItemMetadata = (itemId, metadata, metadataType) => {
    ecfrStore.setItemMetadata(itemId, metadata, metadataType);
    
    if (state.currentItem && state.currentItem.id === itemId) {
      updateLocalState();
    }
    
    if (onMetadataChanged && typeof onMetadataChanged === 'function') {
      onMetadataChanged({
        action: 'add',
        itemId,
        metadataType,
        metadata
      });
    }
  };
  
  /**
   * Remove metadata from an item
   * @param {string} itemId - ID of the item
   * @param {string} [metadataType] - Optional metadata type
   */
  const removeItemMetadata = (itemId, metadataType) => {
    const oldMetadata = ecfrStore.getItemMetadata(itemId, metadataType);
    
    ecfrStore.removeItemMetadata(itemId, metadataType);
    
    if (state.currentItem && state.currentItem.id === itemId) {
      updateLocalState();
    }
    
    if (onMetadataChanged && typeof onMetadataChanged === 'function') {
      onMetadataChanged({
        action: 'remove',
        itemId,
        metadataType,
        oldMetadata
      });
    }
  };
  
  /**
   * Register a metadata processor
   * @param {string} metadataType - Type of metadata
   * @param {Function} processorFn - Processor function
   */
  const registerMetadataProcessor = (metadataType, processorFn) => {
    ecfrStore.registerMetadataProcessor(metadataType, processorFn);
    
    if (state.currentItem) {
      updateLocalState();
    }
  };
  
  /**
   * Unregister a metadata processor
   * @param {string} metadataType - Type of metadata
   */
  const unregisterMetadataProcessor = (metadataType) => {
    ecfrStore.unregisterMetadataProcessor(metadataType);
    
    if (state.currentItem) {
      updateLocalState();
    }
  };
  
  /**
   * Find items by query
   * @param {string} query - Search query
   * @param {Object} [options] - Search options
   * @returns {Array} Array of matching items
   */
  const findItems = (query, options = {}) => {
    const defaultOptions = {
      keys: ['label', 'title', 'content'],
      threshold: 0.4,
      includeMatches: true
    };
    
    const searchOptions = { ...defaultOptions, ...options };
    
    // Flatten the hierarchical structure for searching
    const flattenItems = (items, result = []) => {
      for (const item of items) {
        result.push(item);
        
        if (item.children && item.children.length > 0) {
          flattenItems(item.children, result);
        }
      }
      
      return result;
    };
    
    const flatItems = flattenItems(ecfrStore.rootItems);
    
    // Simple search for small datasets
    if (flatItems.length < 100 || !window.Worker) {
      const fuse = new Fuse(flatItems, searchOptions);
      return fuse.search(query);
    }
    
    // For larger datasets, use a worker if possible
    return new Promise((resolve) => {
      const workerCode = `
        importScripts('https://cdn.jsdelivr.net/npm/fuse.js@6.6.2/dist/fuse.min.js');
        
        self.onmessage = function(e) {
          const { items, query, options } = e.data;
          const fuse = new Fuse(items, options);
          const results = fuse.search(query);
          self.postMessage(results);
        };
      `;
      
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      const worker = new Worker(URL.createObjectURL(blob));
      
      worker.onmessage = (e) => {
        resolve(e.data);
        worker.terminate();
      };
      
      worker.postMessage({ items: flatItems, query, options: searchOptions });
    });
  };
  
  // Initialize state
  updateLocalState();
  
  // Return the store and helper methods
  return {
    // Readonly state that can't be mutated from outside
    state: readonly(state),
    
    // Store direct access
    store: ecfrStore,
    
    // Data methods
    setData,
    loadData,
    
    // Navigation methods
    selectItem,
    navigateTo,
    expandItem: (itemId) => {
      ecfrStore.expandItem(itemId);
      updateLocalState();
    },
    collapseItem: (itemId) => {
      ecfrStore.collapseItem(itemId);
      updateLocalState();
    },
    expandAll: () => {
      ecfrStore.expandAll();
      updateLocalState();
    },
    collapseAll: () => {
      ecfrStore.collapseAll();
      updateLocalState();
    },
    
    // Metadata methods
    setItemMetadata,
    removeItemMetadata,
    registerMetadataProcessor,
    unregisterMetadataProcessor,
    
    // Search methods
    findItems,
    
    // Computed shortcuts
    get currentItem() { return state.currentItem; },
    get selectedPath() { return state.selectedPath; },
    get rootItems() { return state.rootItems; },
    get metadata() { return state.metadata; },
    get processedMetadata() { return state.processedMetadata; },
    get loading() { return state.loading; },
    get errors() { return state.errors; }
  };
}

export default useECFRNavigatorStore;