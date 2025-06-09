import { ref, reactive, computed, watch } from 'vue';
import ECFRNavigator from '../../components/ECFRNavigator.vue';
import ECFRSection from '../../components/ECFRSection.vue';
import ECFRBreadcrumb from '../../components/ECFRBreadcrumb.vue';
import MCard from '../../components/ui/MCard.vue';
import MButton from '../../components/ui/MButton.vue';
import MTextField from '../../components/ui/MTextField.vue';
import MSelect from '../../components/ui/MSelect.vue';
import MLayout from '../../components/ui/MLayout.vue';

export default {
  title: 'Demo/ECFR Navigator Advanced',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Advanced ECFR Navigator demonstrations showcasing complex navigation patterns, real-world integration scenarios, and advanced configuration options.'
      }
    }
  }
};

// Legal Document Management System
export const LegalDocumentManagement = {
  render: () => ({
    components: { 
      ECFRNavigator, MCard, MButton, MTextField, MSelect, MLayout 
    },
    setup() {
      const selectedDocument = ref(null);
      const searchQuery = ref('');
      const filterCategory = ref('all');
      const annotationsEnabled = ref(true);
      const complianceMode = ref(true);
      
      // Simulate legal document hierarchy
      const legalDocuments = ref([
        {
          id: 'cfr-title-12',
          type: 'title',
          number: '12',
          title: 'Banks and Banking',
          description: 'Federal regulations governing banking institutions',
          children: [
            {
              id: 'cfr-12-chapter-1',
              type: 'chapter',
              number: '1',
              title: 'Office of the Comptroller of the Currency',
              children: [
                {
                  id: 'cfr-12-1-1',
                  type: 'part',
                  number: '1',
                  title: 'Investment Company Activities',
                  content: 'Detailed regulations on investment company activities...',
                  metadata: {
                    lastUpdated: '2024-01-15',
                    authority: 'OCC',
                    compliance: 'mandatory'
                  },
                  children: [
                    {
                      id: 'cfr-12-1-1-1',
                      type: 'section',
                      number: '1.1',
                      title: 'Authority and Purpose',
                      content: 'This part establishes the authority and purpose of investment company regulations...'
                    },
                    {
                      id: 'cfr-12-1-1-2',
                      type: 'section',
                      number: '1.2',
                      title: 'Definitions',
                      content: 'For purposes of this part, the following definitions apply...'
                    }
                  ]
                },
                {
                  id: 'cfr-12-1-5',
                  type: 'part',
                  number: '5',
                  title: 'Rules, Policies, and Procedures for Corporate Activities',
                  content: 'Comprehensive rules governing corporate activities...',
                  metadata: {
                    lastUpdated: '2024-02-01',
                    authority: 'OCC',
                    compliance: 'mandatory'
                  }
                }
              ]
            },
            {
              id: 'cfr-12-chapter-2',
              type: 'chapter',
              number: '2',
              title: 'Federal Reserve System',
              children: [
                {
                  id: 'cfr-12-2-200',
                  type: 'part',
                  number: '200',
                  title: 'Regulation H - Membership of State Banking Institutions',
                  content: 'Regulations governing state bank membership in the Federal Reserve System...'
                }
              ]
            }
          ]
        },
        {
          id: 'cfr-title-17',
          type: 'title',
          number: '17',
          title: 'Commodity and Securities Exchanges',
          description: 'Securities and commodities regulations',
          children: [
            {
              id: 'cfr-17-chapter-2',
              type: 'chapter',
              number: '2',
              title: 'Securities and Exchange Commission',
              children: [
                {
                  id: 'cfr-17-2-240',
                  type: 'part',
                  number: '240',
                  title: 'General Rules and Regulations, Securities Exchange Act of 1934',
                  content: 'Comprehensive rules under the Securities Exchange Act...'
                }
              ]
            }
          ]
        }
      ]);

      const navigatorOptions = reactive({
        showBreadcrumb: true,
        theme: 'light',
        showControls: true,
        display: {
          viewMode: 'detailed',
          showDescription: true,
          showMetadataBadges: true,
          animations: true,
          enhancedMobile: true
        },
        search: {
          enabled: true,
          placeholder: 'Search regulations...',
          fuzzySearch: {
            enabled: true,
            threshold: 0.3
          }
        }
      });

      const handleDocumentSelected = (item) => {
        selectedDocument.value = item;
      };

      const documentAnalysis = computed(() => {
        if (!selectedDocument.value) return null;
        
        return {
          wordCount: Math.floor(Math.random() * 5000) + 1000,
          readingTime: Math.floor(Math.random() * 20) + 5,
          complexity: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
          complianceRisk: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
          lastReview: new Date().toLocaleDateString()
        };
      });

      return {
        legalDocuments,
        selectedDocument,
        searchQuery,
        filterCategory,
        annotationsEnabled,
        complianceMode,
        navigatorOptions,
        handleDocumentSelected,
        documentAnalysis
      };
    },
    template: `
      <MLayout app-title="Legal Document Management System" :drawer="true" permanent>
        <template #drawer>
          <div class="p-4 space-y-4">
            <h3 class="text-lg font-semibold">Document Navigator</h3>
            
            <!-- Search and Filters -->
            <div class="space-y-3">
              <MTextField
                v-model="searchQuery"
                label="Search Documents"
                placeholder="Search regulations, titles, sections..."
                prepend-icon="fas fa-search"
                clearable
              />
              
              <MSelect
                v-model="filterCategory"
                label="Filter by Category"
                :options="[
                  { value: 'all', label: 'All Documents' },
                  { value: 'banking', label: 'Banking & Finance' },
                  { value: 'securities', label: 'Securities' },
                  { value: 'compliance', label: 'Compliance' }
                ]"
              />
            </div>

            <!-- ECFR Navigator -->
            <div class="border rounded-lg bg-white overflow-hidden">
              <ECFRNavigator
                :items="legalDocuments"
                :options="navigatorOptions"
                @item-selected="handleDocumentSelected"
                class="max-h-96 overflow-y-auto"
              />
            </div>

            <!-- Quick Actions -->
            <div class="space-y-2">
              <h4 class="text-sm font-medium text-gray-700">Quick Actions</h4>
              <div class="grid grid-cols-1 gap-2">
                <MButton
                  text="Export Selected"
                  variant="outlined"
                  size="small"
                  prepend-icon="fas fa-download"
                  :disabled="!selectedDocument"
                />
                <MButton
                  text="Add Bookmark"
                  variant="outlined"
                  size="small"
                  prepend-icon="fas fa-bookmark"
                  :disabled="!selectedDocument"
                />
                <MButton
                  text="Share Document"
                  variant="outlined"
                  size="small"
                  prepend-icon="fas fa-share"
                  :disabled="!selectedDocument"
                />
              </div>
            </div>
          </div>
        </template>

        <!-- Main Content -->
        <div class="space-y-6">
          <div class="flex justify-between items-center">
            <div>
              <h1 class="text-3xl font-bold text-gray-900">Legal Document Viewer</h1>
              <p class="text-gray-600">Navigate and analyze federal regulations</p>
            </div>
            
            <div class="flex items-center space-x-2">
              <MButton
                text="Compliance Mode"
                :variant="complianceMode ? 'filled' : 'outlined'"
                size="small"
                @click="complianceMode = !complianceMode"
              />
              <MButton
                text="Annotations"
                :variant="annotationsEnabled ? 'filled' : 'outlined'"
                size="small"
                @click="annotationsEnabled = !annotationsEnabled"
              />
            </div>
          </div>

          <!-- Document Viewer -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Document Content -->
            <div class="lg:col-span-2">
              <MCard v-if="selectedDocument" title="Document Content" class="h-full">
                <!-- Document Header -->
                <div class="border-b pb-4 mb-4">
                  <div class="flex items-start justify-between">
                    <div>
                      <h2 class="text-xl font-semibold text-gray-900">
                        {{ selectedDocument.number }} {{ selectedDocument.title }}
                      </h2>
                      <p v-if="selectedDocument.description" class="text-gray-600 mt-1">
                        {{ selectedDocument.description }}
                      </p>
                    </div>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {{ selectedDocument.type }}
                    </span>
                  </div>
                </div>

                <!-- Document Text -->
                <div class="prose max-w-none">
                  <div v-if="selectedDocument.content" class="text-gray-800 leading-relaxed">
                    {{ selectedDocument.content }}
                  </div>
                  <div v-else class="text-gray-500 italic">
                    Select a specific section to view content
                  </div>
                </div>

                <!-- Annotations (if enabled) -->
                <div v-if="annotationsEnabled && selectedDocument.content" class="mt-6 pt-6 border-t">
                  <h4 class="text-sm font-medium text-gray-900 mb-3">Annotations</h4>
                  <div class="space-y-2">
                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-3">
                      <p class="text-sm text-yellow-800">
                        <strong>Note:</strong> This regulation was updated on {{ new Date().toLocaleDateString() }}
                      </p>
                    </div>
                    <div class="bg-blue-50 border-l-4 border-blue-400 p-3">
                      <p class="text-sm text-blue-800">
                        <strong>Cross-reference:</strong> See related provisions in Title 15, Section 240.3a-4
                      </p>
                    </div>
                  </div>
                </div>
              </MCard>

              <MCard v-else title="Document Viewer" class="h-full">
                <div class="flex items-center justify-center h-64 text-gray-500">
                  <div class="text-center">
                    <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 class="mt-2 text-sm font-medium text-gray-900">No document selected</h3>
                    <p class="mt-1 text-sm text-gray-500">Choose a document from the navigator to view content</p>
                  </div>
                </div>
              </MCard>
            </div>

            <!-- Document Analysis -->
            <div class="space-y-6">
              <!-- Document Info -->
              <MCard v-if="selectedDocument" title="Document Information">
                <div class="space-y-3">
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Document Type</dt>
                    <dd class="mt-1 text-sm text-gray-900 capitalize">{{ selectedDocument.type }}</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Document Number</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ selectedDocument.number }}</dd>
                  </div>
                  <div v-if="selectedDocument.metadata">
                    <dt class="text-sm font-medium text-gray-500">Last Updated</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ selectedDocument.metadata.lastUpdated }}</dd>
                  </div>
                  <div v-if="selectedDocument.metadata">
                    <dt class="text-sm font-medium text-gray-500">Authority</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ selectedDocument.metadata.authority }}</dd>
                  </div>
                </div>
              </MCard>

              <!-- Document Analysis -->
              <MCard v-if="documentAnalysis" title="Document Analysis">
                <div class="space-y-3">
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Word Count</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ documentAnalysis.wordCount.toLocaleString() }} words</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Reading Time</dt>
                    <dd class="mt-1 text-sm text-gray-900">{{ documentAnalysis.readingTime }} minutes</dd>
                  </div>
                  <div>
                    <dt class="text-sm font-medium text-gray-500">Complexity</dt>
                    <dd class="mt-1">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            :class="{
                              'bg-green-100 text-green-800': documentAnalysis.complexity === 'Low',
                              'bg-yellow-100 text-yellow-800': documentAnalysis.complexity === 'Medium',
                              'bg-red-100 text-red-800': documentAnalysis.complexity === 'High'
                            }">
                        {{ documentAnalysis.complexity }}
                      </span>
                    </dd>
                  </div>
                  <div v-if="complianceMode">
                    <dt class="text-sm font-medium text-gray-500">Compliance Risk</dt>
                    <dd class="mt-1">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                            :class="{
                              'bg-green-100 text-green-800': documentAnalysis.complianceRisk === 'Low',
                              'bg-yellow-100 text-yellow-800': documentAnalysis.complianceRisk === 'Medium',
                              'bg-red-100 text-red-800': documentAnalysis.complianceRisk === 'High'
                            }">
                        {{ documentAnalysis.complianceRisk }}
                      </span>
                    </dd>
                  </div>
                </div>
              </MCard>

              <!-- Recent Activity -->
              <MCard title="Recent Activity">
                <div class="space-y-3">
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <div class="h-2 w-2 bg-blue-500 rounded-full"></div>
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm text-gray-900">Document viewed</p>
                      <p class="text-xs text-gray-500">2 minutes ago</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <div class="h-2 w-2 bg-green-500 rounded-full"></div>
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm text-gray-900">Annotation added</p>
                      <p class="text-xs text-gray-500">1 hour ago</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="flex-shrink-0">
                      <div class="h-2 w-2 bg-yellow-500 rounded-full"></div>
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="text-sm text-gray-900">Document updated</p>
                      <p class="text-xs text-gray-500">3 days ago</p>
                    </div>
                  </div>
                </div>
              </MCard>
            </div>
          </div>
        </div>
      </MLayout>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Complete legal document management system demonstrating ECFR Navigator in a real-world application with document analysis, annotations, and compliance features.'
      }
    }
  }
};

// Mobile-Optimized Navigator
export const MobileOptimizedNavigation = {
  render: () => ({
    components: { 
      ECFRNavigator, MCard, MButton, MTextField, MSelect 
    },
    setup() {
      const isMobile = ref(window.innerWidth < 768);
      const searchVisible = ref(false);
      const filterVisible = ref(false);
      
      // Mobile-optimized data structure
      const mobileData = ref([
        {
          id: 'banking',
          type: 'category',
          title: 'Banking Regulations',
          icon: '🏦',
          summary: '1,234 regulations',
          children: [
            {
              id: 'personal-loans',
              type: 'subcategory',
              title: 'Personal Loans',
              icon: '💰',
              summary: '156 rules',
              children: [
                {
                  id: 'rate-limits',
                  type: 'regulation',
                  title: 'Interest Rate Limits',
                  summary: 'Maximum allowable rates',
                  urgent: true
                },
                {
                  id: 'disclosure-req',
                  type: 'regulation',
                  title: 'Disclosure Requirements',
                  summary: 'Mandatory disclosures'
                }
              ]
            },
            {
              id: 'commercial-loans',
              type: 'subcategory',
              title: 'Commercial Loans',
              icon: '🏢',
              summary: '89 rules'
            }
          ]
        },
        {
          id: 'securities',
          type: 'category',
          title: 'Securities',
          icon: '📈',
          summary: '892 regulations'
        }
      ]);

      const mobileOptions = reactive({
        showBreadcrumb: true,
        theme: 'light',
        showControls: false, // Simplified for mobile
        display: {
          viewMode: 'compact',
          showDescription: false,
          showMetadataBadges: true,
          animations: true,
          enhancedMobile: true,
          fontScaling: {
            enabled: true,
            baseSize: 16,
            scaleRatio: 1.2
          }
        },
        search: {
          enabled: true,
          placeholder: 'Search...',
          mobileOptimized: true
        }
      });

      // Responsive handling
      const handleResize = () => {
        isMobile.value = window.innerWidth < 768;
      };

      return {
        mobileData,
        mobileOptions,
        isMobile,
        searchVisible,
        filterVisible,
        handleResize
      };
    },
    mounted() {
      window.addEventListener('resize', this.handleResize);
    },
    beforeUnmount() {
      window.removeEventListener('resize', this.handleResize);
    },
    template: `
      <div class="h-screen bg-gray-50">
        <!-- Mobile Header -->
        <div class="bg-white border-b border-gray-200 px-4 py-3">
          <div class="flex items-center justify-between">
            <h1 class="text-lg font-semibold text-gray-900">Regulations</h1>
            <div class="flex items-center space-x-2">
              <MButton
                icon="fas fa-search"
                variant="text"
                size="small"
                @click="searchVisible = !searchVisible"
              />
              <MButton
                icon="fas fa-filter"
                variant="text"
                size="small"
                @click="filterVisible = !filterVisible"
              />
            </div>
          </div>
          
          <!-- Mobile Search -->
          <div v-if="searchVisible" class="mt-3">
            <MTextField
              placeholder="Search regulations..."
              prepend-icon="fas fa-search"
              clearable
              class="w-full"
            />
          </div>
          
          <!-- Mobile Filters -->
          <div v-if="filterVisible" class="mt-3 space-y-2">
            <MSelect
              label="Category"
              :options="[
                { value: 'all', label: 'All Categories' },
                { value: 'banking', label: 'Banking' },
                { value: 'securities', label: 'Securities' }
              ]"
              class="w-full"
            />
          </div>
        </div>

        <!-- Mobile Navigator -->
        <div class="flex-1 overflow-hidden">
          <ECFRNavigator
            :items="mobileData"
            :options="mobileOptions"
            class="h-full"
          />
        </div>

        <!-- Mobile Action Bar -->
        <div class="bg-white border-t border-gray-200 px-4 py-3">
          <div class="flex justify-around">
            <MButton
              text="Bookmarks"
              icon="fas fa-bookmark"
              variant="text"
              size="small"
            />
            <MButton
              text="Recent"
              icon="fas fa-clock"
              variant="text"
              size="small"
            />
            <MButton
              text="Download"
              icon="fas fa-download"
              variant="text"
              size="small"
            />
          </div>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Mobile-optimized ECFR Navigator with touch-friendly controls, simplified interface, and responsive design patterns.'
      }
    },
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};

