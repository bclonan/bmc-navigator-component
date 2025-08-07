import{r as x,c as g}from"./vue.esm-bundler-BOts1VAj.js";import{M as c}from"./MChart-C1yH-mUs.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const N={title:"Data/Visualization/Chart",component:c,parameters:{docs:{description:{component:"Reusable chart component supporting line, bar, and pie charts with flat configuration structures."}}},argTypes:{type:{control:{type:"select"},options:["line","bar","pie"]}}},v=t=>({components:{MChart:c},setup(){return{args:t}},template:'<MChart v-bind="args" />'}),o=v.bind({});o.args={type:"line",title:"Loan Performance Trends",subtitle:"Monthly loan application and approval rates",width:600,height:400,showGrid:!0,showPoints:!0,showLegend:!0,data:[{label:"Applications",color:"#3b82f6",data:[{x:1,y:850},{x:2,y:920},{x:3,y:1050},{x:4,y:980},{x:5,y:1150},{x:6,y:1250},{x:7,y:1180},{x:8,y:1350},{x:9,y:1420},{x:10,y:1380},{x:11,y:1500},{x:12,y:1650}]},{label:"Approvals",color:"#10b981",data:[{x:1,y:680},{x:2,y:740},{x:3,y:820},{x:4,y:750},{x:5,y:890},{x:6,y:950},{x:7,y:910},{x:8,y:1020},{x:9,y:1080},{x:10,y:1050},{x:11,y:1150},{x:12,y:1250}]}],formatters:{x:t=>`Month ${t}`,y:t=>t.toLocaleString()}};const r=v.bind({});r.args={type:"bar",title:"Revenue by Loan Type",subtitle:"Q4 2024 revenue breakdown",width:500,height:350,data:[{x:"Personal",y:285e4,color:"#3b82f6"},{x:"Auto",y:195e4,color:"#10b981"},{x:"Mortgage",y:42e5,color:"#f59e0b"},{x:"Business",y:165e4,color:"#8b5cf6"},{x:"Student",y:89e4,color:"#ef4444"}],formatters:{y:t=>`$${(t/1e6).toFixed(1)}M`}};const s=v.bind({});s.args={type:"pie",title:"Credit Score Distribution",subtitle:"Customer credit score ranges",width:500,height:400,showLegend:!0,data:[{x:"Excellent (750+)",y:2850,color:"#10b981"},{x:"Good (650-749)",y:4200,color:"#3b82f6"},{x:"Fair (500-649)",y:1950,color:"#f59e0b"},{x:"Poor (<500)",y:650,color:"#ef4444"}]};const G=()=>({components:{MChart:c},setup(){const t=x(25e3),m=x(8.5),y=x(60),O=g(()=>{const n=m.value/100/12,e=y.value,b=t.value*(n*Math.pow(1+n,e))/(Math.pow(1+n,e)-1);let a=t.value;const p=[];for(let d=0;d<=e;d+=6){p.push({x:d,y:a});for(let h=0;h<6&&d+h<e;h++){const j=a*n,E=b-j;a-=E}a<0&&(a=0)}return p}),_=g(()=>{const n=m.value/100/12,e=y.value,p=t.value*(n*Math.pow(1+n,e))/(Math.pow(1+n,e)-1)*e-t.value;return[{x:"Principal",y:t.value,color:"#3b82f6"},{x:"Interest",y:p,color:"#ef4444"}]});return{loanAmount:t,interestRate:m,term:y,paymentData:O,paymentBreakdown:_}},template:`
    <div class="space-y-8 p-6">
      <h2 class="text-2xl font-bold text-gray-900">Interactive Loan Calculator</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
          <input
            v-model.number="loanAmount"
            type="range"
            min="5000"
            max="100000"
            step="1000"
            class="w-full"
          />
          <div class="text-center text-sm text-gray-600">\${{ loanAmount.toLocaleString() }}</div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
          <input
            v-model.number="interestRate"
            type="range"
            min="3"
            max="25"
            step="0.1"
            class="w-full"
          />
          <div class="text-center text-sm text-gray-600">{{ interestRate }}%</div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Term (months)</label>
          <input
            v-model.number="term"
            type="range"
            min="12"
            max="84"
            step="6"
            class="w-full"
          />
          <div class="text-center text-sm text-gray-600">{{ term }} months</div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MChart
          type="line"
          title="Loan Balance Over Time"
          :data="paymentData"
          :width="400"
          :height="300"
          :show-grid="true"
          :show-points="false"
          :formatters="{
            x: (value) => \`Month \${value}\`,
            y: (value) => \`$\${value.toLocaleString()}\`
          }"
        />
        
        <MChart
          type="pie"
          title="Payment Breakdown"
          :data="paymentBreakdown"
          :width="400"
          :height="300"
          :show-legend="true"
        />
      </div>
    </div>
  `}),u=G.bind({}),K=()=>({components:{MChart:c},setup(){return{monthlyMetrics:[{x:"Jan",y:125e4},{x:"Feb",y:135e4},{x:"Mar",y:145e4},{x:"Apr",y:138e4},{x:"May",y:155e4},{x:"Jun",y:165e4}],approvalRates:[{label:"Approved",color:"#10b981",data:[{x:1,y:78},{x:2,y:82},{x:3,y:79},{x:4,y:85},{x:5,y:88},{x:6,y:86}]},{label:"Pending",color:"#f59e0b",data:[{x:1,y:15},{x:2,y:12},{x:3,y:14},{x:4,y:10},{x:5,y:8},{x:6,y:9}]},{label:"Rejected",color:"#ef4444",data:[{x:1,y:7},{x:2,y:6},{x:3,y:7},{x:4,y:5},{x:5,y:4},{x:6,y:5}]}],portfolioDistribution:[{x:"Personal Loans",y:45,color:"#3b82f6"},{x:"Auto Loans",y:25,color:"#10b981"},{x:"Mortgages",y:20,color:"#f59e0b"},{x:"Business Loans",y:10,color:"#8b5cf6"}]}},template:`
    <div class="space-y-8 p-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Financial Dashboard</h2>
        <p class="text-gray-600">Comprehensive view of loan portfolio performance</p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MChart
          type="bar"
          title="Monthly Revenue"
          subtitle="Last 6 months performance"
          :data="monthlyMetrics"
          :width="500"
          :height="300"
          :formatters="{
            y: (value) => \`$\${(value / 1000000).toFixed(1)}M\`
          }"
        />
        
        <MChart
          type="pie"
          title="Portfolio Distribution"
          subtitle="Loan types by volume"
          :data="portfolioDistribution"
          :width="500"
          :height="300"
          :show-legend="true"
        />
      </div>
      
      <MChart
        type="line"
        title="Approval Rates by Month"
        subtitle="Application processing outcomes"
        :data="approvalRates"
        :width="1000"
        :height="400"
        :show-grid="true"
        :show-points="true"
        :show-legend="true"
        :formatters="{
          x: (value) => \`Month \${value}\`,
          y: (value) => \`\${value}%\`
        }"
      />
    </div>
  `}),l=K.bind({});l.parameters={layout:"fullscreen"};const V=()=>({components:{MChart:c},setup(){return{mobileData:[{x:"Q1",y:85e3},{x:"Q2",y:92e3},{x:"Q3",y:78e3},{x:"Q4",y:95e3}]}},template:`
    <div class="max-w-md mx-auto p-4 space-y-6">
      <h2 class="text-xl font-bold text-gray-900">Mobile Dashboard</h2>
      
      <MChart
        type="bar"
        title="Quarterly Performance"
        :data="mobileData"
        :width="350"
        :height="250"
        :responsive="true"
        :formatters="{
          y: (value) => \`$\${(value / 1000).toFixed(0)}K\`
        }"
      />
    </div>
  `}),i=V.bind({});i.parameters={viewport:{defaultViewport:"mobile1"}};var f,M,w;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`args => ({
  components: {
    MChart
  },
  setup() {
    return {
      args
    };
  },
  template: '<MChart v-bind="args" />'
})`,...(w=(M=o.parameters)==null?void 0:M.docs)==null?void 0:w.source}}};var R,C,P;r.parameters={...r.parameters,docs:{...(R=r.parameters)==null?void 0:R.docs,source:{originalSource:`args => ({
  components: {
    MChart
  },
  setup() {
    return {
      args
    };
  },
  template: '<MChart v-bind="args" />'
})`,...(P=(C=r.parameters)==null?void 0:C.docs)==null?void 0:P.source}}};var L,D,A;s.parameters={...s.parameters,docs:{...(L=s.parameters)==null?void 0:L.docs,source:{originalSource:`args => ({
  components: {
    MChart
  },
  setup() {
    return {
      args
    };
  },
  template: '<MChart v-bind="args" />'
})`,...(A=(D=s.parameters)==null?void 0:D.docs)==null?void 0:A.source}}};var $,S,k;u.parameters={...u.parameters,docs:{...($=u.parameters)==null?void 0:$.docs,source:{originalSource:`() => ({
  components: {
    MChart
  },
  setup() {
    const loanAmount = ref(25000);
    const interestRate = ref(8.5);
    const term = ref(60);
    const paymentData = computed(() => {
      const monthlyRate = interestRate.value / 100 / 12;
      const months = term.value;
      const monthlyPayment = loanAmount.value * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      let balance = loanAmount.value;
      const data = [];
      for (let month = 0; month <= months; month += 6) {
        data.push({
          x: month,
          y: balance
        });
        for (let i = 0; i < 6 && month + i < months; i++) {
          const interestPayment = balance * monthlyRate;
          const principalPayment = monthlyPayment - interestPayment;
          balance -= principalPayment;
        }
        if (balance < 0) balance = 0;
      }
      return data;
    });
    const paymentBreakdown = computed(() => {
      const monthlyRate = interestRate.value / 100 / 12;
      const months = term.value;
      const monthlyPayment = loanAmount.value * (monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
      const totalPayments = monthlyPayment * months;
      const totalInterest = totalPayments - loanAmount.value;
      return [{
        x: 'Principal',
        y: loanAmount.value,
        color: '#3b82f6'
      }, {
        x: 'Interest',
        y: totalInterest,
        color: '#ef4444'
      }];
    });
    return {
      loanAmount,
      interestRate,
      term,
      paymentData,
      paymentBreakdown
    };
  },
  template: \`
    <div class="space-y-8 p-6">
      <h2 class="text-2xl font-bold text-gray-900">Interactive Loan Calculator</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Loan Amount</label>
          <input
            v-model.number="loanAmount"
            type="range"
            min="5000"
            max="100000"
            step="1000"
            class="w-full"
          />
          <div class="text-center text-sm text-gray-600">\\\${{ loanAmount.toLocaleString() }}</div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Interest Rate (%)</label>
          <input
            v-model.number="interestRate"
            type="range"
            min="3"
            max="25"
            step="0.1"
            class="w-full"
          />
          <div class="text-center text-sm text-gray-600">{{ interestRate }}%</div>
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Term (months)</label>
          <input
            v-model.number="term"
            type="range"
            min="12"
            max="84"
            step="6"
            class="w-full"
          />
          <div class="text-center text-sm text-gray-600">{{ term }} months</div>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MChart
          type="line"
          title="Loan Balance Over Time"
          :data="paymentData"
          :width="400"
          :height="300"
          :show-grid="true"
          :show-points="false"
          :formatters="{
            x: (value) => \\\`Month \\\${value}\\\`,
            y: (value) => \\\`$\\\${value.toLocaleString()}\\\`
          }"
        />
        
        <MChart
          type="pie"
          title="Payment Breakdown"
          :data="paymentBreakdown"
          :width="400"
          :height="300"
          :show-legend="true"
        />
      </div>
    </div>
  \`
})`,...(k=(S=u.parameters)==null?void 0:S.docs)==null?void 0:k.source}}};var B,F,T;l.parameters={...l.parameters,docs:{...(B=l.parameters)==null?void 0:B.docs,source:{originalSource:`() => ({
  components: {
    MChart
  },
  setup() {
    const monthlyMetrics = [{
      x: 'Jan',
      y: 1250000
    }, {
      x: 'Feb',
      y: 1350000
    }, {
      x: 'Mar',
      y: 1450000
    }, {
      x: 'Apr',
      y: 1380000
    }, {
      x: 'May',
      y: 1550000
    }, {
      x: 'Jun',
      y: 1650000
    }];
    const approvalRates = [{
      label: 'Approved',
      color: '#10b981',
      data: [{
        x: 1,
        y: 78
      }, {
        x: 2,
        y: 82
      }, {
        x: 3,
        y: 79
      }, {
        x: 4,
        y: 85
      }, {
        x: 5,
        y: 88
      }, {
        x: 6,
        y: 86
      }]
    }, {
      label: 'Pending',
      color: '#f59e0b',
      data: [{
        x: 1,
        y: 15
      }, {
        x: 2,
        y: 12
      }, {
        x: 3,
        y: 14
      }, {
        x: 4,
        y: 10
      }, {
        x: 5,
        y: 8
      }, {
        x: 6,
        y: 9
      }]
    }, {
      label: 'Rejected',
      color: '#ef4444',
      data: [{
        x: 1,
        y: 7
      }, {
        x: 2,
        y: 6
      }, {
        x: 3,
        y: 7
      }, {
        x: 4,
        y: 5
      }, {
        x: 5,
        y: 4
      }, {
        x: 6,
        y: 5
      }]
    }];
    const portfolioDistribution = [{
      x: 'Personal Loans',
      y: 45,
      color: '#3b82f6'
    }, {
      x: 'Auto Loans',
      y: 25,
      color: '#10b981'
    }, {
      x: 'Mortgages',
      y: 20,
      color: '#f59e0b'
    }, {
      x: 'Business Loans',
      y: 10,
      color: '#8b5cf6'
    }];
    return {
      monthlyMetrics,
      approvalRates,
      portfolioDistribution
    };
  },
  template: \`
    <div class="space-y-8 p-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Financial Dashboard</h2>
        <p class="text-gray-600">Comprehensive view of loan portfolio performance</p>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MChart
          type="bar"
          title="Monthly Revenue"
          subtitle="Last 6 months performance"
          :data="monthlyMetrics"
          :width="500"
          :height="300"
          :formatters="{
            y: (value) => \\\`$\\\${(value / 1000000).toFixed(1)}M\\\`
          }"
        />
        
        <MChart
          type="pie"
          title="Portfolio Distribution"
          subtitle="Loan types by volume"
          :data="portfolioDistribution"
          :width="500"
          :height="300"
          :show-legend="true"
        />
      </div>
      
      <MChart
        type="line"
        title="Approval Rates by Month"
        subtitle="Application processing outcomes"
        :data="approvalRates"
        :width="1000"
        :height="400"
        :show-grid="true"
        :show-points="true"
        :show-legend="true"
        :formatters="{
          x: (value) => \\\`Month \\\${value}\\\`,
          y: (value) => \\\`\\\${value}%\\\`
        }"
      />
    </div>
  \`
})`,...(T=(F=l.parameters)==null?void 0:F.docs)==null?void 0:T.source}}};var I,Q,J;i.parameters={...i.parameters,docs:{...(I=i.parameters)==null?void 0:I.docs,source:{originalSource:`() => ({
  components: {
    MChart
  },
  setup() {
    const mobileData = [{
      x: 'Q1',
      y: 85000
    }, {
      x: 'Q2',
      y: 92000
    }, {
      x: 'Q3',
      y: 78000
    }, {
      x: 'Q4',
      y: 95000
    }];
    return {
      mobileData
    };
  },
  template: \`
    <div class="max-w-md mx-auto p-4 space-y-6">
      <h2 class="text-xl font-bold text-gray-900">Mobile Dashboard</h2>
      
      <MChart
        type="bar"
        title="Quarterly Performance"
        :data="mobileData"
        :width="350"
        :height="250"
        :responsive="true"
        :formatters="{
          y: (value) => \\\`$\\\${(value / 1000).toFixed(0)}K\\\`
        }"
      />
    </div>
  \`
})`,...(J=(Q=i.parameters)==null?void 0:Q.docs)==null?void 0:J.source}}};const U=["LoanPerformanceTrend","RevenueByLoanType","CreditScoreDistribution","InteractiveLoanCalculator","FinancialDashboard","MobileResponsive"];export{s as CreditScoreDistribution,l as FinancialDashboard,u as InteractiveLoanCalculator,o as LoanPerformanceTrend,i as MobileResponsive,r as RevenueByLoanType,U as __namedExportsOrder,N as default};
