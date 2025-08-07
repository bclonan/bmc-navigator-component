const E={title:"eCFR/Implementation Guide/Complete Application",parameters:{layout:"fullscreen",docs:{description:{component:"A comprehensive guide to implementing a complete application with the ECFRNavigator component, including URL data loading, content rendering, and state management."}}}},t={render:()=>({template:`
      <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Building a Complete eCFR Application</h1>
        
        <div class="prose prose-lg max-w-none">
          <p>
            The ECFRNavigator component is designed to be part of a larger application. This guide provides
            a comprehensive approach to building a complete application that showcases hierarchical navigation,
            content rendering, and state management.
          </p>
          
          <h2>The eCFR Application Architecture</h2>
          <p>
            A complete eCFR viewer application typically includes these main components:
          </p>
          
          <ul>
            <li><strong>Navigation Panel</strong> - Using the ECFRNavigator component</li>
            <li><strong>Content Panel</strong> - For displaying regulation text and metadata</li>
            <li><strong>Header & Controls</strong> - For search, filtering, and navigation aids</li>
            <li><strong>Metadata Display</strong> - For showing publication information</li>
          </ul>
          
          <p>
            Below you'll find detailed guides on implementing each part of this architecture,
            with sample code and best practices.
          </p>
          
          <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 my-6">
            <h3 class="text-lg font-semibold text-blue-800 mb-2">Key Benefits of This Approach</h3>
            <ul class="list-disc pl-5 text-blue-700 space-y-1">
              <li>Clean separation of concerns with modular components</li>
              <li>Centralized state management with Pinia</li>
              <li>Efficient data loading from external URLs</li>
              <li>Responsive design that works across devices</li>
              <li>Extensible architecture for custom features</li>
            </ul>
          </div>
        </div>
      </div>
    `})},e={render:()=>({template:`
      <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Application Structure</h1>
        
        <div class="prose prose-lg max-w-none">
          <p>
            Here's a recommended file structure for your eCFR application:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
src/
├── components/
│   ├── ECFRNavigator.vue          # The main navigator component
│   ├── ECFRBreadcrumb.vue         # Breadcrumb navigation
│   ├── ECFRSection.vue            # Individual section component
│   ├── ContentViewer.vue          # Component to display regulation content
│   ├── MetadataPanel.vue          # Component to display item metadata
│   └── ControlPanel.vue           # Search and filter controls
├── composables/
│   └── useECFRNavigator.js        # Helper composable for navigation
├── store/
│   └── ecfr.js                    # Pinia store for state management
├── views/
│   ├── ECFRViewerPage.vue         # Main application page
│   └── SettingsPage.vue           # Optional settings page
├── services/
│   └── ecfrApi.js                 # Service for fetching data
├── App.vue                        # Vue application root
└── main.js                        # Application entry point
          </pre>
          
          <h2 class="mt-6">Key Components</h2>
          
          <h3>ECFRViewerPage.vue</h3>
          <p>
            This is the main page that orchestrates all components:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm">
&lt;template&gt;
  &lt;div class="ecfr-viewer-page"&gt;
    &lt;header class="page-header"&gt;
      &lt;h1&gt;eCFR Viewer&lt;/h1&gt;
      &lt;ControlPanel /&gt;
    &lt;/header&gt;
    
    &lt;main class="page-content"&gt;
      &lt;div class="navigator-panel"&gt;
        &lt;ECFRNavigator 
          :dataUrl="dataUrl"
          :metadataUrl="metadataUrl"
          :options="navigatorOptions"
          @item-selected="handleItemSelected"
        /&gt;
      &lt;/div&gt;
      
      &lt;div class="content-panel"&gt;
        &lt;ContentViewer 
          :content="currentContent"
          :isLoading="isLoading"
        /&gt;
        
        &lt;MetadataPanel 
          :metadata="currentMetadata"
          v-if="currentMetadata"
        /&gt;
      &lt;/div&gt;
    &lt;/main&gt;
  &lt;/div&gt;
&lt;/template&gt;
          </pre>
          
          <h3>ContentViewer.vue</h3>
          <p>
            This component renders the actual regulation content:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm">
&lt;template&gt;
  &lt;div class="content-viewer"&gt;
    &lt;div v-if="isLoading" class="loading-indicator"&gt;
      Loading content...
    &lt;/div&gt;
    
    &lt;div v-else-if="content" class="content-container"&gt;
      &lt;h2 v-if="title" class="content-title"&gt;{{ title }}&lt;/h2&gt;
      &lt;div class="content-html" v-html="content"&gt;&lt;/div&gt;
    &lt;/div&gt;
    
    &lt;div v-else class="empty-state"&gt;
      Select an item to view its content
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
          </pre>
          
          <h3>MetadataPanel.vue</h3>
          <p>
            This component displays metadata for the selected item:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm">
&lt;template&gt;
  &lt;div v-if="metadata" class="metadata-panel"&gt;
    &lt;h3 class="panel-title"&gt;Document Information&lt;/h3&gt;
    
    &lt;div v-if="metadata.publishInfo" class="metadata-section"&gt;
      &lt;h4&gt;Publication Details&lt;/h4&gt;
      &lt;dl&gt;
        &lt;dt&gt;Last Updated&lt;/dt&gt;
        &lt;dd&gt;{{ formatDate(metadata.publishInfo.lastUpdated) }}&lt;/dd&gt;
        
        &lt;dt&gt;Effective Date&lt;/dt&gt;
        &lt;dd&gt;{{ formatDate(metadata.publishInfo.effectiveDate) }}&lt;/dd&gt;
      &lt;/dl&gt;
    &lt;/div&gt;
    
    &lt;!-- Additional metadata sections --&gt;
  &lt;/div&gt;
&lt;/template&gt;
          </pre>
          
          <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 my-6">
            <h3 class="text-lg font-semibold text-green-800 mb-2">Best Practice</h3>
            <p class="text-green-700">
              Separating your application into these modular components makes it easier to maintain,
              test, and extend. It also enables different teams to work on different parts of the
              application independently.
            </p>
          </div>
        </div>
      </div>
    `})},n={render:()=>({template:`
      <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">URL Data Loading Strategy</h1>
        
        <div class="prose prose-lg max-w-none">
          <p>
            For efficient handling of large eCFR datasets, we recommend a strategic approach to URL data loading:
          </p>
          
          <h2>Progressive Loading Strategy</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
            <div class="bg-white p-4 rounded-lg shadow-md border-t-4 border-blue-500">
              <h3 class="font-semibold text-lg mb-2">Structure First</h3>
              <p class="text-gray-700">
                Load the basic structure (titles and parts) first for quick initial rendering.
                This provides the navigation framework without all the details.
              </p>
              <pre class="bg-gray-100 p-2 rounded mt-2 text-xs">
// structure.json
{
  "items": [
    {
      "id": "title-1",
      "type": "title",
      "number": "1",
      "title": "General Provisions",
      "children": [
        {
          "id": "part-1-1",
          "type": "part",
          "number": "1",
          "title": "Definitions",
          "children": [] // Empty until needed
        }
      ]
    }
  ]
}
              </pre>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-md border-t-4 border-purple-500">
              <h3 class="font-semibold text-lg mb-2">Content On Demand</h3>
              <p class="text-gray-700">
                Load detailed content (sections and paragraphs) only when a user navigates to a specific part.
              </p>
              <pre class="bg-gray-100 p-2 rounded mt-2 text-xs">
// Implementation in your main component
watch(() => store.currentItem, (newItem) => {
  if (newItem && newItem.type === 'part') {
    // Load sections when a part is selected
    fetchSectionsForPart(newItem.id);
  }
});

async function fetchSectionsForPart(partId) {
  const response = await fetch(
    \`/api/sections/\${partId}.json\`
  );
  const data = await response.json();
  store.updatePartChildren(partId, data.sections);
}
              </pre>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-md border-t-4 border-green-500">
              <h3 class="font-semibold text-lg mb-2">Metadata Separate from Structure</h3>
              <p class="text-gray-700">
                Keep metadata in separate files to allow independent updates and caching.
              </p>
              <pre class="bg-gray-100 p-2 rounded mt-2 text-xs">
// Example of how to use separate metadata URLs
&lt;ECFRNavigator 
  dataUrl="/api/structure.json"
  metadataUrl="/api/metadata.json"
  :options="navigatorOptions"
/&gt;
              </pre>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-md border-t-4 border-yellow-500">
              <h3 class="font-semibold text-lg mb-2">Caching Strategy</h3>
              <p class="text-gray-700">
                Implement appropriate caching for different types of data based on update frequency.
              </p>
              <pre class="bg-gray-100 p-2 rounded mt-2 text-xs">
// In your API service file
import { ref } from 'vue';

// Cache for structure data (longer TTL)
const structureCache = ref(new Map());

// Cache for content data (shorter TTL)
const contentCache = ref(new Map());

export async function fetchStructure() {
  if (structureCache.value.has('structure')) {
    return structureCache.value.get('structure');
  }
  
  const data = await fetch('/api/structure.json')
    .then(res => res.json());
    
  structureCache.value.set('structure', data);
  return data;
}
              </pre>
            </div>
          </div>
          
          <h2>Multiple URL Loading Pattern</h2>
          
          <p>
            For very large regulations, split your data across multiple files organized logically:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
// Main component setup
&lt;ECFRNavigator 
  :dataUrls="[
    '/api/titles-1-10.json',
    '/api/titles-11-20.json',
    '/api/titles-21-30.json',
    '/api/titles-31-50.json'
  ]"
  metadataUrl="/api/metadata.json"
  :options="navigatorOptions"
/&gt;
          </pre>
          
          <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 my-6">
            <h3 class="text-lg font-semibold text-yellow-800 mb-2">Performance Tip</h3>
            <p class="text-yellow-700">
              Consider implementing a service worker for offline caching of your regulation data.
              This can dramatically improve performance for returning users and enable offline access.
            </p>
            <pre class="bg-yellow-100 mt-2 p-2 rounded text-xs text-yellow-800">
// In your service worker registration
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('ecfr-data-v1').then((cache) => {
      return cache.addAll([
        '/api/structure.json',
        '/api/metadata.json',
        // Add other critical resources
      ]);
    })
  );
});
            </pre>
          </div>
        </div>
      </div>
    `})},a={render:()=>({template:`
      <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">State Management with Pinia</h1>
        
        <div class="prose prose-lg max-w-none">
          <p>
            The ECFRNavigator component uses Pinia for state management. Here's how to leverage the store
            in your application:
          </p>
          
          <h2>Accessing the Store</h2>
          
          <p>
            The ECFRNavigator component internally uses the <code>useECFRStore</code> to manage state.
            You can access the same store in your application components:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
import { ref, watch } from 'vue';
import { useECFRStore } from './stores/ecfr';

export default {
  setup() {
    const store = useECFRStore();
    const currentContent = ref('');
    
    // Watch for changes to the current item
    watch(() => store.currentItem, (newItem) => {
      if (newItem) {
        loadContent(newItem.id);
      }
    });
    
    // Function to load content for the selected item
    function loadContent(itemId) {
      // Your content loading logic here
    }
    
    return {
      store,
      currentContent
    };
  }
}
          </pre>
          
          <h2>Key Store Properties and Methods</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
            <div class="bg-white p-4 rounded-lg shadow-md">
              <h3 class="font-semibold text-lg mb-2">State Properties</h3>
              <ul class="text-sm space-y-2">
                <li>
                  <code>rootItems</code>
                  <p class="text-gray-600">The top-level items in the navigation</p>
                </li>
                <li>
                  <code>currentItem</code>
                  <p class="text-gray-600">The currently selected item</p>
                </li>
                <li>
                  <code>currentPath</code>
                  <p class="text-gray-600">Array of items from root to current item</p>
                </li>
                <li>
                  <code>expandedItems</code>
                  <p class="text-gray-600">Set of IDs for expanded items</p>
                </li>
                <li>
                  <code>itemMetadata</code>
                  <p class="text-gray-600">Object containing metadata for items</p>
                </li>
              </ul>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-md">
              <h3 class="font-semibold text-lg mb-2">Getters</h3>
              <ul class="text-sm space-y-2">
                <li>
                  <code>breadcrumbPath</code>
                  <p class="text-gray-600">Array of items for breadcrumb navigation</p>
                </li>
                <li>
                  <code>isItemExpanded(itemId)</code>
                  <p class="text-gray-600">Whether a specific item is expanded</p>
                </li>
                <li>
                  <code>getItemMetadata(itemId, type)</code>
                  <p class="text-gray-600">Get metadata for an item, optionally by type</p>
                </li>
                <li>
                  <code>currentItemMetadata(type)</code>
                  <p class="text-gray-600">Get metadata for the current item</p>
                </li>
              </ul>
            </div>
          </div>
          
          <h3>Actions for Interacting with the Store</h3>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
// Navigation actions
store.setRootItems(items);         // Set the root items for navigation
store.navigateTo(itemId);          // Navigate to a specific item by ID
store.expandItem(itemId);          // Expand a specific item
store.collapseItem(itemId);        // Collapse a specific item
store.expandAll();                 // Expand all items
store.collapseAll();               // Collapse all items

// Metadata actions
store.setItemMetadata(itemId, metadata, type); // Set metadata for an item
store.removeItemMetadata(itemId, type);        // Remove metadata from an item
store.registerMetadataProcessor(type, fn);     // Register a metadata processor
store.processItemMetadata(itemId, type);       // Process metadata for an item
          </pre>
          
          <h2>Custom Metadata Processors</h2>
          
          <p>
            One of the most powerful features is the ability to register custom metadata processors:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
// Register a processor for publication dates
store.registerMetadataProcessor('publishInfo', (metadata) => {
  if (metadata && metadata.publishInfo) {
    return {
      label: \`Updated: \${metadata.publishInfo.lastUpdated}\`,
      color: 'blue'
    };
  }
  return null;
});

// Register a processor for status indicators
store.registerMetadataProcessor('status', (metadata) => {
  if (metadata && metadata.status) {
    let color = 'gray';
    if (metadata.status === 'current') color = 'green';
    if (metadata.status === 'pending') color = 'yellow';
    if (metadata.status === 'deprecated') color = 'red';
    
    return {
      label: metadata.status.toUpperCase(),
      color
    };
  }
  return null;
});
          </pre>
          
          <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500 my-6">
            <h3 class="text-lg font-semibold text-purple-800 mb-2">Power User Tip</h3>
            <p class="text-purple-700">
              You can use the <code>useECFRNavigator</code> composable in components that don't have direct
              access to the ECFRNavigator component. This provides a consistent API for working with the
              navigation state throughout your application.
            </p>
            <pre class="bg-purple-100 mt-2 p-2 rounded text-xs text-purple-800">
import { useECFRNavigator } from './composables/useECFRNavigator';

export default {
  setup() {
    const navigator = useECFRNavigator();
    
    function jumpToSection(sectionId) {
      navigator.navigateTo(sectionId);
    }
    
    return {
      jumpToSection,
      currentPath: navigator.getCurrentPath()
    };
  }
}
            </pre>
          </div>
        </div>
      </div>
    `})},o={render:()=>({template:`
      <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Content Rendering Strategies</h1>
        
        <div class="prose prose-lg max-w-none">
          <p>
            Rendering regulation content effectively is a key part of a complete eCFR application.
            Here are some strategies for displaying content alongside the navigator:
          </p>
          
          <h2>Side-by-Side Layout</h2>
          
          <p>
            The most common pattern is a side-by-side layout with navigation on the left and content on the right:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
&lt;template&gt;
  &lt;div class="ecfr-viewer flex flex-col md:flex-row"&gt;
    &lt;!-- Navigation panel --&gt;
    &lt;div class="w-full md:w-[350px] md:mr-4"&gt;
      &lt;ECFRNavigator 
        :dataUrl="dataUrl"
        :options="navigatorOptions"
      /&gt;
    &lt;/div&gt;
    
    &lt;!-- Content panel --&gt;
    &lt;div class="flex-1"&gt;
      &lt;div v-if="isLoading" class="loading-state"&gt;
        Loading content...
      &lt;/div&gt;
      
      &lt;div v-else-if="currentContent" class="content-container"&gt;
        &lt;h2 class="text-xl font-semibold mb-4"&gt;{{ currentTitle }}&lt;/h2&gt;
        &lt;div class="prose max-w-none" v-html="currentContent"&gt;&lt;/div&gt;
      &lt;/div&gt;
      
      &lt;div v-else class="empty-state"&gt;
        Select an item to view its content
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
          </pre>
          
          <h2>Processing Content</h2>
          
          <p>
            Regulation content often needs processing before display:
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
            <div class="bg-white p-4 rounded-lg shadow-md border-t-4 border-indigo-500">
              <h3 class="font-semibold text-lg mb-2">Citation Links</h3>
              <p class="text-gray-700">
                Convert text references to other regulations into clickable links.
              </p>
              <pre class="bg-gray-100 p-2 rounded mt-2 text-xs">
function processCitationLinks(content) {
  // Convert section references to links
  return content.replace(
    /section (d+.d+)/gi, 
    (match, sectionNum) => {
      return \`&lt;a href="#" class="citation-link" 
        data-section="\${sectionNum}"&gt;\${match}&lt;/a&gt;\`;
    }
  );
}
              </pre>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-md border-t-4 border-pink-500">
              <h3 class="font-semibold text-lg mb-2">Term Highlighting</h3>
              <p class="text-gray-700">
                Highlight defined terms or search matches in the content.
              </p>
              <pre class="bg-gray-100 p-2 rounded mt-2 text-xs">
function highlightTerms(content, terms) {
  let processedContent = content;
  
  terms.forEach(term => {
    const regex = new RegExp(\`(\\\\b\${term}\\\\b)\`, 'gi');
    processedContent = processedContent.replace(
      regex,
      '&lt;mark class="highlighted-term"&gt;$1&lt;/mark&gt;'
    );
  });
  
  return processedContent;
}
              </pre>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-md border-t-4 border-amber-500">
              <h3 class="font-semibold text-lg mb-2">Annotations</h3>
              <p class="text-gray-700">
                Add interactive annotations to explain complex terms.
              </p>
              <pre class="bg-gray-100 p-2 rounded mt-2 text-xs">
function addAnnotations(content, annotations) {
  let processedContent = content;
  
  Object.entries(annotations).forEach(([term, explanation]) => {
    const regex = new RegExp(\`(\\\\b\${term}\\\\b)\`, 'gi');
    processedContent = processedContent.replace(
      regex,
      \`&lt;span class="annotated-term" 
        data-tooltip="\${explanation}"&gt;$1&lt;/span&gt;\`
    );
  });
  
  return processedContent;
}
              </pre>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-md border-t-4 border-emerald-500">
              <h3 class="font-semibold text-lg mb-2">Interactive Tables</h3>
              <p class="text-gray-700">
                Convert static tables to interactive, sortable versions.
              </p>
              <pre class="bg-gray-100 p-2 rounded mt-2 text-xs">
function processTablesInContent(content) {
  // First identify tables in the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  
  // Process each table
  tempDiv.querySelectorAll('table').forEach(table => {
    // Add sorting capabilities
    table.classList.add('interactive-table');
    
    // Add sort buttons to headers
    table.querySelectorAll('th').forEach(th => {
      const button = document.createElement('button');
      button.className = 'sort-button';
      button.innerHTML = '↕️';
      th.appendChild(button);
    });
  });
  
  return tempDiv.innerHTML;
}
              </pre>
            </div>
          </div>
          
          <h2>Implementing Click Handlers for Interactive Elements</h2>
          
          <p>
            You can add interactivity to your rendered content with event delegation:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
&lt;template&gt;
  &lt;div 
    ref="contentContainer" 
    class="content-container" 
    v-html="processedContent"
    @click="handleContentClick"
  &gt;&lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  setup() {
    // ...other setup code
    
    function handleContentClick(event) {
      // Handle citation links
      if (event.target.classList.contains('citation-link')) {
        event.preventDefault();
        const sectionId = event.target.dataset.section;
        navigateToSection(sectionId);
      }
      
      // Handle other interactive elements
      if (event.target.classList.contains('sort-button')) {
        sortTable(event.target);
      }
    }
    
    function navigateToSection(sectionId) {
      // Your navigation logic here
    }
    
    function sortTable(buttonElement) {
      // Your table sorting logic here
    }
    
    return {
      handleContentClick
    };
  }
}
&lt;/script&gt;
          </pre>
          
          <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500 my-6">
            <h3 class="text-lg font-semibold text-red-800 mb-2">Security Note</h3>
            <p class="text-red-700">
              When using <code>v-html</code> to render content, ensure you sanitize any user-generated or 
              external content to prevent XSS attacks. Consider using a library like DOMPurify to clean HTML.
            </p>
            <pre class="bg-red-100 mt-2 p-2 rounded text-xs text-red-800">
import DOMPurify from 'dompurify';

function renderSafeContent(content) {
  return DOMPurify.sanitize(content);
}

// In your component
const safeContent = computed(() => {
  return renderSafeContent(currentContent.value);
});
            </pre>
          </div>
        </div>
      </div>
    `})},s={render:()=>({template:`
      <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Responsive Design Patterns</h1>
        
        <div class="prose prose-lg max-w-none">
          <p>
            A complete eCFR application needs to work well on all devices. Here are some responsive
            design patterns to implement:
          </p>
          
          <h2>Mobile-First Layout</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
            <div class="bg-white p-4 rounded-lg shadow-md">
              <h3 class="font-semibold text-lg mb-2">Desktop Layout (Side-by-Side)</h3>
              <img src="https://via.placeholder.com/400x300" alt="Desktop layout mockup" class="rounded mb-2" />
              <pre class="bg-gray-100 p-2 rounded text-xs">
&lt;div class="flex flex-row"&gt;
  &lt;div class="w-[350px]"&gt;
    &lt;!-- Navigator --&gt;
  &lt;/div&gt;
  &lt;div class="flex-1"&gt;
    &lt;!-- Content --&gt;
  &lt;/div&gt;
&lt;/div&gt;
              </pre>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-md">
              <h3 class="font-semibold text-lg mb-2">Mobile Layout (Stacked)</h3>
              <img src="https://via.placeholder.com/300x400" alt="Mobile layout mockup" class="rounded mb-2" />
              <pre class="bg-gray-100 p-2 rounded text-xs">
&lt;div class="flex flex-col"&gt;
  &lt;div class="mb-4"&gt;
    &lt;!-- Navigator with toggle --&gt;
  &lt;/div&gt;
  &lt;div&gt;
    &lt;!-- Content --&gt;
  &lt;/div&gt;
&lt;/div&gt;
              </pre>
            </div>
          </div>
          
          <h2>Layout Switching with Media Queries</h2>
          
          <p>
            Using Tailwind CSS makes it easy to implement responsive layouts:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
&lt;div class="flex flex-col md:flex-row"&gt;
  &lt;!-- 
    This div will be full width on mobile (flex-col)
    and 350px wide on md breakpoint and up (flex-row)
  --&gt;
  &lt;div class="w-full md:w-[350px] md:mr-4 mb-4 md:mb-0"&gt;
    &lt;ECFRNavigator 
      :dataUrl="dataUrl"
      :options="navigatorOptions"
    /&gt;
  &lt;/div&gt;
  
  &lt;div class="flex-1"&gt;
    &lt;!-- Content area --&gt;
  &lt;/div&gt;
&lt;/div&gt;
          </pre>
          
          <h2>Mobile Navigation Toggle</h2>
          
          <p>
            On mobile devices, you often want to hide the navigation until needed:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
&lt;template&gt;
  &lt;div class="ecfr-mobile-view"&gt;
    &lt;!-- Mobile navigation toggle --&gt;
    &lt;div class="md:hidden p-4 bg-gray-100 flex justify-between items-center"&gt;
      &lt;h2 class="font-bold"&gt;eCFR Navigation&lt;/h2&gt;
      &lt;button 
        @click="toggleMobileNav" 
        class="bg-blue-500 text-white p-2 rounded"
      &gt;
        {{ showMobileNav ? 'Hide Menu' : 'Show Menu' }}
      &lt;/button&gt;
    &lt;/div&gt;
    
    &lt;!-- Navigation panel (hidden by default on mobile) --&gt;
    &lt;div 
      v-show="showMobileNav || !isMobile"
      class="navigator-container"
    &gt;
      &lt;ECFRNavigator 
        :dataUrl="dataUrl"
        :options="navigatorOptions"
      /&gt;
    &lt;/div&gt;
    
    &lt;!-- Content area --&gt;
    &lt;div v-show="!showMobileNav || !isMobile" class="content-container"&gt;
      &lt;!-- Content here --&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const showMobileNav = ref(false);
    const isMobile = ref(window.innerWidth < 768);
    
    function toggleMobileNav() {
      showMobileNav.value = !showMobileNav.value;
    }
    
    function checkMobile() {
      isMobile.value = window.innerWidth < 768;
    }
    
    onMounted(() => {
      window.addEventListener('resize', checkMobile);
    });
    
    onUnmounted(() => {
      window.removeEventListener('resize', checkMobile);
    });
    
    return {
      showMobileNav,
      isMobile,
      toggleMobileNav
    };
  }
}
&lt;/script&gt;
          </pre>
          
          <h2>Adaptive Font Sizing</h2>
          
          <p>
            The ECFRNavigator component includes adaptive font sizing. You can leverage this in your content area too:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
/* CSS for your content area */
.ecfr-content {
  font-size: clamp(0.875rem, 1vw + 0.5rem, 1.125rem);
  line-height: 1.6;
}

.ecfr-content h1 {
  font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem);
}

.ecfr-content h2 {
  font-size: clamp(1.25rem, 1.5vw + 0.875rem, 1.75rem);
}
          </pre>
          
          <div class="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500 my-6">
            <h3 class="text-lg font-semibold text-teal-800 mb-2">Accessibility Tip</h3>
            <p class="text-teal-700">
              When implementing responsive designs, ensure that touch targets are at least 44x44 pixels
              on mobile devices to accommodate users with motor impairments. Also, maintain sufficient
              color contrast for all text, especially when using colored backgrounds.
            </p>
          </div>
        </div>
      </div>
    `})},i={render:()=>({template:`
      <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Putting It All Together</h1>
        
        <div class="prose prose-lg max-w-none">
          <p>
            By following the patterns and strategies outlined in this guide, you can build a complete,
            efficient eCFR application that provides an excellent user experience across all devices.
          </p>
          
          <h2>Key Takeaways</h2>
          
          <ul>
            <li><strong>Component Architecture:</strong> Use modular components with clear responsibilities</li>
            <li><strong>State Management:</strong> Leverage the Pinia store for centralized state</li>
            <li><strong>URL Data Loading:</strong> Implement progressive loading for efficient handling of large datasets</li>
            <li><strong>Content Processing:</strong> Enhance content with interactive elements</li>
            <li><strong>Responsive Design:</strong> Ensure your application works well on all device sizes</li>
          </ul>
          
          <h2>Next Steps</h2>
          
          <p>
            To explore working examples of these patterns, check out the "Complete Page Layout" stories
            which demonstrate a fully-implemented eCFR application.
          </p>
          
          <div class="p-4 bg-gray-100 rounded-lg">
            <h3 class="font-semibold mb-2">Reference Implementation</h3>
            <p>
              See "eCFR/Examples/Complete Page Layout" in the Storybook navigation for a complete, 
              working example that demonstrates all the concepts covered in this guide.
            </p>
          </div>
          
          <p class="mt-8">
            Thank you for using the ECFRNavigator component. We hope this guide has been helpful in
            implementing a complete solution for your regulatory content application.
          </p>
        </div>
      </div>
    `})};var r,l,d;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Building a Complete eCFR Application</h1>
        
        <div class="prose prose-lg max-w-none">
          <p>
            The ECFRNavigator component is designed to be part of a larger application. This guide provides
            a comprehensive approach to building a complete application that showcases hierarchical navigation,
            content rendering, and state management.
          </p>
          
          <h2>The eCFR Application Architecture</h2>
          <p>
            A complete eCFR viewer application typically includes these main components:
          </p>
          
          <ul>
            <li><strong>Navigation Panel</strong> - Using the ECFRNavigator component</li>
            <li><strong>Content Panel</strong> - For displaying regulation text and metadata</li>
            <li><strong>Header & Controls</strong> - For search, filtering, and navigation aids</li>
            <li><strong>Metadata Display</strong> - For showing publication information</li>
          </ul>
          
          <p>
            Below you'll find detailed guides on implementing each part of this architecture,
            with sample code and best practices.
          </p>
          
          <div class="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 my-6">
            <h3 class="text-lg font-semibold text-blue-800 mb-2">Key Benefits of This Approach</h3>
            <ul class="list-disc pl-5 text-blue-700 space-y-1">
              <li>Clean separation of concerns with modular components</li>
              <li>Centralized state management with Pinia</li>
              <li>Efficient data loading from external URLs</li>
              <li>Responsive design that works across devices</li>
              <li>Extensible architecture for custom features</li>
            </ul>
          </div>
        </div>
      </div>
    \`
  })
}`,...(d=(l=t.parameters)==null?void 0:l.docs)==null?void 0:d.source}}};var c,p,g;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Application Structure</h1>
        
        <div class="prose prose-lg max-w-none">
          <p>
            Here's a recommended file structure for your eCFR application:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