// Performance Testing with Large Dataset
export const PerformanceStressTest = {
  render: () => ({
    components: { 
      ECFRNavigator, MCard, MButton, MSelect 
    },
    setup() {
      const itemCount = ref(1000);
      const virtualScrolling = ref(true);
      const lazyLoading = ref(true);
      const performanceMetrics = ref({});
      
      // Generate large dataset
      const generateLargeDataset = (count) => {
        const startTime = performance.now();
        
        const items = [];
        for (let i = 0; i < count; i++) {
          const item = {
            id: `item-${i}`,
            type: i % 4 === 0 ? 'title' : i % 4 === 1 ? 'chapter' : i % 4 === 2 ? 'part' : 'section',
            number: `${Math.floor(i / 100)}.${i % 100}`,
            title: `Generated Item ${i}: ${['Banking Regulation', 'Securities Rule', 'Compliance Standard', 'Legal Provision'][i % 4]}`,
            description: `Auto-generated description for item ${i} with additional context and details.`,
            content: `This is the content for item ${i}. `.repeat(Math.floor(Math.random() * 10) + 1),
            children: i % 10 === 0 ? generateChildren(i, 3) : undefined
          };
          items.push(item);
        }
        
        const endTime = performance.now();
        performanceMetrics.value.generationTime = endTime - startTime;
        performanceMetrics.value.itemCount = count;
        
        return items;
      };
      
      const generateChildren = (parentId, count) => {
        const children = [];
        for (let j = 0; j < count; j++) {
          children.push({
            id: `${parentId}-child-${j}`,
            type: 'subsection',
            number: `${parentId}.${j}`,
            title: `Child Item ${j} of ${parentId}`,
            content: `Child content for ${parentId}-${j}`
          });
        }
        return children;
      };

      const largeDataset = ref(generateLargeDataset(itemCount.value));

      const performanceOptions = reactive({
        showBreadcrumb: true,
        theme: 'light',
        showControls: true,
        display: {
          viewMode: 'compact',
          showDescription: false,
          showMetadataBadges: false,
          animations: false, // Disabled for performance
          enhancedMobile: false,
          virtualScrolling: virtualScrolling.value,
          lazyLoading: lazyLoading.value,
          itemsPerPage: 50
        },
        search: {
          enabled: true,
          debounceTime: 300,
          fuzzySearch: {
            enabled: false // Disabled for performance
          }
        }
      });

      const regenerateDataset = () => {
        const startTime = performance.now();
        largeDataset.value = generateLargeDataset(itemCount.value);
        const endTime = performance.now();
        
        performanceMetrics.value.regenerationTime = endTime - startTime;
      };

      const measureRenderTime = () => {
        const startTime = performance.now();
        
        // Force re-render
        performanceOptions.display.viewMode = performanceOptions.display.viewMode === 'compact' ? 'standard' : 'compact';
        
        requestAnimationFrame(() => {
          const endTime = performance.now();
          performanceMetrics.value.renderTime = endTime - startTime;
        });
      };

      watch(virtualScrolling, (newValue) => {
        performanceOptions.display.virtualScrolling = newValue;
      });

      watch(lazyLoading, (newValue) => {
        performanceOptions.display.lazyLoading = newValue;
      });

      return {
        largeDataset,
        performanceOptions,
        itemCount,
        virtualScrolling,
        lazyLoading,
        performanceMetrics,
        regenerateDataset,
        measureRenderTime
      };
    },
    template: `
      <div class="space-y-6 p-6">
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">Performance Stress Test</h1>
          <p class="text-gray-600">Testing ECFR Navigator with large datasets and performance optimizations</p>
        </div>

        <!-- Performance Controls -->
        <MCard title="Performance Configuration" subtitle="Adjust settings to test performance impact">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Dataset Size</label>
              <MSelect
                v-model="itemCount"
                :options="[
                  { value: 100, label: '100 items' },
                  { value: 500, label: '500 items' },
                  { value: 1000, label: '1,000 items' },
                  { value: 5000, label: '5,000 items' },
                  { value: 10000, label: '10,000 items' }
                ]"
                @update:model-value="regenerateDataset"
              />
            </div>
            
            <div class="space-y-3">
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="virtualScrolling"
                  class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span class="ml-2 text-sm text-gray-700">Virtual Scrolling</span>
              </label>
              
              <label class="flex items-center">
                <input
                  type="checkbox"
                  v-model="lazyLoading"
                  class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                />
                <span class="ml-2 text-sm text-gray-700">Lazy Loading</span>
              </label>
            </div>
            
            <div class="space-y-2">
              <MButton
                text="Regenerate Dataset"
                variant="outlined"
                @click="regenerateDataset"
                class="w-full"
              />
              <MButton
                text="Measure Render Time"
                variant="outlined"
                @click="measureRenderTime"
                class="w-full"
              />
            </div>
          </div>
        </MCard>

        <!-- Performance Metrics -->
        <MCard title="Performance Metrics" subtitle="Real-time performance monitoring">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="bg-blue-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-blue-600">
                {{ performanceMetrics.itemCount?.toLocaleString() || '0' }}
              </div>
              <div class="text-sm text-blue-800">Total Items</div>
            </div>
            
            <div class="bg-green-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-green-600">
                {{ performanceMetrics.generationTime?.toFixed(2) || '0' }}ms
              </div>
              <div class="text-sm text-green-800">Generation Time</div>
            </div>
            
            <div class="bg-yellow-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-yellow-600">
                {{ performanceMetrics.renderTime?.toFixed(2) || '0' }}ms
              </div>
              <div class="text-sm text-yellow-800">Render Time</div>
            </div>
            
            <div class="bg-purple-50 p-4 rounded-lg">
              <div class="text-2xl font-bold text-purple-600">
                {{ virtualScrolling ? 'ON' : 'OFF' }}
              </div>
              <div class="text-sm text-purple-800">Virtual Scrolling</div>
            </div>
          </div>
        </MCard>

        <!-- Navigator Performance Test -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MCard title="Performance Test Navigator" class="h-96">
            <ECFRNavigator
              :items="largeDataset"
              :options="performanceOptions"
              class="h-full border rounded"
            />
          </MCard>
          
          <MCard title="Performance Analysis" class="h-96 overflow-y-auto">
            <div class="space-y-4">
              <div>
                <h4 class="text-sm font-medium text-gray-900">Optimization Status</h4>
                <div class="mt-2 space-y-2">
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Virtual Scrolling</span>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          :class="virtualScrolling ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                      {{ virtualScrolling ? 'Enabled' : 'Disabled' }}
                    </span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Lazy Loading</span>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                          :class="lazyLoading ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                      {{ lazyLoading ? 'Enabled' : 'Disabled' }}
                    </span>
                  </div>
                  <div class="flex justify-between items-center">
                    <span class="text-sm text-gray-600">Animations</span>
                    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Disabled
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 class="text-sm font-medium text-gray-900">Memory Usage</h4>
                <div class="mt-2">
                  <div class="text-sm text-gray-600">
                    Estimated: ~{{ Math.round((performanceMetrics.itemCount || 0) * 0.5) }}KB
                  </div>
                </div>
              </div>
              
              <div>
                <h4 class="text-sm font-medium text-gray-900">Recommendations</h4>
                <div class="mt-2 space-y-1 text-sm text-gray-600">
                  <div v-if="!virtualScrolling" class="text-orange-600">
                    • Enable virtual scrolling for better performance with large datasets
                  </div>
                  <div v-if="!lazyLoading" class="text-orange-600">
                    • Enable lazy loading to improve initial load time
                  </div>
                  <div v-if="performanceMetrics.itemCount > 5000" class="text-orange-600">
                    • Consider server-side pagination for datasets > 5,000 items
                  </div>
                  <div class="text-green-600">
                    • Animations disabled for optimal performance
                  </div>
                </div>
              </div>
            </div>
          </MCard>
        </div>
      </div>
    `
  }),
  parameters: {
    docs: {
      description: {
        story: 'Performance stress testing for ECFR Navigator with large datasets, virtual scrolling, lazy loading, and performance monitoring.'
      }
    }
  }
};
