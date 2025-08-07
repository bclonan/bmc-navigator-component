import{M as e}from"./MSelect-BPYUGOCn.js";import"./vue.esm-bundler-BOts1VAj.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const W={title:"Material UI/MSelect",component:e,parameters:{docs:{description:{component:"Material Design select component with dropdown functionality, search capabilities, and multiple selection support."}}},argTypes:{variant:{control:{type:"select"},options:["outlined","filled","standard"]},size:{control:{type:"select"},options:["sm","md","lg"]}}},n={args:{label:"Choose Option",options:[{value:"option1",text:"Option 1"},{value:"option2",text:"Option 2"},{value:"option3",text:"Option 3"}]}},t={render:()=>({components:{MSelect:e},data(){return{values:{outlined:"",filled:"",standard:""},options:[{value:"option1",text:"Option 1"},{value:"option2",text:"Option 2"},{value:"option3",text:"Option 3"}]}},template:`
      <div class="space-y-6">
        <MSelect 
          v-model="values.outlined"
          variant="outlined" 
          label="Outlined Select" 
          :options="options"
          placeholder="Choose option..."
        />
        
        <MSelect 
          v-model="values.filled"
          variant="filled" 
          label="Filled Select" 
          :options="options"
          placeholder="Choose option..."
        />
        
        <MSelect 
          v-model="values.standard"
          variant="standard" 
          label="Standard Select" 
          :options="options"
          placeholder="Choose option..."
        />
      </div>
    `})},a={render:()=>({components:{MSelect:e},data(){return{values:{country:"",currency:"",category:""},countries:[{value:"us",text:"United States"},{value:"ca",text:"Canada"},{value:"uk",text:"United Kingdom"}],currencies:[{value:"usd",text:"US Dollar (USD)"},{value:"eur",text:"Euro (EUR)"},{value:"gbp",text:"British Pound (GBP)"}],categories:[{value:"personal",text:"Personal Loan"},{value:"auto",text:"Auto Loan"},{value:"home",text:"Home Loan"}]}},template:`
      <div class="space-y-4">
        <MSelect 
          v-model="values.country"
          label="Country" 
          :options="countries"
          prepend-icon="fas fa-globe"
          placeholder="Select country..."
        />
        
        <MSelect 
          v-model="values.currency"
          label="Currency" 
          :options="currencies"
          prepend-icon="fas fa-dollar-sign"
          placeholder="Select currency..."
        />
        
        <MSelect 
          v-model="values.category"
          label="Loan Category" 
          :options="categories"
          prepend-icon="fas fa-tag"
          placeholder="Select category..."
        />
      </div>
    `})},o={render:()=>({components:{MSelect:e},data(){return{value:"",states:[{value:"al",text:"Alabama"},{value:"ak",text:"Alaska"},{value:"az",text:"Arizona"},{value:"ar",text:"Arkansas"},{value:"ca",text:"California"},{value:"co",text:"Colorado"},{value:"ct",text:"Connecticut"},{value:"de",text:"Delaware"},{value:"fl",text:"Florida"},{value:"ga",text:"Georgia"}]}},template:`
      <MSelect 
        v-model="value"
        label="State" 
        :options="states"
        :searchable="true"
        prepend-icon="fas fa-map-marker-alt"
        placeholder="Search for a state..."
        helper-text="Type to search through available states"
      />
    `})},l={render:()=>({components:{MSelect:e},data(){return{selectedSkills:[],skills:[{value:"javascript",text:"JavaScript"},{value:"python",text:"Python"},{value:"java",text:"Java"},{value:"csharp",text:"C#"},{value:"php",text:"PHP"},{value:"ruby",text:"Ruby"},{value:"swift",text:"Swift"},{value:"kotlin",text:"Kotlin"}]}},template:`
      <MSelect 
        v-model="selectedSkills"
        label="Technical Skills" 
        :options="skills"
        :multiple="true"
        :searchable="true"
        prepend-icon="fas fa-code"
        placeholder="Select multiple skills..."
        helper-text="Choose all applicable technical skills"
      />
    `})},r={render:()=>({components:{MSelect:e},data(){return{values:{error:"",required:""},options:[{value:"option1",text:"Option 1"},{value:"option2",text:"Option 2"},{value:"option3",text:"Option 3"}]}},template:`
      <div class="space-y-4">
        <MSelect 
          v-model="values.error"
          label="Selection with Error" 
          :options="options"
          error-message="Please select a valid option"
          placeholder="Make a selection..."
        />
        
        <MSelect 
          v-model="values.required"
          label="Required Selection" 
          :options="options"
          :required="true"
          placeholder="This field is required"
          helper-text="You must make a selection to continue"
        />
      </div>
    `})},s={render:()=>({components:{MSelect:e},data(){return{values:{wrapped:"",extended:"",both:""},options:[{value:"basic",text:"Basic Plan"},{value:"premium",text:"Premium Plan"},{value:"enterprise",text:"Enterprise Plan"}]}},template:`
      <div class="space-y-6">
        <h3 class="text-lg font-semibold mb-4">Wrap & Extend Functionality</h3>
        
        <!-- Wrapped Select -->
        <MSelect 
          v-model="values.wrapped"
          label="Wrapped Select" 
          :options="options"
          placeholder="Select a plan..."
          :wrap="true"
          wrapper-class="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg"
          prepend-icon="fas fa-box"
        />
        
        <!-- Extended Select -->
        <MSelect 
          v-model="values.extended"
          label="Extended Select" 
          :options="options"
          placeholder="Select a plan..."
          :extend="true"
          extended-class="shadow-lg border-2 border-purple-300"
          prepend-icon="fas fa-star"
        />
        
        <!-- Both Wrap and Extend -->
        <MSelect 
          v-model="values.both"
          label="Wrapped & Extended Select" 
          :options="options"
          placeholder="Select a plan..."
          :wrap="true"
          :extend="true"
          wrapper-class="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl"
          extended-class="border-2 border-green-400 shadow-xl"
          prepend-icon="fas fa-crown"
        />
        
        <!-- Semantic Grouping Example -->
        <div class="mt-8">
          <h4 class="text-md font-semibold mb-4">Service Tier Selection</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MSelect 
              v-model="values.wrapped"
              label="Primary Service" 
              :options="options"
              placeholder="Main service tier"
              :wrap="true"
              wrapper-class="p-4 bg-green-50 border border-green-200 rounded-lg"
              prepend-icon="fas fa-check-circle"
              helper-text="Your main service level"
            />
            
            <MSelect 
              v-model="values.extended"
              label="Backup Service" 
              :options="options"
              placeholder="Fallback tier"
              :extend="true"
              extended-class="border-2 border-orange-300 bg-orange-50"
              prepend-icon="fas fa-shield-alt"
              helper-text="Secondary service option"
            />
          </div>
        </div>
      </div>
    `}),parameters:{docs:{description:{story:"Demonstrates wrap and extend functionality for semantic form grouping and custom styling of select components."}}}},i={render:()=>({components:{MSelect:e},data(){return{application:{loanType:"",term:"",purpose:"",employment:"",creditRange:"",state:""},loanTypes:[{value:"personal",text:"Personal Loan"},{value:"auto",text:"Auto Loan"},{value:"home",text:"Home Improvement"},{value:"debt",text:"Debt Consolidation"}],loanTerms:[{value:"12",text:"12 months"},{value:"24",text:"24 months"},{value:"36",text:"36 months"},{value:"48",text:"48 months"},{value:"60",text:"60 months"},{value:"72",text:"72 months"}],purposes:[{value:"debt_consolidation",text:"Debt Consolidation"},{value:"home_improvement",text:"Home Improvement"},{value:"auto_repair",text:"Auto Repair"},{value:"medical",text:"Medical Expenses"},{value:"education",text:"Education"},{value:"vacation",text:"Vacation"},{value:"other",text:"Other"}],employmentTypes:[{value:"full_time",text:"Full-time Employee"},{value:"part_time",text:"Part-time Employee"},{value:"self_employed",text:"Self-employed"},{value:"contractor",text:"Independent Contractor"},{value:"retired",text:"Retired"},{value:"unemployed",text:"Unemployed"}],creditRanges:[{value:"excellent",text:"Excellent (750+)"},{value:"good",text:"Good (700-749)"},{value:"fair",text:"Fair (650-699)"},{value:"poor",text:"Poor (600-649)"},{value:"unknown",text:"I don't know"}],states:[{value:"ca",text:"California"},{value:"tx",text:"Texas"},{value:"fl",text:"Florida"},{value:"ny",text:"New York"},{value:"pa",text:"Pennsylvania"}]}},template:`
      <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-6">Loan Application - Basic Information</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Loan Details -->
          <MSelect 
            v-model="application.loanType"
            label="Loan Type" 
            :options="loanTypes"
            :required="true"
            prepend-icon="fas fa-money-bill-wave"
            placeholder="Select loan type..."
            helper-text="Choose the type of loan you need"
          />
          
          <MSelect 
            v-model="application.term"
            label="Loan Term" 
            :options="loanTerms"
            :required="true"
            prepend-icon="fas fa-calendar-alt"
            placeholder="Select term length..."
            helper-text="Choose your preferred repayment period"
          />
          
          <MSelect 
            v-model="application.purpose"
            label="Loan Purpose" 
            :options="purposes"
            :required="true"
            :searchable="true"
            prepend-icon="fas fa-target"
            placeholder="Search loan purposes..."
            helper-text="What will you use this loan for?"
          />
          
          <MSelect 
            v-model="application.employment"
            label="Employment Status" 
            :options="employmentTypes"
            :required="true"
            prepend-icon="fas fa-briefcase"
            placeholder="Select employment status..."
            helper-text="Your current employment situation"
          />
          
          <MSelect 
            v-model="application.creditRange"
            label="Credit Score Range" 
            :options="creditRanges"
            :required="true"
            prepend-icon="fas fa-chart-line"
            placeholder="Select credit range..."
            helper-text="Approximate credit score range"
          />
          
          <MSelect 
            v-model="application.state"
            label="State" 
            :options="states"
            :required="true"
            :searchable="true"
            prepend-icon="fas fa-map-marker-alt"
            placeholder="Search states..."
            helper-text="Your state of residence"
          />
        </div>
        
        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
          <p class="text-sm text-blue-800">
            <strong>Pre-qualification:</strong> Based on your selections, we'll provide an estimated 
            rate and terms. This won't affect your credit score.
          </p>
        </div>
      </div>
    `}),parameters:{docs:{description:{story:"Complete loan application form demonstrating various select configurations used in financial services."}}}};var p,c,d;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: 'Choose Option',
    options: [{
      value: 'option1',
      text: 'Option 1'
    }, {
      value: 'option2',
      text: 'Option 2'
    }, {
      value: 'option3',
      text: 'Option 3'
    }]
  }
}`,...(d=(c=n.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var u,m,v;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MSelect
    },
    data() {
      return {
        values: {
          outlined: '',
          filled: '',
          standard: ''
        },
        options: [{
          value: 'option1',
          text: 'Option 1'
        }, {
          value: 'option2',
          text: 'Option 2'
        }, {
          value: 'option3',
          text: 'Option 3'
        }]
      };
    },
    template: \`
      <div class="space-y-6">
        <MSelect 
          v-model="values.outlined"
          variant="outlined" 
          label="Outlined Select" 
          :options="options"
          placeholder="Choose option..."
        />
        
        <MSelect 
          v-model="values.filled"
          variant="filled" 
          label="Filled Select" 
          :options="options"
          placeholder="Choose option..."
        />
        
        <MSelect 
          v-model="values.standard"
          variant="standard" 
          label="Standard Select" 
          :options="options"
          placeholder="Choose option..."
        />
      </div>
    \`
  })
}`,...(v=(m=t.parameters)==null?void 0:m.docs)==null?void 0:v.source}}};var x,h,S;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MSelect
    },
    data() {
      return {
        values: {
          country: '',
          currency: '',
          category: ''
        },
        countries: [{
          value: 'us',
          text: 'United States'
        }, {
          value: 'ca',
          text: 'Canada'
        }, {
          value: 'uk',
          text: 'United Kingdom'
        }],
        currencies: [{
          value: 'usd',
          text: 'US Dollar (USD)'
        }, {
          value: 'eur',
          text: 'Euro (EUR)'
        }, {
          value: 'gbp',
          text: 'British Pound (GBP)'
        }],
        categories: [{
          value: 'personal',
          text: 'Personal Loan'
        }, {
          value: 'auto',
          text: 'Auto Loan'
        }, {
          value: 'home',
          text: 'Home Loan'
        }]
      };
    },
    template: \`
      <div class="space-y-4">
        <MSelect 
          v-model="values.country"
          label="Country" 
          :options="countries"
          prepend-icon="fas fa-globe"
          placeholder="Select country..."
        />
        
        <MSelect 
          v-model="values.currency"
          label="Currency" 
          :options="currencies"
          prepend-icon="fas fa-dollar-sign"
          placeholder="Select currency..."
        />
        
        <MSelect 
          v-model="values.category"
          label="Loan Category" 
          :options="categories"
          prepend-icon="fas fa-tag"
          placeholder="Select category..."
        />
      </div>
    \`
  })
}`,...(S=(h=a.parameters)==null?void 0:h.docs)==null?void 0:S.source}}};var b,f,g;o.parameters={...o.parameters,docs:{...(b=o.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MSelect
    },
    data() {
      return {
        value: '',
        states: [{
          value: 'al',
          text: 'Alabama'
        }, {
          value: 'ak',
          text: 'Alaska'
        }, {
          value: 'az',
          text: 'Arizona'
        }, {
          value: 'ar',
          text: 'Arkansas'
        }, {
          value: 'ca',
          text: 'California'
        }, {
          value: 'co',
          text: 'Colorado'
        }, {
          value: 'ct',
          text: 'Connecticut'
        }, {
          value: 'de',
          text: 'Delaware'
        }, {
          value: 'fl',
          text: 'Florida'
        }, {
          value: 'ga',
          text: 'Georgia'
        }]
      };
    },
    template: \`
      <MSelect 
        v-model="value"
        label="State" 
        :options="states"
        :searchable="true"
        prepend-icon="fas fa-map-marker-alt"
        placeholder="Search for a state..."
        helper-text="Type to search through available states"
      />
    \`
  })
}`,...(g=(f=o.parameters)==null?void 0:f.docs)==null?void 0:g.source}}};var y,M,w;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MSelect
    },
    data() {
      return {
        selectedSkills: [],
        skills: [{
          value: 'javascript',
          text: 'JavaScript'
        }, {
          value: 'python',
          text: 'Python'
        }, {
          value: 'java',
          text: 'Java'
        }, {
          value: 'csharp',
          text: 'C#'
        }, {
          value: 'php',
          text: 'PHP'
        }, {
          value: 'ruby',
          text: 'Ruby'
        }, {
          value: 'swift',
          text: 'Swift'
        }, {
          value: 'kotlin',
          text: 'Kotlin'
        }]
      };
    },
    template: \`
      <MSelect 
        v-model="selectedSkills"
        label="Technical Skills" 
        :options="skills"
        :multiple="true"
        :searchable="true"
        prepend-icon="fas fa-code"
        placeholder="Select multiple skills..."
        helper-text="Choose all applicable technical skills"
      />
    \`
  })
}`,...(w=(M=l.parameters)==null?void 0:M.docs)==null?void 0:w.source}}};var k,C,E;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MSelect
    },
    data() {
      return {
        values: {
          error: '',
          required: ''
        },
        options: [{
          value: 'option1',
          text: 'Option 1'
        }, {
          value: 'option2',
          text: 'Option 2'
        }, {
          value: 'option3',
          text: 'Option 3'
        }]
      };
    },
    template: \`
      <div class="space-y-4">
        <MSelect 
          v-model="values.error"
          label="Selection with Error" 
          :options="options"
          error-message="Please select a valid option"
          placeholder="Make a selection..."
        />
        
        <MSelect 
          v-model="values.required"
          label="Required Selection" 
          :options="options"
          :required="true"
          placeholder="This field is required"
          helper-text="You must make a selection to continue"
        />
      </div>
    \`
  })
}`,...(E=(C=r.parameters)==null?void 0:C.docs)==null?void 0:E.source}}};var P,T,O;s.parameters={...s.parameters,docs:{...(P=s.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MSelect
    },
    data() {
      return {
        values: {
          wrapped: '',
          extended: '',
          both: ''
        },
        options: [{
          value: 'basic',
          text: 'Basic Plan'
        }, {
          value: 'premium',
          text: 'Premium Plan'
        }, {
          value: 'enterprise',
          text: 'Enterprise Plan'
        }]
      };
    },
    template: \`
      <div class="space-y-6">
        <h3 class="text-lg font-semibold mb-4">Wrap & Extend Functionality</h3>
        
        <!-- Wrapped Select -->
        <MSelect 
          v-model="values.wrapped"
          label="Wrapped Select" 
          :options="options"
          placeholder="Select a plan..."
          :wrap="true"
          wrapper-class="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg"
          prepend-icon="fas fa-box"
        />
        
        <!-- Extended Select -->
        <MSelect 
          v-model="values.extended"
          label="Extended Select" 
          :options="options"
          placeholder="Select a plan..."
          :extend="true"
          extended-class="shadow-lg border-2 border-purple-300"
          prepend-icon="fas fa-star"
        />
        
        <!-- Both Wrap and Extend -->
        <MSelect 
          v-model="values.both"
          label="Wrapped & Extended Select" 
          :options="options"
          placeholder="Select a plan..."
          :wrap="true"
          :extend="true"
          wrapper-class="p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl"
          extended-class="border-2 border-green-400 shadow-xl"
          prepend-icon="fas fa-crown"
        />
        
        <!-- Semantic Grouping Example -->
        <div class="mt-8">
          <h4 class="text-md font-semibold mb-4">Service Tier Selection</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MSelect 
              v-model="values.wrapped"
              label="Primary Service" 
              :options="options"
              placeholder="Main service tier"
              :wrap="true"
              wrapper-class="p-4 bg-green-50 border border-green-200 rounded-lg"
              prepend-icon="fas fa-check-circle"
              helper-text="Your main service level"
            />
            
            <MSelect 
              v-model="values.extended"
              label="Backup Service" 
              :options="options"
              placeholder="Fallback tier"
              :extend="true"
              extended-class="border-2 border-orange-300 bg-orange-50"
              prepend-icon="fas fa-shield-alt"
              helper-text="Secondary service option"
            />
          </div>
        </div>
      </div>
    \`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates wrap and extend functionality for semantic form grouping and custom styling of select components.'
      }
    }
  }
}`,...(O=(T=s.parameters)==null?void 0:T.docs)==null?void 0:O.source}}};var q,L,R;i.parameters={...i.parameters,docs:{...(q=i.parameters)==null?void 0:q.docs,source:{originalSource:`{
  render: () => ({
    components: {
      MSelect
    },
    data() {
      return {
        application: {
          loanType: '',
          term: '',
          purpose: '',
          employment: '',
          creditRange: '',
          state: ''
        },
        loanTypes: [{
          value: 'personal',
          text: 'Personal Loan'
        }, {
          value: 'auto',
          text: 'Auto Loan'
        }, {
          value: 'home',
          text: 'Home Improvement'
        }, {
          value: 'debt',
          text: 'Debt Consolidation'
        }],
        loanTerms: [{
          value: '12',
          text: '12 months'
        }, {
          value: '24',
          text: '24 months'
        }, {
          value: '36',
          text: '36 months'
        }, {
          value: '48',
          text: '48 months'
        }, {
          value: '60',
          text: '60 months'
        }, {
          value: '72',
          text: '72 months'
        }],
        purposes: [{
          value: 'debt_consolidation',
          text: 'Debt Consolidation'
        }, {
          value: 'home_improvement',
          text: 'Home Improvement'
        }, {
          value: 'auto_repair',
          text: 'Auto Repair'
        }, {
          value: 'medical',
          text: 'Medical Expenses'
        }, {
          value: 'education',
          text: 'Education'
        }, {
          value: 'vacation',
          text: 'Vacation'
        }, {
          value: 'other',
          text: 'Other'
        }],
        employmentTypes: [{
          value: 'full_time',
          text: 'Full-time Employee'
        }, {
          value: 'part_time',
          text: 'Part-time Employee'
        }, {
          value: 'self_employed',
          text: 'Self-employed'
        }, {
          value: 'contractor',
          text: 'Independent Contractor'
        }, {
          value: 'retired',
          text: 'Retired'
        }, {
          value: 'unemployed',
          text: 'Unemployed'
        }],
        creditRanges: [{
          value: 'excellent',
          text: 'Excellent (750+)'
        }, {
          value: 'good',
          text: 'Good (700-749)'
        }, {
          value: 'fair',
          text: 'Fair (650-699)'
        }, {
          value: 'poor',
          text: 'Poor (600-649)'
        }, {
          value: 'unknown',
          text: 'I don\\'t know'
        }],
        states: [{
          value: 'ca',
          text: 'California'
        }, {
          value: 'tx',
          text: 'Texas'
        }, {
          value: 'fl',
          text: 'Florida'
        }, {
          value: 'ny',
          text: 'New York'
        }, {
          value: 'pa',
          text: 'Pennsylvania'
        }]
      };
    },
    template: \`
      <div class="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 class="text-2xl font-bold mb-6">Loan Application - Basic Information</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Loan Details -->
          <MSelect 
            v-model="application.loanType"
            label="Loan Type" 
            :options="loanTypes"
            :required="true"
            prepend-icon="fas fa-money-bill-wave"
            placeholder="Select loan type..."
            helper-text="Choose the type of loan you need"
          />
          
          <MSelect 
            v-model="application.term"
            label="Loan Term" 
            :options="loanTerms"
            :required="true"
            prepend-icon="fas fa-calendar-alt"
            placeholder="Select term length..."
            helper-text="Choose your preferred repayment period"
          />
          
          <MSelect 
            v-model="application.purpose"
            label="Loan Purpose" 
            :options="purposes"
            :required="true"
            :searchable="true"
            prepend-icon="fas fa-target"
            placeholder="Search loan purposes..."
            helper-text="What will you use this loan for?"
          />
          
          <MSelect 
            v-model="application.employment"
            label="Employment Status" 
            :options="employmentTypes"
            :required="true"
            prepend-icon="fas fa-briefcase"
            placeholder="Select employment status..."
            helper-text="Your current employment situation"
          />
          
          <MSelect 
            v-model="application.creditRange"
            label="Credit Score Range" 
            :options="creditRanges"
            :required="true"
            prepend-icon="fas fa-chart-line"
            placeholder="Select credit range..."
            helper-text="Approximate credit score range"
          />
          
          <MSelect 
            v-model="application.state"
            label="State" 
            :options="states"
            :required="true"
            :searchable="true"
            prepend-icon="fas fa-map-marker-alt"
            placeholder="Search states..."
            helper-text="Your state of residence"
          />
        </div>
        
        <div class="mt-6 p-4 bg-blue-50 rounded-lg">
          <p class="text-sm text-blue-800">
            <strong>Pre-qualification:</strong> Based on your selections, we'll provide an estimated 
            rate and terms. This won't affect your credit score.
          </p>
        </div>
      </div>
    \`
  }),
  parameters: {
    docs: {
      description: {
        story: 'Complete loan application form demonstrating various select configurations used in financial services.'
      }
    }
  }
}`,...(R=(L=i.parameters)==null?void 0:L.docs)==null?void 0:R.source}}};const _=["Default","Variants","WithIcons","Searchable","MultipleSelection","Validation","WrapExtendFunctionality","YourTownFinanceExample"];export{n as Default,l as MultipleSelection,o as Searchable,r as Validation,t as Variants,a as WithIcons,s as WrapExtendFunctionality,i as YourTownFinanceExample,_ as __namedExportsOrder,W as default};