src/
├── components/
│   ├── ECFRNavigator.vue          # The main navigator component
│   ├── ECFRBreadcrumb.vue         # Breadcrumb navigation
│   ├── ECFRSection.vue            # Individual section component
│   ├── ContentViewer.vue          # Component to display regulation content
│   ├── MetadataPanel.vue          # Component to display item metadata
│   └── ControlPanel.vue           # Search and filter controls
├── composables/
│   └── useECFRNavigator.js        # Helper composable for navigation
├── store/
│   └── ecfr.js                    # Pinia store for state management
├── views/
│   ├── ECFRViewerPage.vue         # Main application page
│   └── SettingsPage.vue           # Optional settings page
├── services/
│   └── ecfrApi.js                 # Service for fetching data
├── App.vue                        # Vue application root
└── main.js                        # Application entry point
          </pre>
          
          <h2 class="mt-6">Key Components</h2>
          
          <h3>ECFRViewerPage.vue</h3>
          <p>
            This is the main page that orchestrates all components:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm">
&lt;template&gt;
  &lt;div class="ecfr-viewer-page"&gt;
    &lt;header class="page-header"&gt;
      &lt;h1&gt;eCFR Viewer&lt;/h1&gt;
      &lt;ControlPanel /&gt;
    &lt;/header&gt;
    
    &lt;main class="page-content"&gt;
      &lt;div class="navigator-panel"&gt;
        &lt;ECFRNavigator 
          :dataUrl="dataUrl"
          :metadataUrl="metadataUrl"
          :options="navigatorOptions"
          @item-selected="handleItemSelected"
        /&gt;
      &lt;/div&gt;
      
      &lt;div class="content-panel"&gt;
        &lt;ContentViewer 
          :content="currentContent"
          :isLoading="isLoading"
        /&gt;
        
        &lt;MetadataPanel 
          :metadata="currentMetadata"
          v-if="currentMetadata"
        /&gt;
      &lt;/div&gt;
    &lt;/main&gt;
  &lt;/div&gt;
