<template>
  <div 
    class="ecfr-navigator" 
    :class="[options.theme === 'dark' ? 'dark-theme bg-gray-900' : 'light-theme bg-white']"
  >
    <!-- Breadcrumb navigation -->
    <ECFRBreadcrumb 
      v-if="options.showBreadcrumb" 
      :path="breadcrumbPath"
      :dark-mode="options.theme === 'dark'"
    />

    <!-- Control bar -->
    <div 
      class="flex flex-col sm:flex-row justify-between items-center p-2 border-b"
      :class="[options.theme === 'dark' ? 'border-gray-700' : 'border-gray-200']"
    >
      <div class="flex mb-2 sm:mb-0">
        <button
          class="px-3 py-1 text-sm rounded mr-2 focus:outline-none focus:ring-2 focus:ring-opacity-50"
          :class="[
            options.theme === 'dark' 
              ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 focus:ring-gray-500' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300'
          ]"
          @click="expandAll"
        >
          Expand All
        </button>
        
        <button
          class="px-3 py-1 text-sm rounded focus:outline-none focus:ring-2 focus:ring-opacity-50"
          :class="[
            options.theme === 'dark' 
              ? 'bg-gray-800 text-gray-200 hover:bg-gray-700 focus:ring-gray-500' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-300'
          ]"
          @click="collapseAll"
        >
          Collapse All
        </button>
      </div>
      
      <!-- Search box -->
      <div class="relative w-full sm:w-auto">
        <label for="ecfr-search" class="sr-only">Search document</label>
        <input
          id="ecfr-search"
          type="text"
          v-model="searchQuery"
          placeholder="Search..."
          aria-label="Search document"
          class="w-full sm:w-64 px-3 py-1 pr-10 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          :class="[
            options.theme === 'dark' 
              ? 'bg-gray-800 text-gray-200 border-gray-700' 
              : 'bg-white text-gray-700 border border-gray-300'
          ]"
          @keyup.enter="performSearch"
          @keyup.esc="clearSearch"
          @input="onSearchInput"
        />
        <button
          aria-label="Search"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          @click="performSearch"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Search results -->
    <div v-if="showSearchResults || (isLoading && searchQuery.trim())" 
      class="p-2 border-b"
      :class="[options.theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50']"
    >
      <!-- Loading state -->
      <div v-if="isLoading" class="flex justify-center items-center py-4">
        <div
          class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2"
          :class="[options.theme === 'dark' ? 'border-blue-400' : 'border-blue-600']"
        ></div>
        <div class="ml-2 text-sm" :class="[options.theme === 'dark' ? 'text-gray-300' : 'text-gray-700']">
          Searching...
        </div>
      </div>
      
      <!-- Results header -->
      <div v-else>
        <div class="flex justify-between items-center mb-2">
          <div class="flex items-center">
            <div class="text-sm font-medium mr-2"
              :class="[options.theme === 'dark' ? 'text-gray-300' : 'text-gray-700']"
            >
              Found {{ searchResults.length }} result{{ searchResults.length !== 1 ? 's' : '' }}
            </div>
            
            <!-- Fuzzy search badge -->
            <div v-if="mergedOptions.fuzzySearch.enabled" 
              class="text-xs px-2 py-0.5 rounded-full"
              :class="[options.theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800']"
            >
              Fuzzy
            </div>
          </div>
          
          <div class="flex items-center">
            <!-- Fuzzy search toggle -->
            <div class="flex items-center mr-2">
              <label class="text-xs mr-1" :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-600']">
                Fuzzy:
              </label>
              <button
                @click="toggleFuzzySearch"
                class="relative inline-flex h-4 w-8 items-center rounded-full transition-colors focus:outline-none"
                :class="[
                  mergedOptions.fuzzySearch.enabled 
                    ? (options.theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500') 
                    : (options.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300')
                ]"
              >
                <span
                  class="inline-block h-3 w-3 rounded-full bg-white transform transition-transform"
                  :class="mergedOptions.fuzzySearch.enabled ? 'translate-x-4' : 'translate-x-1'"
                ></span>
              </button>
            </div>
            
            <!-- Clear button -->
            <button 
              class="text-sm text-blue-500 hover:text-blue-700"
              @click="clearSearch"
            >
              Clear
            </button>
          </div>
        </div>
        
        <!-- Search sensitivity slider when fuzzy is enabled -->
        <div v-if="mergedOptions.fuzzySearch.enabled" class="mb-2 px-1">
          <div class="flex justify-between items-center text-xs mb-1">
            <span :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-600']">Exact</span>
            <span :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-600']">Flexible</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="8" 
            step="1" 
            v-model="fuzzyThresholdStep" 
            @change="updateFuzzyThreshold"
            class="w-full h-1 rounded-lg appearance-none cursor-pointer"
            :class="[options.theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300']"
          />
        </div>
      </div>
      
      <!-- Results list -->
      <div v-if="!isLoading" class="max-h-40 overflow-y-auto">
        <div v-if="searchResults.length === 0" 
          class="text-center p-4 text-sm"
          :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-500']"
        >
          No matches found for "{{ searchQuery }}"
        </div>
        
        <div 
          v-for="result in searchResults" 
          :key="result.id" 
          class="p-2 mb-1 rounded cursor-pointer hover:bg-opacity-80 transition-colors duration-200"
          :class="[
            options.theme === 'dark' 
              ? 'bg-gray-700 hover:bg-gray-600 text-gray-200' 
              : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-200'
          ]"
          @click="navigateToSearchResult(result)"
        >
          <div class="font-medium">{{ formatSearchResultTitle(result) }}</div>
          <div 
            v-if="result.matchContext" 
            class="text-xs mt-1 truncate"
            :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-600']"
          >
            {{ result.matchContext }}
          </div>
        </div>
      </div>
    </div>

    <!-- Main content area -->
    <div 
      class="ecfr-content overflow-y-auto p-2"
      :class="[options.theme === 'dark' ? 'text-gray-300' : 'text-gray-800']"
    >
      <div v-if="isLoading" class="flex justify-center items-center py-8">
        <div
          class="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2"
          :class="[options.theme === 'dark' ? 'border-blue-400' : 'border-blue-600']"
        ></div>
      </div>
      
      <div v-else-if="!rootItems.length" class="text-center py-12">
        <div 
          class="text-xl font-medium mb-2"
          :class="[options.theme === 'dark' ? 'text-gray-300' : 'text-gray-700']"
        >
          No data available
        </div>
        <div 
          class="text-sm"
          :class="[options.theme === 'dark' ? 'text-gray-400' : 'text-gray-500']"
        >
          Please provide eCFR data to display
        </div>
      </div>
      
      <div v-else>
        <ECFRSection
          v-for="(item, index) in rootItems"
          :key="item.id"
          :item="item"
          :index="index"
          :level="0"
          :dark-mode="options.theme === 'dark'"
          :options="mergedOptions"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useECFRStore } from '../stores/ecfr';
