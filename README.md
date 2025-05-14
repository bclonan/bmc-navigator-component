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

### Using the Package in Another Project

After installing the package, you can use it in your Vue project in different ways:

#### Global Registration

```js
// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ECFRNavigatorPlugin from 'ecfr-navigator'

const app = createApp(App)
app.use(createPinia())
app.use(ECFRNavigatorPlugin) // Register all components globally

app.mount('#app')
```

#### Local Component Import

```js
// YourComponent.vue
import { ECFRNavigator } from 'ecfr-navigator'

export default {
  components: {
    ECFRNavigator
  }
}
```

#### Using the Composable

```js
// YourComponent.vue
import { useECFRNavigator } from 'ecfr-navigator'

export default {
  setup() {
    const { navigateTo, expandItem, collapseItem, getCurrentItem } = useECFRNavigator()
    
    // Use the composable methods
    return { navigateTo, expandItem, collapseItem, getCurrentItem }
  }
}
```

## Development

For those contributing to or modifying the component, the project includes several npm scripts:

```bash
# Start development server with hot-reloading
npm run dev

# Type-check the project
npm run typecheck

# Lint and fix files
npm run lint

# Build for production
npm run build

# Build as a library for distribution
npm run lib

# Preview the production build
npm run preview
```

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
          viewMode: 'standard', // 'compact', 'standard', or 'detailed'
          showDescription: true, // Show content preview in detailed mode
          showMetadataBadges: true, // Show badges indicating items with metadata
          itemSpacing: 'medium', // 'tight', 'medium', 'loose'
          maxTitleLength: 40 // Truncate titles longer than this
        }
      },
      
      // Hierarchical content data
      ecfrData: [
        {
          id: 'title-1',
          type: 'title',
          number: '1',
          title: 'Example Title',
          children: [
            {
              id: 'part-1',
              type: 'part',
              number: '1',
              title: 'Example Part',
              children: [
                {
                  id: 'section-1-1',
                  type: 'section',
                  number: '1.1',
                  title: 'Example Section',
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

## Component Props

The ECFRNavigator component accepts the following props:

| Prop | Type | Description |
|------|------|-------------|
| `items` | Array | **Required.** Hierarchical data structure of items to display |
| `options` | Object | Configuration options for the navigator (see below) |
| `itemMetadata` | Object | Pre-populated metadata for items, keyed by item ID |
| `initialSelectedItemId` | String | ID of the item to initially select and expand to |

### Passing Initial Metadata

The `itemMetadata` prop is particularly useful when you want to pre-populate items with metadata from an external source:

```javascript
// Example itemMetadata prop structure
const itemMetadata = {
  'item-123': {
    xmlLink: {
      url: 'https://example.com/api/xml/item-123.xml',
      version: '1.0'
    },
    renderTarget: {
      elementId: 'viewer-panel',
      mode: 'replace'
    },
    externalReferences: [
      { type: 'regulation', id: 'reg-456', title: 'Related Regulation' },
      { type: 'guidance', id: 'guide-789', title: 'Implementation Guide' }
    ]
  },
  'item-456': {
    // Another item's metadata
  }
};
```

When the component receives this prop, it automatically loads all metadata into its internal state. Any changes to the metadata prop will be synchronized with the component's internal metadata store.

### Initial Selection

You can specify which item should be initially selected using the `initialSelectedItemId` prop:

```html
<ECFRNavigator
  :items="ecfrData"
  initial-selected-item-id="section-1-1"
/>
```

This will cause the navigator to automatically:
1. Navigate to the specified item
2. Expand all parent items necessary to reveal it
3. Trigger the `item-selected` event

## Configuration Options

The `options` prop accepts the following configuration:

```javascript
{
  // UI Options
  showBreadcrumb: true,           // Whether to show breadcrumb navigation
  expandAll: false,               // Whether to expand all items initially
  hideContentOnNavigation: false, // Whether to hide content when navigating
  theme: 'light',                 // Theme: 'light' or 'dark'
  
  // Fuzzy Search Options
  fuzzySearch: {
    enabled: true,                // Whether to use fuzzy matching for search
    threshold: 0.4,               // Match sensitivity (0 = exact, 1 = loose)
    distance: 100                 // Maximum edit distance for fuzzy matching
  }
}
```

### Fuzzy Search Configuration

The fuzzy search feature can be fine-tuned with the following options:

- **enabled**: When `true`, enables fuzzy matching for more flexible search results. When `false`, uses exact substring matching.
- **threshold**: Controls how strict the matching is (range 0-1):
  - Lower values (0.1-0.3): Stricter matching, fewer results, higher precision
  - Medium values (0.4-0.6): Balanced matching, good for most use cases
  - Higher values (0.7-0.9): Looser matching, more results, may include false positives
- **distance**: Maximum edit distance (Levenshtein distance) allowed between query and match. Higher values allow more character differences.

You can expose these controls to your users through the component's UI or set them programmatically.

## Events

The component emits the following events:

- `item-selected`: Fired when an item is selected, with the item, path, and associated metadata
- `path-changed`: Fired when the navigation path changes
- `search-completed`: Fired when a search is completed, with query info and results count
- `update:options`: Fired when options are updated internally (for v-model support)
- `metadata-changed`: Fired when metadata for an item is added or removed

## Configuration Options

The ECFRNavigator component can be extensively customized through its options prop:

### Theme Options
- **theme**: Sets the color theme ('light' or 'dark')
- **showBreadcrumb**: Toggle breadcrumb navigation display

### Display Options
- **display.showTypeIcon**: Show icons to indicate item types (title, part, section)
- **display.showItemNumbers**: Display item numbers/identifiers
- **display.indentItems**: Indent nested items to reflect hierarchy
- **display.viewMode**: Display mode ('compact', 'standard', or 'detailed')
- **display.showDescription**: Show content preview in detailed mode
- **display.showMetadataBadges**: Show badges for items with metadata
- **display.itemSpacing**: Control item spacing ('tight', 'medium', 'loose')
- **display.maxTitleLength**: Truncate titles longer than specified length
- **display.hideEmptyItems**: Hide items with no children or content

### Navigation Options
- **navigation.preserveState**: Maintain expansion state between navigations
- **navigation.scrollToSelected**: Auto-scroll to selected items
- **navigation.autoExpandParents**: Automatically expand parent items when selecting a child
- **navigation.autoCollapseOthers**: Collapse sibling items when expanding an item

### Pagination Options
- **pagination.enabled**: Enable pagination for large datasets
- **pagination.itemsPerPage**: Number of items to show per page

### Printing Options
- **printing.enablePrintView**: Enable print-friendly view
- **printing.includeChildrenWhenPrinting**: Include child items when printing

## View Modes and Display Options

The component supports three distinct view modes to suit different use cases:

### Compact Mode

Optimized for dense navigation of large document structures:
- Smaller text and reduced spacing
- Hidden type icons for more compact display
- Displays only essential information
- Perfect for navigation through large hierarchies when screen space is limited

### Standard Mode

The default balanced view:
- Clear, readable typography with moderate spacing
- Shows item type icons and identifiers
- Optional metadata badges
- Ideal for everyday document navigation

### Detailed Mode

Enhanced view with comprehensive information:
- Larger item cards with additional spacing
- Content previews showing excerpts from the item's content
- Detailed metadata badges showing all metadata types
- Perfect for deeper exploration of document structure and metadata

### Configuring View Modes

You can configure these view modes through the component options:

```javascript
options: {
  display: {
    viewMode: 'standard', // 'compact', 'standard', or 'detailed'
    showDescription: true, // Show content preview in detailed mode
    showMetadataBadges: true, // Show badges for items with metadata
    itemSpacing: 'medium', // 'tight', 'medium', 'loose'
    maxTitleLength: 50 // Truncate titles longer than this length
  }
}
```

The component provides UI controls to switch between these modes during runtime, allowing users to customize their viewing experience.

## Advanced Search Functionality

The component includes a powerful search feature with fuzzy matching capabilities:

- **Fuzzy Matching**: Find content even with typos or approximate matches
- **Adjustable Sensitivity**: Control the balance between exact and loose matching
- **Toggle Feature**: Switch between exact and fuzzy search modes
- **Context Highlighting**: See where and how the search terms matched
- **Relevance Ranking**: Results are sorted by match quality
- **Smart Context Extraction**: Shows the relevant portion of content around matches

The advanced search engine provides:

1. **Fuzzy Search**: Tolerates typos, plurals, and word variations
2. **Field Weighting**: Prioritizes matches in titles over content
3. **Performance Optimization**: Uses an indexed approach for fast results
4. **Context-Aware Results**: Shows where in the document the match occurred

Example usage with advanced configuration options:

```vue
<template>
  <ECFRNavigator 
    :items="ecfrData" 
    :options="{
      theme: 'light',
      showBreadcrumb: true,         // Show breadcrumb navigation
      expandAll: false,             // Auto-expand all sections 
      
      // Fuzzy search configuration
      fuzzySearch: {                
        enabled: true,              // Enable fuzzy search
        threshold: 0.4,             // 0 = exact matches only, 1 = very loose matching
        distance: 100               // Edit distance for fuzzy matching
      },
      
      // Display configuration
      display: {
        showTypeIcon: true,         // Show icons for different item types
        showItemNumbers: true,      // Show number identifiers for items
        indentItems: true,          // Indent nested items
        compactMode: false,         // Use compact display mode
        hideEmptyItems: false       // Hide items with no children or content
      },
      
      // Navigation behavior
      navigation: {
        preserveState: true,        // Preserve expansion state
        scrollToSelected: true,     // Auto-scroll to selected items
        autoExpandParents: true,    // Auto-expand parent items
        autoCollapseOthers: false   // Auto-collapse siblings when expanding an item
      },
      
      // Printing options
      printing: {
        enablePrintView: true,      // Enable print-friendly view
        includeChildrenWhenPrinting: true  // Include child items when printing
      }
    }"
    @search-completed="onSearchCompleted"
    @item-selected="onItemSelected"
    @path-changed="onPathChanged"
  />
</template>

<script>
export default {
  methods: {
    onSearchCompleted(event) {
      console.log(`Found ${event.results} results for "${event.query}"`);
      console.log(`Fuzzy search: ${event.fuzzy ? 'Enabled' : 'Disabled'}`);
    }
  }
}
</script>
```

Users can also adjust search sensitivity in real-time using the slider control in the search results panel, allowing them to fine-tune between exact matching and more flexible fuzzy matching based on their needs.

## Metadata Support

The component includes a powerful metadata system that allows attaching arbitrary data to any item in the navigator. This can be used for a variety of purposes, such as:

- Adding links to external resources (e.g., XML source files)
- Specifying render targets for displaying content
- Including additional information not shown in the UI
- Adding custom behavior through metadata processors

### Basic Metadata Usage

```vue
<template>
  <ECFRNavigator 
    ref="navigator"
    :items="ecfrData" 
    @item-selected="onItemSelected"
    @metadata-changed="onMetadataChanged"
  />
  
  <button @click="addMetadata">Add XML Link</button>
</template>

<script>
export default {
  methods: {
    onItemSelected(event) {
      console.log('Selected item:', event.item);
      
      // Access the item's metadata
      if (event.metadata) {
        console.log('Item metadata:', event.metadata);
      }
      
      // Access processed metadata
      if (event.processedMetadata) {
        console.log('Processed metadata:', event.processedMetadata);
      }
    },
    
    onMetadataChanged(event) {
      console.log(`Metadata ${event.action}:`, {
        itemId: event.itemId,
        metadataType: event.metadataType,
        data: event.action === 'add' ? event.metadata : event.oldMetadata
      });
    },
    
    addMetadata() {
      if (!this.$refs.navigator.selectedItem) return;
      
      const item = this.$refs.navigator.selectedItem;
      
      // Add metadata to the selected item
      this.$refs.navigator.addMetadata(item.id, {
        xmlLink: {
          url: `https://example.com/api/xml/${item.id}.xml`,
          version: '1.0'
        }
      });
    }
  }
}
</script>
```

### Metadata Processors

The component allows registering metadata processors that can transform raw metadata into more useful formats:

```javascript
// Register a processor for XML links
this.$refs.navigator.registerMetadataProcessor('xmlLink', (metadata, itemId) => {
  // Transform the raw metadata into a more useful format
  return {
    url: metadata.url,
    label: `XML for ${itemId}`,
    downloadUrl: `${metadata.url}?download=true`
  };
});

