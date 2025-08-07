import{M as e}from"./MCheckbox-B-c44SKF.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const _={title:"Material UI/MCheckbox",component:e,parameters:{docs:{description:{component:"Material Design checkbox component with support for indeterminate states, custom colors, and accessibility features."}}},argTypes:{color:{control:{type:"select"},options:["primary","secondary","success","warning","error"]},size:{control:{type:"select"},options:["sm","md","lg"]}}},n={args:{label:"Accept terms and conditions"}},r={render:()=>({components:{MCheckbox:e},data(){return{values:{primary:!1,secondary:!1,success:!1,warning:!1,error:!1}}},template:`
      <div class="space-y-4">
        <MCheckbox 
          v-model="values.primary"
          color="primary"
          label="Primary Color"
        />
        
        <MCheckbox 
          v-model="values.secondary"
          color="secondary"
          label="Secondary Color"
        />
        
        <MCheckbox 
          v-model="values.success"
          color="success"
          label="Success Color"
        />
        
        <MCheckbox 
          v-model="values.warning"
          color="warning"
          label="Warning Color"
        />
        
        <MCheckbox 
          v-model="values.error"
          color="error"
          label="Error Color"
        />
      </div>
    `})},t={render:()=>({components:{MCheckbox:e},data(){return{values:{small:!1,medium:!1,large:!1}}},template:`
      <div class="space-y-4">
        <MCheckbox 
          v-model="values.small"
          size="sm"
          label="Small Size"
        />
        
        <MCheckbox 
          v-model="values.medium"
          size="md"
          label="Medium Size (Default)"
        />
        
        <MCheckbox 
          v-model="values.large"
          size="lg"
          label="Large Size"
        />
      </div>
    `})},a={render:()=>({components:{MCheckbox:e},data(){return{values:{checked:!0,unchecked:!1,indeterminate:!1,disabled:!1,disabledChecked:!0,required:!1}}},template:`
      <div class="space-y-4">
        <MCheckbox 
          v-model="values.checked"
          label="Checked State"
        />
        
        <MCheckbox 
          v-model="values.unchecked"
          label="Unchecked State"
        />
        
        <MCheckbox 
          v-model="values.indeterminate"
          :indeterminate="true"
          label="Indeterminate State"
        />
        
        <MCheckbox 
          v-model="values.disabled"
          :disabled="true"
          label="Disabled State"
        />
        
        <MCheckbox 
          v-model="values.disabledChecked"
          :disabled="true"
          label="Disabled Checked State"
        />
        
        <MCheckbox 
          v-model="values.required"
          :required="true"
          label="Required Checkbox"
          helper-text="This checkbox is required"
        />
      </div>
    `})},s={render:()=>({components:{MCheckbox:e},data(){return{selectedFeatures:[],features:["notifications","email_updates","sms_alerts","newsletter"]}},computed:{allSelected(){return this.selectedFeatures.length===this.features.length},someSelected(){return this.selectedFeatures.length>0&&this.selectedFeatures.length<this.features.length}},methods:{toggleAll(){this.allSelected?this.selectedFeatures=[]:this.selectedFeatures=[...this.features]}},template:`
      <div class="space-y-4">
        <MCheckbox 
          :model-value="allSelected"
          :indeterminate="someSelected"
          color="primary"
          @update:model-value="toggleAll"
        >
          <strong>Select All Preferences</strong>
        </MCheckbox>
        
        <div class="ml-6 space-y-2">
          <MCheckbox 
            v-model="selectedFeatures"
            value="notifications"
            color="primary"
            label="Push Notifications"
            helper-text="Receive instant notifications on your device"
          />
          
          <MCheckbox 
            v-model="selectedFeatures"
            value="email_updates"
            color="primary"
            label="Email Updates"
            helper-text="Get weekly summaries via email"
          />
          
          <MCheckbox 
            v-model="selectedFeatures"
            value="sms_alerts"
            color="primary"
            label="SMS Alerts"
            helper-text="Important alerts via text message"
          />
          
          <MCheckbox 
            v-model="selectedFeatures"
            value="newsletter"
            color="primary"
            label="Monthly Newsletter"
            helper-text="Stay updated with our monthly newsletter"
          />
        </div>
        
        <div class="mt-4 p-3 bg-gray-50 rounded">
          <p class="text-sm text-gray-600">
            Selected: {{ selectedFeatures.length }} of {{ features.length }} preferences
          </p>
        </div>
      </div>
    `})},l={render:()=>({components:{MCheckbox:e},data(){return{values:{terms:!1,privacy:!1,marketing:!1},submitted:!1}},computed:{termsError(){return this.submitted&&!this.values.terms?"You must accept the terms and conditions":""},privacyError(){return this.submitted&&!this.values.privacy?"Privacy policy acceptance is required":""}},methods:{submit(){this.submitted=!0}},template:`
      <div class="space-y-4">
        <MCheckbox 
          v-model="values.terms"
          :required="true"
          :error-message="termsError"
          color="primary"
        >
          I agree to the <a href="#" class="text-blue-600 hover:underline">Terms and Conditions</a>
        </MCheckbox>
        
        <MCheckbox 
          v-model="values.privacy"
          :required="true"
          :error-message="privacyError"
          color="primary"
        >
          I have read and accept the <a href="#" class="text-blue-600 hover:underline">Privacy Policy</a>
        </MCheckbox>
        
        <MCheckbox 
          v-model="values.marketing"
          color="secondary"
          label="I would like to receive marketing communications"
          helper-text="Optional - you can unsubscribe at any time"
        />
        
        <button 
          @click="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Submit Form
        </button>
        
        <div v-if="submitted && !termsError && !privacyError" class="p-3 bg-green-50 text-green-800 rounded">
          Form submitted successfully!
        </div>
      </div>
    `})},o={render:()=>({components:{MCheckbox:e},data(){return{values:{wrapped:!1,extended:!1,both:!1,grouped1:!1,grouped2:!1}}},template:`
      <div class="space-y-6">
        <h3 class="text-lg font-semibold mb-4">Wrap & Extend Functionality</h3>
        
        <!-- Wrapped Checkbox -->
        <MCheckbox 
          v-model="values.wrapped"
          label="Wrapped Checkbox"
          :wrap="true"
          wrapper-class="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg"
          helper-text="This checkbox has custom wrapper styling"
        />
        
        <!-- Extended Checkbox -->
        <MCheckbox 
          v-model="values.extended"
          label="Extended Checkbox"
          :extend="true"
          extended-class="shadow-lg border-2 border-purple-300 p-2 rounded"
          helper-text="This checkbox has extended classes"
        />
        
        <!-- Both Wrap and Extend -->
        <MCheckbox 
          v-model="values.both"
          label="Wrapped & Extended Checkbox"
          :wrap="true"
          :extend="true"
          wrapper-class="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl"
          extended-class="border-2 border-green-400 shadow-xl"
          helper-text="Combines both wrap and extend features"
        />
        
        <!-- Semantic Grouping Example -->
        <div class="mt-8">
          <h4 class="text-md font-semibold mb-4">Agreement Sections</h4>
          <div class="space-y-4">
            <MCheckbox 
              v-model="values.grouped1"
              label="Terms of Service Agreement"
              :wrap="true"
              wrapper-class="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg"
              color="error"
              :required="true"
              helper-text="Required legal agreement"
            />
            
            <MCheckbox 
              v-model="values.grouped2"
              label="Marketing Communications"
              :extend="true"
              extended-class="border border-blue-300 bg-blue-50 p-3 rounded-lg"
              color="secondary"
              helper-text="Optional marketing preferences"
            />
          </div>
        </div>
      </div>
    `}),parameters:{docs:{description:{story:"Demonstrates wrap and extend functionality for semantic form grouping and custom styling of checkbox components."}}}},i={render:()=>({components:{MCheckbox:e},data(){return{application:{terms:!1,privacy:!1,creditCheck:!1,prequalify:!1,marketing:!1,sms:!1,paperless:!1},submitted:!1}},computed:{canSubmit(){return this.application.terms&&this.application.privacy&&this.application.creditCheck}},methods:{submit(){this.submitted=!0,this.canSubmit&&alert("Application submitted successfully!")}},template:`
      <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-6">Loan Application - Agreements & Preferences</h2>
        
        <!-- Required Agreements -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-4 text-red-600">Required Agreements</h3>
          <div class="space-y-4">
            <MCheckbox 
              v-model="application.terms"
              :required="true"
              color="error"
              :error-message="submitted && !application.terms ? 'You must accept the terms and conditions' : ''"
            >
              I agree to the <a href="#" class="text-blue-600 hover:underline font-medium">Terms and Conditions</a>
            </MCheckbox>
            
            <MCheckbox 
              v-model="application.privacy"
              :required="true"
              color="error"
              :error-message="submitted && !application.privacy ? 'Privacy policy acceptance is required' : ''"
            >
              I have read and accept the <a href="#" class="text-blue-600 hover:underline font-medium">Privacy Policy</a>
            </MCheckbox>
            
            <MCheckbox 
              v-model="application.creditCheck"
              :required="true"
              color="error"
              :error-message="submitted && !application.creditCheck ? 'Credit check authorization is required' : ''"
            >
              I authorize Your Town Finance to check my credit and verify my information
            </MCheckbox>
          </div>
        </div>
        
        <!-- Optional Preferences -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-4 text-blue-600">Preferences (Optional)</h3>
          <div class="space-y-4">
            <MCheckbox 
              v-model="application.prequalify"
              color="primary"
              label="I want to see pre-qualified offers from partner lenders"
              helper-text="This may result in additional credit inquiries"
            />
            
            <MCheckbox 
              v-model="application.marketing"
              color="secondary"
              label="Send me promotional offers and financial tips"
              helper-text="You can unsubscribe at any time"
            />
            
            <MCheckbox 
              v-model="application.sms"
              color="secondary"
              label="Send loan updates via SMS"
              helper-text="Standard message rates may apply"
            />
            
            <MCheckbox 
              v-model="application.paperless"
              color="success"
              label="Go paperless - receive documents electronically"
              helper-text="Help the environment and get faster delivery"
            />
          </div>
        </div>
        
        <!-- Submit Section -->
        <div class="border-t pt-6">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-600">
              By submitting this application, you acknowledge that all information provided is accurate and complete.
            </div>
            <button 
              @click="submit"
              :disabled="!canSubmit"
              :class="[
                'px-6 py-3 rounded-lg font-medium transition-colors',
                canSubmit 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              Submit Application
            </button>
          </div>
          
          <div v-if="submitted && !canSubmit" class="mt-4 p-3 bg-red-50 text-red-800 rounded">
            Please complete all required agreements before submitting.
          </div>
        </div>
      </div>
    `}),parameters:{docs:{description:{story:"Complete loan application agreement form demonstrating checkbox usage in financial services with required and optional preferences."}}}};var c,d,u;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    label: 'Accept terms and conditions'
  }
}`,...(u=(d=n.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var m,p,b;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MCheckbox
    },
    data() {
      return {
        values: {
          primary: false,
          secondary: false,
          success: false,
          warning: false,
          error: false
        }
      };
    },
    template: \`
      <div class="space-y-4">
        <MCheckbox 
          v-model="values.primary"
          color="primary"
          label="Primary Color"
        />
        
        <MCheckbox 
          v-model="values.secondary"
          color="secondary"
          label="Secondary Color"
        />
        
        <MCheckbox 
          v-model="values.success"
          color="success"
          label="Success Color"
        />
        
        <MCheckbox 
          v-model="values.warning"
          color="warning"
          label="Warning Color"
        />
        
        <MCheckbox 
          v-model="values.error"
          color="error"
          label="Error Color"
        />
      </div>
    \`
  })
}`,...(b=(p=r.parameters)==null?void 0:p.docs)==null?void 0:b.source}}};var h,v,x;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MCheckbox
    },
    data() {
      return {
        values: {
          small: false,
          medium: false,
          large: false
        }
      };
    },
    template: \`
      <div class="space-y-4">
        <MCheckbox 
          v-model="values.small"
          size="sm"
          label="Small Size"
        />
        
        <MCheckbox 
          v-model="values.medium"
          size="md"
          label="Medium Size (Default)"
        />
        
        <MCheckbox 
          v-model="values.large"
          size="lg"
          label="Large Size"
        />
      </div>
    \`
  })
}`,...(x=(v=t.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var g,f,y;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MCheckbox
    },
    data() {
      return {
        values: {
          checked: true,
          unchecked: false,
          indeterminate: false,
          disabled: false,
          disabledChecked: true,
          required: false
        }
      };
    },
    template: \`
      <div class="space-y-4">
        <MCheckbox 
          v-model="values.checked"
          label="Checked State"
        />
        
        <MCheckbox 
          v-model="values.unchecked"
          label="Unchecked State"
        />
        
        <MCheckbox 
          v-model="values.indeterminate"
          :indeterminate="true"
          label="Indeterminate State"
        />
        
        <MCheckbox 
          v-model="values.disabled"
          :disabled="true"
          label="Disabled State"
        />
        
        <MCheckbox 
          v-model="values.disabledChecked"
          :disabled="true"
          label="Disabled Checked State"
        />
        
        <MCheckbox 
          v-model="values.required"
          :required="true"
          label="Required Checkbox"
          helper-text="This checkbox is required"
        />
      </div>
    \`
  })
}`,...(y=(f=a.parameters)==null?void 0:f.docs)==null?void 0:y.source}}};var k,C,M;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MCheckbox
    },
    data() {
      return {
        selectedFeatures: [],
        features: ['notifications', 'email_updates', 'sms_alerts', 'newsletter']
      };
    },
    computed: {
      allSelected() {
        return this.selectedFeatures.length === this.features.length;
      },
      someSelected() {
        return this.selectedFeatures.length > 0 && this.selectedFeatures.length < this.features.length;
      }
    },
    methods: {
      toggleAll() {
        if (this.allSelected) {
          this.selectedFeatures = [];
        } else {
          this.selectedFeatures = [...this.features];
        }
      }
    },
    template: \`
      <div class="space-y-4">
        <MCheckbox 
          :model-value="allSelected"
          :indeterminate="someSelected"
          color="primary"
          @update:model-value="toggleAll"
        >
          <strong>Select All Preferences</strong>
        </MCheckbox>
        
        <div class="ml-6 space-y-2">
          <MCheckbox 
            v-model="selectedFeatures"
            value="notifications"
            color="primary"
            label="Push Notifications"
            helper-text="Receive instant notifications on your device"
          />
          
          <MCheckbox 
            v-model="selectedFeatures"
            value="email_updates"
            color="primary"
            label="Email Updates"
            helper-text="Get weekly summaries via email"
          />
          
          <MCheckbox 
            v-model="selectedFeatures"
            value="sms_alerts"
            color="primary"
            label="SMS Alerts"
            helper-text="Important alerts via text message"
          />
          
          <MCheckbox 
            v-model="selectedFeatures"
            value="newsletter"
            color="primary"
            label="Monthly Newsletter"
            helper-text="Stay updated with our monthly newsletter"
          />
        </div>
        
        <div class="mt-4 p-3 bg-gray-50 rounded">
          <p class="text-sm text-gray-600">
            Selected: {{ selectedFeatures.length }} of {{ features.length }} preferences
          </p>
        </div>
      </div>
    \`
  })
}`,...(M=(C=s.parameters)==null?void 0:C.docs)==null?void 0:M.source}}};var S,w,q;l.parameters={...l.parameters,docs:{...(S=l.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MCheckbox
    },
    data() {
      return {
        values: {
          terms: false,
          privacy: false,
          marketing: false
        },
        submitted: false
      };
    },
    computed: {
      termsError() {
        return this.submitted && !this.values.terms ? 'You must accept the terms and conditions' : '';
      },
      privacyError() {
        return this.submitted && !this.values.privacy ? 'Privacy policy acceptance is required' : '';
      }
    },
    methods: {
      submit() {
        this.submitted = true;
      }
    },
    template: \`
      <div class="space-y-4">
        <MCheckbox 
          v-model="values.terms"
          :required="true"
          :error-message="termsError"
          color="primary"
        >
          I agree to the <a href="#" class="text-blue-600 hover:underline">Terms and Conditions</a>
        </MCheckbox>
        
        <MCheckbox 
          v-model="values.privacy"
          :required="true"
          :error-message="privacyError"
          color="primary"
        >
          I have read and accept the <a href="#" class="text-blue-600 hover:underline">Privacy Policy</a>
        </MCheckbox>
        
        <MCheckbox 
          v-model="values.marketing"
          color="secondary"
          label="I would like to receive marketing communications"
          helper-text="Optional - you can unsubscribe at any time"
        />
        
        <button 
          @click="submit"
          class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Submit Form
        </button>
        
        <div v-if="submitted && !termsError && !privacyError" class="p-3 bg-green-50 text-green-800 rounded">
          Form submitted successfully!
        </div>
      </div>
    \`
  })
}`,...(q=(w=l.parameters)==null?void 0:w.docs)==null?void 0:q.source}}};var F,E,A;o.parameters={...o.parameters,docs:{...(F=o.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MCheckbox
    },
    data() {
      return {
        values: {
          wrapped: false,
          extended: false,
          both: false,
          grouped1: false,
          grouped2: false
        }
      };
    },
    template: \`
      <div class="space-y-6">
        <h3 class="text-lg font-semibold mb-4">Wrap & Extend Functionality</h3>
        
        <!-- Wrapped Checkbox -->
        <MCheckbox 
          v-model="values.wrapped"
          label="Wrapped Checkbox"
          :wrap="true"
          wrapper-class="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg"
          helper-text="This checkbox has custom wrapper styling"
        />
        
        <!-- Extended Checkbox -->
        <MCheckbox 
          v-model="values.extended"
          label="Extended Checkbox"
          :extend="true"
          extended-class="shadow-lg border-2 border-purple-300 p-2 rounded"
          helper-text="This checkbox has extended classes"
        />
        
        <!-- Both Wrap and Extend -->
        <MCheckbox 
          v-model="values.both"
          label="Wrapped & Extended Checkbox"
          :wrap="true"
          :extend="true"
          wrapper-class="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl"
          extended-class="border-2 border-green-400 shadow-xl"
          helper-text="Combines both wrap and extend features"
        />
        
        <!-- Semantic Grouping Example -->
        <div class="mt-8">
          <h4 class="text-md font-semibold mb-4">Agreement Sections</h4>
          <div class="space-y-4">
            <MCheckbox 
              v-model="values.grouped1"
              label="Terms of Service Agreement"
              :wrap="true"
              wrapper-class="p-4 bg-red-50 border-l-4 border-red-400 rounded-r-lg"
              color="error"
              :required="true"
              helper-text="Required legal agreement"
            />
            
            <MCheckbox 
              v-model="values.grouped2"
              label="Marketing Communications"
              :extend="true"
              extended-class="border border-blue-300 bg-blue-50 p-3 rounded-lg"
              color="secondary"
              helper-text="Optional marketing preferences"
            />
          </div>
        </div>
      </div>
    \`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates wrap and extend functionality for semantic form grouping and custom styling of checkbox components.'
      }
    }
  }
}`,...(A=(E=o.parameters)==null?void 0:E.docs)==null?void 0:A.source}}};var P,z,I;i.parameters={...i.parameters,docs:{...(P=i.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MCheckbox
    },
    data() {
      return {
        application: {
          terms: false,
          privacy: false,
          creditCheck: false,
          prequalify: false,
          marketing: false,
          sms: false,
          paperless: false
        },
        submitted: false
      };
    },
    computed: {
      canSubmit() {
        return this.application.terms && this.application.privacy && this.application.creditCheck;
      }
    },
    methods: {
      submit() {
        this.submitted = true;
        if (this.canSubmit) {
          alert('Application submitted successfully!');
        }
      }
    },
    template: \`
      <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-6">Loan Application - Agreements & Preferences</h2>
        
        <!-- Required Agreements -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-4 text-red-600">Required Agreements</h3>
          <div class="space-y-4">
            <MCheckbox 
              v-model="application.terms"
              :required="true"
              color="error"
              :error-message="submitted && !application.terms ? 'You must accept the terms and conditions' : ''"
            >
              I agree to the <a href="#" class="text-blue-600 hover:underline font-medium">Terms and Conditions</a>
            </MCheckbox>
            
            <MCheckbox 
              v-model="application.privacy"
              :required="true"
              color="error"
              :error-message="submitted && !application.privacy ? 'Privacy policy acceptance is required' : ''"
            >
              I have read and accept the <a href="#" class="text-blue-600 hover:underline font-medium">Privacy Policy</a>
            </MCheckbox>
            
            <MCheckbox 
              v-model="application.creditCheck"
              :required="true"
              color="error"
              :error-message="submitted && !application.creditCheck ? 'Credit check authorization is required' : ''"
            >
              I authorize Your Town Finance to check my credit and verify my information
            </MCheckbox>
          </div>
        </div>
        
        <!-- Optional Preferences -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold mb-4 text-blue-600">Preferences (Optional)</h3>
          <div class="space-y-4">
            <MCheckbox 
              v-model="application.prequalify"
              color="primary"
              label="I want to see pre-qualified offers from partner lenders"
              helper-text="This may result in additional credit inquiries"
            />
            
            <MCheckbox 
              v-model="application.marketing"
              color="secondary"
              label="Send me promotional offers and financial tips"
              helper-text="You can unsubscribe at any time"
            />
            
            <MCheckbox 
              v-model="application.sms"
              color="secondary"
              label="Send loan updates via SMS"
              helper-text="Standard message rates may apply"
            />
            
            <MCheckbox 
              v-model="application.paperless"
              color="success"
              label="Go paperless - receive documents electronically"
              helper-text="Help the environment and get faster delivery"
            />
          </div>
        </div>
        
        <!-- Submit Section -->
        <div class="border-t pt-6">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-600">
              By submitting this application, you acknowledge that all information provided is accurate and complete.
            </div>
            <button 
              @click="submit"
              :disabled="!canSubmit"
              :class="[
                'px-6 py-3 rounded-lg font-medium transition-colors',
                canSubmit 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              ]"
            >
              Submit Application
            </button>
          </div>
          
          <div v-if="submitted && !canSubmit" class="mt-4 p-3 bg-red-50 text-red-800 rounded">
            Please complete all required agreements before submitting.
          </div>
        </div>
      </div>
    \`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Complete loan application agreement form demonstrating checkbox usage in financial services with required and optional preferences.'
      }
    }
  }
}`,...(I=(z=i.parameters)==null?void 0:z.docs)==null?void 0:I.source}}};const R=["Default","Colors","Sizes","States","MultipleSelection","Validation","WrapExtendFunctionality","YourTownFinanceExample"];export{r as Colors,n as Default,s as MultipleSelection,t as Sizes,a as States,l as Validation,o as WrapExtendFunctionality,i as YourTownFinanceExample,R as __namedExportsOrder,_ as default};
