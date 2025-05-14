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
      <div v-else class="flex justify-between items-center mb-2">
        <div class="text-sm font-medium"
          :class="[options.theme === 'dark' ? 'text-gray-300' : 'text-gray-700']"
        >
          Found {{ searchResults.length }} result{{ searchResults.length !== 1 ? 's' : '' }}
        </div>
        <button 
          class="text-sm text-blue-500 hover:text-blue-700"
          @click="clearSearch"
        >
          Clear
        </button>
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
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useECFRStore } from '../stores/ecfr';
import ECFRBreadcrumb from './ECFRBreadcrumb.vue';
import ECFRSection from './ECFRSection.vue';

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
  
  emits: ['item-selected', 'path-changed', 'search-completed'],
  
  data() {
    return {
      ecfrStore: useECFRStore(),
      isLoading: false,
      searchQuery: '',
      searchResults: [],
      showSearchResults: false,
      defaultOptions: {
        showBreadcrumb: true,
        expandAll: false,
        hideContentOnNavigation: false,
        theme: 'light'
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
          this.$emit('item-selected', {
            item: newItem,
            path: this.ecfrStore.breadcrumbPath
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
     * Perform search across all items
     */
    performSearch() {
      if (!this.searchQuery.trim()) {
        this.clearSearch();
        return;
      }
      
      const query = this.searchQuery.toLowerCase().trim();
      this.searchResults = [];
      this.isLoading = true;
      
      // Helper function to search recursively through items
      const searchInItems = (items, parentPath = []) => {
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          const currentPath = [...parentPath, { item, index: i }];
          
          // Check if item matches search query
          let matchFound = false;
          let matchContext = null;
          
          // Search in title
          if (item.title && item.title.toLowerCase().includes(query)) {
            matchFound = true;
            matchContext = `Title: ${item.title}`;
          }
          
          // Search in subtitle
          if (!matchFound && item.subtitle && item.subtitle.toLowerCase().includes(query)) {
            matchFound = true;
            matchContext = `Subtitle: ${item.subtitle}`;
          }
          
          // Search in content (strip HTML tags for searching)
          if (!matchFound && item.content) {
            const contentText = item.content.replace(/<[^>]*>/g, '').toLowerCase();
            if (contentText.includes(query)) {
              matchFound = true;
              
              // Get context around the match (50 chars before and after)
              const matchIndex = contentText.indexOf(query);
              const startIndex = Math.max(0, matchIndex - 50);
              const endIndex = Math.min(contentText.length, matchIndex + query.length + 50);
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
