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
- 🔍 **Adaptive Font Sizing**: Dynamic text scaling for improved readability across devices
- 📦 **URL Data Loading**: Load large JSON documents efficiently from URLs

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

# Or if you've downloaded it to another location
npm install /path/to/ecfr-navigator-1.0.0.tgz

# Or from a URL
npm install https://example.com/path/to/ecfr-navigator-1.0.0.tgz
```

## Integration Guide

After installing the ECFRNavigator component in your Vue 3 application, follow these steps to properly integrate it:

### Step 1: Install Dependencies

Ensure you have the required dependencies:

```bash
# If you don't already have these dependencies
npm install pinia vue tailwindcss
```

### Step 2: Configure Pinia

The ECFRNavigator uses Pinia for state management. Add Pinia to your Vue application in `main.js`:

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
```

### Step 3: Import and Register the Component

You can register the component globally:

```javascript
// In main.js
import { ECFRNavigator } from 'ecfr-navigator'
import 'ecfr-navigator/dist/style.css' // Import the styles

app.component('ECFRNavigator', ECFRNavigator)
```

Or import it locally in your component:

```javascript
// In your component
import { ECFRNavigator } from 'ecfr-navigator'
import 'ecfr-navigator/dist/style.css'

export default {
  components: {
    ECFRNavigator
  }
}
```

### Step 4: Use the Component in Your Template

Basic usage with direct data:

```html
<template>
  <div class="my-container">
    <ECFRNavigator 
      :items="ecfrData"
      :options="navigatorOptions"
      @item-selected="handleItemSelected"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      ecfrData: [
        // Your hierarchical data structure
        {
          id: 'title-1',
          type: 'title',
          number: '1',
          title: 'General Provisions',
          children: [
            // Sub-items...
          ]
        }
      ],
      navigatorOptions: {
        showBreadcrumb: true,
        theme: 'light', // or 'dark'
        display: {
          viewMode: 'standard', // 'compact', 'detailed', or 'styleless'
          showDescription: true,
          showMetadataBadges: true,
          fontScaling: {
            enabled: true,
            baseSize: 'medium', // 'small', 'medium', 'large'
            scaleWithWidth: true,
            responsive: true
          }
        }
      }
    }
  },
  methods: {
    handleItemSelected(event) {
      console.log('Selected item:', event.item)
      // Access the selected item's content or metadata
    }
  }
}
</script>
```

### Step 5: Loading Data from URLs

For efficient handling of large datasets, you can load data from URLs:

```html
<ECFRNavigator 
  dataUrl="/api/ecfr-structure.json"
  metadataUrl="/api/ecfr-metadata.json"
  :options="navigatorOptions"
/>
```

Or load and merge data from multiple URLs:

```html
<ECFRNavigator 
  :dataUrls="[
    '/api/titles-1-10.json',
    '/api/titles-11-20.json',
    '/api/titles-21-50.json'
  ]"
  metadataUrl="/api/metadata.json"
  :options="navigatorOptions"
/>
```

### Step 6: Accessing the Store from Other Components

You can access the ECFRNavigator's state from any component using the Pinia store:

```javascript
import { useECFRStore } from 'ecfr-navigator'

export default {
  setup() {
    const ecfrStore = useECFRStore()
    
    // Access current selected item
    const currentItem = computed(() => ecfrStore.currentItem)
    
    // Access breadcrumb path
    const breadcrumbPath = computed(() => ecfrStore.breadcrumbPath)
    
    // Navigate programmatically
    function jumpToSection(sectionId) {
      ecfrStore.navigateTo(sectionId)
    }
    
    return {
      currentItem,
      breadcrumbPath,
      jumpToSection
    }
  }
}
```

### Step 7: Creating a Side-by-Side Layout

This common pattern shows the navigation panel alongside a content display panel:

