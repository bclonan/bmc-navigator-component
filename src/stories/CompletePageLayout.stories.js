import { ref, computed, watch } from 'vue';
import { useECFRStore } from '../stores/ecfr';
import ECFRNavigator from '../components/ECFRNavigator.vue';

export default {
  title: 'eCFR/Examples/Complete Page Layout',
  component: ECFRNavigator,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A complete page layout example showing how to implement the ECFRNavigator with content rendering in a side-by-side layout, leveraging the Pinia store for state management.'
      }
    }
  }
};

// Sample data structure for the demo
const sampleData = [
  {
    id: 'title-1',
    type: 'title',
    number: '1',
    title: 'General Provisions',
    children: [
      {
        id: 'part-1-1',
        type: 'part',
        number: '1',
        title: 'Definitions and General Requirements',
        children: [
          {
            id: 'section-1-1-1',
            type: 'section',
            number: '1.1',
            title: 'Purpose and Scope',
            content: '<p>This document establishes the framework for federal regulations and specifies the procedures for creating, amending, and rescinding federal rules.</p><p>All regulatory agencies must adhere to these provisions when engaging in rulemaking actions under their respective statutory authorities.</p>'
          },
          {
            id: 'section-1-1-2',
            type: 'section',
            number: '1.2',
            title: 'Definitions',
            content: '<p>For the purposes of this chapter, the following definitions apply:</p><ul><li><strong>Agency</strong>: Any department, independent establishment, commission, administration, authority, board, or bureau of the United States, including corporations owned or controlled by the United States.</li><li><strong>Rule</strong> or <strong>Regulation</strong>: Any agency statement of general or particular applicability and future effect designed to implement, interpret, or prescribe law or policy.</li><li><strong>Rulemaking</strong>: The agency process for formulating, amending, or repealing a rule.</li></ul>'
          }
        ]
      },
      {
        id: 'part-1-2',
        type: 'part',
        number: '2',
        title: 'Administrative Procedures',
        children: [
          {
            id: 'section-1-2-1',
            type: 'section',
            number: '2.1',
            title: 'Formal Rulemaking',
            content: '<p>When rules are required by statute to be made on the record after opportunity for an agency hearing, the following procedures apply:</p><ol><li>Notice of the proposed rulemaking shall be published in the Federal Register.</li><li>Interested parties shall be given an opportunity to participate in the rulemaking through submission of written data, views, or arguments.</li><li>The agency shall hold a public hearing where parties may present testimony and evidence.</li><li>The agency shall maintain a complete record of the proceedings.</li></ol>'
          },
          {
            id: 'section-1-2-2',
            type: 'section',
            number: '2.2',
            title: 'Informal Rulemaking',
            content: '<p>For rules not subject to formal rulemaking requirements, agencies shall:</p><ol><li>Publish a notice of proposed rulemaking in the Federal Register.</li><li>Provide interested persons an opportunity to participate in the rulemaking through submission of written data, views, or arguments.</li><li>Consider all relevant matter presented.</li><li>Incorporate in the rules adopted a concise general statement of their basis and purpose.</li></ol>'
          }
        ]
      }
    ]
  },
  {
    id: 'title-2',
    type: 'title',
    number: '2',
    title: 'Administrative Governance',
    children: [
      {
        id: 'part-2-1',
        type: 'part',
        number: '10',
        title: 'Agency Organization',
        children: [
          {
            id: 'section-2-1-1',
            type: 'section',
            number: '10.1',
            title: 'Organizational Structure',
            content: '<p>Each federal agency shall maintain and publish an organizational structure that:</p><ul><li>Clearly defines reporting relationships and chains of command.</li><li>Identifies key personnel and their responsibilities.</li><li>Outlines major functional areas and programs.</li></ul><p>This information must be updated annually and made available through the agency\'s official website.</p>'
          }
        ]
      }
    ]
  }
];