// Later, when metadata is accessed, it will be automatically processed
const processedMetadata = this.$refs.navigator.processMetadata('item-123', 'xmlLink');
console.log(processedMetadata); // The transformed data
```

### Metadata Methods

The ECFRNavigator component provides these metadata-related methods:

- **addMetadata(itemId, metadata, metadataType)**: Add metadata to an item
- **removeMetadata(itemId, metadataType)**: Remove metadata from an item
- **getMetadata(itemId, metadataType)**: Get metadata for an item
- **processMetadata(itemId, metadataType)**: Process metadata with registered processors
- **registerMetadataProcessor(metadataType, processorFn)**: Register a metadata processor
- **unregisterMetadataProcessor(metadataType)**: Remove a metadata processor

### Using the Composable for Metadata

The `useECFRNavigator` composable provides access to all metadata functionality:

```javascript
import { useECFRNavigator } from 'ecfr-navigator';

export default {
  setup() {
    const navigator = useECFRNavigator();
    
    // Set up a metadata processor
    navigator.registerMetadataProcessor('xmlLink', (metadata) => {
      return {
        url: metadata.url,
        label: `XML Source (v${metadata.version})`,
      };
    });
    
    // Add metadata to an item
    navigator.setItemMetadata('section-1-1', {
      xmlLink: { url: 'https://example.com/xml/section-1-1.xml', version: '1.0' }
    });
    
    // Process the metadata
    const processedMetadata = navigator.processItemMetadata('section-1-1');
    console.log(processedMetadata);
    
    return { 
      // Expose methods if needed
      addMetadata: navigator.setItemMetadata,
      getMetadata: navigator.getItemMetadata,
      processMetadata: navigator.processItemMetadata
    };
  }
}
```

## Database Integration

The ECFR Navigator can be integrated with various backend data sources including REST APIs, GraphQL endpoints, and databases. Here are patterns for some common integration scenarios:

### REST API Integration

```javascript
// Component setup with API data
export default {
  data() {
    return {
      ecfrData: [],
      isLoading: false,
      error: null
    };
  },
  
  methods: {
    async fetchData() {
      this.isLoading = true;
      try {
        const response = await fetch('https://api.example.com/ecfr-data');
        const data = await response.json();
        
        // Transform API data to match component structure if needed
        this.ecfrData = this.transformData(data);
      } catch (err) {
        this.error = 'Failed to load data: ' + err.message;
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    
    transformData(apiData) {
      // Example transformation from API format to component format
      return apiData.map(item => ({
        id: item.identifier,
        title: item.title,
        type: item.documentType,
        number: item.sectionNumber,
        children: this.transformData(item.subSections || []),
        content: item.htmlContent
      }));
    },
    
    handleItemSelected(event) {
      // Store selection in local storage for persistence
      localStorage.setItem('lastSelectedItem', event.item.id);
      
      // You can also send selection to backend
      this.updateSelectionInDatabase(event.item.id);
    },
    
    async updateSelectionInDatabase(itemId) {
      try {
        await fetch('https://api.example.com/user-selections', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ itemId, timestamp: new Date().toISOString() })
        });
      } catch (err) {
        console.error('Failed to update selection in database', err);
      }
    }
  },
  
  mounted() {
    this.fetchData();
    
    // Restore last selection if available
    const lastItemId = localStorage.getItem('lastSelectedItem');
    if (lastItemId && this.$refs.navigator) {
      this.$refs.navigator.navigateTo(lastItemId);
    }
  }
};
```

### Real-time Updates with WebSockets

```javascript
export default {
  data() {
    return {
      ecfrData: [],
      socket: null
    };
  },
  
  methods: {
    setupWebSocket() {
      this.socket = new WebSocket('wss://api.example.com/ecfr-updates');
      
      this.socket.onmessage = (event) => {
        const update = JSON.parse(event.data);
        
        // Handle different types of updates
        switch (update.type) {
          case 'itemAdded':
            this.handleItemAdded(update.item);
            break;
          case 'itemUpdated':
            this.handleItemUpdated(update.item);
            break;
          case 'itemRemoved':
            this.handleItemRemoved(update.itemId);
            break;
        }
      };
      
      this.socket.onclose = () => {
        // Reconnect logic
        setTimeout(() => this.setupWebSocket(), 5000);
      };
    },
    
    handleItemAdded(newItem) {
      // Find the right place in the hierarchy to add the item
      this.updateECFRData(this.ecfrData, newItem);
    },
    
    handleItemUpdated(updatedItem) {
      // Find and update the item in the hierarchy
      this.updateECFRData(this.ecfrData, updatedItem, true);
    },
    
    handleItemRemoved(itemId) {
      // Remove the item from the hierarchy
      this.removeItemById(this.ecfrData, itemId);
    },
    
    updateECFRData(items, newItem, isUpdate = false) {
      // Recursively find where to insert/update the item
      // Implementation depends on your data structure
    },
    
    removeItemById(items, itemId) {
      // Recursively find and remove the item
      // Implementation depends on your data structure
    }
  },
  
  mounted() {
    this.setupWebSocket();
  },
  
  beforeUnmount() {
    if (this.socket) {
      this.socket.close();
    }
  }
};
```

### SQL Database Integration (Node.js Backend Example)

```javascript
// Backend (Node.js with Express and MySQL)
const express = require('express');
const mysql = require('mysql2/promise');
const app = express();

