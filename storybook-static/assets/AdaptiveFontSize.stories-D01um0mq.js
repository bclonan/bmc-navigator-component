import{E as r}from"./ECFRNavigator-D-HAEfL4.js";import"./ECFRSection-CJFRE6S2.js";import"./pinia-C5ekiB_t.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./ECFRBreadcrumb-D9-R7w7A.js";const E={title:"eCFR/Features/AdaptiveFontSize",component:r,tags:["autodocs"],parameters:{docs:{description:{component:"Examples showcasing the adaptive font sizing capabilities of the ECFRNavigator component."}}},decorators:[()=>({template:'<div style="height: 650px; border: 1px solid #ccc; border-radius: 4px;"><story /></div>'})]},e=[{id:"title-1",type:"title",number:"1",title:"General Provisions",children:[{id:"part-1-1",type:"part",number:"1",title:"Definitions and Scope",children:[{id:"section-1-1-1",type:"section",number:"1.1",title:"Definitions",content:"<p>This section contains definitions of key terms used throughout the regulatory framework.</p>"},{id:"section-1-1-2",type:"section",number:"1.2",title:"Scope of Regulations",content:"<p>This section defines the scope and applicability of the regulations contained within this title.</p>"}]},{id:"part-1-2",type:"part",number:"2",title:"Administrative Requirements",children:[{id:"section-1-2-1",type:"section",number:"2.1",title:"Documentation Requirements",content:"<p>This section outlines the documentation requirements for regulatory compliance.</p>"}]}]}],t={args:{items:e,options:{showBreadcrumb:!0,theme:"light",display:{viewMode:"standard",showDescription:!1,showMetadataBadges:!0,itemSpacing:"medium",fontScaling:{enabled:!0,baseSize:"small",scaleWithWidth:!1,responsive:!1}}}},parameters:{docs:{description:{story:"Small font size setting for compact displays or when more content needs to fit in the available space."}}}},n={args:{items:e,options:{showBreadcrumb:!0,theme:"light",display:{viewMode:"standard",showDescription:!1,showMetadataBadges:!0,itemSpacing:"medium",fontScaling:{enabled:!0,baseSize:"medium",scaleWithWidth:!1,responsive:!1}}}},parameters:{docs:{description:{story:"Medium font size setting, which is the default size that balances readability and space efficiency."}}}},i={args:{items:e,options:{showBreadcrumb:!0,theme:"light",display:{viewMode:"standard",showDescription:!1,showMetadataBadges:!0,itemSpacing:"medium",fontScaling:{enabled:!0,baseSize:"large",scaleWithWidth:!1,responsive:!1}}}},parameters:{docs:{description:{story:"Large font size setting for improved readability, especially for users with visual impairments or on larger screens."}}}},s={args:{items:e,options:{showBreadcrumb:!0,theme:"light",display:{viewMode:"standard",showDescription:!1,showMetadataBadges:!0,itemSpacing:"medium",fontScaling:{enabled:!0,baseSize:"medium",scaleWithWidth:!0,responsive:!0}}}},parameters:{docs:{description:{story:"Adaptive font size that scales dynamically based on container width, providing optimal readability across different screen sizes."}}}},a={render:F=>({components:{ECFRNavigator:r},setup(){return{args:F}},template:`
      <div>
        <div class="p-3 bg-gray-100 mb-4 rounded">
          <div class="font-medium mb-2">Font Size & View Mode Controller</div>
          <div class="flex flex-wrap gap-4 mb-2">
            <div class="flex items-center">
              <span class="text-sm mr-2">Font Size:</span>
              <select 
                v-model="currentOptions.display.fontScaling.baseSize" 
                class="text-sm border rounded px-2 py-1"
                @change="updateOptions"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            
            <div class="flex items-center">
              <span class="text-sm mr-2">View Mode:</span>
              <select 
                v-model="currentOptions.display.viewMode" 
                class="text-sm border rounded px-2 py-1"
                @change="updateOptions"
              >
                <option value="compact">Compact</option>
                <option value="standard">Standard</option>
                <option value="detailed">Detailed</option>
              </select>
            </div>
            
            <label class="flex items-center text-sm">
              <input 
                type="checkbox" 
                v-model="currentOptions.display.fontScaling.scaleWithWidth" 
                @change="updateOptions"
                class="mr-1"
              >
              Adaptive Scaling
            </label>
          </div>
        </div>
        
        <ECFRNavigator 
          :items="args.items"
          :options="currentOptions"
          @update:options="handleOptionsUpdate"
        />
      </div>
    `,data(){return{currentOptions:{showBreadcrumb:!0,theme:"light",display:{viewMode:"standard",showDescription:!1,showMetadataBadges:!0,itemSpacing:"medium",fontScaling:{enabled:!0,baseSize:"medium",scaleWithWidth:!1,responsive:!0}}}}},methods:{updateOptions(){this.currentOptions=JSON.parse(JSON.stringify(this.currentOptions))},handleOptionsUpdate(W){this.currentOptions=W}}}),args:{items:e},parameters:{docs:{description:{story:"Interactive example showing how font size interacts with different view modes. Try changing both settings to see how they work together."}}}},o={render:()=>({components:{ECFRNavigator:r},template:`
      <div>
        <h3 class="text-lg font-medium mb-3">Accessibility Font Size Comparison</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="mb-2 text-sm font-medium">Standard Font Size</p>
            <div class="h-80 border border-gray-300 rounded overflow-hidden">
              <ECFRNavigator 
                :items="items"
                :options="standardOptions"
              />
            </div>
          </div>
          
          <div>
            <p class="mb-2 text-sm font-medium">Large Font Size (Improved Accessibility)</p>
            <div class="h-80 border border-gray-300 rounded overflow-hidden">
              <ECFRNavigator 
                :items="items"
                :options="accessibleOptions"
              />
            </div>
          </div>
        </div>
        
        <div class="mt-4 p-3 bg-gray-100 rounded text-sm">
          <p class="font-medium mb-1">Accessibility Benefits:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Larger text improves readability for users with visual impairments</li>
            <li>Better readability reduces cognitive load when scanning complex regulatory documents</li>
            <li>Proper contrast ratios maintained across font sizes</li>
            <li>Increased spacing improves focus for users with cognitive disabilities</li>
          </ul>
        </div>
      </div>
    `,data(){return{items:e,standardOptions:{showBreadcrumb:!0,theme:"light",display:{viewMode:"standard",showDescription:!1,showMetadataBadges:!0,itemSpacing:"medium",fontScaling:{enabled:!0,baseSize:"medium",scaleWithWidth:!1,responsive:!1}}},accessibleOptions:{showBreadcrumb:!0,theme:"light",display:{viewMode:"standard",showDescription:!1,showMetadataBadges:!0,itemSpacing:"loose",fontScaling:{enabled:!0,baseSize:"large",scaleWithWidth:!1,responsive:!1}}}}}}),parameters:{docs:{description:{story:"This example illustrates how font size adjustments can improve accessibility for users with visual impairments or reading difficulties."}}}};var d,l,c;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: false,
        showMetadataBadges: true,
        itemSpacing: 'medium',
        fontScaling: {
          enabled: true,
          baseSize: 'small',
          scaleWithWidth: false,
          responsive: false
        }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Small font size setting for compact displays or when more content needs to fit in the available space.'
      }
    }
  }
}`,...(c=(l=t.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};var p,m,u;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: false,
        showMetadataBadges: true,
        itemSpacing: 'medium',
        fontScaling: {
          enabled: true,
          baseSize: 'medium',
          scaleWithWidth: false,
          responsive: false
        }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium font size setting, which is the default size that balances readability and space efficiency.'
      }
    }
  }
}`,...(u=(m=n.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var h,g,v;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: false,
        showMetadataBadges: true,
        itemSpacing: 'medium',
        fontScaling: {
          enabled: true,
          baseSize: 'large',
          scaleWithWidth: false,
          responsive: false
        }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Large font size setting for improved readability, especially for users with visual impairments or on larger screens.'
      }
    }
  }
}`,...(v=(g=i.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var f,b,w;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    items: sampleData,
    options: {
      showBreadcrumb: true,
      theme: 'light',
      display: {
        viewMode: 'standard',
        showDescription: false,
        showMetadataBadges: true,
        itemSpacing: 'medium',
        fontScaling: {
          enabled: true,
          baseSize: 'medium',
          scaleWithWidth: true,
          responsive: true
        }
      }
    }
  },
  parameters: {
    docs: {
      description: {
        story: 'Adaptive font size that scales dynamically based on container width, providing optimal readability across different screen sizes.'
      }
    }
  }
}`,...(w=(b=s.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var y,S,z;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
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
        <div class="p-3 bg-gray-100 mb-4 rounded">
          <div class="font-medium mb-2">Font Size & View Mode Controller</div>
          <div class="flex flex-wrap gap-4 mb-2">
            <div class="flex items-center">
              <span class="text-sm mr-2">Font Size:</span>
              <select 
                v-model="currentOptions.display.fontScaling.baseSize" 
                class="text-sm border rounded px-2 py-1"
                @change="updateOptions"
              >
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            
            <div class="flex items-center">
              <span class="text-sm mr-2">View Mode:</span>
              <select 
                v-model="currentOptions.display.viewMode" 
                class="text-sm border rounded px-2 py-1"
                @change="updateOptions"
              >
                <option value="compact">Compact</option>
                <option value="standard">Standard</option>
                <option value="detailed">Detailed</option>
              </select>
            </div>
            
            <label class="flex items-center text-sm">
              <input 
                type="checkbox" 
                v-model="currentOptions.display.fontScaling.scaleWithWidth" 
                @change="updateOptions"
                class="mr-1"
              >
              Adaptive Scaling
            </label>
          </div>
        </div>
        
        <ECFRNavigator 
          :items="args.items"
          :options="currentOptions"
          @update:options="handleOptionsUpdate"
        />
      </div>
    \`,
    data() {
      return {
        currentOptions: {
          showBreadcrumb: true,
          theme: 'light',
          display: {
            viewMode: 'standard',
            showDescription: false,
            showMetadataBadges: true,
            itemSpacing: 'medium',
            fontScaling: {
              enabled: true,
              baseSize: 'medium',
              scaleWithWidth: false,
              responsive: true
            }
          }
        }
      };
    },
    methods: {
      updateOptions() {
        // Create a deep clone to ensure reactivity
        this.currentOptions = JSON.parse(JSON.stringify(this.currentOptions));
      },
      handleOptionsUpdate(newOptions) {
        this.currentOptions = newOptions;
      }
    }
  }),
  args: {
    items: sampleData
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive example showing how font size interacts with different view modes. Try changing both settings to see how they work together.'
      }
    }
  }
}`,...(z=(S=a.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};var x,O,M;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => ({
    components: {
      ECFRNavigator
    },
    template: \`
      <div>
        <h3 class="text-lg font-medium mb-3">Accessibility Font Size Comparison</h3>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="mb-2 text-sm font-medium">Standard Font Size</p>
            <div class="h-80 border border-gray-300 rounded overflow-hidden">
              <ECFRNavigator 
                :items="items"
                :options="standardOptions"
              />
            </div>
          </div>
          
          <div>
            <p class="mb-2 text-sm font-medium">Large Font Size (Improved Accessibility)</p>
            <div class="h-80 border border-gray-300 rounded overflow-hidden">
              <ECFRNavigator 
                :items="items"
                :options="accessibleOptions"
              />
            </div>
          </div>
        </div>
        
        <div class="mt-4 p-3 bg-gray-100 rounded text-sm">
          <p class="font-medium mb-1">Accessibility Benefits:</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>Larger text improves readability for users with visual impairments</li>
            <li>Better readability reduces cognitive load when scanning complex regulatory documents</li>
            <li>Proper contrast ratios maintained across font sizes</li>
            <li>Increased spacing improves focus for users with cognitive disabilities</li>
          </ul>
        </div>
      </div>
    \`,
    data() {
      return {
        items: sampleData,
        standardOptions: {
          showBreadcrumb: true,
          theme: 'light',
          display: {
            viewMode: 'standard',
            showDescription: false,
            showMetadataBadges: true,
            itemSpacing: 'medium',
            fontScaling: {
              enabled: true,
              baseSize: 'medium',
              scaleWithWidth: false,
              responsive: false
            }
          }
        },
        accessibleOptions: {
          showBreadcrumb: true,
          theme: 'light',
          display: {
            viewMode: 'standard',
            showDescription: false,
            showMetadataBadges: true,
            itemSpacing: 'loose',
            fontScaling: {
              enabled: true,
              baseSize: 'large',
              scaleWithWidth: false,
              responsive: false
            }
          }
        }
      };
    }
  }),
  parameters: {
    docs: {
      description: {
        story: 'This example illustrates how font size adjustments can improve accessibility for users with visual impairments or reading difficulties.'
      }
    }
  }
}`,...(M=(O=o.parameters)==null?void 0:O.docs)==null?void 0:M.source}}};const L=["SmallFontSize","MediumFontSize","LargeFontSize","AdaptiveFontSize","FontSizeWithViewModes","AccessibilityComparison"];export{o as AccessibilityComparison,s as AdaptiveFontSize,a as FontSizeWithViewModes,i as LargeFontSize,n as MediumFontSize,t as SmallFontSize,L as __namedExportsOrder,E as default};
