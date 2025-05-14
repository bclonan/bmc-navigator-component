<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">eCFR Navigator Demo</h1>
    
    <div class="flex mb-4">
      <button 
        @click="toggleTheme" 
        class="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors duration-200"
      >
        Toggle Theme ({{ navigatorOptions.theme }})
      </button>
    </div>
    
    <div class="h-[600px] border border-gray-300 rounded-lg overflow-hidden">
      <ECFRNavigator 
        :items="ecfrData" 
        :options="navigatorOptions"
        @item-selected="handleItemSelected"
        @path-changed="handlePathChanged"
      />
    </div>
    
    <div class="mt-4">
      <h2 class="text-lg font-semibold">Selected Item:</h2>
      <pre v-if="selectedItem" class="bg-gray-100 p-2 rounded mt-2 overflow-x-auto">{{ JSON.stringify(selectedItem, null, 2) }}</pre>
      <p v-else class="text-gray-500 italic">No item selected</p>
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