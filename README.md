# eCFR Navigator Component

A lightweight, reusable Vue 3 component with Pinia integration for navigating hierarchical eCFR-style content in existing Vue applications.

## Features

- 📚 **Hierarchical Navigation**: Navigate complex nested document structures
- 🔖 **Breadcrumb Trail**: Always see your current location in the hierarchy
- 🔍 **Advanced Search**: Find content with fuzzy matching and adjustable sensitivity
- 🎨 **Tailwind CSS Styling**: Clean, minimal interface with Tailwind CSS
- 🧩 **Expandable Sections**: Collapsible sections for better content organization
- 📱 **Responsive Design**: Works on all screen sizes
- 🔌 **Simple Integration**: Easy to integrate into existing Vue applications
- 🔄 **Pinia State Management**: Lightweight state management
- 🌙 **Light/Dark Themes**: Support for light and dark modes
- 📋 **Metadata Support**: Attach custom data to items with extensible processors
- 🔗 **External Resources**: Connect to external resources like XML source files
- 🎯 **Render Targets**: Specify rendering locations for content display
- 🎚️ **Multiple View Modes**: Compact, standard, detailed, and styleless modes
- 🏷️ **Enhanced Filtering**: Filter by type, agency, date range, and keywords
- 💬 **Preview Tooltips**: Interactive previews on search results
- 🎬 **Animated UI**: Smooth transitions for better user experience

## Installation

### From NPM

```bash
npm install ecfr-navigator
```

### From Tarball

You can also install the package directly from a tarball:

```bash
# Install from a local tarball
npm install ./ecfr-navigator-1.0.0.tgz

# Or from a URL
npm install https://example.com/path/to/ecfr-navigator-1.0.0.tgz
```

To create the tarball package yourself:

```bash
# Build the library and create a tarball
./build-package.sh
```

This will create a file named `ecfr-navigator-1.0.0.tgz` that you can use to install the package in other projects.

## Quick Start

1. First, make sure you have Vue 3, Pinia, and Tailwind CSS set up in your project:

```bash
npm install vue@3 pinia@2 tailwindcss@3 postcss autoprefixer
```

2. Register the component globally in your main.js:

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ECFRNavigatorPlugin from 'ecfr-navigator'

