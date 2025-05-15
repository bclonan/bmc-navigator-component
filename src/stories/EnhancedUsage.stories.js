import { ref, onMounted } from 'vue';
import ECFRNavigatorWrapper from '../components/ECFRNavigatorWrapper.vue';
import { useECFRNavigatorStore } from '../composables/useECFRNavigatorStore';
import Fuse from 'fuse.js';

export default {
  title: 'Enhanced/Usage Examples',
  component: ECFRNavigatorWrapper,
  parameters: {
    layout: 'fullscreen',
  },
};

// Mock data for examples
const mockData = [
  {
    id: 'item1',
    title: 'Title 1',
    children: [
      {
        id: 'item1-1',
        title: 'Section 1.1',
        content: '<p>This is the content for section 1.1</p>'
      },
      {
        id: 'item1-2',
        title: 'Section 1.2',
        content: '<p>This is the content for section 1.2</p>'
      }
    ]
  },
  {
    id: 'item2',
    title: 'Title 2',
    children: [
      {
        id: 'item2-1',
        title: 'Section 2.1',
        content: '<p>This is the content for section 2.1</p>'
      }
    ]
  }
];

// Example of using the wrapper component
export const WrapperComponentExample = {
  render: () => ({
    components: { ECFRNavigatorWrapper },
    template: `
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">ECFRNavigatorWrapper Example</h1>
        <div class="flex flex-col md:flex-row">
          <div class="w-full md:w-1/3 pr-4">
            <ECFRNavigatorWrapper
              :data="mockData"
              :options="options"
              @item-selected="handleItemSelected"
              v-slot="{ selectedItem, metadata, processedMetadata }"
            >
              <div v-if="selectedItem" class="mt-4 p-4 bg-gray-100 rounded">
                <p class="font-semibold">Selected: {{ selectedItem.title }}</p>
                <p v-if="metadata">Has metadata</p>
              </div>
            </ECFRNavigatorWrapper>
          </div>
          
          <div class="w-full md:w-2/3 mt-4 md:mt-0">
            <div v-if="currentItem" class="p-4 border rounded">
              <h2 class="text-xl font-bold">{{ currentItem.title }}</h2>
              <div v-if="currentItem.content" v-html="currentItem.content"></div>
              <div v-else class="text-gray-500">No content available</div>
            </div>
            <div v-else class="p-4 border rounded text-gray-500">
              Select an item on the left
            </div>
          </div>
        </div>
      </div>
    `,
    setup() {
      const currentItem = ref(null);
      
      const options = {
        viewMode: 'standard',
        fontSize: 'medium',
        darkMode: false,
        showMetadata: true
      };
      
      const handleItemSelected = (event) => {
        currentItem.value = event.item;
      };
      
      return {
        mockData,
        options,
        currentItem,
        handleItemSelected
      };
    }
  })
};

// Example of using the composable directly
export const ComposableExample = {
  render: () => ({
    components: { ECFRNavigatorWrapper },
    template: `
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">useECFRNavigatorStore Example</h1>
        
        <div class="mb-4 flex items-center">
          <button 
            class="px-3 py-1 bg-blue-500 text-white rounded mr-2"
            @click="navigator.expandAll()"
          >
            Expand All
          </button>
          <button 
            class="px-3 py-1 bg-blue-500 text-white rounded mr-2"
            @click="navigator.collapseAll()"
          >
            Collapse All
          </button>
          <button 
            class="px-3 py-1 bg-blue-500 text-white rounded mr-4"
            @click="addMetadata()"
          >
            Add Metadata
          </button>
          
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search..."
            class="px-3 py-1 border rounded w-64"
            @input="performSearch"
          />
        </div>
        
        <div v-if="searchResults.length > 0" class="mb-4 p-4 bg-gray-100 rounded">
          <h2 class="font-bold mb-2">Search Results:</h2>
          <ul class="list-disc pl-5">
            <li v-for="result in searchResults" :key="result.item.id" class="mb-1">
              <a 
                href="#" 
                class="text-blue-600 hover:underline"
                @click.prevent="navigator.selectItem(result.item.id)"
              >
                {{ result.item.title }}
              </a>
            </li>
          </ul>
        </div>
        
        <div class="flex flex-col md:flex-row">
          <div class="w-full md:w-1/3 pr-4">
            <ECFRNavigatorWrapper
              :data="mockData"
              :options="options"
              ref="navigatorRef"
            />
          </div>
          
          <div class="w-full md:w-2/3 mt-4 md:mt-0">
            <div v-if="navigator.state.loading" class="p-4 border rounded">
              <p>Loading...</p>
            </div>
            
            <div v-else-if="navigator.state.currentItem" class="p-4 border rounded">
              <h2 class="text-xl font-bold">{{ navigator.state.currentItem.title }}</h2>
              
              <div v-if="navigator.state.metadata" class="my-4 p-3 bg-gray-100 rounded">
                <h3 class="font-semibold mb-1">Metadata:</h3>
                <pre class="text-sm">{{ JSON.stringify(navigator.state.metadata, null, 2) }}</pre>
              </div>
              
              <div v-if="navigator.state.currentItem.content" v-html="navigator.state.currentItem.content"></div>
              <div v-else class="text-gray-500">No content available</div>
            </div>
            
            <div v-else class="p-4 border rounded text-gray-500">
              Select an item on the left
            </div>
          </div>
        </div>
      </div>
    `,
    setup() {
      const navigatorRef = ref(null);
      const searchQuery = ref('');
      const searchResults = ref([]);
      
      // Initialize navigator with callbacks
      const navigator = useECFRNavigatorStore({
        autoExpandSelected: true,
        onItemSelected: (item) => {
          console.log('Item selected:', item);
        },
        onMetadataChanged: (event) => {
          console.log('Metadata changed:', event);
        }
      });
      
      // Set data on mount
      onMounted(() => {
        navigator.setData(mockData);
      });
      
      // Add metadata to an item
      const addMetadata = () => {
        const currentItemId = navigator.state.currentItem?.id;
        if (currentItemId) {
          navigator.setItemMetadata(currentItemId, {
            type: 'info',
            timestamp: new Date().toISOString(),
            note: 'This is custom metadata added via the enhanced store'
          });
        }
      };
      
      // Perform search
      const performSearch = async () => {
        if (!searchQuery.value) {
          searchResults.value = [];
          return;
        }
        
        searchResults.value = await navigator.findItems(searchQuery.value);
      };
      
      const options = {
        viewMode: 'standard',
        fontSize: 'medium',
        darkMode: false,
        showMetadata: true
      };
      
      return {
        mockData,
        options,
        navigator,
        navigatorRef,
        searchQuery,
        searchResults,
        addMetadata,
        performSearch
      };
    }
  })
};

