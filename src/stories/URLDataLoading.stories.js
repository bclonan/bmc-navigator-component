import ECFRNavigator from '../components/ECFRNavigator.vue';

export default {
  title: 'eCFR/Features/URL Data Loading',
  component: ECFRNavigator,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Demonstration of loading data from URLs for more efficient handling of large JSON documents.'
      }
    }
  }
};

// Simple sample data
const sampleItems = [
  {
    id: 'local-item-1',
    type: 'title',
    number: '1',
    title: 'Local Data Example',
    children: [
      {
        id: 'local-part-1',
        type: 'part',
        number: '100',
        title: 'This data is provided directly through props',
        children: []
      }
    ]
  }
];

// Basic example that doesn't actually load from URL (for documentation)
export const BasicUsage = {
  render: () => ({
    components: { ECFRNavigator },
    template: `
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">URL Data Loading</h2>
        
        <div class="mb-6 prose max-w-none">
          <p>The ECFRNavigator component now supports loading data from URLs, which is particularly useful for large JSON documents that would be inefficient to include directly in your application bundle.</p>
          
          <h3 class="text-lg font-semibold mt-4 mb-2">Key Features:</h3>
          <ul>
            <li><strong>Single URL Loading:</strong> Load a complete dataset from a single URL</li>
            <li><strong>Multiple URL Loading:</strong> Load and merge data from multiple URLs</li>
            <li><strong>Metadata URL:</strong> Load item metadata separately from a dedicated URL</li>
            <li><strong>Error Handling:</strong> Graceful error display with fallback to direct props</li>
            <li><strong>Loading Indicators:</strong> Visual feedback during data fetching</li>
          </ul>
          
          <h3 class="text-lg font-semibold mt-4 mb-2">Example Usage:</h3>
          <pre class="bg-gray-100 p-3 rounded text-sm overflow-auto">
&lt;ECFRNavigator 
  dataUrl="/api/ecfr-data.json"
  metadataUrl="/api/ecfr-metadata.json"
  :options="{ showBreadcrumb: true }"
/&gt;
          </pre>
          
          <p class="mt-4">Or with multiple data sources:</p>
          
          <pre class="bg-gray-100 p-3 rounded text-sm overflow-auto">
&lt;ECFRNavigator 
  :dataUrls="[
    '/api/titles-1-5.json',
    '/api/titles-6-10.json',
    '/api/titles-11-15.json'
  ]"
  :options="{ /* your options */ }"
/&gt;
          </pre>
        </div>
        
        <!-- Example component without real URL loading -->
        <div class="border border-gray-300 rounded mb-4 p-4 bg-gray-50">
          <div class="font-medium mb-2">Example with Direct Props (For Demonstration)</div>
          <p class="text-sm text-gray-600 mb-4">The example below uses direct props instead of URL loading, as Storybook doesn't have a backend to serve JSON files.</p>
          
          <div class="h-64 border border-gray-300 rounded">
            <ECFRNavigator 
              :items="items"
              :options="{ 
                showBreadcrumb: true,
                theme: 'light',
                display: {
                  viewMode: 'standard'
                }
              }"
            />
          </div>
        </div>
        
        <!-- Mock implementation details -->
        <div class="border border-gray-300 rounded mb-4 p-4 bg-gray-50">
          <div class="font-medium mb-2">Implementation Details</div>
          <p class="text-sm text-gray-600 mb-4">When loading from URLs, the component:</p>
          
          <ol class="list-decimal text-sm pl-5 space-y-2">
            <li>Shows a loading indicator during fetch operations</li>
            <li>Handles HTTP errors and displays user-friendly messages</li>
            <li>Merges data from multiple sources if needed</li>
            <li>Falls back to direct props if URL loading fails</li>
            <li>Supports progressive loading of large datasets</li>
          </ol>
        </div>
      </div>
    `,
    data() {
      return {
        items: sampleItems
      };
    }
  })
};