const app = createApp(App)
app.use(createPinia())
app.use(ECFRNavigatorPlugin)
app.mount('#app')
```

3. Use the component in your Vue template:

```vue
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">eCFR Navigator</h1>
    
    <div class="h-[600px] border border-gray-300 rounded-lg">
      <ECFRNavigator 
        :items="ecfrData" 
        :options="navigatorOptions"
        :item-metadata="initialMetadata"
        :initial-selected-item-id="startingItemId"
        @item-selected="handleItemSelected"
        @path-changed="handlePathChanged"
        @metadata-changed="handleMetadataChanged"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // Navigation configuration
      navigatorOptions: {
        showBreadcrumb: true,
        expandAll: false,
        theme: 'light', // 'light' or 'dark'
        
        // View mode configuration
        display: {
          viewMode: 'standard', // 'compact', 'standard', 'detailed', or 'styleless'
          showDescription: true, // Show content preview in detailed mode
          showMetadataBadges: true, // Show badges indicating items with metadata
          itemSpacing: 'medium', // 'tight', 'medium', 'loose'
          maxTitleLength: 40 // Truncate titles longer than this
        },
        
        // Search and filtering options
        filters: {
          showAgencyFilter: true, // Enable agency filtering
          showDateFilter: true, // Enable date range filtering
          showTypeFilter: true, // Enable document type filtering
          showKeywordFilter: true // Enable keyword filtering
        },
        
        // Interactive tooltips configuration
        tooltips: {
          enabled: true, // Enable interactive preview tooltips
          showDelay: 300, // Delay before showing tooltip (ms)
          hideDelay: 100, // Delay before hiding tooltip (ms)
          maxLength: 300 // Maximum length of tooltip content
        }
      },
      
      // Hierarchical content data
      ecfrData: [
        {
          id: 'title-1',
          type: 'title',
          number: '1',
          title: 'Example Title',
          agency: 'Department of Examples',
          updatedDate: '2023-01-15',
          children: [
            {
              id: 'part-1',
              type: 'part',
              number: '1',
              title: 'Example Part',
              agency: 'Department of Examples',
              updatedDate: '2023-01-15',
              children: [
                {
                  id: 'section-1-1',
                  type: 'section',
                  number: '1.1',
                  title: 'Example Section',
                  agency: 'Department of Examples',
                  updatedDate: '2023-01-15',
                  content: '<p>This is example content for this section.</p>'
                }
              ]
            }
          ]
        }
      ],
      
      // Pre-populated metadata for items
      initialMetadata: {
        'section-1-1': {
          xmlLink: {
            url: 'https://example.com/api/xml/section-1-1.xml',
            version: '1.0'
          },
          renderTarget: {
            elementId: 'content-viewer',
            mode: 'replace'
          }
        }
      },
      
      // Initially selected item
      startingItemId: 'section-1-1'
    };
  },
  
  methods: {
    handleItemSelected(event) {
      console.log('Selected item:', event.item);
      
      // Access the associated metadata
      if (event.metadata) {
        console.log('Item metadata:', event.metadata);
      }
      
      // Access processed metadata (if processors are registered)
      if (event.processedMetadata) {
        console.log('Processed metadata:', event.processedMetadata);
      }
    },
    
    handlePathChanged(path) {
      console.log('Path changed:', path);
    },
    
    handleMetadataChanged(event) {
      console.log(`Metadata ${event.action}:`, {
        itemId: event.itemId,
        type: event.metadataType,
        data: event.action === 'add' ? event.metadata : event.oldMetadata
      });
    }
  }
};
</script>
```

## Configuration Guide

### View Modes

The eCFR Navigator supports multiple view modes to suit different use cases:

#### 1. Standard Mode (Default)
Balanced view with moderate spacing, showing type icons and identifiers.

```javascript
options: {
  display: {
    viewMode: 'standard'
  }
}
```

#### 2. Compact Mode
Optimized for dense navigation with smaller text and reduced spacing:

```javascript
options: {
  display: {
    viewMode: 'compact',
    showTypeIcon: false // Optional, further reduces space
  }
}
```

#### 3. Detailed Mode
Enhanced view with comprehensive information and content previews:

```javascript
options: {
  display: {
    viewMode: 'detailed',
    showDescription: true, // Show content previews
    maxDescriptionLength: 150 // Limit preview length
  }
}
```

#### 4. Styleless Mode
Minimal styling for custom integrations, removing decorative elements:

```javascript
options: {
  display: {
    viewMode: 'styleless'
  }
}
```

**Example:** Dynamically changing view modes

```vue
<template>
  <div>
    <select v-model="currentViewMode" @change="updateViewMode">
      <option value="compact">Compact</option>
      <option value="standard">Standard</option>
      <option value="detailed">Detailed</option>
      <option value="styleless">Styleless</option>
    </select>
    
    <ECFRNavigator 
      :items="items" 
      :options="navigatorOptions" 
      @update:options="handleOptionsUpdate"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentViewMode: 'standard',
      navigatorOptions: {
        display: {
          viewMode: 'standard'
        }
      }
    }
  },
  methods: {
    updateViewMode() {
      this.navigatorOptions = {
        ...this.navigatorOptions,
        display: {
          ...this.navigatorOptions.display,
          viewMode: this.currentViewMode
        }
      }
    },
    handleOptionsUpdate(newOptions) {
      this.navigatorOptions = newOptions;
      this.currentViewMode = newOptions.display.viewMode;
    }
  }
}
</script>
```

### Content Preview Tooltips

Interactive tooltips provide detailed content previews when hovering over search results:

```javascript
options: {
  tooltips: {
    enabled: true, // Enable interactive tooltip previews
    showDelay: 300, // Milliseconds to wait before showing tooltip (prevents flickering)
    hideDelay: 100, // Milliseconds to wait before hiding tooltip
    maxLength: 300, // Maximum length of tooltip preview content
    showTypeInfo: true, // Show item type and number in tooltip
    position: 'right' // Tooltip position: 'right', 'left', 'top', 'bottom'
  }
}
```

**Implementation Example:**

```vue
<template>
  <ECFRNavigator 
    :items="items" 
    :options="tooltipOptions" 
  />
</template>