// Sample metadata for items
const sampleMetadata = {
  'title-1': {
    publishInfo: {
      lastUpdated: '2023-11-15',
      effectiveDate: '2023-12-01',
      federalRegisterDoc: 'FR-2023-15689'
    },
    sourceLinks: {
      xml: 'https://example.gov/regulations/title1.xml',
      pdf: 'https://example.gov/regulations/title1.pdf'
    },
    status: 'current'
  },
  'part-1-1': {
    publishInfo: {
      lastUpdated: '2023-10-20',
      effectiveDate: '2023-11-01',
      federalRegisterDoc: 'FR-2023-13456'
    },
    sourceLinks: {
      xml: 'https://example.gov/regulations/part1-1.xml',
      pdf: 'https://example.gov/regulations/part1-1.pdf'
    },
    status: 'current'
  },
  'section-1-1-1': {
    publishInfo: {
      lastUpdated: '2023-09-15',
      effectiveDate: '2023-10-01',
      federalRegisterDoc: 'FR-2023-12345'
    },
    sourceLinks: {
      xml: 'https://example.gov/regulations/section1-1-1.xml',
      pdf: 'https://example.gov/regulations/section1-1-1.pdf'
    },
    status: 'current',
    amendments: [
      { date: '2023-09-15', reference: 'FR-2023-12345', summary: 'Updated purpose statement for clarity' },
      { date: '2022-05-10', reference: 'FR-2022-54321', summary: 'Initial publication' }
    ]
  }
};