// Example of optimized loading with Web Workers
export const OptimizedLoadingExample = {
  render: () => ({
    components: { ECFRNavigatorWrapper },
    template: `
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Optimized Loading Example</h1>
        
        <div class="mb-4">
          <button 
            class="px-3 py-1 bg-blue-500 text-white rounded mr-2"
            @click="loadData('lazy')"
            :disabled="loading"
          >
            Load with Lazy Loading
          </button>
          
          <button 
            class="px-3 py-1 bg-green-500 text-white rounded mr-2"
            @click="loadData('eager')"
            :disabled="loading"
          >
            Load with Eager Loading
          </button>
          
          <button 
            class="px-3 py-1 bg-purple-500 text-white rounded mr-2"
            @click="loadData('worker')"
            :disabled="loading || !workerSupported"
          >
            Load with Web Worker
          </button>
        </div>
        
        <div v-if="loading" class="mb-4 p-4 bg-yellow-100 border border-yellow-300 rounded">
          <p>Loading data... Please wait.</p>
        </div>
        
        <div v-if="error" class="mb-4 p-4 bg-red-100 border border-red-300 rounded">
          <p class="text-red-700">{{ error }}</p>
        </div>
        
        <div v-if="performanceStats.length > 0" class="mb-4 p-4 bg-gray-100 rounded">
          <h2 class="font-bold mb-2">Performance:</h2>
          <ul>
            <li v-for="(stat, index) in performanceStats" :key="index" class="mb-1">
              {{ stat }}
            </li>
          </ul>
        </div>
        
        <ECFRNavigatorWrapper
          v-if="showNavigator"
          :data-url="dataUrl"
          :preload-strategy="preloadStrategy"
          :options="options"
          @data-loaded="onDataLoaded"
          @load-error="onLoadError"
          @item-selected="onItemSelected"
        />
      </div>
    `,
    setup() {
      const loading = ref(false);
      const error = ref('');
      const showNavigator = ref(false);
      const performanceStats = ref([]);
      const preloadStrategy = ref('lazy');
      const dataUrl = ref('');
      const startTime = ref(0);
      const selectedItem = ref(null);
      const workerSupported = typeof Worker !== 'undefined';
      
      // Setup mock data URL
      const mockDataUrl = '/mock.json';
      
      const options = {
        viewMode: 'compact',
        fontSize: 'small',
        showMetadata: true
      };
      
      const loadData = (strategy) => {
        // Reset state
        error.value = '';
        loading.value = true;
        showNavigator.value = false;
        performanceStats.value = [];
        startTime.value = performance.now();
        
        // Set loading strategy
        preloadStrategy.value = strategy;
        
        // Use timeout to allow UI to update before heavy operation
        setTimeout(() => {
          dataUrl.value = mockDataUrl;
          showNavigator.value = true;
        }, 100);
      };
      
      const onDataLoaded = (data) => {
        const endTime = performance.now();
        const loadTime = (endTime - startTime.value).toFixed(2);
        
        performanceStats.value.push(
          `Strategy: ${preloadStrategy.value}`,
          `Load time: ${loadTime}ms`,
          `Items loaded: ${data.length}`
        );
        
        loading.value = false;
      };
      
      const onLoadError = (err) => {
        error.value = err.message;
        loading.value = false;
      };
      
      const onItemSelected = (event) => {
        selectedItem.value = event.item;
      };
      
      return {
        loading,
        error,
        showNavigator,
        performanceStats,
        preloadStrategy,
        dataUrl,
        options,
        selectedItem,
        workerSupported,
        loadData,
        onDataLoaded,
        onLoadError,
        onItemSelected
      };
    }
  })
};

