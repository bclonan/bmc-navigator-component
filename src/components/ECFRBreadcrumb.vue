<template>
  <nav 
    class="flex text-sm overflow-x-auto" 
    :class="[
      darkMode ? 'text-gray-300' : 'text-gray-600', 
      options.style === 'compact' ? 'py-1 px-2' : 'py-2 px-3',
      options.style === 'boxed' ? 'rounded-md shadow-sm border bg-opacity-50' : '',
      darkMode && options.style === 'boxed' ? 'border-gray-700 bg-gray-800' : '', 
      !darkMode && options.style === 'boxed' ? 'border-gray-200 bg-gray-50' : '',
      options.bgColor ? options.bgColor : '',
      options.textSize ? options.textSize : ''
    ]"
    aria-label="Breadcrumb"
    :style="{ maxWidth: options.maxWidth || 'none' }"
  >
    <!-- Scrollable breadcrumbs container -->
    <ol 
      class="inline-flex items-center min-w-full"
      :class="[options.type === 'scrollable' ? 'flex-nowrap' : 'flex-wrap']"
    >
      <!-- Home/Root link (can be customized) -->
      <li v-if="!options.hideRootLink" class="inline-flex items-center shrink-0">
        <a 
          href="#" 
          class="transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded whitespace-nowrap"
          :class="[
            darkMode ? 'hover:text-blue-300' : 'hover:text-blue-600',
            options.style === 'button' ? 'px-2 py-1 rounded hover:bg-opacity-10 hover:bg-blue-500' : 'hover:underline',
          ]"
          @click.prevent="navigateToRoot"
          :title="options.rootLabel"
        >
          <!-- Home icon option -->
          <template v-if="options.useIcons">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
          </template>
          <template v-else>
            {{ options.rootLabel }}
          </template>
        </a>
      </li>

      <!-- Breadcrumb items (shows all items, or limited items if truncated) -->
      <template v-if="!options.truncate || path.length <= (options.maxVisible || 3)">
        <li v-for="(pathItem, index) in path" :key="`breadcrumb-path-${index}-${pathItem.id || index}`" class="shrink-0">
          <div class="flex items-center">
            <!-- Separator - customizable -->
            <div class="mx-1 flex-shrink-0" aria-hidden="true">
              <template v-if="options.separatorType === 'icon'">
                <svg 
                  class="w-4 h-4" 
                  :class="[darkMode ? 'text-gray-400' : 'text-gray-500']" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
              </template>
              <template v-else-if="options.separatorType === 'text'">
                <span :class="[darkMode ? 'text-gray-500' : 'text-gray-400']">
                  {{ options.separator || '/' }}
                </span>
              </template>
            </div>
            
            <!-- Breadcrumb link -->
            <a 
              href="#" 
              class="transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded truncate"
              :class="[
                darkMode ? 'hover:text-blue-300' : 'hover:text-blue-600',
                options.style === 'button' ? 'px-2 py-1 rounded hover:bg-opacity-10 hover:bg-blue-500' : 'hover:underline',
                isLastItem(index) && options.highlightLast ? 'font-medium' : '',
                options.maxItemWidth ? 'max-w-[' + options.maxItemWidth + ']' : '',
              ]"
              @click.prevent="navigateToIndex(index)"
              :title="formatBreadcrumbLabel(pathItem)"
            >
              <span :class="{ truncate: options.truncateLabels }">
                {{ formatBreadcrumbLabel(pathItem) }}
              </span>
            </a>
          </div>
        </li>
      </template>
      
      <!-- Truncated breadcrumbs - shows first, ellipsis, and last few items -->
      <template v-else>
        <!-- First item -->
        <li class="shrink-0">
          <div class="flex items-center">
            <div class="mx-1 flex-shrink-0" aria-hidden="true">
              <template v-if="options.separatorType === 'icon'">
                <svg 
                  class="w-4 h-4" 
                  :class="[darkMode ? 'text-gray-400' : 'text-gray-500']" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
              </template>
              <template v-else-if="options.separatorType === 'text'">
                <span :class="[darkMode ? 'text-gray-500' : 'text-gray-400']">
                  {{ options.separator || '/' }}
                </span>
              </template>
            </div>
            <a 
              href="#" 
              class="transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded truncate"
              :class="[
                darkMode ? 'hover:text-blue-300' : 'hover:text-blue-600',
                options.style === 'button' ? 'px-2 py-1 rounded hover:bg-opacity-10 hover:bg-blue-500' : 'hover:underline',
              ]"
              @click.prevent="navigateToIndex(0)"
              :title="formatBreadcrumbLabel(path[0])"
            >
              <span :class="{ truncate: options.truncateLabels }">
                {{ formatBreadcrumbLabel(path[0]) }}
              </span>
            </a>
          </div>
        </li>
        
        <!-- Ellipsis indicator -->
        <li class="shrink-0">
          <div class="flex items-center">
            <div class="mx-1 flex-shrink-0" aria-hidden="true">
              <template v-if="options.separatorType === 'icon'">
                <svg 
                  class="w-4 h-4" 
                  :class="[darkMode ? 'text-gray-400' : 'text-gray-500']" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
              </template>
              <template v-else-if="options.separatorType === 'text'">
                <span :class="[darkMode ? 'text-gray-500' : 'text-gray-400']">
                  {{ options.separator || '/' }}
                </span>
              </template>
            </div>
            <span 
              class="px-2 py-1"
              :class="[darkMode ? 'text-gray-400' : 'text-gray-500']"
            >
              ...
            </span>
          </div>
        </li>
        
        <!-- Last visible items -->
        <li 
          v-for="(pathItem, idx) in visibleLastItems" 
          :key="`breadcrumb-last-${idx}-${pathItem.id || idx}`"
          class="shrink-0"
        >
          <div class="flex items-center">
            <div class="mx-1 flex-shrink-0" aria-hidden="true">
              <template v-if="options.separatorType === 'icon'">
                <svg 
                  class="w-4 h-4" 
                  :class="[darkMode ? 'text-gray-400' : 'text-gray-500']" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
                </svg>
              </template>
              <template v-else-if="options.separatorType === 'text'">
                <span :class="[darkMode ? 'text-gray-500' : 'text-gray-400']">
                  {{ options.separator || '/' }}
                </span>
              </template>
            </div>
            <a 
              href="#" 
              class="transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded truncate"
              :class="[
                darkMode ? 'hover:text-blue-300' : 'hover:text-blue-600',
                options.style === 'button' ? 'px-2 py-1 rounded hover:bg-opacity-10 hover:bg-blue-500' : 'hover:underline',
                isLastVisibleItem(idx) && options.highlightLast ? 'font-medium' : '',
                options.maxItemWidth ? 'max-w-[' + options.maxItemWidth + ']' : '',
              ]"
              @click.prevent="navigateToIndex(pathItem.index)"
              :title="formatBreadcrumbLabel(pathItem)"
            >
              <span :class="{ truncate: options.truncateLabels }">
                {{ formatBreadcrumbLabel(pathItem) }}
              </span>
            </a>
          </div>
        </li>
      </template>
    </ol>
  </nav>
