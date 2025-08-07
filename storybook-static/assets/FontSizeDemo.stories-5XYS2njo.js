import{E as o}from"./ECFRNavigator-D-HAEfL4.js";import"./ECFRSection-CJFRE6S2.js";import"./pinia-C5ekiB_t.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./ECFRBreadcrumb-D9-R7w7A.js";const S={title:"eCFR/Features/FontSizeDemo",component:o,parameters:{layout:"fullscreen",docs:{description:{component:"Interactive demo of the adaptive font sizing feature in the ECFRNavigator component."}}}},a=[{id:"title-1",type:"title",number:"1",title:"General Provisions",children:[{id:"part-1-1",type:"part",number:"1",title:"Definitions and Scope",children:[{id:"section-1-1-1",type:"section",number:"1.1",title:"Definitions",content:"<p>This section contains definitions of key terms used throughout the regulatory framework.</p><p>The following terms have the meanings provided below unless otherwise specified in a specific context:</p><ul><li><strong>Authority</strong>: A governmental body with regulatory power</li><li><strong>Regulation</strong>: A rule or directive made and maintained by an authority</li></ul>"},{id:"section-1-1-2",type:"section",number:"1.2",title:"Scope of Regulations",content:"<p>This section defines the scope and applicability of the regulations contained within this title.</p><p>These regulations apply to all entities under federal jurisdiction unless specifically exempted by statute or executive order.</p>"}]},{id:"part-1-2",type:"part",number:"2",title:"Administrative Requirements",children:[{id:"section-1-2-1",type:"section",number:"2.1",title:"Documentation Requirements",content:"<p>This section outlines the documentation requirements for regulatory compliance.</p><p>All regulated entities must maintain records for a minimum of 7 years and make such records available for inspection upon request by authorized officials.</p>"}]}]}],i={render:()=>({components:{ECFRNavigator:o},template:`
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">Adaptive Font Sizing Demo</h2>
        <p class="mb-4">This demo showcases the adaptive font sizing feature of the ECFRNavigator component. Try different font size settings and resize your browser window to see how the font adapts.</p>
        
        <div class="grid grid-cols-1 gap-4 mb-8">
          <div class="bg-white p-4 rounded shadow">
            <div class="mb-4">
              <h3 class="text-lg font-medium mb-2">Font Size Controls</h3>
              <div class="flex flex-wrap gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1">Font Size:</label>
                  <div class="flex items-center space-x-2">
                    <button @click="setFontSize('small')" :class="{'bg-blue-500 text-white': currentFontSize === 'small', 'bg-gray-200': currentFontSize !== 'small'}" class="px-3 py-1 rounded text-sm">Small</button>
                    <button @click="setFontSize('medium')" :class="{'bg-blue-500 text-white': currentFontSize === 'medium', 'bg-gray-200': currentFontSize !== 'medium'}" class="px-3 py-1 rounded text-sm">Medium</button>
                    <button @click="setFontSize('large')" :class="{'bg-blue-500 text-white': currentFontSize === 'large', 'bg-gray-200': currentFontSize !== 'large'}" class="px-3 py-1 rounded text-sm">Large</button>
                    <button @click="setFontSize('adaptive')" :class="{'bg-blue-500 text-white': currentFontSize === 'adaptive', 'bg-gray-200': currentFontSize !== 'adaptive'}" class="px-3 py-1 rounded text-sm">Adaptive</button>
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-1">View Mode:</label>
                  <div class="flex items-center space-x-2">
                    <button @click="setViewMode('compact')" :class="{'bg-blue-500 text-white': currentViewMode === 'compact', 'bg-gray-200': currentViewMode !== 'compact'}" class="px-3 py-1 rounded text-sm">Compact</button>
                    <button @click="setViewMode('standard')" :class="{'bg-blue-500 text-white': currentViewMode === 'standard', 'bg-gray-200': currentViewMode !== 'standard'}" class="px-3 py-1 rounded text-sm">Standard</button>
                    <button @click="setViewMode('detailed')" :class="{'bg-blue-500 text-white': currentViewMode === 'detailed', 'bg-gray-200': currentViewMode !== 'detailed'}" class="px-3 py-1 rounded text-sm">Detailed</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mb-4 px-4 py-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm">
              <strong>Tip:</strong> Try resizing your browser window when "Adaptive" font size is selected to see how the text adjusts automatically.
            </div>
          </div>
          
          <div :class="containerClass" class="h-[500px] relative border border-gray-300 rounded">
            <div class="absolute inset-0">
              <ECFRNavigator 
                :items="items"
                :options="options"
                @update:options="handleOptionsUpdate"
              />
            </div>
          </div>
        </div>
        
        <div class="bg-white p-4 rounded shadow">
          <h3 class="text-lg font-medium mb-2">How Adaptive Font Sizing Works</h3>
          <div class="prose prose-sm max-w-none">
            <p>The adaptive font sizing feature provides several benefits:</p>
            <ul>
              <li><strong>Improved readability</strong> across different devices and screen sizes</li>
              <li><strong>Accessibility enhancement</strong> for users with visual impairments</li>
              <li><strong>Responsive design</strong> that adjusts text size based on viewport width</li>
              <li><strong>View mode integration</strong> that coordinates font size with display density</li>
            </ul>
            <p>The feature uses CSS <code>clamp()</code> function to scale font sizes within an appropriate range based on the viewport size:</p>
            <pre class="bg-gray-100 p-2 rounded text-xs overflow-auto">
.ecfr-font-adaptive {
  font-size: clamp(0.875rem, 1vw + 0.5rem, 1.125rem);
}
            </pre>
            <p>This means the font size will never be smaller than <code>0.875rem</code> (14px) or larger than <code>1.125rem</code> (18px), but will scale fluidly between these values based on viewport width.</p>
          </div>
        </div>
      </div>
    `,data(){return{items:a,currentFontSize:"medium",currentViewMode:"standard",containerClass:"w-full",options:{showBreadcrumb:!0,theme:"light",display:{viewMode:"standard",showDescription:!0,showMetadataBadges:!0,itemSpacing:"medium",fontScaling:{enabled:!0,baseSize:"medium",scaleWithWidth:!1,responsive:!0}}}}},methods:{setFontSize(t){this.currentFontSize=t;const e=JSON.parse(JSON.stringify(this.options));t==="adaptive"?(e.display.fontScaling.enabled=!0,e.display.fontScaling.baseSize="medium",e.display.fontScaling.scaleWithWidth=!0,e.display.fontScaling.responsive=!0):(e.display.fontScaling.enabled=!0,e.display.fontScaling.baseSize=t,e.display.fontScaling.scaleWithWidth=!1,e.display.fontScaling.responsive=!0),this.options=e},setViewMode(t){this.currentViewMode=t;const e=JSON.parse(JSON.stringify(this.options));e.display.viewMode=t,this.options=e},handleOptionsUpdate(t){this.options=t}}})},n={render:()=>({components:{ECFRNavigator:o},template:`
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">Responsive Font Sizing</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div class="bg-white p-4 rounded shadow lg:col-span-3">
            <h3 class="text-lg font-medium mb-2">Responsive Breakpoints</h3>
            <p class="mb-2">This demo shows how adaptive font sizing adjusts to different screen widths. The example below simulates different device sizes.</p>
          </div>
          
          <!-- Mobile View -->
          <div class="bg-white p-4 rounded shadow">
            <h3 class="font-medium text-sm mb-2 pb-2 border-b">Mobile (320px width)</h3>
            <div class="w-[320px] h-[400px] mx-auto border border-gray-300 rounded relative overflow-hidden">
              <div class="absolute inset-0 scale-[0.8] origin-top-left">
                <ECFRNavigator 
                  :items="items"
                  :options="mobileOptions"
                />
              </div>
              <div class="absolute bottom-1 right-1 bg-gray-800 text-white text-xs px-1 rounded">320px</div>
            </div>
          </div>
          
          <!-- Tablet View -->
          <div class="bg-white p-4 rounded shadow">
            <h3 class="font-medium text-sm mb-2 pb-2 border-b">Tablet (768px width)</h3>
            <div class="w-[320px] h-[400px] mx-auto border border-gray-300 rounded relative overflow-hidden">
              <div class="absolute inset-0 scale-[0.8] origin-top-left">
                <ECFRNavigator 
                  :items="items"
                  :options="tabletOptions"
                />
              </div>
              <div class="absolute bottom-1 right-1 bg-gray-800 text-white text-xs px-1 rounded">768px</div>
            </div>
          </div>
          
          <!-- Desktop View -->
          <div class="bg-white p-4 rounded shadow">
            <h3 class="font-medium text-sm mb-2 pb-2 border-b">Desktop (1280px width)</h3>
            <div class="w-[320px] h-[400px] mx-auto border border-gray-300 rounded relative overflow-hidden">
              <div class="absolute inset-0 scale-[0.8] origin-top-left">
                <ECFRNavigator 
                  :items="items"
                  :options="desktopOptions"
                />
              </div>
              <div class="absolute bottom-1 right-1 bg-gray-800 text-white text-xs px-1 rounded">1280px</div>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-4 rounded shadow">
          <h3 class="text-lg font-medium mb-2">Responsive Font Sizing Implementation</h3>
          <div class="prose prose-sm max-w-none">
            <p>The adaptive font sizing uses CSS media queries and the clamp() function to provide responsive text:</p>
            <pre class="bg-gray-100 p-2 rounded text-xs overflow-auto">
/* Base adaptive font sizing */
.ecfr-font-adaptive {
  font-size: clamp(0.875rem, 1vw + 0.5rem, 1.125rem);
}

/* Small screens */
@media (max-width: 640px) {
  .ecfr-font-adaptive {
    font-size: 0.875rem; /* 14px */
  }
}

/* Large screens */
@media (min-width: 1280px) {
  .ecfr-font-adaptive {
    font-size: 1.125rem; /* 18px */
  }
}
            </pre>
            <p>This approach ensures:</p>
            <ul>
              <li>Smaller fonts on mobile devices to fit more content</li>
              <li>Medium-sized fonts on tablets for balanced readability</li>
              <li>Larger fonts on desktop screens for optimal reading comfort</li>
              <li>Smooth transitions between sizes as the viewport changes</li>
            </ul>
          </div>
        </div>
      </div>
    `,data(){return{items:a,mobileOptions:{showBreadcrumb:!0,theme:"light",display:{viewMode:"compact",showDescription:!1,showMetadataBadges:!0,itemSpacing:"tight",fontScaling:{enabled:!0,baseSize:"small",scaleWithWidth:!0,responsive:!0}}},tabletOptions:{showBreadcrumb:!0,theme:"light",display:{viewMode:"standard",showDescription:!1,showMetadataBadges:!0,itemSpacing:"medium",fontScaling:{enabled:!0,baseSize:"medium",scaleWithWidth:!0,responsive:!0}}},desktopOptions:{showBreadcrumb:!0,theme:"light",display:{viewMode:"detailed",showDescription:!0,showMetadataBadges:!0,itemSpacing:"loose",fontScaling:{enabled:!0,baseSize:"large",scaleWithWidth:!0,responsive:!0}}}}}})},s={render:()=>({components:{ECFRNavigator:o},template:`
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">Accessibility Improvements</h2>
        
        <div class="mb-4 text-sm bg-blue-50 border-l-4 border-blue-400 p-4">
          <p class="font-medium">Adaptive font sizing enhances accessibility in several ways:</p>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>Improves readability for users with visual impairments</li>
            <li>Reduces eye strain during extended reading sessions</li>
            <li>Maintains appropriate line length for easier scanning</li>
            <li>Adjusts automatically to user's device and preferences</li>
          </ul>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div class="bg-white p-4 rounded shadow">
            <h3 class="font-medium mb-2 pb-2 border-b">Standard Font Size</h3>
            <div class="h-[400px] border border-gray-300 rounded">
              <ECFRNavigator 
                :items="items"
                :options="standardOptions"
              />
            </div>
          </div>
          
          <div class="bg-white p-4 rounded shadow">
            <h3 class="font-medium mb-2 pb-2 border-b">Accessibility-Enhanced Font Size</h3>
            <div class="h-[400px] border border-gray-300 rounded">
              <ECFRNavigator 
                :items="items"
                :options="accessibleOptions"
              />
            </div>
          </div>
        </div>
        
        <div class="bg-white p-4 rounded shadow">
          <h3 class="text-lg font-medium mb-2">WCAG Compliance Benefits</h3>
          <div class="prose prose-sm max-w-none">
            <p>The adaptive font sizing feature helps meet several Web Content Accessibility Guidelines (WCAG) criteria:</p>
            <ul>
              <li><strong>1.4.4 Resize Text</strong> - Text can be resized without assistive technology up to 200% without loss of content or functionality</li>
              <li><strong>1.4.8 Visual Presentation</strong> - Providing options for users to select different text sizes</li>
              <li><strong>1.4.12 Text Spacing</strong> - No loss of content when text spacing is adjusted</li>
            </ul>
            <p>Additionally, the implementation considers:</p>
            <ul>
              <li>Sufficient color contrast between text and background</li>
              <li>Line height (space between lines) for better readability</li>
              <li>Letter spacing for improved legibility</li>
              <li>Proper focus indicators for keyboard navigation</li>
            </ul>
          </div>
        </div>
      </div>
    `,data(){return{items:a,standardOptions:{showBreadcrumb:!0,theme:"light",display:{viewMode:"standard",showDescription:!1,showMetadataBadges:!0,itemSpacing:"medium",fontScaling:{enabled:!0,baseSize:"medium",scaleWithWidth:!1,responsive:!1}}},accessibleOptions:{showBreadcrumb:!0,theme:"light",display:{viewMode:"detailed",showDescription:!0,showMetadataBadges:!0,itemSpacing:"loose",fontScaling:{enabled:!0,baseSize:"large",scaleWithWidth:!0,responsive:!0}}}}}})};var r,d,l;i.parameters={...i.parameters,docs:{...(r=i.parameters)==null?void 0:r.docs,source:{originalSource:`{
  render: () => ({
    components: {
      ECFRNavigator
    },
    template: \`
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">Adaptive Font Sizing Demo</h2>
        <p class="mb-4">This demo showcases the adaptive font sizing feature of the ECFRNavigator component. Try different font size settings and resize your browser window to see how the font adapts.</p>
        
        <div class="grid grid-cols-1 gap-4 mb-8">
          <div class="bg-white p-4 rounded shadow">
            <div class="mb-4">
              <h3 class="text-lg font-medium mb-2">Font Size Controls</h3>
              <div class="flex flex-wrap gap-4">
                <div>
                  <label class="block text-sm font-medium mb-1">Font Size:</label>
                  <div class="flex items-center space-x-2">
                    <button @click="setFontSize('small')" :class="{'bg-blue-500 text-white': currentFontSize === 'small', 'bg-gray-200': currentFontSize !== 'small'}" class="px-3 py-1 rounded text-sm">Small</button>
                    <button @click="setFontSize('medium')" :class="{'bg-blue-500 text-white': currentFontSize === 'medium', 'bg-gray-200': currentFontSize !== 'medium'}" class="px-3 py-1 rounded text-sm">Medium</button>
                    <button @click="setFontSize('large')" :class="{'bg-blue-500 text-white': currentFontSize === 'large', 'bg-gray-200': currentFontSize !== 'large'}" class="px-3 py-1 rounded text-sm">Large</button>
                    <button @click="setFontSize('adaptive')" :class="{'bg-blue-500 text-white': currentFontSize === 'adaptive', 'bg-gray-200': currentFontSize !== 'adaptive'}" class="px-3 py-1 rounded text-sm">Adaptive</button>
                  </div>
                </div>
                
                <div>
                  <label class="block text-sm font-medium mb-1">View Mode:</label>
                  <div class="flex items-center space-x-2">
                    <button @click="setViewMode('compact')" :class="{'bg-blue-500 text-white': currentViewMode === 'compact', 'bg-gray-200': currentViewMode !== 'compact'}" class="px-3 py-1 rounded text-sm">Compact</button>
                    <button @click="setViewMode('standard')" :class="{'bg-blue-500 text-white': currentViewMode === 'standard', 'bg-gray-200': currentViewMode !== 'standard'}" class="px-3 py-1 rounded text-sm">Standard</button>
                    <button @click="setViewMode('detailed')" :class="{'bg-blue-500 text-white': currentViewMode === 'detailed', 'bg-gray-200': currentViewMode !== 'detailed'}" class="px-3 py-1 rounded text-sm">Detailed</button>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="mb-4 px-4 py-3 bg-yellow-50 border-l-4 border-yellow-400 text-sm">
              <strong>Tip:</strong> Try resizing your browser window when "Adaptive" font size is selected to see how the text adjusts automatically.
            </div>
          </div>
          
          <div :class="containerClass" class="h-[500px] relative border border-gray-300 rounded">
            <div class="absolute inset-0">
              <ECFRNavigator 
                :items="items"
                :options="options"
                @update:options="handleOptionsUpdate"
              />
            </div>
          </div>
        </div>
        
        <div class="bg-white p-4 rounded shadow">
          <h3 class="text-lg font-medium mb-2">How Adaptive Font Sizing Works</h3>
          <div class="prose prose-sm max-w-none">
            <p>The adaptive font sizing feature provides several benefits:</p>
            <ul>
              <li><strong>Improved readability</strong> across different devices and screen sizes</li>
              <li><strong>Accessibility enhancement</strong> for users with visual impairments</li>
              <li><strong>Responsive design</strong> that adjusts text size based on viewport width</li>
              <li><strong>View mode integration</strong> that coordinates font size with display density</li>
            </ul>
            <p>The feature uses CSS <code>clamp()</code> function to scale font sizes within an appropriate range based on the viewport size:</p>
            <pre class="bg-gray-100 p-2 rounded text-xs overflow-auto">
.ecfr-font-adaptive {
  font-size: clamp(0.875rem, 1vw + 0.5rem, 1.125rem);
}
            </pre>
            <p>This means the font size will never be smaller than <code>0.875rem</code> (14px) or larger than <code>1.125rem</code> (18px), but will scale fluidly between these values based on viewport width.</p>
          </div>
        </div>
      </div>
    \`,
    data() {
      return {
        items: sampleData,
        currentFontSize: 'medium',
        currentViewMode: 'standard',
        containerClass: 'w-full',
        options: {
          showBreadcrumb: true,
          theme: 'light',
          display: {
            viewMode: 'standard',
            showDescription: true,
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
      setFontSize(size) {
        this.currentFontSize = size;

        // Update options object
        const newOptions = JSON.parse(JSON.stringify(this.options));
        if (size === 'adaptive') {
          newOptions.display.fontScaling.enabled = true;
          newOptions.display.fontScaling.baseSize = 'medium';
          newOptions.display.fontScaling.scaleWithWidth = true;
          newOptions.display.fontScaling.responsive = true;
        } else {
          newOptions.display.fontScaling.enabled = true;
          newOptions.display.fontScaling.baseSize = size;
          newOptions.display.fontScaling.scaleWithWidth = false;
          newOptions.display.fontScaling.responsive = true;
        }
        this.options = newOptions;
      },
      setViewMode(mode) {
        this.currentViewMode = mode;

        // Update options object
        const newOptions = JSON.parse(JSON.stringify(this.options));
        newOptions.display.viewMode = mode;
        this.options = newOptions;
      },
      handleOptionsUpdate(newOptions) {
        this.options = newOptions;
      }
    }
  })
}`,...(l=(d=i.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var p,c,m;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: () => ({
    components: {
      ECFRNavigator
    },
    template: \`
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">Responsive Font Sizing</h2>
        
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          <div class="bg-white p-4 rounded shadow lg:col-span-3">
            <h3 class="text-lg font-medium mb-2">Responsive Breakpoints</h3>
            <p class="mb-2">This demo shows how adaptive font sizing adjusts to different screen widths. The example below simulates different device sizes.</p>
          </div>
          
          <!-- Mobile View -->
          <div class="bg-white p-4 rounded shadow">
            <h3 class="font-medium text-sm mb-2 pb-2 border-b">Mobile (320px width)</h3>
            <div class="w-[320px] h-[400px] mx-auto border border-gray-300 rounded relative overflow-hidden">
              <div class="absolute inset-0 scale-[0.8] origin-top-left">
                <ECFRNavigator 
                  :items="items"
                  :options="mobileOptions"
                />
              </div>
              <div class="absolute bottom-1 right-1 bg-gray-800 text-white text-xs px-1 rounded">320px</div>
            </div>
          </div>
          
          <!-- Tablet View -->
          <div class="bg-white p-4 rounded shadow">
            <h3 class="font-medium text-sm mb-2 pb-2 border-b">Tablet (768px width)</h3>
            <div class="w-[320px] h-[400px] mx-auto border border-gray-300 rounded relative overflow-hidden">
              <div class="absolute inset-0 scale-[0.8] origin-top-left">
                <ECFRNavigator 
                  :items="items"
                  :options="tabletOptions"
                />
              </div>
              <div class="absolute bottom-1 right-1 bg-gray-800 text-white text-xs px-1 rounded">768px</div>
            </div>
          </div>
          
          <!-- Desktop View -->
          <div class="bg-white p-4 rounded shadow">
            <h3 class="font-medium text-sm mb-2 pb-2 border-b">Desktop (1280px width)</h3>
            <div class="w-[320px] h-[400px] mx-auto border border-gray-300 rounded relative overflow-hidden">
              <div class="absolute inset-0 scale-[0.8] origin-top-left">
                <ECFRNavigator 
                  :items="items"
                  :options="desktopOptions"
                />
              </div>
              <div class="absolute bottom-1 right-1 bg-gray-800 text-white text-xs px-1 rounded">1280px</div>
            </div>
          </div>
        </div>
        
        <div class="bg-white p-4 rounded shadow">
          <h3 class="text-lg font-medium mb-2">Responsive Font Sizing Implementation</h3>
          <div class="prose prose-sm max-w-none">
            <p>The adaptive font sizing uses CSS media queries and the clamp() function to provide responsive text:</p>
            <pre class="bg-gray-100 p-2 rounded text-xs overflow-auto">
/* Base adaptive font sizing */
.ecfr-font-adaptive {
  font-size: clamp(0.875rem, 1vw + 0.5rem, 1.125rem);
}

/* Small screens */
@media (max-width: 640px) {
  .ecfr-font-adaptive {
    font-size: 0.875rem; /* 14px */
  }
}

/* Large screens */
@media (min-width: 1280px) {
  .ecfr-font-adaptive {
    font-size: 1.125rem; /* 18px */
  }
}
            </pre>
            <p>This approach ensures:</p>
            <ul>
              <li>Smaller fonts on mobile devices to fit more content</li>
              <li>Medium-sized fonts on tablets for balanced readability</li>
              <li>Larger fonts on desktop screens for optimal reading comfort</li>
              <li>Smooth transitions between sizes as the viewport changes</li>
            </ul>
          </div>
        </div>
      </div>
    \`,
    data() {
      return {
        items: sampleData,
        mobileOptions: {
          showBreadcrumb: true,
          theme: 'light',
          display: {
            viewMode: 'compact',
            showDescription: false,
            showMetadataBadges: true,
            itemSpacing: 'tight',
            fontScaling: {
              enabled: true,
              baseSize: 'small',
              scaleWithWidth: true,
              responsive: true
            }
          }
        },
        tabletOptions: {
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
        },
        desktopOptions: {
          showBreadcrumb: true,
          theme: 'light',
          display: {
            viewMode: 'detailed',
            showDescription: true,
            showMetadataBadges: true,
            itemSpacing: 'loose',
            fontScaling: {
              enabled: true,
              baseSize: 'large',
              scaleWithWidth: true,
              responsive: true
            }
          }
        }
      };
    }
  })
}`,...(m=(c=n.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var u,b,h;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => ({
    components: {
      ECFRNavigator
    },
    template: \`
      <div class="p-4">
        <h2 class="text-2xl font-bold mb-4">Accessibility Improvements</h2>
        
        <div class="mb-4 text-sm bg-blue-50 border-l-4 border-blue-400 p-4">
          <p class="font-medium">Adaptive font sizing enhances accessibility in several ways:</p>
          <ul class="list-disc pl-5 mt-2 space-y-1">
            <li>Improves readability for users with visual impairments</li>
            <li>Reduces eye strain during extended reading sessions</li>
            <li>Maintains appropriate line length for easier scanning</li>
            <li>Adjusts automatically to user's device and preferences</li>
          </ul>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div class="bg-white p-4 rounded shadow">
            <h3 class="font-medium mb-2 pb-2 border-b">Standard Font Size</h3>
            <div class="h-[400px] border border-gray-300 rounded">
              <ECFRNavigator 
                :items="items"
                :options="standardOptions"
              />
            </div>
          </div>
          
          <div class="bg-white p-4 rounded shadow">
            <h3 class="font-medium mb-2 pb-2 border-b">Accessibility-Enhanced Font Size</h3>
            <div class="h-[400px] border border-gray-300 rounded">
              <ECFRNavigator 
                :items="items"
                :options="accessibleOptions"
              />
            </div>
          </div>
        </div>
        
        <div class="bg-white p-4 rounded shadow">
          <h3 class="text-lg font-medium mb-2">WCAG Compliance Benefits</h3>
          <div class="prose prose-sm max-w-none">
            <p>The adaptive font sizing feature helps meet several Web Content Accessibility Guidelines (WCAG) criteria:</p>
            <ul>
              <li><strong>1.4.4 Resize Text</strong> - Text can be resized without assistive technology up to 200% without loss of content or functionality</li>
              <li><strong>1.4.8 Visual Presentation</strong> - Providing options for users to select different text sizes</li>
              <li><strong>1.4.12 Text Spacing</strong> - No loss of content when text spacing is adjusted</li>
            </ul>
            <p>Additionally, the implementation considers:</p>
            <ul>
              <li>Sufficient color contrast between text and background</li>
              <li>Line height (space between lines) for better readability</li>
              <li>Letter spacing for improved legibility</li>
              <li>Proper focus indicators for keyboard navigation</li>
            </ul>
          </div>
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
            viewMode: 'detailed',
            showDescription: true,
            showMetadataBadges: true,
            itemSpacing: 'loose',
            fontScaling: {
              enabled: true,
              baseSize: 'large',
              scaleWithWidth: true,
              responsive: true
            }
          }
        }
      };
    }
  })
}`,...(h=(b=s.parameters)==null?void 0:b.docs)==null?void 0:h.source}}};const z=["InteractiveFontSizeDemo","ResponsiveBreakpointDemo","AccessibilityFontSizeDemo"];export{s as AccessibilityFontSizeDemo,i as InteractiveFontSizeDemo,n as ResponsiveBreakpointDemo,z as __namedExportsOrder,S as default};
