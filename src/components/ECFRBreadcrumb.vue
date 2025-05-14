<template>
  <nav 
    class="flex py-2 px-2 text-sm flex-wrap" 
    :class="[darkMode ? 'text-gray-300' : 'text-gray-600']"
    aria-label="Breadcrumb"
  >
    <ol class="inline-flex items-center flex-wrap">
      <li class="inline-flex items-center">
        <a 
          href="#" 
          class="hover:underline hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
          @click.prevent="navigateToRoot"
        >
          Home
        </a>
      </li>

      <li v-for="(pathItem, index) in path" :key="pathItem.item.id">
        <div class="flex items-center">
          <svg 
            class="w-4 h-4 mx-1" 
            :class="[darkMode ? 'text-gray-400' : 'text-gray-500']" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
          </svg>
          <a 
            href="#" 
            class="hover:underline hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded"
            @click.prevent="navigateToIndex(index)"
          >
            {{ formatBreadcrumbLabel(pathItem.item) }}
          </a>
        </div>
      </li>
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
    }
  },
  
  methods: {
    /**
     * Format the breadcrumb label based on item type and metadata
     * @param {Object} item - The item to format
     * @returns {string} The formatted label
     */
    formatBreadcrumbLabel(item) {
      if (item.type && item.number) {
        return `${item.type.charAt(0).toUpperCase() + item.type.slice(1)} ${item.number}${item.title ? ': ' + item.title : ''}`;
      }
      return item.title;
    },
    
    /**
     * Navigate to the root level
     */
    navigateToRoot() {
      const ecfrStore = useECFRStore();
      ecfrStore.navigateToPath([]);
    },
    
    /**
     * Navigate to a specific index in the path
     * @param {number} index - The index to navigate to
     */
    navigateToIndex(index) {
      const ecfrStore = useECFRStore();
      const newPath = this.path.slice(0, index + 1);
      ecfrStore.navigateToPath(newPath);
    }
  }
};
</script>