</template>

<script>
import { useECFRStore } from '../stores/ecfr';

export default {
  name: 'ECFRBreadcrumb',
  
  props: {
    /**
     * The current navigation path
     */
    path: {
      type: Array,
      required: true
    },
    
    /**
     * Whether to use dark mode
     */
    darkMode: {
      type: Boolean,
      default: false
    },
    
    /**
     * Configuration options for the breadcrumb
     */
    options: {
      type: Object,
      default: () => ({})
    }
  },
  
  computed: {
    /**
     * Default options object
     * @returns {Object} Default options
     */
    defaultOptions() {
      return {
        rootLabel: 'Home',
        hideRootLink: false,
        truncate: false,
        truncateLabels: false,
        maxVisible: 3,
        visibleItems: 2,
        highlightLast: true,
        maxItemWidth: '12rem',
        separatorType: 'icon', // 'icon' or 'text'
        separator: '/',
        style: 'standard', // 'standard', 'compact', 'button', 'boxed'
        type: 'wrap', // 'wrap' or 'scrollable'
        useIcons: false,
        textSize: '',
        bgColor: '',
        maxWidth: ''
      };
    },
    
    /**
     * The merged options (default + provided)
     * @returns {Object} Merged options
     */
    mergedOptions() {
      return { ...this.defaultOptions, ...this.options };
    },
    
    /**
     * Visible last items when using truncation
     * @returns {Array} Items to show at the end of truncated breadcrumbs
     */
    visibleLastItems() {
      if (!this.path.length) return [];
      
      const maxVisible = this.mergedOptions.visibleItems || 2;
      const startIdx = Math.max(this.path.length - maxVisible, 1);
      
      return this.path.slice(startIdx).map((pathItem, idx) => ({
        ...pathItem,
        index: startIdx + idx
      }));
    }
  },
  
  methods: {
    /**
     * Format the breadcrumb label based on item type and metadata
     * @param {Object} item - The item to format
     * @returns {string} The formatted label
     */
    formatBreadcrumbLabel(item) {
      if (!item) return '';
      
      // Format title based on item type, label format preferences, and available metadata
      if (this.mergedOptions.labelFormat === 'numbered' && item.type && item.number) {
        return `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} ${item.number}${item.title ? ': ' + item.title : ''}`;
      } else if (this.mergedOptions.labelFormat === 'title-only') {
        return item.title || '';
      } else if (this.mergedOptions.labelFormat === 'number-only' && item.number) {
        return item.number;
      } else if (this.mergedOptions.labelFormat === 'type-number' && item.type && item.number) {
        return `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} ${item.number}`;
      } else if (item.type && item.number) {
        // Default format with type and number
        return `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} ${item.number}${item.title ? ': ' + item.title : ''}`;
      }
      
      return item.title || '';
    },
    
    /**
     * Check if an item is the last item in the path
     * @param {number} index - Index to check
     * @returns {boolean} True if it's the last item
     */
    isLastItem(index) {
      return index === this.path.length - 1;
    },
    
    /**
     * Check if an item is the last visible item in truncated view
     * @param {number} index - Index to check
     * @returns {boolean} True if it's the last visible item
     */
    isLastVisibleItem(index) {
      return index === this.visibleLastItems.length - 1;
    },
    
    /**
     * Navigate to the root level
     */
    navigateToRoot() {
      this.$emit('navigate', null);
    },
    
    /**
     * Navigate to a specific index in the path
     * @param {number} index - The index to navigate to
     */
    navigateToIndex(index) {
      if (this.path && this.path[index]) {
        this.$emit('navigate', this.path[index]);
      }
    },
    
    /**
     * Check if we should show a prefix for this item
     * @param {Object} item - The item to check
     * @returns {boolean} Whether to show a prefix
     */
    showPrefix(item) {
      return item && item.type && (item.type !== 'root');
    },
    
    /**
     * Get the prefix for an item based on its type
     * @param {Object} item - The item to get a prefix for
     * @returns {string} The item prefix
     */
    getItemPrefix(item) {
      if (!item || !item.type) return '';
      
      // Allow custom prefix if specified
      if (item.citationPrefix) {
        return item.citationPrefix;
      }
      
      // Default prefixes by type
      const typeMap = {
        title: 'Title',
        part: 'Part',
        section: 'Section',
        subpart: 'Subpart',
        chapter: 'Chapter',
        paragraph: 'Para.',
        subparagraph: 'Subpara.'
      };
      
      return typeMap[item.type] || item.type.charAt(0).toUpperCase() + item.type.slice(1);
    }
  }
};
</script>