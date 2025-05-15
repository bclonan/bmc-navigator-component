import ECFRNavigator from '../components/ECFRNavigator.vue';
import { useECFRNavigator } from '../composables/useECFRNavigator';

export default {
  title: 'eCFR/Features/Metadata',
  component: ECFRNavigator,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Examples demonstrating the metadata capabilities of the ECFRNavigator component, including metadata badges, processors, and external resource connections.'
      }
    }
  },
  decorators: [
    () => ({
      template: '<div style="height: 650px; border: 1px solid #ccc; border-radius: 4px;"><story /></div>'
    })
  ]
};

// Sample data for metadata demonstration
const sampleData = [
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
            title: 'Scope and Purpose',
            content: '<p>This section defines the scope and purpose of these regulations.</p>',
          },
          {
            id: 'section-1-2',
            type: 'section',
            number: '1.2',
            title: 'Terminology',
            content: '<p>This section provides definitions for terminology used throughout the regulations.</p>',
          }
        ]
      }
    ]
  }
];

// Basic metadata badges example
export const BasicMetadataBadges = {
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium'
      }
    },
    itemMetadata: {
      'section-1-1': {
        xmlLink: {
          url: 'https://example.com/api/xml/section-1-1.xml',
          version: '2023-05-15'
        }
      },
      'section-1-2': {
        references: [
          { type: 'related', id: 'section-2-1', title: 'Related Procedures' }
        ]
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Basic example showing metadata badges on items that have associated metadata.'
      }
    }
  }
};

// Multiple metadata types
export const MultipleMetadataTypes = {
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium'
      }
    },
    itemMetadata: {
      'section-1-1': {
        xmlLink: {
          url: 'https://example.com/api/xml/section-1-1.xml',
          version: '2023-05-15'
        },
        renderTarget: {
          elementId: 'content-viewer',
          mode: 'replace'
        },
        externalReferences: [
          { type: 'regulation', id: 'reg-456', title: 'Related Regulation' },
          { type: 'guidance', id: 'guide-789', title: 'Implementation Guide' }
        ]
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing items with multiple types of metadata attached.'
      }
    }
  }
};

// Detailed metadata display
export const DetailedMetadataDisplay = {
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'detailed',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium'
      }
    },
    itemMetadata: {
      'section-1-1': {
        xmlLink: {
          url: 'https://example.com/api/xml/section-1-1.xml',
          version: '2023-05-15'
        },
        renderTarget: {
          elementId: 'content-viewer',
          mode: 'replace'
        },
        status: {
          state: 'active',
          effectiveDate: '2023-01-01',
          lastReviewed: '2023-04-15'
        }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Detailed view mode showing more comprehensive metadata display.'
      }
    }
  }
};