&lt;/template&gt;
          </pre>
          
          <h3>ContentViewer.vue</h3>
          <p>
            This component renders the actual regulation content:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm">
&lt;template&gt;
  &lt;div class="content-viewer"&gt;
    &lt;div v-if="isLoading" class="loading-indicator"&gt;
      Loading content...
    &lt;/div&gt;
    
    &lt;div v-else-if="content" class="content-container"&gt;
      &lt;h2 v-if="title" class="content-title"&gt;{{ title }}&lt;/h2&gt;
      &lt;div class="content-html" v-html="content"&gt;&lt;/div&gt;
    &lt;/div&gt;
    
    &lt;div v-else class="empty-state"&gt;
      Select an item to view its content
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
          </pre>
          
          <h3>MetadataPanel.vue</h3>
          <p>
            This component displays metadata for the selected item:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm">
&lt;template&gt;
  &lt;div v-if="metadata" class="metadata-panel"&gt;
    &lt;h3 class="panel-title"&gt;Document Information&lt;/h3&gt;
    
    &lt;div v-if="metadata.publishInfo" class="metadata-section"&gt;
      &lt;h4&gt;Publication Details&lt;/h4&gt;
      &lt;dl&gt;
        &lt;dt&gt;Last Updated&lt;/dt&gt;
        &lt;dd&gt;{{ formatDate(metadata.publishInfo.lastUpdated) }}&lt;/dd&gt;
        
        &lt;dt&gt;Effective Date&lt;/dt&gt;
        &lt;dd&gt;{{ formatDate(metadata.publishInfo.effectiveDate) }}&lt;/dd&gt;
      &lt;/dl&gt;
    &lt;/div&gt;
    
    &lt;!-- Additional metadata sections --&gt;
  &lt;/div&gt;
