<template>
  <div class="home">
    <h1 class="text-2xl font-bold mb-6">ECFRNavigator Demo</h1>

    <!-- Tabs for different examples -->
    <div class="mb-6 border-b border-gray-200">
      <ul class="flex flex-wrap -mb-px">
        <li class="mr-2" v-for="(tab, index) in tabs" :key="index">
          <button 
            class="inline-block p-4 rounded-t-lg" 
            :class="activeTab === index ? 'text-blue-600 border-b-2 border-blue-600 font-medium' : 'hover:text-gray-600 hover:border-gray-300 text-gray-500'"
            @click="activeTab = index"
          >
            {{ tab.label }}
          </button>
        </li>
      </ul>
    </div>

    <!-- Standard Component -->
    <div v-if="activeTab === 0" class="flex flex-col lg:flex-row h-full">
      <div class="w-full lg:w-1/3 p-4 border-r border-gray-200 h-full overflow-auto">
        <h2 class="text-xl font-bold mb-4">Standard Usage</h2>
        
        <ECFRNavigator
          :data-url="dataUrl"
          :options="navigatorOptions"
          @item-selected="handleItemSelected"
        />
      </div>
      
      <div class="w-full lg:w-2/3 p-4 h-full overflow-auto">
        <div v-if="selectedItem">
          <h2 class="text-2xl font-bold mb-4">{{ selectedItem.label || selectedItem.title }}</h2>
          
          <div v-if="metadata" class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Metadata:</h3>
            <pre class="bg-gray-100 p-4 rounded">{{ JSON.stringify(metadata, null, 2) }}</pre>
          </div>
          
          <div v-if="processedMetadata" class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Processed Metadata:</h3>
            <pre class="bg-gray-100 p-4 rounded">{{ JSON.stringify(processedMetadata, null, 2) }}</pre>
          </div>
        </div>
        
        <div v-else class="text-center p-8 text-gray-500">
          <p>Select an item from the navigator</p>
        </div>
      </div>
    </div>

    <!-- Wrapper Component -->
    <div v-if="activeTab === 1" class="flex flex-col h-full">
      <h2 class="text-xl font-bold mb-4">Styleless Wrapper Demo</h2>
      
      <ECFRNavigatorWrapper
        :data-url="dataUrl"
        :options="{ viewMode: 'styleless' }"
        :preload-strategy="'eager'"
        v-slot="{ selectedItem, metadata, processedMetadata, loading, path }"
      >
        <div class="flex flex-col">
          <!-- Custom Navigation UI -->
          <div class="mb-4 p-4 bg-gray-100 rounded-lg">
            <!-- Create custom breadcrumb -->
            <div class="text-sm text-gray-600 mb-2">
              <span v-for="(item, index) in path" :key="item.id" class="inline-block">
                <span v-if="index > 0" class="mx-1">/</span>
                <span class="hover:underline cursor-pointer">{{ item.label || item.title }}</span>
              </span>
            </div>
            
            <!-- Loading state -->
            <div v-if="loading" class="p-4 text-center">
              <div class="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent mx-auto"></div>
              <p class="mt-2">Loading content...</p>
            </div>
            
            <!-- Selected item -->
            <div v-else-if="selectedItem" class="p-4 bg-white rounded shadow">
              <h3 class="text-xl font-semibold">{{ selectedItem.label || selectedItem.title }}</h3>
              
              <!-- Show metadata if available -->
              <div v-if="metadata" class="mt-2 p-2 bg-gray-50 text-sm rounded">
                <div v-for="(value, key) in metadata" :key="key">
                  <span class="font-medium">{{ key }}:</span> {{ typeof value === 'object' ? JSON.stringify(value) : value }}
                </div>
              </div>
              
              <!-- Content -->
              <div v-if="selectedItem.content" class="mt-4 prose">
                <div v-html="selectedItem.content"></div>
              </div>
              <div v-else class="mt-4 text-gray-500 italic">
                No content available for this item.
              </div>
            </div>
            
            <div v-else class="p-4 text-center text-gray-500">
              Please select an item to view its details.
            </div>
          </div>
        </div>
      </ECFRNavigatorWrapper>
    </div>

    <!-- Composable Demo -->
    <div v-if="activeTab === 2" class="flex flex-col lg:flex-row h-full">
      <div class="w-full lg:w-1/3 p-4 border-r border-gray-200 h-full overflow-auto">
        <h2 class="text-xl font-bold mb-4">Composable Usage</h2>
        
        <div class="bg-gray-100 p-4 rounded-lg mb-4">
          <h3 class="font-semibold mb-2">Current Path:</h3>
          <div class="text-sm">
            <span v-for="(item, index) in navigatorComposable.state.selectedPath" :key="item.id">
              <span v-if="index > 0" class="mx-1">/</span>
              <span 
                class="hover:text-blue-600 cursor-pointer"
                @click="navigatorComposable.selectItem(item.id)"
              >
                {{ item.label || item.title }}
              </span>
            </span>
          </div>
        </div>
        
        <div class="mb-4">
          <button 
            @click="navigatorComposable.expandAll()"
            class="bg-blue-500 text-white px-3 py-1 rounded mr-2"
          >
            Expand All
          </button>
          <button 
            @click="navigatorComposable.collapseAll()"
            class="bg-gray-500 text-white px-3 py-1 rounded"
          >
            Collapse All
          </button>
        </div>
        
        <!-- Custom Tree View -->
        <div v-if="navigatorComposable.state.loading" class="text-center p-4">
          Loading...
        </div>
        <div v-else>
          <div v-for="item in navigatorComposable.state.rootItems" :key="item.id">
            <ComposableTreeItem 
              :item="item" 
              :navigator="navigatorComposable"
              :current-item-id="navigatorComposable.state.currentItem?.id"
            />
          </div>
        </div>
      </div>
      
      <div class="w-full lg:w-2/3 p-4 h-full overflow-auto">
        <div v-if="navigatorComposable.state.currentItem">
          <h2 class="text-2xl font-bold mb-4">
            {{ navigatorComposable.state.currentItem.label || navigatorComposable.state.currentItem.title }}
          </h2>
          
          <div v-if="Object.keys(navigatorComposable.state.metadata).length > 0" class="mb-6">
            <h3 class="text-lg font-semibold mb-2">Metadata:</h3>
            <pre class="bg-gray-100 p-4 rounded">{{ JSON.stringify(navigatorComposable.state.metadata, null, 2) }}</pre>
          </div>
          
          <div class="mt-4 bg-white p-4 rounded border border-gray-200">
            <div v-if="navigatorComposable.state.currentItem.content" v-html="navigatorComposable.state.currentItem.content"></div>
            <div v-else class="text-gray-500">No content available for this item.</div>
          </div>
        </div>
        
        <div v-else class="text-center p-8 text-gray-500">
          <p>Select an item from the navigator</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ECFRNavigator, ECFRNavigatorWrapper, useECFRNavigatorStore, useECFRStore } from 'ecfr-navigator'