// Database connection
const pool = mysql.createPool({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'ecfr_db'
});

// API endpoint to fetch hierarchical data
app.get('/api/ecfr-data', async (req, res) => {
  try {
    // Query to fetch titles (top level)
    const [titles] = await pool.query(`
      SELECT id, title, type, number 
      FROM ecfr_items 
      WHERE parent_id IS NULL
      ORDER BY number
    `);
    
    // For each title, recursively fetch children
    const result = await Promise.all(titles.map(async (title) => {
      const children = await fetchChildren(title.id);
      return { ...title, children };
    }));
    
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Recursive function to fetch all children
async function fetchChildren(parentId) {
  const [items] = await pool.query(`
    SELECT id, title, type, number, content 
    FROM ecfr_items 
    WHERE parent_id = ?
    ORDER BY number
  `, [parentId]);
  
  return await Promise.all(items.map(async (item) => {
    const children = await fetchChildren(item.id);
    return { ...item, children: children.length ? children : undefined };
  }));
}

// Track user selections
app.post('/api/track-selection', express.json(), async (req, res) => {
  const { userId, itemId } = req.body;
  
  try {
    await pool.query(`
      INSERT INTO user_selections (user_id, item_id, timestamp)
      VALUES (?, ?, NOW())
      ON DUPLICATE KEY UPDATE timestamp = NOW()
    `, [userId, itemId]);
    
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

```javascript
// Frontend (Vue component with Axios)
import axios from 'axios';

export default {
  data() {
    return {
      ecfrData: [],
      itemMetadata: {},  // Container for initial metadata
      isLoading: true,
      error: null
    };
  },
  
  methods: {
    async fetchData() {
      try {
        // Fetch both content data and metadata in parallel
        const [contentResponse, metadataResponse] = await Promise.all([
          axios.get('/api/ecfr-data'),
          axios.get('/api/ecfr-metadata')
        ]);
        
        this.ecfrData = contentResponse.data;
        
        // Process metadata into the format expected by the component
        // The API returns an array of metadata objects with itemId property
        const metadataMap = {};
        metadataResponse.data.forEach(meta => {
          metadataMap[meta.itemId] = meta.data;
        });
        
        this.itemMetadata = metadataMap;
        this.isLoading = false;
      } catch (err) {
        this.error = 'Failed to load data';
        this.isLoading = false;
        console.error(err);
      }
    },
    
    async trackSelection(item) {
      try {
        await axios.post('/api/track-selection', {
          userId: this.$store.state.user.id, // Assuming you have user state
          itemId: item.id
        });
      } catch (err) {
        console.error('Failed to track selection', err);
      }
    },
    
    handleItemSelected(event) {
      this.trackSelection(event.item);
    },
    
    async saveMetadata(itemId, metadata) {
      try {
        // Save metadata to the backend
        await axios.post('/api/ecfr-metadata', {
          itemId,
          data: metadata
        });
        
        // Update local state
        this.itemMetadata = {
          ...this.itemMetadata,
          [itemId]: metadata
        };
      } catch (err) {
        console.error('Failed to save metadata', err);
      }
    },
    
    handleMetadataChanged(event) {
      if (event.action === 'add') {
        // Persist the metadata change to the database
        this.saveMetadata(event.itemId, event.metadata);
      }
    }
  },
  
  mounted() {
    this.fetchData();
  }
};
```

### Integrating with Pinia State Management

```javascript
// ecfr.js - Store definition
import { defineStore } from 'pinia';
import axios from 'axios';

export const useECFRStore = defineStore('ecfr', {
  state: () => ({
    rootItems: [],
    currentPath: [],
    currentItem: null,
    expandedItems: new Set(),
    metadataRegistry: new Map(),
    metadataProcessors: new Map(),
    isLoading: false,
    error: null,
    lastUpdated: null
  }),
  
  getters: {
    // ... existing getters
    
    // New getters for database integration
    itemsById() {
      const map = new Map();
      
      const addToMap = (items) => {
        for (const item of items) {
          map.set(item.id, item);
          if (item.children) {
            addToMap(item.children);
          }
        }
      };
      
      addToMap(this.rootItems);
      return map;
    }
  },
  
  actions: {
    // ... existing actions
    
    // New database-related actions
    async fetchFromDatabase() {
      this.isLoading = true;
      this.error = null;
      
      try {
        const response = await axios.get('/api/ecfr-data');
        this.rootItems = response.data;
        this.lastUpdated = new Date();
      } catch (err) {
        this.error = 'Failed to load data: ' + err.message;
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },
    
    async saveUserState() {
      if (!this.currentItem) return;
      
      try {
        await axios.post('/api/user-state', {
          currentItemId: this.currentItem.id,
          expandedItems: Array.from(this.expandedItems),
          timestamp: new Date().toISOString()
        });
      } catch (err) {
        console.error('Failed to save user state', err);
      }
    },
    
    async loadUserState() {
      try {
        const response = await axios.get('/api/user-state');
        const state = response.data;
        
        // Restore expanded items
        this.expandedItems = new Set(state.expandedItems);
        
        // Navigate to last selected item
        if (state.currentItemId) {
          this.navigateToItemById(state.currentItemId);
        }
      } catch (err) {
        console.error('Failed to load user state', err);
      }
    },
    
    async saveItemMetadata(itemId, metadata) {
      try {
        await axios.post('/api/item-metadata', {
          itemId,
          metadata: JSON.stringify(metadata)
        });
        
        // Update local state
        this.setItemMetadata(itemId, metadata);
      } catch (err) {
        console.error('Failed to save metadata', err);
        throw err; // Allow caller to handle the error
      }
    }
  }
});
```

## Integration with Other Vue Components

The ECFR Navigator is designed to work well with other Vue components through various integration patterns.

### Combining with Content Viewers

```vue
<template>
  <div class="flex h-screen">
    <!-- Navigation panel -->
    <div class="w-1/3 h-full overflow-auto border-r">
      <ECFRNavigator 
        ref="navigator"
        :items="ecfrData" 
        @item-selected="handleItemSelected"
      />
    </div>
    
    <!-- Content viewer panel -->
    <div class="w-2/3 h-full overflow-auto p-6">
      <ContentViewer 
        v-if="selectedItem" 
        :item="selectedItem"
        :metadata="selectedItemMetadata"
        @content-loaded="handleContentLoaded"
        @annotation-added="handleAnnotationAdded"
      />
      <div v-else class="flex items-center justify-center h-full text-gray-400">
        Select an item to view content
      </div>
    </div>
  </div>
</template>

<script>
import { ECFRNavigator } from 'ecfr-navigator';
import ContentViewer from './components/ContentViewer.vue';

export default {
  components: {
    ECFRNavigator,
    ContentViewer
  },
  
  data() {
    return {
      ecfrData: [], // Your hierarchical data
      selectedItem: null,
      selectedItemMetadata: null
    };
  },
  
  methods: {
    handleItemSelected(event) {
      this.selectedItem = event.item;
      this.selectedItemMetadata = event.metadata;
      
      // Update URL with selected item for deep linking
      this.updateUrl(event.item.id);
    },
    
    updateUrl(itemId) {
      history.pushState(
        { itemId },
        '',
        `${window.location.pathname}?item=${itemId}`
      );
    },
    
    handleContentLoaded(content) {
      // Process content if needed
      console.log('Content loaded', content);
      
      // Example: Track page view
      this.$analytics.trackPageView({
        documentId: this.selectedItem.id,
        title: this.selectedItem.title
      });
    },
    
    handleAnnotationAdded(annotation) {
      // Store annotation in the navigator's metadata system
      this.$refs.navigator.addMetadata(
        this.selectedItem.id,
        { annotation },
        'userAnnotations'
      );
    },
    
    // Handle browser back/forward navigation
    handlePopState(event) {
      if (event.state && event.state.itemId) {
        this.$refs.navigator.navigateTo(event.state.itemId);
      }
    }
  },
  
  mounted() {
    // Handle deep linking on initial load
    const params = new URLSearchParams(window.location.search);
    const initialItemId = params.get('item');
    
    if (initialItemId && this.$refs.navigator) {
      this.$refs.navigator.navigateTo(initialItemId);
    }
    
    // Listen for browser navigation events
    window.addEventListener('popstate', this.handlePopState);
  },
  
  beforeUnmount() {
    window.removeEventListener('popstate', this.handlePopState);
  }
};
</script>
```

### Combining with Search Components

```vue
<template>
  <div>
    <!-- Global search bar -->
    <GlobalSearch 
      @search="handleGlobalSearch"
      :search-options="searchOptions"
    />
    
    <div class="flex mt-4">
      <!-- Filters panel -->
      <div class="w-1/4 pr-4">
        <FilterPanel 
          :filters="filters"
          @filter-changed="handleFilterChanged"
        />
      </div>
      
      <!-- Navigator and content -->
      <div class="w-3/4">
        <ECFRNavigator 
          ref="navigator"
          :items="filteredData" 
          @item-selected="handleItemSelected"
          @search-completed="handleNavigatorSearch"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { ECFRNavigator } from 'ecfr-navigator';
import GlobalSearch from './components/GlobalSearch.vue';
import FilterPanel from './components/FilterPanel.vue';
import { useSearchStore } from './stores/search';

export default {
  components: {
    ECFRNavigator,
    GlobalSearch,
    FilterPanel
  },
  
  data() {
    return {
      ecfrData: [], // Original unfiltered data
      filteredData: [], // Data after filters applied
      searchOptions: {
        fuzzy: true,
        fields: ['title', 'content'],
        threshold: 0.4
      },
      filters: {
        documentTypes: [
          { id: 'title', label: 'Titles', checked: true },
          { id: 'part', label: 'Parts', checked: true },
          { id: 'section', label: 'Sections', checked: true }
        ],
        dateRange: {
          start: null,
          end: null
        }
      }
    };
  },
  
  methods: {
    handleGlobalSearch(query) {
      // Global search logic
      const searchStore = useSearchStore();
      searchStore.performGlobalSearch(query, this.searchOptions)
        .then(results => {
          // Transform search results to navigator-compatible format
          this.filteredData = this.transformSearchResults(results);
          
          // Automatically expand search results
          this.$nextTick(() => {
            if (this.$refs.navigator) {
              this.$refs.navigator.expandAll();
            }
          });
        });
    },
    
    handleNavigatorSearch(event) {
      // Handle internal navigator search
      console.log(`Found ${event.results} results for "${event.query}"`);
    },
    
    handleFilterChanged() {
      // Apply filters to the data
      this.filteredData = this.applyFilters(this.ecfrData, this.filters);
    },
    
    applyFilters(data, filters) {
      // Implementation of filtering logic
      // ...filtering implementation...
      
      return filteredData;
    },
    
    transformSearchResults(results) {
      // Transform search API results to navigator-compatible format
      // ...transformation implementation...
      
      return transformedData;
    }
  }
};
</script>
```

### Integrating with Print and Export Functionality

```vue
<template>
  <div>
    <div class="controls mb-4">
      <button @click="printContent" class="btn btn-primary mr-2">
        Print Current Selection
      </button>
      <button @click="exportPDF" class="btn btn-outline mr-2">
        Export as PDF
      </button>
      <button @click="exportWord" class="btn btn-outline">
        Export to Word
      </button>
    </div>
    
    <ECFRNavigator 
      ref="navigator"
      :items="ecfrData" 
      :options="navigatorOptions"
      @item-selected="handleItemSelected"
    />
    
    <!-- Hidden printable view -->
    <div ref="printableContent" class="hidden">
      <h1>{{ printTitle }}</h1>
      <div v-html="printContent"></div>
    </div>
  </div>
</template>

<script>
import { ECFRNavigator } from 'ecfr-navigator';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Document, Packer, Paragraph } from 'docx';
import { saveAs } from 'file-saver';

export default {
  components: {
    ECFRNavigator
  },
  
  data() {
    return {
      ecfrData: [],
      selectedItem: null,
      printTitle: '',
      printContent: '',
      navigatorOptions: {
        printing: {
          enablePrintView: true,
          includeChildrenWhenPrinting: true
        }
      }
    };
  },
  
  methods: {
    handleItemSelected(event) {
      this.selectedItem = event.item;
      
      // Prepare print content when an item is selected
      this.printTitle = event.item.title;
      this.printContent = this.preparePrintContent(event.item);
    },
    
    preparePrintContent(item) {
      let content = item.content || '';
      
      // Optionally include content from children
      if (this.navigatorOptions.printing.includeChildrenWhenPrinting && item.children) {
        for (const child of item.children) {
          content += `<h2>${child.title}</h2>`;
          content += child.content || '';
          
          // Recursively add nested children if needed
          if (child.children) {
            content += this.getChildrenContent(child.children, 3);
          }
        }
      }
      
      return content;
    },
    
    getChildrenContent(children, headerLevel) {
      let content = '';
      const headerTag = `h${headerLevel}`;
      
      for (const child of children) {
        content += `<${headerTag}>${child.title}</${headerTag}>`;
        content += child.content || '';
        
        if (child.children) {
          content += this.getChildrenContent(child.children, Math.min(headerLevel + 1, 6));
        }
      }
      
      return content;
    },
    
    printContent() {
      // Use the navigator's print function if available
      if (this.$refs.navigator && this.$refs.navigator.printCurrentItem) {
        this.$refs.navigator.printCurrentItem();
        return;
      }
      
      // Fallback print method
      const printWindow = window.open('', '_blank');
      printWindow.document.write(`
        <html>
          <head>
            <title>${this.printTitle}</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; }
              h1 { border-bottom: 1px solid #ddd; padding-bottom: 10px; }
            </style>
          </head>
          <body>
            <h1>${this.printTitle}</h1>
            ${this.printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    },
    
    async exportPDF() {
      // Make sure we have content to export
      if (!this.selectedItem) return;
      
      // Update the print div with current content
      this.$refs.printableContent.innerHTML = `
        <h1>${this.printTitle}</h1>
        ${this.printContent}
      `;
      
      try {
        // Convert the div to a canvas
        const canvas = await html2canvas(this.$refs.printableContent);
        
        // Initialize PDF with proper dimensions
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgData = canvas.toDataURL('image/png');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const ratio = canvas.width / canvas.height;
        const imgWidth = pdfWidth;
        const imgHeight = imgWidth / ratio;
        
        // Add the image to the PDF
        pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        
        // Save the PDF
        pdf.save(`${this.selectedItem.id}.pdf`);
      } catch (err) {
        console.error('PDF export failed', err);
      }
    },
    
    async exportWord() {
      // Make sure we have content to export
      if (!this.selectedItem) return;
      
      // Create a simple DOCX document
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            new Paragraph({
              text: this.printTitle,
              heading: 'Heading1'
            }),
            // Additional paragraphs would be created from HTML content
            // This would require parsing HTML to DOCX format
          ]
        }]
      });
      
      // Generate and save the document
      const buffer = await Packer.toBuffer(doc);
      saveAs(new Blob([buffer]), `${this.selectedItem.id}.docx`);
    }
  }
};
</script>
```

## Complete Configuration Schema

The ECFR Navigator accepts a comprehensive configuration object with the following schema:

```javascript
/**
 * @typedef {Object} ECFRNavigatorConfiguration - Complete configuration schema
 */
