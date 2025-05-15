<template>
  <div class="home">
    <div class="flex flex-col lg:flex-row">
      <!-- Navigator panel -->
      <div class="w-full lg:w-1/3 p-4 border-r border-gray-200">
        <h2 class="text-xl font-bold mb-4">ECFRNavigator Example</h2>
        
        <ECFRNavigator
          :data-url="dataUrl"
          :options="navigatorOptions"
          @item-selected="handleItemSelected"
        />
      </div>
      
      <!-- Content panel -->
      <div class="w-full lg:w-2/3 p-4">
        <div v-if="currentItem">
          <h2 class="text-2xl font-bold mb-4">{{ currentItem.label }}</h2>
          
          <div v-if="currentItemMetadata">
            <h3 class="text-lg font-semibold mb-2">Metadata:</h3>
            <pre class="bg-gray-100 p-4 rounded">{{ JSON.stringify(currentItemMetadata, null, 2) }}</pre>
          </div>
          
          <div class="mt-4">
            <h3 class="text-lg font-semibold mb-2">Children:</h3>
            <ul class="list-disc pl-6">
              <li v-for="child in currentItem.children" :key="child.id">
                {{ child.label }}
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
import { ECFRNavigator, useECFRStore } from 'ecfr-navigator'
import 'ecfr-navigator/style.css'

export default {
  name: 'HomeView',
  components: {
    ECFRNavigator
  },
  data() {
    return {
      dataUrl: '/src/mock.json', // Path to your mock data
      navigatorOptions: {
        viewMode: 'standard',
        fontSize: 'medium',
        darkMode: false,
        showMetadata: true,
        expandOnSelect: true
      }
    }
  },
  computed: {
    ecfrStore() {
      return useECFRStore()
    },
    currentItem() {
      return this.ecfrStore.currentItem
    },
    currentItemMetadata() {
      if (this.currentItem && this.currentItem.id) {
        return this.ecfrStore.getItemMetadata(this.currentItem.id)
      }
      return null
    },
    processedMetadata() {
      if (this.currentItem && this.currentItem.id) {
        return this.ecfrStore.processItemMetadata(this.currentItem.id)
      }
      return null
    }
  },
  methods: {
    handleItemSelected(event) {
      console.log('Item selected:', event.item)
      // You can add additional handling here
    }
  }
}
</script>

<style scoped>
.home {
  min-height: calc(100vh - 60px);
}
</style>