// Simulated URL loading with delayed response
export const SimulatedURLLoading = {
  render: () => ({
    components: { ECFRNavigator },
    template: `
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">Simulated URL Loading</h2>
        <p class="mb-4">This example simulates loading data from a URL with a delay to demonstrate the loading indicator.</p>
        
        <div class="mb-4 flex gap-4">
          <button 
            @click="simulateLoading" 
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            :disabled="isLoading"
          >
            Simulate URL Loading
          </button>
          
          <button 
            @click="simulateError" 
            class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            :disabled="isLoading"
          >
            Simulate Loading Error
          </button>
        </div>
        
        <div class="bg-gray-50 p-4 mb-4 text-sm border-l-4 border-blue-500 rounded">
          <p>Click one of the buttons above to see the loading state in action.</p>
          <p class="text-gray-500 mt-1">In a real application, loading would happen automatically when the component mounts.</p>
        </div>
        
        <div class="h-[400px] border border-gray-300 rounded">
          <ECFRNavigator 
            :items="hasError ? [] : items"
            :options="options"
            :dataUrl="simulatedUrl"
          />
        </div>
      </div>
    `,
    data() {
      return {
        items: [],
        simulatedUrl: null,
        isLoading: false,
        hasError: false,
        options: { 
          showBreadcrumb: true,
          theme: 'light',
          display: {
            viewMode: 'standard'
          }
        },
        sampleData: [
          {
            id: 'simulated-item-1',
            type: 'title',
            number: '1',
            title: 'Simulated URL Data',
            children: [
              {
                id: 'simulated-part-1',
                type: 'part',
                number: '100',
                title: 'This data was loaded from a simulated URL',
                children: [
                  {
                    id: 'simulated-section-1',
                    type: 'section',
                    number: '100.1',
                    title: 'First section from URL',
                    children: []
                  },
                  {
                    id: 'simulated-section-2',
                    type: 'section',
                    number: '100.2',
                    title: 'Second section from URL',
                    children: []
                  }
                ]
              },
              {
                id: 'simulated-part-2',
                type: 'part',
                number: '200',
                title: 'Another part from the URL',
                children: []
              }
            ]
          }
        ]
      };
    },
    methods: {
      simulateLoading() {
        // Reset state
        this.items = [];
        this.hasError = false;
        this.isLoading = true;
        
        // Set a fake URL to trigger the loading state
        this.simulatedUrl = 'https://example.com/fake-data-url.json';
        
        // After 2 seconds, "load" the data
        setTimeout(() => {
          this.isLoading = false;
          // In a real component, this data would come from the URL
          this.items = this.sampleData;
          // Clear the URL so we use the items directly
          this.simulatedUrl = null;
        }, 2000);
      },
      
      simulateError() {
        // Reset state
        this.items = [];
        this.hasError = true;
        this.isLoading = true;
        
        // Set a fake URL to trigger the loading state
        this.simulatedUrl = 'https://example.com/nonexistent-file.json';
        
        // After 2 seconds, simulate an error
        setTimeout(() => {
          this.isLoading = false;
          // Clear the URL so we use the items directly but keep hasError true
          this.simulatedUrl = null;
        }, 2000);
      }
    }
  })
};

// Multiple URL loading example
export const MultipleURLs = {
  render: () => ({
    components: { ECFRNavigator },
    template: `
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">Loading from Multiple URLs</h2>
        <p class="mb-4">For very large datasets, you can split your data across multiple files and load them all.</p>
        
        <div class="bg-gray-50 p-4 mb-4 border rounded">
          <h3 class="font-medium mb-2">Common Use Cases:</h3>
          <ul class="text-sm list-disc pl-5">
            <li>Breaking up large regulatory data by title or section</li>
            <li>Loading core structure first, then details on demand</li>
            <li>Splitting data by publication date or category</li>
            <li>Implementing progressive loading for faster initial display</li>
          </ul>
        </div>
        
        <div class="mb-4">
          <pre class="bg-gray-100 p-3 rounded text-sm overflow-auto">
// Example Vue template
&lt;ECFRNavigator 
  :dataUrls="[
    '/api/ecfr/titles.json',
    '/api/ecfr/parts.json', 
    '/api/ecfr/sections.json'
  ]"
/&gt;

// Example JavaScript
const urls = [
  '/api/ecfr/title-1.json',
  '/api/ecfr/title-2.json',
  '/api/ecfr/title-3.json',
];

&lt;ECFRNavigator :dataUrls="urls" /&gt;
          </pre>
        </div>
        
        <div class="p-4 bg-yellow-50 border-l-4 border-yellow-400 text-sm mb-4">
          <p><strong>Note:</strong> Multiple URL loading works by merging the results. Each URL should return:</p>
          <ul class="list-disc pl-4 mt-1">
            <li>Either an array of items that will be merged at the root level</li>
            <li>Or an object with an "items" property containing an array</li>
          </ul>
        </div>
      </div>
    `
  })
};

