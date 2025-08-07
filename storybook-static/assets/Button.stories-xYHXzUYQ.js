import{M as n}from"./MButton-BLV5TnM3.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const P={title:"Core Components/Buttons & Actions/Button",component:n,parameters:{layout:"centered",docs:{description:{component:"Material-UI Button component with Your Town Finance brand styling. Optimized for financial applications with comprehensive accessibility support, loading states, and interactive controls for testing all variants."},canvas:{sourceState:"shown"}},backgrounds:{default:"yourtownfinance-light",values:[{name:"yourtownfinance-light",value:"#ffffff"},{name:"yourtownfinance-surface",value:"#f4f4f4"},{name:"financial-green",value:"rgb(249, 255, 250)"},{name:"contrast-test",value:"#000000"}]}},argTypes:{text:{control:{type:"text"},description:"Button text content - should be descriptive for accessibility",defaultValue:"Button",table:{type:{summary:"string"},defaultValue:{summary:"Button"}}},variant:{control:{type:"select"},options:["filled","outlined","text"],description:"Visual style variant - filled for primary actions, outlined for secondary",defaultValue:"filled",table:{type:{summary:"string"},defaultValue:{summary:"filled"}}},color:{control:{type:"select"},options:["default","primary","secondary","success","warning","error","info"],description:"Color scheme - primary/secondary use Your Town Finance brand colors",defaultValue:"primary",table:{type:{summary:"string"},defaultValue:{summary:"primary"}}},size:{control:{type:"select"},options:["small","medium","large"],description:"Button size - affects padding, font size, and touch target",defaultValue:"medium",table:{type:{summary:"string"},defaultValue:{summary:"medium"}}},disabled:{control:{type:"boolean"},description:"Disables interaction and reduces opacity for visual feedback",defaultValue:!1},loading:{control:{type:"boolean"},description:"Shows loading spinner and prevents interaction during async operations",defaultValue:!1},fullWidth:{control:{type:"boolean"},description:"Makes button expand to full container width",defaultValue:!1}}},a=W=>({components:{MButton:n},setup(){return{args:W}},template:`
    <div class="space-y-6">
      <div class="text-center">
        <h3 class="text-lg font-semibold mb-4">Interactive Button Playground</h3>
        <p class="text-gray-600 mb-6">Use the controls panel to test different configurations</p>
      </div>
      
      <div class="flex justify-center">
        <MButton 
          v-bind="args" 
          @click="onClick"
          :class="getButtonClass(args)"
        />
      </div>
      
      <div class="text-center text-sm text-gray-500">
        Click the button to test interaction. Check the Actions panel for event details.
      </div>
    </div>
  `,methods:{onClick(){console.log("Button clicked with configuration:",this.args)},getButtonClass(t){return t.variant==="filled"&&t.color==="primary"?"mf-button-primary":t.variant==="filled"&&t.color==="secondary"?"mf-button-secondary":t.variant==="outlined"&&t.color==="primary"?"mf-button-outlined-primary":t.variant==="outlined"&&t.color==="secondary"?"mf-button-outlined-secondary":""}}});a.args={text:"Apply for Loan",variant:"filled",color:"primary",size:"medium",disabled:!1,loading:!1,fullWidth:!1};const i=()=>({components:{MButton:n},template:`
    <div class="space-y-8">
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Primary Brand Buttons</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MButton 
            text="Apply Now" 
            variant="filled" 
            color="primary" 
            size="large"
            class="mf-button-primary" 
          />
          <MButton 
            text="Get Started" 
            variant="filled" 
            color="primary" 
            class="mf-button-primary" 
          />
          <MButton 
            text="Learn More" 
            variant="filled" 
            color="primary" 
            size="small"
            class="mf-button-primary" 
          />
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Secondary Actions</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MButton 
            text="Contact Support" 
            variant="filled" 
            color="secondary" 
            size="large"
            class="mf-button-secondary" 
          />
          <MButton 
            text="View Account" 
            variant="filled" 
            color="secondary" 
            class="mf-button-secondary" 
          />
          <MButton 
            text="Help Center" 
            variant="filled" 
            color="secondary" 
            size="small"
            class="mf-button-secondary" 
          />
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Outlined Variants</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MButton 
            text="View Details" 
            variant="outlined" 
            color="primary" 
            class="mf-button-outlined-primary" 
          />
          <MButton 
            text="Save for Later" 
            variant="outlined" 
            color="secondary" 
            class="mf-button-outlined-secondary" 
          />
          <MButton 
            text="Download PDF" 
            variant="outlined" 
            color="primary" 
            icon="fas fa-download"
          />
        </div>
      </div>
    </div>
  `}),e=()=>({components:{MButton:n},template:`
    <div class="space-y-8">
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Loan Application Actions</h3>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MButton 
              text="Apply for Personal Loan" 
              variant="filled" 
              color="primary" 
              icon="fas fa-money-bill-wave"
              size="large"
              fullWidth
              class="mf-button-primary" 
            />
            <MButton 
              text="Check Loan Status" 
              variant="outlined" 
              color="primary" 
              icon="fas fa-search"
              size="large"
              fullWidth
              class="mf-button-outlined-primary" 
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MButton 
              text="Calculate Payment" 
              variant="text" 
              color="primary" 
              icon="fas fa-calculator"
            />
            <MButton 
              text="Pre-qualify" 
              variant="text" 
              color="primary" 
              icon="fas fa-check-circle"
            />
            <MButton 
              text="Rate Comparison" 
              variant="text" 
              color="primary" 
              icon="fas fa-chart-bar"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Account Management</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MButton 
            text="Make Payment" 
            variant="filled" 
            color="success" 
            icon="fas fa-credit-card"
            fullWidth
          />
          <MButton 
            text="View Statements" 
            variant="outlined" 
            color="secondary" 
            icon="fas fa-file-alt"
            fullWidth
          />
          <MButton 
            text="Update Profile" 
            variant="outlined" 
            color="primary" 
            icon="fas fa-user-edit"
            fullWidth
          />
          <MButton 
            text="Contact Support" 
            variant="filled" 
            color="secondary" 
            icon="fas fa-headset"
            fullWidth
            class="mf-button-secondary" 
          />
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Status Indicators</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MButton 
            text="Approved" 
            variant="filled" 
            color="success" 
            icon="fas fa-check-circle"
            disabled
          />
          <MButton 
            text="Pending Review" 
            variant="filled" 
            color="warning" 
            icon="fas fa-clock"
            disabled
          />
          <MButton 
            text="Action Required" 
            variant="filled" 
            color="error" 
            icon="fas fa-exclamation-triangle"
          />
        </div>
      </div>
    </div>
  `}),o=()=>({components:{MButton:n},template:`
    <div class="space-y-8">
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Processing States</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h4 class="font-medium text-gray-700">Application Processing</h4>
            <MButton 
              text="Processing Application" 
              variant="filled" 
              color="primary" 
              loading
              fullWidth
              class="mf-button-primary" 
            />
            <MButton 
              text="Verifying Information" 
              variant="filled" 
              color="secondary" 
              loading
              loadingText="Please wait..."
              fullWidth
              class="mf-button-secondary" 
            />
          </div>
          
          <div class="space-y-4">
            <h4 class="font-medium text-gray-700">Payment Processing</h4>
            <MButton 
              text="Processing Payment" 
              variant="filled" 
              color="success" 
              loading
              fullWidth
            />
            <MButton 
              text="Submitting" 
              variant="outlined" 
              color="primary" 
              loading
              loadingText="Submitting..."
              fullWidth
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Interactive Loading Demo</h3>
        <div class="text-center">
          <p class="text-gray-600 mb-4">Click the button to see loading state transition</p>
          <MButton 
            text="Submit Application" 
            variant="filled" 
            color="primary" 
            size="large"
            class="mf-button-primary"
            @click="simulateLoading"
            :loading="isLoading"
            :loadingText="loadingText"
          />
        </div>
      </div>
    </div>
  `,data(){return{isLoading:!1,loadingText:"Processing..."}},methods:{simulateLoading(){this.isLoading=!0,this.loadingText="Processing application...",setTimeout(()=>{this.loadingText="Verifying information..."},1e3),setTimeout(()=>{this.loadingText="Finalizing..."},2e3),setTimeout(()=>{this.isLoading=!1,alert("Application submitted successfully!")},3e3)}}}),r=()=>({components:{MButton:n},template:`
    <div class="space-y-8">
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Keyboard Navigation Test</h3>
        <p class="text-gray-600 mb-4">Use Tab to navigate, Enter/Space to activate buttons</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MButton 
            text="First Button" 
            variant="filled" 
            color="primary" 
            aria-label="First navigation button for testing keyboard access"
            class="mf-button-primary" 
          />
          <MButton 
            text="Second Button" 
            variant="outlined" 
            color="secondary" 
            aria-describedby="second-help"
            class="mf-button-outlined-secondary" 
          />
          <MButton 
            text="Third Button" 
            variant="text" 
            color="primary" 
            aria-label="Third button completes keyboard navigation test"
          />
        </div>
        <div id="second-help" class="text-xs text-gray-500 mt-2">
          This button demonstrates ARIA describedby attribute usage
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Color Contrast Validation</h3>
        <p class="text-gray-600 mb-4">All buttons meet WCAG 2.1 AA contrast requirements</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-4 bg-white border rounded">
            <h4 class="font-medium mb-3">Light Backgrounds</h4>
            <div class="space-y-2">
              <MButton text="Primary on Light" color="primary" variant="filled" fullWidth class="mf-button-primary" />
              <MButton text="Secondary on Light" color="secondary" variant="filled" fullWidth class="mf-button-secondary" />
              <MButton text="Success on Light" color="success" variant="filled" fullWidth />
            </div>
          </div>
          
          <div class="p-4 bg-gray-100 border rounded">
            <h4 class="font-medium mb-3">Gray Backgrounds</h4>
            <div class="space-y-2">
              <MButton text="Primary on Gray" color="primary" variant="filled" fullWidth class="mf-button-primary" />
              <MButton text="Outlined on Gray" color="primary" variant="outlined" fullWidth class="mf-button-outlined-primary" />
              <MButton text="Text on Gray" color="primary" variant="text" fullWidth />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Touch Target Size</h3>
        <p class="text-gray-600 mb-4">All buttons meet minimum 44px touch target requirements</p>
        <div class="space-y-4">
          <MButton 
            text="Large Touch Target" 
            variant="filled" 
            color="primary" 
            size="large"
            fullWidth
            class="mf-button-primary min-h-[48px]" 
          />
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MButton 
              text="Adequate Spacing" 
              variant="outlined" 
              color="primary" 
              fullWidth
              class="mf-button-outlined-primary min-h-[44px]" 
            />
            <MButton 
              text="Touch Friendly" 
              variant="filled" 
              color="secondary" 
              fullWidth
              class="mf-button-secondary min-h-[44px]" 
            />
          </div>
        </div>
      </div>
    </div>
  `}),l=()=>({components:{MButton:n},template:`
    <div class="space-y-8">
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Button Sizes</h3>
        <div class="space-y-6">
          <div>
            <h4 class="font-medium mb-3 text-gray-700">Filled Buttons</h4>
            <div class="flex flex-wrap items-center gap-4">
              <MButton text="Small" variant="filled" color="primary" size="small" class="mf-button-primary" />
              <MButton text="Medium" variant="filled" color="primary" size="medium" class="mf-button-primary" />
              <MButton text="Large" variant="filled" color="primary" size="large" class="mf-button-primary" />
            </div>
          </div>
          
          <div>
            <h4 class="font-medium mb-3 text-gray-700">Outlined Buttons</h4>
            <div class="flex flex-wrap items-center gap-4">
              <MButton text="Small" variant="outlined" color="primary" size="small" class="mf-button-outlined-primary" />
              <MButton text="Medium" variant="outlined" color="primary" size="medium" class="mf-button-outlined-primary" />
              <MButton text="Large" variant="outlined" color="primary" size="large" class="mf-button-outlined-primary" />
            </div>
          </div>
          
          <div>
            <h4 class="font-medium mb-3 text-gray-700">Text Buttons</h4>
            <div class="flex flex-wrap items-center gap-4">
              <MButton text="Small" variant="text" color="primary" size="small" />
              <MButton text="Medium" variant="text" color="primary" size="medium" />
              <MButton text="Large" variant="text" color="primary" size="large" />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Full Width Examples</h3>
        <div class="max-w-md space-y-4">
          <MButton 
            text="Apply for Personal Loan" 
            variant="filled" 
            color="primary" 
            fullWidth
            size="large"
            class="mf-button-primary" 
          />
          <MButton 
            text="Check Your Rate" 
            variant="outlined" 
            color="primary" 
            fullWidth
            class="mf-button-outlined-primary" 
          />
          <MButton 
            text="Contact a Specialist" 
            variant="filled" 
            color="secondary" 
            fullWidth
            class="mf-button-secondary" 
          />
        </div>
      </div>
    </div>
  `});var s,d,c;a.parameters={...a.parameters,docs:{...(s=a.parameters)==null?void 0:s.docs,source:{originalSource:`args => ({
  components: {
    MButton
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <div class="space-y-6">
      <div class="text-center">
        <h3 class="text-lg font-semibold mb-4">Interactive Button Playground</h3>
        <p class="text-gray-600 mb-6">Use the controls panel to test different configurations</p>
      </div>
      
      <div class="flex justify-center">
        <MButton 
          v-bind="args" 
          @click="onClick"
          :class="getButtonClass(args)"
        />
      </div>
      
      <div class="text-center text-sm text-gray-500">
        Click the button to test interaction. Check the Actions panel for event details.
      </div>
    </div>
  \`,
  methods: {
    onClick() {
      console.log('Button clicked with configuration:', this.args);
    },
    getButtonClass(args) {
      if (args.variant === 'filled' && args.color === 'primary') return 'mf-button-primary';
      if (args.variant === 'filled' && args.color === 'secondary') return 'mf-button-secondary';
      if (args.variant === 'outlined' && args.color === 'primary') return 'mf-button-outlined-primary';
      if (args.variant === 'outlined' && args.color === 'secondary') return 'mf-button-outlined-secondary';
      return '';
    }
  }
})`,...(c=(d=a.parameters)==null?void 0:d.docs)==null?void 0:c.source}}};var u,m,p;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`() => ({
  components: {
    MButton
  },
  template: \`
    <div class="space-y-8">
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Primary Brand Buttons</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MButton 
            text="Apply Now" 
            variant="filled" 
            color="primary" 
            size="large"
            class="mf-button-primary" 
          />
          <MButton 
            text="Get Started" 
            variant="filled" 
            color="primary" 
            class="mf-button-primary" 
          />
          <MButton 
            text="Learn More" 
            variant="filled" 
            color="primary" 
            size="small"
            class="mf-button-primary" 
          />
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Secondary Actions</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MButton 
            text="Contact Support" 
            variant="filled" 
            color="secondary" 
            size="large"
            class="mf-button-secondary" 
          />
          <MButton 
            text="View Account" 
            variant="filled" 
            color="secondary" 
            class="mf-button-secondary" 
          />
          <MButton 
            text="Help Center" 
            variant="filled" 
            color="secondary" 
            size="small"
            class="mf-button-secondary" 
          />
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Outlined Variants</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MButton 
            text="View Details" 
            variant="outlined" 
            color="primary" 
            class="mf-button-outlined-primary" 
          />
          <MButton 
            text="Save for Later" 
            variant="outlined" 
            color="secondary" 
            class="mf-button-outlined-secondary" 
          />
          <MButton 
            text="Download PDF" 
            variant="outlined" 
            color="primary" 
            icon="fas fa-download"
          />
        </div>
      </div>
    </div>
  \`
})`,...(p=(m=i.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};var f,v,y;e.parameters={...e.parameters,docs:{...(f=e.parameters)==null?void 0:f.docs,source:{originalSource:`() => ({
  components: {
    MButton
  },
  template: \`
    <div class="space-y-8">
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Loan Application Actions</h3>
        <div class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MButton 
              text="Apply for Personal Loan" 
              variant="filled" 
              color="primary" 
              icon="fas fa-money-bill-wave"
              size="large"
              fullWidth
              class="mf-button-primary" 
            />
            <MButton 
              text="Check Loan Status" 
              variant="outlined" 
              color="primary" 
              icon="fas fa-search"
              size="large"
              fullWidth
              class="mf-button-outlined-primary" 
            />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <MButton 
              text="Calculate Payment" 
              variant="text" 
              color="primary" 
              icon="fas fa-calculator"
            />
            <MButton 
              text="Pre-qualify" 
              variant="text" 
              color="primary" 
              icon="fas fa-check-circle"
            />
            <MButton 
              text="Rate Comparison" 
              variant="text" 
              color="primary" 
              icon="fas fa-chart-bar"
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Account Management</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MButton 
            text="Make Payment" 
            variant="filled" 
            color="success" 
            icon="fas fa-credit-card"
            fullWidth
          />
          <MButton 
            text="View Statements" 
            variant="outlined" 
            color="secondary" 
            icon="fas fa-file-alt"
            fullWidth
          />
          <MButton 
            text="Update Profile" 
            variant="outlined" 
            color="primary" 
            icon="fas fa-user-edit"
            fullWidth
          />
          <MButton 
            text="Contact Support" 
            variant="filled" 
            color="secondary" 
            icon="fas fa-headset"
            fullWidth
            class="mf-button-secondary" 
          />
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Status Indicators</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MButton 
            text="Approved" 
            variant="filled" 
            color="success" 
            icon="fas fa-check-circle"
            disabled
          />
          <MButton 
            text="Pending Review" 
            variant="filled" 
            color="warning" 
            icon="fas fa-clock"
            disabled
          />
          <MButton 
            text="Action Required" 
            variant="filled" 
            color="error" 
            icon="fas fa-exclamation-triangle"
          />
        </div>
      </div>
    </div>
  \`
})`,...(y=(v=e.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};var g,x,b;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`() => ({
  components: {
    MButton
  },
  template: \`
    <div class="space-y-8">
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Processing States</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <h4 class="font-medium text-gray-700">Application Processing</h4>
            <MButton 
              text="Processing Application" 
              variant="filled" 
              color="primary" 
              loading
              fullWidth
              class="mf-button-primary" 
            />
            <MButton 
              text="Verifying Information" 
              variant="filled" 
              color="secondary" 
              loading
              loadingText="Please wait..."
              fullWidth
              class="mf-button-secondary" 
            />
          </div>
          
          <div class="space-y-4">
            <h4 class="font-medium text-gray-700">Payment Processing</h4>
            <MButton 
              text="Processing Payment" 
              variant="filled" 
              color="success" 
              loading
              fullWidth
            />
            <MButton 
              text="Submitting" 
              variant="outlined" 
              color="primary" 
              loading
              loadingText="Submitting..."
              fullWidth
            />
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Interactive Loading Demo</h3>
        <div class="text-center">
          <p class="text-gray-600 mb-4">Click the button to see loading state transition</p>
          <MButton 
            text="Submit Application" 
            variant="filled" 
            color="primary" 
            size="large"
            class="mf-button-primary"
            @click="simulateLoading"
            :loading="isLoading"
            :loadingText="loadingText"
          />
        </div>
      </div>
    </div>
  \`,
  data() {
    return {
      isLoading: false,
      loadingText: 'Processing...'
    };
  },
  methods: {
    simulateLoading() {
      this.isLoading = true;
      this.loadingText = 'Processing application...';
      setTimeout(() => {
        this.loadingText = 'Verifying information...';
      }, 1000);
      setTimeout(() => {
        this.loadingText = 'Finalizing...';
      }, 2000);
      setTimeout(() => {
        this.isLoading = false;
        alert('Application submitted successfully!');
      }, 3000);
    }
  }
})`,...(b=(x=o.parameters)==null?void 0:x.docs)==null?void 0:b.source}}};var h,B,M;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`() => ({
  components: {
    MButton
  },
  template: \`
    <div class="space-y-8">
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Keyboard Navigation Test</h3>
        <p class="text-gray-600 mb-4">Use Tab to navigate, Enter/Space to activate buttons</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MButton 
            text="First Button" 
            variant="filled" 
            color="primary" 
            aria-label="First navigation button for testing keyboard access"
            class="mf-button-primary" 
          />
          <MButton 
            text="Second Button" 
            variant="outlined" 
            color="secondary" 
            aria-describedby="second-help"
            class="mf-button-outlined-secondary" 
          />
          <MButton 
            text="Third Button" 
            variant="text" 
            color="primary" 
            aria-label="Third button completes keyboard navigation test"
          />
        </div>
        <div id="second-help" class="text-xs text-gray-500 mt-2">
          This button demonstrates ARIA describedby attribute usage
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Color Contrast Validation</h3>
        <p class="text-gray-600 mb-4">All buttons meet WCAG 2.1 AA contrast requirements</p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="p-4 bg-white border rounded">
            <h4 class="font-medium mb-3">Light Backgrounds</h4>
            <div class="space-y-2">
              <MButton text="Primary on Light" color="primary" variant="filled" fullWidth class="mf-button-primary" />
              <MButton text="Secondary on Light" color="secondary" variant="filled" fullWidth class="mf-button-secondary" />
              <MButton text="Success on Light" color="success" variant="filled" fullWidth />
            </div>
          </div>
          
          <div class="p-4 bg-gray-100 border rounded">
            <h4 class="font-medium mb-3">Gray Backgrounds</h4>
            <div class="space-y-2">
              <MButton text="Primary on Gray" color="primary" variant="filled" fullWidth class="mf-button-primary" />
              <MButton text="Outlined on Gray" color="primary" variant="outlined" fullWidth class="mf-button-outlined-primary" />
              <MButton text="Text on Gray" color="primary" variant="text" fullWidth />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Touch Target Size</h3>
        <p class="text-gray-600 mb-4">All buttons meet minimum 44px touch target requirements</p>
        <div class="space-y-4">
          <MButton 
            text="Large Touch Target" 
            variant="filled" 
            color="primary" 
            size="large"
            fullWidth
            class="mf-button-primary min-h-[48px]" 
          />
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MButton 
              text="Adequate Spacing" 
              variant="outlined" 
              color="primary" 
              fullWidth
              class="mf-button-outlined-primary min-h-[44px]" 
            />
            <MButton 
              text="Touch Friendly" 
              variant="filled" 
              color="secondary" 
              fullWidth
              class="mf-button-secondary min-h-[44px]" 
            />
          </div>
        </div>
      </div>
    </div>
  \`
})`,...(M=(B=r.parameters)==null?void 0:B.docs)==null?void 0:M.source}}};var S,A,T;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`() => ({
  components: {
    MButton
  },
  template: \`
    <div class="space-y-8">
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Button Sizes</h3>
        <div class="space-y-6">
          <div>
            <h4 class="font-medium mb-3 text-gray-700">Filled Buttons</h4>
            <div class="flex flex-wrap items-center gap-4">
              <MButton text="Small" variant="filled" color="primary" size="small" class="mf-button-primary" />
              <MButton text="Medium" variant="filled" color="primary" size="medium" class="mf-button-primary" />
              <MButton text="Large" variant="filled" color="primary" size="large" class="mf-button-primary" />
            </div>
          </div>
          
          <div>
            <h4 class="font-medium mb-3 text-gray-700">Outlined Buttons</h4>
            <div class="flex flex-wrap items-center gap-4">
              <MButton text="Small" variant="outlined" color="primary" size="small" class="mf-button-outlined-primary" />
              <MButton text="Medium" variant="outlined" color="primary" size="medium" class="mf-button-outlined-primary" />
              <MButton text="Large" variant="outlined" color="primary" size="large" class="mf-button-outlined-primary" />
            </div>
          </div>
          
          <div>
            <h4 class="font-medium mb-3 text-gray-700">Text Buttons</h4>
            <div class="flex flex-wrap items-center gap-4">
              <MButton text="Small" variant="text" color="primary" size="small" />
              <MButton text="Medium" variant="text" color="primary" size="medium" />
              <MButton text="Large" variant="text" color="primary" size="large" />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 class="text-xl font-semibold mb-4 text-gray-800">Full Width Examples</h3>
        <div class="max-w-md space-y-4">
          <MButton 
            text="Apply for Personal Loan" 
            variant="filled" 
            color="primary" 
            fullWidth
            size="large"
            class="mf-button-primary" 
          />
          <MButton 
            text="Check Your Rate" 
            variant="outlined" 
            color="primary" 
            fullWidth
            class="mf-button-outlined-primary" 
          />
          <MButton 
            text="Contact a Specialist" 
            variant="filled" 
            color="secondary" 
            fullWidth
            class="mf-button-secondary" 
          />
        </div>
      </div>
    </div>
  \`
})`,...(T=(A=l.parameters)==null?void 0:A.docs)==null?void 0:T.source}}};const k=["Interactive","YourTownFinanceBrand","FinancialActions","LoadingStates","AccessibilityShowcase","SizesAndSpacing"];export{r as AccessibilityShowcase,e as FinancialActions,a as Interactive,o as LoadingStates,l as SizesAndSpacing,i as YourTownFinanceBrand,k as __namedExportsOrder,P as default};