```html
<template>
  <div class="flex flex-col md:flex-row h-screen">
    <!-- Navigation Panel -->
    <div class="w-full md:w-[350px] md:mr-4 overflow-y-auto border rounded">
      <ECFRNavigator 
        :items="ecfrData"
        :options="navigatorOptions"
        @item-selected="handleItemSelected"
      />
    </div>
    
    <!-- Content Panel -->
    <div class="flex-1 overflow-y-auto p-4 border rounded">
      <div v-if="isLoading" class="animate-pulse">
        <div class="h-4 bg-gray-200 rounded w-full mb-3"></div>
        <div class="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
      </div>
      
      <div v-else-if="currentContent" class="prose max-w-none">
        <h2 class="text-xl font-bold mb-4">{{ currentTitle }}</h2>
        <div v-html="currentContent"></div>
        
        <!-- Metadata Display -->
        <div v-if="currentMetadata" class="mt-6 pt-4 border-t">
          <h3 class="font-medium mb-2">Document Information</h3>
          <div class="bg-gray-50 p-4 rounded">
            <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div v-if="currentMetadata.publishInfo">
                <dt class="text-gray-500">Last Updated</dt>
                <dd class="font-medium">{{ currentMetadata.publishInfo.lastUpdated }}</dd>
              </div>
              <div v-if="currentMetadata.sourceLinks">
                <dt class="text-gray-500">Source Links</dt>
                <dd class="font-medium">
                  <a v-for="(url, format) in currentMetadata.sourceLinks" 
                     :key="format" 
                     :href="url" 
                     class="text-blue-600 hover:underline mr-2"
                  >{{ format.toUpperCase() }}</a>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-10 text-gray-500">
        <p>Select an item to view its content</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useECFRStore } from 'ecfr-navigator'

export default {
  data() {
    return {
      ecfrData: [], // Your data here
      navigatorOptions: {
        showBreadcrumb: true,
        theme: 'light',
        // Additional options...
      },
      currentContent: '',
      currentTitle: '',
      currentMetadata: null,
      isLoading: false
    }
  },
  setup() {
    // Access the store for additional functionality
    const ecfrStore = useECFRStore()
    return { ecfrStore }
  },
  methods: {
    handleItemSelected(event) {
      this.isLoading = true
      this.currentTitle = event.item.title
      
      // Simulate loading content from an API
      setTimeout(() => {
        this.currentContent = event.item.content || 
          `<p>Content for ${event.item.title}</p>`
        
        // Get metadata from the store
        this.currentMetadata = this.ecfrStore.getItemMetadata(event.item.id)
        this.isLoading = false
      }, 300)
    }
  }
}
</script>
```

### Step 8: Using the Store Composable Outside of Components

For more flexibility, you can use the provided composable:

```javascript
import { useECFRNavigator } from 'ecfr-navigator'

// In any function or composition function
function initializeNavigator() {
  const navigator = useECFRNavigator()
  
  // Load data
  fetch('/api/ecfr-data.json')
    .then(response => response.json())
    .then(data => {
      navigator.setData(data)
      
      // Expand all items initially
      navigator.expandAll()
      
      // Navigate to a specific item
      navigator.navigateTo('section-1-1-1')
    })
}
```

### Complete Example with URL Data Loading and Responsive Layout

```html
<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">eCFR Navigation Demo</h1>
    
    <!-- Mobile Controls -->
    <div class="md:hidden mb-4">
      <button 
        @click="showNav = !showNav" 
        class="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {{ showNav ? 'Hide Navigation' : 'Show Navigation' }}
      </button>
    </div>
    
    <div class="flex flex-col md:flex-row gap-4">
      <!-- Navigation Panel (toggleable on mobile) -->
      <div 
        v-show="showNav || !isMobile" 
        class="w-full md:w-[350px] md:h-[calc(100vh-120px)] shadow-md rounded-lg overflow-hidden border"
      >
        <div class="bg-gray-50 border-b p-3">
          <h2 class="font-medium">Document Navigator</h2>
        </div>
        
        <div class="h-[500px] md:h-[calc(100vh-160px)]">
          <ECFRNavigator 
            :dataUrl="dataUrl"
            :metadataUrl="metadataUrl"
            :options="navigatorOptions"
            @item-selected="handleItemSelected"
          />
        </div>
      </div>
      
      <!-- Content Panel -->
      <div 
        v-show="!showNav || !isMobile" 
        class="flex-1 border rounded-lg shadow-md"
      >
        <div class="p-4 bg-gray-50 border-b">
          <h2 class="text-xl font-semibold">{{ currentTitle || 'No Selection' }}</h2>
        </div>
        
        <div class="p-4">
          <div v-if="isLoading" class="animate-pulse">
            <div class="h-4 bg-gray-200 rounded w-full mb-3"></div>
            <div class="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
          </div>
          
          <div v-else-if="currentContent" v-html="currentContent"></div>
          
          <div v-else class="text-center py-10 text-gray-500">
            <p>Select an item from the navigation panel to view its content</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { ECFRNavigator, useECFRStore } from 'ecfr-navigator'
import 'ecfr-navigator/dist/style.css'

export default {
  components: { ECFRNavigator },
  setup() {
    const ecfrStore = useECFRStore()
    const currentTitle = ref('')
    const currentContent = ref('')
    const isLoading = ref(false)
    const showNav = ref(false)
    const isMobile = ref(false)
    
    // URL sources for data and metadata
    const dataUrl = '/api/ecfr-data.json'
    const metadataUrl = '/api/ecfr-metadata.json'
    
    const navigatorOptions = {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        fontScaling: {
          enabled: true,
          baseSize: 'medium',
          scaleWithWidth: true,
          responsive: true
        }
      }
    }
    
    function handleItemSelected(event) {
      isLoading.value = true
      currentTitle.value = event.item.title
      
      // In a real app you'd fetch content from an API
      setTimeout(() => {
        currentContent.value = `<p>Content for ${event.item.title} (ID: ${event.item.id})</p>`
        
        if (isMobile.value) {
          showNav.value = false
        }
        
        isLoading.value = false
      }, 500)
    }
    
    function checkMobile() {
      isMobile.value = window.innerWidth < 768
      if (!isMobile.value) {
        showNav.value = true
      }
    }
    
    onMounted(() => {
      checkMobile()
      window.addEventListener('resize', checkMobile)
    })
    
    onUnmounted(() => {
      window.removeEventListener('resize', checkMobile)
    })
    
    return {
      dataUrl,
      metadataUrl,
      navigatorOptions,
      currentTitle,
      currentContent,
      isLoading,
      showNav,
      isMobile,
      handleItemSelected
    }
  }
}
</script>
```

