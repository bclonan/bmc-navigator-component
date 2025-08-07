import{r as g,c as y}from"./vue.esm-bundler-BOts1VAj.js";import{M as m}from"./MTable-B8rROLud.js";import{M as b}from"./MButton-BLV5TnM3.js";import{M as $}from"./MInput-CcA3fQAp.js";import{M as x}from"./MTypography-DmD30oZU.js";import{M as R}from"./MAlert-DQn7thiI.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const V={title:"Core Components/Data Display/Enhanced Table",component:m,parameters:{layout:"fullscreen",docs:{description:{component:"Enhanced data table with column spanning, advanced filtering, financial summaries, and responsive design for comprehensive data management."}}},argTypes:{tableType:{control:{type:"select"},options:["portfolio","transactions","customers","loans"],description:"Type of financial data table",defaultValue:"portfolio"},enableFiltering:{control:{type:"boolean"},description:"Enable advanced filtering capabilities",defaultValue:!0},enableGrouping:{control:{type:"boolean"},description:"Enable column grouping and spanning",defaultValue:!0},showSummary:{control:{type:"boolean"},description:"Show financial summary footer",defaultValue:!0}}},u=c=>({components:{MTable:m,MButton:b,MTypography:x},setup(){const i=[{id:"PORT-001",customerName:"Alice Johnson",customerType:"Premium",creditScore:780,personalLoans:1,personalBalance:25e3,autoLoans:1,autoBalance:32e3,mortgageLoans:1,mortgageBalance:185e3,totalBalance:242e3,monthlyPayment:2985,debtToIncome:23.9,accountStatus:"Current",riskLevel:"Low",lastPayment:"2024-02-28"},{id:"PORT-002",customerName:"Robert Chen",customerType:"Standard",creditScore:720,personalLoans:1,personalBalance:15e3,autoLoans:1,autoBalance:28e3,mortgageLoans:0,mortgageBalance:0,totalBalance:43e3,monthlyPayment:945,debtToIncome:12.1,accountStatus:"Current",riskLevel:"Low",lastPayment:"2024-02-25"},{id:"PORT-003",customerName:"Maria Rodriguez",customerType:"Standard",creditScore:680,personalLoans:1,personalBalance:12e3,autoLoans:0,autoBalance:0,mortgageLoans:0,mortgageBalance:0,totalBalance:12e3,monthlyPayment:385,debtToIncome:7.4,accountStatus:"Current",riskLevel:"Medium",lastPayment:"2024-02-20"},{id:"PORT-004",customerName:"David Thompson",customerType:"Premium",creditScore:650,personalLoans:2,personalBalance:35e3,autoLoans:2,autoBalance:55e3,mortgageLoans:0,mortgageBalance:0,totalBalance:9e4,monthlyPayment:2150,debtToIncome:22.6,accountStatus:"Late",riskLevel:"Medium",lastPayment:"2024-02-15"},{id:"PORT-005",customerName:"Jennifer Martinez",customerType:"VIP",creditScore:820,personalLoans:0,personalBalance:0,autoLoans:1,autoBalance:45e3,mortgageLoans:2,mortgageBalance:425e3,totalBalance:47e4,monthlyPayment:3950,debtToIncome:21.4,accountStatus:"Current",riskLevel:"Low",lastPayment:"2024-02-28"}],a=[{key:"customerName",label:"Customer Name",sortable:!0,width:"180px",group:"customer"},{key:"customerType",label:"Type",sortable:!0,width:"100px",group:"customer",render:e=>{const t={VIP:{bg:"bg-purple-100",text:"text-purple-800"},Premium:{bg:"bg-blue-100",text:"text-blue-800"},Standard:{bg:"bg-gray-100",text:"text-gray-800"}},s=t[e]||t.Standard;return`<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${s.bg} ${s.text}">${e}</span>`}},{key:"creditScore",label:"Credit Score",sortable:!0,width:"100px",group:"customer",render:e=>`<span class="${e>=750?"text-green-600":e>=650?"text-blue-600":"text-red-600"} font-bold">${e}</span>`},{key:"personalBalance",label:"Personal Loans",sortable:!0,width:"130px",align:"right",group:"loans",render:(e,t)=>t.personalLoans>0?`${t.personalLoans} loan(s)<br/>$${e.toLocaleString()}`:'<span class="text-gray-400">None</span>'},{key:"autoBalance",label:"Auto Loans",sortable:!0,width:"130px",align:"right",group:"loans",render:(e,t)=>t.autoLoans>0?`${t.autoLoans} loan(s)<br/>$${e.toLocaleString()}`:'<span class="text-gray-400">None</span>'},{key:"mortgageBalance",label:"Mortgages",sortable:!0,width:"130px",align:"right",group:"loans",render:(e,t)=>t.mortgageLoans>0?`${t.mortgageLoans} loan(s)<br/>$${e.toLocaleString()}`:'<span class="text-gray-400">None</span>'},{key:"totalBalance",label:"Total Balance",sortable:!0,width:"140px",align:"right",group:"financial",render:e=>`<span class="font-bold text-lg">$${e.toLocaleString()}</span>`},{key:"monthlyPayment",label:"Monthly Payment",sortable:!0,width:"140px",align:"right",group:"financial",render:e=>`<span class="font-semibold text-blue-600">$${e.toLocaleString()}</span>`},{key:"debtToIncome",label:"DTI Ratio",sortable:!0,width:"100px",align:"center",group:"financial",render:e=>`<span class="${e<=20?"text-green-600":e<=30?"text-yellow-600":"text-red-600"} font-bold">${e}%</span>`},{key:"riskLevel",label:"Risk Level",sortable:!0,width:"100px",group:"status",render:e=>{const t={Low:{bg:"bg-green-100",text:"text-green-800"},Medium:{bg:"bg-yellow-100",text:"text-yellow-800"},High:{bg:"bg-red-100",text:"text-red-800"}},s=t[e]||t.Medium;return`<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${s.bg} ${s.text}">${e}</span>`}},{key:"accountStatus",label:"Account Status",sortable:!0,width:"120px",group:"status",render:e=>{const t={Current:{bg:"bg-green-100",text:"text-green-800"},Late:{bg:"bg-red-100",text:"text-red-800"},Delinquent:{bg:"bg-red-200",text:"text-red-900"}},s=t[e]||t.Current;return`<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${s.bg} ${s.text}">${e}</span>`}}],o=g([]),f=({row:e})=>{console.log("Portfolio row clicked:",e)},h=({action:e,row:t})=>{console.log(`Action ${e} clicked for portfolio:`,t)},n=e=>{o.value=e},r=y(()=>i.reduce((e,t)=>(e.totalCustomers+=1,e.totalLoans+=t.personalLoans+t.autoLoans+t.mortgageLoans,e.totalBalance+=t.totalBalance,e.totalPayments+=t.monthlyPayment,e.avgCreditScore+=t.creditScore,e),{totalCustomers:0,totalLoans:0,totalBalance:0,totalPayments:0,avgCreditScore:0})),l=y(()=>({...r.value,avgCreditScore:Math.round(r.value.avgCreditScore/i.length)}));return{args:c,portfolioData:i,portfolioColumns:a,selectedRows:o,finalSummary:l,handleRowClick:f,handleActionClick:h,handleSelectionChange:n}},template:`
    <div class="space-y-6 p-6">
      <div class="text-center mb-8">
        <MTypography variant="h1" class="text-2xl font-bold text-gray-900 mb-2">
          Enhanced Portfolio Analysis
        </MTypography>
        <MTypography variant="body1" class="text-gray-600">
          Comprehensive customer portfolio with grouped columns and financial metrics
        </MTypography>
      </div>

      <MTable
        title="Customer Portfolio Dashboard"
        subtitle="Complete loan portfolio analysis with grouped data visualization"
        :data="portfolioData"
        :columns="portfolioColumns"
        :selectable="true"
        :show-search="true"
        :show-filters="args.enableFiltering"
        :show-pagination="false"
        :show-actions="true"
        :show-export="true"
        :row-clickable="true"
        :enable-grouping="args.enableGrouping"
        :actions="[
          { key: 'details', label: 'View Portfolio', variant: 'primary' },
          { key: 'contact', label: 'Contact Customer', variant: 'secondary' },
          { key: 'restructure', label: 'Restructure Loans', variant: 'warning' },
          { key: 'statement', label: 'Generate Statement', variant: 'info' }
        ]"
        :filter-options="[
          {
            key: 'customerType',
            label: 'Customer Type',
            options: [
              { value: 'VIP', label: 'VIP Customers' },
              { value: 'Premium', label: 'Premium Customers' },
              { value: 'Standard', label: 'Standard Customers' }
            ]
          },
          {
            key: 'accountStatus',
            label: 'Account Status',
            options: [
              { value: 'Current', label: 'Current' },
              { value: 'Late', label: 'Late Payments' },
              { value: 'Delinquent', label: 'Delinquent' }
            ]
          },
          {
            key: 'riskLevel',
            label: 'Risk Assessment',
            options: [
              { value: 'Low', label: 'Low Risk' },
              { value: 'Medium', label: 'Medium Risk' },
              { value: 'High', label: 'High Risk' }
            ]
          }
        ]"
        @row-click="handleRowClick"
        @action-click="handleActionClick"
        @selection-change="handleSelectionChange"
      />

      <div v-if="args.showSummary" class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
        <MTypography variant="h6" class="text-lg font-semibold mb-4 text-gray-800">
          Portfolio Summary Metrics
        </MTypography>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">{{ finalSummary.totalCustomers }}</div>
            <div class="text-sm text-gray-600 font-medium">Total Customers</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600">{{ finalSummary.totalLoans }}</div>
            <div class="text-sm text-gray-600 font-medium">Active Loans</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600">\${{ finalSummary.totalBalance.toLocaleString() }}</div>
            <div class="text-sm text-gray-600 font-medium">Total Balance</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-orange-600">\${{ finalSummary.totalPayments.toLocaleString() }}</div>
            <div class="text-sm text-gray-600 font-medium">Monthly Payments</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-indigo-600">{{ finalSummary.avgCreditScore }}</div>
            <div class="text-sm text-gray-600 font-medium">Avg Credit Score</div>
          </div>
        </div>
      </div>
    </div>
  `});u.args={tableType:"portfolio",enableFiltering:!0,enableGrouping:!0,showSummary:!0};const d=()=>({components:{MTable:m,MButton:b,MInput:$,MTypography:x,MAlert:R},setup(){const c=g([{id:"TXN-001",date:"2024-02-28",customerName:"Alice Johnson",customerId:"CUST-001",transactionType:"Payment",loanType:"Personal",amount:650,principal:425.5,interest:189.25,fees:35.25,remainingBalance:24350,paymentMethod:"ACH",status:"Completed",processingTime:2.3},{id:"TXN-002",date:"2024-02-27",customerName:"Robert Chen",customerId:"CUST-002",transactionType:"Disbursement",loanType:"Personal",amount:15e3,principal:15e3,interest:0,fees:150,remainingBalance:15e3,paymentMethod:"Wire Transfer",status:"Completed",processingTime:4.2},{id:"TXN-003",date:"2024-02-26",customerName:"Maria Rodriguez",customerId:"CUST-003",transactionType:"Payment",loanType:"Personal",amount:385,principal:265.8,interest:119.2,fees:0,remainingBalance:11735.2,paymentMethod:"ACH",status:"Failed",processingTime:.5},{id:"TXN-004",date:"2024-02-25",customerName:"David Thompson",customerId:"CUST-004",transactionType:"Late Fee",loanType:"Auto",amount:35,principal:0,interest:0,fees:35,remainingBalance:54035,paymentMethod:"System",status:"Applied",processingTime:.1},{id:"TXN-005",date:"2024-02-24",customerName:"Jennifer Martinez",customerId:"CUST-005",transactionType:"Payment",loanType:"Mortgage",amount:3200,principal:2800,interest:400,fees:0,remainingBalance:422200,paymentMethod:"ACH",status:"Completed",processingTime:1.8}]),i=[{key:"id",label:"Transaction ID",sortable:!0,width:"120px",group:"transaction"},{key:"date",label:"Date",type:"date",sortable:!0,width:"100px",group:"transaction"},{key:"transactionType",label:"Type",sortable:!0,width:"120px",group:"transaction",render:n=>{const r={Payment:{bg:"bg-green-100",text:"text-green-800"},Disbursement:{bg:"bg-blue-100",text:"text-blue-800"},"Late Fee":{bg:"bg-red-100",text:"text-red-800"},Adjustment:{bg:"bg-yellow-100",text:"text-yellow-800"}},l=r[n]||r.Payment;return`<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${l.bg} ${l.text}">${n}</span>`}},{key:"status",label:"Status",sortable:!0,width:"100px",group:"transaction",render:n=>{const r={Completed:{bg:"bg-green-100",text:"text-green-800"},Failed:{bg:"bg-red-100",text:"text-red-800"},Pending:{bg:"bg-yellow-100",text:"text-yellow-800"},Applied:{bg:"bg-blue-100",text:"text-blue-800"}},l=r[n]||r.Completed;return`<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${l.bg} ${l.text}">${n}</span>`}},{key:"customerName",label:"Customer",sortable:!0,width:"150px",group:"customer"},{key:"loanType",label:"Loan Type",sortable:!0,width:"100px",group:"customer"},{key:"paymentMethod",label:"Payment Method",sortable:!0,width:"120px",group:"customer"},{key:"amount",label:"Total Amount",type:"currency",sortable:!0,width:"120px",align:"right",group:"financial",render:n=>`<span class="font-bold">$${n.toFixed(2)}</span>`},{key:"principal",label:"Principal",type:"currency",sortable:!0,width:"110px",align:"right",group:"financial",render:n=>`<span class="text-blue-600">$${n.toFixed(2)}</span>`},{key:"interest",label:"Interest",type:"currency",sortable:!0,width:"100px",align:"right",group:"financial",render:n=>`<span class="text-green-600">$${n.toFixed(2)}</span>`},{key:"fees",label:"Fees",type:"currency",sortable:!0,width:"80px",align:"right",group:"financial",render:n=>n>0?`<span class="text-red-600">$${n.toFixed(2)}</span>`:'<span class="text-gray-400">$0.00</span>'},{key:"remainingBalance",label:"Remaining Balance",type:"currency",sortable:!0,width:"140px",align:"right",group:"financial",render:n=>`<span class="font-semibold text-purple-600">$${n.toLocaleString()}</span>`}],a=g({dateRange:{start:"",end:""},amountRange:{min:"",max:""},transactionTypes:[],statuses:[],searchText:""}),o=y(()=>{let n=[...c.value];if(a.value.dateRange.start&&(n=n.filter(r=>r.date>=a.value.dateRange.start)),a.value.dateRange.end&&(n=n.filter(r=>r.date<=a.value.dateRange.end)),a.value.amountRange.min&&(n=n.filter(r=>r.amount>=parseFloat(a.value.amountRange.min))),a.value.amountRange.max&&(n=n.filter(r=>r.amount<=parseFloat(a.value.amountRange.max))),a.value.searchText){const r=a.value.searchText.toLowerCase();n=n.filter(l=>l.customerName.toLowerCase().includes(r)||l.id.toLowerCase().includes(r)||l.transactionType.toLowerCase().includes(r))}return n});return{transactionData:c,transactionColumns:i,filterCriteria:a,filteredData:o,clearFilters:()=>{a.value={dateRange:{start:"",end:""},amountRange:{min:"",max:""},transactionTypes:[],statuses:[],searchText:""}},exportTransactions:()=>{console.log("Exporting transactions:",o.value),alert(`Exporting ${o.value.length} transactions to CSV`)}}},template:`
    <div class="space-y-6 p-6">
      <div class="text-center mb-8">
        <MTypography variant="h1" class="text-2xl font-bold text-gray-900 mb-2">
          Advanced Transaction Filtering
        </MTypography>
        <MTypography variant="body1" class="text-gray-600">
          Multi-condition filtering with date ranges, amount filters, and real-time search
        </MTypography>
      </div>

      <div class="bg-gray-50 p-6 rounded-lg border">
        <MTypography variant="h6" class="text-lg font-semibold mb-4">
          Filter Controls
        </MTypography>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <MInput 
              placeholder="Customer, ID, or Type"
              v-model="filterCriteria.searchText"
              fullWidth
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <MInput 
              type="date" 
              v-model="filterCriteria.dateRange.start"
              fullWidth
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <MInput 
              type="date" 
              v-model="filterCriteria.dateRange.end"
              fullWidth
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
            <MInput 
              type="number" 
              placeholder="0.00"
              v-model="filterCriteria.amountRange.min"
              fullWidth
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
            <MInput 
              type="number" 
              placeholder="999999.99"
              v-model="filterCriteria.amountRange.max"
              fullWidth
            />
          </div>
        </div>

        <div class="flex flex-wrap gap-4 items-center">
          <MButton 
            text="Clear All Filters"
            variant="outlined"
            color="secondary"
            size="small"
            @click="clearFilters"
          />
          <MButton 
            text="Export to CSV"
            variant="filled"
            color="primary"
            size="small"
            @click="exportTransactions"
            class="mf-button-primary"
          />
          <div class="text-sm text-gray-600">
            Showing {{ filteredData.length }} of {{ transactionData.length }} transactions
          </div>
        </div>
      </div>

      <MTable
        title="Transaction History with Advanced Filtering"
        subtitle="Real-time filtering and search across transaction data"
        :data="filteredData"
        :columns="transactionColumns"
        :selectable="true"
        :show-search="false"
        :show-filters="false"
        :show-pagination="true"
        :show-actions="true"
        :show-export="true"
        :page-size="8"
        :enable-grouping="true"
        :actions="[
          { key: 'details', label: 'View Details', variant: 'primary' },
          { key: 'receipt', label: 'Download Receipt', variant: 'secondary' },
          { key: 'dispute', label: 'Dispute Transaction', variant: 'warning' }
        ]"
      />
    </div>
  `}),p=()=>({components:{MTable:m,MButton:b,MTypography:x},setup(){return{loanComparisonData:[{id:"COMP-001",loanType:"Personal Loan",product:"Standard Personal",rateMin:8.99,rateMax:24.99,amountMin:1e3,amountMax:5e4,termMin:12,termMax:60,approvalTime:"24-48 hours",creditMin:600,features:"No collateral required, flexible terms",monthlyPaymentExample:515},{id:"COMP-002",loanType:"Auto Loan",product:"New Vehicle Financing",rateMin:4.99,rateMax:12.99,amountMin:5e3,amountMax:1e5,termMin:24,termMax:84,approvalTime:"1-3 hours",creditMin:650,features:"Vehicle as collateral, competitive rates",monthlyPaymentExample:485},{id:"COMP-003",loanType:"Mortgage",product:"Fixed Rate Mortgage",rateMin:6.25,rateMax:8.75,amountMin:5e4,amountMax:75e4,termMin:180,termMax:360,approvalTime:"30-45 days",creditMin:620,features:"Property as collateral, tax benefits",monthlyPaymentExample:2850}],spanningColumns:[{key:"product-info",label:"Product Information",isHeader:!0,colspan:2,children:[{key:"loanType",label:"Loan Type",sortable:!0,width:"150px"},{key:"product",label:"Product Name",sortable:!0,width:"180px"}]},{key:"rate-terms",label:"Rates & Terms",isHeader:!0,colspan:4,children:[{key:"rateRange",label:"APR Range",sortable:!1,width:"120px",render:(a,o)=>`${o.rateMin}% - ${o.rateMax}%`},{key:"amountRange",label:"Loan Amount",sortable:!1,width:"140px",render:(a,o)=>`$${o.amountMin.toLocaleString()} - $${o.amountMax.toLocaleString()}`},{key:"termRange",label:"Term Range",sortable:!1,width:"120px",render:(a,o)=>`${o.termMin} - ${o.termMax} months`},{key:"approvalTime",label:"Approval Time",sortable:!0,width:"120px"}]},{key:"requirements",label:"Requirements & Features",isHeader:!0,colspan:3,children:[{key:"creditMin",label:"Min Credit Score",sortable:!0,width:"120px",render:a=>`<span class="font-semibold">${a}+</span>`},{key:"features",label:"Key Features",sortable:!1,width:"250px"},{key:"monthlyPaymentExample",label:"Example Payment",sortable:!0,width:"130px",align:"right",render:a=>`<span class="font-bold text-green-600">$${a}</span>`}]}]}},template:`
    <div class="space-y-6 p-6">
      <div class="text-center mb-8">
        <MTypography variant="h1" class="text-2xl font-bold text-gray-900 mb-2">
          Column Spanning Demonstration
        </MTypography>
        <MTypography variant="body1" class="text-gray-600">
          Grouped column headers with spanning for complex data relationships
        </MTypography>
      </div>

      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
        <MTypography variant="h6" class="text-blue-800 font-semibold mb-2">
          Column Grouping Features
        </MTypography>
        <ul class="text-blue-700 text-sm space-y-1">
          <li>• Product Information: Basic loan type and product details</li>
          <li>• Rates & Terms: Financial terms, ranges, and approval timelines</li>
          <li>• Requirements & Features: Credit requirements and key benefits</li>
        </ul>
      </div>

      <MTable
        title="Loan Product Comparison"
        subtitle="Side-by-side comparison with grouped column headers"
        :data="loanComparisonData"
        :columns="spanningColumns"
        :selectable="false"
        :show-search="false"
        :show-filters="false"
        :show-pagination="false"
        :show-actions="true"
        :show-export="true"
        :enable-grouping="true"
        :column-spanning="true"
        :actions="[
          { key: 'apply', label: 'Apply Now', variant: 'primary' },
          { key: 'details', label: 'Learn More', variant: 'secondary' },
          { key: 'calculator', label: 'Payment Calculator', variant: 'info' }
        ]"
      />
    </div>
  `});var v,T,M;u.parameters={...u.parameters,docs:{...(v=u.parameters)==null?void 0:v.docs,source:{originalSource:`args => ({
  components: {
    MTable,
    MButton,
    MTypography
  },
  setup() {
    const portfolioData = [{
      id: 'PORT-001',
      customerName: 'Alice Johnson',
      customerType: 'Premium',
      creditScore: 780,
      personalLoans: 1,
      personalBalance: 25000,
      autoLoans: 1,
      autoBalance: 32000,
      mortgageLoans: 1,
      mortgageBalance: 185000,
      totalBalance: 242000,
      monthlyPayment: 2985,
      debtToIncome: 23.9,
      accountStatus: 'Current',
      riskLevel: 'Low',
      lastPayment: '2024-02-28'
    }, {
      id: 'PORT-002',
      customerName: 'Robert Chen',
      customerType: 'Standard',
      creditScore: 720,
      personalLoans: 1,
      personalBalance: 15000,
      autoLoans: 1,
      autoBalance: 28000,
      mortgageLoans: 0,
      mortgageBalance: 0,
      totalBalance: 43000,
      monthlyPayment: 945,
      debtToIncome: 12.1,
      accountStatus: 'Current',
      riskLevel: 'Low',
      lastPayment: '2024-02-25'
    }, {
      id: 'PORT-003',
      customerName: 'Maria Rodriguez',
      customerType: 'Standard',
      creditScore: 680,
      personalLoans: 1,
      personalBalance: 12000,
      autoLoans: 0,
      autoBalance: 0,
      mortgageLoans: 0,
      mortgageBalance: 0,
      totalBalance: 12000,
      monthlyPayment: 385,
      debtToIncome: 7.4,
      accountStatus: 'Current',
      riskLevel: 'Medium',
      lastPayment: '2024-02-20'
    }, {
      id: 'PORT-004',
      customerName: 'David Thompson',
      customerType: 'Premium',
      creditScore: 650,
      personalLoans: 2,
      personalBalance: 35000,
      autoLoans: 2,
      autoBalance: 55000,
      mortgageLoans: 0,
      mortgageBalance: 0,
      totalBalance: 90000,
      monthlyPayment: 2150,
      debtToIncome: 22.6,
      accountStatus: 'Late',
      riskLevel: 'Medium',
      lastPayment: '2024-02-15'
    }, {
      id: 'PORT-005',
      customerName: 'Jennifer Martinez',
      customerType: 'VIP',
      creditScore: 820,
      personalLoans: 0,
      personalBalance: 0,
      autoLoans: 1,
      autoBalance: 45000,
      mortgageLoans: 2,
      mortgageBalance: 425000,
      totalBalance: 470000,
      monthlyPayment: 3950,
      debtToIncome: 21.4,
      accountStatus: 'Current',
      riskLevel: 'Low',
      lastPayment: '2024-02-28'
    }];
    const portfolioColumns = [{
      key: 'customerName',
      label: 'Customer Name',
      sortable: true,
      width: '180px',
      group: 'customer'
    }, {
      key: 'customerType',
      label: 'Type',
      sortable: true,
      width: '100px',
      group: 'customer',
      render: value => {
        const typeMap = {
          'VIP': {
            bg: 'bg-purple-100',
            text: 'text-purple-800'
          },
          'Premium': {
            bg: 'bg-blue-100',
            text: 'text-blue-800'
          },
          'Standard': {
            bg: 'bg-gray-100',
            text: 'text-gray-800'
          }
        };
        const style = typeMap[value] || typeMap['Standard'];
        return \`<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full \${style.bg} \${style.text}">\${value}</span>\`;
      }
    }, {
      key: 'creditScore',
      label: 'Credit Score',
      sortable: true,
      width: '100px',
      group: 'customer',
      render: value => {
        const color = value >= 750 ? 'text-green-600' : value >= 650 ? 'text-blue-600' : 'text-red-600';
        return \`<span class="\${color} font-bold">\${value}</span>\`;
      }
    }, {
      key: 'personalBalance',
      label: 'Personal Loans',
      sortable: true,
      width: '130px',
      align: 'right',
      group: 'loans',
      render: (value, row) => {
        if (row.personalLoans > 0) {
          return \`\${row.personalLoans} loan(s)<br/>$\${value.toLocaleString()}\`;
        }
        return '<span class="text-gray-400">None</span>';
      }
    }, {
      key: 'autoBalance',
      label: 'Auto Loans',
      sortable: true,
      width: '130px',
      align: 'right',
      group: 'loans',
      render: (value, row) => {
        if (row.autoLoans > 0) {
          return \`\${row.autoLoans} loan(s)<br/>$\${value.toLocaleString()}\`;
        }
        return '<span class="text-gray-400">None</span>';
      }
    }, {
      key: 'mortgageBalance',
      label: 'Mortgages',
      sortable: true,
      width: '130px',
      align: 'right',
      group: 'loans',
      render: (value, row) => {
        if (row.mortgageLoans > 0) {
          return \`\${row.mortgageLoans} loan(s)<br/>$\${value.toLocaleString()}\`;
        }
        return '<span class="text-gray-400">None</span>';
      }
    }, {
      key: 'totalBalance',
      label: 'Total Balance',
      sortable: true,
      width: '140px',
      align: 'right',
      group: 'financial',
      render: value => \`<span class="font-bold text-lg">$\${value.toLocaleString()}</span>\`
    }, {
      key: 'monthlyPayment',
      label: 'Monthly Payment',
      sortable: true,
      width: '140px',
      align: 'right',
      group: 'financial',
      render: value => \`<span class="font-semibold text-blue-600">$\${value.toLocaleString()}</span>\`
    }, {
      key: 'debtToIncome',
      label: 'DTI Ratio',
      sortable: true,
      width: '100px',
      align: 'center',
      group: 'financial',
      render: value => {
        const color = value <= 20 ? 'text-green-600' : value <= 30 ? 'text-yellow-600' : 'text-red-600';
        return \`<span class="\${color} font-bold">\${value}%</span>\`;
      }
    }, {
      key: 'riskLevel',
      label: 'Risk Level',
      sortable: true,
      width: '100px',
      group: 'status',
      render: value => {
        const riskMap = {
          'Low': {
            bg: 'bg-green-100',
            text: 'text-green-800'
          },
          'Medium': {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800'
          },
          'High': {
            bg: 'bg-red-100',
            text: 'text-red-800'
          }
        };
        const style = riskMap[value] || riskMap['Medium'];
        return \`<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full \${style.bg} \${style.text}">\${value}</span>\`;
      }
    }, {
      key: 'accountStatus',
      label: 'Account Status',
      sortable: true,
      width: '120px',
      group: 'status',
      render: value => {
        const statusMap = {
          'Current': {
            bg: 'bg-green-100',
            text: 'text-green-800'
          },
          'Late': {
            bg: 'bg-red-100',
            text: 'text-red-800'
          },
          'Delinquent': {
            bg: 'bg-red-200',
            text: 'text-red-900'
          }
        };
        const style = statusMap[value] || statusMap['Current'];
        return \`<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full \${style.bg} \${style.text}">\${value}</span>\`;
      }
    }];
    const selectedRows = ref([]);
    const handleRowClick = ({
      row
    }) => {
      console.log('Portfolio row clicked:', row);
    };
    const handleActionClick = ({
      action,
      row
    }) => {
      console.log(\`Action \${action} clicked for portfolio:\`, row);
    };
    const handleSelectionChange = rows => {
      selectedRows.value = rows;
    };

    // Calculate portfolio summary
    const portfolioSummary = computed(() => {
      return portfolioData.reduce((acc, row) => {
        acc.totalCustomers += 1;
        acc.totalLoans += row.personalLoans + row.autoLoans + row.mortgageLoans;
        acc.totalBalance += row.totalBalance;
        acc.totalPayments += row.monthlyPayment;
        acc.avgCreditScore += row.creditScore;
        return acc;
      }, {
        totalCustomers: 0,
        totalLoans: 0,
        totalBalance: 0,
        totalPayments: 0,
        avgCreditScore: 0
      });
    });
    const finalSummary = computed(() => ({
      ...portfolioSummary.value,
      avgCreditScore: Math.round(portfolioSummary.value.avgCreditScore / portfolioData.length)
    }));
    return {
      args,
      portfolioData,
      portfolioColumns,
      selectedRows,
      finalSummary,
      handleRowClick,
      handleActionClick,
      handleSelectionChange
    };
  },
  template: \`
    <div class="space-y-6 p-6">
      <div class="text-center mb-8">
        <MTypography variant="h1" class="text-2xl font-bold text-gray-900 mb-2">
          Enhanced Portfolio Analysis
        </MTypography>
        <MTypography variant="body1" class="text-gray-600">
          Comprehensive customer portfolio with grouped columns and financial metrics
        </MTypography>
      </div>

      <MTable
        title="Customer Portfolio Dashboard"
        subtitle="Complete loan portfolio analysis with grouped data visualization"
        :data="portfolioData"
        :columns="portfolioColumns"
        :selectable="true"
        :show-search="true"
        :show-filters="args.enableFiltering"
        :show-pagination="false"
        :show-actions="true"
        :show-export="true"
        :row-clickable="true"
        :enable-grouping="args.enableGrouping"
        :actions="[
          { key: 'details', label: 'View Portfolio', variant: 'primary' },
          { key: 'contact', label: 'Contact Customer', variant: 'secondary' },
          { key: 'restructure', label: 'Restructure Loans', variant: 'warning' },
          { key: 'statement', label: 'Generate Statement', variant: 'info' }
        ]"
        :filter-options="[
          {
            key: 'customerType',
            label: 'Customer Type',
            options: [
              { value: 'VIP', label: 'VIP Customers' },
              { value: 'Premium', label: 'Premium Customers' },
              { value: 'Standard', label: 'Standard Customers' }
            ]
          },
          {
            key: 'accountStatus',
            label: 'Account Status',
            options: [
              { value: 'Current', label: 'Current' },
              { value: 'Late', label: 'Late Payments' },
              { value: 'Delinquent', label: 'Delinquent' }
            ]
          },
          {
            key: 'riskLevel',
            label: 'Risk Assessment',
            options: [
              { value: 'Low', label: 'Low Risk' },
              { value: 'Medium', label: 'Medium Risk' },
              { value: 'High', label: 'High Risk' }
            ]
          }
        ]"
        @row-click="handleRowClick"
        @action-click="handleActionClick"
        @selection-change="handleSelectionChange"
      />

      <div v-if="args.showSummary" class="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6 border border-blue-200">
        <MTypography variant="h6" class="text-lg font-semibold mb-4 text-gray-800">
          Portfolio Summary Metrics
        </MTypography>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-6">
          <div class="text-center">
            <div class="text-3xl font-bold text-blue-600">{{ finalSummary.totalCustomers }}</div>
            <div class="text-sm text-gray-600 font-medium">Total Customers</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600">{{ finalSummary.totalLoans }}</div>
            <div class="text-sm text-gray-600 font-medium">Active Loans</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-purple-600">\\\${{ finalSummary.totalBalance.toLocaleString() }}</div>
            <div class="text-sm text-gray-600 font-medium">Total Balance</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-orange-600">\\\${{ finalSummary.totalPayments.toLocaleString() }}</div>
            <div class="text-sm text-gray-600 font-medium">Monthly Payments</div>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-indigo-600">{{ finalSummary.avgCreditScore }}</div>
            <div class="text-sm text-gray-600 font-medium">Avg Credit Score</div>
          </div>
        </div>
      </div>
    </div>
  \`
})`,...(M=(T=u.parameters)==null?void 0:T.docs)==null?void 0:M.source}}};var w,C,k;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`() => ({
  components: {
    MTable,
    MButton,
    MInput,
    MTypography,
    MAlert
  },
  setup() {
    const transactionData = ref([{
      id: 'TXN-001',
      date: '2024-02-28',
      customerName: 'Alice Johnson',
      customerId: 'CUST-001',
      transactionType: 'Payment',
      loanType: 'Personal',
      amount: 650.00,
      principal: 425.50,
      interest: 189.25,
      fees: 35.25,
      remainingBalance: 24350.00,
      paymentMethod: 'ACH',
      status: 'Completed',
      processingTime: 2.3
    }, {
      id: 'TXN-002',
      date: '2024-02-27',
      customerName: 'Robert Chen',
      customerId: 'CUST-002',
      transactionType: 'Disbursement',
      loanType: 'Personal',
      amount: 15000.00,
      principal: 15000.00,
      interest: 0.00,
      fees: 150.00,
      remainingBalance: 15000.00,
      paymentMethod: 'Wire Transfer',
      status: 'Completed',
      processingTime: 4.2
    }, {
      id: 'TXN-003',
      date: '2024-02-26',
      customerName: 'Maria Rodriguez',
      customerId: 'CUST-003',
      transactionType: 'Payment',
      loanType: 'Personal',
      amount: 385.00,
      principal: 265.80,
      interest: 119.20,
      fees: 0.00,
      remainingBalance: 11735.20,
      paymentMethod: 'ACH',
      status: 'Failed',
      processingTime: 0.5
    }, {
      id: 'TXN-004',
      date: '2024-02-25',
      customerName: 'David Thompson',
      customerId: 'CUST-004',
      transactionType: 'Late Fee',
      loanType: 'Auto',
      amount: 35.00,
      principal: 0.00,
      interest: 0.00,
      fees: 35.00,
      remainingBalance: 54035.00,
      paymentMethod: 'System',
      status: 'Applied',
      processingTime: 0.1
    }, {
      id: 'TXN-005',
      date: '2024-02-24',
      customerName: 'Jennifer Martinez',
      customerId: 'CUST-005',
      transactionType: 'Payment',
      loanType: 'Mortgage',
      amount: 3200.00,
      principal: 2800.00,
      interest: 400.00,
      fees: 0.00,
      remainingBalance: 422200.00,
      paymentMethod: 'ACH',
      status: 'Completed',
      processingTime: 1.8
    }]);
    const transactionColumns = [{
      key: 'id',
      label: 'Transaction ID',
      sortable: true,
      width: '120px',
      group: 'transaction'
    }, {
      key: 'date',
      label: 'Date',
      type: 'date',
      sortable: true,
      width: '100px',
      group: 'transaction'
    }, {
      key: 'transactionType',
      label: 'Type',
      sortable: true,
      width: '120px',
      group: 'transaction',
      render: value => {
        const typeMap = {
          'Payment': {
            bg: 'bg-green-100',
            text: 'text-green-800'
          },
          'Disbursement': {
            bg: 'bg-blue-100',
            text: 'text-blue-800'
          },
          'Late Fee': {
            bg: 'bg-red-100',
            text: 'text-red-800'
          },
          'Adjustment': {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800'
          }
        };
        const style = typeMap[value] || typeMap['Payment'];
        return \`<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full \${style.bg} \${style.text}">\${value}</span>\`;
      }
    }, {
      key: 'status',
      label: 'Status',
      sortable: true,
      width: '100px',
      group: 'transaction',
      render: value => {
        const statusMap = {
          'Completed': {
            bg: 'bg-green-100',
            text: 'text-green-800'
          },
          'Failed': {
            bg: 'bg-red-100',
            text: 'text-red-800'
          },
          'Pending': {
            bg: 'bg-yellow-100',
            text: 'text-yellow-800'
          },
          'Applied': {
            bg: 'bg-blue-100',
            text: 'text-blue-800'
          }
        };
        const style = statusMap[value] || statusMap['Completed'];
        return \`<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full \${style.bg} \${style.text}">\${value}</span>\`;
      }
    }, {
      key: 'customerName',
      label: 'Customer',
      sortable: true,
      width: '150px',
      group: 'customer'
    }, {
      key: 'loanType',
      label: 'Loan Type',
      sortable: true,
      width: '100px',
      group: 'customer'
    }, {
      key: 'paymentMethod',
      label: 'Payment Method',
      sortable: true,
      width: '120px',
      group: 'customer'
    }, {
      key: 'amount',
      label: 'Total Amount',
      type: 'currency',
      sortable: true,
      width: '120px',
      align: 'right',
      group: 'financial',
      render: value => \`<span class="font-bold">$\${value.toFixed(2)}</span>\`
    }, {
      key: 'principal',
      label: 'Principal',
      type: 'currency',
      sortable: true,
      width: '110px',
      align: 'right',
      group: 'financial',
      render: value => \`<span class="text-blue-600">$\${value.toFixed(2)}</span>\`
    }, {
      key: 'interest',
      label: 'Interest',
      type: 'currency',
      sortable: true,
      width: '100px',
      align: 'right',
      group: 'financial',
      render: value => \`<span class="text-green-600">$\${value.toFixed(2)}</span>\`
    }, {
      key: 'fees',
      label: 'Fees',
      type: 'currency',
      sortable: true,
      width: '80px',
      align: 'right',
      group: 'financial',
      render: value => value > 0 ? \`<span class="text-red-600">$\${value.toFixed(2)}</span>\` : '<span class="text-gray-400">$0.00</span>'
    }, {
      key: 'remainingBalance',
      label: 'Remaining Balance',
      type: 'currency',
      sortable: true,
      width: '140px',
      align: 'right',
      group: 'financial',
      render: value => \`<span class="font-semibold text-purple-600">$\${value.toLocaleString()}</span>\`
    }];
    const filterCriteria = ref({
      dateRange: {
        start: '',
        end: ''
      },
      amountRange: {
        min: '',
        max: ''
      },
      transactionTypes: [],
      statuses: [],
      searchText: ''
    });
    const filteredData = computed(() => {
      let filtered = [...transactionData.value];

      // Date range filter
      if (filterCriteria.value.dateRange.start) {
        filtered = filtered.filter(item => item.date >= filterCriteria.value.dateRange.start);
      }
      if (filterCriteria.value.dateRange.end) {
        filtered = filtered.filter(item => item.date <= filterCriteria.value.dateRange.end);
      }

      // Amount range filter
      if (filterCriteria.value.amountRange.min) {
        filtered = filtered.filter(item => item.amount >= parseFloat(filterCriteria.value.amountRange.min));
      }
      if (filterCriteria.value.amountRange.max) {
        filtered = filtered.filter(item => item.amount <= parseFloat(filterCriteria.value.amountRange.max));
      }

      // Search text filter
      if (filterCriteria.value.searchText) {
        const searchTerm = filterCriteria.value.searchText.toLowerCase();
        filtered = filtered.filter(item => item.customerName.toLowerCase().includes(searchTerm) || item.id.toLowerCase().includes(searchTerm) || item.transactionType.toLowerCase().includes(searchTerm));
      }
      return filtered;
    });
    const clearFilters = () => {
      filterCriteria.value = {
        dateRange: {
          start: '',
          end: ''
        },
        amountRange: {
          min: '',
          max: ''
        },
        transactionTypes: [],
        statuses: [],
        searchText: ''
      };
    };
    const exportTransactions = () => {
      console.log('Exporting transactions:', filteredData.value);
      alert(\`Exporting \${filteredData.value.length} transactions to CSV\`);
    };
    return {
      transactionData,
      transactionColumns,
      filterCriteria,
      filteredData,
      clearFilters,
      exportTransactions
    };
  },
  template: \`
    <div class="space-y-6 p-6">
      <div class="text-center mb-8">
        <MTypography variant="h1" class="text-2xl font-bold text-gray-900 mb-2">
          Advanced Transaction Filtering
        </MTypography>
        <MTypography variant="body1" class="text-gray-600">
          Multi-condition filtering with date ranges, amount filters, and real-time search
        </MTypography>
      </div>

      <div class="bg-gray-50 p-6 rounded-lg border">
        <MTypography variant="h6" class="text-lg font-semibold mb-4">
          Filter Controls
        </MTypography>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Search</label>
            <MInput 
              placeholder="Customer, ID, or Type"
              v-model="filterCriteria.searchText"
              fullWidth
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <MInput 
              type="date" 
              v-model="filterCriteria.dateRange.start"
              fullWidth
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <MInput 
              type="date" 
              v-model="filterCriteria.dateRange.end"
              fullWidth
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Min Amount</label>
            <MInput 
              type="number" 
              placeholder="0.00"
              v-model="filterCriteria.amountRange.min"
              fullWidth
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Max Amount</label>
            <MInput 
              type="number" 
              placeholder="999999.99"
              v-model="filterCriteria.amountRange.max"
              fullWidth
            />
          </div>
        </div>

        <div class="flex flex-wrap gap-4 items-center">
          <MButton 
            text="Clear All Filters"
            variant="outlined"
            color="secondary"
            size="small"
            @click="clearFilters"
          />
          <MButton 
            text="Export to CSV"
            variant="filled"
            color="primary"
            size="small"
            @click="exportTransactions"
            class="mf-button-primary"
          />
          <div class="text-sm text-gray-600">
            Showing {{ filteredData.length }} of {{ transactionData.length }} transactions
          </div>
        </div>
      </div>

      <MTable
        title="Transaction History with Advanced Filtering"
        subtitle="Real-time filtering and search across transaction data"
        :data="filteredData"
        :columns="transactionColumns"
        :selectable="true"
        :show-search="false"
        :show-filters="false"
        :show-pagination="true"
        :show-actions="true"
        :show-export="true"
        :page-size="8"
        :enable-grouping="true"
        :actions="[
          { key: 'details', label: 'View Details', variant: 'primary' },
          { key: 'receipt', label: 'Download Receipt', variant: 'secondary' },
          { key: 'dispute', label: 'Dispute Transaction', variant: 'warning' }
        ]"
      />
    </div>
  \`
})`,...(k=(C=d.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};var S,L,P;p.parameters={...p.parameters,docs:{...(S=p.parameters)==null?void 0:S.docs,source:{originalSource:`() => ({
  components: {
    MTable,
    MButton,
    MTypography
  },
  setup() {
    const loanComparisonData = [{
      id: 'COMP-001',
      loanType: 'Personal Loan',
      product: 'Standard Personal',
      rateMin: 8.99,
      rateMax: 24.99,
      amountMin: 1000,
      amountMax: 50000,
      termMin: 12,
      termMax: 60,
      approvalTime: '24-48 hours',
      creditMin: 600,
      features: 'No collateral required, flexible terms',
      monthlyPaymentExample: 515
    }, {
      id: 'COMP-002',
      loanType: 'Auto Loan',
      product: 'New Vehicle Financing',
      rateMin: 4.99,
      rateMax: 12.99,
      amountMin: 5000,
      amountMax: 100000,
      termMin: 24,
      termMax: 84,
      approvalTime: '1-3 hours',
      creditMin: 650,
      features: 'Vehicle as collateral, competitive rates',
      monthlyPaymentExample: 485
    }, {
      id: 'COMP-003',
      loanType: 'Mortgage',
      product: 'Fixed Rate Mortgage',
      rateMin: 6.25,
      rateMax: 8.75,
      amountMin: 50000,
      amountMax: 750000,
      termMin: 180,
      termMax: 360,
      approvalTime: '30-45 days',
      creditMin: 620,
      features: 'Property as collateral, tax benefits',
      monthlyPaymentExample: 2850
    }];
    const spanningColumns = [{
      key: 'product-info',
      label: 'Product Information',
      isHeader: true,
      colspan: 2,
      children: [{
        key: 'loanType',
        label: 'Loan Type',
        sortable: true,
        width: '150px'
      }, {
        key: 'product',
        label: 'Product Name',
        sortable: true,
        width: '180px'
      }]
    }, {
      key: 'rate-terms',
      label: 'Rates & Terms',
      isHeader: true,
      colspan: 4,
      children: [{
        key: 'rateRange',
        label: 'APR Range',
        sortable: false,
        width: '120px',
        render: (value, row) => \`\${row.rateMin}% - \${row.rateMax}%\`
      }, {
        key: 'amountRange',
        label: 'Loan Amount',
        sortable: false,
        width: '140px',
        render: (value, row) => \`$\${row.amountMin.toLocaleString()} - $\${row.amountMax.toLocaleString()}\`
      }, {
        key: 'termRange',
        label: 'Term Range',
        sortable: false,
        width: '120px',
        render: (value, row) => \`\${row.termMin} - \${row.termMax} months\`
      }, {
        key: 'approvalTime',
        label: 'Approval Time',
        sortable: true,
        width: '120px'
      }]
    }, {
      key: 'requirements',
      label: 'Requirements & Features',
      isHeader: true,
      colspan: 3,
      children: [{
        key: 'creditMin',
        label: 'Min Credit Score',
        sortable: true,
        width: '120px',
        render: value => \`<span class="font-semibold">\${value}+</span>\`
      }, {
        key: 'features',
        label: 'Key Features',
        sortable: false,
        width: '250px'
      }, {
        key: 'monthlyPaymentExample',
        label: 'Example Payment',
        sortable: true,
        width: '130px',
        align: 'right',
        render: value => \`<span class="font-bold text-green-600">$\${value}</span>\`
      }]
    }];
    return {
      loanComparisonData,
      spanningColumns
    };
  },
  template: \`
    <div class="space-y-6 p-6">
      <div class="text-center mb-8">
        <MTypography variant="h1" class="text-2xl font-bold text-gray-900 mb-2">
          Column Spanning Demonstration
        </MTypography>
        <MTypography variant="body1" class="text-gray-600">
          Grouped column headers with spanning for complex data relationships
        </MTypography>
      </div>

      <div class="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-6">
        <MTypography variant="h6" class="text-blue-800 font-semibold mb-2">
          Column Grouping Features
        </MTypography>
        <ul class="text-blue-700 text-sm space-y-1">
          <li>• Product Information: Basic loan type and product details</li>
          <li>• Rates & Terms: Financial terms, ranges, and approval timelines</li>
          <li>• Requirements & Features: Credit requirements and key benefits</li>
        </ul>
      </div>

      <MTable
        title="Loan Product Comparison"
        subtitle="Side-by-side comparison with grouped column headers"
        :data="loanComparisonData"
        :columns="spanningColumns"
        :selectable="false"
        :show-search="false"
        :show-filters="false"
        :show-pagination="false"
        :show-actions="true"
        :show-export="true"
        :enable-grouping="true"
        :column-spanning="true"
        :actions="[
          { key: 'apply', label: 'Apply Now', variant: 'primary' },
          { key: 'details', label: 'Learn More', variant: 'secondary' },
          { key: 'calculator', label: 'Payment Calculator', variant: 'info' }
        ]"
      />
    </div>
  \`
})`,...(P=(L=p.parameters)==null?void 0:L.docs)==null?void 0:P.source}}};const H=["PortfolioAnalysis","AdvancedFiltering","ColumnSpanningDemo"];export{d as AdvancedFiltering,p as ColumnSpanningDemo,u as PortfolioAnalysis,H as __namedExportsOrder,V as default};
