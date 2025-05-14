<template>
  <div 
    v-if="!shouldHideItem"
    class="ecfr-section mb-1" 
    :class="[
      darkMode ? 'border-gray-600' : 'border-gray-200',
      level > 0 && mergedOptions.display.indentItems ? 
        `pl-${Math.min(level * 4, 12)}` : '',
      mergedOptions.display.compactMode ? 'compact-mode' : '',
      !mergedOptions.display.indentItems ? '' : 'border-l-2'
    ]"
  >
    <div 
      class="flex items-start cursor-pointer p-2 hover:bg-opacity-10 transition-colors duration-200 rounded"
      :class="[
        isSelected ? (darkMode ? 'bg-blue-900 bg-opacity-20' : 'bg-blue-100') : '',
        hasChildren ? 'group' : '',
        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
      ]"
      @click="handleSelect"
    >
      <!-- Expand/collapse icon for items with children -->
      <div 
        v-if="hasChildren" 
        @click.stop="toggleExpand"
        class="mr-2 h-5 w-5 flex-shrink-0 mt-0.5 transition-transform duration-200"
        :class="[isExpanded ? 'transform rotate-90' : '']"
      >
        <svg 
          viewBox="0 0 20 20" 
          fill="currentColor"
          :class="[darkMode ? 'text-gray-400' : 'text-gray-500']"
          class="h-5 w-5 group-hover:text-blue-500 transition-colors duration-200"
        >
          <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
        </svg>
      </div>
      <!-- Placeholder for aligned indentation when no children -->
      <div v-else class="mr-2 h-5 w-5 flex-shrink-0"></div>

      <!-- Item content -->
      <div class="flex-1">
        <div class="flex items-baseline">
          <!-- Identifier (if available) -->
          <span 
            v-if="item.number && mergedOptions.display.showItemNumbers" 
            class="font-semibold mr-2"
            :class="[darkMode ? 'text-blue-300' : 'text-blue-600']"
          >
            {{ item.citationPrefix || item.type }} {{ item.number }}
          </span>
          
          <!-- Type icon (if enabled) -->
          <span 
            v-if="mergedOptions.display.showTypeIcon && item.type"
            class="mr-2"
          >
            <template v-if="item.type === 'title'">
              <svg class="h-4 w-4 inline-block" viewBox="0 0 24 24" :class="[darkMode ? 'text-blue-300' : 'text-blue-600']">
                <path fill="currentColor" d="M5 4v3h5.5v12h3V7H19V4z"/>
              </svg>
            </template>
            <template v-else-if="item.type === 'part'">
              <svg class="h-4 w-4 inline-block" viewBox="0 0 24 24" :class="[darkMode ? 'text-green-300' : 'text-green-600']">
                <path fill="currentColor" d="M14,10H2V12H14V10M14,6H2V8H14V6M2,16H10V14H2V16M21.5,11.5L23,13L16,20L11.5,15.5L13,14L16,17L21.5,11.5Z"/>
              </svg>
            </template>
            <template v-else-if="item.type === 'section'">
              <svg class="h-4 w-4 inline-block" viewBox="0 0 24 24" :class="[darkMode ? 'text-amber-300' : 'text-amber-600']">
                <path fill="currentColor" d="M3,4H7V8H3V4M9,5V7H21V5H9M3,10H7V14H3V10M9,11V13H21V11H9M3,16H7V20H3V16M9,17V19H21V17H9"/>
              </svg>
            </template>
          </span>
          <!-- Title -->
          <span 
            class="font-medium"
            :class="[darkMode ? 'text-gray-200' : 'text-gray-800']"
          >
            {{ item.title }}
          </span>
        </div>
        
        <!-- Subtitle (if available) -->
        <div 
          v-if="item.subtitle" 
          class="text-sm mt-1"
          :class="[darkMode ? 'text-gray-400' : 'text-gray-600']"
        >
          {{ item.subtitle }}
        </div>
      </div>
    </div>

    <!-- Content section (if available and expanded) -->
    <div 
      v-if="item.content && (isExpanded || isSelected)" 
      class="px-3 py-2 my-1 rounded"
      :class="[darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-50 text-gray-700']"
    >
      <div class="prose max-w-none text-sm" v-html="item.content"></div>
    </div>

    <!-- Child items (if expanded) -->
    <div v-if="hasChildren && isExpanded" class="pt-1">
      <ECFRSection
        v-for="(child, idx) in item.children"
        :key="child.id"
        :item="child"
        :index="idx"
        :level="level + 1"
        :parent-path="currentPath"
        :dark-mode="darkMode"
      />
    </div>
  </div>
</template>

<script>
import { useECFRStore } from '../stores/ecfr';

