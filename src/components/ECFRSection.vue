<template>
  <div 
    class="ecfr-section mb-1 border-l-2" 
    :class="[
      darkMode ? 'border-gray-600' : 'border-gray-200',
      level > 0 ? 'pl-4' : '',
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
            v-if="item.number" 
            class="font-semibold mr-2"
            :class="[darkMode ? 'text-blue-300' : 'text-blue-600']"
          >
            {{ item.citationPrefix || item.type }} {{ item.number }}
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
    }
  },
  
  data() {
    return {
      ecfrStore: useECFRStore()
    };
  },
  
  computed: {
    /**
     * Whether the item has children
     * @returns {boolean} True if the item has children
     */
    hasChildren() {
      return this.item.children && this.item.children.length > 0;
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
    }
  }
};
</script>