// Load-from-URL example demonstrating side-by-side navigation and content rendering
export const SideBySideLayout = {
  render: (args) => ({
    components: { ECFRNavigator },
    setup() {
      // Initialize local reactive state
      const store = useECFRStore();
      const currentContent = ref('');
      const currentTitle = ref('');
      const currentItemId = ref('');
      const currentItemType = ref('');
      const currentItemNumber = ref('');
      const currentItemMetadata = ref(null);
      const isContentLoading = ref(false);
      const windowWidth = ref(window.innerWidth);
      const isMobile = ref(window.innerWidth < 768);
      const showMobileNav = ref(false);
      
      // Register a metadata processor for rendering badges
      store.registerMetadataProcessor('publishInfo', (metadata) => {
        if (metadata && metadata.publishInfo) {
          return {
            label: `Updated: ${metadata.publishInfo.lastUpdated}`,
            color: 'blue'
          };
        }
        return null;
      });
      
      // Register a metadata processor for status badges
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
      
      // Set up window resize handler
      const handleResize = () => {
        windowWidth.value = window.innerWidth;
        isMobile.value = window.innerWidth < 768;
      };
      
      // Updated section references or citation links
      const renderCitationLinks = (content) => {
        if (!content) return '';
        
        // Replace section references with links
        // This is a simple example - more complex regex could be used for real citations
        return content.replace(/section (\d+\.\d+)/gi, (match, sectionNum) => {
          return `<a href="#" class="text-blue-600 hover:underline">section ${sectionNum}</a>`;
        });
      };
      
      // Content loading function (simulates loading content from a URL)
      const loadContent = (itemId) => {
        isContentLoading.value = true;
        
        // In a real app, this would fetch from an API
        setTimeout(() => {
          const findItem = (items, id) => {
            for (const item of items) {
              if (item.id === id) return item;
              if (item.children && item.children.length) {
                const found = findItem(item.children, id);
                if (found) return found;
              }
            }
            return null;
          };
          
          const item = findItem(sampleData, itemId);
          
          if (item) {
            currentTitle.value = item.title;
            currentItemId.value = item.id;
            currentItemType.value = item.type;
            currentItemNumber.value = item.number;
            currentContent.value = item.content || '';
            
            // Get metadata from store
            const metadata = store.getItemMetadata(itemId);
            currentItemMetadata.value = metadata;
          } else {
            currentTitle.value = 'Not Found';
            currentContent.value = '<p>The requested content could not be found.</p>';
            currentItemMetadata.value = null;
          }
          
          isContentLoading.value = false;
          showMobileNav.value = false; // Hide mobile nav after selection
        }, 500);
      };
      
      // Watch for changes to the current item in the store
      watch(() => store.currentItem, (newItem) => {
        if (newItem && newItem.id) {
          loadContent(newItem.id);
        }
      });
      
      // Computed properties for responsive layout
      const navWidth = computed(() => {
        return isMobile.value ? '100%' : '350px';
      });
      
      const contentWidth = computed(() => {
        return isMobile.value ? '100%' : 'calc(100% - 350px)';
      });
      
      const layoutClass = computed(() => {
        return isMobile.value ? 'flex-col' : 'flex-row';
      });
      
      // Format date function
      const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        });
      };
      
      return {
        store,
        currentContent,
        currentTitle,
        currentItemId,
        currentItemType,
        currentItemNumber,
        currentItemMetadata,
        isContentLoading,
        isMobile,
        showMobileNav,
        navWidth,
        contentWidth,
        layoutClass,
        formatDate,
        renderCitationLinks,
        
        toggleMobileNav() {
          showMobileNav.value = !showMobileNav.value;
        },
        handleItemSelected(event) {
          loadContent(event.item.id);
        }
      };
    },
    template: `
      <div class="ecfr-page min-h-screen bg-gray-100">
        <!-- Header -->
        <header class="bg-blue-700 text-white p-4 shadow-md">
          <div class="container mx-auto flex justify-between items-center">
            <div class="flex items-center space-x-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <h1 class="text-xl font-bold">eCFR Navigator Demo</h1>
            </div>

            <!-- Mobile menu button -->
            <button 
              v-if="isMobile" 
              class="p-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-white"
              @click="toggleMobileNav"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path v-if="!showMobileNav" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </header>

        <!-- Main content area -->
        <main class="container mx-auto p-4">
          <div class="flex" :class="layoutClass">
            <!-- Navigation panel -->
            <div 
              v-show="!isMobile || showMobileNav"
              :style="{ width: navWidth }"
              class="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 mb-4 md:mb-0 md:mr-4"
            >
              <div class="border-b p-3 bg-gray-50">
                <h2 class="text-lg font-semibold text-gray-700">Document Navigator</h2>
                <p class="text-sm text-gray-500">Browse the regulation structure</p>
              </div>
              
              <div :style="{ height: isMobile ? '75vh' : 'calc(100vh - 200px)' }">
                <ECFRNavigator 
                  :items="sampleData"
                  :itemMetadata="sampleMetadata"
                  :options="{
                    showBreadcrumb: true,
                    theme: 'light',
                    display: {
                      viewMode: 'compact',
                      showDescription: true,
                      showMetadataBadges: true,
                      fontScaling: {
                        enabled: true,
                        baseSize: 'medium',
                        scaleWithWidth: true,
                        responsive: true
                      }
                    }
                  }"
                  @item-selected="handleItemSelected"
                />
              </div>
            </div>

            <!-- Content panel -->
            <div 
              v-show="!isMobile || !showMobileNav"
              :style="{ width: contentWidth }"
              class="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300"
            >
              <!-- Content header -->
              <div class="border-b p-4 bg-gray-50">
                <div v-if="isContentLoading" class="animate-pulse">
                  <div class="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div class="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div v-else>
                  <h2 class="text-xl font-semibold text-gray-800 mb-1">
                    <span v-if="currentItemNumber">{{ currentItemNumber}} - </span>{{ currentTitle }}
                  </h2>
                  <div class="text-sm text-gray-500 flex items-center space-x-2">
                    <span v-if="currentItemType" class="capitalize">{{ currentItemType }}</span>
                    <span v-if="currentItemMetadata && currentItemMetadata.publishInfo" class="text-blue-600">
                      • Updated: {{ formatDate(currentItemMetadata.publishInfo.lastUpdated) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Content body -->
              <div class="p-5" :style="{ height: 'calc(100vh - 280px)', overflowY: 'auto' }">
                <div v-if="isContentLoading" class="animate-pulse">
                  <div class="h-4 bg-gray-200 rounded w-full mb-3"></div>
                  <div class="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
                  <div class="h-4 bg-gray-200 rounded w-4/6 mb-6"></div>
                  <div class="h-4 bg-gray-200 rounded w-full mb-3"></div>
                  <div class="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
                </div>
                
                <div v-else-if="currentContent" class="prose max-w-none" v-html="renderCitationLinks(currentContent)"></div>
                
                <div v-else class="text-center py-10 text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto mb-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p class="text-lg font-medium">Select a document to view</p>
                  <p class="text-sm mt-1">Choose an item from the navigator to display its content</p>
                </div>

                <!-- Metadata section -->
                <div v-if="currentItemMetadata && !isContentLoading" class="mt-8 pt-4 border-t border-gray-200">
                  <h3 class="text-lg font-medium text-gray-700 mb-3">Document Information</h3>
                  
                  <div class="bg-gray-50 rounded-lg p-4">
                    <!-- Publication information -->
                    <div v-if="currentItemMetadata.publishInfo" class="mb-4">
                      <h4 class="text-sm font-semibold text-gray-600 mb-2">Publication Details</h4>
                      <dl class="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div class="sm:col-span-1">
                          <dt class="text-gray-500">Last Updated</dt>
                          <dd class="font-medium">{{ formatDate(currentItemMetadata.publishInfo.lastUpdated) }}</dd>
                        </div>
                        <div class="sm:col-span-1">
                          <dt class="text-gray-500">Effective Date</dt>
                          <dd class="font-medium">{{ formatDate(currentItemMetadata.publishInfo.effectiveDate) }}</dd>
                        </div>
                        <div class="sm:col-span-2">
                          <dt class="text-gray-500">Federal Register Document</dt>
                          <dd class="font-medium text-blue-600 hover:underline cursor-pointer">
                            {{ currentItemMetadata.publishInfo.federalRegisterDoc }}
                          </dd>
                        </div>
                      </dl>
                    </div>
                    
                    <!-- Source links -->
                    <div v-if="currentItemMetadata.sourceLinks" class="mb-4">
                      <h4 class="text-sm font-semibold text-gray-600 mb-2">Source Documents</h4>
                      <div class="flex flex-wrap gap-2">
                        <a
                          v-for="(url, format) in currentItemMetadata.sourceLinks"
                          :key="format"
                          href="#"
                          class="inline-flex items-center px-3 py-1 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          {{ format.toUpperCase() }}
                        </a>
                      </div>
                    </div>
                    
                    <!-- Amendment history -->
                    <div v-if="currentItemMetadata.amendments && currentItemMetadata.amendments.length > 0" class="mb-4">
                      <h4 class="text-sm font-semibold text-gray-600 mb-2">Amendment History</h4>
                      <div class="overflow-hidden shadow-sm rounded-lg border border-gray-200">
                        <table class="min-w-full divide-y divide-gray-200">
                          <thead class="bg-gray-100">
                            <tr>
                              <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference</th>
                              <th scope="col" class="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Summary</th>
                            </tr>
                          </thead>
                          <tbody class="bg-white divide-y divide-gray-200 text-sm">
                            <tr v-for="(amendment, index) in currentItemMetadata.amendments" :key="index">
                              <td class="px-4 py-2 whitespace-nowrap">{{ formatDate(amendment.date) }}</td>
                              <td class="px-4 py-2 whitespace-nowrap text-blue-600">{{ amendment.reference }}</td>
                              <td class="px-4 py-2">{{ amendment.summary }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Footer with options -->
              <div class="border-t p-3 bg-gray-50 flex justify-between items-center">
                <div class="flex space-x-2">
                  <button class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    Print
                  </button>
                  <button class="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share
                  </button>
                </div>
                <div>
                  <span v-if="currentItemMetadata && currentItemMetadata.status" 
                    :class="{
                      'bg-green-100 text-green-800': currentItemMetadata.status === 'current',
                      'bg-yellow-100 text-yellow-800': currentItemMetadata.status === 'pending',
                      'bg-red-100 text-red-800': currentItemMetadata.status === 'deprecated',
                      'bg-gray-100 text-gray-800': !['current', 'pending', 'deprecated'].includes(currentItemMetadata.status)
                    }"
                    class="px-2 py-1 rounded-full text-xs font-medium"
                  >
                    {{ currentItemMetadata.status.toUpperCase() }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    `,
    data() {
      return {
        sampleData,
        sampleMetadata
      };
    },
    mounted() {
      window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
    }
  })
};