export default {
  name: 'ECFRSection',
  
  props: {
    /**
     * The item to display
     */
    item: {
      type: Object,
      required: true
    },
    
    /**
     * The index of the item in its parent's children array
     */
    index: {
      type: Number,
      required: true
    },
    
    /**
     * The nesting level of the item
     */
    level: {
      type: Number,
      required: true
    },
    
    /**
     * The path to the parent item
     */
    parentPath: {
      type: Array,
      default: () => []
    },
    
    /**
     * Whether to use dark mode
     */
    darkMode: {
      type: Boolean,
      default: false
    },
    
    /**
     * Configuration options for the section
     */
    options: {
      type: Object,
      default: () => ({})
    }
  },
  
  data() {
    return {
      ecfrStore: useECFRStore()
    };
  },
  
  computed: {
    /**
     * Default options object to use as fallback
     * @returns {Object} Default options
     */
    defaultOptions() {
      return {
        display: {
          showTypeIcon: true,
          showItemNumbers: true,
          indentItems: true,
          compactMode: false,
          hideEmptyItems: false
        },
        navigation: {
          preserveState: true,
          scrollToSelected: true,
          autoExpandParents: true,
          autoCollapseOthers: false
        }
      };
    },
    
    /**
     * Merged options (defaults + provided options)
     * @returns {Object} Merged options
     */
    mergedOptions() {
      return {
        ...this.defaultOptions,
        ...this.options,
        display: {
          ...this.defaultOptions.display,
          ...(this.options.display || {})
        },
        navigation: {
          ...this.defaultOptions.navigation,
          ...(this.options.navigation || {})
        }
      };
    },
    
    /**
     * Whether the item has children
     * @returns {boolean} True if the item has children
     */
    hasChildren() {
      return this.item.children && this.item.children.length > 0;
    },
    
    /**
     * Whether the item should be hidden based on configuration
     * @returns {boolean} True if the item should be hidden
     */
    shouldHideItem() {
      return this.mergedOptions.display.hideEmptyItems && 
             !this.hasChildren && 
             !this.item.content;
    },
    
    /**
     * Whether the item is expanded
     * @returns {boolean} True if the item is expanded
     */
    isExpanded() {
      return this.ecfrStore.isItemExpanded(this.item.id);
    },
    
    /**
     * The current path to this item
     * @returns {Array} The current path
     */
    currentPath() {
      return [...this.parentPath, { item: this.item, index: this.index }];
    },
    
    /**
     * Whether the item is selected
     * @returns {boolean} True if the item is selected
     */
    isSelected() {
      return this.ecfrStore.currentItem?.id === this.item.id;
    }
  },
  
  methods: {
    /**
     * Toggle the expansion state of the item
     * @param {Event} event - The click event
     */
    toggleExpand(event) {
      event.stopPropagation();
      this.ecfrStore.toggleItemExpansion(this.item.id);
    },
    
    /**
     * Handle selection of the item
     */
    handleSelect() {
      this.ecfrStore.selectItem(this.item, this.index, this.parentPath);
      
      // Auto-expand this item if it has children
      if (this.hasChildren && !this.isExpanded) {
        this.ecfrStore.expandItem(this.item.id);
      }
      
      // Auto-collapse other items if configured
      if (this.mergedOptions.navigation.autoCollapseOthers && this.hasChildren) {
        this.collapseOthers(this.item.id);
      }
      
      // Scroll to selected if the option is enabled
      if (this.mergedOptions.navigation.scrollToSelected) {
        this.$nextTick(() => {
          // Use an element query to find the selected element and scroll to it
          const selectedElement = document.querySelector('.ecfr-section .bg-blue-100, .ecfr-section .bg-blue-900');
          if (selectedElement) {
            selectedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });
      }
    },
    
    /**
     * Collapse all other items at the same level
     * @param {string} exceptId - ID of the item to keep expanded
     */
    collapseOthers(exceptId) {
      // If we're at the root level, collapse all other root items
      if (this.level === 0 && this.item.id !== exceptId) {
        this.ecfrStore.collapseItem(this.item.id);
        return;
      }
      
      // Otherwise, find all siblings
      const siblings = this.parentPath.length > 0 
        ? this.parentPath[this.parentPath.length - 1].item.children 
        : this.ecfrStore.rootItems;
        
      // Loop through siblings and collapse them if they're not the current item
      if (siblings) {
        siblings.forEach(sibling => {
          if (sibling.id !== exceptId) {
            this.ecfrStore.collapseItem(sibling.id);
          }
        });
      }
    }
  }
};
</script>

<style>
.ecfr-section.compact-mode {
  margin-bottom: 0.25rem;
}

.compact-mode .ecfr-section {
  margin-bottom: 0.25rem;
}

.compact-mode > div > div {
  padding: 0.5rem 0.5rem;
}

@media print {
  .ecfr-section {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
</style>