### API Reference

For a complete API reference, see the full documentation or explore the Storybook examples.

### Important Installation Notes

If you encounter any import errors like this:

```
Failed to resolve entry for package "ecfr-navigator". 
The package may have incorrect main/module/exports specified in its package.json.
```

This is because the package requires proper exports configuration. Follow these steps:

1. After installing the package, ensure you're using the latest version which includes the fixed exports.
2. If the issue persists, you can use direct imports as a workaround:

```javascript
// Instead of:
import { ECFRNavigator } from 'ecfr-navigator';

// Try using direct file imports:
import ECFRNavigator from 'ecfr-navigator/dist/ecfr-navigator.es.js';
import 'ecfr-navigator/dist/ecfr-navigator.css';
```

3. Alternatively, rebuild the package with the fixes by running the provided build script:

```bash
# Clone the repository
git clone https://github.com/your-org/ecfr-navigator.git
cd ecfr-navigator

# Install dependencies
npm install

# Build with fixed exports
./build-package.sh

# Install the fixed package in your project
npm install /path/to/ecfr-navigator-1.0.0.tgz
```

To create the tarball package yourself:

**On Linux/MacOS:**
```bash
# Build the library and create a tarball
./build-package.sh
```

**On Windows:**
```cmd
# Using Command Prompt
build-package.bat
```

```powershell
# Using PowerShell
.\build-package.ps1
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

### Adaptive Font Sizing

The ECFRNavigator supports dynamic font scaling for improved readability across different devices and for users with varying visual needs:

```javascript
options: {
  display: {
    fontScaling: {
      enabled: true, // Enable adaptive font sizing
      baseSize: 'medium', // 'small', 'medium', 'large'
      scaleWithWidth: true, // Scale font size with container width
      scaleWithViewMode: true, // Adjust font based on view mode (compact/detailed)
      responsive: true // Use responsive breakpoints
    }
  }
}
```

**Implementation Example:**

```vue
<template>
  <div class="flex flex-col">
    <div class="mb-4">
      <label class="mr-2">Font Size:</label>
      <select v-model="fontSize" @change="updateFontSize">
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="adaptive">Adaptive</option>
      </select>
    </div>
    
    <ECFRNavigator 
      :items="items" 
      :options="navigatorOptions" 
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      fontSize: 'medium',
      navigatorOptions: {
        display: {
          fontScaling: {
            enabled: true,
            baseSize: 'medium',
            scaleWithWidth: false,
            responsive: true
          }
        }
      }
    }
  },
  methods: {
    updateFontSize() {
      // Update the font scaling options
      this.navigatorOptions = {
        ...this.navigatorOptions,
        display: {
          ...this.navigatorOptions.display,
          fontScaling: {
            ...this.navigatorOptions.display.fontScaling,
            baseSize: this.fontSize === 'adaptive' ? 'medium' : this.fontSize,
            scaleWithWidth: this.fontSize === 'adaptive'
          }
        }
      };
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

## Development and Testing

For those contributing to or modifying the component, the project includes development tools:

```bash
# Start development server with hot-reloading
npm run dev

# Start Storybook development server
npx storybook dev -p 6006 --host 0.0.0.0

# Build Storybook as static site
npx storybook build
```

### Storybook Integration

The project uses Storybook to showcase the component's features and provide interactive examples:

- Interactive demos for all component features
- Example configurations for different use cases
- Documentation for props, events, and slots
- Visual testing for different component states
- Mobile responsive layout testing
- Light/dark theme switching
- Copy-paste code examples

#### Included Story Categories

1. **Introduction** - Component overview and API reference
2. **View Modes** - Different display options (standard, compact, detailed, styleless)
3. **Search & Filtering** - Advanced search capabilities with custom filters
4. **Metadata** - Working with attached item metadata and processors
5. **Breadcrumbs** - Breadcrumb trail configuration and customization

#### Running Storybook

```bash
# Start the Storybook development server
npx storybook dev -p 6006 --host 0.0.0.0

# Build Storybook as a static site
npx storybook build
```

You can access the Storybook interface at http://localhost:6006

### Building for Production

```bash
# Build as a library for distribution
npm run lib

# Create package tarball
npm run pack
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