const configSchema = {
  // UI Theme
  theme: 'light', // 'light' or 'dark'
  
  // Breadcrumb Options
  showBreadcrumb: true,
  breadcrumb: {
    maxItems: 5, // Max number of items to show before truncating
    truncationSymbol: '...', // Symbol to show when truncated
    separator: '>', // Separator between breadcrumb items
    clickable: true, // Whether breadcrumb items are clickable
    includeHome: true, // Whether to include a home item
    homeLabel: 'Home', // Label for the home item
    homeIcon: 'home' // Icon for the home item (if using icon library)
  },
  
  // Expansion Options
  expandAll: false, // Initially expand all items
  collapseOthers: false, // Collapse other items when one is expanded
  
  // Display Options
  display: {
    showTypeIcon: true, // Show icons for item types
    showItemNumbers: true, // Show number identifiers
    indentItems: true, // Indent nested items
    indentSize: 20, // Size of each indentation level in pixels
    compactMode: false, // Use more compact display
    hideEmptyItems: false, // Hide items with no children or content
    showItemCount: true, // Show count of children
    lineNumbers: false, // Show line numbers for content
    maxTitleLength: null, // Max length for titles before truncating
    highlightCurrent: true, // Highlight the currently selected item
    highlightColor: '#e3f2fd', // Color to use for highlighting
    animateTransitions: true // Animate expand/collapse
  },
  
  // Navigation Options
  navigation: {
    preserveState: true, // Preserve expansion state
    scrollToSelected: true, // Auto-scroll to selected items
    autoExpandParents: true, // Auto-expand parent items when selecting a child
    autoCollapseOthers: false, // Auto-collapse siblings when expanding an item
    allowKeyboardNavigation: true, // Allow keyboard navigation
    keyboardShortcuts: {
      up: 'ArrowUp',
      down: 'ArrowDown',
      expand: 'ArrowRight',
      collapse: 'ArrowLeft',
      select: 'Enter',
      home: 'Home',
      end: 'End'
    },
    rememberLastPosition: true, // Remember last selected position
    confirmBeforeNavigatingAway: false // Confirm before navigating away from current item
  },
  
  // Search Options
  search: {
    enabled: true, // Enable search functionality
    placeholder: 'Search...', // Placeholder text for search input
    minLength: 2, // Minimum characters before search is performed
    maxResults: 100, // Maximum number of results to show
    highlightResults: true, // Highlight matching text in results
    preserveHierarchy: true, // Preserve hierarchy in search results
    searchDelay: 300, // Debounce delay in milliseconds
    autofocus: false, // Autofocus the search input on component mount
    fuzzySearch: {
      enabled: true, // Enable fuzzy matching
      threshold: 0.4, // Matching threshold (0 = exact, 1 = loose)
      distance: 100, // Maximum edit distance
      includeScore: true, // Include match score in results
      includeMatches: true, // Include matched indices
      ignoreLocation: false, // Ignore location in string matching
      sortResults: true // Sort results by relevance
    },
    searchFields: ['title', 'content'], // Fields to search in
    fieldWeights: { // Relative importance of each field
      title: 2,
      content: 1
    }
  },
  
  // Pagination Options
  pagination: {
    enabled: false, // Enable pagination for large datasets
    itemsPerPage: 50, // Number of items per page
    showPageNumbers: true, // Show page numbers
    showFirstLastButtons: true, // Show first/last page buttons
    dynamicLoading: false // Dynamically load items as needed
  },
  
  // Printing Options
  printing: {
    enablePrintView: true, // Enable print-friendly view
    includeChildrenWhenPrinting: true, // Include child items
    includeBreadcrumbsWhenPrinting: true, // Include breadcrumbs
    printTitle: true, // Include title when printing
    customPrintStyles: '', // Custom CSS for print view
    pageBreakBetweenItems: true // Add page breaks between major items
  },
  
  // Filter Options
  filter: {
    enabled: false, // Enable built-in filtering
    filterFields: ['type', 'title'], // Fields that can be filtered
    showFilterControls: true, // Show filter UI controls
    persistFilters: true, // Remember filter state
    customFilterFn: null // Custom filtering function
  },
  
  // Content Rendering Options
  content: {
    sanitizeHtml: true, // Sanitize HTML content for security
    allowedTags: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'strong', 'em'], 
    allowedAttributes: { // Allowed HTML attributes
      a: ['href', 'target', 'rel'],
      '*': ['class', 'id', 'style']
    },
    syntaxHighlighting: false, // Enable syntax highlighting
    renderMarkdown: false, // Treat content as Markdown
    lazyLoadImages: true, // Lazy load images in content
    enableFootnotes: true, // Enable footnote handling
    contentFallbackMessage: 'No content available', // Message when no content
    externalLinkBehavior: 'open-new-tab' // How to handle external links
  },
  
  // Accessibility Options
  accessibility: {
    enableKeyboardNavigation: true, // Enable keyboard navigation
    ariaLabels: { // Custom ARIA labels for elements
      navigator: 'Document navigator',
      searchInput: 'Search documents',
      breadcrumb: 'Navigation breadcrumb',
      expandButton: 'Expand item',
      collapseButton: 'Collapse item'
    }
  },
  
  // Performance Options
  performance: {
    lazyLoading: false, // Lazy load items on demand
    loadingBatchSize: 50, // Number of items to load in each batch
    enableVirtualScrolling: false, // Use virtual scrolling for large lists
    cacheItems: true, // Cache items for better performance
    maxCachedItems: 1000, // Maximum number of cached items
    debounceRendering: true, // Debounce rendering for better performance
    debounceDelay: 50 // Debounce delay in milliseconds
  },
  
  // Integration Options
  integration: {
    storePersistence: true, // Persist state to localStorage
    storeModule: 'ecfrNavigator', // Vuex/Pinia store module name
    trackItemViews: false, // Track item views (analytics)
    trackingEventName: 'ecfr-item-viewed', // Event name for tracking
    externalContentRenderer: null, // External renderer function for content
    useBrowserHistory: true, // Use browser history API for navigation
    urlPattern: '/ecfr/:itemId', // URL pattern for deep linking
    initialMetadata: {}, // Metadata to pre-populate, keyed by item ID
    initialSelectedItemId: null, // ID of item to select initially
    metadataSync: {
      enabled: false, // Enable automatic syncing of metadata changes
      syncEndpoint: '/api/sync-metadata', // API endpoint for sync
      syncDebounce: 500, // Debounce time in ms for syncing changes
      retryOnFailure: true // Retry failed syncs
    }
  },
  
  // Customization Options
  customization: {
    itemComponent: null, // Custom component for rendering items
    breadcrumbComponent: null, // Custom breadcrumb component
    searchComponent: null, // Custom search component
    contentComponent: null, // Custom content component
    customClasses: {}, // Custom CSS classes for components
    slots: {} // Configuration for named slots
  },
  
  // Experimental Features
  experimental: {
    enableAnnotations: false, // Enable annotations on content
    enableBookmarks: false, // Enable bookmarking items
    enableCollaborationFeatures: false, // Enable collaboration features
    enableOfflineSupport: false // Enable offline support
  }
};
```

### Key Configuration Sections

This comprehensive schema allows for extensive customization of the ECFR Navigator. Here are some key sections explained in more detail:

#### Display Options

Controls how items are displayed in the navigator:

- **showTypeIcon**: Show icons to indicate item types (title, part, section)
- **showItemNumbers**: Display item numbers/identifiers
- **indentItems**: Indent nested items to reflect hierarchy
- **compactMode**: Use compact display for denser view

#### Search Options

Configure the powerful search functionality:

- **enabled**: Toggle search feature on/off
- **fuzzySearch.threshold**: Control match sensitivity (0-1 scale)
- **fuzzySearch.includeMatches**: Include details about which parts matched
- **fieldWeights**: Give more importance to matches in titles vs. content

#### Content Rendering Options

Control how content is rendered and sanitized:

- **sanitizeHtml**: Enable HTML sanitization for security
- **allowedTags/allowedAttributes**: Specify allowed HTML elements and attributes
- **renderMarkdown**: Treat content as Markdown instead of HTML
- **syntaxHighlighting**: Enable code syntax highlighting in content

#### Integration Options

Configure how the navigator integrates with external systems:

- **storePersistence**: Save state to localStorage
- **useBrowserHistory**: Use browser history API for navigation
- **urlPattern**: Define URL pattern for deep linking
- **externalContentRenderer**: Custom function for rendering content

## Extensible Schemas

The navigator supports several extensible schemas that can be used to define custom data structures and behaviors.

### Custom Item Schema

You can extend the basic item schema with additional properties:

```javascript
/**
 * @typedef {Object} CustomECFRItem
 * @extends {ECFRItem}
 * @property {string} [status] - Publication status (e.g., 'draft', 'published')
 * @property {string} [effectiveDate] - When the item becomes effective
 * @property {string[]} [tags] - Tags or categories for the item
 * @property {Object} [permissions] - User permissions for this item
 * @property {Object} [history] - Version history information
 * @property {Object} [relationships] - Relationships to other items
 */