// Example showing how to implement URL loading with side-by-side layout
export const URLLoadingImplementation = {
  render: () => ({
    components: { ECFRNavigator },
    template: `
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">URL Loading with Side-by-Side Layout</h2>
        
        <div class="mb-6 prose max-w-none">
          <p>This example demonstrates how to implement URL data loading with a side-by-side layout in your Vue application.</p>
          
          <h3 class="text-lg font-semibold mt-4 mb-2">Implementation Steps:</h3>
          <ol>
            <li>Set up your application layout with responsive containers</li>
            <li>Initialize the ECFRNavigator with URL data sources</li>
            <li>Use the Pinia store to access selected items and metadata</li>
            <li>Render content in a separate panel alongside the navigator</li>
          </ol>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 class="text-lg font-semibold mb-3">Sample Vue Component</h3>
          <pre class="bg-gray-100 p-3 rounded text-sm overflow-auto">
import { ref, computed, watch } from 'vue';
import { useECFRStore } from './stores/ecfr';
import ECFRNavigator from './components/ECFRNavigator.vue';

export default {
  components: { ECFRNavigator },
  setup() {
    const store = useECFRStore();
    const currentContent = ref('');
    const currentTitle = ref('');
    const currentItemMetadata = ref(null);
    const isLoading = ref(false);
    
    // Watch for changes to the current item in the store
    watch(() => store.currentItem, (newItem) => {
      if (newItem && newItem.id) {
        loadContent(newItem.id);
      }
    });
    
    // Content loading function
    const loadContent = (itemId) => {
      isLoading.value = true;
      
      // Fetch content from your API endpoint
      fetch(\`/api/content/\${itemId}\`)
        .then(response => response.json())
        .then(data => {
          currentTitle.value = data.title;
          currentContent.value = data.content;
          
          // Get metadata from the store
          currentItemMetadata.value = store.getItemMetadata(itemId);
          isLoading.value = false;
        })
        .catch(error => {
          console.error('Error loading content:', error);
          isLoading.value = false;
        });
    };
    
    return {
      store,
      currentContent,
      currentTitle,
      currentItemMetadata,
      isLoading
    };
  }
}
          </pre>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 class="text-lg font-semibold mb-3">Sample Template</h3>
          <pre class="bg-gray-100 p-3 rounded text-sm overflow-auto">
&lt;template&gt;
  &lt;div class="flex flex-col md:flex-row"&gt;
    &lt;!-- Navigator panel --&gt;
    &lt;div class="w-full md:w-[350px] md:mr-4 bg-white rounded shadow"&gt;
      &lt;ECFRNavigator 
        dataUrl="/api/regulation-data.json"
        metadataUrl="/api/metadata.json"
        :options="{
          showBreadcrumb: true,
          theme: 'light',
          display: {
            viewMode: 'compact',
            showMetadataBadges: true
          }
        }"
      /&gt;
    &lt;/div&gt;
    
    &lt;!-- Content panel --&gt;
    &lt;div class="flex-1 bg-white rounded shadow p-4"&gt;
      &lt;h2 v-if="currentTitle" class="text-xl font-semibold mb-4"&gt;
        {{ currentTitle }}
      &lt;/h2&gt;
      
      &lt;div v-if="isLoading" class="animate-pulse"&gt;
        &lt;div class="h-4 bg-gray-200 rounded w-full mb-3"&gt;&lt;/div&gt;
        &lt;div class="h-4 bg-gray-200 rounded w-5/6 mb-3"&gt;&lt;/div&gt;
        &lt;div class="h-4 bg-gray-200 rounded w-4/6 mb-3"&gt;&lt;/div&gt;
      &lt;/div&gt;
      
      &lt;div v-else-if="currentContent" class="prose" v-html="currentContent"&gt;&lt;/div&gt;
      
      &lt;div v-else class="text-center py-10 text-gray-500"&gt;
        Select an item to view its content
      &lt;/div&gt;
      
      &lt;!-- Metadata display --&gt;
      &lt;div v-if="currentItemMetadata" class="mt-6 pt-4 border-t"&gt;
        &lt;h3 class="font-medium mb-2"&gt;Document Information&lt;/h3&gt;
        &lt;pre&gt;{{ JSON.stringify(currentItemMetadata, null, 2) }}&lt;/pre&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
          </pre>
        </div>
        
        <div class="bg-purple-50 border-l-4 border-purple-500 p-4 mb-6">
          <h3 class="text-lg font-semibold text-purple-800 mb-1">Key Benefits of This Approach</h3>
          <ul class="list-disc pl-5 text-purple-700 space-y-1">
            <li>Clean separation of navigation and content display</li>
            <li>Efficient loading of large documents from external URLs</li>
            <li>Centralized state management via Pinia store</li>
            <li>Responsive design that works on mobile and desktop</li>
            <li>Progressive loading of content as users navigate</li>
          </ul>
        </div>
      </div>
    `
  })
};

