import{r as g,c as y}from"./vue.esm-bundler-BOts1VAj.js";import{M as h}from"./MSlider-CAxFof3m.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const de={title:"UI/Forms/Slider",component:h,parameters:{docs:{description:{component:"Mobile-responsive slider component with touch support, markers, tooltips, and comprehensive validation patterns."}}},argTypes:{variant:{control:{type:"select"},options:["primary","secondary","success","warning","danger"]},size:{control:{type:"select"},options:["small","medium","large"]}}},a=e=>({components:{MSlider:h},setup(){return{value:g(e.modelValue||50),args:e}},template:`
    <div class="p-6 space-y-8">
      <MSlider
        v-model="value"
        v-bind="args"
      />
      <div class="text-sm text-gray-600">
        Current value: {{ value }}
      </div>
    </div>
  `}),s=a.bind({});s.args={label:"Basic Slider",min:0,max:100,step:1,modelValue:50};const l=a.bind({});l.args={label:"Loan Amount",min:1e3,max:5e4,step:500,modelValue:15e3,unit:"$",showTooltip:!0,showMarkers:!0,markers:[{value:1e3,label:"$1K"},{value:1e4,label:"$10K"},{value:25e3,label:"$25K"},{value:5e4,label:"$50K"}],formatValue:e=>`$${e.toLocaleString()}`,helpText:"Select your desired loan amount",variant:"primary"};const r=a.bind({});r.args={label:"Monthly Income",min:1e3,max:2e4,step:250,modelValue:5e3,unit:"$",showTooltip:!0,showMarkers:!0,markers:[{value:1e3,label:"$1K"},{value:5e3,label:"$5K"},{value:1e4,label:"$10K"},{value:15e3,label:"$15K"},{value:2e4,label:"$20K"}],formatValue:e=>`$${e.toLocaleString()}`,helpText:"Your gross monthly income before taxes",variant:"success"};const o=a.bind({});o.args={label:"Estimated Credit Score",min:300,max:850,step:10,modelValue:720,showTooltip:!0,showMarkers:!0,markers:[{value:300,label:"Poor"},{value:500,label:"Fair"},{value:650,label:"Good"},{value:750,label:"Excellent"}],formatValue:e=>e>=750?`${e} (Excellent)`:e>=650?`${e} (Good)`:e>=500?`${e} (Fair)`:`${e} (Poor)`,helpText:"Your approximate credit score range",variant:"warning"};const i=a.bind({});i.args={label:"Current Debt-to-Income Ratio",min:0,max:60,step:1,modelValue:25,unit:"%",showTooltip:!0,showMarkers:!0,markers:[{value:0,label:"0%"},{value:15,label:"15%"},{value:28,label:"28%"},{value:43,label:"43%"},{value:60,label:"60%"}],formatValue:e=>`${e}%`,helpText:"Percentage of income going to debt payments",variant:"danger"};const u=a.bind({});u.args={label:"Loan Term",min:12,max:84,step:6,modelValue:36,unit:"months",showTooltip:!0,showMarkers:!0,markers:[{value:12,label:"1 year"},{value:24,label:"2 years"},{value:36,label:"3 years"},{value:48,label:"4 years"},{value:60,label:"5 years"},{value:84,label:"7 years"}],formatValue:e=>{const n=Math.floor(e/12),t=e%12;return t===0?`${n} year${n>1?"s":""}`:`${n}y ${t}m`},helpText:"How long you want to take to repay the loan",variant:"secondary"};const m=a.bind({});m.args={label:"Disabled Slider",min:0,max:100,step:1,modelValue:50,disabled:!0,helpText:"This slider is disabled"};const d=a.bind({});d.args={label:"Slider with Error",min:1e3,max:5e4,step:500,modelValue:6e4,unit:"$",error:"Amount exceeds maximum limit of $50,000",formatValue:e=>`$${e.toLocaleString()}`};const c=a.bind({});c.args={label:"Small Slider",min:0,max:100,step:1,modelValue:30,size:"small",variant:"primary"};const v=a.bind({});v.args={label:"Large Slider",min:0,max:100,step:1,modelValue:70,size:"large",variant:"success",showTooltip:!0};const re=()=>({components:{MSlider:h},setup(){const e=g(15e3),n=g(36),t=g(8.5),b=y(()=>{const $=e.value,x=t.value/100/12,S=n.value;return x===0?$/S:$*(x*Math.pow(1+x,S))/(Math.pow(1+x,S)-1)}),le=y(()=>b.value*n.value-e.value);return{loanAmount:e,loanTerm:n,interestRate:t,monthlyPayment:b,totalInterest:le}},template:`
    <div class="p-6 space-y-8">
      <h3 class="text-lg font-semibold text-gray-900">Interactive Loan Calculator</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <MSlider
            v-model="loanAmount"
            label="Loan Amount"
            :min="1000"
            :max="50000"
            :step="500"
            unit="$"
            :show-tooltip="true"
            :show-markers="true"
            :markers="[
              { value: 1000, label: '$1K' },
              { value: 10000, label: '$10K' },
              { value: 25000, label: '$25K' },
              { value: 50000, label: '$50K' }
            ]"
            :format-value="(value) => \`$\${value.toLocaleString()}\`"
            variant="primary"
          />
          
          <MSlider
            v-model="loanTerm"
            label="Loan Term"
            :min="12"
            :max="84"
            :step="6"
            unit="months"
            :show-tooltip="true"
            :show-markers="true"
            :markers="[
              { value: 12, label: '1yr' },
              { value: 24, label: '2yr' },
              { value: 36, label: '3yr' },
              { value: 48, label: '4yr' },
              { value: 60, label: '5yr' },
              { value: 84, label: '7yr' }
            ]"
            :format-value="(value) => {
              const years = Math.floor(value / 12);
              const months = value % 12;
              if (months === 0) return \`\${years} year\${years > 1 ? 's' : ''}\`;
              return \`\${years}y \${months}m\`;
            }"
            variant="secondary"
          />
          
          <MSlider
            v-model="interestRate"
            label="Interest Rate"
            :min="3.0"
            :max="25.0"
            :step="0.1"
            unit="%"
            :show-tooltip="true"
            :format-value="(value) => \`\${value.toFixed(1)}%\`"
            variant="warning"
          />
        </div>
        
        <div class="bg-gray-50 rounded-lg p-6">
          <h4 class="text-md font-medium text-gray-900 mb-4">Loan Summary</h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Loan Amount:</span>
              <span class="font-semibold">\${{ loanAmount.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Term:</span>
              <span class="font-semibold">{{ loanTerm }} months</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Interest Rate:</span>
              <span class="font-semibold">{{ interestRate.toFixed(1) }}%</span>
            </div>
            <hr class="my-3">
            <div class="flex justify-between text-lg">
              <span class="text-gray-900 font-medium">Monthly Payment:</span>
              <span class="font-bold text-blue-600">\${{ monthlyPayment.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Total Interest:</span>
              <span class="font-semibold text-red-600">\${{ totalInterest.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Total Amount:</span>
              <span class="font-semibold">\${{ (loanAmount + totalInterest).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}),f=re.bind({}),oe=()=>({components:{MSlider:h},setup(){const e=g({income:4500,expenses:2800,loanAmount:12e3}),n=y(()=>e.value.income-e.value.expenses),t=y(()=>n.value*.3),b=y(()=>t.value*36);return{values:e,availableIncome:n,maxPayment:t,suggestedLoanAmount:b}},template:`
    <div class="max-w-md mx-auto p-4 space-y-6 bg-white">
      <h3 class="text-lg font-semibold text-gray-900">Mobile Loan Calculator</h3>
      
      <MSlider
        v-model="values.income"
        label="Monthly Income"
        :min="1000"
        :max="15000"
        :step="100"
        unit="$"
        :show-tooltip="true"
        :format-value="(value) => \`$\${value.toLocaleString()}\`"
        variant="success"
        size="large"
      />
      
      <MSlider
        v-model="values.expenses"
        label="Monthly Expenses"
        :min="500"
        :max="10000"
        :step="50"
        unit="$"
        :show-tooltip="true"
        :format-value="(value) => \`$\${value.toLocaleString()}\`"
        variant="danger"
        size="large"
      />
      
      <MSlider
        v-model="values.loanAmount"
        label="Desired Loan Amount"
        :min="1000"
        :max="50000"
        :step="500"
        unit="$"
        :show-tooltip="true"
        :format-value="(value) => \`$\${value.toLocaleString()}\`"
        variant="primary"
        size="large"
      />
      
      <div class="bg-blue-50 rounded-lg p-4">
        <h4 class="font-medium text-blue-900 mb-2">Quick Assessment</h4>
        <div class="text-sm space-y-1">
          <div class="flex justify-between">
            <span class="text-blue-700">Available Income:</span>
            <span class="font-medium">\${{ availableIncome.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-blue-700">Max Monthly Payment:</span>
            <span class="font-medium">\${{ maxPayment.toFixed(0) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-blue-700">Suggested Max Loan:</span>
            <span class="font-medium">\${{ suggestedLoanAmount.toFixed(0) }}</span>
          </div>
        </div>
      </div>
    </div>
  `}),p=oe.bind({});p.parameters={viewport:{defaultViewport:"mobile1"}};var M,w,L;s.parameters={...s.parameters,docs:{...(M=s.parameters)==null?void 0:M.docs,source:{originalSource:`args => ({
  components: {
    MSlider
  },
  setup() {
    const value = ref(args.modelValue || 50);
    return {
      value,
      args
    };
  },
  template: \`
    <div class="p-6 space-y-8">
      <MSlider
        v-model="value"
        v-bind="args"
      />
      <div class="text-sm text-gray-600">
        Current value: {{ value }}
      </div>
    </div>
  \`
})`,...(L=(w=s.parameters)==null?void 0:w.docs)==null?void 0:L.source}}};var T,A,I;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`args => ({
  components: {
    MSlider
  },
  setup() {
    const value = ref(args.modelValue || 50);
    return {
      value,
      args
    };
  },
  template: \`
    <div class="p-6 space-y-8">
      <MSlider
        v-model="value"
        v-bind="args"
      />
      <div class="text-sm text-gray-600">
        Current value: {{ value }}
      </div>
    </div>
  \`
})`,...(I=(A=l.parameters)==null?void 0:A.docs)==null?void 0:I.source}}};var V,P,k;r.parameters={...r.parameters,docs:{...(V=r.parameters)==null?void 0:V.docs,source:{originalSource:`args => ({
  components: {
    MSlider
  },
  setup() {
    const value = ref(args.modelValue || 50);
    return {
      value,
      args
    };
  },
  template: \`
    <div class="p-6 space-y-8">
      <MSlider
        v-model="value"
        v-bind="args"
      />
      <div class="text-sm text-gray-600">
        Current value: {{ value }}
      </div>
    </div>
  \`
})`,...(k=(P=r.parameters)==null?void 0:P.docs)==null?void 0:k.source}}};var C,R,j;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`args => ({
  components: {
    MSlider
  },
  setup() {
    const value = ref(args.modelValue || 50);
    return {
      value,
      args
    };
  },
  template: \`
    <div class="p-6 space-y-8">
      <MSlider
        v-model="value"
        v-bind="args"
      />
      <div class="text-sm text-gray-600">
        Current value: {{ value }}
      </div>
    </div>
  \`
})`,...(j=(R=o.parameters)==null?void 0:R.docs)==null?void 0:j.source}}};var F,K,z;i.parameters={...i.parameters,docs:{...(F=i.parameters)==null?void 0:F.docs,source:{originalSource:`args => ({
  components: {
    MSlider
  },
  setup() {
    const value = ref(args.modelValue || 50);
    return {
      value,
      args
    };
  },
  template: \`
    <div class="p-6 space-y-8">
      <MSlider
        v-model="value"
        v-bind="args"
      />
      <div class="text-sm text-gray-600">
        Current value: {{ value }}
      </div>
    </div>
  \`
})`,...(z=(K=i.parameters)==null?void 0:K.docs)==null?void 0:z.source}}};var D,E,O;u.parameters={...u.parameters,docs:{...(D=u.parameters)==null?void 0:D.docs,source:{originalSource:`args => ({
  components: {
    MSlider
  },
  setup() {
    const value = ref(args.modelValue || 50);
    return {
      value,
      args
    };
  },
  template: \`
    <div class="p-6 space-y-8">
      <MSlider
        v-model="value"
        v-bind="args"
      />
      <div class="text-sm text-gray-600">
        Current value: {{ value }}
      </div>
    </div>
  \`
})`,...(O=(E=u.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var _,G,Q;m.parameters={...m.parameters,docs:{...(_=m.parameters)==null?void 0:_.docs,source:{originalSource:`args => ({
  components: {
    MSlider
  },
  setup() {
    const value = ref(args.modelValue || 50);
    return {
      value,
      args
    };
  },
  template: \`
    <div class="p-6 space-y-8">
      <MSlider
        v-model="value"
        v-bind="args"
      />
      <div class="text-sm text-gray-600">
        Current value: {{ value }}
      </div>
    </div>
  \`
})`,...(Q=(G=m.parameters)==null?void 0:G.docs)==null?void 0:Q.source}}};var W,Y,B;d.parameters={...d.parameters,docs:{...(W=d.parameters)==null?void 0:W.docs,source:{originalSource:`args => ({
  components: {
    MSlider
  },
  setup() {
    const value = ref(args.modelValue || 50);
    return {
      value,
      args
    };
  },
  template: \`
    <div class="p-6 space-y-8">
      <MSlider
        v-model="value"
        v-bind="args"
      />
      <div class="text-sm text-gray-600">
        Current value: {{ value }}
      </div>
    </div>
  \`
})`,...(B=(Y=d.parameters)==null?void 0:Y.docs)==null?void 0:B.source}}};var H,U,q;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:`args => ({
  components: {
    MSlider
  },
  setup() {
    const value = ref(args.modelValue || 50);
    return {
      value,
      args
    };
  },
  template: \`
    <div class="p-6 space-y-8">
      <MSlider
        v-model="value"
        v-bind="args"
      />
      <div class="text-sm text-gray-600">
        Current value: {{ value }}
      </div>
    </div>
  \`
})`,...(q=(U=c.parameters)==null?void 0:U.docs)==null?void 0:q.source}}};var J,N,X;v.parameters={...v.parameters,docs:{...(J=v.parameters)==null?void 0:J.docs,source:{originalSource:`args => ({
  components: {
    MSlider
  },
  setup() {
    const value = ref(args.modelValue || 50);
    return {
      value,
      args
    };
  },
  template: \`
    <div class="p-6 space-y-8">
      <MSlider
        v-model="value"
        v-bind="args"
      />
      <div class="text-sm text-gray-600">
        Current value: {{ value }}
      </div>
    </div>
  \`
})`,...(X=(N=v.parameters)==null?void 0:N.docs)==null?void 0:X.source}}};var Z,ee,ne;f.parameters={...f.parameters,docs:{...(Z=f.parameters)==null?void 0:Z.docs,source:{originalSource:`() => ({
  components: {
    MSlider
  },
  setup() {
    const loanAmount = ref(15000);
    const loanTerm = ref(36);
    const interestRate = ref(8.5);
    const monthlyPayment = computed(() => {
      const principal = loanAmount.value;
      const monthlyRate = interestRate.value / 100 / 12;
      const numPayments = loanTerm.value;
      if (monthlyRate === 0) return principal / numPayments;
      return principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    });
    const totalInterest = computed(() => {
      return monthlyPayment.value * loanTerm.value - loanAmount.value;
    });
    return {
      loanAmount,
      loanTerm,
      interestRate,
      monthlyPayment,
      totalInterest
    };
  },
  template: \`
    <div class="p-6 space-y-8">
      <h3 class="text-lg font-semibold text-gray-900">Interactive Loan Calculator</h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="space-y-6">
          <MSlider
            v-model="loanAmount"
            label="Loan Amount"
            :min="1000"
            :max="50000"
            :step="500"
            unit="$"
            :show-tooltip="true"
            :show-markers="true"
            :markers="[
              { value: 1000, label: '$1K' },
              { value: 10000, label: '$10K' },
              { value: 25000, label: '$25K' },
              { value: 50000, label: '$50K' }
            ]"
            :format-value="(value) => \\\`$\\\${value.toLocaleString()}\\\`"
            variant="primary"
          />
          
          <MSlider
            v-model="loanTerm"
            label="Loan Term"
            :min="12"
            :max="84"
            :step="6"
            unit="months"
            :show-tooltip="true"
            :show-markers="true"
            :markers="[
              { value: 12, label: '1yr' },
              { value: 24, label: '2yr' },
              { value: 36, label: '3yr' },
              { value: 48, label: '4yr' },
              { value: 60, label: '5yr' },
              { value: 84, label: '7yr' }
            ]"
            :format-value="(value) => {
              const years = Math.floor(value / 12);
              const months = value % 12;
              if (months === 0) return \\\`\\\${years} year\\\${years > 1 ? 's' : ''}\\\`;
              return \\\`\\\${years}y \\\${months}m\\\`;
            }"
            variant="secondary"
          />
          
          <MSlider
            v-model="interestRate"
            label="Interest Rate"
            :min="3.0"
            :max="25.0"
            :step="0.1"
            unit="%"
            :show-tooltip="true"
            :format-value="(value) => \\\`\\\${value.toFixed(1)}%\\\`"
            variant="warning"
          />
        </div>
        
        <div class="bg-gray-50 rounded-lg p-6">
          <h4 class="text-md font-medium text-gray-900 mb-4">Loan Summary</h4>
          <div class="space-y-3">
            <div class="flex justify-between">
              <span class="text-gray-600">Loan Amount:</span>
              <span class="font-semibold">\\\${{ loanAmount.toLocaleString() }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Term:</span>
              <span class="font-semibold">{{ loanTerm }} months</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Interest Rate:</span>
              <span class="font-semibold">{{ interestRate.toFixed(1) }}%</span>
            </div>
            <hr class="my-3">
            <div class="flex justify-between text-lg">
              <span class="text-gray-900 font-medium">Monthly Payment:</span>
              <span class="font-bold text-blue-600">\\\${{ monthlyPayment.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Total Interest:</span>
              <span class="font-semibold text-red-600">\\\${{ totalInterest.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Total Amount:</span>
              <span class="font-semibold">\\\${{ (loanAmount + totalInterest).toFixed(2) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
})`,...(ne=(ee=f.parameters)==null?void 0:ee.docs)==null?void 0:ne.source}}};var ae,te,se;p.parameters={...p.parameters,docs:{...(ae=p.parameters)==null?void 0:ae.docs,source:{originalSource:`() => ({
  components: {
    MSlider
  },
  setup() {
    const values = ref({
      income: 4500,
      expenses: 2800,
      loanAmount: 12000
    });
    const availableIncome = computed(() => values.value.income - values.value.expenses);
    const maxPayment = computed(() => availableIncome.value * 0.3); // 30% rule
    const suggestedLoanAmount = computed(() => maxPayment.value * 36); // 3 year term

    return {
      values,
      availableIncome,
      maxPayment,
      suggestedLoanAmount
    };
  },
  template: \`
    <div class="max-w-md mx-auto p-4 space-y-6 bg-white">
      <h3 class="text-lg font-semibold text-gray-900">Mobile Loan Calculator</h3>
      
      <MSlider
        v-model="values.income"
        label="Monthly Income"
        :min="1000"
        :max="15000"
        :step="100"
        unit="$"
        :show-tooltip="true"
        :format-value="(value) => \\\`$\\\${value.toLocaleString()}\\\`"
        variant="success"
        size="large"
      />
      
      <MSlider
        v-model="values.expenses"
        label="Monthly Expenses"
        :min="500"
        :max="10000"
        :step="50"
        unit="$"
        :show-tooltip="true"
        :format-value="(value) => \\\`$\\\${value.toLocaleString()}\\\`"
        variant="danger"
        size="large"
      />
      
      <MSlider
        v-model="values.loanAmount"
        label="Desired Loan Amount"
        :min="1000"
        :max="50000"
        :step="500"
        unit="$"
        :show-tooltip="true"
        :format-value="(value) => \\\`$\\\${value.toLocaleString()}\\\`"
        variant="primary"
        size="large"
      />
      
      <div class="bg-blue-50 rounded-lg p-4">
        <h4 class="font-medium text-blue-900 mb-2">Quick Assessment</h4>
        <div class="text-sm space-y-1">
          <div class="flex justify-between">
            <span class="text-blue-700">Available Income:</span>
            <span class="font-medium">\\\${{ availableIncome.toLocaleString() }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-blue-700">Max Monthly Payment:</span>
            <span class="font-medium">\\\${{ maxPayment.toFixed(0) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-blue-700">Suggested Max Loan:</span>
            <span class="font-medium">\\\${{ suggestedLoanAmount.toFixed(0) }}</span>
          </div>
        </div>
      </div>
    </div>
  \`
})`,...(se=(te=p.parameters)==null?void 0:te.docs)==null?void 0:se.source}}};const ce=["Default","LoanAmount","MonthlyIncome","CreditScore","DebtToIncome","LoanTerm","Disabled","WithError","SmallSize","LargeSize","InteractiveLoanCalculator","MobileOptimized"];export{o as CreditScore,i as DebtToIncome,s as Default,m as Disabled,f as InteractiveLoanCalculator,v as LargeSize,l as LoanAmount,u as LoanTerm,p as MobileOptimized,r as MonthlyIncome,c as SmallSize,d as WithError,ce as __namedExportsOrder,de as default};