// Example usage
const extendedItems = [
  {
    id: 'custom-title-1',
    type: 'title',
    number: '1',
    title: 'Extended Title',
    
    // Standard properties
    children: [ /* ... */ ],
    content: '<p>Standard content</p>',
    
    // Extended properties
    status: 'published',
    effectiveDate: '2023-01-01',
    tags: ['important', 'regulatory'],
    permissions: {
      read: ['public'],
      edit: ['admin']
    },
    history: {
      createdAt: '2022-06-15',
      lastModified: '2022-12-10',
      versions: [
        { version: '1.0', date: '2022-06-15' },
        { version: '1.1', date: '2022-12-10' }
      ]
    },
    relationships: {
      supersedes: ['old-title-1'],
      relatedTo: ['title-2', 'title-3']
    }
  }
];
```

### Custom Metadata Schema

Define structured metadata schemas for different types of metadata:

```javascript
/**
 * @typedef {Object} XMLSourceMetadata
 * @property {string} url - URL to the XML source
 * @property {string} [version] - Version of the XML
 * @property {string} [lastUpdated] - When the XML was last updated
 * @property {string} [format] - Format of the XML (e.g., 'eCFR', 'GPO')
 */

/**
 * @typedef {Object} RenderTargetMetadata
 * @property {string} elementId - ID of the element to render into
 * @property {string} [mode] - Rendering mode ('replace', 'append', etc.)
 * @property {boolean} [sync] - Whether to sync scrolling with navigator
 */

