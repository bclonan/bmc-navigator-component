<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">eCFR Navigator Demo</h1>
    
    <div class="flex space-x-2 mb-4">
      <button 
        @click="toggleTheme" 
        class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
      >
        Toggle Theme ({{ navigatorOptions.theme }})
      </button>
      
      <button 
        @click="addExampleMetadata" 
        class="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors duration-200"
      >
        Add Example Metadata
      </button>
      
      <button 
        @click="registerExampleProcessor" 
        class="px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors duration-200"
      >
        Register XML Processor
      </button>
    </div>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="md:col-span-2 border border-gray-300 rounded-lg overflow-hidden h-[600px]">
        <ECFRNavigator 
          ref="ecfrNavigator"
          :items="ecfrData" 
          :options="navigatorOptions"
          @item-selected="handleItemSelected"
          @path-changed="handlePathChanged"
          @metadata-changed="handleMetadataChanged"
        />
      </div>
      
      <div class="space-y-4">
        <div class="bg-white dark:bg-gray-800 p-4 border border-gray-300 rounded-lg">
          <h2 class="text-lg font-semibold mb-2">Selected Item</h2>
          <pre v-if="selectedItem" class="bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto text-xs max-h-[150px]">{{ JSON.stringify(selectedItem, null, 2) }}</pre>
          <p v-else class="text-gray-500 italic">No item selected</p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-4 border border-gray-300 rounded-lg">
          <h2 class="text-lg font-semibold mb-2">Metadata</h2>
          <pre v-if="metadata" class="bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto text-xs max-h-[150px]">{{ JSON.stringify(metadata, null, 2) }}</pre>
          <p v-else class="text-gray-500 italic">No metadata available</p>
        </div>
        
        <div class="bg-white dark:bg-gray-800 p-4 border border-gray-300 rounded-lg">
          <h2 class="text-lg font-semibold mb-2">Processed Metadata</h2>
          <div v-if="processedMetadata && processedMetadata.xmlLink" class="bg-blue-50 p-2 rounded mb-2">
            <h3 class="font-medium mb-1">XML Link Processed:</h3>
            <a 
              :href="processedMetadata.xmlLink.url" 
              target="_blank" 
              class="text-blue-600 hover:underline block truncate"
            >
              {{ processedMetadata.xmlLink.label }}
            </a>
          </div>
          <div v-if="processedMetadata && processedMetadata.renderTarget" class="bg-green-50 p-2 rounded mb-2">
            <h3 class="font-medium mb-1">Render Target:</h3>
            <div class="text-sm">
              Element ID: {{ processedMetadata.renderTarget.elementId }}
            </div>
          </div>
          <pre v-if="processedMetadata" class="bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-x-auto text-xs max-h-[100px]">{{ JSON.stringify(processedMetadata, null, 2) }}</pre>
          <p v-else class="text-gray-500 italic">No processed metadata available</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  
  data() {
    return {
      selectedItem: null,
      currentPath: [],
      navigatorOptions: {
        showBreadcrumb: true,
        expandAll: false,
        theme: 'light'
      },
      ecfrData: [
        {
          id: 'title-1',
          type: 'title',
          number: '1',
          title: 'General Provisions',
          children: [
            {
              id: 'part-1',
              type: 'part',
              number: '1',
              title: 'Definitions',
              children: [
                {
                  id: 'section-1-1',
                  type: 'section',
                  number: '1.1',
                  title: 'Purpose and Scope',
                  content: '<p>This part contains definitions of terms used in this chapter, unless otherwise specified.</p>'
                },
                {
                  id: 'section-1-2',
                  type: 'section',
                  number: '1.2',
                  title: 'General Definitions',
                  content: '<p>As used in this chapter, unless the context requires otherwise:</p><ul><li><strong>Agency</strong> means any executive department, commission, independent establishment, corporation, or other entity.</li><li><strong>CFR</strong> means the Code of Federal Regulations.</li><li><strong>Person</strong> includes any individual, partnership, corporation, association, or public or private organization.</li></ul>'
                }
              ]
            },
            {
              id: 'part-2',
              type: 'part',
              number: '2',
              title: 'Administrative Procedures',
              children: [
                {
                  id: 'section-2-1',
                  type: 'section',
                  number: '2.1',
                  title: 'Scope of Rules',
                  content: '<p>The rules in this part apply to all proceedings conducted by the agency.</p>'
                },
                {
                  id: 'section-2-2',
                  type: 'section',
                  number: '2.2',
                  title: 'Filing Requirements',
                  content: '<p>All documents filed with the agency must be:</p><ol><li>Clearly legible;</li><li>Signed by the person submitting the document;</li><li>Include the docket number if applicable.</li></ol>'
                }
              ]
            }
          ]
        },
        {
          id: 'title-2',
          type: 'title',
          number: '2',
          title: 'Grants and Agreements',
          children: [
            {
              id: 'part-200',
              type: 'part',
              number: '200',
              title: 'Uniform Administrative Requirements',
              subtitle: 'Cost Principles, and Audit Requirements for Federal Awards',
              children: [
                {
                  id: 'section-200-0',
                  type: 'section',
                  number: '200.0',
                  title: 'Purpose',
                  content: '<p>This part establishes uniform administrative requirements, cost principles, and audit requirements for federal awards to non-federal entities.</p>'
                },
                {
                  id: 'section-200-1',
                  type: 'section',
                  number: '200.1',
                  title: 'Definitions',
                  content: '<p>The following definitions apply to this part:</p><ul><li><strong>Acquisition cost</strong> means the cost of the asset including the cost to ready the asset for its intended use.</li><li><strong>Advance payment</strong> means a payment that a Federal awarding agency makes by any appropriate payment mechanism.</li></ul>'
                }
              ]
            }
          ]
        }
      ]
    };
  },
  
  methods: {
    handleItemSelected(event) {
      this.selectedItem = event.item;
      console.log('Selected item:', event.item.title);
    },
    
    handlePathChanged(path) {
      this.currentPath = path;
      console.log('Path changed:', path.map(p => p.item.title).join(' > '));
    },
    
    toggleTheme() {
      this.navigatorOptions = {
        ...this.navigatorOptions,
        theme: this.navigatorOptions.theme === 'light' ? 'dark' : 'light'
      };
    }
  }
};
</script>

<style>
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
</style>