<template>
  <div class="ecfr-wrapper">
    <!-- ECFRNavigator component with styleless options -->
    <ECFRNavigator
      v-if="showNavigator"
      :data="data"
      :data-url="dataUrl" 
      :data-urls="dataUrls"
      :options="navigatorOptions"
      @item-selected="handleItemSelected"
    />
    
    <!-- Optional slot for custom content -->
    <slot 
      :selected-item="selectedItem"
      :metadata="metadata"
      :processed-metadata="processedMetadata"
      :loading="loading"
      :errors="errors"
    ></slot>
  </div>
</template>

<script>
import ECFRNavigator from './ECFRNavigator.vue';
import { useECFRStore } from '../stores/ecfr';

export default {
  name: 'ECFRNavigatorWrapper',
  components: {
    ECFRNavigator
  },
  
  props: {
    /**
     * Direct data array to pass to the navigator
     */
    data: {
      type: Array,
      default: () => []
    },
    
    /**
     * Single URL to load data from
     */
    dataUrl: {
      type: String,
      default: ''
    },
    
    /**
     * Multiple URLs to load data from
     */
    dataUrls: {
      type: Array,
      default: () => []
    },
    
    /**
     * Options to configure the navigator
     */
    options: {
      type: Object,
      default: () => ({})
    },
    
    /**
     * Whether to show the navigator component
     */
    showNavigator: {
      type: Boolean,
      default: true
    },
    
    /**
     * Preload strategy - can be 'lazy', 'eager', or 'worker'
     * - lazy: load when component mounts
     * - eager: start loading immediately when script executes
     * - worker: use a web worker for loading (if supported)
     */
    preloadStrategy: {
      type: String,
      default: 'lazy',
      validator: value => ['lazy', 'eager', 'worker'].includes(value)
    }
  },
  
  data() {
    return {
      selectedItem: null,
      metadata: null,
      processedMetadata: null,
      loading: false,
      errors: [],
      hasInitialized: false,
      worker: null
    };
  },
  
  computed: {
    navigatorOptions() {
      // Apply default styleless configuration, but allow overrides
      return {
        viewMode: 'styleless',
        showMetadata: true,
        expandOnSelect: true,
        ...this.options
      };
    },
    
    ecfrStore() {
      return useECFRStore();
    }
  },
  
  watch: {
    // Watch for data changes to reinitialize
    data: {
      handler(newData) {
        if (newData && newData.length > 0) {
          this.setData(newData);
        }
      },
      deep: true
    }
  },
  
  created() {
    // If preload strategy is eager, start loading right away
    if (this.preloadStrategy === 'eager') {
      this.initializeData();
    }
    
    // If using worker strategy, set up the web worker
    if (this.preloadStrategy === 'worker' && typeof Worker !== 'undefined') {
      this.setupWorker();
    }
  },
  
  mounted() {
    // If not already initialized and not using worker, initialize now
    if (!this.hasInitialized && this.preloadStrategy !== 'worker') {
      this.initializeData();
    }
    
    // Listen for current item changes from the store
    this.$watch(
      () => this.ecfrStore.currentItem,
      (newItem) => {
        if (newItem) {
          this.selectedItem = newItem;
          this.updateMetadata();
        }
      }
    );
  },
  
  beforeUnmount() {
    // Clean up worker if it exists
    if (this.worker) {
      this.worker.terminate();
      this.worker = null;
    }
  },
  
  methods: {
    /**
     * Initialize data from props
     */
    initializeData() {
      if (this.data && this.data.length > 0) {
        this.setData(this.data);
      } else if (this.dataUrl || (this.dataUrls && this.dataUrls.length > 0)) {
        this.loadData();
      }
      this.hasInitialized = true;
    },
    
    /**
     * Set data directly to the store
     */
    setData(data) {
      this.ecfrStore.setRootItems(data);
      // If we have data, select the first item by default
      if (data.length > 0 && !this.selectedItem) {
        this.selectedItem = data[0];
        this.updateMetadata();
      }
    },
    
    /**
     * Load data from URLs
     */
    async loadData() {
      this.loading = true;
      this.errors = [];
      
      try {
        const urls = [];
        if (this.dataUrl) urls.push(this.dataUrl);
        if (this.dataUrls && this.dataUrls.length) urls.push(...this.dataUrls);
        
        // Use Promise.all to fetch all URLs in parallel
        const responses = await Promise.all(
          urls.map(url => fetch(url).then(response => {
            if (!response.ok) {
              throw new Error(`Failed to load ${url}: ${response.status} ${response.statusText}`);
            }
            return response.json();
          }))
        );
        
        // Process responses
        const combinedData = [];
        responses.forEach(data => {
          if (Array.isArray(data)) {
            combinedData.push(...data);
          } else if (data && typeof data === 'object') {
            // Handle case where response is an object with items array
            if (Array.isArray(data.items)) {
              combinedData.push(...data.items);
            } else {
              // Single object, add it directly
              combinedData.push(data);
            }
          }
        });
        
        this.setData(combinedData);
        this.$emit('data-loaded', combinedData);
      } catch (error) {
        console.error('Error loading data:', error);
        this.errors.push(error.message);
        this.$emit('load-error', error);
      } finally {
        this.loading = false;
      }
    },
    
    /**
     * Set up web worker for data loading
     */
    setupWorker() {
      const workerCode = `
        self.onmessage = function(e) {
          const urls = e.data;
          
          Promise.all(
            urls.map(url => 
              fetch(url)
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Failed to load ' + url + ': ' + response.status);
                  }
                  return response.json();
                })
            )
          )
          .then(results => {
            self.postMessage({ type: 'success', data: results });
          })
          .catch(error => {
            self.postMessage({ type: 'error', error: error.message });
          });
        };
      `;
      
      const blob = new Blob([workerCode], { type: 'application/javascript' });
      this.worker = new Worker(URL.createObjectURL(blob));
      
      this.worker.onmessage = (e) => {
        if (e.data.type === 'success') {
          const combinedData = [];
          e.data.data.forEach(data => {
            if (Array.isArray(data)) {
              combinedData.push(...data);
            } else if (data && typeof data === 'object') {
              if (Array.isArray(data.items)) {
                combinedData.push(...data.items);
              } else {
                combinedData.push(data);
              }
            }
          });
          
          this.setData(combinedData);
          this.$emit('data-loaded', combinedData);
          this.loading = false;
        } else if (e.data.type === 'error') {
          console.error('Worker error:', e.data.error);
          this.errors.push(e.data.error);
          this.$emit('load-error', new Error(e.data.error));
          this.loading = false;
        }
      };
      
      // Start loading data
      this.loading = true;
      const urls = [];
      if (this.dataUrl) urls.push(this.dataUrl);
      if (this.dataUrls && this.dataUrls.length) urls.push(...this.dataUrls);
      
      if (urls.length > 0) {
        this.worker.postMessage(urls);
      } else {
        this.loading = false;
      }
    },
    
    /**
     * Handle item selection
     */
    handleItemSelected(event) {
      this.selectedItem = event.item;
      this.updateMetadata();
      this.$emit('item-selected', event);
    },
    
    /**
     * Update metadata and processed metadata
     */
    updateMetadata() {
      if (this.selectedItem && this.selectedItem.id) {
        this.metadata = this.ecfrStore.getItemMetadata(this.selectedItem.id);
        this.processedMetadata = this.ecfrStore.processItemMetadata(this.selectedItem.id);
      } else {
        this.metadata = null;
        this.processedMetadata = null;
      }
    },
    
    /**
     * Navigate to a specific item by ID
     */
    navigateTo(itemId) {
      return this.ecfrStore.navigateTo(itemId);
    },
    
    /**
     * Expand a specific item by ID
     */
    expandItem(itemId) {
      this.ecfrStore.expandItem(itemId);
    },
    
    /**
     * Collapse a specific item by ID
     */
    collapseItem(itemId) {
      this.ecfrStore.collapseItem(itemId);
    },
    
    /**
     * Expand all items
     */
    expandAll() {
      this.ecfrStore.expandAll();
    },
    
    /**
     * Collapse all items
     */
    collapseAll() {
      this.ecfrStore.collapseAll();
    },
    
    /**
     * Set metadata for a specific item
     */
    setItemMetadata(itemId, metadata, metadataType) {
      this.ecfrStore.setItemMetadata(itemId, metadata, metadataType);
      if (this.selectedItem && this.selectedItem.id === itemId) {
        this.updateMetadata();
      }
    },
    
    /**
     * Remove metadata from a specific item
     */
    removeItemMetadata(itemId, metadataType) {
      this.ecfrStore.removeItemMetadata(itemId, metadataType);
      if (this.selectedItem && this.selectedItem.id === itemId) {
        this.updateMetadata();
      }
    },
    
    /**
     * Register a metadata processor function
     */
    registerMetadataProcessor(metadataType, processorFn) {
      this.ecfrStore.registerMetadataProcessor(metadataType, processorFn);
      if (this.selectedItem) {
        this.updateMetadata();
      }
    },
    
    /**
     * Unregister a metadata processor function
     */
    unregisterMetadataProcessor(metadataType) {
      this.ecfrStore.unregisterMetadataProcessor(metadataType);
      if (this.selectedItem) {
        this.updateMetadata();
      }
    }
  }
};
</script>

<style scoped>
/* No styles by default - let parent component handle styling */
</style>