/**
 * @typedef {Object} AnnotationsMetadata
 * @property {Array} annotations - Array of annotations
 * @property {string} annotations[].id - Unique ID for the annotation
 * @property {string} annotations[].text - Annotation text
 * @property {string} annotations[].user - User who created the annotation
 * @property {string} annotations[].timestamp - When the annotation was created
 * @property {Object} annotations[].position - Position information
 */

// Example usage
navigator.addMetadata('section-1-1', {
  xmlSource: {
    url: 'https://www.ecfr.gov/api/xml/section-1-1.xml',
    version: '1.0',
    lastUpdated: '2023-04-15',
    format: 'eCFR'
  },
  renderTarget: {
    elementId: 'content-viewer',
    mode: 'replace',
    sync: true
  },
  annotations: {
    annotations: [
      {
        id: 'anno-1',
        text: 'This is an important section',
        user: 'jsmith',
        timestamp: '2023-05-20T14:30:00Z',
        position: { startOffset: 10, endOffset: 25 }
      }
    ]
  }
});
```

### Custom Event Schema

Define custom events with structured data:

```javascript
/**
 * @typedef {Object} NavigationEventData
 * @property {string} source - Source of the navigation ('user', 'api', 'history')
 * @property {string} timestamp - When the navigation occurred
 * @property {Object} from - Information about the previous item
 * @property {Object} to - Information about the new item
 */