// Metadata loading
export const MetadataLoading = {
  render: () => ({
    components: { ECFRNavigator },
    template: `
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">Metadata Loading from URL</h2>
        <p class="mb-4">You can also load metadata from a separate URL to enhance your items with additional information.</p>
        
        <div class="bg-gray-50 p-4 mb-4 border rounded">
          <h3 class="font-medium mb-2">Metadata Structure:</h3>
          <pre class="bg-gray-100 p-3 rounded text-sm overflow-auto">
// Example metadata JSON structure
{
  "item-id-1": {
    "xmlLink": { "url": "https://example.com/xml/file1.xml" },
    "lastUpdated": "2023-06-15",
    "status": "active"
  },
  "item-id-2": {
    "xmlLink": { "url": "https://example.com/xml/file2.xml" },
    "lastUpdated": "2023-05-20",
    "status": "deprecated"
  }
}
          </pre>
        </div>
        
        <div class="mb-4">
          <p class="font-medium mb-2">Usage Example:</p>
          <pre class="bg-gray-100 p-3 rounded text-sm overflow-auto">
&lt;ECFRNavigator 
  dataUrl="/api/ecfr/structure.json"
  metadataUrl="/api/ecfr/metadata.json"
  :options="{
    showMetadataBadges: true,
    display: {
      showMetadataBadges: true
    }
  }"
/&gt;
          </pre>
        </div>
        
        <div class="p-4 bg-blue-50 border-l-4 border-blue-400 text-sm">
          <p><strong>Benefit:</strong> Separating metadata from structural data allows:</p>
          <ul class="list-disc pl-4 mt-1">
            <li>More efficient updates when only metadata changes</li>
            <li>Smaller initial payload for faster loading</li>
            <li>Dynamic metadata updates without reloading structure</li>
            <li>Specialized caching strategies for different data types</li>
          </ul>
        </div>
      </div>
    `
  })
};

// Performance considerations
export const PerformanceConsiderations = {
  render: () => ({
    components: { ECFRNavigator },
    template: `
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">Performance Best Practices</h2>
        <p class="mb-4">When working with large JSON documents, consider these strategies for optimal performance:</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="bg-white p-4 rounded shadow border-t-4 border-blue-500">
            <h3 class="font-medium mb-2">Data Splitting Strategies</h3>
            <ul class="text-sm space-y-2">
              <li><strong>Hierarchical Splitting:</strong> Split by title, then by part, then by section</li>
              <li><strong>On-Demand Loading:</strong> Load deeper levels only when a parent is expanded</li>
              <li><strong>Pagination:</strong> Break large collections into smaller, manageable chunks</li>
              <li><strong>Date-Based Slicing:</strong> Separate current and historical versions</li>
            </ul>
          </div>
          
          <div class="bg-white p-4 rounded shadow border-t-4 border-green-500">
            <h3 class="font-medium mb-2">Network Optimization</h3>
            <ul class="text-sm space-y-2">
              <li><strong>Compression:</strong> Ensure your server uses gzip/brotli for JSON responses</li>
              <li><strong>CDN Caching:</strong> Set appropriate cache headers for static JSON files</li>
              <li><strong>Lazy Loading:</strong> Implement progressive loading patterns</li>
              <li><strong>HTTP/2:</strong> Use multiplexing for parallel requests</li>
            </ul>
          </div>
          
          <div class="bg-white p-4 rounded shadow border-t-4 border-purple-500">
            <h3 class="font-medium mb-2">Client-Side Caching</h3>
            <ul class="text-sm space-y-2">
              <li><strong>LocalStorage:</strong> Cache frequently used but rarely changing data</li>
              <li><strong>Service Workers:</strong> Implement offline-first strategies</li>
              <li><strong>ETags:</strong> Use HTTP caching mechanisms for conditional requests</li>
              <li><strong>Memory Caching:</strong> Cache parsed JSON in application memory</li>
            </ul>
          </div>
          
          <div class="bg-white p-4 rounded shadow border-t-4 border-yellow-500">
            <h3 class="font-medium mb-2">Data Minimization</h3>
            <ul class="text-sm space-y-2">
              <li><strong>Trimming:</strong> Only include necessary fields for each item</li>
              <li><strong>Normalization:</strong> Avoid duplicate data in your JSON structure</li>
              <li><strong>Compression:</strong> Consider custom compression for specialized data</li>
              <li><strong>Server Filtering:</strong> Filter data server-side before transmission</li>
            </ul>
          </div>
        </div>
        
        <div class="bg-gray-100 p-4 rounded text-sm">
          <h3 class="font-medium mb-2">Implementation Recommendations:</h3>
          <ol class="list-decimal pl-5 space-y-2">
            <li>Load essential structure first (titles, parts) for quick initial rendering</li>
            <li>Then load detailed content (sections, paragraphs) asynchronously</li>
            <li>Use the browser's cache for repeated visits</li>
            <li>Consider implementing a custom caching layer for frequently accessed data</li>
            <li>Monitor network performance and adjust your strategy based on real-world usage</li>
          </ol>
        </div>
      </div>
    `
  })
};