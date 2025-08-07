import{r as h}from"./vue.esm-bundler-BOts1VAj.js";import{M as u}from"./MTable-B8rROLud.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";const U={title:"Core Components/Data Display/Table",component:u,parameters:{layout:"fullscreen",docs:{description:{component:"Comprehensive data table with sorting, filtering, pagination, and selection using flat configuration structures."}}}},b=[{id:"APP-001",applicantName:"John Smith",email:"john.smith@email.com",loanAmount:25e3,loanType:"Personal",creditScore:750,status:"approved",applicationDate:"2024-01-15",monthlyIncome:6500,debtToIncome:28,approved:!0},{id:"APP-002",applicantName:"Sarah Johnson",email:"sarah.j@email.com",loanAmount:15e3,loanType:"Auto",creditScore:680,status:"pending",applicationDate:"2024-01-18",monthlyIncome:4800,debtToIncome:32,approved:!1},{id:"APP-003",applicantName:"Michael Brown",email:"michael.brown@email.com",loanAmount:5e4,loanType:"Mortgage",creditScore:720,status:"approved",applicationDate:"2024-01-20",monthlyIncome:8200,debtToIncome:25,approved:!0},{id:"APP-004",applicantName:"Emily Davis",email:"emily.davis@email.com",loanAmount:12e3,loanType:"Personal",creditScore:620,status:"rejected",applicationDate:"2024-01-22",monthlyIncome:3500,debtToIncome:45,approved:!1},{id:"APP-005",applicantName:"David Wilson",email:"david.wilson@email.com",loanAmount:35e3,loanType:"Business",creditScore:780,status:"approved",applicationDate:"2024-01-25",monthlyIncome:9500,debtToIncome:22,approved:!0},{id:"APP-006",applicantName:"Lisa Anderson",email:"lisa.anderson@email.com",loanAmount:8e3,loanType:"Student",creditScore:590,status:"pending",applicationDate:"2024-01-28",monthlyIncome:2800,debtToIncome:38,approved:!1},{id:"APP-007",applicantName:"Robert Taylor",email:"robert.taylor@email.com",loanAmount:4e4,loanType:"Auto",creditScore:710,status:"approved",applicationDate:"2024-01-30",monthlyIncome:7200,debtToIncome:30,approved:!0},{id:"APP-008",applicantName:"Jennifer Martinez",email:"jennifer.m@email.com",loanAmount:18e3,loanType:"Personal",creditScore:650,status:"pending",applicationDate:"2024-02-02",monthlyIncome:5200,debtToIncome:35,approved:!1}],j=[{key:"applicantName",label:"Applicant",sortable:!0},{key:"loanAmount",label:"Loan Amount",type:"currency",sortable:!0,align:"right"},{key:"loanType",label:"Type",sortable:!0},{key:"creditScore",label:"Credit Score",type:"number",sortable:!0,render:e=>`<span class="${e>=750?"text-green-600":e>=650?"text-blue-600":e>=500?"text-yellow-600":"text-red-600"} font-medium">${e}</span>`},{key:"status",label:"Status",type:"status",sortable:!0},{key:"applicationDate",label:"Applied",type:"date",sortable:!0},{key:"debtToIncome",label:"DTI",sortable:!0,render:e=>`${e}%`}],g=e=>({components:{MTable:u},setup(){const t=h([]);return{args:e,selectedRows:t,handleRowClick:({row:l})=>{console.log("Row clicked:",l)},handleActionClick:({action:l,row:n})=>{console.log(`Action ${l} clicked for:`,n)},handleSelectionChange:l=>{t.value=l,console.log("Selection changed:",l)}}},template:`
    <MTable
      v-bind="args"
      @row-click="handleRowClick"
      @action-click="handleActionClick"
      @selection-change="handleSelectionChange"
    />
  `}),i=g.bind({});i.args={title:"Loan Applications",subtitle:"Manage and review loan applications",data:b,columns:j,selectable:!0,showSearch:!0,showFilters:!0,showPagination:!0,showActions:!0,showExport:!0,pageSize:5,rowClickable:!0,actions:[{key:"view",label:"View",variant:"primary"},{key:"approve",label:"Approve",variant:"success"},{key:"reject",label:"Reject",variant:"danger"}],filterOptions:[{key:"status",label:"Filter by Status",options:[{value:"approved",label:"Approved"},{value:"pending",label:"Pending"},{value:"rejected",label:"Rejected"}]},{key:"loanType",label:"Filter by Type",options:[{value:"Personal",label:"Personal"},{value:"Auto",label:"Auto"},{value:"Mortgage",label:"Mortgage"},{value:"Business",label:"Business"},{value:"Student",label:"Student"}]}]};const N=[{id:"CUST-001",customerName:"Alice Johnson",email:"alice.johnson@email.com",totalLoans:2,outstandingBalance:45e3,monthlyPayment:1250,creditScore:780,riskLevel:"Low",lastPayment:"2024-01-28",status:"active",joinDate:"2022-03-15"},{id:"CUST-002",customerName:"Bob Chen",email:"bob.chen@email.com",totalLoans:1,outstandingBalance:18500,monthlyPayment:485,creditScore:720,riskLevel:"Low",lastPayment:"2024-01-30",status:"active",joinDate:"2023-01-20"},{id:"CUST-003",customerName:"Carol Davis",email:"carol.davis@email.com",totalLoans:3,outstandingBalance:72e3,monthlyPayment:2100,creditScore:650,riskLevel:"Medium",lastPayment:"2024-01-25",status:"active",joinDate:"2021-11-08"},{id:"CUST-004",customerName:"Daniel Rodriguez",email:"daniel.r@email.com",totalLoans:1,outstandingBalance:8900,monthlyPayment:320,creditScore:580,riskLevel:"High",lastPayment:"2024-01-15",status:"delinquent",joinDate:"2023-08-12"}],B=[{key:"customerName",label:"Customer",sortable:!0},{key:"totalLoans",label:"Loans",type:"number",sortable:!0,align:"center"},{key:"outstandingBalance",label:"Outstanding",type:"currency",sortable:!0,align:"right"},{key:"monthlyPayment",label:"Monthly Payment",type:"currency",sortable:!0,align:"right"},{key:"creditScore",label:"Credit Score",type:"number",sortable:!0,render:e=>`<span class="${e>=750?"text-green-600":e>=650?"text-blue-600":"text-red-600"} font-semibold">${e}</span>`},{key:"riskLevel",label:"Risk",sortable:!0,render:e=>`<span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${{Low:"bg-green-100 text-green-800",Medium:"bg-yellow-100 text-yellow-800",High:"bg-red-100 text-red-800"}[e]}">${e}</span>`},{key:"status",label:"Status",type:"status",sortable:!0},{key:"lastPayment",label:"Last Payment",type:"date",sortable:!0}],r=g.bind({});r.args={title:"Customer Portfolio",subtitle:"Manage customer accounts and loan portfolios",data:N,columns:B,selectable:!0,showSearch:!0,showFilters:!0,showPagination:!1,showActions:!0,showExport:!0,rowClickable:!0,actions:[{key:"details",label:"Details",variant:"primary"},{key:"contact",label:"Contact",variant:"secondary"},{key:"restructure",label:"Restructure",variant:"warning"}],filterOptions:[{key:"status",label:"Filter by Status",options:[{value:"active",label:"Active"},{value:"delinquent",label:"Delinquent"},{value:"inactive",label:"Inactive"}]},{key:"riskLevel",label:"Filter by Risk",options:[{value:"Low",label:"Low Risk"},{value:"Medium",label:"Medium Risk"},{value:"High",label:"High Risk"}]}]};const F=[{metric:"Total Loan Volume",thisMonth:285e4,lastMonth:265e4,change:7.5,trend:"up",target:3e6},{metric:"Applications Received",thisMonth:1420,lastMonth:1350,change:5.2,trend:"up",target:1500},{metric:"Approval Rate",thisMonth:78.5,lastMonth:76.2,change:2.3,trend:"up",target:80},{metric:"Average Loan Amount",thisMonth:28500,lastMonth:27800,change:2.5,trend:"up",target:3e4},{metric:"Default Rate",thisMonth:2.8,lastMonth:3.2,change:-12.5,trend:"down",target:2.5},{metric:"Processing Time (days)",thisMonth:4.2,lastMonth:4.8,change:-12.5,trend:"down",target:3.5}],z=[{key:"metric",label:"Metric",sortable:!1},{key:"thisMonth",label:"This Month",sortable:!0,align:"right",render:(e,t)=>t.metric.includes("Rate")||t.metric.includes("Time")?`<span class="font-semibold">${e}${t.metric.includes("Rate")?"%":""}</span>`:`<span class="font-semibold">$${e.toLocaleString()}</span>`},{key:"lastMonth",label:"Last Month",sortable:!0,align:"right",render:(e,t)=>t.metric.includes("Rate")||t.metric.includes("Time")?`${e}${t.metric.includes("Rate")?"%":""}`:`$${e.toLocaleString()}`},{key:"change",label:"Change",sortable:!0,align:"right",render:e=>{const t=e>0?"text-green-600":"text-red-600",m=e>0?"↑":"↓";return`<span class="${t} font-medium">${m} ${Math.abs(e)}%</span>`}},{key:"target",label:"Target",sortable:!0,align:"right",render:(e,t)=>t.metric.includes("Rate")||t.metric.includes("Time")?`${e}${t.metric.includes("Rate")?"%":""}`:`$${e.toLocaleString()}`}],c=g.bind({});c.args={title:"Key Performance Metrics",subtitle:"Monthly performance indicators and targets",data:F,columns:z,selectable:!1,showSearch:!1,showFilters:!1,showPagination:!1,showActions:!1,showExport:!0,rowClickable:!1};const V=()=>({components:{MTable:u},setup(){const e=h([...b]),t=h([]);return{data:e,selectedRows:t,addRandomApplication:()=>{const n=["Alex Thompson","Maria Garcia","James Lee","Sophie Wang"],o=["Personal","Auto","Mortgage","Business"],a=["pending","approved","rejected"],s={id:`APP-${String(e.value.length+1).padStart(3,"0")}`,applicantName:n[Math.floor(Math.random()*n.length)],email:`user${Date.now()}@email.com`,loanAmount:Math.floor(Math.random()*5e4)+5e3,loanType:o[Math.floor(Math.random()*o.length)],creditScore:Math.floor(Math.random()*300)+500,status:a[Math.floor(Math.random()*a.length)],applicationDate:new Date().toISOString().split("T")[0],monthlyIncome:Math.floor(Math.random()*8e3)+3e3,debtToIncome:Math.floor(Math.random()*40)+20,approved:Math.random()>.5};e.value.push(s)},removeSelected:()=>{const n=t.value.map(o=>o.id);e.value=e.value.filter(o=>!n.includes(o.id)),t.value=[]},handleSelectionChange:n=>{t.value=n},handleActionClick:({action:n,row:o})=>{if(n==="approve"){const a=e.value.findIndex(s=>s.id===o.id);a!==-1&&(e.value[a].status="approved",e.value[a].approved=!0)}else if(n==="reject"){const a=e.value.findIndex(s=>s.id===o.id);a!==-1&&(e.value[a].status="rejected",e.value[a].approved=!1)}}}},template:`
    <div class="space-y-6 p-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900">Interactive Loan Management</h2>
        <div class="flex space-x-3">
          <button
            @click="addRandomApplication"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Add Application
          </button>
          <button
            v-if="selectedRows.length > 0"
            @click="removeSelected"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Remove Selected ({{ selectedRows.length }})
          </button>
        </div>
      </div>
      
      <MTable
        title="Live Loan Applications"
        subtitle="Real-time application management with actions"
        :data="data"
        :columns="[
          { key: 'applicantName', label: 'Applicant', sortable: true },
          { key: 'loanAmount', label: 'Amount', type: 'currency', sortable: true, align: 'right' },
          { key: 'loanType', label: 'Type', sortable: true },
          { key: 'creditScore', label: 'Credit Score', type: 'number', sortable: true },
          { key: 'status', label: 'Status', type: 'status', sortable: true },
          { key: 'applicationDate', label: 'Applied', type: 'date', sortable: true }
        ]"
        :selectable="true"
        :show-search="true"
        :show-filters="true"
        :show-pagination="true"
        :show-actions="true"
        :show-export="true"
        :page-size="6"
        :row-clickable="true"
        :actions="[
          { key: 'view', label: 'View', variant: 'primary' },
          { key: 'approve', label: 'Approve', variant: 'success' },
          { key: 'reject', label: 'Reject', variant: 'danger' }
        ]"
        :filter-options="[
          {
            key: 'status',
            label: 'Filter by Status',
            options: [
              { value: 'approved', label: 'Approved' },
              { value: 'pending', label: 'Pending' },
              { value: 'rejected', label: 'Rejected' }
            ]
          },
          {
            key: 'loanType',
            label: 'Filter by Type',
            options: [
              { value: 'Personal', label: 'Personal' },
              { value: 'Auto', label: 'Auto' },
              { value: 'Mortgage', label: 'Mortgage' },
              { value: 'Business', label: 'Business' }
            ]
          }
        ]"
        @selection-change="handleSelectionChange"
        @action-click="handleActionClick"
      />
    </div>
  `}),d=V.bind({});d.parameters={layout:"fullscreen"};const J=()=>({components:{MTable:u},setup(){return{mobileData:b.slice(0,4),mobileColumns:[{key:"applicantName",label:"Applicant",sortable:!0},{key:"loanAmount",label:"Amount",type:"currency",sortable:!0,align:"right"},{key:"status",label:"Status",type:"status",sortable:!0}]}},template:`
    <div class="max-w-md mx-auto p-4">
      <MTable
        title="Loan Applications"
        subtitle="Mobile optimized view"
        :data="mobileData"
        :columns="mobileColumns"
        :selectable="false"
        :show-search="true"
        :show-filters="false"
        :show-pagination="false"
        :show-actions="true"
        :show-export="false"
        :responsive="true"
        :actions="[
          { key: 'view', label: 'View' }
        ]"
      />
    </div>
  `}),p=J.bind({});p.parameters={viewport:{defaultViewport:"mobile1"}};var y,v,w;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`args => ({
  components: {
    MTable
  },
  setup() {
    const selectedRows = ref([]);
    const handleRowClick = ({
      row
    }) => {
      console.log('Row clicked:', row);
    };
    const handleActionClick = ({
      action,
      row
    }) => {
      console.log(\`Action \${action} clicked for:\`, row);
    };
    const handleSelectionChange = rows => {
      selectedRows.value = rows;
      console.log('Selection changed:', rows);
    };
    return {
      args,
      selectedRows,
      handleRowClick,
      handleActionClick,
      handleSelectionChange
    };
  },
  template: \`
    <MTable
      v-bind="args"
      @row-click="handleRowClick"
      @action-click="handleActionClick"
      @selection-change="handleSelectionChange"
    />
  \`
})`,...(w=(v=i.parameters)==null?void 0:v.docs)==null?void 0:w.source}}};var k,f,A;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`args => ({
  components: {
    MTable
  },
  setup() {
    const selectedRows = ref([]);
    const handleRowClick = ({
      row
    }) => {
      console.log('Row clicked:', row);
    };
    const handleActionClick = ({
      action,
      row
    }) => {
      console.log(\`Action \${action} clicked for:\`, row);
    };
    const handleSelectionChange = rows => {
      selectedRows.value = rows;
      console.log('Selection changed:', rows);
    };
    return {
      args,
      selectedRows,
      handleRowClick,
      handleActionClick,
      handleSelectionChange
    };
  },
  template: \`
    <MTable
      v-bind="args"
      @row-click="handleRowClick"
      @action-click="handleActionClick"
      @selection-change="handleSelectionChange"
    />
  \`
})`,...(A=(f=r.parameters)==null?void 0:f.docs)==null?void 0:A.source}}};var M,S,C;c.parameters={...c.parameters,docs:{...(M=c.parameters)==null?void 0:M.docs,source:{originalSource:`args => ({
  components: {
    MTable
  },
  setup() {
    const selectedRows = ref([]);
    const handleRowClick = ({
      row
    }) => {
      console.log('Row clicked:', row);
    };
    const handleActionClick = ({
      action,
      row
    }) => {
      console.log(\`Action \${action} clicked for:\`, row);
    };
    const handleSelectionChange = rows => {
      selectedRows.value = rows;
      console.log('Selection changed:', rows);
    };
    return {
      args,
      selectedRows,
      handleRowClick,
      handleActionClick,
      handleSelectionChange
    };
  },
  template: \`
    <MTable
      v-bind="args"
      @row-click="handleRowClick"
      @action-click="handleActionClick"
      @selection-change="handleSelectionChange"
    />
  \`
})`,...(C=(S=c.parameters)==null?void 0:S.docs)==null?void 0:C.source}}};var R,x,T;d.parameters={...d.parameters,docs:{...(R=d.parameters)==null?void 0:R.docs,source:{originalSource:`() => ({
  components: {
    MTable
  },
  setup() {
    const data = ref([...loanApplicationsData]);
    const selectedRows = ref([]);
    const addRandomApplication = () => {
      const names = ['Alex Thompson', 'Maria Garcia', 'James Lee', 'Sophie Wang'];
      const types = ['Personal', 'Auto', 'Mortgage', 'Business'];
      const statuses = ['pending', 'approved', 'rejected'];
      const newApp = {
        id: \`APP-\${String(data.value.length + 1).padStart(3, '0')}\`,
        applicantName: names[Math.floor(Math.random() * names.length)],
        email: \`user\${Date.now()}@email.com\`,
        loanAmount: Math.floor(Math.random() * 50000) + 5000,
        loanType: types[Math.floor(Math.random() * types.length)],
        creditScore: Math.floor(Math.random() * 300) + 500,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        applicationDate: new Date().toISOString().split('T')[0],
        monthlyIncome: Math.floor(Math.random() * 8000) + 3000,
        debtToIncome: Math.floor(Math.random() * 40) + 20,
        approved: Math.random() > 0.5
      };
      data.value.push(newApp);
    };
    const removeSelected = () => {
      const selectedIds = selectedRows.value.map(row => row.id);
      data.value = data.value.filter(row => !selectedIds.includes(row.id));
      selectedRows.value = [];
    };
    const handleSelectionChange = rows => {
      selectedRows.value = rows;
    };
    const handleActionClick = ({
      action,
      row
    }) => {
      if (action === 'approve') {
        const index = data.value.findIndex(item => item.id === row.id);
        if (index !== -1) {
          data.value[index].status = 'approved';
          data.value[index].approved = true;
        }
      } else if (action === 'reject') {
        const index = data.value.findIndex(item => item.id === row.id);
        if (index !== -1) {
          data.value[index].status = 'rejected';
          data.value[index].approved = false;
        }
      }
    };
    return {
      data,
      selectedRows,
      addRandomApplication,
      removeSelected,
      handleSelectionChange,
      handleActionClick
    };
  },
  template: \`
    <div class="space-y-6 p-6">
      <div class="flex items-center justify-between">
        <h2 class="text-2xl font-bold text-gray-900">Interactive Loan Management</h2>
        <div class="flex space-x-3">
          <button
            @click="addRandomApplication"
            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Add Application
          </button>
          <button
            v-if="selectedRows.length > 0"
            @click="removeSelected"
            class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
          >
            Remove Selected ({{ selectedRows.length }})
          </button>
        </div>
      </div>
      
      <MTable
        title="Live Loan Applications"
        subtitle="Real-time application management with actions"
        :data="data"
        :columns="[
          { key: 'applicantName', label: 'Applicant', sortable: true },
          { key: 'loanAmount', label: 'Amount', type: 'currency', sortable: true, align: 'right' },
          { key: 'loanType', label: 'Type', sortable: true },
          { key: 'creditScore', label: 'Credit Score', type: 'number', sortable: true },
          { key: 'status', label: 'Status', type: 'status', sortable: true },
          { key: 'applicationDate', label: 'Applied', type: 'date', sortable: true }
        ]"
        :selectable="true"
        :show-search="true"
        :show-filters="true"
        :show-pagination="true"
        :show-actions="true"
        :show-export="true"
        :page-size="6"
        :row-clickable="true"
        :actions="[
          { key: 'view', label: 'View', variant: 'primary' },
          { key: 'approve', label: 'Approve', variant: 'success' },
          { key: 'reject', label: 'Reject', variant: 'danger' }
        ]"
        :filter-options="[
          {
            key: 'status',
            label: 'Filter by Status',
            options: [
              { value: 'approved', label: 'Approved' },
              { value: 'pending', label: 'Pending' },
              { value: 'rejected', label: 'Rejected' }
            ]
          },
          {
            key: 'loanType',
            label: 'Filter by Type',
            options: [
              { value: 'Personal', label: 'Personal' },
              { value: 'Auto', label: 'Auto' },
              { value: 'Mortgage', label: 'Mortgage' },
              { value: 'Business', label: 'Business' }
            ]
          }
        ]"
        @selection-change="handleSelectionChange"
        @action-click="handleActionClick"
      />
    </div>
  \`
})`,...(T=(x=d.parameters)==null?void 0:x.docs)==null?void 0:T.source}}};var P,D,L;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`() => ({
  components: {
    MTable
  },
  setup() {
    const mobileData = loanApplicationsData.slice(0, 4);
    const mobileColumns = [{
      key: 'applicantName',
      label: 'Applicant',
      sortable: true
    }, {
      key: 'loanAmount',
      label: 'Amount',
      type: 'currency',
      sortable: true,
      align: 'right'
    }, {
      key: 'status',
      label: 'Status',
      type: 'status',
      sortable: true
    }];
    return {
      mobileData,
      mobileColumns
    };
  },
  template: \`
    <div class="max-w-md mx-auto p-4">
      <MTable
        title="Loan Applications"
        subtitle="Mobile optimized view"
        :data="mobileData"
        :columns="mobileColumns"
        :selectable="false"
        :show-search="true"
        :show-filters="false"
        :show-pagination="false"
        :show-actions="true"
        :show-export="false"
        :responsive="true"
        :actions="[
          { key: 'view', label: 'View' }
        ]"
      />
    </div>
  \`
})`,...(L=(D=p.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};const q=["LoanApplications","CustomerPortfolio","DashboardMetrics","InteractiveLoanManagement","MobileResponsive"];export{r as CustomerPortfolio,c as DashboardMetrics,d as InteractiveLoanManagement,i as LoanApplications,p as MobileResponsive,q as __namedExportsOrder,U as default};