<script>
export default {
  data() {
    return {
      tooltipOptions: {
        tooltips: {
          enabled: true,
          showDelay: 300,
          hideDelay: 100,
          maxLength: 300,
          position: 'right'
        }
      }
    }
  }
}
</script>
```

### Advanced Filtering Options

The component includes powerful filtering capabilities for search results:

```javascript
options: {
  filters: {
    showAgencyFilter: true, // Enable agency dropdown filter
    showDateFilter: true, // Enable date range filter
    showTypeFilter: true, // Enable document type filter
    showKeywordFilter: true, // Enable keyword/tag filter
    agencyList: ['Agency One', 'Agency Two'], // Provide specific agency options
    availableTypes: ['title', 'part', 'section', 'chapter'] // Specify filterable types
  }
}
```

To provide custom filter options from your data:

```vue
<template>
  <ECFRNavigator 
    :items="ecfrData" 
    :options="filterOptions" 
    @search-completed="handleSearchResults"
  />
</template>

<script>
export default {
  data() {
    return {
      ecfrData: [...], // Your content data
      
      // Extract unique agencies from your data
      agencyList: this.extractUniqueAgencies(),
      
      filterOptions: {
        filters: {
          showAgencyFilter: true,
          showDateFilter: true,
          showTypeFilter: true,
          showKeywordFilter: true,
          // Pass your extracted agency list to the component
          agencyList: []
        }
      }
    }
  },
  created() {
    // Extract agencies from your data
    this.filterOptions.filters.agencyList = this.extractUniqueAgencies();
  },
  methods: {
    extractUniqueAgencies() {
      // Helper function to extract unique agencies from your data
      const agencies = new Set();
      
      const processItem = (item) => {
        if (item.agency) {
          agencies.add(item.agency);
        }
        if (item.children && item.children.length > 0) {
          item.children.forEach(processItem);
        }
      };
      
      this.ecfrData.forEach(processItem);
      return Array.from(agencies);
    },
    
    handleSearchResults(results) {
      console.log('Search results with active filters:', results);
      console.log('Active filters:', results.filters);
    }
  }
}
</script>
```

### Date Filtering Implementation

To enable date-based filtering, ensure your data items include a date field:

```javascript
// Example item with date information
{
  id: 'section-1-1',
  type: 'section',
  title: 'Example Section',
  updatedDate: '2023-05-15', // ISO format date
  // Other properties...
}
```

Then configure the date filter options:

```javascript
options: {
  filters: {
    showDateFilter: true,
    dateFilterOptions: [
      { value: 'today', label: 'Today' },
      { value: 'week', label: 'Past Week' },
      { value: 'month', label: 'Past Month' },
      { value: 'year', label: 'Past Year' },
      { value: 'custom', label: 'Custom Range' }
    ],
    dateField: 'updatedDate' // Specify which field contains date information
  }
}
```

### Hiding Content on Navigation

To control content visibility during navigation:

```javascript
options: {
  hideContentOnNavigation: true // Hide content when navigating to new items
}
```

**Implementation Example:**

```vue
<template>
  <div class="flex">
    <!-- Navigator with hide content option -->
    <ECFRNavigator 
      :items="items" 
      :options="{ hideContentOnNavigation: true }" 
      @item-selected="showItemContent"
      class="w-1/3"
    />
    
    <!-- Content viewer area -->
    <div class="w-2/3 p-4" id="content-area">
      <div v-if="isLoading" class="loading-spinner">Loading...</div>
      <div v-else-if="selectedContent" v-html="selectedContent"></div>
      <div v-else class="text-gray-500">Select an item to view content</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      selectedContent: null
    }
  },
  methods: {
    showItemContent(event) {
      this.isLoading = true;
      this.selectedContent = null;
      
      // Simulate content loading (replace with your actual content fetching logic)
      setTimeout(() => {
        this.selectedContent = event.item.content || '<p>No content available</p>';
        this.isLoading = false;
      }, 500);
    }
  }
}
</script>
```

### Metadata Injection and Processing

Attach and process metadata for items:

```javascript
// Pre-populated metadata
const itemMetadata = {
  'section-1-1': {
    xmlSource: {
      url: 'https://example.com/xml/section-1-1.xml',
      version: '2023-05'
    },
    renderOptions: {
      target: 'main-viewer',
      mode: 'replace'
    },
    references: [
      { type: 'related', id: 'section-2-3', title: 'Related Section' }
    ]
  }
};

// In your component
<ECFRNavigator 
  :items="ecfrData" 
  :item-metadata="itemMetadata"
  @item-selected="handleItemWithMetadata"
/>

