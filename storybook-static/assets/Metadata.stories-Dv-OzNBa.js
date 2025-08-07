import{E as u}from"./ECFRNavigator-D-HAEfL4.js";import{u as L}from"./ECFRSection-CJFRE6S2.js";import"./ECFRBreadcrumb-D9-R7w7A.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./pinia-C5ekiB_t.js";function p(){const a=L();return{setData(e){a.setRootItems(e)},navigateTo(e){const t=(h,g,N=[])=>{for(let d=0;d<h.length;d++){const s=h[d],v=[...N,{item:s,index:d}];if(s.id===g)return{item:s,path:v};if(s.children&&s.children.length>0){const M=t(s.children,g,v);if(M)return M}}return null},n=t(a.rootItems,e);return n?(a.navigateToPath(n.path),!0):!1},expandItem(e){a.expandItem(e)},collapseItem(e){a.collapseItem(e)},expandAll(){a.expandAll()},collapseAll(){a.collapseAll()},getCitationPath(){return a.currentPath.map(e=>{const t=e.item;return t.type&&t.number?`${t.type} ${t.number}`:t.title}).join(" > ")},getRootItems(){return a.rootItems},getCurrentItem(){return a.currentItem},getCurrentPath(){return a.currentPath},getBreadcrumbPath(){return a.breadcrumbPath},setItemMetadata(e,t,n){a.setItemMetadata(e,t,n)},getItemMetadata(e,t){return a.getItemMetadata(e,t)},getCurrentItemMetadata(e){return!a.currentItem||!a.currentItem.id?null:a.getItemMetadata(a.currentItem.id,e)},processItemMetadata(e,t){return a.processItemMetadata(e,t)},removeItemMetadata(e,t){a.removeItemMetadata(e,t)},registerMetadataProcessor(e,t){a.registerMetadataProcessor(e,t)},unregisterMetadataProcessor(e){a.unregisterMetadataProcessor(e)}}}const G={title:"eCFR/Features/Metadata",component:u,tags:["autodocs"],parameters:{docs:{description:{component:"Examples demonstrating the metadata capabilities of the ECFRNavigator component, including metadata badges, processors, and external resource connections."}}},decorators:[()=>({template:'<div style="height: 650px; border: 1px solid #ccc; border-radius: 4px;"><story /></div>'})]},r=[{id:"title-1",type:"title",number:"1",title:"General Provisions",children:[{id:"part-1",type:"part",number:"1",title:"Definitions",children:[{id:"section-1-1",type:"section",number:"1.1",title:"Scope and Purpose",content:"<p>This section defines the scope and purpose of these regulations.</p>"},{id:"section-1-2",type:"section",number:"1.2",title:"Terminology",content:"<p>This section provides definitions for terminology used throughout the regulations.</p>"}]}]}],i={args:{items:r,options:{showBreadcrumb:!0,theme:"light",display:{viewMode:"standard",showDescription:!0,showMetadataBadges:!0,itemSpacing:"medium"}},itemMetadata:{"section-1-1":{xmlLink:{url:"https://example.com/api/xml/section-1-1.xml",version:"2023-05-15"}},"section-1-2":{references:[{type:"related",id:"section-2-1",title:"Related Procedures"}]}}},parameters:{docs:{description:{story:"Basic example showing metadata badges on items that have associated metadata."}}}},o={args:{items:r,options:{showBreadcrumb:!0,theme:"light",display:{viewMode:"standard",showDescription:!0,showMetadataBadges:!0,itemSpacing:"medium"}},itemMetadata:{"section-1-1":{xmlLink:{url:"https://example.com/api/xml/section-1-1.xml",version:"2023-05-15"},renderTarget:{elementId:"content-viewer",mode:"replace"},externalReferences:[{type:"regulation",id:"reg-456",title:"Related Regulation"},{type:"guidance",id:"guide-789",title:"Implementation Guide"}]}}},parameters:{docs:{description:{story:"Example showing items with multiple types of metadata attached."}}}},m={args:{items:r,options:{showBreadcrumb:!0,theme:"light",display:{viewMode:"detailed",showDescription:!0,showMetadataBadges:!0,itemSpacing:"medium"}},itemMetadata:{"section-1-1":{xmlLink:{url:"https://example.com/api/xml/section-1-1.xml",version:"2023-05-15"},renderTarget:{elementId:"content-viewer",mode:"replace"},status:{state:"active",effectiveDate:"2023-01-01",lastReviewed:"2023-04-15"}}}},parameters:{docs:{description:{story:"Detailed view mode showing more comprehensive metadata display."}}}},l={args:{items:r,options:{showBreadcrumb:!0,theme:"light",display:{viewMode:"standard",showDescription:!0,showMetadataBadges:!0,itemSpacing:"medium"}},itemMetadata:{"section-1-1":{status:{state:"review",lastUpdated:"2023-05-10"}}}},parameters:{docs:{description:{story:"Example showing how metadata can be dynamically updated. The code example demonstrates updating metadata when an item is selected."}}},render:a=>({components:{ECFRNavigator:u},setup(){return{args:a}},template:`
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
    `,data(){return{selectedItem:null,currentMetadata:null}},methods:{handleItemSelected(e){this.selectedItem=e.item,this.currentMetadata=e.metadata||{}},handleMetadataChanged(e){if(console.log(`Metadata ${e.action}:`,e),this.selectedItem&&this.selectedItem.id===e.itemId){if(e.action==="add")this.currentMetadata={...this.currentMetadata,[e.metadataType]:e.metadata};else if(e.action==="remove"){const t={...this.currentMetadata};delete t[e.metadataType],this.currentMetadata=t}}},addTestMetadata(){if(!this.selectedItem)return;p().setItemMetadata(this.selectedItem.id,{timestamp:new Date().toISOString(),testValue:Math.floor(Math.random()*1e3)},"testData")},removeMetadata(){if(!this.selectedItem)return;p().removeItemMetadata(this.selectedItem.id,"testData")}}})},c={args:{items:r,options:{showBreadcrumb:!0,theme:"light",display:{viewMode:"standard",showDescription:!0,showMetadataBadges:!0,itemSpacing:"medium"}},itemMetadata:{"section-1-1":{xmlLink:{url:"https://example.com/api/xml/section-1-1.xml",version:"2023-05-15"}}}},parameters:{docs:{description:{story:"Example demonstrating metadata processors that transform raw metadata into a more usable format."}}},render:a=>({components:{ECFRNavigator:u},setup(){return p().registerMetadataProcessor("xmlLink",(t,n)=>({...t,displayUrl:t.url.replace("https://example.com/api/",""),downloadUrl:`${t.url}?download=true`,lastUpdated:new Date(t.version).toLocaleDateString(),itemId:n})),{args:a}},template:`
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
    `,data(){return{rawMetadata:null,processedMetadata:null}},methods:{handleItemSelected(e){if(e.metadata&&e.metadata.xmlLink){this.rawMetadata=e.metadata.xmlLink;const t=p();this.processedMetadata=t.processItemMetadata(e.item.id,"xmlLink")}else this.rawMetadata=null,this.processedMetadata=null}}})};var x,w,y;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
        references: [{
          type: 'related',
          id: 'section-2-1',
          title: 'Related Procedures'
        }]
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
}`,...(y=(w=i.parameters)==null?void 0:w.docs)==null?void 0:y.source}}};var f,b,I;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
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
        externalReferences: [{
          type: 'regulation',
          id: 'reg-456',
          title: 'Related Regulation'
        }, {
          type: 'guidance',
          id: 'guide-789',
          title: 'Implementation Guide'
        }]
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
}`,...(I=(b=o.parameters)==null?void 0:b.docs)==null?void 0:I.source}}};var S,D,R;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(R=(D=m.parameters)==null?void 0:D.docs)==null?void 0:R.source}}};var B,C,P;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`{
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
  render: args => ({
    components: {
      ECFRNavigator
    },
    setup() {
      return {
        args
      };
    },
    template: \`
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
    \`,
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
        console.log(\`Metadata \${event.action}:\`, event);
        if (this.selectedItem && this.selectedItem.id === event.itemId) {
          // Update local view of metadata
          if (event.action === 'add') {
            this.currentMetadata = {
              ...this.currentMetadata,
              [event.metadataType]: event.metadata
            };
          } else if (event.action === 'remove') {
            const newMetadata = {
              ...this.currentMetadata
            };
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
}`,...(P=(C=l.parameters)==null?void 0:C.docs)==null?void 0:P.source}}};var T,k,E;c.parameters={...c.parameters,docs:{...(T=c.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
  render: args => ({
    components: {
      ECFRNavigator
    },
    setup() {
      // Register a metadata processor
      const navigator = useECFRNavigator();

      // Process XML link metadata to add additional properties
      navigator.registerMetadataProcessor('xmlLink', (metadata, itemId) => {
        return {
          ...metadata,
          displayUrl: metadata.url.replace('https://example.com/api/', ''),
          downloadUrl: \`\${metadata.url}?download=true\`,
          lastUpdated: new Date(metadata.version).toLocaleDateString(),
          itemId
        };
      });
      return {
        args
      };
    },
    template: \`
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
    \`,
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
}`,...(E=(k=c.parameters)==null?void 0:k.docs)==null?void 0:E.source}}};const _=["BasicMetadataBadges","MultipleMetadataTypes","DetailedMetadataDisplay","DynamicMetadataUpdate","MetadataProcessors"];export{i as BasicMetadataBadges,m as DetailedMetadataDisplay,l as DynamicMetadataUpdate,c as MetadataProcessors,o as MultipleMetadataTypes,_ as __namedExportsOrder,G as default};