// Demonstrating advanced metadata usage and processing
export const AdvancedMetadataUsage = {
  render: () => ({
    components: { ECFRNavigator },
    setup() {
      // Initialize store for demonstrations
      const store = useECFRStore();
      
      // Register metadata processors for the demo
      store.registerMetadataProcessor('publishInfo', (metadata) => {
        if (metadata && metadata.publishInfo) {
          return {
            label: `Updated: ${metadata.publishInfo.lastUpdated}`,
            color: 'blue'
          };
        }
        return null;
      });
      
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
      
      return {
        store,
        sampleMetadata
      };
    },
    template: `
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">Advanced Metadata Usage and Processing</h2>
        
        <div class="mb-6 prose max-w-none">
          <p>This example demonstrates how to work with metadata in the ECFRNavigator component and process it for display using the Pinia store.</p>
        </div>
        
        <div class="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 class="text-lg font-semibold mb-3">Registering Metadata Processors</h3>
          <p class="mb-3 text-sm text-gray-600">Metadata processors allow you to transform raw metadata into visual indicators or formatted data.</p>
          
          <pre class="bg-gray-100 p-3 rounded text-sm overflow-auto">
import { useECFRStore } from './stores/ecfr';

export default {
  setup() {
    const store = useECFRStore();
    
    // Register a processor for publication info
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
  }
}
          </pre>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-3">Accessing Metadata in Components</h3>
            <pre class="bg-gray-100 p-3 rounded text-sm overflow-auto">
// Get metadata for a specific item
const metadata = store.getItemMetadata('section-1-1-1');

// Get metadata for the currently selected item
const currentMetadata = store.currentItemMetadata;

// Process metadata with registered processors
const processedData = store.processItemMetadata('section-1-1-1');

// Add metadata to an item
store.setItemMetadata('section-1-1-1', {
  status: 'current',
  publishInfo: {
    lastUpdated: '2023-11-15'
  }
});

// Remove metadata from an item
store.removeItemMetadata('section-1-1-1', 'status');
            </pre>
          </div>
          
          <div class="bg-gray-50 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-3">Example Metadata Structure</h3>
            <pre class="bg-gray-100 p-3 rounded text-sm overflow-auto">
{
  "section-1-1-1": {
    "publishInfo": {
      "lastUpdated": "2023-09-15",
      "effectiveDate": "2023-10-01",
      "federalRegisterDoc": "FR-2023-12345"
    },
    "sourceLinks": {
      "xml": "https://example.gov/section1-1-1.xml",
      "pdf": "https://example.gov/section1-1-1.pdf"
    },
    "status": "current",
    "amendments": [
      { 
        "date": "2023-09-15", 
        "reference": "FR-2023-12345", 
        "summary": "Updated purpose statement" 
      }
    ]
  }
}
            </pre>
          </div>
        </div>
        
        <div class="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
          <h3 class="text-lg font-semibold text-blue-800 mb-1">Best Practices for Metadata</h3>
          <ul class="list-disc pl-5 text-blue-700 space-y-1">
            <li>Use consistent metadata structures across your application</li>
            <li>Load metadata from separate URL for better caching and update strategies</li>
            <li>Register processors early in your application lifecycle</li>
            <li>Consider lazy-loading detailed metadata only when an item is selected</li>
            <li>Use the processed metadata results for consistent display across components</li>
          </ul>
        </div>
      </div>
    `
  })
};