// Access and process metadata
methods: {
  handleItemWithMetadata(event) {
    if (event.metadata && event.metadata.xmlSource) {
      this.fetchXmlContent(event.metadata.xmlSource.url);
    }
    
    if (event.metadata && event.metadata.renderOptions) {
      this.renderToTarget(
        event.item.content, 
        event.metadata.renderOptions.target,
        event.metadata.renderOptions.mode
      );
    }
  },
  
  // Process metadata at runtime
  registerMetadataProcessors() {
    const navigator = useECFRNavigator();
    
    // Register processor for XML source metadata
    navigator.registerMetadataProcessor('xmlSource', (metadata) => {
      return {
        ...metadata,
        displayUrl: metadata.url.replace('https://', ''),
        downloadUrl: `${metadata.url}?download=true`,
        lastUpdated: metadata.version
      };
    });
  }
}
```

## Advanced Customization Examples

### 1. Custom Filter Functions for Special Data

```vue
<template>
  <ECFRNavigator 
    :items="items" 
    :options="options"
    ref="navigator"
  />
  
  <button @click="applyCustomFilter">Filter Critical Items</button>
</template>

<script>
import { useECFRNavigator } from 'ecfr-navigator';

export default {
  data() {
    return {
      items: [...],
      options: {
        filters: {
          showAgencyFilter: true,
          showTypeFilter: true
        }
      }
    }
  },
  methods: {
    applyCustomFilter() {
      const navigator = useECFRNavigator();
      
      // Create custom filter function
      const customFilterFn = (item) => {
        // Example: filter for items marked as critical
        return item.priority === 'critical';
      };
      
      // Apply custom filter to search results
      navigator.setCustomFilter(customFilterFn);
      navigator.performSearch();
    }
  }
}
</script>
```

### 2. Completely Custom View Mode

Create a custom view mode with specific styling:

```vue
<template>
  <ECFRNavigator 
    :items="items" 
    :options="customViewOptions"
  />
</template>

<script>
export default {
  data() {
    return {
      customViewOptions: {
        display: {
          viewMode: 'styleless', // Use styleless as base
          customClasses: {
            item: 'my-custom-item flex border-b py-2',
            title: 'font-serif text-lg text-indigo-700',
            content: 'italic text-sm text-gray-600',
            icon: 'text-indigo-500'
          }
        }
      }
    }
  }
}
</script>

<style>
.my-custom-item {
  transition: background-color 0.3s;
}
.my-custom-item:hover {
  background-color: rgba(79, 70, 229, 0.1);
}
</style>
```

### 3. Data-Driven Filter Example

Implement filters that are dynamically generated from your data:

```vue
<template>
  <div>
    <!-- Custom filter controls -->
    <div class="mb-4 p-3 bg-gray-100 rounded">
      <h3 class="font-medium mb-2">Custom Filters</h3>
      
      <!-- Dynamically generated agency checkboxes -->
      <div class="mb-2">
        <p class="text-sm font-medium">Agencies:</p>
        <div v-for="agency in availableAgencies" :key="agency" class="flex items-center">
          <input 
            type="checkbox" 
            :id="'agency-' + agency"
            :value="agency"
            v-model="selectedAgencies"
            @change="updateFilters"
          >
          <label :for="'agency-' + agency" class="ml-2 text-sm">{{ agency }}</label>
        </div>
      </div>
      
      <!-- Date range selector -->
      <div class="mb-2">
        <p class="text-sm font-medium">Date Range:</p>
        <select v-model="selectedDateRange" @change="updateFilters" class="text-sm border p-1">
          <option value="">Any time</option>
          <option value="today">Today</option>
          <option value="week">Past Week</option>
          <option value="month">Past Month</option>
          <option value="year">Past Year</option>
        </select>
      </div>
      
      <button 
        @click="applyFilters" 
        class="px-3 py-1 bg-blue-600 text-white rounded text-sm"
      >
        Apply Filters
      </button>
    </div>
    
    <!-- Navigator with custom filters -->
    <ECFRNavigator 
      :items="items" 
      :options="navigatorOptions"
      ref="navigator"
    />
  </div>
</template>

<script>
import { useECFRNavigator } from 'ecfr-navigator';