/**
 * @typedef {Object} SearchEventData
 * @property {string} query - The search query
 * @property {number} results - Number of results found
 * @property {boolean} fuzzy - Whether fuzzy search was used
 * @property {number} threshold - Fuzzy search threshold used
 * @property {Array} matches - Detailed match information
 */

// Example component usage with custom events
<ECFRNavigator
  @item-selected="(event) => {
    // Standard event data
    console.log(event.item, event.path);
    
    // Extended event data
    const extendedData = {
      source: 'user',
      timestamp: new Date().toISOString(),
      from: this.previousItem,
      to: event.item
    };
    
    // Track the event
    this.$analytics.trackEvent('item-navigation', extendedData);
    
    // Update state
    this.previousItem = event.item;
  }"
  
  @search-completed="(event) => {
    // Track search analytics
    this.$analytics.trackEvent('search', {
      query: event.query,
      results: event.results,
      fuzzy: event.fuzzy,
      threshold: event.threshold,
      timestamp: new Date().toISOString()
    });
  }"
/>
```

### Custom Processor Schema

Define custom metadata processors with type definitions:

```javascript
/**
 * @typedef {Function} MetadataProcessor
 * @param {Object} metadata - Raw metadata to process
 * @param {string} itemId - ID of the item
 * @returns {Object} Processed metadata
 */

/**
 * @typedef {Object} ProcessorRegistry
 * @property {Map<string, MetadataProcessor>} processors - Map of processor functions
 * @property {Function} register - Function to register a processor
 * @property {Function} unregister - Function to unregister a processor
 * @property {Function} process - Function to process metadata
 */

// Example processor implementation
const xmlSourceProcessor = (metadata, itemId) => {
  // Validate metadata
  if (!metadata.url) {
    console.warn(`Invalid XML source metadata for ${itemId}: missing URL`);
    return null;
  }
  
  // Process the metadata
  return {
    url: metadata.url,
    label: `XML for ${itemId} (v${metadata.version || '1.0'})`,
    downloadUrl: `${metadata.url}?download=true`,
    isValid: true,
    formattedDate: metadata.lastUpdated ? 
      new Date(metadata.lastUpdated).toLocaleDateString() : 'Unknown'
  };
};

// Register the processor
navigator.registerMetadataProcessor('xmlSource', xmlSourceProcessor);
```

## Browser Support

This component supports all modern browsers and IE 11 with appropriate polyfills.

## License

MIT