// Dynamic metadata update (via UI actions)
export const DynamicMetadataUpdate = {
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium'
      }
    },
    itemMetadata: {
      'section-1-1': {
        status: {
          state: 'review',
          lastUpdated: '2023-05-10'
        }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing how metadata can be dynamically updated. The code example demonstrates updating metadata when an item is selected.'
      }
    }
  },
  render: (args) => ({
    components: { ECFRNavigator },
    setup() {
      return { args };
    },
    template: `
      <div>
        <div class="mb-4 p-3 bg-gray-100 rounded">
          <h3 class="font-medium mb-2">Metadata Operations</h3>
          <p class="text-sm mb-2">Click an item to see its metadata below. Then use the buttons to modify the metadata.</p>
          <div v-if="selectedItem" class="mt-2">
            <div class="font-medium">Selected: {{ selectedItem.title }}</div>
            <div class="text-sm mt-1 mb-2">
              Current metadata: 
              <pre class="bg-gray-200 p-2 rounded mt-1 text-xs">{{ JSON.stringify(currentMetadata, null, 2) }}</pre>
            </div>
            <div class="flex space-x-2 mt-2">
              <button 
                @click="addTestMetadata"
                class="px-2 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Add Test Metadata
              </button>
              <button 
                @click="removeMetadata"
                class="px-2 py-1 bg-red-500 text-white rounded text-sm"
              >
                Remove Metadata
              </button>
            </div>
          </div>
          <div v-else class="text-sm text-gray-500">
            No item selected
          </div>
        </div>
        
        <ECFRNavigator 
          :items="args.items" 
          :options="args.options"
          :item-metadata="args.itemMetadata"
          @item-selected="handleItemSelected"
          @metadata-changed="handleMetadataChanged"
        />
      </div>
    `,
    data() {
      return {
        selectedItem: null,
        currentMetadata: null
      };
    },
    methods: {
      handleItemSelected(event) {
        this.selectedItem = event.item;
        this.currentMetadata = event.metadata || {};
      },
      handleMetadataChanged(event) {
        console.log(`Metadata ${event.action}:`, event);
        if (this.selectedItem && this.selectedItem.id === event.itemId) {
          // Update local view of metadata
          if (event.action === 'add') {
            this.currentMetadata = { ...this.currentMetadata, [event.metadataType]: event.metadata };
          } else if (event.action === 'remove') {
            const newMetadata = { ...this.currentMetadata };
            delete newMetadata[event.metadataType];
            this.currentMetadata = newMetadata;
          }
        }
      },
      addTestMetadata() {
        if (!this.selectedItem) return;
        
        const navigator = useECFRNavigator();
        navigator.setItemMetadata(this.selectedItem.id, {
          timestamp: new Date().toISOString(),
          testValue: Math.floor(Math.random() * 1000)
        }, 'testData');
      },
      removeMetadata() {
        if (!this.selectedItem) return;
        
        const navigator = useECFRNavigator();
        navigator.removeItemMetadata(this.selectedItem.id, 'testData');
      }
    }
  })
};

// Metadata processor example
export const MetadataProcessors = {
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: true,
        showMetadataBadges: true,
        itemSpacing: 'medium'
      }
    },
    itemMetadata: {
      'section-1-1': {
        xmlLink: {
          url: 'https://example.com/api/xml/section-1-1.xml',
          version: '2023-05-15'
        }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Example demonstrating metadata processors that transform raw metadata into a more usable format.'
      }
    }
  },
  render: (args) => ({
    components: { ECFRNavigator },
    setup() {
      // Register a metadata processor
      const navigator = useECFRNavigator();
      
      // Process XML link metadata to add additional properties
      navigator.registerMetadataProcessor('xmlLink', (metadata, itemId) => {
        return {
          ...metadata,
          displayUrl: metadata.url.replace('https://example.com/api/', ''),
          downloadUrl: `${metadata.url}?download=true`,
          lastUpdated: new Date(metadata.version).toLocaleDateString(),
          itemId
        };
      });
      
      return { args };
    },
    template: `
      <div>
        <div class="mb-4 p-3 bg-gray-100 rounded">
          <h3 class="font-medium mb-2">Metadata Processor</h3>
          <p class="text-sm mb-2">This example shows a registered metadata processor that transforms raw metadata.</p>
          <p class="text-sm">Select "Scope and Purpose" to see the processed metadata.</p>
          
          <div v-if="processedMetadata" class="mt-3">
            <div class="font-medium text-sm">Raw Metadata:</div>
            <pre class="bg-gray-200 p-2 rounded mt-1 text-xs">{{ JSON.stringify(rawMetadata, null, 2) }}</pre>
            
            <div class="font-medium text-sm mt-3">Processed Metadata:</div>
            <pre class="bg-gray-200 p-2 rounded mt-1 text-xs">{{ JSON.stringify(processedMetadata, null, 2) }}</pre>
          </div>
        </div>
        
        <ECFRNavigator 
          :items="args.items" 
          :options="args.options"
          :item-metadata="args.itemMetadata"
          @item-selected="handleItemSelected"
        />
      </div>
    `,
    data() {
      return {
        rawMetadata: null,
        processedMetadata: null
      };
    },
    methods: {
      handleItemSelected(event) {
        if (event.metadata && event.metadata.xmlLink) {
          this.rawMetadata = event.metadata.xmlLink;
          
          // Get the processed metadata
          const navigator = useECFRNavigator();
          this.processedMetadata = navigator.processItemMetadata(event.item.id, 'xmlLink');
        } else {
          this.rawMetadata = null;
          this.processedMetadata = null;
        }
      }
    }
  })
};