import 'ecfr-navigator/style.css'

// A custom component for tree view with the composable
const ComposableTreeItem = {
  name: 'ComposableTreeItem',
  props: {
    item: Object,
    navigator: Object,
    currentItemId: String
  },
  computed: {
    isExpanded() {
      return this.navigator.state.expandedItems.includes(this.item.id)
    },
    isSelected() {
      return this.currentItemId === this.item.id
    },
    hasChildren() {
      return this.item.children && this.item.children.length > 0
    }
  },
  methods: {
    toggleExpand() {
      if (this.isExpanded) {
        this.navigator.collapseItem(this.item.id)
      } else {
        this.navigator.expandItem(this.item.id)
      }
    },
    selectItem() {
      this.navigator.selectItem(this.item.id)
    }
  },
  template: `
    <div class="py-1">
      <div 
        class="flex items-center cursor-pointer" 
        :class="{ 'font-semibold text-blue-600': isSelected }"
      >
        <button 
          v-if="hasChildren" 
          @click="toggleExpand" 
          class="mr-1 w-5 h-5 flex items-center justify-center"
        >
          <span v-if="isExpanded">▼</span>
          <span v-else>►</span>
        </button>
        <span 
          v-else 
          class="mr-1 w-5 h-5"
        ></span>
        
        <span @click="selectItem">{{ item.label || item.title }}</span>
      </div>
      
      <div v-if="isExpanded && hasChildren" class="pl-5 mt-1 border-l border-gray-200">
        <ComposableTreeItem
          v-for="child in item.children"
          :key="child.id"
          :item="child"
          :navigator="navigator"
          :current-item-id="currentItemId"
        />
      </div>
    </div>
  `
}

export default {
  name: 'HomeView',
  components: {
    ECFRNavigator,
    ECFRNavigatorWrapper,
    ComposableTreeItem
  },
  data() {
    return {
      dataUrl: '/src/mock.json', // Path to your mock data
      selectedItem: null,
      metadata: null,
      processedMetadata: null,
      navigatorOptions: {
        viewMode: 'standard',
        fontSize: 'medium',
        darkMode: false,
        showMetadata: true,
        expandOnSelect: true,
        showBreadcrumb: true
      },
      activeTab: 0,
      tabs: [
        { label: 'Standard Component' },
        { label: 'Styleless Wrapper' },
        { label: 'Composable API' }
      ],
      navigatorComposable: null
    }
  },
  computed: {
    ecfrStore() {
      return useECFRStore()
    }
  },
  methods: {
    handleItemSelected(event) {
      console.log('Item selected:', event.item)
      this.selectedItem = event.item
      
      // Get metadata for this item
      if (event.item && event.item.id) {
        this.metadata = this.ecfrStore.getItemMetadata(event.item.id)
        this.processedMetadata = this.ecfrStore.processItemMetadata(event.item.id)
      } else {
        this.metadata = null
        this.processedMetadata = null
      }
    }
  },
  created() {
    // Initialize the composable with options
    this.navigatorComposable = useECFRNavigatorStore({
      autoExpandSelected: true,
      onItemSelected: (item) => {
        console.log('Composable selected:', item)
      },
      onMetadataChanged: (event) => {
        console.log('Metadata changed:', event)
      }
    })
    
    // Load data using the composable
    this.navigatorComposable.loadData(this.dataUrl)
  }
}
</script>

<style scoped>
.home {
  min-height: calc(100vh - 60px);
}
</style>