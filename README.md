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
        @item-selected="handleItemSelected"
        @path-changed="handlePathChanged"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navigatorOptions: {
        showBreadcrumb: true,
        expandAll: false,
        theme: 'light' // 'light' or 'dark'
      },
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
      ]
    };
  },
  
  methods: {
    handleItemSelected(event) {
      console.log('Selected item:', event.item);
    },
    
    handlePathChanged(path) {
      console.log('Path changed:', path);
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
    
    return {
      // ...
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

- `item-selected`: Fired when an item is selected, with the item and path
- `path-changed`: Fired when the navigation path changes
- `search-completed`: Fired when a search is completed, with query info and results count
- `update:options`: Fired when options are updated internally (for v-model support)

## Configuration Options

The ECFRNavigator component can be extensively customized through its options prop:

### Theme Options
- **theme**: Sets the color theme ('light' or 'dark')
- **showBreadcrumb**: Toggle breadcrumb navigation display

### Display Options
- **display.showTypeIcon**: Show icons to indicate item types (title, part, section)
- **display.showItemNumbers**: Display item numbers/identifiers
- **display.indentItems**: Indent nested items to reflect hierarchy
- **display.compactMode**: Use compact display for denser view
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

## Browser Support

This component supports all modern browsers and IE 11 with appropriate polyfills.

## License

MIT