import ECFRBreadcrumb from './ECFRBreadcrumb.vue';
import ECFRSection from './ECFRSection.vue';
import Fuse from 'fuse.js';

export default {
  name: 'ECFRNavigator',
  
  components: {
    ECFRBreadcrumb,
    ECFRSection
  },
  
  props: {
    /**
     * The items to display in the navigator
     */
    items: {
      type: Array,
      required: true
    },
    
    /**
     * Options for configuring the navigator
     */
    options: {
      type: Object,
      default: () => ({})
    }
  },
  
  emits: ['item-selected', 'path-changed', 'search-completed', 'update:options', 'metadata-changed'],
  
  data() {
    return {
      ecfrStore: useECFRStore(),
      isLoading: false,
      searchQuery: '',
      searchResults: [],
      showSearchResults: false,
      fuseInstance: null,
      searchData: [],
      fuzzyThresholdStep: 4, // Default middle value (0-8 range)
      defaultOptions: {
        showBreadcrumb: true,
        expandAll: false,
        hideContentOnNavigation: false,
        theme: 'light',
        fuzzySearch: {
          enabled: true,
          threshold: 0.4, // 0 is exact, 1 is very loose
          distance: 100
        },
        display: {
          showTypeIcon: true,
          showItemNumbers: true,
          indentItems: true,
          compactMode: false,
          hideEmptyItems: false
        },
        pagination: {
          enabled: false,
          itemsPerPage: 20
        },
        navigation: {
          preserveState: true,
          scrollToSelected: true,
          autoExpandParents: true,
          autoCollapseOthers: false
        },
        printing: {
          enablePrintView: true,
          includeChildrenWhenPrinting: true
        }
      }
    };
  },
  
  computed: {
    /**
     * The merged options (default + user provided)
     */
    mergedOptions() {
      return { ...this.defaultOptions, ...this.options };
    },
    
    /**
     * The root items from the store
     */
    rootItems() {
      return this.ecfrStore.rootItems;
    },
    
    /**
     * The breadcrumb path from the store
     */
    breadcrumbPath() {
      return this.ecfrStore.breadcrumbPath;
    },
    
    /**
     * The current item from the store
     */
    currentItem() {
      return this.ecfrStore.currentItem;
    }
  },
  
  watch: {
    /**
     * Watch for changes in the items prop
     */
    items: {
      handler(newItems) {
        if (newItems && newItems.length > 0) {
          this.ecfrStore.setRootItems(newItems);
          
          // If the expandAll option is true, expand all items
          if (this.mergedOptions.expandAll) {
            this.ecfrStore.expandAll();
          }
          
          // Build search index for fuzzy search
          this.buildSearchIndex(newItems);
        }
      },
      immediate: true
    },
    
    /**
     * Watch for changes in the current item
     */
    'ecfrStore.currentItem': {
      handler(newItem) {
        if (newItem) {
          // Get any metadata for this item
          const metadata = this.ecfrStore.getItemMetadata(newItem.id);
          const processedMetadata = metadata ? 
            this.ecfrStore.processItemMetadata(newItem.id) : null;
          
          this.$emit('item-selected', {
            item: newItem,
            path: this.ecfrStore.breadcrumbPath,
            metadata: metadata,
            processedMetadata: processedMetadata
          });
        }
      }
    },
    
    /**
     * Watch for changes in the breadcrumb path
     */
    'ecfrStore.breadcrumbPath': {
      handler(newPath) {
        this.$emit('path-changed', newPath);
      }
    }
  },
  
  mounted() {
    if (this.items && this.items.length > 0) {
      this.ecfrStore.setRootItems(this.items);
      
      // If the expandAll option is true, expand all items
      if (this.mergedOptions.expandAll) {
        this.ecfrStore.expandAll();
      }
    }
  },
  
  methods: {
    /**
     * Expand all items
     */
    expandAll() {
      this.ecfrStore.expandAll();
    },
    
    /**
     * Collapse all items
     */
    collapseAll() {
      this.ecfrStore.collapseAll();
    },
    
    /**
     * Handle search input with debounce
     */
    onSearchInput() {
      // Auto-search after typing stops (debounce)
      clearTimeout(this._searchTimeout);
      this._searchTimeout = setTimeout(() => {
        // Only auto-search if query is at least 3 characters
        if (this.searchQuery.trim().length >= 3) {
          this.performSearch();
        } else if (this.searchQuery.trim().length === 0) {
          this.clearSearch();
        }
      }, 300); // 300ms debounce
    },
    
    /**
     * Build search index for fuzzy search
     */
    buildSearchIndex(items) {
      // Reset search data
      this.searchData = [];
      
      // Helper function to recursively process items and build flat search data
      const processItems = (items, parentPath = []) => {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const currentPath = [...parentPath, { item, index: i }];
          
          // Extract text content from HTML if present (strip tags)
          let contentText = '';
          if (item.content) {
            contentText = item.content.replace(/<[^>]*>/g, '');
          }
          
          // Add item to search data
          this.searchData.push({
            id: item.id,
            title: item.title || '',
            subtitle: item.subtitle || '',
            content: contentText,
            type: item.type || '',
            number: item.number || '',
            path: currentPath,
            item: item
          });
          
          // Process children recursively
          if (item.children && item.children.length > 0) {
            processItems(item.children, currentPath);
          }
        }
      };
      
      // Process items recursively
      processItems(items);
      
      // Configure Fuse.js options
      const fuseOptions = {
        shouldSort: true,
        includeScore: true,
        includeMatches: true,
        threshold: this.mergedOptions.fuzzySearch.threshold,
        location: 0,
        distance: this.mergedOptions.fuzzySearch.distance,
        maxPatternLength: 32,
        minMatchCharLength: 2,
        keys: [
          { name: 'title', weight: 0.7 },
          { name: 'subtitle', weight: 0.5 },
          { name: 'content', weight: 0.3 },
          { name: 'type', weight: 0.2 },
          { name: 'number', weight: 0.2 }
        ]
      };
      
      // Create Fuse instance
      this.fuseInstance = new Fuse(this.searchData, fuseOptions);
    },
    
    /**
     * Perform search across all items with fuzzy matching
     */
    performSearch() {
      if (!this.searchQuery.trim()) {
        this.clearSearch();
        return;
      }
      
      const query = this.searchQuery.trim();
      this.searchResults = [];
      this.isLoading = true;
      
      // Check if we should use fuzzy search
      if (this.mergedOptions.fuzzySearch.enabled && this.fuseInstance) {
        // Use Fuse.js for fuzzy search
        setTimeout(() => {
          // Search with a setTimeout to allow UI to update and show loading state
          const fuseResults = this.fuseInstance.search(query);
          
          // Process results
          this.searchResults = fuseResults.map(result => {
            const item = result.item.item;
            let matchContext = null;
            
            // Get the best match to highlight
            if (result.matches && result.matches.length > 0) {
              const bestMatch = result.matches[0];
              const matchValue = bestMatch.value || '';
              const matchKey = bestMatch.key;
              
              // Extract match context based on the matched field
              if (matchKey === 'title') {
                matchContext = `Title: ${matchValue}`;
              } else if (matchKey === 'subtitle') {
                matchContext = `Subtitle: ${matchValue}`;
              } else if (matchKey === 'content') {
                // Get context around the best match
                if (bestMatch.indices && bestMatch.indices.length > 0) {
                  const firstMatch = bestMatch.indices[0];
                  const matchStart = firstMatch[0];
                  const matchEnd = firstMatch[1] + 1;
                  
                  const startIndex = Math.max(0, matchStart - 50);
                  const endIndex = Math.min(matchValue.length, matchEnd + 50);
                  let context = matchValue.substring(startIndex, endIndex);
                  
                  // Add ellipsis if needed
                  if (startIndex > 0) {
                    context = '...' + context;
                  }
                  if (endIndex < matchValue.length) {
                    context = context + '...';
                  }
                  
                  matchContext = `Content: ${context}`;
                } else {
                  matchContext = `Content: ${matchValue.substring(0, 100)}...`;
                }
              } else {
                matchContext = `${matchKey.charAt(0).toUpperCase() + matchKey.slice(1)}: ${matchValue}`;
              }
            }
            
            return {
              ...item,
              matchContext,
              path: result.item.path,
              score: result.score
            };
          });
          
          // Sort by score (lower is better)
          this.searchResults.sort((a, b) => (a.score || 1) - (b.score || 1));
          
          // Show results and hide loading indicator
          this.showSearchResults = this.searchResults.length > 0;
          this.isLoading = false;
          
          // If no results, but we searched something, still show the results container
          if (this.searchResults.length === 0) {
            this.showSearchResults = true;
          }
          
          // Emit search event
          this.$emit('search-completed', {
            query,
            results: this.searchResults.length,
            fuzzy: true
          });
        }, 10);
        
        return;
      }
      
      // Fallback to regular search if fuzzy search is disabled or not available
      const searchQuery = query.toLowerCase();
      
      // Helper function to search recursively through items
      const searchInItems = (items, parentPath = []) => {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const currentPath = [...parentPath, { item, index: i }];
          
          // Check if item matches search query
          let matchFound = false;
          let matchContext = null;
          
          // Search in title
          if (item.title && item.title.toLowerCase().includes(searchQuery)) {
            matchFound = true;
            matchContext = `Title: ${item.title}`;
          }
          
          // Search in subtitle
          if (!matchFound && item.subtitle && item.subtitle.toLowerCase().includes(searchQuery)) {
            matchFound = true;
            matchContext = `Subtitle: ${item.subtitle}`;
          }
          
          // Search in content (strip HTML tags for searching)
          if (!matchFound && item.content) {
            const contentText = item.content.replace(/<[^>]*>/g, '').toLowerCase();
            if (contentText.includes(searchQuery)) {
              matchFound = true;
              
              // Get context around the match (50 chars before and after)
              const matchIndex = contentText.indexOf(searchQuery);
              const startIndex = Math.max(0, matchIndex - 50);
              const endIndex = Math.min(contentText.length, matchIndex + searchQuery.length + 50);
              let context = contentText.substring(startIndex, endIndex);
              
              // Add ellipsis if needed
              if (startIndex > 0) {
                context = '...' + context;
              }
              if (endIndex < contentText.length) {
                context = context + '...';
              }
              
              matchContext = `Content: ${context}`;
            }
          }
          
          // Add to search results if match found
          if (matchFound) {
            this.searchResults.push({
              ...item,
              matchContext,
              path: currentPath
            });
          }
          
          // Search in children recursively
          if (item.children && item.children.length > 0) {
            searchInItems(item.children, currentPath);
          }
        }
      };
      
      // Start recursive search
      searchInItems(this.rootItems);
      
      // Show search results and hide loading indicator
      this.showSearchResults = this.searchResults.length > 0;
      this.isLoading = false;
      
      // If no results, but we searched something, still show the results container
      if (this.searchResults.length === 0 && query) {
        this.showSearchResults = true;
      }
      
      // Emit search event
      this.$emit('search-completed', {
        query,
        results: this.searchResults.length
      });
    },
    
    /**
     * Clear search results
     */
    clearSearch() {
      this.searchQuery = '';
      this.searchResults = [];
      this.showSearchResults = false;
    },
    
    /**
     * Navigate to a search result
     */
    navigateToSearchResult(result) {
      if (result.path) {
        // Navigate to the result
        this.ecfrStore.navigateToPath(result.path);
        
        // Expand parents to ensure visibility
        result.path.forEach(pathItem => {
          if (pathItem.item.id) {
            this.ecfrStore.expandItem(pathItem.item.id);
          }
        });
        
        // Clear search after navigation
        this.clearSearch();
      }
    },
    
    /**
     * Format search result title
     */
    formatSearchResultTitle(result) {
      if (result.type && result.number) {
        return `${result.type.charAt(0).toUpperCase() + result.type.slice(1)} ${result.number}: ${result.title}`;
      }
      return result.title;
    },
    
    /**
     * Toggle fuzzy search on/off
     */
    toggleFuzzySearch() {
      // Create a new options object to avoid directly mutating props
      const newOptions = JSON.parse(JSON.stringify(this.mergedOptions));
      newOptions.fuzzySearch.enabled = !newOptions.fuzzySearch.enabled;
      
      // Update local options and rebuild the index
      this.$emit('update:options', newOptions);
      
      // Force a local update since the emit won't automatically update our merged options
      this.defaultOptions.fuzzySearch.enabled = newOptions.fuzzySearch.enabled;
      
      // Rebuild the search index with the new settings
      if (this.rootItems && this.rootItems.length > 0) {
        this.buildSearchIndex(this.rootItems);
      }
      
      // Re-run the search with the new settings
      if (this.searchQuery.trim()) {
        this.performSearch();
      }
    },
    
    /**
     * Update fuzzy search threshold based on slider position
     */
    updateFuzzyThreshold() {
      // Convert the step (0-8) to a threshold (0.1-0.9)
      // Lower threshold = more exact matches, higher = more fuzzy matches
      const newThreshold = (this.fuzzyThresholdStep / 10) + 0.1;
      
      // Create a new options object to avoid directly mutating props
      const newOptions = JSON.parse(JSON.stringify(this.mergedOptions));
      newOptions.fuzzySearch.threshold = newThreshold;
      
      // Update local options
      this.$emit('update:options', newOptions);
      
      // Force a local update since the emit won't automatically update our merged options
      this.defaultOptions.fuzzySearch.threshold = newThreshold;
      
      // Rebuild the search index with the new threshold
      if (this.rootItems && this.rootItems.length > 0) {
        this.buildSearchIndex(this.rootItems);
      }
      
      // Re-run the search with the new threshold
      if (this.searchQuery.trim()) {
        this.performSearch();
      }
    },
    
    /**
     * Add metadata to an item
     * @param {string} itemId - ID of the item to attach metadata to
     * @param {Object} metadata - Metadata object to attach
     * @param {string} [metadataType] - Optional type identifier if adding a specific type
     */
    addMetadata(itemId, metadata, metadataType) {
      this.ecfrStore.setItemMetadata(itemId, metadata, metadataType);
      
      // Emit event with metadata info
      this.$emit('metadata-changed', {
        action: 'add',
        itemId,
        metadataType: metadataType || 'all',
        metadata
      });
      
      // If this is for the current item, update the item-selected event
      if (this.ecfrStore.currentItem && this.ecfrStore.currentItem.id === itemId) {
        const processedMetadata = this.ecfrStore.processItemMetadata(itemId);
        
        this.$emit('item-selected', {
          item: this.ecfrStore.currentItem,
          path: this.ecfrStore.breadcrumbPath,
          metadata: this.ecfrStore.getItemMetadata(itemId),
          processedMetadata
        });
      }
    },
    
    /**
     * Remove metadata from an item
     * @param {string} itemId - ID of the item to remove metadata from
     * @param {string} [metadataType] - Optional type of metadata to remove (if not specified, removes all)
     */
    removeMetadata(itemId, metadataType) {
      // Store a copy of the metadata before removal for the event
      const oldMetadata = this.ecfrStore.getItemMetadata(itemId, metadataType);
      
      this.ecfrStore.removeItemMetadata(itemId, metadataType);
      
      // Emit event with removed metadata info
      this.$emit('metadata-changed', {
        action: 'remove',
        itemId,
        metadataType: metadataType || 'all',
        oldMetadata
      });
      
      // If this is for the current item, update the item-selected event
      if (this.ecfrStore.currentItem && this.ecfrStore.currentItem.id === itemId) {
        const metadata = this.ecfrStore.getItemMetadata(itemId);
        const processedMetadata = metadata ? 
          this.ecfrStore.processItemMetadata(itemId) : null;
        
        this.$emit('item-selected', {
          item: this.ecfrStore.currentItem,
          path: this.ecfrStore.breadcrumbPath,
          metadata: metadata,
          processedMetadata: processedMetadata
        });
      }
    },
    
    /**
     * Register a metadata processor function
     * @param {string} metadataType - Type identifier for the metadata
     * @param {Function} processorFn - Function to process this type of metadata
     */
    registerMetadataProcessor(metadataType, processorFn) {
      this.ecfrStore.registerMetadataProcessor(metadataType, processorFn);
    },
    
    /**
     * Remove a metadata processor
     * @param {string} metadataType - Type identifier for the metadata processor to remove
     */
    unregisterMetadataProcessor(metadataType) {
      this.ecfrStore.unregisterMetadataProcessor(metadataType);
    },
    
    /**
     * Get metadata for a specific item
     * @param {string} itemId - ID of the item
     * @param {string} [metadataType] - Optional specific metadata type to retrieve
     * @returns {Object|null} The metadata or null if not found
     */
    getMetadata(itemId, metadataType) {
      return this.ecfrStore.getItemMetadata(itemId, metadataType);
    },
    
    /**
     * Process metadata for an item with registered processors
     * @param {string} itemId - ID of the item
     * @param {string} [metadataType] - Optional specific metadata type to process
     * @returns {Object|null} The processed metadata or null
     */
    processMetadata(itemId, metadataType) {
      return this.ecfrStore.processItemMetadata(itemId, metadataType);
    }
  }
};
</script>

<style>
.ecfr-navigator {
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 300px;
  border-radius: 0.375rem;
  border-width: 1px;
  overflow: hidden;
}

.ecfr-content {
  flex: 1;
  min-height: 0;
}

.dark-theme {
  --text-primary: rgba(229, 231, 235, 1);
  --text-secondary: rgba(156, 163, 175, 1);
  --bg-primary: rgba(17, 24, 39, 1);
  --bg-secondary: rgba(31, 41, 55, 1);
  --border-color: rgba(55, 65, 81, 1);
}

.light-theme {
  --text-primary: rgba(31, 41, 55, 1);
  --text-secondary: rgba(107, 114, 128, 1);
  --bg-primary: rgba(255, 255, 255, 1);
  --bg-secondary: rgba(249, 250, 251, 1);
  --border-color: rgba(229, 231, 235, 1);
}
</style>
