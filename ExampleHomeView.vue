<template>
  <div class="home">
    <div class="flex flex-col lg:flex-row h-full">
      <!-- Navigator panel -->
      <div class="w-full lg:w-1/3 p-4 border-r border-gray-200 h-full overflow-auto">
        <h2 class="text-xl font-bold mb-4">ECFR Navigator</h2>
        
        <ECFRNavigator
          :data-url="dataUrl"
          :options="navigatorOptions"
          @item-selected="handleItemSelected"
        />
      </div>
      
      <!-- Content panel -->
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
          
          <div class="mt-4">
            <h3 class="text-lg font-semibold mb-2">Content:</h3>
            <div class="prose max-w-none bg-white p-4 rounded border border-gray-200">
              <div v-if="selectedItem.content" v-html="selectedItem.content"></div>
              <div v-else class="text-gray-500">No content available for this item.</div>
            </div>
          </div>
          
          <div v-if="selectedItem.children && selectedItem.children.length > 0" class="mt-6">
            <h3 class="text-lg font-semibold mb-2">Children:</h3>
            <ul class="list-disc pl-6">
              <li v-for="child in selectedItem.children" :key="child.id" class="mb-2">
                <a 
                  href="#" 
                  class="text-blue-600 hover:text-blue-800 hover:underline"
                  @click.prevent="navigateToChild(child)"
                >
                  {{ child.label || child.title }}
                </a>
              </li>
            </ul>
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
import { ECFRNavigator, useECFRStore } from 'ecfr-navigator';
import 'ecfr-navigator/style.css';

export default {
  name: 'ExampleHomeView',
  components: {
    ECFRNavigator
  },
  data() {
    return {
      dataUrl: '/mock.json', // Update this to your actual data path
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
      }
    };
  },
  computed: {
    ecfrStore() {
      return useECFRStore();
    },
    breadcrumbPath() {
      return this.ecfrStore.breadcrumbPath;
    }
  },
  methods: {
    handleItemSelected(event) {
      console.log('Item selected:', event.item);
      this.selectedItem = event.item;
      
      // Get metadata for this item
      if (event.item && event.item.id) {
        this.metadata = this.ecfrStore.getItemMetadata(event.item.id);
        this.processedMetadata = this.ecfrStore.processItemMetadata(event.item.id);
      } else {
        this.metadata = null;
        this.processedMetadata = null;
      }
    },
    navigateToChild(child) {
      const navigator = this.ecfrStore;
      if (child && child.id) {
        navigator.navigateTo(child.id);
        this.handleItemSelected({ item: child });
      }
    }
  },
  mounted() {
    // Listen for current item changes from the store
    this.$watch(
      () => this.ecfrStore.currentItem,
      (newItem) => {
        if (newItem) {
          this.selectedItem = newItem;
          this.metadata = this.ecfrStore.currentItemMetadata();
          this.processedMetadata = this.ecfrStore.processItemMetadata(newItem.id);
        }
      }
    );
  }
};
</script>

<style scoped>
.home {
  height: calc(100vh - 60px);
}
</style>