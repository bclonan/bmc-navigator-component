# eCFR Navigator Component

A lightweight, reusable Vue 3 component with Pinia integration for navigating hierarchical eCFR-style content in existing Vue applications.

## Features

- 📚 **Hierarchical Navigation**: Navigate complex nested document structures
- 🔖 **Breadcrumb Trail**: Always see your current location in the hierarchy
- 🔍 **Search Functionality**: Find content across the entire document structure
- 🎨 **Tailwind CSS Styling**: Clean, minimal interface with Tailwind CSS
- 🧩 **Expandable Sections**: Collapsible sections for better content organization
- 📱 **Responsive Design**: Works on all screen sizes
- 🔌 **Simple Integration**: Easy to integrate into existing Vue applications
- 🔄 **Pinia State Management**: Lightweight state management
- 🌙 **Light/Dark Themes**: Support for light and dark modes

## Installation

```bash
npm install ecfr-navigator
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
  showBreadcrumb: true,           // Whether to show breadcrumb navigation
  expandAll: false,               // Whether to expand all items initially
  hideContentOnNavigation: false, // Whether to hide content when navigating
  theme: 'light'                  // Theme: 'light' or 'dark'
}
```

## Events

The component emits the following events:

- `item-selected`: Fired when an item is selected, with the item and path
- `path-changed`: Fired when the navigation path changes

## Search Functionality

The component includes a built-in search feature that allows users to find content across the entire document structure:

- Search across titles, subtitles, and content of all items
- Results show context of where the match was found
- Click on search results to navigate directly to that item
- Results are displayed with contextual snippets to help identify relevant matches
- Responsive design works on mobile and desktop

The search engine automatically:

1. Strips HTML tags from content for text-only searching
2. Provides context around matched content
3. Expands parent items when navigating to a search result
4. Groups results by type (title, subtitle, content)

Example usage with search:

```vue
<template>
  <ECFRNavigator 
    :items="ecfrData" 
    :options="{ theme: 'light' }"
  />
</template>
```

Users can then use the search box in the component to find content across all items.

## Browser Support

This component supports all modern browsers and IE 11 with appropriate polyfills.

## License

MIT
