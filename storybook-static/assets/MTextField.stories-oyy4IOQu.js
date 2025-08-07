import{M as e}from"./MTextField-OPGGVjaU.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const j={title:"Material UI/MTextField",component:e,parameters:{docs:{description:{component:"Material Design text field component with support for various input types, validation, icons, and accessibility features."}}},argTypes:{type:{control:{type:"select"},options:["text","email","password","number","tel","url","search"]},variant:{control:{type:"select"},options:["outlined","filled","standard"]},size:{control:{type:"select"},options:["sm","md","lg"]}}},n={args:{label:"First Name",placeholder:"Enter your first name"}},r={render:()=>({components:{MTextField:e},data(){return{values:{outlined:"",filled:"",standard:""}}},template:`
      <div class="space-y-6">
        <MTextField 
          v-model="values.outlined"
          variant="outlined" 
          label="Outlined Field" 
          placeholder="Type here..."
        />
        
        <MTextField 
          v-model="values.filled"
          variant="filled" 
          label="Filled Field" 
          placeholder="Type here..."
        />
        
        <MTextField 
          v-model="values.standard"
          variant="standard" 
          label="Standard Field" 
          placeholder="Type here..."
        />
      </div>
    `})},l={render:()=>({components:{MTextField:e},data(){return{values:{text:"",email:"",password:"",number:"",tel:"",url:""}}},template:`
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MTextField 
          v-model="values.text"
          type="text" 
          label="Text Input" 
          placeholder="Enter text"
        />
        
        <MTextField 
          v-model="values.email"
          type="email" 
          label="Email" 
          placeholder="user@example.com"
        />
        
        <MTextField 
          v-model="values.password"
          type="password" 
          label="Password" 
          placeholder="Enter password"
        />
        
        <MTextField 
          v-model="values.number"
          type="number" 
          label="Number" 
          placeholder="123"
        />
        
        <MTextField 
          v-model="values.tel"
          type="tel" 
          label="Phone" 
          placeholder="(555) 123-4567"
        />
        
        <MTextField 
          v-model="values.url"
          type="url" 
          label="Website" 
          placeholder="https://example.com"
        />
      </div>
    `})},a={render:()=>({components:{MTextField:e},data(){return{values:{prepend:"",append:"",both:"",clearable:"Clear me!"}}},template:`
      <div class="space-y-4">
        <MTextField 
          v-model="values.prepend"
          label="With Prepend Icon" 
          prepend-icon="fas fa-user"
          placeholder="Username"
        />
        
        <MTextField 
          v-model="values.append"
          label="With Append Icon" 
          append-icon="fas fa-search"
          placeholder="Search..."
        />
        
        <MTextField 
          v-model="values.both"
          label="Both Icons" 
          prepend-icon="fas fa-envelope"
          append-icon="fas fa-check"
          placeholder="Email address"
        />
        
        <MTextField 
          v-model="values.clearable"
          label="Clearable Field" 
          :clearable="true"
          placeholder="Type to see clear button"
        />
      </div>
    `})},o={render:()=>({components:{MTextField:e},data(){return{values:{error:"invalid@email",helper:"",required:""}}},template:`
      <div class="space-y-4">
        <MTextField 
          v-model="values.error"
          label="Email with Error" 
          type="email"
          error-message="Please enter a valid email address"
          :required="true"
        />
        
        <MTextField 
          v-model="values.helper"
          label="Field with Helper Text" 
          helper-text="This field helps you understand what to enter"
          placeholder="Enter some text"
        />
        
        <MTextField 
          v-model="values.required"
          label="Required Field" 
          :required="true"
          placeholder="This field is required"
        />
      </div>
    `})},t={render:()=>({components:{MTextField:e},data(){return{values:{small:"",medium:"",large:""}}},template:`
      <div class="space-y-4">
        <MTextField 
          v-model="values.small"
          size="sm" 
          label="Small Field" 
          placeholder="Small size"
        />
        
        <MTextField 
          v-model="values.medium"
          size="md" 
          label="Medium Field" 
          placeholder="Medium size (default)"
        />
        
        <MTextField 
          v-model="values.large"
          size="lg" 
          label="Large Field" 
          placeholder="Large size"
        />
      </div>
    `})},d={render:()=>({components:{MTextField:e},data(){return{value:""}},template:`
      <div class="space-y-4">
        <MTextField 
          v-model="value"
          :multiline="true"
          :rows="4"
          label="Message" 
          placeholder="Enter your message here..."
          helper-text="Please provide detailed information"
        />
      </div>
    `})},s={render:()=>({components:{MTextField:e},data(){return{value:""}},template:`
      <div class="space-y-4">
        <MTextField 
          v-model="value"
          label="Bio" 
          :multiline="true"
          :rows="3"
          :maxlength="150"
          :show-counter="true"
          placeholder="Tell us about yourself..."
          helper-text="Keep it brief and engaging"
        />
      </div>
    `})},i={render:()=>({components:{MTextField:e},data(){return{values:{disabled:"This field is disabled",readonly:"This field is readonly"}}},template:`
      <div class="space-y-4">
        <MTextField 
          v-model="values.disabled"
          label="Disabled Field" 
          :disabled="true"
        />
        
        <MTextField 
          v-model="values.readonly"
          label="Readonly Field" 
          :readonly="true"
        />
      </div>
    `})},m={render:()=>({components:{MTextField:e},data(){return{values:{wrapped:"",extended:"",both:""}}},template:`
      <div class="space-y-6">
        <h3 class="text-lg font-semibold mb-4">Wrap & Extend Functionality</h3>
        
        <!-- Wrapped Field -->
        <MTextField 
          v-model="values.wrapped"
          label="Wrapped Field" 
          placeholder="This field has custom wrapper styling"
          :wrap="true"
          wrapper-class="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg"
          prepend-icon="fas fa-user"
        />
        
        <!-- Extended Field -->
        <MTextField 
          v-model="values.extended"
          label="Extended Field" 
          placeholder="This field has extended classes"
          :extend="true"
          extended-class="shadow-lg border-2 border-purple-300"
          prepend-icon="fas fa-envelope"
        />
        
        <!-- Both Wrap and Extend -->
        <MTextField 
          v-model="values.both"
          label="Wrapped & Extended Field" 
          placeholder="Combines both wrap and extend features"
          :wrap="true"
          :extend="true"
          wrapper-class="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl"
          extended-class="border-2 border-purple-400 shadow-xl"
          prepend-icon="fas fa-star"
        />
        
        <!-- Form Card Example -->
        <div class="mt-8">
          <h4 class="text-md font-semibold mb-4">Semantic Form Grouping</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MTextField 
              v-model="values.wrapped"
              label="Contact Information" 
              placeholder="Phone number"
              :wrap="true"
              wrapper-class="p-4 bg-green-50 border border-green-200 rounded-lg"
              prepend-icon="fas fa-phone"
              helper-text="Primary contact method"
            />
            
            <MTextField 
              v-model="values.extended"
              label="Emergency Contact" 
              placeholder="Emergency phone"
              :extend="true"
              extended-class="border-2 border-red-300 bg-red-50"
              prepend-icon="fas fa-exclamation-triangle"
              helper-text="For urgent matters only"
            />
          </div>
        </div>
      </div>
    `}),parameters:{docs:{description:{story:"Demonstrates wrap and extend functionality for semantic form grouping and custom styling."}}}},p={render:()=>({components:{MTextField:e},data(){return{form:{firstName:"",lastName:"",email:"",phone:"",ssn:"",income:"",loanAmount:"",purpose:"",employer:"",yearsEmployed:""},errors:{}}},methods:{validateForm(){this.errors={},this.form.firstName||(this.errors.firstName="First name is required"),this.form.lastName||(this.errors.lastName="Last name is required"),(!this.form.email||!this.form.email.includes("@"))&&(this.errors.email="Valid email is required"),this.form.phone||(this.errors.phone="Phone number is required"),(!this.form.ssn||this.form.ssn.length<9)&&(this.errors.ssn="Valid SSN is required"),(!this.form.income||this.form.income<1e3)&&(this.errors.income="Annual income must be at least $1,000"),(!this.form.loanAmount||this.form.loanAmount<1e3)&&(this.errors.loanAmount="Loan amount must be at least $1,000")}},template:`
      <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-6">Loan Application</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Personal Information -->
          <MTextField 
            v-model="form.firstName"
            label="First Name" 
            :required="true"
            :error-message="errors.firstName"
            placeholder="John"
            @blur="validateForm"
          />
          
          <MTextField 
            v-model="form.lastName"
            label="Last Name" 
            :required="true"
            :error-message="errors.lastName"
            placeholder="Doe"
            @blur="validateForm"
          />
          
          <MTextField 
            v-model="form.email"
            type="email"
            label="Email Address" 
            :required="true"
            :error-message="errors.email"
            placeholder="john.doe@email.com"
            prepend-icon="fas fa-envelope"
            @blur="validateForm"
          />
          
          <MTextField 
            v-model="form.phone"
            type="tel"
            label="Phone Number" 
            :required="true"
            :error-message="errors.phone"
            placeholder="(555) 123-4567"
            prepend-icon="fas fa-phone"
            @blur="validateForm"
          />
          
          <MTextField 
            v-model="form.ssn"
            type="password"
            label="Social Security Number" 
            :required="true"
            :error-message="errors.ssn"
            placeholder="XXX-XX-XXXX"
            prepend-icon="fas fa-shield-alt"
            helper-text="Your SSN is encrypted and secure"
            @blur="validateForm"
          />
          
          <!-- Financial Information -->
          <MTextField 
            v-model="form.income"
            type="number"
            label="Annual Income" 
            :required="true"
            :error-message="errors.income"
            placeholder="50000"
            prepend-icon="fas fa-dollar-sign"
            @blur="validateForm"
          />
          
          <MTextField 
            v-model="form.loanAmount"
            type="number"
            label="Requested Loan Amount" 
            :required="true"
            :error-message="errors.loanAmount"
            placeholder="15000"
            prepend-icon="fas fa-money-bill-wave"
            @blur="validateForm"
          />
          
          <MTextField 
            v-model="form.employer"
            label="Current Employer" 
            placeholder="ABC Company Inc."
            prepend-icon="fas fa-building"
          />
          
          <MTextField 
            v-model="form.yearsEmployed"
            type="number"
            label="Years with Current Employer" 
            placeholder="3"
            prepend-icon="fas fa-calendar-alt"
          />
        </div>
        
        <!-- Loan Purpose -->
        <div class="mt-4">
          <MTextField 
            v-model="form.purpose"
            :multiline="true"
            :rows="3"
            label="Loan Purpose" 
            placeholder="Please describe how you plan to use this loan..."
            :maxlength="500"
            :show-counter="true"
            helper-text="Help us understand your financial goals"
          />
        </div>
        
        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
          <p class="text-sm text-blue-800">
            <strong>Next Steps:</strong> After submitting your application, you'll receive a decision within 24 hours. 
            Our team may contact you for additional verification.
          </p>
        </div>
      </div>
    `}),parameters:{docs:{description:{story:"Complete loan application form demonstrating various text field configurations used in financial services."}}}};var u,c,h;n.parameters={...n.parameters,docs:{...(u=n.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    label: 'First Name',
    placeholder: 'Enter your first name'
  }
}`,...(h=(c=n.parameters)==null?void 0:c.docs)==null?void 0:h.source}}};var v,b,f;r.parameters={...r.parameters,docs:{...(v=r.parameters)==null?void 0:v.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MTextField
    },
    data() {
      return {
        values: {
          outlined: '',
          filled: '',
          standard: ''
        }
      };
    },
    template: \`
      <div class="space-y-6">
        <MTextField 
          v-model="values.outlined"
          variant="outlined" 
          label="Outlined Field" 
          placeholder="Type here..."
        />
        
        <MTextField 
          v-model="values.filled"
          variant="filled" 
          label="Filled Field" 
          placeholder="Type here..."
        />
        
        <MTextField 
          v-model="values.standard"
          variant="standard" 
          label="Standard Field" 
          placeholder="Type here..."
        />
      </div>
    \`
  })
}`,...(f=(b=r.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var x,F,g;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MTextField
    },
    data() {
      return {
        values: {
          text: '',
          email: '',
          password: '',
          number: '',
          tel: '',
          url: ''
        }
      };
    },
    template: \`
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <MTextField 
          v-model="values.text"
          type="text" 
          label="Text Input" 
          placeholder="Enter text"
        />
        
        <MTextField 
          v-model="values.email"
          type="email" 
          label="Email" 
          placeholder="user@example.com"
        />
        
        <MTextField 
          v-model="values.password"
          type="password" 
          label="Password" 
          placeholder="Enter password"
        />
        
        <MTextField 
          v-model="values.number"
          type="number" 
          label="Number" 
          placeholder="123"
        />
        
        <MTextField 
          v-model="values.tel"
          type="tel" 
          label="Phone" 
          placeholder="(555) 123-4567"
        />
        
        <MTextField 
          v-model="values.url"
          type="url" 
          label="Website" 
          placeholder="https://example.com"
        />
      </div>
    \`
  })
}`,...(g=(F=l.parameters)==null?void 0:F.docs)==null?void 0:g.source}}};var y,T,M;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MTextField
    },
    data() {
      return {
        values: {
          prepend: '',
          append: '',
          both: '',
          clearable: 'Clear me!'
        }
      };
    },
    template: \`
      <div class="space-y-4">
        <MTextField 
          v-model="values.prepend"
          label="With Prepend Icon" 
          prepend-icon="fas fa-user"
          placeholder="Username"
        />
        
        <MTextField 
          v-model="values.append"
          label="With Append Icon" 
          append-icon="fas fa-search"
          placeholder="Search..."
        />
        
        <MTextField 
          v-model="values.both"
          label="Both Icons" 
          prepend-icon="fas fa-envelope"
          append-icon="fas fa-check"
          placeholder="Email address"
        />
        
        <MTextField 
          v-model="values.clearable"
          label="Clearable Field" 
          :clearable="true"
          placeholder="Type to see clear button"
        />
      </div>
    \`
  })
}`,...(M=(T=a.parameters)==null?void 0:T.docs)==null?void 0:M.source}}};var w,E,q;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MTextField
    },
    data() {
      return {
        values: {
          error: 'invalid@email',
          helper: '',
          required: ''
        }
      };
    },
    template: \`
      <div class="space-y-4">
        <MTextField 
          v-model="values.error"
          label="Email with Error" 
          type="email"
          error-message="Please enter a valid email address"
          :required="true"
        />
        
        <MTextField 
          v-model="values.helper"
          label="Field with Helper Text" 
          helper-text="This field helps you understand what to enter"
          placeholder="Enter some text"
        />
        
        <MTextField 
          v-model="values.required"
          label="Required Field" 
          :required="true"
          placeholder="This field is required"
        />
      </div>
    \`
  })
}`,...(q=(E=o.parameters)==null?void 0:E.docs)==null?void 0:q.source}}};var N,S,A;t.parameters={...t.parameters,docs:{...(N=t.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MTextField
    },
    data() {
      return {
        values: {
          small: '',
          medium: '',
          large: ''
        }
      };
    },
    template: \`
      <div class="space-y-4">
        <MTextField 
          v-model="values.small"
          size="sm" 
          label="Small Field" 
          placeholder="Small size"
        />
        
        <MTextField 
          v-model="values.medium"
          size="md" 
          label="Medium Field" 
          placeholder="Medium size (default)"
        />
        
        <MTextField 
          v-model="values.large"
          size="lg" 
          label="Large Field" 
          placeholder="Large size"
        />
      </div>
    \`
  })
}`,...(A=(S=t.parameters)==null?void 0:S.docs)==null?void 0:A.source}}};var C,P,I;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MTextField
    },
    data() {
      return {
        value: ''
      };
    },
    template: \`
      <div class="space-y-4">
        <MTextField 
          v-model="value"
          :multiline="true"
          :rows="4"
          label="Message" 
          placeholder="Enter your message here..."
          helper-text="Please provide detailed information"
        />
      </div>
    \`
  })
}`,...(I=(P=d.parameters)==null?void 0:P.docs)==null?void 0:I.source}}};var W,L,X;s.parameters={...s.parameters,docs:{...(W=s.parameters)==null?void 0:W.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MTextField
    },
    data() {
      return {
        value: ''
      };
    },
    template: \`
      <div class="space-y-4">
        <MTextField 
          v-model="value"
          label="Bio" 
          :multiline="true"
          :rows="3"
          :maxlength="150"
          :show-counter="true"
          placeholder="Tell us about yourself..."
          helper-text="Keep it brief and engaging"
        />
      </div>
    \`
  })
}`,...(X=(L=s.parameters)==null?void 0:L.docs)==null?void 0:X.source}}};var z,D,B;i.parameters={...i.parameters,docs:{...(z=i.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MTextField
    },
    data() {
      return {
        values: {
          disabled: 'This field is disabled',
          readonly: 'This field is readonly'
        }
      };
    },
    template: \`
      <div class="space-y-4">
        <MTextField 
          v-model="values.disabled"
          label="Disabled Field" 
          :disabled="true"
        />
        
        <MTextField 
          v-model="values.readonly"
          label="Readonly Field" 
          :readonly="true"
        />
      </div>
    \`
  })
}`,...(B=(D=i.parameters)==null?void 0:D.docs)==null?void 0:B.source}}};var R,V,Y;m.parameters={...m.parameters,docs:{...(R=m.parameters)==null?void 0:R.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MTextField
    },
    data() {
      return {
        values: {
          wrapped: '',
          extended: '',
          both: ''
        }
      };
    },
    template: \`
      <div class="space-y-6">
        <h3 class="text-lg font-semibold mb-4">Wrap & Extend Functionality</h3>
        
        <!-- Wrapped Field -->
        <MTextField 
          v-model="values.wrapped"
          label="Wrapped Field" 
          placeholder="This field has custom wrapper styling"
          :wrap="true"
          wrapper-class="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg"
          prepend-icon="fas fa-user"
        />
        
        <!-- Extended Field -->
        <MTextField 
          v-model="values.extended"
          label="Extended Field" 
          placeholder="This field has extended classes"
          :extend="true"
          extended-class="shadow-lg border-2 border-purple-300"
          prepend-icon="fas fa-envelope"
        />
        
        <!-- Both Wrap and Extend -->
        <MTextField 
          v-model="values.both"
          label="Wrapped & Extended Field" 
          placeholder="Combines both wrap and extend features"
          :wrap="true"
          :extend="true"
          wrapper-class="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl"
          extended-class="border-2 border-purple-400 shadow-xl"
          prepend-icon="fas fa-star"
        />
        
        <!-- Form Card Example -->
        <div class="mt-8">
          <h4 class="text-md font-semibold mb-4">Semantic Form Grouping</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MTextField 
              v-model="values.wrapped"
              label="Contact Information" 
              placeholder="Phone number"
              :wrap="true"
              wrapper-class="p-4 bg-green-50 border border-green-200 rounded-lg"
              prepend-icon="fas fa-phone"
              helper-text="Primary contact method"
            />
            
            <MTextField 
              v-model="values.extended"
              label="Emergency Contact" 
              placeholder="Emergency phone"
              :extend="true"
              extended-class="border-2 border-red-300 bg-red-50"
              prepend-icon="fas fa-exclamation-triangle"
              helper-text="For urgent matters only"
            />
          </div>
        </div>
      </div>
    \`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates wrap and extend functionality for semantic form grouping and custom styling.'
      }
    }
  }
}`,...(Y=(V=m.parameters)==null?void 0:V.docs)==null?void 0:Y.source}}};var O,k,H;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MTextField
    },
    data() {
      return {
        form: {
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          ssn: '',
          income: '',
          loanAmount: '',
          purpose: '',
          employer: '',
          yearsEmployed: ''
        },
        errors: {}
      };
    },
    methods: {
      validateForm() {
        this.errors = {};
        if (!this.form.firstName) {
          this.errors.firstName = 'First name is required';
        }
        if (!this.form.lastName) {
          this.errors.lastName = 'Last name is required';
        }
        if (!this.form.email || !this.form.email.includes('@')) {
          this.errors.email = 'Valid email is required';
        }
        if (!this.form.phone) {
          this.errors.phone = 'Phone number is required';
        }
        if (!this.form.ssn || this.form.ssn.length < 9) {
          this.errors.ssn = 'Valid SSN is required';
        }
        if (!this.form.income || this.form.income < 1000) {
          this.errors.income = 'Annual income must be at least $1,000';
        }
        if (!this.form.loanAmount || this.form.loanAmount < 1000) {
          this.errors.loanAmount = 'Loan amount must be at least $1,000';
        }
      }
    },
    template: \`
      <div class="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-6">Loan Application</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Personal Information -->
          <MTextField 
            v-model="form.firstName"
            label="First Name" 
            :required="true"
            :error-message="errors.firstName"
            placeholder="John"
            @blur="validateForm"
          />
          
          <MTextField 
            v-model="form.lastName"
            label="Last Name" 
            :required="true"
            :error-message="errors.lastName"
            placeholder="Doe"
            @blur="validateForm"
          />
          
          <MTextField 
            v-model="form.email"
            type="email"
            label="Email Address" 
            :required="true"
            :error-message="errors.email"
            placeholder="john.doe@email.com"
            prepend-icon="fas fa-envelope"
            @blur="validateForm"
          />
          
          <MTextField 
            v-model="form.phone"
            type="tel"
            label="Phone Number" 
            :required="true"
            :error-message="errors.phone"
            placeholder="(555) 123-4567"
            prepend-icon="fas fa-phone"
            @blur="validateForm"
          />
          
          <MTextField 
            v-model="form.ssn"
            type="password"
            label="Social Security Number" 
            :required="true"
            :error-message="errors.ssn"
            placeholder="XXX-XX-XXXX"
            prepend-icon="fas fa-shield-alt"
            helper-text="Your SSN is encrypted and secure"
            @blur="validateForm"
          />
          
          <!-- Financial Information -->
          <MTextField 
            v-model="form.income"
            type="number"
            label="Annual Income" 
            :required="true"
            :error-message="errors.income"
            placeholder="50000"
            prepend-icon="fas fa-dollar-sign"
            @blur="validateForm"
          />
          
          <MTextField 
            v-model="form.loanAmount"
            type="number"
            label="Requested Loan Amount" 
            :required="true"
            :error-message="errors.loanAmount"
            placeholder="15000"
            prepend-icon="fas fa-money-bill-wave"
            @blur="validateForm"
          />
          
          <MTextField 
            v-model="form.employer"
            label="Current Employer" 
            placeholder="ABC Company Inc."
            prepend-icon="fas fa-building"
          />
          
          <MTextField 
            v-model="form.yearsEmployed"
            type="number"
            label="Years with Current Employer" 
            placeholder="3"
            prepend-icon="fas fa-calendar-alt"
          />
        </div>
        
        <!-- Loan Purpose -->
        <div class="mt-4">
          <MTextField 
            v-model="form.purpose"
            :multiline="true"
            :rows="3"
            label="Loan Purpose" 
            placeholder="Please describe how you plan to use this loan..."
            :maxlength="500"
            :show-counter="true"
            helper-text="Help us understand your financial goals"
          />
        </div>
        
        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
          <p class="text-sm text-blue-800">
            <strong>Next Steps:</strong> After submitting your application, you'll receive a decision within 24 hours. 
            Our team may contact you for additional verification.
          </p>
        </div>
      </div>
    \`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Complete loan application form demonstrating various text field configurations used in financial services.'
      }
    }
  }
}`,...(H=(k=p.parameters)==null?void 0:k.docs)==null?void 0:H.source}}};const G=["Default","Variants","InputTypes","WithIcons","Validation","Sizes","TextArea","CharacterCounter","DisabledAndReadonly","WrapExtendFunctionality","YourTownFinanceForm"];export{s as CharacterCounter,n as Default,i as DisabledAndReadonly,l as InputTypes,t as Sizes,d as TextArea,o as Validation,r as Variants,a as WithIcons,m as WrapExtendFunctionality,p as YourTownFinanceForm,G as __namedExportsOrder,j as default};
