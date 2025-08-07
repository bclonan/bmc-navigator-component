import{M as n}from"./MInput-CcA3fQAp.js";import{M as l,a}from"./MInputLabel-3mFzc-XJ.js";import{M as p}from"./MFormHelperText-CT2iaShF.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const W={title:"Core Components/Form Controls/Input",component:n,parameters:{docs:{description:{component:"Material-UI Input component for text input with Your Town Finance brand styling, validation states, and form integration."}}},argTypes:{value:{control:{type:"text"},description:"Input value",defaultValue:""},placeholder:{control:{type:"text"},description:"Placeholder text",defaultValue:"Enter text..."},type:{control:{type:"select"},options:["text","password","email","number","tel","url"],description:"Input type",defaultValue:"text"},variant:{control:{type:"select"},options:["filled","outlined","standard"],description:"Input variant",defaultValue:"outlined"},size:{control:{type:"select"},options:["small","medium"],description:"Input size",defaultValue:"medium"},disabled:{control:{type:"boolean"},description:"Disable input",defaultValue:!1},error:{control:{type:"boolean"},description:"Show error state",defaultValue:!1},required:{control:{type:"boolean"},description:"Required field",defaultValue:!1},fullWidth:{control:{type:"boolean"},description:"Full width input",defaultValue:!1}}},t=r=>({components:{MInput:n},setup(){return{args:r}},template:`
    <MInput 
      v-bind="args" 
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
  `,methods:{onInput(e){console.log("Input event:",e.target.value)},onChange(e){console.log("Change event:",e.target.value)},onFocus(e){console.log("Focus event")},onBlur(e){console.log("Blur event")}}});t.args={value:"",placeholder:"Enter your information",type:"text",variant:"outlined",size:"medium",disabled:!1,error:!1,required:!1,fullWidth:!1};const s=()=>({components:{MInput:n,MFormControl:a,MInputLabel:l,MFormHelperText:p},data(){return{formData:{firstName:"",lastName:"",email:"",phone:"",income:"",loanAmount:"",ssn:""},errors:{}}},methods:{validateField(r,e){switch(this.errors={...this.errors},r){case"email":e&&!/\S+@\S+\.\S+/.test(e)?this.errors.email="Please enter a valid email address":delete this.errors.email;break;case"phone":e&&!/^\d{10}$/.test(e.replace(/\D/g,""))?this.errors.phone="Please enter a valid 10-digit phone number":delete this.errors.phone;break;case"income":e&&isNaN(e)?this.errors.income="Please enter a valid income amount":delete this.errors.income;break}}},template:`
    <div class="max-w-2xl space-y-6">
      <h3 class="text-2xl font-bold mb-6" style="color: var(--mf-primary);">Personal Loan Application</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MFormControl class="mf-form-control">
          <MInputLabel class="mf-form-label">First Name *</MInputLabel>
          <MInput
            v-model="formData.firstName"
            placeholder="Enter your first name"
            variant="outlined"
            required
            :class="{ 'mf-input-focused': true }"
          />
        </MFormControl>
        
        <MFormControl class="mf-form-control">
          <MInputLabel class="mf-form-label">Last Name *</MInputLabel>
          <MInput
            v-model="formData.lastName"
            placeholder="Enter your last name"
            variant="outlined"
            required
            :class="{ 'mf-input-focused': true }"
          />
        </MFormControl>
      </div>
      
      <MFormControl class="mf-form-control">
        <MInputLabel class="mf-form-label">Email Address *</MInputLabel>
        <MInput
          v-model="formData.email"
          type="email"
          placeholder="your.email@example.com"
          variant="outlined"
          required
          :error="!!errors.email"
          :class="{ 'mf-input-focused': !errors.email, 'mf-input-error': errors.email }"
          @blur="validateField('email', formData.email)"
        />
        <MFormHelperText 
          v-if="errors.email" 
          :error="true"
          class="mf-form-helper-text error"
        >
          {{ errors.email }}
        </MFormHelperText>
        <MFormHelperText 
          v-else
          class="mf-form-helper-text"
        >
          We'll use this to send you loan updates
        </MFormHelperText>
      </MFormControl>
      
      <MFormControl class="mf-form-control">
        <MInputLabel class="mf-form-label">Phone Number *</MInputLabel>
        <MInput
          v-model="formData.phone"
          type="tel"
          placeholder="(555) 123-4567"
          variant="outlined"
          required
          :error="!!errors.phone"
          :class="{ 'mf-input-focused': !errors.phone, 'mf-input-error': errors.phone }"
          @blur="validateField('phone', formData.phone)"
        />
        <MFormHelperText 
          v-if="errors.phone" 
          :error="true"
          class="mf-form-helper-text error"
        >
          {{ errors.phone }}
        </MFormHelperText>
      </MFormControl>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MFormControl class="mf-form-control">
          <MInputLabel class="mf-form-label">Annual Income *</MInputLabel>
          <MInput
            v-model="formData.income"
            type="number"
            placeholder="50000"
            variant="outlined"
            required
            :error="!!errors.income"
            :class="{ 'mf-input-focused': !errors.income, 'mf-input-error': errors.income }"
            @blur="validateField('income', formData.income)"
          />
          <MFormHelperText class="mf-form-helper-text">Before taxes</MFormHelperText>
        </MFormControl>
        
        <MFormControl class="mf-form-control">
          <MInputLabel class="mf-form-label">Loan Amount *</MInputLabel>
          <MInput
            v-model="formData.loanAmount"
            type="number"
            placeholder="15000"
            variant="outlined"
            required
            :class="{ 'mf-input-focused': true }"
          />
          <MFormHelperText class="mf-form-helper-text">$1,000 - $25,000</MFormHelperText>
        </MFormControl>
      </div>
      
      <MFormControl class="mf-form-control">
        <MInputLabel class="mf-form-label">Social Security Number *</MInputLabel>
        <MInput
          v-model="formData.ssn"
          type="password"
          placeholder="XXX-XX-XXXX"
          variant="outlined"
          required
          :class="{ 'mf-input-focused': true }"
        />
        <MFormHelperText class="mf-form-helper-text">
          Your SSN is encrypted and used only for credit verification
        </MFormHelperText>
      </MFormControl>
    </div>
  `}),i=()=>({components:{MInput:n,MFormControl:a,MInputLabel:l},template:`
    <div class="space-y-8">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Outlined (Default)</h4>
        <div class="space-y-4 max-w-md">
          <MFormControl>
            <MInputLabel>Standard Field</MInputLabel>
            <MInput variant="outlined" placeholder="Enter text" :class="{ 'mf-input-focused': true }" />
          </MFormControl>
          <MFormControl>
            <MInputLabel>With Value</MInputLabel>
            <MInput variant="outlined" value="Sample text" :class="{ 'mf-input-focused': true }" />
          </MFormControl>
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Filled</h4>
        <div class="space-y-4 max-w-md">
          <MFormControl>
            <MInputLabel>Standard Field</MInputLabel>
            <MInput variant="filled" placeholder="Enter text" />
          </MFormControl>
          <MFormControl>
            <MInputLabel>With Value</MInputLabel>
            <MInput variant="filled" value="Sample text" />
          </MFormControl>
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Standard</h4>
        <div class="space-y-4 max-w-md">
          <MFormControl>
            <MInputLabel>Standard Field</MInputLabel>
            <MInput variant="standard" placeholder="Enter text" />
          </MFormControl>
          <MFormControl>
            <MInputLabel>With Value</MInputLabel>
            <MInput variant="standard" value="Sample text" />
          </MFormControl>
        </div>
      </div>
    </div>
  `}),m=()=>({components:{MInput:n,MFormControl:a,MInputLabel:l,MFormHelperText:p},template:`
    <div class="space-y-8">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Normal State</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Normal Input</MInputLabel>
          <MInput variant="outlined" placeholder="Enter your information" :class="{ 'mf-input-focused': true }" />
          <MFormHelperText>This is helper text</MFormHelperText>
        </MFormControl>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Focused State</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Focused Input</MInputLabel>
          <MInput variant="outlined" placeholder="This input appears focused" class="mf-input-focused" />
          <MFormHelperText>Your Town Finance brand focus styling</MFormHelperText>
        </MFormControl>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Error State</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Error Input</MInputLabel>
          <MInput variant="outlined" value="invalid@email" error class="mf-input-error" />
          <MFormHelperText error>Please enter a valid email address</MFormHelperText>
        </MFormControl>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Disabled State</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Disabled Input</MInputLabel>
          <MInput variant="outlined" value="Cannot edit this field" disabled />
          <MFormHelperText>This field is disabled</MFormHelperText>
        </MFormControl>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Required Field</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Required Input *</MInputLabel>
          <MInput variant="outlined" placeholder="This field is required" required :class="{ 'mf-input-focused': true }" />
          <MFormHelperText>* Required field</MFormHelperText>
        </MFormControl>
      </div>
    </div>
  `}),u=()=>({components:{MInput:n,MFormControl:a,MInputLabel:l},template:`
    <div class="space-y-6">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Small Size</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Small Input</MInputLabel>
          <MInput size="small" variant="outlined" placeholder="Small input field" :class="{ 'mf-input-focused': true }" />
        </MFormControl>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Medium Size (Default)</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Medium Input</MInputLabel>
          <MInput size="medium" variant="outlined" placeholder="Medium input field" :class="{ 'mf-input-focused': true }" />
        </MFormControl>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Full Width</h4>
        <MFormControl>
          <MInputLabel>Full Width Input</MInputLabel>
          <MInput variant="outlined" placeholder="This input takes full width" fullWidth :class="{ 'mf-input-focused': true }" />
        </MFormControl>
      </div>
    </div>
  `}),o=r=>({components:{MInput:n,MFormControl:a,MInputLabel:l,MFormHelperText:p},setup(){return{args:r}},data(){return{inputValue:r.value||""}},template:`
    <div class="p-6">
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-2">Input Playground</h3>
        <p class="text-gray-600">Customize the input using the controls panel.</p>
      </div>
      
      <div class="border border-gray-200 rounded-lg p-6 bg-gray-50">
        <MFormControl :class="args.fullWidth ? 'w-full' : 'max-w-md'">
          <MInputLabel v-if="args.label">{{ args.label }}</MInputLabel>
          <MInput 
            v-model="inputValue"
            v-bind="args"
            :class="getInputClass(args)"
            @input="onInput"
            @change="onChange"
            @focus="onFocus"
            @blur="onBlur"
          />
          <MFormHelperText v-if="args.helperText" :error="args.error">
            {{ args.helperText }}
          </MFormHelperText>
        </MFormControl>
      </div>
      
      <div class="mt-4 text-sm text-gray-500">
        Current value: "{{ inputValue }}" - Use the Controls panel to modify input properties.
      </div>
    </div>
  `,methods:{onInput(e){this.inputValue=e.target.value,console.log("Input event:",e.target.value)},onChange(e){console.log("Change event:",e.target.value)},onFocus(){console.log("Input focused")},onBlur(){console.log("Input blurred")},getInputClass(e){return e.error?"mf-input-error":"mf-input-focused"}}});o.args={value:"",placeholder:"Enter your loan amount",type:"text",variant:"outlined",size:"medium",disabled:!1,error:!1,required:!0,fullWidth:!1,label:"Loan Amount",helperText:"Enter amount between $1,000 and $25,000"};var d,c,f;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`args => ({
  components: {
    MInput
  },
  setup() {
    return {
      args
    };
  },
  template: \`
    <MInput 
      v-bind="args" 
      @input="onInput"
      @change="onChange"
      @focus="onFocus"
      @blur="onBlur"
    />
  \`,
  methods: {
    onInput(event) {
      console.log('Input event:', event.target.value);
    },
    onChange(event) {
      console.log('Change event:', event.target.value);
    },
    onFocus(event) {
      console.log('Focus event');
    },
    onBlur(event) {
      console.log('Blur event');
    }
  }
})`,...(f=(c=t.parameters)==null?void 0:c.docs)==null?void 0:f.source}}};var M,v,b;s.parameters={...s.parameters,docs:{...(M=s.parameters)==null?void 0:M.docs,source:{originalSource:`() => ({
  components: {
    MInput,
    MFormControl,
    MInputLabel,
    MFormHelperText
  },
  data() {
    return {
      formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        income: '',
        loanAmount: '',
        ssn: ''
      },
      errors: {}
    };
  },
  methods: {
    validateField(field, value) {
      this.errors = {
        ...this.errors
      };
      switch (field) {
        case 'email':
          if (value && !/\\S+@\\S+\\.\\S+/.test(value)) {
            this.errors.email = 'Please enter a valid email address';
          } else {
            delete this.errors.email;
          }
          break;
        case 'phone':
          if (value && !/^\\d{10}$/.test(value.replace(/\\D/g, ''))) {
            this.errors.phone = 'Please enter a valid 10-digit phone number';
          } else {
            delete this.errors.phone;
          }
          break;
        case 'income':
          if (value && isNaN(value)) {
            this.errors.income = 'Please enter a valid income amount';
          } else {
            delete this.errors.income;
          }
          break;
      }
    }
  },
  template: \`
    <div class="max-w-2xl space-y-6">
      <h3 class="text-2xl font-bold mb-6" style="color: var(--mf-primary);">Personal Loan Application</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MFormControl class="mf-form-control">
          <MInputLabel class="mf-form-label">First Name *</MInputLabel>
          <MInput
            v-model="formData.firstName"
            placeholder="Enter your first name"
            variant="outlined"
            required
            :class="{ 'mf-input-focused': true }"
          />
        </MFormControl>
        
        <MFormControl class="mf-form-control">
          <MInputLabel class="mf-form-label">Last Name *</MInputLabel>
          <MInput
            v-model="formData.lastName"
            placeholder="Enter your last name"
            variant="outlined"
            required
            :class="{ 'mf-input-focused': true }"
          />
        </MFormControl>
      </div>
      
      <MFormControl class="mf-form-control">
        <MInputLabel class="mf-form-label">Email Address *</MInputLabel>
        <MInput
          v-model="formData.email"
          type="email"
          placeholder="your.email@example.com"
          variant="outlined"
          required
          :error="!!errors.email"
          :class="{ 'mf-input-focused': !errors.email, 'mf-input-error': errors.email }"
          @blur="validateField('email', formData.email)"
        />
        <MFormHelperText 
          v-if="errors.email" 
          :error="true"
          class="mf-form-helper-text error"
        >
          {{ errors.email }}
        </MFormHelperText>
        <MFormHelperText 
          v-else
          class="mf-form-helper-text"
        >
          We'll use this to send you loan updates
        </MFormHelperText>
      </MFormControl>
      
      <MFormControl class="mf-form-control">
        <MInputLabel class="mf-form-label">Phone Number *</MInputLabel>
        <MInput
          v-model="formData.phone"
          type="tel"
          placeholder="(555) 123-4567"
          variant="outlined"
          required
          :error="!!errors.phone"
          :class="{ 'mf-input-focused': !errors.phone, 'mf-input-error': errors.phone }"
          @blur="validateField('phone', formData.phone)"
        />
        <MFormHelperText 
          v-if="errors.phone" 
          :error="true"
          class="mf-form-helper-text error"
        >
          {{ errors.phone }}
        </MFormHelperText>
      </MFormControl>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MFormControl class="mf-form-control">
          <MInputLabel class="mf-form-label">Annual Income *</MInputLabel>
          <MInput
            v-model="formData.income"
            type="number"
            placeholder="50000"
            variant="outlined"
            required
            :error="!!errors.income"
            :class="{ 'mf-input-focused': !errors.income, 'mf-input-error': errors.income }"
            @blur="validateField('income', formData.income)"
          />
          <MFormHelperText class="mf-form-helper-text">Before taxes</MFormHelperText>
        </MFormControl>
        
        <MFormControl class="mf-form-control">
          <MInputLabel class="mf-form-label">Loan Amount *</MInputLabel>
          <MInput
            v-model="formData.loanAmount"
            type="number"
            placeholder="15000"
            variant="outlined"
            required
            :class="{ 'mf-input-focused': true }"
          />
          <MFormHelperText class="mf-form-helper-text">$1,000 - $25,000</MFormHelperText>
        </MFormControl>
      </div>
      
      <MFormControl class="mf-form-control">
        <MInputLabel class="mf-form-label">Social Security Number *</MInputLabel>
        <MInput
          v-model="formData.ssn"
          type="password"
          placeholder="XXX-XX-XXXX"
          variant="outlined"
          required
          :class="{ 'mf-input-focused': true }"
        />
        <MFormHelperText class="mf-form-helper-text">
          Your SSN is encrypted and used only for credit verification
        </MFormHelperText>
      </MFormControl>
    </div>
  \`
})`,...(b=(v=s.parameters)==null?void 0:v.docs)==null?void 0:b.source}}};var h,I,F;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`() => ({
  components: {
    MInput,
    MFormControl,
    MInputLabel
  },
  template: \`
    <div class="space-y-8">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Outlined (Default)</h4>
        <div class="space-y-4 max-w-md">
          <MFormControl>
            <MInputLabel>Standard Field</MInputLabel>
            <MInput variant="outlined" placeholder="Enter text" :class="{ 'mf-input-focused': true }" />
          </MFormControl>
          <MFormControl>
            <MInputLabel>With Value</MInputLabel>
            <MInput variant="outlined" value="Sample text" :class="{ 'mf-input-focused': true }" />
          </MFormControl>
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Filled</h4>
        <div class="space-y-4 max-w-md">
          <MFormControl>
            <MInputLabel>Standard Field</MInputLabel>
            <MInput variant="filled" placeholder="Enter text" />
          </MFormControl>
          <MFormControl>
            <MInputLabel>With Value</MInputLabel>
            <MInput variant="filled" value="Sample text" />
          </MFormControl>
        </div>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Standard</h4>
        <div class="space-y-4 max-w-md">
          <MFormControl>
            <MInputLabel>Standard Field</MInputLabel>
            <MInput variant="standard" placeholder="Enter text" />
          </MFormControl>
          <MFormControl>
            <MInputLabel>With Value</MInputLabel>
            <MInput variant="standard" value="Sample text" />
          </MFormControl>
        </div>
      </div>
    </div>
  \`
})`,...(F=(I=i.parameters)==null?void 0:I.docs)==null?void 0:F.source}}};var x,g,C;m.parameters={...m.parameters,docs:{...(x=m.parameters)==null?void 0:x.docs,source:{originalSource:`() => ({
  components: {
    MInput,
    MFormControl,
    MInputLabel,
    MFormHelperText
  },
  template: \`
    <div class="space-y-8">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Normal State</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Normal Input</MInputLabel>
          <MInput variant="outlined" placeholder="Enter your information" :class="{ 'mf-input-focused': true }" />
          <MFormHelperText>This is helper text</MFormHelperText>
        </MFormControl>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Focused State</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Focused Input</MInputLabel>
          <MInput variant="outlined" placeholder="This input appears focused" class="mf-input-focused" />
          <MFormHelperText>Your Town Finance brand focus styling</MFormHelperText>
        </MFormControl>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Error State</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Error Input</MInputLabel>
          <MInput variant="outlined" value="invalid@email" error class="mf-input-error" />
          <MFormHelperText error>Please enter a valid email address</MFormHelperText>
        </MFormControl>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Disabled State</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Disabled Input</MInputLabel>
          <MInput variant="outlined" value="Cannot edit this field" disabled />
          <MFormHelperText>This field is disabled</MFormHelperText>
        </MFormControl>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Required Field</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Required Input *</MInputLabel>
          <MInput variant="outlined" placeholder="This field is required" required :class="{ 'mf-input-focused': true }" />
          <MFormHelperText>* Required field</MFormHelperText>
        </MFormControl>
      </div>
    </div>
  \`
})`,...(C=(g=m.parameters)==null?void 0:g.docs)==null?void 0:C.source}}};var L,y,T;u.parameters={...u.parameters,docs:{...(L=u.parameters)==null?void 0:L.docs,source:{originalSource:`() => ({
  components: {
    MInput,
    MFormControl,
    MInputLabel
  },
  template: \`
    <div class="space-y-6">
      <div>
        <h4 class="mb-4 text-lg font-semibold">Small Size</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Small Input</MInputLabel>
          <MInput size="small" variant="outlined" placeholder="Small input field" :class="{ 'mf-input-focused': true }" />
        </MFormControl>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Medium Size (Default)</h4>
        <MFormControl class="max-w-md">
          <MInputLabel>Medium Input</MInputLabel>
          <MInput size="medium" variant="outlined" placeholder="Medium input field" :class="{ 'mf-input-focused': true }" />
        </MFormControl>
      </div>
      
      <div>
        <h4 class="mb-4 text-lg font-semibold">Full Width</h4>
        <MFormControl>
          <MInputLabel>Full Width Input</MInputLabel>
          <MInput variant="outlined" placeholder="This input takes full width" fullWidth :class="{ 'mf-input-focused': true }" />
        </MFormControl>
      </div>
    </div>
  \`
})`,...(T=(y=u.parameters)==null?void 0:y.docs)==null?void 0:T.source}}};var S,H,w;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`args => ({
  components: {
    MInput,
    MFormControl,
    MInputLabel,
    MFormHelperText
  },
  setup() {
    return {
      args
    };
  },
  data() {
    return {
      inputValue: args.value || ''
    };
  },
  template: \`
    <div class="p-6">
      <div class="mb-6">
        <h3 class="text-xl font-semibold mb-2">Input Playground</h3>
        <p class="text-gray-600">Customize the input using the controls panel.</p>
      </div>
      
      <div class="border border-gray-200 rounded-lg p-6 bg-gray-50">
        <MFormControl :class="args.fullWidth ? 'w-full' : 'max-w-md'">
          <MInputLabel v-if="args.label">{{ args.label }}</MInputLabel>
          <MInput 
            v-model="inputValue"
            v-bind="args"
            :class="getInputClass(args)"
            @input="onInput"
            @change="onChange"
            @focus="onFocus"
            @blur="onBlur"
          />
          <MFormHelperText v-if="args.helperText" :error="args.error">
            {{ args.helperText }}
          </MFormHelperText>
        </MFormControl>
      </div>
      
      <div class="mt-4 text-sm text-gray-500">
        Current value: "{{ inputValue }}" - Use the Controls panel to modify input properties.
      </div>
    </div>
  \`,
  methods: {
    onInput(event) {
      this.inputValue = event.target.value;
      console.log('Input event:', event.target.value);
    },
    onChange(event) {
      console.log('Change event:', event.target.value);
    },
    onFocus() {
      console.log('Input focused');
    },
    onBlur() {
      console.log('Input blurred');
    },
    getInputClass(args) {
      if (args.error) return 'mf-input-error';
      return 'mf-input-focused';
    }
  }
})`,...(w=(H=o.parameters)==null?void 0:H.docs)==null?void 0:w.source}}};const X=["Default","LoanApplicationForm","InputVariants","InputStates","InputSizes","Playground"];export{t as Default,u as InputSizes,m as InputStates,i as InputVariants,s as LoanApplicationForm,o as Playground,X as __namedExportsOrder,W as default};