export default {
  data() {
    return {
      items: [...], // Your data items
      availableAgencies: [],
      selectedAgencies: [],
      selectedDateRange: '',
      navigatorOptions: {
        // Base options
      }
    }
  },
  mounted() {
    // Extract available agencies from your data
    this.extractFilterOptions();
  },
  methods: {
    extractFilterOptions() {
      // Extract unique agencies from all items
      const agencies = new Set();
      
      const processItem = (item) => {
        if (item.agency) {
          agencies.add(item.agency);
        }
        if (item.children && item.children.length > 0) {
          item.children.forEach(processItem);
        }
      };
      
      this.items.forEach(processItem);
      this.availableAgencies = Array.from(agencies);
    },
    
    updateFilters() {
      // Update filter state
      console.log('Selected agencies:', this.selectedAgencies);
      console.log('Selected date range:', this.selectedDateRange);
    },
    
    applyFilters() {
      const navigator = useECFRNavigator();
      
      // Create custom filter function combining all selected filters
      const customFilterFn = (item) => {
        // Agency filter
        if (this.selectedAgencies.length > 0 && !this.selectedAgencies.includes(item.agency)) {
          return false;
        }
        
        // Date filter
        if (this.selectedDateRange && item.updatedDate) {
          const itemDate = new Date(item.updatedDate);
          const now = new Date();
          
          let cutoffDate = null;
          if (this.selectedDateRange === 'today') {
            cutoffDate = new Date(now.setHours(0, 0, 0, 0));
          } else if (this.selectedDateRange === 'week') {
            cutoffDate = new Date(now.setDate(now.getDate() - 7));
          } else if (this.selectedDateRange === 'month') {
            cutoffDate = new Date(now.setMonth(now.getMonth() - 1));
          } else if (this.selectedDateRange === 'year') {
            cutoffDate = new Date(now.setFullYear(now.getFullYear() - 1));
          }
          
          if (cutoffDate && itemDate < cutoffDate) {
            return false;
          }
        }
        
        // Item passes all filters
        return true;
      };
      
      // Apply the custom filter function
      navigator.setCustomFilter(customFilterFn);
      
      // Trigger search with current query and custom filter
      navigator.performSearch();
    }
  }
}
</script>
```

## Data Structure

The component expects an array of items with the following structure:

```javascript
[
  {
    id: 'unique-id',              // Required: Unique identifier
    title: 'Item Title',          // Required: Title text to display
    subtitle: 'Optional Subtitle', // Optional: Subtitle text
    content: '<p>HTML content</p>', // Optional: HTML content for this item
    type: 'title',                // Optional: Type of item (title, part, section, etc.)
    number: '1',                  // Optional: Number identifier (e.g., '1', '1.1')
    citationPrefix: 'Title',      // Optional: Override the display prefix
    agency: 'Agency Name',        // Optional: Agency associated with this item
    updatedDate: '2023-05-15',    // Optional: Date of last update (for filtering)
    keywords: ['keyword1', 'keyword2'], // Optional: Keywords for filtering
    children: [                   // Optional: Child items (nested)
      {
        id: 'child-1',
        title: 'Child Item',
        // ... same structure as parent
      }
    ]
  }
]
```

## Using Individual Components

You can also use the individual components if needed:

```vue
<template>
  <ECFRBreadcrumb :path="currentPath" :dark-mode="isDarkMode" />
  
  <ECFRSection 
    v-for="(item, index) in items"
    :key="item.id"
    :item="item"
    :index="index"
    :level="0"
    :dark-mode="isDarkMode"
  />
</template>
```

## Using the Store and Composable

The package provides a Pinia store and composable for using outside of components:

```javascript
import { useECFRStore, useECFRNavigator } from 'ecfr-navigator';