&lt;/template&gt;
          </pre>
          
          <div class="bg-green-50 p-4 rounded-lg border-l-4 border-green-500 my-6">
            <h3 class="text-lg font-semibold text-green-800 mb-2">Best Practice</h3>
            <p class="text-green-700">
              Separating your application into these modular components makes it easier to maintain,
              test, and extend. It also enables different teams to work on different parts of the
              application independently.
            </p>
          </div>
        </div>
      </div>
    \`
  })
}`,...(g=(p=e.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var m,u,h;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">URL Data Loading Strategy</h1>
        
        <div class="prose prose-lg max-w-none">
          <p>
            For efficient handling of large eCFR datasets, we recommend a strategic approach to URL data loading:
          </p>
          
          <h2>Progressive Loading Strategy</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
            <div class="bg-white p-4 rounded-lg shadow-md border-t-4 border-blue-500">
              <h3 class="font-semibold text-lg mb-2">Structure First</h3>
              <p class="text-gray-700">
                Load the basic structure (titles and parts) first for quick initial rendering.
                This provides the navigation framework without all the details.
              </p>
              <pre class="bg-gray-100 p-2 rounded mt-2 text-xs">
// structure.json
{
  "items": [
    {
      "id": "title-1",
      "type": "title",
      "number": "1",
      "title": "General Provisions",
      "children": [
        {
          "id": "part-1-1",
          "type": "part",
          "number": "1",
          "title": "Definitions",
          "children": [] // Empty until needed
        }
      ]
    }
  ]
}
              </pre>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-md border-t-4 border-purple-500">
              <h3 class="font-semibold text-lg mb-2">Content On Demand</h3>
              <p class="text-gray-700">
                Load detailed content (sections and paragraphs) only when a user navigates to a specific part.
              </p>
              <pre class="bg-gray-100 p-2 rounded mt-2 text-xs">
// Implementation in your main component
watch(() => store.currentItem, (newItem) => {
  if (newItem && newItem.type === 'part') {
    // Load sections when a part is selected
    fetchSectionsForPart(newItem.id);
  }
});

async function fetchSectionsForPart(partId) {
  const response = await fetch(
    \\\`/api/sections/\\\${partId}.json\\\`
  );
  const data = await response.json();
  store.updatePartChildren(partId, data.sections);
}
              </pre>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-md border-t-4 border-green-500">
              <h3 class="font-semibold text-lg mb-2">Metadata Separate from Structure</h3>
              <p class="text-gray-700">
                Keep metadata in separate files to allow independent updates and caching.
              </p>
              <pre class="bg-gray-100 p-2 rounded mt-2 text-xs">
// Example of how to use separate metadata URLs
&lt;ECFRNavigator 
  dataUrl="/api/structure.json"
  metadataUrl="/api/metadata.json"
  :options="navigatorOptions"
/&gt;
              </pre>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-md border-t-4 border-yellow-500">
              <h3 class="font-semibold text-lg mb-2">Caching Strategy</h3>
              <p class="text-gray-700">
                Implement appropriate caching for different types of data based on update frequency.
              </p>
              <pre class="bg-gray-100 p-2 rounded mt-2 text-xs">
// In your API service file
import { ref } from 'vue';

// Cache for structure data (longer TTL)
const structureCache = ref(new Map());

// Cache for content data (shorter TTL)
const contentCache = ref(new Map());

export async function fetchStructure() {
  if (structureCache.value.has('structure')) {
    return structureCache.value.get('structure');
  }
  
  const data = await fetch('/api/structure.json')
    .then(res => res.json());
    
  structureCache.value.set('structure', data);
  return data;
}
              </pre>
            </div>
          </div>
          
          <h2>Multiple URL Loading Pattern</h2>
          
          <p>
            For very large regulations, split your data across multiple files organized logically:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
// Main component setup
&lt;ECFRNavigator 
  :dataUrls="[
    '/api/titles-1-10.json',
    '/api/titles-11-20.json',
    '/api/titles-21-30.json',
    '/api/titles-31-50.json'
  ]"
  metadataUrl="/api/metadata.json"
  :options="navigatorOptions"
/&gt;
          </pre>
          
          <div class="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500 my-6">
            <h3 class="text-lg font-semibold text-yellow-800 mb-2">Performance Tip</h3>
            <p class="text-yellow-700">
              Consider implementing a service worker for offline caching of your regulation data.
              This can dramatically improve performance for returning users and enable offline access.
            </p>
            <pre class="bg-yellow-100 mt-2 p-2 rounded text-xs text-yellow-800">
// In your service worker registration
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('ecfr-data-v1').then((cache) => {
      return cache.addAll([
        '/api/structure.json',
        '/api/metadata.json',
        // Add other critical resources
      ]);
    })
  );
});
            </pre>
          </div>
        </div>
      </div>
    \`
  })
}`,...(h=(u=n.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var v,f,b;a.parameters={...a.parameters,docs:{...(v=a.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">State Management with Pinia</h1>
        
        <div class="prose prose-lg max-w-none">
          <p>
            The ECFRNavigator component uses Pinia for state management. Here's how to leverage the store
            in your application:
          </p>
          
          <h2>Accessing the Store</h2>
          
          <p>
            The ECFRNavigator component internally uses the <code>useECFRStore</code> to manage state.
            You can access the same store in your application components:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
import { ref, watch } from 'vue';
import { useECFRStore } from './stores/ecfr';

export default {
  setup() {
    const store = useECFRStore();
    const currentContent = ref('');
    
    // Watch for changes to the current item
    watch(() => store.currentItem, (newItem) => {
      if (newItem) {
        loadContent(newItem.id);
      }
    });
    
    // Function to load content for the selected item
    function loadContent(itemId) {
      // Your content loading logic here
    }
    
    return {
      store,
      currentContent
    };
  }
}
          </pre>
          
          <h2>Key Store Properties and Methods</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
            <div class="bg-white p-4 rounded-lg shadow-md">
              <h3 class="font-semibold text-lg mb-2">State Properties</h3>
              <ul class="text-sm space-y-2">
                <li>
                  <code>rootItems</code>
                  <p class="text-gray-600">The top-level items in the navigation</p>
                </li>
                <li>
                  <code>currentItem</code>
                  <p class="text-gray-600">The currently selected item</p>
                </li>
                <li>
                  <code>currentPath</code>
                  <p class="text-gray-600">Array of items from root to current item</p>
                </li>
                <li>
                  <code>expandedItems</code>
                  <p class="text-gray-600">Set of IDs for expanded items</p>
                </li>
                <li>
                  <code>itemMetadata</code>
                  <p class="text-gray-600">Object containing metadata for items</p>
                </li>
              </ul>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-md">
              <h3 class="font-semibold text-lg mb-2">Getters</h3>
              <ul class="text-sm space-y-2">
                <li>
                  <code>breadcrumbPath</code>
                  <p class="text-gray-600">Array of items for breadcrumb navigation</p>
                </li>
                <li>
                  <code>isItemExpanded(itemId)</code>
                  <p class="text-gray-600">Whether a specific item is expanded</p>
                </li>
                <li>
                  <code>getItemMetadata(itemId, type)</code>
                  <p class="text-gray-600">Get metadata for an item, optionally by type</p>
                </li>
                <li>
                  <code>currentItemMetadata(type)</code>
                  <p class="text-gray-600">Get metadata for the current item</p>
                </li>
              </ul>
            </div>
          </div>
          
          <h3>Actions for Interacting with the Store</h3>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
// Navigation actions
store.setRootItems(items);         // Set the root items for navigation
store.navigateTo(itemId);          // Navigate to a specific item by ID
store.expandItem(itemId);          // Expand a specific item
store.collapseItem(itemId);        // Collapse a specific item
store.expandAll();                 // Expand all items
store.collapseAll();               // Collapse all items

// Metadata actions
store.setItemMetadata(itemId, metadata, type); // Set metadata for an item
store.removeItemMetadata(itemId, type);        // Remove metadata from an item
store.registerMetadataProcessor(type, fn);     // Register a metadata processor
store.processItemMetadata(itemId, type);       // Process metadata for an item
          </pre>
          
          <h2>Custom Metadata Processors</h2>
          
          <p>
            One of the most powerful features is the ability to register custom metadata processors:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
// Register a processor for publication dates
store.registerMetadataProcessor('publishInfo', (metadata) => {
  if (metadata && metadata.publishInfo) {
    return {
      label: \\\`Updated: \\\${metadata.publishInfo.lastUpdated}\\\`,
      color: 'blue'
    };
  }
  return null;
});

// Register a processor for status indicators
store.registerMetadataProcessor('status', (metadata) => {
  if (metadata && metadata.status) {
    let color = 'gray';
    if (metadata.status === 'current') color = 'green';
    if (metadata.status === 'pending') color = 'yellow';
    if (metadata.status === 'deprecated') color = 'red';
    
    return {
      label: metadata.status.toUpperCase(),
      color
    };
  }
  return null;
});
          </pre>
          
          <div class="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500 my-6">
            <h3 class="text-lg font-semibold text-purple-800 mb-2">Power User Tip</h3>
            <p class="text-purple-700">
              You can use the <code>useECFRNavigator</code> composable in components that don't have direct
              access to the ECFRNavigator component. This provides a consistent API for working with the
              navigation state throughout your application.
            </p>
            <pre class="bg-purple-100 mt-2 p-2 rounded text-xs text-purple-800">
import { useECFRNavigator } from './composables/useECFRNavigator';

export default {
  setup() {
    const navigator = useECFRNavigator();
    
    function jumpToSection(sectionId) {
      navigator.navigateTo(sectionId);
    }
    
    return {
      jumpToSection,
      currentPath: navigator.getCurrentPath()
    };
  }
}
            </pre>
          </div>
        </div>
      </div>
    \`
  })
}`,...(b=(f=a.parameters)==null?void 0:f.docs)==null?void 0:b.source}}};var x,y,w;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Content Rendering Strategies</h1>
        
        <div class="prose prose-lg max-w-none">
          <p>
            Rendering regulation content effectively is a key part of a complete eCFR application.
            Here are some strategies for displaying content alongside the navigator:
          </p>
          
          <h2>Side-by-Side Layout</h2>
          
          <p>
            The most common pattern is a side-by-side layout with navigation on the left and content on the right:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
&lt;template&gt;
  &lt;div class="ecfr-viewer flex flex-col md:flex-row"&gt;
    &lt;!-- Navigation panel --&gt;
    &lt;div class="w-full md:w-[350px] md:mr-4"&gt;
      &lt;ECFRNavigator 
        :dataUrl="dataUrl"
        :options="navigatorOptions"
      /&gt;
    &lt;/div&gt;
    
    &lt;!-- Content panel --&gt;
    &lt;div class="flex-1"&gt;
      &lt;div v-if="isLoading" class="loading-state"&gt;
        Loading content...
      &lt;/div&gt;
      
      &lt;div v-else-if="currentContent" class="content-container"&gt;
        &lt;h2 class="text-xl font-semibold mb-4"&gt;{{ currentTitle }}&lt;/h2&gt;
        &lt;div class="prose max-w-none" v-html="currentContent"&gt;&lt;/div&gt;
      &lt;/div&gt;
      
      &lt;div v-else class="empty-state"&gt;
        Select an item to view its content
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
          </pre>
          
          <h2>Processing Content</h2>
          
          <p>
            Regulation content often needs processing before display:
          </p>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
            <div class="bg-white p-4 rounded-lg shadow-md border-t-4 border-indigo-500">
              <h3 class="font-semibold text-lg mb-2">Citation Links</h3>
              <p class="text-gray-700">
                Convert text references to other regulations into clickable links.
              </p>
              <pre class="bg-gray-100 p-2 rounded mt-2 text-xs">
function processCitationLinks(content) {
  // Convert section references to links
  return content.replace(
    /section (\\d+\\.\\d+)/gi, 
    (match, sectionNum) => {
      return \\\`&lt;a href="#" class="citation-link" 
        data-section="\\\${sectionNum}"&gt;\\\${match}&lt;/a&gt;\\\`;
    }
  );
}
              </pre>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-md border-t-4 border-pink-500">
              <h3 class="font-semibold text-lg mb-2">Term Highlighting</h3>
              <p class="text-gray-700">
                Highlight defined terms or search matches in the content.
              </p>
              <pre class="bg-gray-100 p-2 rounded mt-2 text-xs">
function highlightTerms(content, terms) {
  let processedContent = content;
  
  terms.forEach(term => {
    const regex = new RegExp(\\\`(\\\\\\\\b\\\${term}\\\\\\\\b)\\\`, 'gi');
    processedContent = processedContent.replace(
      regex,
      '&lt;mark class="highlighted-term"&gt;$1&lt;/mark&gt;'
    );
  });
  
  return processedContent;
}
              </pre>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-md border-t-4 border-amber-500">
              <h3 class="font-semibold text-lg mb-2">Annotations</h3>
              <p class="text-gray-700">
                Add interactive annotations to explain complex terms.
              </p>
              <pre class="bg-gray-100 p-2 rounded mt-2 text-xs">
function addAnnotations(content, annotations) {
  let processedContent = content;
  
  Object.entries(annotations).forEach(([term, explanation]) => {
    const regex = new RegExp(\\\`(\\\\\\\\b\\\${term}\\\\\\\\b)\\\`, 'gi');
    processedContent = processedContent.replace(
      regex,
      \\\`&lt;span class="annotated-term" 
        data-tooltip="\\\${explanation}"&gt;$1&lt;/span&gt;\\\`
    );
  });
  
  return processedContent;
}
              </pre>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-md border-t-4 border-emerald-500">
              <h3 class="font-semibold text-lg mb-2">Interactive Tables</h3>
              <p class="text-gray-700">
                Convert static tables to interactive, sortable versions.
              </p>
              <pre class="bg-gray-100 p-2 rounded mt-2 text-xs">
function processTablesInContent(content) {
  // First identify tables in the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = content;
  
  // Process each table
  tempDiv.querySelectorAll('table').forEach(table => {
    // Add sorting capabilities
    table.classList.add('interactive-table');
    
    // Add sort buttons to headers
    table.querySelectorAll('th').forEach(th => {
      const button = document.createElement('button');
      button.className = 'sort-button';
      button.innerHTML = '↕️';
      th.appendChild(button);
    });
  });
  
  return tempDiv.innerHTML;
}
              </pre>
            </div>
          </div>
          
          <h2>Implementing Click Handlers for Interactive Elements</h2>
          
          <p>
            You can add interactivity to your rendered content with event delegation:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
&lt;template&gt;
  &lt;div 
    ref="contentContainer" 
    class="content-container" 
    v-html="processedContent"
    @click="handleContentClick"
  &gt;&lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  setup() {
    // ...other setup code
    
    function handleContentClick(event) {
      // Handle citation links
      if (event.target.classList.contains('citation-link')) {
        event.preventDefault();
        const sectionId = event.target.dataset.section;
        navigateToSection(sectionId);
      }
      
      // Handle other interactive elements
      if (event.target.classList.contains('sort-button')) {
        sortTable(event.target);
      }
    }
    
    function navigateToSection(sectionId) {
      // Your navigation logic here
    }
    
    function sortTable(buttonElement) {
      // Your table sorting logic here
    }
    
    return {
      handleContentClick
    };
  }
}
&lt;/script&gt;
          </pre>
          
          <div class="bg-red-50 p-4 rounded-lg border-l-4 border-red-500 my-6">
            <h3 class="text-lg font-semibold text-red-800 mb-2">Security Note</h3>
            <p class="text-red-700">
              When using <code>v-html</code> to render content, ensure you sanitize any user-generated or 
              external content to prevent XSS attacks. Consider using a library like DOMPurify to clean HTML.
            </p>
            <pre class="bg-red-100 mt-2 p-2 rounded text-xs text-red-800">
import DOMPurify from 'dompurify';

function renderSafeContent(content) {
  return DOMPurify.sanitize(content);
}

// In your component
const safeContent = computed(() => {
  return renderSafeContent(currentContent.value);
});
            </pre>
          </div>
        </div>
      </div>
    \`
  })
}`,...(w=(y=o.parameters)==null?void 0:y.docs)==null?void 0:w.source}}};var C,I,M;s.parameters={...s.parameters,docs:{...(C=s.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Responsive Design Patterns</h1>
        
        <div class="prose prose-lg max-w-none">
          <p>
            A complete eCFR application needs to work well on all devices. Here are some responsive
            design patterns to implement:
          </p>
          
          <h2>Mobile-First Layout</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 mb-8">
            <div class="bg-white p-4 rounded-lg shadow-md">
              <h3 class="font-semibold text-lg mb-2">Desktop Layout (Side-by-Side)</h3>
              <img src="https://via.placeholder.com/400x300" alt="Desktop layout mockup" class="rounded mb-2" />
              <pre class="bg-gray-100 p-2 rounded text-xs">
&lt;div class="flex flex-row"&gt;
  &lt;div class="w-[350px]"&gt;
    &lt;!-- Navigator --&gt;
  &lt;/div&gt;
  &lt;div class="flex-1"&gt;
    &lt;!-- Content --&gt;
  &lt;/div&gt;
&lt;/div&gt;
              </pre>
            </div>
            
            <div class="bg-white p-4 rounded-lg shadow-md">
              <h3 class="font-semibold text-lg mb-2">Mobile Layout (Stacked)</h3>
              <img src="https://via.placeholder.com/300x400" alt="Mobile layout mockup" class="rounded mb-2" />
              <pre class="bg-gray-100 p-2 rounded text-xs">
&lt;div class="flex flex-col"&gt;
  &lt;div class="mb-4"&gt;
    &lt;!-- Navigator with toggle --&gt;
  &lt;/div&gt;
  &lt;div&gt;
    &lt;!-- Content --&gt;
  &lt;/div&gt;
&lt;/div&gt;
              </pre>
            </div>
          </div>
          
          <h2>Layout Switching with Media Queries</h2>
          
          <p>
            Using Tailwind CSS makes it easy to implement responsive layouts:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
&lt;div class="flex flex-col md:flex-row"&gt;
  &lt;!-- 
    This div will be full width on mobile (flex-col)
    and 350px wide on md breakpoint and up (flex-row)
  --&gt;
  &lt;div class="w-full md:w-[350px] md:mr-4 mb-4 md:mb-0"&gt;
    &lt;ECFRNavigator 
      :dataUrl="dataUrl"
      :options="navigatorOptions"
    /&gt;
  &lt;/div&gt;
  
  &lt;div class="flex-1"&gt;
    &lt;!-- Content area --&gt;
  &lt;/div&gt;
&lt;/div&gt;
          </pre>
          
          <h2>Mobile Navigation Toggle</h2>
          
          <p>
            On mobile devices, you often want to hide the navigation until needed:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
&lt;template&gt;
  &lt;div class="ecfr-mobile-view"&gt;
    &lt;!-- Mobile navigation toggle --&gt;
    &lt;div class="md:hidden p-4 bg-gray-100 flex justify-between items-center"&gt;
      &lt;h2 class="font-bold"&gt;eCFR Navigation&lt;/h2&gt;
      &lt;button 
        @click="toggleMobileNav" 
        class="bg-blue-500 text-white p-2 rounded"
      &gt;
        {{ showMobileNav ? 'Hide Menu' : 'Show Menu' }}
      &lt;/button&gt;
    &lt;/div&gt;
    
    &lt;!-- Navigation panel (hidden by default on mobile) --&gt;
    &lt;div 
      v-show="showMobileNav || !isMobile"
      class="navigator-container"
    &gt;
      &lt;ECFRNavigator 
        :dataUrl="dataUrl"
        :options="navigatorOptions"
      /&gt;
    &lt;/div&gt;
    
    &lt;!-- Content area --&gt;
    &lt;div v-show="!showMobileNav || !isMobile" class="content-container"&gt;
      &lt;!-- Content here --&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import { ref, onMounted, onUnmounted } from 'vue';

export default {
  setup() {
    const showMobileNav = ref(false);
    const isMobile = ref(window.innerWidth < 768);
    
    function toggleMobileNav() {
      showMobileNav.value = !showMobileNav.value;
    }
    
    function checkMobile() {
      isMobile.value = window.innerWidth < 768;
    }
    
    onMounted(() => {
      window.addEventListener('resize', checkMobile);
    });
    
    onUnmounted(() => {
      window.removeEventListener('resize', checkMobile);
    });
    
    return {
      showMobileNav,
      isMobile,
      toggleMobileNav
    };
  }
}
&lt;/script&gt;
          </pre>
          
          <h2>Adaptive Font Sizing</h2>
          
          <p>
            The ECFRNavigator component includes adaptive font sizing. You can leverage this in your content area too:
          </p>
          
          <pre class="bg-gray-100 p-4 rounded-lg text-sm mt-4">
/* CSS for your content area */
.ecfr-content {
  font-size: clamp(0.875rem, 1vw + 0.5rem, 1.125rem);
  line-height: 1.6;
}

.ecfr-content h1 {
  font-size: clamp(1.5rem, 2vw + 1rem, 2.25rem);
}

.ecfr-content h2 {
  font-size: clamp(1.25rem, 1.5vw + 0.875rem, 1.75rem);
}
          </pre>
          
          <div class="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500 my-6">
            <h3 class="text-lg font-semibold text-teal-800 mb-2">Accessibility Tip</h3>
            <p class="text-teal-700">
              When implementing responsive designs, ensure that touch targets are at least 44x44 pixels
              on mobile devices to accommodate users with motor impairments. Also, maintain sufficient
              color contrast for all text, especially when using colored backgrounds.
            </p>
          </div>
        </div>
      </div>
    \`
  })
}`,...(M=(I=s.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};var R,S,F;i.parameters={...i.parameters,docs:{...(R=i.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => ({
    template: \`
      <div class="p-6 max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold mb-6">Putting It All Together</h1>
        
        <div class="prose prose-lg max-w-none">
          <p>
            By following the patterns and strategies outlined in this guide, you can build a complete,
            efficient eCFR application that provides an excellent user experience across all devices.
          </p>
          
          <h2>Key Takeaways</h2>
          
          <ul>
            <li><strong>Component Architecture:</strong> Use modular components with clear responsibilities</li>
            <li><strong>State Management:</strong> Leverage the Pinia store for centralized state</li>
            <li><strong>URL Data Loading:</strong> Implement progressive loading for efficient handling of large datasets</li>
            <li><strong>Content Processing:</strong> Enhance content with interactive elements</li>
            <li><strong>Responsive Design:</strong> Ensure your application works well on all device sizes</li>
          </ul>
          
          <h2>Next Steps</h2>
          
          <p>
            To explore working examples of these patterns, check out the "Complete Page Layout" stories
            which demonstrate a fully-implemented eCFR application.
          </p>
          
          <div class="p-4 bg-gray-100 rounded-lg">
            <h3 class="font-semibold mb-2">Reference Implementation</h3>
            <p>
              See "eCFR/Examples/Complete Page Layout" in the Storybook navigation for a complete, 
              working example that demonstrates all the concepts covered in this guide.
            </p>
          </div>
          
          <p class="mt-8">
            Thank you for using the ECFRNavigator component. We hope this guide has been helpful in
            implementing a complete solution for your regulatory content application.
          </p>
        </div>
      </div>
    \`
  })
}`,...(F=(S=i.parameters)==null?void 0:S.docs)==null?void 0:F.source}}};const T=["Introduction","ApplicationStructure","URLDataLoading","StateManagement","ContentRendering","ResponsiveDesign","Conclusion"];export{e as ApplicationStructure,i as Conclusion,o as ContentRendering,t as Introduction,s as ResponsiveDesign,a as StateManagement,n as URLDataLoading,T as __namedExportsOrder,E as default};
