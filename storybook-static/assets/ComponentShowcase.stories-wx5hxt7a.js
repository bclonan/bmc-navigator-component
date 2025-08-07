import{a as y,c as u,r as v}from"./vue.esm-bundler-BOts1VAj.js";import{M}from"./MChart-C1yH-mUs.js";import{M as V}from"./MTable-B8rROLud.js";import{M as A}from"./MSlider-CAxFof3m.js";import{S as D}from"./StateTransitionVisualizer-Bliu1iFB.js";import{D as z}from"./DynamicFormRenderer-Cb9fD5WO.js";import"./formConfigs-3Jm4puB3.js";import"./_plugin-vue_export-helper-DlAUqK2U.js";import"./MCard-BMaDLVhA.js";import"./MButton-ClHapibe.js";import"./MTextField-OPGGVjaU.js";import"./MSelect-BPYUGOCn.js";import"./MCheckbox-B-c44SKF.js";const J={title:"Demo/Component Showcase",parameters:{layout:"fullscreen",docs:{description:{component:"Complete showcase of all UI components working together with flat configuration structures."}}}},P=()=>({components:{MChart:M,MTable:V,MSlider:A,StateTransitionVisualizer:D,DynamicFormRenderer:z},setup(){const l=y({activeTab:"overview",selectedComponent:"all",interactiveMode:!0}),a=y({loanAmount:25e3,creditScore:720,income:6500,expenses:3200,term:36}),t=u(()=>{const e=.007083333333333334,n=a.term,r=a.loanAmount,h=r*(e*Math.pow(1+e,n))/(Math.pow(1+e,n)-1),$=h*n-r,f=h/a.income*100,C=a.income-a.expenses,I=Math.max(0,100-f*2);return{monthlyPayment:h,totalInterest:$,paymentToIncome:f,availableIncome:C,affordabilityScore:I}}),p=u(()=>({loanBreakdown:[{x:"Principal",y:a.loanAmount,color:"#3b82f6"},{x:"Interest",y:t.value.totalInterest,color:"#ef4444"}],affordabilityTrend:Array.from({length:12},(e,n)=>({x:n+1,y:t.value.affordabilityScore+(Math.random()-.5)*10})),incomeAnalysis:[{x:"Available Income",y:t.value.availableIncome,color:"#10b981"},{x:"Monthly Payment",y:t.value.monthlyPayment,color:"#f59e0b"},{x:"Remaining",y:Math.max(0,t.value.availableIncome-t.value.monthlyPayment),color:"#8b5cf6"}]})),i=v([{id:"DEMO-001",applicantName:"Interactive Demo",loanAmount:a.loanAmount,creditScore:a.creditScore,monthlyIncome:a.income,status:t.value.affordabilityScore>70?"qualified":t.value.affordabilityScore>40?"review":"declined",applicationDate:new Date().toISOString().split("T")[0],debtToIncome:Math.round(a.expenses/a.income*100)}]),s=v([{id:"application",label:"Application",description:"Submit information",step:1,icon:"document-text",color:"blue",active:l.activeTab==="forms",completed:!0},{id:"analysis",label:"Analysis",description:"Credit assessment",step:2,icon:"chart-bar",color:"purple",active:l.activeTab==="charts",completed:l.activeTab!=="forms"},{id:"review",label:"Review",description:"Application review",step:3,icon:"clipboard-check",color:"yellow",active:l.activeTab==="tables",completed:!1},{id:"decision",label:"Decision",description:"Final approval",step:4,icon:"check-circle",color:"green",active:l.activeTab==="overview",completed:!1}]);return{showcaseState:l,sliderValues:a,calculations:t,dynamicChartData:p,sampleTableData:i,processStates:s,showcaseFormConfig:{title:"Interactive Component Demo",description:"See how all components work together",sections:[{id:"loan_parameters",title:"Loan Parameters",step:1,layout:"single",fields:[{id:"loanAmount",type:"slider",label:"Loan Amount",min:5e3,max:1e5,step:1e3,unit:"$",showTooltip:!0,showMarkers:!0,markers:[{value:5e3,label:"$5K"},{value:25e3,label:"$25K"},{value:5e4,label:"$50K"},{value:1e5,label:"$100K"}],formatValue:e=>`$${e.toLocaleString()}`,variant:"primary",defaultValue:25e3},{id:"term",type:"slider",label:"Loan Term",min:12,max:84,step:6,unit:"months",showTooltip:!0,showMarkers:!0,markers:[{value:12,label:"1yr"},{value:36,label:"3yr"},{value:60,label:"5yr"},{value:84,label:"7yr"}],formatValue:e=>{const n=Math.floor(e/12),r=e%12;return r===0?`${n} year${n>1?"s":""}`:`${n}y ${r}m`},variant:"secondary",defaultValue:36}]},{id:"financial_info",title:"Financial Information",step:2,layout:"single",fields:[{id:"income",type:"slider",label:"Monthly Income",min:2e3,max:15e3,step:250,unit:"$",showTooltip:!0,formatValue:e=>`$${e.toLocaleString()}`,variant:"success",defaultValue:6500},{id:"expenses",type:"slider",label:"Monthly Expenses",min:1e3,max:8e3,step:100,unit:"$",showTooltip:!0,formatValue:e=>`$${e.toLocaleString()}`,variant:"danger",defaultValue:3200},{id:"creditScore",type:"slider",label:"Credit Score",min:300,max:850,step:10,showTooltip:!0,formatValue:e=>e>=750?`${e} (Excellent)`:e>=650?`${e} (Good)`:e>=500?`${e} (Fair)`:`${e} (Poor)`,variant:"warning",defaultValue:720}]}]},tabs:[{id:"overview",label:"Overview",icon:"home"},{id:"charts",label:"Charts",icon:"chart-bar"},{id:"tables",label:"Tables",icon:"table"},{id:"forms",label:"Forms",icon:"document-text"},{id:"visualizers",label:"Visualizers",icon:"eye"}],updateSliderValue:(e,n)=>{a[e]=n,i.value[0].loanAmount=a.loanAmount,i.value[0].creditScore=a.creditScore,i.value[0].monthlyIncome=a.income,i.value[0].debtToIncome=Math.round(a.expenses/a.income*100),i.value[0].status=t.value.affordabilityScore>70?"qualified":t.value.affordabilityScore>40?"review":"declined"},handleTableAction:({action:e,row:n})=>{console.log(`Table action: ${e} for row:`,n)}}},template:`
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Component Showcase</h1>
            <p class="mt-1 text-gray-600">Interactive demonstration of all UI components with real-time data binding</p>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="bg-white border-b">
        <div class="max-w-7xl mx-auto px-4">
          <nav class="flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                showcaseState.activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
              @click="showcaseState.activeTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Overview Tab -->
        <div v-if="showcaseState.activeTab === 'overview'" class="space-y-8">
          <!-- Process Visualization -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Component Integration Flow</h3>
            <StateTransitionVisualizer
              :states="processStates"
              :current-state="4"
              layout="horizontal"
              :show-connections="true"
              :animated="true"
              :show-descriptions="true"
            />
          </div>

          <!-- Real-time Metrics -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500">Monthly Payment</p>
                  <p class="text-2xl font-semibold text-gray-900">\${{ calculations.monthlyPayment.toFixed(0) }}</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500">Affordability Score</p>
                  <p class="text-2xl font-semibold text-gray-900">{{ Math.round(calculations.affordabilityScore) }}%</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500">DTI Ratio</p>
                  <p class="text-2xl font-semibold text-gray-900">{{ Math.round((sliderValues.expenses / sliderValues.income) * 100) }}%</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500">Available Income</p>
                  <p class="text-2xl font-semibold text-gray-900">\${{ Math.round(calculations.availableIncome) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Controls -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Interactive Controls</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MSlider
                :model-value="sliderValues.loanAmount"
                label="Loan Amount"
                :min="5000"
                :max="100000"
                :step="1000"
                unit="$"
                :show-tooltip="true"
                :format-value="(value) => \`$\${value.toLocaleString()}\`"
                variant="primary"
                size="large"
                @update:model-value="updateSliderValue('loanAmount', $event)"
              />
              
              <MSlider
                :model-value="sliderValues.income"
                label="Monthly Income"
                :min="2000"
                :max="15000"
                :step="250"
                unit="$"
                :show-tooltip="true"
                :format-value="(value) => \`$\${value.toLocaleString()}\`"
                variant="success"
                size="large"
                @update:model-value="updateSliderValue('income', $event)"
              />
            </div>
          </div>
        </div>

        <!-- Charts Tab -->
        <div v-if="showcaseState.activeTab === 'charts'" class="space-y-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-white rounded-lg shadow-sm p-6">
              <MChart
                type="pie"
                title="Loan Breakdown"
                subtitle="Principal vs Interest"
                :data="dynamicChartData.loanBreakdown"
                :width="400"
                :height="300"
                :show-legend="true"
              />
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-6">
              <MChart
                type="bar"
                title="Income Analysis"
                subtitle="Monthly financial breakdown"
                :data="dynamicChartData.incomeAnalysis"
                :width="400"
                :height="300"
                :formatters="{
                  y: (value) => \`$\${value.toLocaleString()}\`
                }"
              />
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-6">
            <MChart
              type="line"
              title="Affordability Trend"
              subtitle="Projected affordability score"
              :data="[{ label: 'Score', color: '#3b82f6', data: dynamicChartData.affordabilityTrend }]"
              :width="800"
              :height="350"
              :show-grid="true"
              :show-points="true"
              :formatters="{
                x: (value) => \`Month \${value}\`,
                y: (value) => \`\${value.toFixed(1)}%\`
              }"
            />
          </div>
        </div>

        <!-- Tables Tab -->
        <div v-if="showcaseState.activeTab === 'tables'" class="space-y-8">
          <div class="bg-white rounded-lg shadow-sm">
            <MTable
              title="Live Application Data"
              subtitle="Updates automatically with slider changes"
              :data="sampleTableData"
              :columns="[
                { key: 'applicantName', label: 'Applicant', sortable: true },
                { key: 'loanAmount', label: 'Amount', type: 'currency', sortable: true, align: 'right' },
                { key: 'creditScore', label: 'Credit Score', type: 'number', sortable: true },
                { key: 'monthlyIncome', label: 'Income', type: 'currency', sortable: true, align: 'right' },
                { key: 'debtToIncome', label: 'DTI', sortable: true, render: (value) => \`\${value}%\` },
                { key: 'status', label: 'Status', type: 'status', sortable: true }
              ]"
              :selectable="true"
              :show-search="false"
              :show-filters="false"
              :show-pagination="false"
              :show-actions="true"
              :show-export="true"
              :row-clickable="true"
              :actions="[
                { key: 'approve', label: 'Approve', variant: 'success' },
                { key: 'review', label: 'Review', variant: 'warning' },
                { key: 'decline', label: 'Decline', variant: 'danger' }
              ]"
              @action-click="handleTableAction"
            />
          </div>
        </div>

        <!-- Forms Tab -->
        <div v-if="showcaseState.activeTab === 'forms'" class="space-y-8">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Interactive Form Components</h3>
            <div class="space-y-6">
              <div v-for="section in showcaseFormConfig.sections" :key="section.id">
                <h4 class="text-md font-medium text-gray-900 mb-4">{{ section.title }}</h4>
                <div class="space-y-4">
                  <div v-for="field in section.fields" :key="field.id">
                    <MSlider
                      :model-value="sliderValues[field.id]"
                      :label="field.label"
                      :min="field.min"
                      :max="field.max"
                      :step="field.step"
                      :unit="field.unit"
                      :show-tooltip="field.showTooltip"
                      :show-markers="field.showMarkers"
                      :markers="field.markers"
                      :format-value="field.formatValue"
                      :variant="field.variant"
                      size="large"
                      @update:model-value="updateSliderValue(field.id, $event)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Visualizers Tab -->
        <div v-if="showcaseState.activeTab === 'visualizers'" class="space-y-8">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">State Transition Visualizers</h3>
            
            <div class="space-y-8">
              <div>
                <h4 class="text-md font-medium text-gray-700 mb-4">Horizontal Layout</h4>
                <StateTransitionVisualizer
                  :states="processStates"
                  :current-state="2"
                  layout="horizontal"
                  :show-connections="true"
                  :animated="true"
                  :show-descriptions="true"
                />
              </div>
              
              <div>
                <h4 class="text-md font-medium text-gray-700 mb-4">Vertical Layout</h4>
                <div class="max-w-sm">
                  <StateTransitionVisualizer
                    :states="processStates"
                    :current-state="3"
                    layout="vertical"
                    :show-connections="true"
                    :animated="true"
                    :show-descriptions="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `}),d=P.bind({});d.storyName="Interactive Component Showcase";const F=()=>({components:{MChart:M,MTable:V},setup(){const l=v(100),a=v("line"),t=u(()=>{const i=performance.now(),s=Array.from({length:l.value},(b,o)=>({x:o+1,y:Math.floor(Math.random()*100)+1})),c=performance.now();return{data:s,generationTime:c-i}}),p=u(()=>{const i=performance.now(),s=Array.from({length:l.value},(b,o)=>({id:o+1,name:`Item ${o+1}`,value:Math.floor(Math.random()*1e3),status:["active","pending","inactive"][Math.floor(Math.random()*3)],date:new Date(Date.now()-Math.random()*365*24*60*60*1e3).toISOString().split("T")[0]})),c=performance.now();return{data:s,generationTime:c-i}});return{dataSize:l,chartType:a,performanceData:t,tableData:p}},template:`
    <div class="space-y-8 p-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Performance Testing</h2>
        <p class="text-gray-600">Test component performance with varying data sizes</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Data Size</label>
          <MSlider
            v-model="dataSize"
            :min="10"
            :max="1000"
            :step="10"
            :show-tooltip="true"
            :format-value="(value) => \`\${value} items\`"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Chart Type</label>
          <select
            v-model="chartType"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Chart Performance</h3>
            <span class="text-sm text-gray-500">Gen: {{ performanceData.generationTime.toFixed(2) }}ms</span>
          </div>
          <MChart
            :type="chartType"
            :data="performanceData.data"
            :width="400"
            :height="300"
            :show-legend="chartType === 'pie'"
          />
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Table Performance</h3>
            <span class="text-sm text-gray-500">Gen: {{ tableData.generationTime.toFixed(2) }}ms</span>
          </div>
          <MTable
            :data="tableData.data"
            :columns="[
              { key: 'name', label: 'Name', sortable: true },
              { key: 'value', label: 'Value', type: 'number', sortable: true },
              { key: 'status', label: 'Status', type: 'status', sortable: true },
              { key: 'date', label: 'Date', type: 'date', sortable: true }
            ]"
            :page-size="10"
            :show-search="true"
            :show-pagination="true"
          />
        </div>
      </div>
    </div>
  `}),m=F.bind({});var g,w,x;d.parameters={...d.parameters,docs:{...(g=d.parameters)==null?void 0:g.docs,source:{originalSource:`() => ({
  components: {
    MChart,
    MTable,
    MSlider,
    StateTransitionVisualizer,
    DynamicFormRenderer
  },
  setup() {
    // Component showcase state
    const showcaseState = reactive({
      activeTab: 'overview',
      selectedComponent: 'all',
      interactiveMode: true
    });

    // Interactive slider values
    const sliderValues = reactive({
      loanAmount: 25000,
      creditScore: 720,
      income: 6500,
      expenses: 3200,
      term: 36
    });

    // Real-time calculations
    const calculations = computed(() => {
      const monthlyRate = 0.085 / 12;
      const numPayments = sliderValues.term;
      const principal = sliderValues.loanAmount;
      const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
      const totalInterest = monthlyPayment * numPayments - principal;
      const paymentToIncome = monthlyPayment / sliderValues.income * 100;
      const availableIncome = sliderValues.income - sliderValues.expenses;
      const affordabilityScore = Math.max(0, 100 - paymentToIncome * 2);
      return {
        monthlyPayment,
        totalInterest,
        paymentToIncome,
        availableIncome,
        affordabilityScore
      };
    });

    // Chart data that updates with slider values
    const dynamicChartData = computed(() => ({
      loanBreakdown: [{
        x: 'Principal',
        y: sliderValues.loanAmount,
        color: '#3b82f6'
      }, {
        x: 'Interest',
        y: calculations.value.totalInterest,
        color: '#ef4444'
      }],
      affordabilityTrend: Array.from({
        length: 12
      }, (_, i) => ({
        x: i + 1,
        y: calculations.value.affordabilityScore + (Math.random() - 0.5) * 10
      })),
      incomeAnalysis: [{
        x: 'Available Income',
        y: calculations.value.availableIncome,
        color: '#10b981'
      }, {
        x: 'Monthly Payment',
        y: calculations.value.monthlyPayment,
        color: '#f59e0b'
      }, {
        x: 'Remaining',
        y: Math.max(0, calculations.value.availableIncome - calculations.value.monthlyPayment),
        color: '#8b5cf6'
      }]
    }));

    // Sample table data
    const sampleTableData = ref([{
      id: 'DEMO-001',
      applicantName: 'Interactive Demo',
      loanAmount: sliderValues.loanAmount,
      creditScore: sliderValues.creditScore,
      monthlyIncome: sliderValues.income,
      status: calculations.value.affordabilityScore > 70 ? 'qualified' : calculations.value.affordabilityScore > 40 ? 'review' : 'declined',
      applicationDate: new Date().toISOString().split('T')[0],
      debtToIncome: Math.round(sliderValues.expenses / sliderValues.income * 100)
    }]);

    // State visualizer data
    const processStates = ref([{
      id: 'application',
      label: 'Application',
      description: 'Submit information',
      step: 1,
      icon: 'document-text',
      color: 'blue',
      active: showcaseState.activeTab === 'forms',
      completed: true
    }, {
      id: 'analysis',
      label: 'Analysis',
      description: 'Credit assessment',
      step: 2,
      icon: 'chart-bar',
      color: 'purple',
      active: showcaseState.activeTab === 'charts',
      completed: showcaseState.activeTab !== 'forms'
    }, {
      id: 'review',
      label: 'Review',
      description: 'Application review',
      step: 3,
      icon: 'clipboard-check',
      color: 'yellow',
      active: showcaseState.activeTab === 'tables',
      completed: false
    }, {
      id: 'decision',
      label: 'Decision',
      description: 'Final approval',
      step: 4,
      icon: 'check-circle',
      color: 'green',
      active: showcaseState.activeTab === 'overview',
      completed: false
    }]);

    // Form configuration for showcase
    const showcaseFormConfig = {
      title: 'Interactive Component Demo',
      description: 'See how all components work together',
      sections: [{
        id: 'loan_parameters',
        title: 'Loan Parameters',
        step: 1,
        layout: 'single',
        fields: [{
          id: 'loanAmount',
          type: 'slider',
          label: 'Loan Amount',
          min: 5000,
          max: 100000,
          step: 1000,
          unit: '$',
          showTooltip: true,
          showMarkers: true,
          markers: [{
            value: 5000,
            label: '$5K'
          }, {
            value: 25000,
            label: '$25K'
          }, {
            value: 50000,
            label: '$50K'
          }, {
            value: 100000,
            label: '$100K'
          }],
          formatValue: value => \`$\${value.toLocaleString()}\`,
          variant: 'primary',
          defaultValue: 25000
        }, {
          id: 'term',
          type: 'slider',
          label: 'Loan Term',
          min: 12,
          max: 84,
          step: 6,
          unit: 'months',
          showTooltip: true,
          showMarkers: true,
          markers: [{
            value: 12,
            label: '1yr'
          }, {
            value: 36,
            label: '3yr'
          }, {
            value: 60,
            label: '5yr'
          }, {
            value: 84,
            label: '7yr'
          }],
          formatValue: value => {
            const years = Math.floor(value / 12);
            const months = value % 12;
            if (months === 0) return \`\${years} year\${years > 1 ? 's' : ''}\`;
            return \`\${years}y \${months}m\`;
          },
          variant: 'secondary',
          defaultValue: 36
        }]
      }, {
        id: 'financial_info',
        title: 'Financial Information',
        step: 2,
        layout: 'single',
        fields: [{
          id: 'income',
          type: 'slider',
          label: 'Monthly Income',
          min: 2000,
          max: 15000,
          step: 250,
          unit: '$',
          showTooltip: true,
          formatValue: value => \`$\${value.toLocaleString()}\`,
          variant: 'success',
          defaultValue: 6500
        }, {
          id: 'expenses',
          type: 'slider',
          label: 'Monthly Expenses',
          min: 1000,
          max: 8000,
          step: 100,
          unit: '$',
          showTooltip: true,
          formatValue: value => \`$\${value.toLocaleString()}\`,
          variant: 'danger',
          defaultValue: 3200
        }, {
          id: 'creditScore',
          type: 'slider',
          label: 'Credit Score',
          min: 300,
          max: 850,
          step: 10,
          showTooltip: true,
          formatValue: value => {
            if (value >= 750) return \`\${value} (Excellent)\`;
            if (value >= 650) return \`\${value} (Good)\`;
            if (value >= 500) return \`\${value} (Fair)\`;
            return \`\${value} (Poor)\`;
          },
          variant: 'warning',
          defaultValue: 720
        }]
      }]
    };

    // Tab navigation
    const tabs = [{
      id: 'overview',
      label: 'Overview',
      icon: 'home'
    }, {
      id: 'charts',
      label: 'Charts',
      icon: 'chart-bar'
    }, {
      id: 'tables',
      label: 'Tables',
      icon: 'table'
    }, {
      id: 'forms',
      label: 'Forms',
      icon: 'document-text'
    }, {
      id: 'visualizers',
      label: 'Visualizers',
      icon: 'eye'
    }];

    // Component actions
    const updateSliderValue = (fieldId, value) => {
      sliderValues[fieldId] = value;

      // Update table data
      sampleTableData.value[0].loanAmount = sliderValues.loanAmount;
      sampleTableData.value[0].creditScore = sliderValues.creditScore;
      sampleTableData.value[0].monthlyIncome = sliderValues.income;
      sampleTableData.value[0].debtToIncome = Math.round(sliderValues.expenses / sliderValues.income * 100);
      sampleTableData.value[0].status = calculations.value.affordabilityScore > 70 ? 'qualified' : calculations.value.affordabilityScore > 40 ? 'review' : 'declined';
    };
    const handleTableAction = ({
      action,
      row
    }) => {
      console.log(\`Table action: \${action} for row:\`, row);
    };
    return {
      showcaseState,
      sliderValues,
      calculations,
      dynamicChartData,
      sampleTableData,
      processStates,
      showcaseFormConfig,
      tabs,
      updateSliderValue,
      handleTableAction
    };
  },
  template: \`
    <div class="min-h-screen bg-gray-50">
      <!-- Header -->
      <div class="bg-white shadow-sm border-b">
        <div class="max-w-7xl mx-auto px-4 py-6">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Component Showcase</h1>
            <p class="mt-1 text-gray-600">Interactive demonstration of all UI components with real-time data binding</p>
          </div>
        </div>
      </div>

      <!-- Tab Navigation -->
      <div class="bg-white border-b">
        <div class="max-w-7xl mx-auto px-4">
          <nav class="flex space-x-8">
            <button
              v-for="tab in tabs"
              :key="tab.id"
              :class="[
                'py-4 px-1 border-b-2 font-medium text-sm transition-colors',
                showcaseState.activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
              @click="showcaseState.activeTab = tab.id"
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 py-8">
        <!-- Overview Tab -->
        <div v-if="showcaseState.activeTab === 'overview'" class="space-y-8">
          <!-- Process Visualization -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Component Integration Flow</h3>
            <StateTransitionVisualizer
              :states="processStates"
              :current-state="4"
              layout="horizontal"
              :show-connections="true"
              :animated="true"
              :show-descriptions="true"
            />
          </div>

          <!-- Real-time Metrics -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500">Monthly Payment</p>
                  <p class="text-2xl font-semibold text-gray-900">\\\${{ calculations.monthlyPayment.toFixed(0) }}</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500">Affordability Score</p>
                  <p class="text-2xl font-semibold text-gray-900">{{ Math.round(calculations.affordabilityScore) }}%</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500">DTI Ratio</p>
                  <p class="text-2xl font-semibold text-gray-900">{{ Math.round((sliderValues.expenses / sliderValues.income) * 100) }}%</p>
                </div>
              </div>
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-6">
              <div class="flex items-center">
                <div class="flex-shrink-0">
                  <div class="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                </div>
                <div class="ml-4">
                  <p class="text-sm font-medium text-gray-500">Available Income</p>
                  <p class="text-2xl font-semibold text-gray-900">\\\${{ Math.round(calculations.availableIncome) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Controls -->
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Interactive Controls</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <MSlider
                :model-value="sliderValues.loanAmount"
                label="Loan Amount"
                :min="5000"
                :max="100000"
                :step="1000"
                unit="$"
                :show-tooltip="true"
                :format-value="(value) => \\\`$\\\${value.toLocaleString()}\\\`"
                variant="primary"
                size="large"
                @update:model-value="updateSliderValue('loanAmount', $event)"
              />
              
              <MSlider
                :model-value="sliderValues.income"
                label="Monthly Income"
                :min="2000"
                :max="15000"
                :step="250"
                unit="$"
                :show-tooltip="true"
                :format-value="(value) => \\\`$\\\${value.toLocaleString()}\\\`"
                variant="success"
                size="large"
                @update:model-value="updateSliderValue('income', $event)"
              />
            </div>
          </div>
        </div>

        <!-- Charts Tab -->
        <div v-if="showcaseState.activeTab === 'charts'" class="space-y-8">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div class="bg-white rounded-lg shadow-sm p-6">
              <MChart
                type="pie"
                title="Loan Breakdown"
                subtitle="Principal vs Interest"
                :data="dynamicChartData.loanBreakdown"
                :width="400"
                :height="300"
                :show-legend="true"
              />
            </div>
            
            <div class="bg-white rounded-lg shadow-sm p-6">
              <MChart
                type="bar"
                title="Income Analysis"
                subtitle="Monthly financial breakdown"
                :data="dynamicChartData.incomeAnalysis"
                :width="400"
                :height="300"
                :formatters="{
                  y: (value) => \\\`$\\\${value.toLocaleString()}\\\`
                }"
              />
            </div>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-6">
            <MChart
              type="line"
              title="Affordability Trend"
              subtitle="Projected affordability score"
              :data="[{ label: 'Score', color: '#3b82f6', data: dynamicChartData.affordabilityTrend }]"
              :width="800"
              :height="350"
              :show-grid="true"
              :show-points="true"
              :formatters="{
                x: (value) => \\\`Month \\\${value}\\\`,
                y: (value) => \\\`\\\${value.toFixed(1)}%\\\`
              }"
            />
          </div>
        </div>

        <!-- Tables Tab -->
        <div v-if="showcaseState.activeTab === 'tables'" class="space-y-8">
          <div class="bg-white rounded-lg shadow-sm">
            <MTable
              title="Live Application Data"
              subtitle="Updates automatically with slider changes"
              :data="sampleTableData"
              :columns="[
                { key: 'applicantName', label: 'Applicant', sortable: true },
                { key: 'loanAmount', label: 'Amount', type: 'currency', sortable: true, align: 'right' },
                { key: 'creditScore', label: 'Credit Score', type: 'number', sortable: true },
                { key: 'monthlyIncome', label: 'Income', type: 'currency', sortable: true, align: 'right' },
                { key: 'debtToIncome', label: 'DTI', sortable: true, render: (value) => \\\`\\\${value}%\\\` },
                { key: 'status', label: 'Status', type: 'status', sortable: true }
              ]"
              :selectable="true"
              :show-search="false"
              :show-filters="false"
              :show-pagination="false"
              :show-actions="true"
              :show-export="true"
              :row-clickable="true"
              :actions="[
                { key: 'approve', label: 'Approve', variant: 'success' },
                { key: 'review', label: 'Review', variant: 'warning' },
                { key: 'decline', label: 'Decline', variant: 'danger' }
              ]"
              @action-click="handleTableAction"
            />
          </div>
        </div>

        <!-- Forms Tab -->
        <div v-if="showcaseState.activeTab === 'forms'" class="space-y-8">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Interactive Form Components</h3>
            <div class="space-y-6">
              <div v-for="section in showcaseFormConfig.sections" :key="section.id">
                <h4 class="text-md font-medium text-gray-900 mb-4">{{ section.title }}</h4>
                <div class="space-y-4">
                  <div v-for="field in section.fields" :key="field.id">
                    <MSlider
                      :model-value="sliderValues[field.id]"
                      :label="field.label"
                      :min="field.min"
                      :max="field.max"
                      :step="field.step"
                      :unit="field.unit"
                      :show-tooltip="field.showTooltip"
                      :show-markers="field.showMarkers"
                      :markers="field.markers"
                      :format-value="field.formatValue"
                      :variant="field.variant"
                      size="large"
                      @update:model-value="updateSliderValue(field.id, $event)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Visualizers Tab -->
        <div v-if="showcaseState.activeTab === 'visualizers'" class="space-y-8">
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">State Transition Visualizers</h3>
            
            <div class="space-y-8">
              <div>
                <h4 class="text-md font-medium text-gray-700 mb-4">Horizontal Layout</h4>
                <StateTransitionVisualizer
                  :states="processStates"
                  :current-state="2"
                  layout="horizontal"
                  :show-connections="true"
                  :animated="true"
                  :show-descriptions="true"
                />
              </div>
              
              <div>
                <h4 class="text-md font-medium text-gray-700 mb-4">Vertical Layout</h4>
                <div class="max-w-sm">
                  <StateTransitionVisualizer
                    :states="processStates"
                    :current-state="3"
                    layout="vertical"
                    :show-connections="true"
                    :animated="true"
                    :show-descriptions="true"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  \`
})`,...(x=(w=d.parameters)==null?void 0:w.docs)==null?void 0:x.source}}};var S,T,k;m.parameters={...m.parameters,docs:{...(S=m.parameters)==null?void 0:S.docs,source:{originalSource:`() => ({
  components: {
    MChart,
    MTable
  },
  setup() {
    const dataSize = ref(100);
    const chartType = ref('line');
    const performanceData = computed(() => {
      const start = performance.now();
      const data = Array.from({
        length: dataSize.value
      }, (_, i) => ({
        x: i + 1,
        y: Math.floor(Math.random() * 100) + 1
      }));
      const end = performance.now();
      return {
        data,
        generationTime: end - start
      };
    });
    const tableData = computed(() => {
      const start = performance.now();
      const data = Array.from({
        length: dataSize.value
      }, (_, i) => ({
        id: i + 1,
        name: \`Item \${i + 1}\`,
        value: Math.floor(Math.random() * 1000),
        status: ['active', 'pending', 'inactive'][Math.floor(Math.random() * 3)],
        date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      }));
      const end = performance.now();
      return {
        data,
        generationTime: end - start
      };
    });
    return {
      dataSize,
      chartType,
      performanceData,
      tableData
    };
  },
  template: \`
    <div class="space-y-8 p-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Performance Testing</h2>
        <p class="text-gray-600">Test component performance with varying data sizes</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Data Size</label>
          <MSlider
            v-model="dataSize"
            :min="10"
            :max="1000"
            :step="10"
            :show-tooltip="true"
            :format-value="(value) => \\\`\\\${value} items\\\`"
          />
        </div>
        
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Chart Type</label>
          <select
            v-model="chartType"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="line">Line Chart</option>
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Chart Performance</h3>
            <span class="text-sm text-gray-500">Gen: {{ performanceData.generationTime.toFixed(2) }}ms</span>
          </div>
          <MChart
            :type="chartType"
            :data="performanceData.data"
            :width="400"
            :height="300"
            :show-legend="chartType === 'pie'"
          />
        </div>
        
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Table Performance</h3>
            <span class="text-sm text-gray-500">Gen: {{ tableData.generationTime.toFixed(2) }}ms</span>
          </div>
          <MTable
            :data="tableData.data"
            :columns="[
              { key: 'name', label: 'Name', sortable: true },
              { key: 'value', label: 'Value', type: 'number', sortable: true },
              { key: 'status', label: 'Status', type: 'status', sortable: true },
              { key: 'date', label: 'Date', type: 'date', sortable: true }
            ]"
            :page-size="10"
            :show-search="true"
            :show-pagination="true"
          />
        </div>
      </div>
    </div>
  \`
})`,...(k=(T=m.parameters)==null?void 0:T.docs)==null?void 0:k.source}}};const W=["CompleteShowcase","PerformanceTest"];export{d as CompleteShowcase,m as PerformanceTest,W as __namedExportsOrder,J as default};