export default {
  setup() {
    const ecfrStore = useECFRStore();
    const ecfrNavigator = useECFRNavigator();
    
    // Load data
    ecfrNavigator.setData(myData);
    
    // Navigate to a specific item by ID
    ecfrNavigator.navigateTo('section-1-2');
    
    // Expand/collapse functionality
    ecfrNavigator.expandAll();
    ecfrNavigator.collapseAll();
    
    // Get current state
    const currentItem = ecfrNavigator.getCurrentItem();
    const breadcrumbPath = ecfrNavigator.getBreadcrumbPath();
    
    // Metadata operations
    ecfrNavigator.setItemMetadata('section-1-1', {
      xmlLink: { url: 'https://example.com/xml/section-1-1.xml' }
    });
    
    // Register metadata processors
    ecfrNavigator.registerMetadataProcessor('xmlLink', (metadata, itemId) => {
      return {
        url: metadata.url,
        label: `XML Source for ${itemId}`,
        downloadUrl: `${metadata.url}?download=true`
      };
    });
    
    // Get processed metadata
    const metadata = ecfrNavigator.getItemMetadata('section-1-1');
    const processedMetadata = ecfrNavigator.processItemMetadata('section-1-1');
    
    // Get metadata for current item
    const currentItemMetadata = ecfrNavigator.getCurrentItemMetadata();
    
    return {
      // Navigation methods
      navigateTo: ecfrNavigator.navigateTo,
      expandItem: ecfrNavigator.expandItem,
      collapseItem: ecfrNavigator.collapseItem,
      
      // Metadata methods
      addMetadata: ecfrNavigator.setItemMetadata,
      getMetadata: ecfrNavigator.getItemMetadata,
      processMetadata: ecfrNavigator.processItemMetadata,
      registerProcessor: ecfrNavigator.registerMetadataProcessor,
      
      // State getters
      currentItem,
      breadcrumbPath,
      metadata,
      processedMetadata
    };
  }
}
```

## Troubleshooting

### Tooltip Issues

If tooltips don't appear:

1. Ensure tooltip options are properly configured:
   ```javascript
   options: {
     tooltips: {
       enabled: true // Must be true
     }
   }
   ```

2. Verify that items have content for tooltips to display:
   ```javascript
   // Add content or description to items
   {
     id: 'item-1',
     title: 'Item Title',
     content: 'This content will be shown in the tooltip preview'
   }
   ```

3. Check for CSS conflicts:
   ```css
   /* If using custom CSS, ensure tooltips have proper z-index */
   .ecfr-tooltip {
     z-index: 1000; /* Adjust as needed */
   }
   ```

### Filter Issues

If filtering doesn't work as expected:

1. Verify that items have the necessary filter fields:
   ```javascript
   {
     id: 'item-1',
     title: 'Example Item',
     type: 'section', // Required for type filtering
     agency: 'Example Agency', // Required for agency filtering
     updatedDate: '2023-05-15', // Required for date filtering (YYYY-MM-DD format)
     keywords: ['keyword1', 'keyword2'] // Required for keyword filtering
   }
   ```

2. Ensure filter options are enabled:
   ```javascript
   options: {
     filters: {
       showTypeFilter: true,
       showAgencyFilter: true,
       showDateFilter: true,
       showKeywordFilter: true
     }
   }
   ```

## Integrating with Backend APIs

Example of integrating with a backend API for content and filtering:

```vue
<template>
  <ECFRNavigator 
    :items="ecfrItems" 
    :options="navigatorOptions"
    :loading="isLoading"
    @search-completed="trackSearchAnalytics"
  />
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      ecfrItems: [],
      isLoading: true,
      navigatorOptions: {
        filters: {
          showAgencyFilter: true,
          showDateFilter: true,
          agencyList: [] // Will be populated from API
        },
        tooltips: {
          enabled: true
        }
      }
    }
  },
  async created() {
    try {
      // Fetch content data
      const { data } = await axios.get('/api/ecfr/content');
      this.ecfrItems = data.items;
      
      // Fetch available filter options
      const filterOptions = await axios.get('/api/ecfr/filter-options');
      this.navigatorOptions.filters.agencyList = filterOptions.data.agencies;
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      this.isLoading = false;
    }
  },
  methods: {
    trackSearchAnalytics(searchResult) {
      // Send search analytics to backend
      axios.post('/api/analytics/search', {
        query: searchResult.query,
        filters: searchResult.filters,
        resultCount: searchResult.resultsCount,
        timestamp: new Date().toISOString()
      });
    }
  }
}
</script>
```

## Component Props and Events Reference

### Props

| Prop | Type | Description |
|------|------|-------------|
| `items` | Array | **Required.** Hierarchical data structure of items to display |
| `options` | Object | Configuration options for the navigator |
| `itemMetadata` | Object | Pre-populated metadata for items, keyed by item ID |
| `initialSelectedItemId` | String | ID of the item to initially select and expand to |
| `loading` | Boolean | Show loading state for the entire component |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `item-selected` | `{ item, path, metadata, processedMetadata }` | Fired when an item is selected |
| `path-changed` | `Array` | Fired when the navigation path changes |
| `search-completed` | `{ query, filters, resultsCount, results }` | Fired when a search completes |
| `update:options` | `Object` | Fired when options change internally (for v-model support) |
| `metadata-changed` | `{ action, itemId, metadataType, metadata, oldMetadata }` | Fired when item metadata changes |
| `tooltip-shown` | `{ itemId, content }` | Fired when a tooltip is displayed |
| `filter-changed` | `{ type, value }` | Fired when a filter value changes |