// Example of the pure styleless mode
export const StylelessExample = {
  render: () => ({
    components: { ECFRNavigatorWrapper },
    template: `
      <div class="p-4">
        <h1 class="text-2xl font-bold mb-4">Styleless Mode Example</h1>
        <p class="mb-4">This example shows how to use the ECFRNavigator in styleless mode with your own custom styling.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div class="bg-gray-100 p-4 rounded shadow">
            <h2 class="text-lg font-bold mb-3 border-b pb-2">Navigation</h2>
            
            <ECFRNavigatorWrapper
              :data="mockData"
              :options="{ viewMode: 'styleless' }"
              :show-navigator="false"
              v-slot="{ selectedItem, loading }"
            >
              <div v-if="loading" class="text-gray-500 italic">Loading...</div>
              <div v-else>
                <ul class="custom-tree">
                  <template v-for="(item, index) in mockData" :key="item.id">
                    <li>
                      <a 
                        href="#" 
                        class="block p-2 hover:bg-blue-100 rounded"
                        :class="{ 'bg-blue-100 font-semibold': isSelected(item) }"
                        @click.prevent="selectItem(item)"
                      >
                        {{ item.title }}
                      </a>
                      
                      <ul v-if="item.children && isExpanded(item)" class="pl-4 mt-1 border-l-2 border-gray-200">
                        <li v-for="child in item.children" :key="child.id">
                          <a 
                            href="#" 
                            class="block p-2 hover:bg-blue-100 rounded"
                            :class="{ 'bg-blue-100 font-semibold': isSelected(child) }"
                            @click.prevent="selectItem(child)"
                          >
                            {{ child.title }}
                          </a>
                        </li>
                      </ul>
                      
                      <button 
                        v-if="item.children && item.children.length > 0"
                        @click="toggleExpand(item)"
                        class="text-xs text-blue-500 mt-1 ml-2"
                      >
                        {{ isExpanded(item) ? 'Collapse' : 'Expand' }}
                      </button>
                    </li>
                  </template>
                </ul>
              </div>
            </ECFRNavigatorWrapper>
          </div>
          
          <div class="md:col-span-2 bg-white p-4 rounded shadow border">
            <div v-if="currentItem">
              <h2 class="text-xl font-bold mb-3 pb-2 border-b">{{ currentItem.title }}</h2>
              
              <div v-if="currentItem.content" class="prose max-w-none" v-html="currentItem.content"></div>
              <div v-else class="text-gray-500 italic">No content available</div>
              
              <div v-if="currentItem.children && currentItem.children.length > 0" class="mt-4">
                <h3 class="font-semibold mb-2">Child Sections:</h3>
                <ul class="list-disc pl-5">
                  <li v-for="child in currentItem.children" :key="child.id" class="mb-1">
                    <a 
                      href="#" 
                      class="text-blue-600 hover:underline"
                      @click.prevent="selectItem(child)"
                    >
                      {{ child.title }}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            
            <div v-else class="text-gray-500 italic">
              Select an item from the navigation tree
            </div>
          </div>
        </div>
      </div>
    `,
    setup() {
      // Initialize navigator store for easier access
      const navigator = useECFRNavigatorStore();
      const currentItem = ref(null);
      const expandedItems = ref(new Set());
      
      // Set initial data
      onMounted(() => {
        navigator.setData(mockData);
        if (mockData.length > 0) {
          expandedItems.value.add(mockData[0].id);
        }
      });
      
      // Custom navigation handling
      const selectItem = (item) => {
        navigator.selectItem(item.id);
        currentItem.value = item;
      };
      
      const isSelected = (item) => {
        return currentItem.value && currentItem.value.id === item.id;
      };
      
      const isExpanded = (item) => {
        return expandedItems.value.has(item.id);
      };
      
      const toggleExpand = (item) => {
        if (expandedItems.value.has(item.id)) {
          expandedItems.value.delete(item.id);
        } else {
          expandedItems.value.add(item.id);
        }
      };
      
      return {
        mockData,
        currentItem,
        expandedItems,
        navigator,
        selectItem,
        isSelected,
        isExpanded,
        toggleExpand
      };
    }
  })
};